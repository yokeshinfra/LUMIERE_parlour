export type ServiceCategory = 'hair' | 'skin' | 'makeup' | 'nails' | 'rituals' | 'bridal';

export interface TreatmentItem {
  id: string;
  name: string;
  category: ServiceCategory;
  duration: string;
  price: string;
  description: string;
  tags: string[];
}

export interface ServiceCardData {
  id: string;
  category: ServiceCategory;
  number: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  treatments: TreatmentItem[];
}

export interface TransformationItem {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  treatmentName: string;
  artisan: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  service: string;
  quote: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'hair' | 'skin' | 'makeup' | 'nails' | 'bridal' | 'interior';
  image: string;
  aspect: 'square' | 'portrait' | 'landscape';
  description?: string;
}

export interface Artisan {
  id: string;
  name: string;
  role: string;
  experience: string;
  image: string;
  specialties: string[];
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'in-service' | 'completed' | 'cancelled';

export interface AppointmentRecord {
  id: string;
  createdAt: string;
  serviceId: string;
  serviceName: string;
  treatmentId: string;
  treatmentName: string;
  treatmentPrice: string;
  duration: string;
  artisanId: string;
  artisanName: string;
  date: string;
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  status: AppointmentStatus;
  notes?: string;
  isNew?: boolean;
}

export interface BookingFormState {
  serviceId: string;
  treatmentId: string;
  artisanId: string;
  date: string;
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
}
