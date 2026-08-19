import { useState, useEffect, FormEvent } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Check, 
  Sparkles, 
  Phone, 
  Mail, 
  ArrowRight, 
  ArrowLeft, 
  MessageSquare, 
  Copy, 
  Printer, 
  Search, 
  ShieldCheck 
} from 'lucide-react';
import { SERVICES, BRIDAL_PACKAGES, ARTISANS, SALON_INFO } from '../data/salonData';
import { BookingFormState, AppointmentRecord } from '../types';
import { saveAppointmentRecord, generateClientConfirmationEmail } from '../utils/appointmentStorage';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialTreatmentId?: string;
  onTrackBooking?: (ticketId: string) => void;
}

export default function AppointmentModal({
  isOpen,
  onClose,
  initialServiceId,
  initialTreatmentId,
  onTrackBooking,
}: AppointmentModalProps) {
  const [step, setStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentRecord | null>(null);
  const [copied, setCopied] = useState(false);
  const [emailStatusMsg, setEmailStatusMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState<BookingFormState>({
    serviceId: initialServiceId || 'hair',
    treatmentId: initialTreatmentId || 'hair-cut-style',
    artisanId: 'any',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '11:00 AM',
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  useEffect(() => {
    if (initialServiceId) {
      setFormData(prev => ({
        ...prev,
        serviceId: initialServiceId,
        treatmentId: initialTreatmentId || (SERVICES.find(s => s.id === initialServiceId)?.treatments[0]?.id || '')
      }));
    }
  }, [initialServiceId, initialTreatmentId]);

  if (!isOpen) return null;

  const currentService = SERVICES.find(s => s.id === formData.serviceId);
  const currentTreatment = currentService?.treatments.find(t => t.id === formData.treatmentId) || currentService?.treatments[0];
  const selectedArtisan = ARTISANS.find(a => a.id === formData.artisanId);

  const timeSlots = [
    '09:30 AM', '11:00 AM', '12:30 PM',
    '02:00 PM', '03:30 PM', '05:00 PM',
    '06:30 PM', '07:30 PM'
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Save real record to persistent storage for admin panel
    const created = saveAppointmentRecord({
      serviceId: formData.serviceId,
      serviceName: currentService?.name || 'Custom Artistry',
      treatmentId: currentTreatment?.id || 'bespoke',
      treatmentName: currentTreatment?.name || 'Bespoke Beauty Ritual',
      treatmentPrice: currentTreatment?.price || '₹3,500',
      duration: currentTreatment?.duration || '60 min',
      artisanId: formData.artisanId,
      artisanName: selectedArtisan ? selectedArtisan.name : 'Master Stylist on Duty',
      date: formData.date,
      timeSlot: formData.timeSlot,
      fullName: formData.fullName || 'Guest Patron',
      email: formData.email || '',
      phone: formData.phone || '',
      specialRequests: formData.specialRequests || ''
    });

    setConfirmedBooking(created);
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setConfirmedBooking(null);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1C1A]/75 backdrop-blur-xs transition-opacity"
        onClick={handleResetAndClose}
      />

      <div className="relative w-full max-w-2xl bg-[#F7F4EE] border border-[#E8E0D4] shadow-2xl z-10 overflow-hidden flex flex-col my-auto">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-7 border-b border-[#E8E0D4] bg-[#FAF8F5] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#B7A17A] font-medium font-mono">
                LUMIÈRE ATELIER
              </span>
              <span className="w-1 h-1 rounded-full bg-[#B7A17A]" />
              <span className="text-[10px] uppercase tracking-wider text-[#A69C8D]">
                Step {step} of 3
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-3xl text-[#1C1C1A] mt-1">
              {isSuccess ? 'Reservation Confirmed' : 'Private Appointment Booking'}
            </h3>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 text-[#1C1C1A] hover:text-[#B7A17A] hover:bg-[#E8E0D4]/40 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {!isSuccess && (
          <div className="w-full bg-[#E8E0D4] h-[2px]">
            <div
              className="bg-[#B7A17A] h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Body Content */}
        <div className="p-4 sm:p-7 flex-1 overflow-y-auto max-h-[72vh]">
          {isSuccess ? (
            /* Confirmation Screen */
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-[#E8E0D4]/40 border border-[#B7A17A] mx-auto flex items-center justify-center text-[#B7A17A]">
                <Check className="w-7 h-7" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#B7A17A] font-semibold block font-mono">
                  RESERVATION TICKET #{confirmedBooking?.id || 'LM-8421'}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl text-[#1C1C1A]">
                  Reservation Confirmed & Logged
                </h4>
                <p className="text-xs sm:text-sm text-[#5E584F] font-light max-w-md mx-auto leading-relaxed">
                  A private salon suite has been scheduled for <strong className="text-[#1C1C1A]">{formData.fullName || 'you'}</strong> on{' '}
                  <strong className="text-[#1C1C1A]">{formData.date}</strong> at <strong className="text-[#1C1C1A]">{formData.timeSlot}</strong>.
                </p>
              </div>

              {/* Digital Pass Receipt Box */}
              <div className="p-5 sm:p-6 bg-[#FAF8F5] border-2 border-[#E8E0D4] text-left max-w-md mx-auto space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-[#E8E0D4] pb-2.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#7A7265]">Status:</span>
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-full font-semibold text-[10px] uppercase tracking-wider">
                    Pending Concierge Review
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#E8E0D4] pb-2">
                  <span className="text-[#7A7265]">Service Ritual:</span>
                  <span className="font-medium text-[#1C1C1A]">{currentTreatment?.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E0D4] pb-2">
                  <span className="text-[#7A7265]">Duration:</span>
                  <span className="text-[#1C1C1A]">{currentTreatment?.duration}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E0D4] pb-2">
                  <span className="text-[#7A7265]">Master Artisan:</span>
                  <span className="text-[#1C1C1A]">
                    {selectedArtisan ? selectedArtisan.name : 'Master Stylist on Duty'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#E8E0D4] pb-2">
                  <span className="text-[#7A7265]">Estimated Investment:</span>
                  <span className="font-serif text-sm text-[#1C1C1A] font-medium">{currentTreatment?.price}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#7A7265]">Location:</span>
                  <span className="text-[#1C1C1A] text-right">{SALON_INFO.address}</span>
                </div>
              </div>

              {/* Status Alert feedback */}
              {emailStatusMsg && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2 max-w-md mx-auto">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{emailStatusMsg}</span>
                </div>
              )}

              {/* Confirmation Options */}
              <div className="space-y-3 max-w-md mx-auto text-left">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7265] font-semibold block text-center">
                  Confirmation & Tracking Options:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Option 1: Send to Email */}
                  <button
                    type="button"
                    onClick={() => {
                      if (confirmedBooking) {
                        const { mailtoUrl } = generateClientConfirmationEmail(confirmedBooking);
                        window.location.href = mailtoUrl;
                        setEmailStatusMsg('Opening email client with your reservation pass...');
                        setTimeout(() => setEmailStatusMsg(null), 4000);
                      }
                    }}
                    className="p-3 bg-[#FAF8F5] border border-[#E8E0D4] hover:border-[#1C1C1A] text-left transition-colors flex items-center gap-2.5 cursor-pointer group"
                  >
                    <div className="p-2 bg-[#F3EDE2] text-[#B7A17A] group-hover:bg-[#1C1C1A] group-hover:text-[#F7F4EE] transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium text-xs text-[#1C1C1A] block">Email Confirmation</span>
                      <span className="text-[10px] text-[#7A7265] block">Open voucher in Mail</span>
                    </div>
                  </button>

                  {/* Option 2: WhatsApp Concierge */}
                  <button
                    type="button"
                    onClick={() => {
                      const msg = encodeURIComponent(
                        `Hello LUMIÈRE Concierge! I have reserved an appointment:\nTicket #${confirmedBooking?.id || 'LM-8421'}\nName: ${formData.fullName}\nTreatment: ${currentTreatment?.name}\nDate: ${formData.date} at ${formData.timeSlot}.`
                      );
                      window.open(`https://wa.me/91${SALON_INFO.rawPhone}?text=${msg}`, '_blank');
                    }}
                    className="p-3 bg-[#FAF8F5] border border-[#E8E0D4] hover:border-emerald-600 text-left transition-colors flex items-center gap-2.5 cursor-pointer group"
                  >
                    <div className="p-2 bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium text-xs text-[#1C1C1A] block">WhatsApp Concierge</span>
                      <span className="text-[10px] text-[#7A7265] block">Instant notification</span>
                    </div>
                  </button>

                  {/* Option 3: Track Live on Website */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onTrackBooking && confirmedBooking) {
                        onTrackBooking(confirmedBooking.id);
                      }
                    }}
                    className="p-3 bg-[#FAF8F5] border border-[#E8E0D4] hover:border-[#1C1C1A] text-left transition-colors flex items-center gap-2.5 cursor-pointer group sm:col-span-2"
                  >
                    <div className="p-2 bg-[#F3EDE2] text-[#1C1C1A] group-hover:bg-[#1C1C1A] group-hover:text-[#F7F4EE] transition-colors">
                      <Search className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs text-[#1C1C1A]">Track Live on Website</span>
                        <span className="text-[10px] text-[#B7A17A] uppercase tracking-wider font-semibold">View Status →</span>
                      </div>
                      <span className="text-[10px] text-[#7A7265] block">
                        Lookup anytime using Ticket #{confirmedBooking?.id || 'LM-8421'} or your phone number
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={() => {
                    if (confirmedBooking) {
                      const { body } = generateClientConfirmationEmail(confirmedBooking);
                      navigator.clipboard.writeText(body);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2500);
                    }
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs uppercase tracking-wider font-medium text-[#1C1C1A] border border-[#E8E0D4] hover:border-[#1C1C1A] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy Voucher'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-7 py-2.5 text-xs uppercase tracking-wider font-medium text-[#F7F4EE] bg-[#1C1C1A] hover:bg-[#B7A17A] hover:text-[#1C1C1A] transition-colors cursor-pointer"
                >
                  Close & Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1: Service & Treatment Selection */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#7A7265] mb-2 font-medium">
                      Select Service Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {SERVICES.map((srv) => (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              serviceId: srv.id,
                              treatmentId: srv.treatments[0]?.id || ''
                            });
                          }}
                          className={`p-3 text-center border transition-all duration-200 cursor-pointer ${
                            formData.serviceId === srv.id
                              ? 'bg-[#1C1C1A] text-[#F7F4EE] border-[#1C1C1A]'
                              : 'bg-[#FAF8F5] text-[#1C1C1A] border-[#E8E0D4] hover:border-[#B7A17A]'
                          }`}
                        >
                          <span className="text-[10px] font-mono block opacity-60">{srv.number}</span>
                          <span className="font-serif text-lg block">{srv.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#7A7265] mb-2 font-medium">
                      Select Specific Ritual / Treatment
                    </label>
                    <div className="space-y-2.5">
                      {currentService?.treatments.map((tr) => (
                        <div
                          key={tr.id}
                          onClick={() => setFormData({ ...formData, treatmentId: tr.id })}
                          className={`p-4 border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                            formData.treatmentId === tr.id
                              ? 'bg-[#FAF8F5] border-[#1C1C1A] shadow-xs'
                              : 'bg-[#F7F4EE] border-[#E8E0D4] hover:border-[#B7A17A]'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-base text-[#1C1C1A]">{tr.name}</span>
                              {formData.treatmentId === tr.id && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#B7A17A]" />
                              )}
                            </div>
                            <span className="text-xs text-[#7A7265] block font-light">
                              {tr.duration} · {tr.description.substring(0, 75)}...
                            </span>
                          </div>
                          <span className="font-serif text-base text-[#1C1C1A] font-medium shrink-0 ml-4">
                            {tr.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Artisan, Date & Time Slot */}
              {step === 2 && (
                <div className="space-y-6">
                  {/* Select Artisan */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#7A7265] mb-2 font-medium">
                      Preferred Master Artisan
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, artisanId: 'any' })}
                        className={`p-3.5 border text-left transition-all cursor-pointer ${
                          formData.artisanId === 'any'
                            ? 'bg-[#1C1C1A] text-[#F7F4EE] border-[#1C1C1A]'
                            : 'bg-[#FAF8F5] text-[#1C1C1A] border-[#E8E0D4] hover:border-[#B7A17A]'
                        }`}
                      >
                        <span className="font-serif text-base block">Any Available Master Artisan</span>
                        <span className="text-[11px] opacity-70 block">Fastest availability slot</span>
                      </button>

                      {ARTISANS.map((art) => (
                        <button
                          key={art.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, artisanId: art.id })}
                          className={`p-3.5 border text-left transition-all flex items-center gap-3 cursor-pointer ${
                            formData.artisanId === art.id
                              ? 'bg-[#1C1C1A] text-[#F7F4EE] border-[#1C1C1A]'
                              : 'bg-[#FAF8F5] text-[#1C1C1A] border-[#E8E0D4] hover:border-[#B7A17A]'
                          }`}
                        >
                          <img
                            src={art.image}
                            alt={art.name}
                            className="w-10 h-10 rounded-full object-cover shrink-0"
                          />
                          <div>
                            <span className="font-serif text-base block">{art.name}</span>
                            <span className="text-[10px] opacity-70 block">{art.role.split('&')[0]}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#7A7265] mb-2 font-medium">
                      Select Preferred Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none text-sm text-[#1C1C1A]"
                      />
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#7A7265] mb-2 font-medium">
                      Select Preferred Time Slot
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeSlot: slot })}
                          className={`py-2.5 text-xs font-mono transition-colors cursor-pointer border ${
                            formData.timeSlot === slot
                              ? 'bg-[#1C1C1A] text-[#F7F4EE] border-[#1C1C1A]'
                              : 'bg-[#FAF8F5] text-[#1C1C1A] border-[#E8E0D4] hover:border-[#B7A17A]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Client Details */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#E8E0D4]/30 border border-[#E8E0D4] text-xs text-[#5E584F] flex items-center justify-between">
                    <div>
                      <strong className="text-[#1C1C1A]">{currentTreatment?.name}</strong>
                      <span className="block mt-0.5">{formData.date} at {formData.timeSlot}</span>
                    </div>
                    <span className="font-serif text-base text-[#1C1C1A]">{currentTreatment?.price}</span>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#7A7265] mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Sen"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none text-sm text-[#1C1C1A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] text-[#7A7265] mb-1 font-medium">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="9345781106"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none text-sm text-[#1C1C1A]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] text-[#7A7265] mb-1 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="maya@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none text-sm text-[#1C1C1A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#7A7265] mb-1 font-medium">
                      Special Hair / Skin Preferences or Allergies
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Sensitive scalp, fragrance sensitivities, bridal consultation notes..."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none text-sm text-[#1C1C1A]"
                    />
                  </div>

                  <div className="text-[11px] text-[#A69C8D] pt-1">
                    By confirming, you agree to our 24-hour private suite courtesy cancellation policy.
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="pt-4 border-t border-[#E8E0D4] flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs uppercase tracking-wider text-[#1C1C1A] hover:text-[#B7A17A] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="inline-flex items-center gap-2 px-7 py-3 text-xs uppercase tracking-[0.18em] font-medium text-[#F7F4EE] bg-[#1C1C1A] hover:bg-[#B7A17A] hover:text-[#1C1C1A] transition-colors cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#F7F4EE] bg-[#1C1C1A] hover:bg-[#B7A17A] hover:text-[#1C1C1A] transition-colors cursor-pointer shadow-lg"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#B7A17A]" />
                    <span>Confirm Private Reservation</span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
