
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, User, FileText, CheckCircle2 } from 'lucide-react';
import { useAppointments } from '../../lib/AppointmentContext';

interface BookingModalProps {
    doctor: any;
    hospital: any;
    onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ doctor, hospital, onClose }) => {
    const { addAppointment } = useAppointments();
    const [step, setStep] = useState(1);
    const [date, setDate] = useState('2024-03-03');
    const [time, setTime] = useState('');
    const [patientName, setPatientName] = useState('');
    const [reason, setReason] = useState('');

    const slots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

    const handleConfirm = () => {
        addAppointment({
            hospitalId: hospital.id,
            hospitalName: hospital.name,
            doctorId: doctor.id,
            doctorName: doctor.name,
            specialization: doctor.specialization,
            date,
            time,
            patientName,
            reason
        });
        setStep(3); // Success step
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden"
            >
                <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 to-teal-400" />

                <div className="p-8 md:p-12">
                    <button onClick={onClose} className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400">
                        <X size={20} />
                    </button>

                    {step === 1 && (
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Book Appointment</h3>
                                <p className="text-slate-500 font-medium">Schedule your visit with {doctor.name}</p>
                            </div>

                            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 flex items-center gap-4">
                                <img src={doctor.photo} className="w-12 h-12 rounded-xl object-cover" alt="" />
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">{doctor.name}</p>
                                    <p className="text-[10px] text-sky-600 font-black uppercase tracking-widest">{doctor.specialization}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                                    <Calendar size={14} className="text-sky-500" /> Select Date
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {["2024-03-03", "2024-03-04", "2024-03-05", "2024-03-06"].map(d => (
                                        <button
                                            key={d}
                                            onClick={() => setDate(d)}
                                            className={`p-3 rounded-2xl border-2 text-sm font-bold transition-all ${date === d ? 'border-sky-500 bg-sky-50 text-sky-600' : 'border-slate-50 bg-slate-50 text-slate-500'
                                                }`}
                                        >
                                            {new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                                    <Clock size={14} className="text-teal-500" /> Select Time Slot
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {slots.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setTime(s)}
                                            className={`p-3 rounded-xl border-2 text-[11px] font-black tracking-tight transition-all ${time === s ? 'border-teal-500 bg-teal-50 text-teal-600' : 'border-slate-50 bg-slate-50 text-slate-400'
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                disabled={!time}
                                onClick={() => setStep(2)}
                                className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-sm uppercase tracking-widest shadow-xl hover:bg-sky-600 transition-all disabled:opacity-50 disabled:grayscale"
                            >
                                Continue to Patient Info
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Patient Information</h3>
                                <p className="text-slate-500 font-medium">Please provide the visitor details.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                                        <User size={14} className="text-sky-500" /> Patient Full Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={patientName}
                                        onChange={e => setPatientName(e.target.value)}
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-sky-500 focus:outline-none font-bold"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                                        <FileText size={14} className="text-sky-500" /> Reason for Visit (Optional)
                                    </label>
                                    <textarea
                                        placeholder="Briefly describe your symptoms..."
                                        rows={3}
                                        value={reason}
                                        onChange={e => setReason(e.target.value)}
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-sky-500 focus:outline-none font-bold resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-8 py-4 rounded-2xl border-2 border-slate-100 text-slate-400 font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all"
                                >
                                    Back
                                </button>
                                <button
                                    disabled={!patientName}
                                    onClick={handleConfirm}
                                    className="flex-1 py-4 rounded-2xl bg-sky-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-sky-600/20 hover:bg-sky-700 transition-all disabled:opacity-50"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="py-10 text-center space-y-6">
                            <div className="w-24 h-24 bg-teal-100 rounded-[2.5rem] flex items-center justify-center mx-auto text-teal-600 shadow-xl shadow-teal-500/10">
                                <CheckCircle2 size={48} strokeWidth={3} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Booking Confirmed!</h3>
                                <p className="text-slate-500 font-medium mt-2">Your appointment has been successfully scheduled.</p>
                            </div>

                            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-left space-y-3">
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                                    <span>Date & Time</span>
                                    <span className="text-slate-900">{date} at {time}</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                                    <span>Doctor</span>
                                    <span className="text-slate-900">{doctor.name}</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                                    <span>Hospital</span>
                                    <span className="text-slate-900">{hospital.name}</span>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-sm uppercase tracking-widest shadow-xl hover:bg-sky-600 transition-all"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default BookingModal;
