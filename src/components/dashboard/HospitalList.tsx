
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, CheckCircle2, Building2 } from 'lucide-react';
import { HOSPITALS } from '../../lib/mockData';
import type { Hospital } from '../../lib/mockData';
import { useNavigate } from 'react-router-dom';

const HospitalList = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filterRating, setFilterRating] = useState(0);
    const [filterService, setFilterService] = useState('All');

    const services = ["All", "X-ray", "MRI", "CT Scan", "Blood Test", "Cardiac Care", "Dental", "Eye Care", "Orthopedic"];

    const filteredHospitals = HOSPITALS.filter(h => {
        const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase()) ||
            h.services.some(s => s.toLowerCase().includes(search.toLowerCase()));
        const matchesRating = h.rating >= filterRating;
        const matchesService = filterService === 'All' || h.services.includes(filterService);
        return matchesSearch && matchesRating && matchesService;
    });

    return (
        <div className="space-y-8 pb-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Find Hospitals</h1>
                    <p className="text-slate-500 font-medium">Browse verified healthcare providers near you.</p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or service..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-12 pr-6 py-3 rounded-2xl bg-white border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all w-full md:w-80 font-medium"
                        />
                    </div>
                </div>
            </header>

            <div className="flex flex-wrap gap-3 mb-4">
                {services.map(s => (
                    <button
                        key={s}
                        onClick={() => setFilterService(s)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${filterService === s
                            ? 'bg-sky-600 border-sky-600 text-white shadow-lg shadow-sky-600/20'
                            : 'bg-white border-slate-100 text-slate-500 hover:border-sky-200 hover:text-sky-600'
                            }`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredHospitals.map((h, i) => (
                    <motion.div
                        key={h.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-sky-100 transition-all flex flex-col"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className="px-3 py-1.5 rounded-full bg-white/95 text-slate-900 text-[10px] font-black uppercase tracking-wider backdrop-blur-sm shadow-sm flex items-center gap-1">
                                    <Star size={10} className="fill-amber-400 text-amber-400" /> {h.rating}
                                </span>
                            </div>
                            {h.verified && (
                                <div className="absolute top-4 right-4 p-1.5 rounded-full bg-teal-500 text-white shadow-lg shadow-teal-500/20">
                                    <CheckCircle2 size={14} />
                                </div>
                            )}
                        </div>

                        <div className="p-7 flex flex-col flex-1">
                            <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">{h.name}</h3>
                            <div className="flex items-center gap-1 text-slate-500 text-xs mt-1 mb-4">
                                <MapPin size={12} className="text-sky-500" />
                                <span className="font-medium truncate">{h.address}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {h.services.slice(0, 3).map(service => (
                                    <span key={service} className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-tight">
                                        {service}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                                <div className="text-xs">
                                    <p className="text-slate-400 font-bold uppercase tracking-tighter">Starting from</p>
                                    <p className="text-sky-600 font-black text-lg">₹{Object.values(h.priceList)[0]}</p>
                                </div>
                                <button
                                    onClick={() => navigate(`/dashboard/hospitals/${h.id}`)}
                                    className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-sky-600 transition-all shadow-lg active:scale-95"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
                {filteredHospitals.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                            <Building2 size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">No hospitals found</h3>
                        <p className="text-slate-500">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HospitalList;
