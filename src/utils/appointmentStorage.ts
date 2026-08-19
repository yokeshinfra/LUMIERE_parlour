import { AppointmentRecord, AppointmentStatus } from '../types';

const STORAGE_KEY = 'lumiere_salon_appointments_v2';
export const APPOINTMENTS_EVENT = 'lumiere_appointments_updated';

// Empty default: no mock bookings hardcoded in the codebase
const DEFAULT_INITIAL_APPOINTMENTS: AppointmentRecord[] = [];

export function getStoredAppointments(): AppointmentRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load appointments from localStorage:', err);
    return [];
  }
}

export function saveAppointmentRecord(appointment: Omit<AppointmentRecord, 'id' | 'createdAt' | 'status' | 'isNew'>): AppointmentRecord {
  const current = getStoredAppointments();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newId = `LM-${randomNum}`;

  const newRecord: AppointmentRecord = {
    ...appointment,
    id: newId,
    createdAt: new Date().toISOString(),
    status: 'pending',
    isNew: true
  };

  const updated = [newRecord, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(APPOINTMENTS_EVENT, { detail: newRecord }));
  } catch (err) {
    console.error('Failed to save appointment to localStorage:', err);
  }

  return newRecord;
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus): AppointmentRecord[] {
  const current = getStoredAppointments();
  const updated = current.map(item => item.id === id ? { ...item, status, isNew: false } : item);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(APPOINTMENTS_EVENT));
  } catch (err) {
    console.error('Failed to update appointment status:', err);
  }
  return updated;
}

export function updateAppointmentArtisan(id: string, artisanId: string, artisanName: string): AppointmentRecord[] {
  const current = getStoredAppointments();
  const updated = current.map(item => item.id === id ? { ...item, artisanId, artisanName } : item);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(APPOINTMENTS_EVENT));
  } catch (err) {
    console.error('Failed to update artisan:', err);
  }
  return updated;
}

export function updateAppointmentNotes(id: string, notes: string): AppointmentRecord[] {
  const current = getStoredAppointments();
  const updated = current.map(item => item.id === id ? { ...item, notes } : item);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(APPOINTMENTS_EVENT));
  } catch (err) {
    console.error('Failed to update notes:', err);
  }
  return updated;
}

export function deleteAppointmentRecord(id: string): AppointmentRecord[] {
  const current = getStoredAppointments();
  const updated = current.filter(item => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(APPOINTMENTS_EVENT));
  } catch (err) {
    console.error('Failed to delete appointment:', err);
  }
  return updated;
}

export function markAppointmentAsRead(id: string): AppointmentRecord[] {
  const current = getStoredAppointments();
  const updated = current.map(item => item.id === id ? { ...item, isNew: false } : item);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(APPOINTMENTS_EVENT));
  } catch (err) {
    console.error('Failed to mark read:', err);
  }
  return updated;
}

export function clearAllAppointments(): AppointmentRecord[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new CustomEvent(APPOINTMENTS_EVENT));
  } catch (err) {
    console.error('Failed to clear appointments:', err);
  }
  return [];
}

export function resetAppointmentsToDefault(): AppointmentRecord[] {
  return clearAllAppointments();
}

/**
 * Look up appointment by Ticket ID (e.g. LM-1234) or phone number
 */
export function lookupAppointment(query: string): AppointmentRecord | null {
  if (!query || !query.trim()) return null;
  const clean = query.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  const all = getStoredAppointments();

  return all.find(item => {
    const cleanId = item.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanPhone = item.phone.replace(/[^0-9]/g, '');
    const cleanEmail = (item.email || '').toLowerCase().trim();
    
    return cleanId === clean || 
           cleanPhone.includes(clean) || 
           cleanPhone === clean || 
           cleanEmail === query.trim().toLowerCase();
  }) || null;
}

/**
 * Find all appointments matching a search term (Phone, Name, or Ticket)
 */
export function lookupAppointmentsList(query: string): AppointmentRecord[] {
  if (!query || !query.trim()) return [];
  const clean = query.trim().toLowerCase();
  const all = getStoredAppointments();

  return all.filter(item => {
    const idMatch = item.id.toLowerCase().includes(clean);
    const nameMatch = item.fullName.toLowerCase().includes(clean);
    const phoneMatch = item.phone.replace(/[^0-9]/g, '').includes(clean.replace(/[^0-9]/g, ''));
    const emailMatch = (item.email || '').toLowerCase().includes(clean);

    return idMatch || nameMatch || (clean.replace(/[^0-9]/g, '').length >= 4 && phoneMatch) || emailMatch;
  });
}

/**
 * Generates email content for client confirmation
 */
export function generateClientConfirmationEmail(apt: AppointmentRecord): { subject: string; body: string; mailtoUrl: string } {
  const subject = `LUMIÈRE Atelier Reservation Confirmation: ${apt.treatmentName} [Ticket #${apt.id}]`;
  const body = `Dear ${apt.fullName},\n\nWe are delighted to confirm your private reservation at LUMIÈRE Atelier & Salon.\n\n` +
    `----------------------------------------\n` +
    `RESERVATION DETAILS\n` +
    `----------------------------------------\n` +
    `Ticket ID: #${apt.id}\n` +
    `Status: ${apt.status.toUpperCase()}\n` +
    `Service: ${apt.serviceName}\n` +
    `Treatment: ${apt.treatmentName}\n` +
    `Artisan: ${apt.artisanName}\n` +
    `Date: ${apt.date}\n` +
    `Time: ${apt.timeSlot}\n` +
    `Duration: ${apt.duration}\n` +
    `Estimated Investment: ${apt.treatmentPrice}\n` +
    (apt.specialRequests ? `Special Requests: ${apt.specialRequests}\n` : '') +
    `----------------------------------------\n\n` +
    `SALON LOCATION & ARRIVAL:\n` +
    `LUMIÈRE Salon & Atelier\n` +
    `48 Boulevard Saint-Honoré, 7th Floor Suite, Chennai\n` +
    `Concierge Desk: +91 9345781106\n\n` +
    `We request guests to arrive 10 minutes prior to experience our welcoming herbal tea ritual.\n\n` +
    `You can track or view your live reservation anytime on our website using your Ticket #${apt.id}.\n\n` +
    `Warm regards,\n` +
    `LUMIÈRE Concierge Team\n` +
    `yokeshkn2002@gmail.com`;

  const mailtoUrl = `mailto:${encodeURIComponent(apt.email || '')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return { subject, body, mailtoUrl };
}

