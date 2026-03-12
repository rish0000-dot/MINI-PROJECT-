
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Booking {
    id: string;
    hospitalId: string;
    hospitalName: string;
    doctorId: string;
    doctorName: string;
    specialization: string;
    date: string;
    time: string;
    patientName: string;
    reason: string;
    status: 'Confirmed' | 'Completed' | 'Cancelled';
}

interface AppointmentContextType {
    appointments: Booking[];
    addAppointment: (booking: Omit<Booking, 'id' | 'status'>) => void;
    cancelAppointment: (id: string) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [appointments, setAppointments] = useState<Booking[]>(() => {
        try {
            const saved = localStorage.getItem('appointments');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Failed to parse appointments from localStorage", e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }, [appointments]);

    const addAppointment = (booking: Omit<Booking, 'id' | 'status'>) => {
        const newBooking: Booking = {
            ...booking,
            id: Math.random().toString(36).substr(2, 9),
            status: 'Confirmed'
        };
        setAppointments(prev => [newBooking, ...prev]);
    };

    const cancelAppointment = (id: string) => {
        setAppointments(prev => prev.map(app =>
            app.id === id ? { ...app, status: 'Cancelled' } : app
        ));
    };

    return (
        <AppointmentContext.Provider value={{ appointments, addAppointment, cancelAppointment }}>
            {children}
        </AppointmentContext.Provider>
    );
};

export const useAppointments = () => {
    const context = useContext(AppointmentContext);
    if (!context) throw new Error('useAppointments must be used within AppointmentProvider');
    return context;
};
