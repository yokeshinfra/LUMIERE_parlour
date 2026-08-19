import { useState, useEffect, FormEvent } from 'react';
import { 
  Search, 
  X, 
  Calendar, 
  Clock, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Clock3, 
  Mail, 
  MessageSquare, 
  Phone, 
  Printer, 
  Copy, 
  Check, 
  AlertCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { AppointmentRecord } from '../types';
import { 
  lookupAppointment, 
  lookupAppointmentsList, 
  updateAppointmentStatus, 
  generateClientConfirmationEmail,
  APPOINTMENTS_EVENT 
} from '../utils/appointmentStorage';
import { SALON_INFO } from '../data/salonData';

interface BookingStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTicketId?: string;
  onOpenNewBooking?: () => void;
  onBookNew?: () => void;
}

export default function BookingStatusModal({
  isOpen,
  onClose,
  initialTicketId = '',
  onOpenNewBooking,
  onBookNew,
}: BookingStatusModalProps) {
  const handleNewBookingTrigger = onBookNew || onOpenNewBooking;
  const [searchQuery, setSearchQuery] = useState(initialTicketId);
  const [activeAppointment, setActiveAppointment] = useState<AppointmentRecord | null>(null);
  const [resultsList, setResultsList] = useState<AppointmentRecord[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailStatusMsg, setEmailStatusMsg] = useState<string | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialTicketId) {
        setSearchQuery(initialTicketId);
        const match = lookupAppointment(initialTicketId);
        if (match) {
          setActiveAppointment(match);
          setResultsList([match]);
        }
        setHasSearched(true);
      } else {
        setSearchQuery('');
        setActiveAppointment(null);
        setResultsList([]);
        setHasSearched(false);
      }
      setEmailStatusMsg(null);
    }
  }, [isOpen, initialTicketId]);

  // Listen to storage changes in real-time
  useEffect(() => {
    const handleUpdate = () => {
      if (searchQuery.trim()) {
        const found = lookupAppointment(searchQuery);
        if (found) {
          setActiveAppointment(found);
        }
      }
    };
    window.addEventListener(APPOINTMENTS_EVENT, handleUpdate);
    return () => window.removeEventListener(APPOINTMENTS_EVENT, handleUpdate);
  }, [searchQuery]);

  if (!isOpen) return null;

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setHasSearched(true);
    const exact = lookupAppointment(searchQuery);
    const list = lookupAppointmentsList(searchQuery);

    if (exact) {
      setActiveAppointment(exact);
      setResultsList([exact]);
    } else if (list.length > 0) {
      setActiveAppointment(list[0]);
      setResultsList(list);
    } else {
      setActiveAppointment(null);
      setResultsList([]);
    }
  };

  const handleCopySummary = () => {
    if (!activeAppointment) return;
    const { body } = generateClientConfirmationEmail(activeAppointment);
    navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenEmail = () => {
    if (!activeAppointment) return;
    const { mailtoUrl } = generateClientConfirmationEmail(activeAppointment);
    window.location.href = mailtoUrl;
    setEmailStatusMsg('Opened your email client with your pre-formatted booking voucher.');
    setTimeout(() => setEmailStatusMsg(null), 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCancelBooking = () => {
    if (!activeAppointment) return;
    updateAppointmentStatus(activeAppointment.id, 'cancelled');
    setActiveAppointment({ ...activeAppointment, status: 'cancelled' });
    setCancelModalOpen(false);
  };

  const generateWhatsAppLink = (apt: AppointmentRecord) => {
    const msg = encodeURIComponent(
      `Hello LUMIÈRE Concierge! I am inquiring about my reservation:\nTicket #${apt.id}\nName: ${apt.fullName}\nTreatment: ${apt.treatmentName}\nDate: ${apt.date} at ${apt.timeSlot}.`
    );
    return `https://wa.me/91${SALON_INFO.rawPhone}?text=${msg}`;
  };

  const getStatusDisplay = (status: AppointmentRecord['status']) => {
    switch (status) {
      case 'confirmed':
        return {
          title: 'Confirmed & Suite Reserved',
          badge: 'Confirmed',
          badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          desc: 'Your private salon suite and master artisan have been reserved. Please arrive 10 minutes early.',
          icon: CheckCircle2,
          iconClass: 'text-emerald-700'
        };
      case 'pending':
        return {
          title: 'Awaiting Concierge Verification',
          badge: 'Pending Review',
          badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
          desc: 'Your reservation request is being reviewed by our reception concierge. You will receive an instant update.',
          icon: Clock3,
          iconClass: 'text-amber-700'
        };
      case 'in-service':
        return {
          title: 'In Service',
          badge: 'Active Treatment',
          badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
          desc: 'Treatment session currently in progress in the atelier.',
          icon: Sparkles,
          iconClass: 'text-blue-700'
        };
      case 'completed':
        return {
          title: 'Ritual Completed',
          badge: 'Completed',
          badgeClass: 'bg-stone-200 text-stone-800 border-stone-300',
          desc: 'Thank you for visiting LUMIÈRE Salon & Atelier.',
          icon: ShieldCheck,
          iconClass: 'text-stone-700'
        };
      case 'cancelled':
        return {
          title: 'Reservation Cancelled',
          badge: 'Cancelled',
          badgeClass: 'bg-red-100 text-red-800 border-red-300',
          desc: 'This booking has been cancelled. Feel free to schedule a new appointment whenever you wish.',
          icon: AlertCircle,
          iconClass: 'text-red-700'
        };
      default:
        return {
          title: 'Reservation Logged',
          badge: 'Active',
          badgeClass: 'bg-[#F2ECE1] text-[#1C1C1A] border-[#E8E0D4]',
          desc: 'Your booking is recorded in our reception directory.',
          icon: CheckCircle2,
          iconClass: 'text-[#B7A17A]'
        };
    }
  };

  return (
    <div
      id="booking-status-modal"
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-[#1C1C1A]/80 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-2xl bg-[#F7F4EE] border border-[#E8E0D4] shadow-2xl flex flex-col my-auto overflow-hidden text-[#1C1C1A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-7 border-b border-[#E8E0D4] bg-[#FAF8F5] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#B7A17A] font-semibold font-mono">
                LUMIÈRE CLIENT PORTAL
              </span>
              <span className="w-1 h-1 rounded-full bg-[#B7A17A]" />
              <span className="text-[10px] uppercase tracking-wider text-[#A69C8D]">
                Live Reservation Confirmation
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1C1A] mt-1">
              Check Appointment Status
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#1C1C1A] hover:text-[#B7A17A] hover:bg-[#E8E0D4]/40 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-6 flex-1 overflow-y-auto max-h-[75vh]">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-[11px] uppercase tracking-[0.18em] text-[#7A7265] font-medium">
              Enter your Ticket # (e.g. LM-8421), Phone Number, or Email:
            </label>
            <div className="flex items-stretch gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#A69C8D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Ticket #LM-XXXX or 10-digit Phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none text-sm text-[#1C1C1A] font-medium placeholder-[#A69C8D]"
                  autoFocus={!initialTicketId}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveAppointment(null);
                      setResultsList([]);
                      setHasSearched(false);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A69C8D] hover:text-[#1C1C1A]"
                  >
                    Clear
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#1C1C1A] hover:bg-[#B7A17A] hover:text-[#1C1C1A] text-[#F7F4EE] text-xs uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer shrink-0"
              >
                Track
              </button>
            </div>
          </form>

          {/* Multiple matches selector if user queried a phone number with multiple bookings */}
          {resultsList.length > 1 && (
            <div className="p-3 bg-[#FAF8F5] border border-[#E8E0D4] space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#7A7265] font-medium block">
                Found {resultsList.length} Appointments for this contact:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {resultsList.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveAppointment(item)}
                    className={`p-2.5 text-left border text-xs transition-colors cursor-pointer ${
                      activeAppointment?.id === item.id 
                        ? 'bg-[#1C1C1A] text-[#F7F4EE] border-[#1C1C1A]' 
                        : 'bg-[#F7F4EE] border-[#E8E0D4] hover:border-[#B7A17A]'
                    }`}
                  >
                    <div className="font-mono font-bold text-[11px]">{item.id}</div>
                    <div className="font-medium truncate">{item.treatmentName}</div>
                    <div className="text-[10px] opacity-75">{item.date} · {item.timeSlot}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result Card */}
          {activeAppointment ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Digital Pass Box */}
              <div className="bg-[#FAF8F5] border-2 border-[#E8E0D4] p-5 sm:p-6 relative space-y-5 shadow-xs">
                {/* Status Bar */}
                {(() => {
                  const statusInfo = getStatusDisplay(activeAppointment.status);
                  const StatusIcon = statusInfo.icon;
                  return (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E0D4]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F3EDE2] border border-[#E8E0D4] flex items-center justify-center shrink-0">
                          <StatusIcon className={`w-5 h-5 ${statusInfo.iconClass}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-lg font-medium text-[#1C1C1A]">
                              {statusInfo.title}
                            </span>
                          </div>
                          <span className="text-xs text-[#7A7265] block mt-0.5">
                            {statusInfo.desc}
                          </span>
                        </div>
                      </div>

                      <span className={`self-start sm:self-auto px-3 py-1 text-[11px] uppercase tracking-wider font-semibold border rounded-full ${statusInfo.badgeClass}`}>
                        {statusInfo.badge}
                      </span>
                    </div>
                  );
                })()}

                {/* Ticket Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#7A7265] block">
                      Reservation Pass ID
                    </span>
                    <div className="font-mono text-base font-bold text-[#1C1C1A] flex items-center gap-2">
                      <span>#{activeAppointment.id}</span>
                      <button
                        onClick={handleCopySummary}
                        className="text-[10px] text-[#B7A17A] hover:underline flex items-center gap-1 cursor-pointer font-sans"
                        title="Copy booking dossier"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#7A7265] block">
                      Patron Name
                    </span>
                    <div className="font-serif text-base text-[#1C1C1A] font-medium">
                      {activeAppointment.fullName}
                    </div>
                  </div>

                  <div className="space-y-1 sm:col-span-2 bg-[#F7F4EE] p-3.5 border border-[#E8E0D4]">
                    <span className="text-[10px] uppercase tracking-wider text-[#B7A17A] font-semibold block">
                      Selected Ritual & Service
                    </span>
                    <div className="font-serif text-lg text-[#1C1C1A] font-medium">
                      {activeAppointment.treatmentName}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#7A7265] pt-0.5">
                      <span className="font-medium font-mono text-[#B7A17A] text-sm">
                        {activeAppointment.treatmentPrice}
                      </span>
                      <span>·</span>
                      <span>{activeAppointment.duration}</span>
                      <span>·</span>
                      <span>{activeAppointment.serviceName}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#7A7265] block">
                      Date & Reserved Slot
                    </span>
                    <div className="flex items-center gap-2 text-sm text-[#1C1C1A] font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#B7A17A]" />
                      <span>{activeAppointment.date}</span>
                      <span>at</span>
                      <Clock className="w-3.5 h-3.5 text-[#B7A17A]" />
                      <span>{activeAppointment.timeSlot}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#7A7265] block">
                      Assigned Master Artisan
                    </span>
                    <div className="flex items-center gap-2 text-sm text-[#1C1C1A] font-medium">
                      <User className="w-3.5 h-3.5 text-[#B7A17A]" />
                      <span>{activeAppointment.artisanName}</span>
                    </div>
                  </div>

                  {activeAppointment.specialRequests && (
                    <div className="sm:col-span-2 space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#7A7265] block">
                        Special Requests / Preferences
                      </span>
                      <p className="text-xs text-[#5E584F] italic bg-[#F7F4EE] p-2.5 border border-[#E8E0D4]">
                        &ldquo;{activeAppointment.specialRequests}&rdquo;
                      </p>
                    </div>
                  )}

                  <div className="sm:col-span-2 pt-2 border-t border-[#E8E0D4] flex flex-col sm:flex-row justify-between text-[11px] text-[#7A7265] gap-2">
                    <div>
                      <strong>Atelier Address:</strong> {SALON_INFO.address}
                    </div>
                    <div>
                      <strong>Concierge Phone:</strong> {SALON_INFO.phone}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Alert feedback */}
              {emailStatusMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{emailStatusMsg}</span>
                </div>
              )}

              {/* Confirmation Action Channels */}
              <div className="space-y-2.5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7265] font-semibold block">
                  Receive & Share Confirmation:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Option 1: Email Confirmation Voucher */}
                  <button
                    onClick={handleOpenEmail}
                    className="p-3 bg-[#FAF8F5] border border-[#E8E0D4] hover:border-[#1C1C1A] text-left transition-colors flex items-center gap-3 cursor-pointer group"
                    title="Send pre-formatted confirmation email voucher"
                  >
                    <div className="p-2 bg-[#F3EDE2] text-[#B7A17A] group-hover:bg-[#1C1C1A] group-hover:text-[#F7F4EE] transition-colors rounded-xs">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium text-xs text-[#1C1C1A] block">Email Voucher</span>
                      <span className="text-[10px] text-[#7A7265] block">Open mail client</span>
                    </div>
                  </button>

                  {/* Option 2: WhatsApp Concierge Link */}
                  <a
                    href={generateWhatsAppLink(activeAppointment)}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-[#FAF8F5] border border-[#E8E0D4] hover:border-emerald-600 text-left transition-colors flex items-center gap-3 group"
                    title="Connect on WhatsApp with concierge"
                  >
                    <div className="p-2 bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors rounded-xs">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium text-xs text-[#1C1C1A] block">WhatsApp Desk</span>
                      <span className="text-[10px] text-[#7A7265] block">Instant chat & sync</span>
                    </div>
                  </a>

                  {/* Option 3: Copy / Print Pass */}
                  <button
                    onClick={handlePrint}
                    className="p-3 bg-[#FAF8F5] border border-[#E8E0D4] hover:border-[#1C1C1A] text-left transition-colors flex items-center gap-3 cursor-pointer group"
                    title="Print or Save PDF of Reservation Pass"
                  >
                    <div className="p-2 bg-[#F3EDE2] text-[#1C1C1A] group-hover:bg-[#1C1C1A] group-hover:text-[#F7F4EE] transition-colors rounded-xs">
                      <Printer className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium text-xs text-[#1C1C1A] block">Print / Save PDF</span>
                      <span className="text-[10px] text-[#7A7265] block">Physical voucher</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Secondary Options: Cancel / Reschedule */}
              <div className="pt-3 border-t border-[#E8E0D4] flex items-center justify-between">
                {activeAppointment.status !== 'cancelled' && activeAppointment.status !== 'completed' ? (
                  <button
                    onClick={() => setCancelModalOpen(true)}
                    className="text-xs text-red-600 hover:text-red-800 hover:underline cursor-pointer"
                  >
                    Cancel this reservation
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1C1C1A] hover:bg-[#B7A17A] hover:text-[#1C1C1A] text-[#F7F4EE] text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Dossier Copied' : 'Copy Confirmation Dossier'}</span>
                </button>
              </div>
            </div>
          ) : hasSearched ? (
            /* No Results State */
            <div className="text-center py-12 px-4 space-y-4 max-w-md mx-auto bg-[#FAF8F5] border border-[#E8E0D4]">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#F3EDE2] border border-[#E8E0D4] flex items-center justify-center text-[#B7A17A]">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#1C1C1A]">
                No Reservation Found
              </h3>
              <p className="text-xs text-[#7A7265] leading-relaxed">
                We could not find an active reservation for &ldquo;{searchQuery}&rdquo;. 
                Please verify your ticket number or phone number.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    if (handleNewBookingTrigger) handleNewBookingTrigger();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#1C1C1A] hover:bg-[#B7A17A] hover:text-[#1C1C1A] text-[#F7F4EE] text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
                >
                  Reserve an Appointment
                </button>
                <a
                  href={`tel:${SALON_INFO.rawPhone}`}
                  className="w-full sm:w-auto px-5 py-2.5 border border-[#E8E0D4] hover:border-[#1C1C1A] text-[#1C1C1A] text-xs uppercase tracking-wider font-medium text-center"
                >
                  Call Concierge
                </a>
              </div>
            </div>
          ) : (
            /* Initial Guide State */
            <div className="bg-[#FAF8F5] border border-[#E8E0D4] p-6 text-center space-y-3">
              <Sparkles className="w-6 h-6 text-[#B7A17A] mx-auto" />
              <h4 className="font-serif text-xl text-[#1C1C1A]">
                Track Your Salon Reservation
              </h4>
              <p className="text-xs text-[#7A7265] max-w-md mx-auto leading-relaxed">
                When you reserve an appointment online, you receive a ticket number (e.g. #LM-8421). 
                Enter your ticket number or registered phone number above to view real-time confirmation status, 
                assigned artisan, arrival directions, and email confirmation options.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation of Cancellation Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#1C1C1A]/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#FAF8F5] border border-[#E8E0D4] p-6 space-y-4 text-center">
            <AlertCircle className="w-10 h-10 text-red-600 mx-auto" />
            <h4 className="font-serif text-2xl text-[#1C1C1A]">
              Cancel Reservation?
            </h4>
            <p className="text-xs text-[#5E584F] leading-relaxed">
              Are you sure you wish to cancel reservation <strong>#{activeAppointment?.id}</strong> for {activeAppointment?.treatmentName}?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setCancelModalOpen(false)}
                className="px-4 py-2 border border-[#E8E0D4] hover:border-[#1C1C1A] text-xs uppercase tracking-wider font-medium cursor-pointer"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-wider font-medium cursor-pointer"
              >
                Yes, Cancel Reservation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
