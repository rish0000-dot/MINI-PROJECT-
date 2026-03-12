
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const app = express();
app.use(express.json());
app.use(cors());

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '823063627570-b1d1j0611hnhulo436truidor5adi0u2.apps.googleusercontent.com';
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// ────────────────────────────────────────────────────────────
//  Database Setup (SQL Server with Mock fallback)
// ────────────────────────────────────────────────────────────
let pool = null;
let usersMock = [];
let isMockMode = false;

async function connectDB() {
    try {
        const mssql = require('mssql');
        const dbConfig = {
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            server: process.env.DB_SERVER,
            database: process.env.DB_NAME,
            options: { encrypt: true, trustServerCertificate: true }
        };
        pool = await mssql.connect(dbConfig);
        console.log('✅ DATABASE CONNECTED');
        isMockMode = false;
    } catch (err) {
        console.warn('⚠️ DATABASE FAILED -> MOCK MODE ACTIVE (Data stored in memory)');
        isMockMode = true;
    }
}
connectDB();

// ────────────────────────────────────────────────────────────
//  Status Route
// ────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.json({ status: 'OK', mode: isMockMode ? 'MOCK' : 'DB' }));

// ────────────────────────────────────────────────────────────
//  SIGNUP
// ────────────────────────────────────────────────────────────
app.post('/api/auth/signup', async (req, res) => {
    console.log('📥 Signup Request:', req.body);
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        if (isMockMode) {
            const exists = usersMock.find(u => u.Email === email);
            if (exists) return res.status(400).json({ message: 'Email already registered.' });

            const hashed = await bcrypt.hash(password, 10);
            const newUser = { Id: usersMock.length + 1, FirstName: firstName, LastName: lastName, Email: email, Password: hashed, Provider: 'email' };
            usersMock.push(newUser);

            const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
            console.log('✅ Signup Success (Mock). Total users:', usersMock.length);
            return res.status(201).json({ success: true, token, user: { firstName, lastName, email } });
        }

        // DB Mode
        const mssql = require('mssql');
        const hashed = await bcrypt.hash(password, 10);
        await pool.request()
            .input('f', mssql.NVarChar, firstName)
            .input('l', mssql.NVarChar, lastName)
            .input('e', mssql.NVarChar, email)
            .input('p', mssql.NVarChar, hashed)
            .query('INSERT INTO Users (FirstName, LastName, Email, Password) VALUES (@f, @l, @e, @p)');

        const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.status(201).json({ success: true, token, user: { firstName, lastName, email } });

    } catch (err) {
        console.error('❌ SIGNUP ERROR:', err.message);
        res.status(500).json({ message: 'Signup failed. Try again.' });
    }
});

// ────────────────────────────────────────────────────────────
//  LOGIN
// ────────────────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (isMockMode) {
            const user = usersMock.find(u => u.Email === email);
            if (!user) return res.status(401).json({ message: 'No account found with this email.' });
            const valid = await bcrypt.compare(password, user.Password);
            if (!valid) return res.status(401).json({ message: 'Incorrect password.' });
            const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
            return res.status(200).json({ success: true, token, user: { firstName: user.FirstName, lastName: user.LastName, email } });
        }

        const mssql = require('mssql');
        const result = await pool.request().input('e', mssql.NVarChar, email).query('SELECT * FROM Users WHERE Email = @e');
        const user = result.recordset[0];
        if (!user) return res.status(401).json({ message: 'No account found with this email.' });
        const valid = await bcrypt.compare(password, user.Password);
        if (!valid) return res.status(401).json({ message: 'Incorrect password.' });
        const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.status(200).json({ success: true, token, user: { firstName: user.FirstName, lastName: user.LastName, email } });

    } catch (err) {
        console.error('❌ LOGIN ERROR:', err.message);
        res.status(500).json({ message: 'Login failed. Try again.' });
    }
});

// ────────────────────────────────────────────────────────────
//  SECURE GOOGLE AUTH — Verifies JWT on server side
// ────────────────────────────────────────────────────────────
app.post('/api/auth/google', async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
        return res.status(400).json({ message: 'Google credential (JWT) is required.' });
    }

    try {
        // ✅ Verify the Google JWT token with Google's public keys — cannot be spoofed
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub: googleId, name, email, picture } = payload;

        console.log('✅ Google JWT verified for:', email);

        if (isMockMode) {
            let user = usersMock.find(u => u.GoogleId === googleId || u.Email === email);
            if (!user) {
                user = { Id: usersMock.length + 1, Name: name, Email: email, Picture: picture, GoogleId: googleId, Provider: 'google' };
                usersMock.push(user);
                console.log('👤 New Google user saved (Mock). Total users:', usersMock.length);
            }
            const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
            return res.status(200).json({ success: true, token, user: { name, email, picture } });
        }

        // DB Mode
        const mssql = require('mssql');
        const result = await pool.request().input('g', mssql.NVarChar, googleId).query('SELECT * FROM Users WHERE GoogleId = @g');
        let user = result.recordset[0];
        if (!user) {
            await pool.request()
                .input('n', mssql.NVarChar, name)
                .input('e', mssql.NVarChar, email)
                .input('p', mssql.NVarChar, picture)
                .input('g', mssql.NVarChar, googleId)
                .query('INSERT INTO Users (Name, Email, Picture, GoogleId) VALUES (@n, @e, @p, @g)');
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.status(200).json({ success: true, token, user: { name, email, picture } });

    } catch (err) {
        console.error('❌ GOOGLE AUTH ERROR:', err.message);
        res.status(401).json({ message: 'Invalid Google token. Authentication failed.' });
    }
});

// ────────────────────────────────────────────────────────────
//  ADMIN — View all registered users
// ────────────────────────────────────────────────────────────
app.get('/api/auth/users', async (req, res) => {
    try {
        if (isMockMode) {
            const safeUsers = usersMock.map(({ Password, ...rest }) => rest);
            return res.json({ mode: 'MOCK', count: safeUsers.length, users: safeUsers });
        }
        const mssql = require('mssql');
        const result = await pool.request().query('SELECT Id, Name, FirstName, LastName, Email, GoogleId, Picture, CreatedAt FROM Users');
        res.json({ mode: 'DB', count: result.recordset.length, users: result.recordset });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
});

// ────────────────────────────────────────────────────────────
//  START SERVER
// ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 SERVER ON PORT ${PORT}`));
