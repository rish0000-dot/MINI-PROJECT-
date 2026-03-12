
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Building2, Calendar, MessageCircle, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HOSPITALS } from '../../lib/mockData';

const DashboardHome = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'User';

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/dashboard/hospitals?search=${encodeURIComponent(search)}`);
        }
    };

    return (
        <div className="space-y-12 pb-20">
            {/* Hero Section */}
            <div className="relative rounded-[3.5rem] bg-slate-900 border border-slate-800 p-10 md:p-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky-500/10 to-transparent"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px]"></div>

                <div className="relative z-10 max-w-2xl space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-sky-400 font-black uppercase tracking-[0.2em] text-xs mb-4">Welcome back, {firstName}</h2>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
                            Find the best <span className="text-sky-400">Healthcare</span> near you.
                        </h1>
                    </motion.div>

                    <form onSubmit={handleSearch} className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-400 transition-colors" size={24} />
                        <input
                            type="text"
                            placeholder="Search symptoms, tests, hospitals..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-16 pr-8 py-6 rounded-[2.5rem] bg-white/5 border-2 border-white/10 text-white font-bold text-lg focus:bg-white focus:text-slate-900 focus:border-sky-500 transition-all focus:outline-none placeholder:text-slate-500"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-4 rounded-[2rem] bg-sky-600 text-white font-black text-xs uppercase tracking-widest hover:bg-sky-500 shadow-xl shadow-sky-600/20 active:scale-95 transition-all">
                            Search
                        </button>
                    </form>

                    <div className="flex flex-wrap gap-3">
                        {["X-ray", "MRI", "Blood Test", "Fever", "Heart checkup"].map(tag => (
                            <button
                                key={tag}
                                onClick={() => navigate(`/dashboard/hospitals?search=${tag}`)}
                                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Find Hospitals', icon: Building2, color: 'sky', path: '/dashboard/hospitals' },
                    { label: 'My Bookings', icon: Calendar, color: 'teal', path: '/dashboard/appointments' },
                    { label: 'AI Assistant', icon: MessageCircle, color: 'violet', path: '/dashboard/ai-assistant' },
                    { label: 'Emergency', icon: Zap, color: 'rose', path: null },
                ].map((action, i) => (
                    <motion.button
                        key={action.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => action.path && navigate(action.path)}
                        className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-sky-900/5 transition-all text-left relative overflow-hidden active:scale-95"
                    >
                        <div className={`w-14 h-14 rounded-2xl bg-${action.color}-100 text-${action.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-${action.color}-600 group-hover:text-white transition-all`}>
                            <action.icon size={28} />
                        </div>
                        <h3 className="text-lg font-black text-slate-900">{action.label}</h3>
                        <p className="text-xs text-slate-400 font-bold mt-1">Tap to explore</p>
                    </motion.button>
                ))}
            </div>

            {/* Nearby Hospitals */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Nearby Hospitals</h2>
                    <button
                        onClick={() => navigate('/dashboard/hospitals')}
                        className="text-sky-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
                    >
                        View All <ArrowRight size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {HOSPITALS.slice(0, 3).map((h, i) => (
                        <motion.div
                            key={h.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                            onClick={() => navigate(`/dashboard/hospitals/${h.id}`)}
                            className="group cursor-pointer bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-sky-900/5 transition-all"
                        >
                            <div className="relative h-48">
                                <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 p-2 rounded-full bg-white/95 backdrop-blur-sm shadow-sm flex items-center gap-1">
                                    <Star size={12} className="fill-amber-400 text-amber-400" />
                                    <span className="text-[10px] font-black">{h.rating}</span>
                                </div>
                            </div>
                            <div className="p-7">
                                <h3 className="font-black text-slate-900 group-hover:text-sky-600 transition-colors">{h.name}</h3>
                                <div className="flex items-center gap-1 text-slate-500 text-[10px] mt-1 font-bold">
                                    <MapPin size={10} className="text-sky-500" /> {h.address}
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    {h.verified && (
                                        <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-teal-500">
                                            <CheckCircle2 size={12} /> Verified
                                        </span>
                                    )}
                                    <span className="text-sky-600 font-black text-sm">₹{Object.values(h.priceList)[0]}+</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
