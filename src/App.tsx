import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LandingNavbar from './components/LandingNavbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import AISection from './components/AISection';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import Dashboard from './pages/Dashboard';
import { AppointmentProvider } from './lib/AppointmentContext';

const LandingPage = ({ onLogin, onSignUp }: { onLogin: () => void, onSignUp: () => void }) => (
    <>
        <LandingNavbar onLogin={onLogin} onSignUp={onSignUp} />
        <main>
            <Hero onSignUp={onSignUp} />
            <ProblemSolution />
            <Features />
            <HowItWorks />
            <AISection />
            <Stats />
            <Testimonials />
            <CTASection onSignUp={onSignUp} />
        </main>
        <Footer />
    </>
);

export default function App() {
    const [showLogin, setShowLogin] = useState(false);
    const [loginTab, setLoginTab] = useState<"login" | "signup">("login");
    const GOOGLE_CLIENT_ID = "823063627570-b1d1j0611hnhulo436truidor5adi0u2.apps.googleusercontent.com";

    const handleLogin = () => {
        setLoginTab("login");
        setShowLogin(true);
    };

    const handleSignUp = () => {
        setLoginTab("signup");
        setShowLogin(true);
    };

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <AppointmentProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage onLogin={handleLogin} onSignUp={handleSignUp} />} />
                        <Route path="/dashboard/*" element={<Dashboard />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>

                    {showLogin && <LoginModal initialTab={loginTab} onClose={() => setShowLogin(false)} />}
                </Router>
            </AppointmentProvider>
        </GoogleOAuthProvider>
    );
}
