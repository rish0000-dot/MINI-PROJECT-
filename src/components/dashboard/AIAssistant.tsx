
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, User, Bot, Sparkles, ChevronRight, Search, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HOSPITALS } from '../../lib/mockData';

const AIAssistant = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { id: 1, role: 'bot', text: 'Hello! I am your AI Health Assistant. How are you feeling today?', timestamp: '09:00 AM' }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    const suggestions = [
        "Chest pain", "Severe headache", "Fever & Chills",
        "Dental issue", "Eye problem", "Bone fracture"
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        const newUserMsg = { id: Date.now(), role: 'user', text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages(prev => [...prev, newUserMsg]);
        setInput('');

        // Mock bot response logic
        setTimeout(() => {
            let botText = "I understand. Based on your symptoms, I recommend seeing a specialist.";
            let recommendations: any[] = [];

            const lowerText = text.toLowerCase();
            if (lowerText.includes('chest') || lowerText.includes('heart')) {
                botText = "Chest pain could be serious. I recommend an immediate cardiac evaluation.";
                recommendations = HOSPITALS.filter(h => h.services.includes('Cardiac Care')).slice(0, 2);
            } else if (lowerText.includes('head') || lowerText.includes('brain')) {
                botText = "Persistent headaches might need neurological screening. Consider a consultation.";
                recommendations = HOSPITALS.filter(h => h.services.includes('MRI Scan') || h.services.includes('Consultation')).slice(0, 2);
            } else if (lowerText.includes('fever')) {
                botText = "Fever and chills are common symptoms of viral infections. Please check your temperature and consult a GP.";
                recommendations = HOSPITALS.filter(h => h.services.includes('Fever')).slice(0, 2);
            } else if (lowerText.includes('dental') || lowerText.includes('tooth')) {
                botText = "Toothaches or gum issues should be examined by a dentist.";
                recommendations = HOSPITALS.filter(h => h.services.includes('Dental issue')).slice(0, 2);
            }

            const botMsg = {
                id: Date.now() + 1,
                role: 'bot',
                text: botText,
                recommendations,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    return (
        <div className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-sky-900/5 overflow-hidden">
            {/* Header */}
            <div className="px-10 py-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/20 flex items-center justify-center text-sky-400 border border-sky-500/30">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black">AI Health Assistant</h2>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Online | Real-time Analysis</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-10 py-8 space-y-8 scroll-smooth">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-600'
                                }`}>
                                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                            </div>
                            <div className="space-y-2">
                                <div className={`px-6 py-4 rounded-[2rem] text-sm font-bold shadow-sm ${msg.role === 'user'
                                        ? 'bg-sky-600 text-white rounded-tr-none'
                                        : 'bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-none'
                                    }`}>
                                    {msg.text}
                                </div>

                                {msg.recommendations && msg.recommendations.length > 0 && (
                                    <div className="space-y-3 mt-4">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Recommended Hospitals</p>
                                        {msg.recommendations.map((h: any) => (
                                            <div key={h.id} className="p-4 rounded-3xl bg-white border border-slate-100 shadow-sm flex items-center justify-between group hover:border-sky-500 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <img src={h.image} className="w-10 h-10 rounded-xl object-cover" alt="" />
                                                    <div>
                                                        <p className="font-black text-slate-900 text-[11px]">{h.name}</p>
                                                        <p className="text-[9px] text-slate-400 font-bold">{h.address}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => navigate(`/dashboard/hospitals/${h.id}`)}
                                                    className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-sky-600 group-hover:text-white transition-all"
                                                >
                                                    <ChevronRight size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <span className={`text-[9px] font-bold text-slate-300 block ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                    {msg.timestamp}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-8 border-t border-slate-100 space-y-4">
                <div className="flex flex-wrap gap-2">
                    {suggestions.map(s => (
                        <button
                            key={s}
                            onClick={() => handleSend(s)}
                            className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-500 hover:border-sky-200 hover:text-sky-600 transition-all uppercase tracking-tight"
                        >
                            {s}
                        </button>
                    ))}
                </div>
                <div className="relative flex items-center gap-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                        placeholder="Describe your symptoms or ask a question..."
                        className="flex-1 pl-6 pr-16 py-5 rounded-[2rem] bg-slate-50 border-2 border-slate-50 focus:border-sky-500 focus:outline-none font-bold text-sm shadow-inner"
                    />
                    <button
                        onClick={() => handleSend(input)}
                        className="absolute right-4 p-3 rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-600/30 hover:bg-sky-700 transition-all active:scale-95"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
