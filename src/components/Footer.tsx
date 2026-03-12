
import React from 'react';
import { Cross, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center">
                                <Cross size={18} className="text-white" strokeWidth={3} />
                            </div>
                            <span className="text-xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Healthcare<span className="text-sky-400"> Hub</span>
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Making quality healthcare accessible to everyone, everywhere.
                        </p>
                        <div className="flex gap-3">
                            {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <button key={i} className="w-9 h-9 rounded-full bg-slate-800 hover:bg-sky-500 transition-colors flex items-center justify-center">
                                    <Icon size={16} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">Company</h4>
                        <ul className="space-y-3">
                            {["About Us", "Services", "Doctors", "Privacy Policy"].map(l => (
                                <li key={l}><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">{l}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">Services</h4>
                        <ul className="space-y-3">
                            {["Find Hospitals", "Book Appointments", "AI Assistant", "Price Comparison"].map(l => (
                                <li key={l}><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">{l}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">Contact</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <Mail size={14} className="text-sky-400" />
                                hello@healthcarehub.app
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <Phone size={14} className="text-sky-400" />
                                +1 (800) 555-HEALTH
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">© 2025 Healthcare Hub. All rights reserved.</p>
                    <p className="text-slate-600 text-xs">Built with ❤️ for better healthcare</p>
                </div>
            </div>
        </footer>
    );
}
