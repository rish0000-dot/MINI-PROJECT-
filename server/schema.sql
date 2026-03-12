-- =====================================================
--  HealthcareHub Database Setup Script
--  Run this in SQL Server Management Studio (SSMS)
-- =====================================================

-- Step 1: Create the Database
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'HealthcareHub')
BEGIN
    CREATE DATABASE HealthcareHub;
END
GO

-- Step 2: Use the new database
USE HealthcareHub;
GO

-- Step 3: Create Users Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
BEGIN
    CREATE TABLE Users (
        Id         INT IDENTITY(1,1) PRIMARY KEY,
        FirstName  NVARCHAR(100) NULL,              -- NULL for Google users (they have Name)
        LastName   NVARCHAR(100) NULL,
        Name       NVARCHAR(255) NULL,              -- Full name from Google
        Email      NVARCHAR(255) UNIQUE NOT NULL,
        Password   NVARCHAR(255) NULL,              -- NULL for Google login users
        GoogleId   NVARCHAR(255) NULL,              -- NULL for email/password users
        Picture    NVARCHAR(500) NULL,              -- Profile picture from Google
        Provider   NVARCHAR(50)  DEFAULT 'email',  -- 'email' or 'google'
        CreatedAt  DATETIME      DEFAULT GETDATE()
    );
    PRINT 'Users table created successfully!';
END
ELSE
BEGIN
    PRINT 'Users table already exists.';
END
GO

-- Step 4: Verify the table
SELECT * FROM Users;
GO
