import { useState, useEffect, useMemo, FormEvent } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock3,
  XCircle,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  Plus,
  RefreshCw,
  Trash2,
  Eye,
  SlidersHorizontal,
  ChevronDown,
  X,
  FileText,
  DollarSign,
  Scissors,
  Check,
  LogOut,
  ShieldCheck,
  Copy
} from 'lucide-react';
import { AppointmentRecord, AppointmentStatus } from '../types';
import {
  getStoredAppointments,
  updateAppointmentStatus,
  updateAppointmentNotes,
  updateAppointmentArtisan,
  deleteAppointmentRecord,
  markAppointmentAsRead,
  saveAppointmentRecord,
  clearAllAppointments,
  generateClientConfirmationEmail,
  APPOINTMENTS_EVENT
} from '../utils/appointmentStorage';
import { getAdminSession, logoutStaff, AdminUser } from '../utils/adminAuth';
import { SERVICES, ARTISANS, SALON_INFO } from '../data/salonData';

interface AdminPanelProps {
  onClose: () => void;
  onSignOut: () => void;
}

export default function AdminPanel({ onClose, onSignOut }: AdminPanelProps) {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [staffUser, setStaffUser] = useState<AdminUser | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRecord | null>(null);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [activeNoteText, setActiveNoteText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New manual booking form state
  const [newBooking, setNewBooking] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceId: 'hair',
    treatmentId: 'hair-cut-style',
    artisanId: 'art-1',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '02:00 PM',
    specialRequests: '',
    notes: 'Walk-in / Phone reservation'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Load appointments and staff
  const refreshAppointments = () => {
    const list = getStoredAppointments();
    setAppointments([...list]);
  };

  useEffect(() => {
    setStaffUser(getAdminSession());
    refreshAppointments();

    const handleStorageUpdate = (e: Event) => {
      refreshAppointments();
      const customEvent = e as CustomEvent<AppointmentRecord>;
      if (customEvent?.detail?.fullName) {
        showToast(`New reservation received from ${customEvent.detail.fullName}`);
      }
    };

    window.addEventListener(APPOINTMENTS_EVENT, handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);

    return () => {
      window.removeEventListener(APPOINTMENTS_EVENT, handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, []);

  const handleSignOutClick = () => {
    logoutStaff();
    onSignOut();
  };

  const handleClearAll = () => {
    if (appointments.length === 0) return;
    if (window.confirm('Are you sure you want to clear all appointment records? This cannot be undone.')) {
      clearAllAppointments();
      setAppointments([]);
      setSelectedAppointment(null);
      showToast('All appointment records cleared.');
    }
  };

  // Filtered appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter(item => {
      const matchesSearch =
        item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery) ||
        item.treatmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.artisanName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || item.serviceId === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [appointments, searchQuery, statusFilter, categoryFilter]);

  // Key KPI metrics
  const stats = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const todayAppts = appointments.filter(a => a.date === todayStr);
    const pendingAppts = appointments.filter(a => a.status === 'pending');
    const confirmedAppts = appointments.filter(a => a.status === 'confirmed');
    const completedAppts = appointments.filter(a => a.status === 'completed');

    // Calculate estimated revenue
    const revenue = appointments.reduce((acc, curr) => {
      const numeric = parseInt(curr.treatmentPrice.replace(/[^0-9]/g, ''), 10) || 0;
      return acc + numeric;
    }, 0);

    return {
      total: appointments.length,
      today: todayAppts.length,
      pending: pendingAppts.length,
      confirmed: confirmedAppts.length,
      completed: completedAppts.length,
      revenue: `₹${revenue.toLocaleString('en-IN')}`
    };
  }, [appointments]);

  // Handle status update
  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    const updated = updateAppointmentStatus(id, newStatus);
    setAppointments(updated);
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, status: newStatus, isNew: false });
    }
    showToast(`Appointment #${id} updated to ${newStatus.toUpperCase()}`);
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    if (window.confirm(`Are you sure you want to remove appointment #${id}?`)) {
      const updated = deleteAppointmentRecord(id);
      setAppointments(updated);
      if (selectedAppointment?.id === id) {
        setSelectedAppointment(null);
      }
      showToast(`Appointment #${id} deleted.`);
    }
  };

  // Handle Save Note
  const handleSaveNote = (id: string) => {
    const updated = updateAppointmentNotes(id, activeNoteText);
    setAppointments(updated);
    if (selectedAppointment) {
      setSelectedAppointment({ ...selectedAppointment, notes: activeNoteText });
    }
    showToast('Admin notes saved successfully.');
  };

  // Handle Create Manual Appointment
  const handleCreateManualBooking = (e: FormEvent) => {
    e.preventDefault();
    const currentService = SERVICES.find(s => s.id === newBooking.serviceId);
    const currentTreatment = currentService?.treatments.find(t => t.id === newBooking.treatmentId) || currentService?.treatments[0];
    const artisanObj = ARTISANS.find(a => a.id === newBooking.artisanId);

    saveAppointmentRecord({
      serviceId: newBooking.serviceId,
      serviceName: currentService?.name || 'Custom Care',
      treatmentId: currentTreatment?.id || 'manual-1',
      treatmentName: currentTreatment?.name || 'Bespoke Styling',
      treatmentPrice: currentTreatment?.price || '₹3,500',
      duration: currentTreatment?.duration || '60 min',
      artisanId: newBooking.artisanId,
      artisanName: artisanObj ? artisanObj.name : 'Master Stylist',
      date: newBooking.date,
      timeSlot: newBooking.timeSlot,
      fullName: newBooking.fullName || 'Patron',
      email: newBooking.email,
      phone: newBooking.phone || SALON_INFO.rawPhone,
      specialRequests: newBooking.specialRequests,
      notes: newBooking.notes
    });

    setIsNewBookingModalOpen(false);
    showToast('Manual reservation logged in Atelier roster.');
    setNewBooking({
      fullName: '',
      phone: '',
      email: '',
      serviceId: 'hair',
      treatmentId: 'hair-cut-style',
      artisanId: 'art-1',
      date: new Date().toISOString().split('T')[0],
      timeSlot: '02:00 PM',
      specialRequests: '',
      notes: 'Walk-in / Phone reservation'
    });
  };

  // Pre-filled WhatsApp confirmation message
  const generateWhatsAppLink = (apt: AppointmentRecord) => {
    const text = encodeURIComponent(
      `Hello ${apt.fullName},\n\nThis is the concierge from Lumière Atelier. We are pleased to confirm your appointment for *${apt.treatmentName}* with *${apt.artisanName}* on *${apt.date}* at *${apt.timeSlot}*.\n\nTicket: #${apt.id}\nLocation: 42 Lavelle Road, Chennai.\n\nWe look forward to welcoming you.`
    );
    const phoneClean = apt.phone.replace(/[^0-9]/g, '');
    const fullPhone = phoneClean.length === 10 ? `91${phoneClean}` : phoneClean;
    return `https://wa.me/${fullPhone}?text=${text}`;
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium bg-amber-500/10 text-amber-700 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Pending Review
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Confirmed
          </span>
        );
      case 'in-service':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium bg-[#B7A17A]/15 text-[#8C7650] border border-[#B7A17A]/30">
            <Scissors className="w-3 h-3 text-[#B7A17A]" />
            In Service
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium bg-[#1C1C1A]/10 text-[#1C1C1A] border border-[#1C1C1A]/20">
            <CheckCircle2 className="w-3 h-3 text-[#1C1C1A]" />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium bg-red-500/10 text-red-700 border border-red-500/20">
            <XCircle className="w-3 h-3 text-red-600" />
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF8F5] text-[#1C1C1A] flex flex-col overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-20 right-8 z-60 bg-[#1C1C1A] text-[#F7F4EE] px-5 py-3 border border-[#B7A17A] shadow-2xl flex items-center gap-3 animate-fade-in text-xs font-light">
          <Sparkles className="w-4 h-4 text-[#B7A17A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar / Reception Desk Header */}
      <header className="bg-[#1C1C1A] text-[#F7F4EE] px-6 sm:px-8 py-4 border-b border-[#2E2E2B] flex flex-wrap items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl tracking-[0.16em] font-medium text-[#F7F4EE]">
              LUMIÈRE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7A17A]" />
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#B7A17A] font-mono px-2 py-0.5 border border-[#B7A17A]/30">
              ATELIER CONCIERGE & APPOINTMENTS
            </span>
          </div>

          {staffUser && (
            <div className="flex items-center gap-1.5 text-xs text-[#E8E0D4] bg-[#2A2926] px-2.5 py-1 border border-[#3E3D39]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B7A17A]" />
              <span className="font-medium">{staffUser.name}</span>
              <span className="text-[#A69C8D]">({staffUser.role})</span>
            </div>
          )}

          <div className="hidden md:flex items-center gap-2 text-xs text-[#A69C8D] pl-3 border-l border-[#333330]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Sync Active</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setIsNewBookingModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#B7A17A] hover:bg-[#A38D66] text-[#1C1C1A] text-xs uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Walk-in Booking</span>
          </button>

          <button
            onClick={handleSignOutClick}
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#444440] hover:border-red-400 hover:text-red-300 text-[#E8E0D4] text-xs uppercase tracking-[0.14em] font-light transition-colors cursor-pointer"
            title="Sign out of staff session"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#444440] hover:border-[#F7F4EE] text-[#F7F4EE] text-xs uppercase tracking-[0.14em] font-light transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Exit to Site</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Metric KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-[#FAF8F5] p-5 border border-[#E8E0D4] space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7265] block">
              Total Roster
            </span>
            <div className="font-serif text-3xl text-[#1C1C1A]">{stats.total}</div>
            <span className="text-[11px] text-[#A69C8D]">All records</span>
          </div>

          <div className="bg-[#FAF8F5] p-5 border border-[#E8E0D4] space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7265] block">
              Today&apos;s Schedule
            </span>
            <div className="font-serif text-3xl text-[#1C1C1A]">{stats.today}</div>
            <span className="text-[11px] text-emerald-700 font-medium">In salon today</span>
          </div>

          <div className="bg-[#FAF8F5] p-5 border border-amber-500/30 bg-amber-500/5 space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-amber-800 block font-medium">
              Needs Review
            </span>
            <div className="font-serif text-3xl text-amber-800">{stats.pending}</div>
            <span className="text-[11px] text-amber-700">Awaiting confirmation</span>
          </div>

          <div className="bg-[#FAF8F5] p-5 border border-[#E8E0D4] space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7265] block">
              Confirmed
            </span>
            <div className="font-serif text-3xl text-emerald-800">{stats.confirmed}</div>
            <span className="text-[11px] text-[#7A7265]">Ready for arrival</span>
          </div>

          <div className="bg-[#FAF8F5] p-5 border border-[#E8E0D4] space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7265] block">
              Completed
            </span>
            <div className="font-serif text-3xl text-[#1C1C1A]">{stats.completed}</div>
            <span className="text-[11px] text-[#7A7265]">Finished rituals</span>
          </div>

          <div className="bg-[#1C1C1A] text-[#F7F4EE] p-5 border border-[#2E2E2B] space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B7A17A] block">
              Est. Atelier Value
            </span>
            <div className="font-serif text-2xl text-[#F7F4EE]">{stats.revenue}</div>
            <span className="text-[10px] text-[#A69C8D]">Active treatment sum</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#FAF8F5] p-4 sm:p-5 border border-[#E8E0D4] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#A69C8D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client, ticket #LM, phone, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F7F4EE] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none text-xs text-[#1C1C1A] placeholder-[#A69C8D]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A69C8D] hover:text-[#1C1C1A]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              { key: 'all', label: 'All' },
              { key: 'pending', label: `Pending (${stats.pending})` },
              { key: 'confirmed', label: `Confirmed (${stats.confirmed})` },
              { key: 'in-service', label: 'In Service' },
              { key: 'completed', label: 'Completed' },
              { key: 'cancelled', label: 'Cancelled' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                  statusFilter === tab.key
                    ? 'bg-[#1C1C1A] text-[#F7F4EE]'
                    : 'bg-[#F7F4EE] text-[#5E584F] hover:text-[#1C1C1A] border border-[#E8E0D4]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Filter and Controls */}
          <div className="flex items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-[#F7F4EE] border border-[#E8E0D4] text-xs text-[#1C1C1A] focus:outline-none cursor-pointer"
            >
              <option value="all">All Disciplines</option>
              <option value="hair">Hair Artistry</option>
              <option value="skin">Skin Care</option>
              <option value="makeup">Editorial Makeup</option>
              <option value="nails">Nail Architecture</option>
              <option value="rituals">Body Rituals</option>
              <option value="bridal">Bridal Atelier</option>
            </select>

            <button
              onClick={refreshAppointments}
              title="Refresh Roster"
              className="p-2 border border-[#E8E0D4] hover:bg-[#E8E0D4]/40 text-[#7A7265] hover:text-[#1C1C1A] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {appointments.length > 0 && (
              <button
                onClick={handleClearAll}
                title="Clear All Records"
                className="p-2 border border-[#E8E0D4] hover:border-red-400 hover:text-red-600 text-[#7A7265] transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Appointments List / Table */}
        <div className="bg-[#FAF8F5] border border-[#E8E0D4] overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-[#E8E0D4] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-[#7A7265]">
                RESERVATION DOSSIER ({filteredAppointments.length})
              </span>
            </div>
            <span className="text-xs text-[#A69C8D]">
              Click any appointment to view notes or update status
            </span>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="text-center py-20 px-6 space-y-4 max-w-md mx-auto">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#F3EDE2] border border-[#E8E0D4] flex items-center justify-center text-[#B7A17A]">
                <Calendar className="w-6 h-6 stroke-1.5" />
              </div>
              <h4 className="font-serif text-2xl text-[#1C1C1A]">
                {appointments.length === 0 ? 'No Appointments Booked' : 'No Matching Records'}
              </h4>
              <p className="text-xs text-[#7A7265] leading-relaxed">
                {appointments.length === 0
                  ? 'There are currently no appointments in the system. When clients book online through the website, their reservations will appear here in real-time.'
                  : 'No appointments match the active filters or search terms. Try clearing your filters.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsNewBookingModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1C1C1A] hover:bg-[#B7A17A] hover:text-[#1C1C1A] text-[#F7F4EE] text-xs uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Log Walk-in Patron</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Mobile View: Dedicated Touch-Friendly Cards (< md screens) */}
              <div className="md:hidden divide-y divide-[#E8E0D4]">
                {filteredAppointments.map(apt => (
                  <div
                    key={`mobile-${apt.id}`}
                    onClick={() => {
                      markAppointmentAsRead(apt.id);
                      setSelectedAppointment(apt);
                      setActiveNoteText(apt.notes || '');
                    }}
                    className={`p-4 sm:p-5 space-y-3 cursor-pointer transition-colors active:bg-[#F2ECE1]/50 ${
                      apt.isNew ? 'bg-amber-50/60' : 'bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-[#1C1C1A]">{apt.id}</span>
                          {apt.isNew && (
                            <span className="px-1.5 py-0.2 bg-[#B7A17A] text-[#1C1C1A] text-[9px] font-bold tracking-wider uppercase">
                              NEW
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-lg text-[#1C1C1A] font-medium mt-0.5">
                          {apt.fullName}
                        </h4>
                      </div>
                      <div>
                        {getStatusBadge(apt.status)}
                      </div>
                    </div>

                    <div className="bg-[#F7F4EE] p-3 border border-[#E8E0D4] space-y-1.5 text-xs">
                      <div className="font-medium text-[#1C1C1A]">
                        {apt.treatmentName}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#7A7265]">
                        <span className="text-[#B7A17A] font-semibold font-mono">{apt.treatmentPrice}</span>
                        <span>{apt.duration}</span>
                        <span>{apt.artisanName}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#5E584F] pt-1">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#B7A17A]" />
                          {apt.date}
                        </span>
                        <span className="inline-flex items-center gap-1 font-medium text-[#1C1C1A]">
                          <Clock className="w-3.5 h-3.5 text-[#B7A17A]" />
                          {apt.timeSlot}
                        </span>
                      </div>
                    </div>

                    {/* Mobile Quick Action Buttons */}
                    <div
                      className="pt-2 flex items-center justify-between gap-2 border-t border-[#E8E0D4]/70"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {apt.status === 'pending' ? (
                        <button
                          onClick={() => handleStatusChange(apt.id, 'confirmed')}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#1C1C1A] hover:bg-[#B7A17A] hover:text-[#1C1C1A] text-[#F7F4EE] text-[11px] uppercase tracking-wider font-medium transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Confirm
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedAppointment(apt);
                            setActiveNoteText(apt.notes || '');
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#F7F4EE] border border-[#E8E0D4] text-[#1C1C1A] text-[11px] uppercase tracking-wider font-medium"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#B7A17A]" />
                          View Dossier
                        </button>
                      )}

                      <div className="flex items-center gap-1.5">
                        <a
                          href={generateWhatsAppLink(apt)}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 border border-[#E8E0D4] bg-white text-emerald-700 hover:bg-emerald-50 transition-colors"
                          title="WhatsApp Client"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>

                        <a
                          href={`tel:${apt.phone}`}
                          className="p-2 border border-[#E8E0D4] bg-white text-[#1C1C1A] hover:bg-[#FAF8F5] transition-colors"
                          title="Call Client"
                        >
                          <Phone className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => handleDelete(apt.id)}
                          className="p-2 border border-[#E8E0D4] bg-white text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tablet and Desktop View: Structured Responsive Data Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F2ECE1]/60 text-[10px] uppercase tracking-wider text-[#7A7265]">
                      <th className="py-3.5 px-4 font-medium">Ticket / Date</th>
                      <th className="py-3.5 px-4 font-medium">Patron / Contact</th>
                      <th className="py-3.5 px-4 font-medium">Service & Treatment</th>
                      <th className="py-3.5 px-4 font-medium">Artisan Assigned</th>
                      <th className="py-3.5 px-4 font-medium">Status</th>
                      <th className="py-3.5 px-4 font-medium text-right">Concierge Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E0D4]">
                    {filteredAppointments.map(apt => (
                      <tr
                        key={apt.id}
                        onClick={() => {
                          markAppointmentAsRead(apt.id);
                          setSelectedAppointment(apt);
                          setActiveNoteText(apt.notes || '');
                        }}
                        className={`hover:bg-[#F2ECE1]/40 transition-colors cursor-pointer ${
                          apt.isNew ? 'bg-amber-50/70' : ''
                        }`}
                      >
                        {/* Ticket & Time */}
                        <td className="py-4 px-4 align-top">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-medium text-[#1C1C1A]">{apt.id}</span>
                            {apt.isNew && (
                              <span className="px-1.5 py-0.5 bg-[#B7A17A] text-[#1C1C1A] text-[9px] font-bold tracking-wider uppercase">
                                NEW
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-[#7A7265] mt-1">
                            <Calendar className="w-3 h-3 text-[#B7A17A]" />
                            <span>{apt.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-[#1C1C1A] font-medium mt-0.5">
                            <Clock className="w-3 h-3 text-[#B7A17A]" />
                            <span>{apt.timeSlot}</span>
                          </div>
                        </td>

                        {/* Client Info */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-serif text-base text-[#1C1C1A] font-medium">
                            {apt.fullName}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-[#5E584F] mt-1">
                            <Phone className="w-3 h-3 text-[#A69C8D]" />
                            <span>{apt.phone}</span>
                          </div>
                          {apt.email && (
                            <div className="flex items-center gap-1.5 text-[11px] text-[#7A7265] mt-0.5">
                              <Mail className="w-3 h-3 text-[#A69C8D]" />
                              <span className="truncate max-w-[150px]">{apt.email}</span>
                            </div>
                          )}
                        </td>

                        {/* Treatment & Price */}
                        <td className="py-4 px-4 align-top max-w-xs">
                          <div className="font-medium text-[#1C1C1A] leading-snug">
                            {apt.treatmentName}
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-[11px]">
                            <span className="text-[#B7A17A] font-medium font-mono">{apt.treatmentPrice}</span>
                            <span className="text-[#A69C8D]">·</span>
                            <span className="text-[#7A7265]">{apt.duration}</span>
                          </div>
                          {apt.specialRequests && (
                            <div className="mt-1.5 text-[10px] text-[#7A7265] bg-[#F7F4EE] p-1.5 border border-[#E8E0D4] rounded-xs line-clamp-1 italic">
                              &ldquo;{apt.specialRequests}&rdquo;
                            </div>
                          )}
                        </td>

                        {/* Artisan */}
                        <td className="py-4 px-4 align-top">
                          <div className="text-xs text-[#1C1C1A] font-medium flex items-center gap-1.5">
                            <User className="w-3 h-3 text-[#B7A17A]" />
                            <span>{apt.artisanName}</span>
                          </div>
                          <span className="text-[10px] text-[#A69C8D] block mt-1 uppercase tracking-wider">
                            {apt.serviceName}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4 align-top">
                          {getStatusBadge(apt.status)}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 align-top text-right space-x-2 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          {apt.status === 'pending' && (
                            <button
                              onClick={() => handleStatusChange(apt.id, 'confirmed')}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium bg-[#1C1C1A] text-[#F7F4EE] hover:bg-[#B7A17A] hover:text-[#1C1C1A] transition-colors cursor-pointer"
                              title="Confirm Booking"
                            >
                              <Check className="w-3 h-3" />
                              Confirm
                            </button>
                          )}

                          <a
                            href={generateWhatsAppLink(apt)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 p-1.5 border border-[#E8E0D4] hover:border-emerald-600 hover:text-emerald-700 text-[#5E584F] transition-colors"
                            title="WhatsApp Confirmation to Client"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`tel:${apt.phone}`}
                            className="inline-flex items-center gap-1 p-1.5 border border-[#E8E0D4] hover:border-[#1C1C1A] hover:text-[#1C1C1A] text-[#5E584F] transition-colors"
                            title="Call Client"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => {
                              setSelectedAppointment(apt);
                              setActiveNoteText(apt.notes || '');
                            }}
                            className="inline-flex items-center gap-1 p-1.5 border border-[#E8E0D4] hover:border-[#1C1C1A] text-[#5E584F] hover:text-[#1C1C1A] transition-colors cursor-pointer"
                            title="View Dossier"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(apt.id)}
                            className="inline-flex items-center gap-1 p-1.5 border border-[#E8E0D4] hover:border-red-600 hover:text-red-700 text-[#A69C8D] transition-colors cursor-pointer"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Appointment Detail & Status Management Drawer / Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-60 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-[#1C1C1A]/75 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-[#FAF8F5] border border-[#E8E0D4] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#E8E0D4] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#B7A17A] font-medium">
                    #{selectedAppointment.id}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#B7A17A]" />
                  <span className="text-[10px] uppercase tracking-wider text-[#7A7265]">
                    Received {new Date(selectedAppointment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#1C1C1A] mt-1">
                  {selectedAppointment.fullName}
                </h3>
              </div>

              <button
                onClick={() => setSelectedAppointment(null)}
                className="p-1.5 text-[#1C1C1A] hover:bg-[#E8E0D4] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#7A7265]">
                Update Booking Status
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {(['pending', 'confirmed', 'in-service', 'completed', 'cancelled'] as AppointmentStatus[]).map(st => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedAppointment.id, st)}
                    className={`py-2 px-2 text-[10px] uppercase tracking-wider font-medium text-center border transition-all cursor-pointer ${
                      selectedAppointment.status === st
                        ? 'bg-[#1C1C1A] text-[#F7F4EE] border-[#1C1C1A]'
                        : 'bg-[#F7F4EE] text-[#5E584F] border-[#E8E0D4] hover:border-[#1C1C1A]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Dossier Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F7F4EE] p-4 border border-[#E8E0D4] text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#7A7265] block mb-1">
                  Treatment / Ritual
                </span>
                <p className="font-medium text-[#1C1C1A]">{selectedAppointment.treatmentName}</p>
                <p className="text-[#B7A17A] font-mono mt-0.5">{selectedAppointment.treatmentPrice} · {selectedAppointment.duration}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#7A7265] block mb-1">
                  Date & Time Slot
                </span>
                <p className="font-medium text-[#1C1C1A]">{selectedAppointment.date}</p>
                <p className="text-[#5E584F]">{selectedAppointment.timeSlot}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#7A7265] block mb-1">
                  Client Phone
                </span>
                <a href={`tel:${selectedAppointment.phone}`} className="font-mono text-[#1C1C1A] hover:underline flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#B7A17A]" />
                  {selectedAppointment.phone}
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#7A7265] block mb-1">
                  Assigned Artisan
                </span>
                <select
                  value={selectedAppointment.artisanId}
                  onChange={(e) => {
                    const selectedArt = ARTISANS.find(a => a.id === e.target.value);
                    if (selectedArt) {
                      const updated = updateAppointmentArtisan(selectedAppointment.id, selectedArt.id, selectedArt.name);
                      setAppointments(updated);
                      setSelectedAppointment({
                        ...selectedAppointment,
                        artisanId: selectedArt.id,
                        artisanName: selectedArt.name
                      });
                      showToast(`Artisan reassigned to ${selectedArt.name}`);
                    }
                  }}
                  className="w-full bg-[#FAF8F5] border border-[#E8E0D4] px-2 py-1 text-xs text-[#1C1C1A] focus:outline-none"
                >
                  {ARTISANS.map(art => (
                    <option key={art.id} value={art.id}>
                      {art.name} ({art.role})
                    </option>
                  ))}
                  <option value="any">Master Stylist on Duty</option>
                </select>
              </div>
            </div>

            {/* Special Client Notes */}
            {selectedAppointment.specialRequests && (
              <div className="bg-amber-50/60 border border-amber-200/60 p-3.5 space-y-1 text-xs">
                <span className="text-[10px] uppercase tracking-wider text-amber-800 font-medium flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Client Requests / Allergies / Notes
                </span>
                <p className="text-[#1C1C1A] font-light leading-relaxed">
                  {selectedAppointment.specialRequests}
                </p>
              </div>
            )}

            {/* Internal Receptionist Notes */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#7A7265]">
                Internal Concierge Notes (Suite assigned, preferences)
              </label>
              <textarea
                rows={3}
                value={activeNoteText}
                onChange={(e) => setActiveNoteText(e.target.value)}
                placeholder="e.g. Reserved Suite 3. Client prefers jasmine tea..."
                className="w-full p-3 bg-[#F7F4EE] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none text-xs text-[#1C1C1A]"
              />
              <button
                onClick={() => handleSaveNote(selectedAppointment.id)}
                className="px-4 py-2 bg-[#1C1C1A] hover:bg-[#B7A17A] hover:text-[#1C1C1A] text-[#F7F4EE] text-[11px] uppercase tracking-wider font-medium transition-colors cursor-pointer"
              >
                Save Notes
              </button>
            </div>

            {/* Footer Action Links */}
            <div className="pt-4 border-t border-[#E8E0D4] space-y-3 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-[#7A7265] font-semibold block">
                Dispatch Client Confirmation:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {selectedAppointment.email && (
                  <button
                    onClick={() => {
                      const { mailtoUrl } = generateClientConfirmationEmail(selectedAppointment);
                      window.location.href = mailtoUrl;
                      showToast(`Dispatched email voucher client link to ${selectedAppointment.email}`);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#1C1C1A] text-[#F7F4EE] hover:bg-[#B7A17A] hover:text-[#1C1C1A] transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Confirmation</span>
                  </button>
                )}

                <a
                  href={generateWhatsAppLink(selectedAppointment)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-700 text-[#F7F4EE] hover:bg-emerald-800 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    const { body } = generateClientConfirmationEmail(selectedAppointment);
                    navigator.clipboard.writeText(body);
                    showToast('Full reservation confirmation copied to clipboard.');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#E8E0D4] bg-[#FAF8F5] hover:border-[#1C1C1A] text-[#1C1C1A] transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </button>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleDelete(selectedAppointment.id)}
                  className="text-red-700 hover:text-red-800 text-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Record</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual New Walk-in Booking Modal */}
      {isNewBookingModalOpen && (
        <div className="fixed inset-0 z-60 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-[#1C1C1A]/75 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#E8E0D4] shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E8E0D4] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#B7A17A] font-medium font-mono">
                  MANUAL RESERVATION
                </span>
                <h3 className="font-serif text-2xl text-[#1C1C1A] mt-1">
                  Log Walk-in / Phone Client
                </h3>
              </div>

              <button
                onClick={() => setIsNewBookingModalOpen(false)}
                className="p-1.5 text-[#1C1C1A] hover:bg-[#E8E0D4] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualBooking} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#7A7265] mb-1">
                  Client Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Radhika Apte"
                  value={newBooking.fullName}
                  onChange={(e) => setNewBooking({ ...newBooking, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A7265] mb-1">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="9845012345"
                    value={newBooking.phone}
                    onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A7265] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="patron@gmail.com"
                    value={newBooking.email}
                    onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A7265] mb-1">
                    Discipline
                  </label>
                  <select
                    value={newBooking.serviceId}
                    onChange={(e) => {
                      const sId = e.target.value;
                      const svc = SERVICES.find(s => s.id === sId);
                      setNewBooking({
                        ...newBooking,
                        serviceId: sId,
                        treatmentId: svc?.treatments[0]?.id || ''
                      });
                    }}
                    className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A7265] mb-1">
                    Treatment
                  </label>
                  <select
                    value={newBooking.treatmentId}
                    onChange={(e) => setNewBooking({ ...newBooking, treatmentId: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none truncate"
                  >
                    {SERVICES.find(s => s.id === newBooking.serviceId)?.treatments.map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.price})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A7265] mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newBooking.date}
                    onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A7265] mb-1">
                    Slot
                  </label>
                  <select
                    value={newBooking.timeSlot}
                    onChange={(e) => setNewBooking({ ...newBooking, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none"
                  >
                    {['09:30 AM', '11:00 AM', '12:30 PM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM', '07:30 PM'].map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A7265] mb-1">
                    Artisan
                  </label>
                  <select
                    value={newBooking.artisanId}
                    onChange={(e) => setNewBooking({ ...newBooking, artisanId: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none"
                  >
                    {ARTISANS.map(a => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#7A7265] mb-1">
                  Special Instructions
                </label>
                <input
                  type="text"
                  placeholder="e.g. VIP client, preferred suite"
                  value={newBooking.specialRequests}
                  onChange={(e) => setNewBooking({ ...newBooking, specialRequests: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewBookingModalOpen(false)}
                  className="px-4 py-2 border border-[#E8E0D4] hover:bg-[#E8E0D4] text-[#1C1C1A] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1C1C1A] hover:bg-[#B7A17A] hover:text-[#1C1C1A] text-[#F7F4EE] uppercase tracking-[0.16em] font-medium transition-colors"
                >
                  Create Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
