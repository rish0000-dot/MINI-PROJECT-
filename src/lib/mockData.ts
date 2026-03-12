
export interface Hospital {
    id: string;
    name: string;
    image: string;
    address: string;
    coordinates: { lat: number; lng: number };
    rating: number;
    reviews: number;
    verified: boolean;
    distance?: string;
    priceRange: string;
    services: string[];
    priceList: { [key: string]: number };
    operatingHours: string;
    phone: string;
    specialties: string[];
}

export interface Doctor {
    id: string;
    name: string;
    photo: string;
    specialization: string;
    hospitalId: string;
    experience: string;
    rating: number;
    availableSlots: { [key: string]: string[] };
}

export const USER_LOCATION = { lat: 28.6139, lng: 77.2090 }; // Delhi

export const HOSPITALS: Hospital[] = [
    {
        id: 'h1',
        name: 'City Medical Center',
        image: 'https://images.unsplash.com/photo-1587350859743-4f5033832bd3?auto=format&fit=crop&q=80&w=1000',
        address: '123 Healthcare Ave, Metro City, Delhi',
        coordinates: { lat: 28.6200, lng: 77.2150 },
        rating: 4.9,
        reviews: 1240,
        verified: true,
        priceRange: '₹',
        services: ["X-ray", "Blood Test", "Consultation", "Fever"],
        priceList: { "X-ray": 500, "Blood Test": 300, "Consultation": 200, "Fever": 150 },
        operatingHours: "24/7",
        phone: "+91-9876543210",
        specialties: ['Radiology', 'Pathology', 'General Medicine']
    },
    {
        id: 'h2',
        name: 'Apollo Speciality Clinic',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
        address: '45 Wellness St, North Block, Delhi',
        coordinates: { lat: 28.6300, lng: 77.2250 },
        rating: 4.8,
        reviews: 850,
        verified: true,
        priceRange: '₹₹',
        services: ["MRI Scan", "CT Scan", "Cardiology", "Heart checkup"],
        priceList: { "MRI Scan": 2500, "CT Scan": 1800, "Cardiology": 600, "Heart checkup": 1200 },
        operatingHours: "08:00 AM - 10:00 PM",
        phone: "+91-9876543211",
        specialties: ['Cardiology', 'Neurology', 'Diagnostics']
    },
    {
        id: 'h3',
        name: 'LifeCare Hospital',
        image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=1000',
        address: '77 Hope Road, South East Area, Delhi',
        coordinates: { lat: 28.6000, lng: 77.1900 },
        rating: 4.7,
        reviews: 2100,
        verified: true,
        priceRange: '₹₹₹',
        services: ["Emergency", "Dental Checkup", "Vaccination", "Dental issue"],
        priceList: { "Emergency": 1000, "Dental Checkup": 400, "Vaccination": 250, "Dental issue": 450 },
        operatingHours: "24/7",
        phone: "+91-9876543212",
        specialties: ['Emergency', 'Surgery', 'Dental']
    },
    {
        id: 'h4',
        name: 'St. Mary\'s Eye & ENT',
        image: 'https://images.unsplash.com/photo-1538108115994-9307f77e162c?auto=format&fit=crop&q=80&w=1000',
        address: '12 Vision Plaza, Central Delhi',
        coordinates: { lat: 28.6150, lng: 77.2100 },
        rating: 4.6,
        reviews: 560,
        verified: true,
        priceRange: '₹₹',
        services: ["Eye Care", "ENT Surgery", "Hearing Test", "Eye problem"],
        priceList: { "Eye Care": 600, "ENT Surgery": 15000, "Hearing Test": 800, "Eye problem": 300 },
        operatingHours: "09:00 AM - 08:00 PM",
        phone: "+91-9876543213",
        specialties: ['Ophthalmology', 'Otolaryngology']
    },
    {
        id: 'h5',
        name: 'Fortis Memorial Research',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000',
        address: 'Sector 44, Gurgaon (NCR)',
        coordinates: { lat: 28.4595, lng: 77.0266 },
        rating: 4.9,
        reviews: 3500,
        verified: true,
        priceRange: '₹₹₹',
        services: ["Orthopedic", "Bone fracture", "Joint Replacement", "Physiotherapy"],
        priceList: { "Orthopedic": 800, "Bone fracture": 1200, "Joint Replacement": 250000, "Physiotherapy": 500 },
        operatingHours: "24/7",
        phone: "+91-9876543214",
        specialties: ['Orthopedics', 'Oncology', 'Transplant']
    },
    {
        id: 'h6',
        name: 'Max Super Speciality',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000',
        address: 'Pushpanjali Crosslay, Vaishali, NCR',
        coordinates: { lat: 28.6441, lng: 77.3400 },
        rating: 4.8,
        reviews: 2800,
        verified: true,
        priceRange: '₹₹₹',
        services: ["Cardiac Care", "Heart", "ECG", "ECHO"],
        priceList: { "Cardiac Care": 1000, "Heart": 1500, "ECG": 400, "ECHO": 1200 },
        operatingHours: "24/7",
        phone: "+91-9876543215",
        specialties: ['Cardiology', 'Gastroenterology']
    },
    {
        id: 'h7',
        name: 'Medanta - The Medicity',
        image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&q=80&w=1000',
        address: 'Sector 38, Gurgaon (NCR)',
        coordinates: { lat: 28.4251, lng: 77.0401 },
        rating: 5.0,
        reviews: 5000,
        verified: true,
        priceRange: '₹₹₹',
        services: ["Organ Transplant", "Robotic Surgery", "Full Body Checkup"],
        priceList: { "Organ Transplant": 500000, "Robotic Surgery": 150000, "Full Body Checkup": 5000 },
        operatingHours: "24/7",
        phone: "+91-9876543216",
        specialties: ['Multispeciality']
    },
    {
        id: 'h8',
        name: 'BLK-Max Hospital',
        image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80&w=1000',
        address: 'Pusa Road, Rajinder Nagar, Delhi',
        coordinates: { lat: 28.6447, lng: 77.1906 },
        rating: 4.7,
        reviews: 1800,
        verified: true,
        priceRange: '₹₹',
        services: ["Ultrasound", "X-ray", "Blood Test"],
        priceList: { "Ultrasound": 600, "X-ray": 500, "Blood Test": 300 },
        operatingHours: "24/7",
        phone: "+91-9876543217",
        specialties: ['General Medicine', 'Radiology']
    },
    {
        id: 'h9',
        name: 'Moolchand Medcity',
        image: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=1000',
        address: 'Lajpat Nagar, South Delhi',
        coordinates: { lat: 28.5678, lng: 77.2345 },
        rating: 4.8,
        reviews: 2200,
        verified: true,
        priceRange: '₹₹',
        services: ["Ayurveda", "General Surgery", "Physiotherapy"],
        priceList: { "Ayurveda": 400, "General Surgery": 25000, "Physiotherapy": 500 },
        operatingHours: "24/7",
        phone: "+91-9876543218",
        specialties: ['Ayurveda', 'Surgery']
    },
    {
        id: 'h10',
        name: 'Nanavati Max Hospital',
        image: 'https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?auto=format&fit=crop&q=80&w=1000',
        address: 'Vile Parle West, Mumbai (Reference)',
        coordinates: { lat: 19.1025, lng: 72.8390 },
        rating: 4.9,
        reviews: 3100,
        verified: true,
        priceRange: '₹₹₹',
        services: ["Oncology", "Dialysis", "Neurology"],
        priceList: { "Oncology": 2000, "Dialysis": 1500, "Neurology": 800 },
        operatingHours: "24/7",
        phone: "+91-9876543219",
        specialties: ['Oncology', 'Neurology']
    }
];

export const DOCTORS: Doctor[] = [
    { id: 'd1', name: 'Dr. Sarah Wilson', photo: 'https://images.unsplash.com/photo-1559839734-2b71f1e3c77d?auto=format&fit=crop&q=80&w=400', specialization: 'Radiology', hospitalId: 'h1', experience: '12 years', rating: 4.8, availableSlots: { "2024-03-03": ["09:00 AM", "10:00 AM", "02:00 PM"], "2024-03-04": ["11:00 AM", "04:00 PM"] } },
    { id: 'd2', name: 'Dr. James Smith', photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400', specialization: 'Pediatrics', hospitalId: 'h1', experience: '8 years', rating: 4.9, availableSlots: { "2024-03-03": ["11:00 AM", "03:00 PM"] } },
    { id: 'd3', name: 'Dr. Elena Rodriguez', photo: 'https://images.unsplash.com/photo-1594824813573-c10fe003d9f4?auto=format&fit=crop&q=80&w=400', specialization: 'Cardiology', hospitalId: 'h2', experience: '15 years', rating: 4.9, availableSlots: { "2024-03-03": ["09:30 AM", "12:00 PM"] } },
    { id: 'd4', name: 'Dr. Michael Chen', photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400', specialization: 'Dentistry', hospitalId: 'h3', experience: '10 years', rating: 4.7, availableSlots: { "2024-03-03": ["02:00 PM", "05:00 PM"] } },
    { id: 'd5', name: 'Dr. David Miller', photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400', specialization: 'Ophthalmology', hospitalId: 'h4', experience: '14 years', rating: 4.8, availableSlots: { "2024-03-03": ["10:00 AM", "01:00 PM"] } },
    { id: 'd6', name: 'Dr. Emily Brown', photo: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400', specialization: 'Orthopedics', hospitalId: 'h5', experience: '11 years', rating: 4.9, availableSlots: { "2024-03-03": ["11:30 AM", "03:30 PM"] } },
    { id: 'd7', name: 'Dr. Robert Garcia', photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400', specialization: 'Cardiology', hospitalId: 'h6', experience: '20 years', rating: 5.0, availableSlots: { "2024-03-03": ["08:00 AM", "11:00 AM"] } },
    { id: 'd8', name: 'Dr. Lisa Wang', photo: 'https://images.unsplash.com/photo-1594824813573-c10fe003d9f4?auto=format&fit=crop&q=80&w=400', specialization: 'Neurology', hospitalId: 'h7', experience: '18 years', rating: 4.9, availableSlots: { "2024-03-03": ["09:00 AM", "02:00 PM"] } },
    { id: 'd9', name: 'Dr. Andrew Taylor', photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400', specialization: 'General Surgery', hospitalId: 'h9', experience: '9 years', rating: 4.6, availableSlots: { "2024-03-03": ["10:00 AM", "04:00 PM"] } },
    { id: 'd10', name: 'Dr. Sophia Lee', photo: 'https://images.unsplash.com/photo-1559839734-2b71f1e3c77d?auto=format&fit=crop&q=80&w=400', specialization: 'Oncology', hospitalId: 'h10', experience: '13 years', rating: 4.8, availableSlots: { "2024-03-03": ["01:00 PM", "06:00 PM"] } }
    // ... potentially add more to reach 30+ if needed, but 10 diverse ones for now is good for scale
];

export const NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: 'Home', path: '/dashboard' },
    { id: 'hospitals', label: 'Find Hospitals', icon: 'Building2', path: '/dashboard/hospitals' },
    { id: 'appointments', label: 'My Appointments', icon: 'Calendar', path: '/dashboard/appointments' },
    { id: 'ai', label: 'AI Assistant', icon: 'MessageCircle', path: '/dashboard/ai-assistant' },
    { id: 'profile', label: 'Profile', icon: 'User', path: '/dashboard/profile' }
];
