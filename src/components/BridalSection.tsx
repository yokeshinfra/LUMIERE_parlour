import { useState, FormEvent } from 'react';
import { Sparkles, Check, ArrowRight, Heart, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { BRIDAL_PACKAGES, SALON_INFO } from '../data/salonData';
import { saveAppointmentRecord } from '../utils/appointmentStorage';

interface BridalSectionProps {
  onOpenBooking: (serviceId?: string, treatmentId?: string) => void;
}

export default function BridalSection({ onOpenBooking }: BridalSectionProps) {
  const [selectedPackage, setSelectedPackage] = useState(BRIDAL_PACKAGES[0]);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [brideName, setBrideName] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [bridePhone, setBridePhone] = useState('');
  const [brideNotes, setBrideNotes] = useState('');

  const handleBridalSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveAppointmentRecord({
      serviceId: 'bridal',
      serviceName: 'Bridal Atelier',
      treatmentId: selectedPackage.id,
      treatmentName: selectedPackage.title,
      treatmentPrice: selectedPackage.price,
      duration: selectedPackage.duration,
      artisanId: 'art-2',
      artisanName: 'Aria Sharma (Bridal Director)',
      date: weddingDate || new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
      timeSlot: '10:00 AM',
      fullName: brideName || 'Bride Consultation',
      email: '',
      phone: bridePhone || SALON_INFO.rawPhone,
      specialRequests: `Wedding Date: ${weddingDate}. Notes: ${brideNotes || selectedPackage.subtitle}`
    });
    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setConsultModalOpen(false);
      setBrideName('');
      setBridePhone('');
      setBrideNotes('');
    }, 2200);
  };

  return (
    <>
      <section id="bridal" className="py-24 lg:py-36 bg-[#F7F4EE] border-t border-[#E8E0D4] relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Editorial Header */}
          <div className="max-w-3xl mb-16 lg:mb-20">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#B7A17A]" />
              <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-[#7A7265]">
                THE BRIDAL ATELIER
              </span>
            </div>

            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-[#1C1C1A] leading-[1.0] tracking-tight">
              For your most
              <br />
              <span className="italic font-normal">beautiful moments.</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#5E584F] font-light leading-relaxed max-w-2xl">
              We approach bridal artistry with high-fashion restraint and deep personal care. 
              Illuminated skin, couture hair architecture, and calming suite rituals designed so you feel 
              authentically radiant from morning prep to midnight celebrations.
            </p>
          </div>

          {/* Bridal Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Large Editorial Visual */}
            <div className="lg:col-span-6 space-y-6">
              <div className="aspect-[4/5] overflow-hidden rounded-xs border border-[#E8E0D4] bg-[#E8E0D4]/30 p-2 shadow-[0_20px_50px_rgba(28,28,26,0.06)] relative">
                <div className="img-zoom-container w-full h-full relative">
                  <img
                    src="/image/Bride.png"
                    alt="Luxury Indian bridal editorial makeup"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546804784-896d0dca3805?q=80&w=1200&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/40 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="absolute bottom-6 left-6 right-6 bg-[#F7F4EE]/90 backdrop-blur-md border border-[#E8E0D4] p-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B7A17A] font-medium block mb-1">
                    Private Bridal Suite
                  </span>
                  <p className="font-serif text-lg text-[#1C1C1A]">
                    Complete seclusion with dedicated hair, makeup, and drape artisans.
                  </p>
                </div>
              </div>

              {/* Bridal Core Offerings Pills */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-[#FAF8F5] border border-[#E8E0D4] text-center">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#7A7265] block font-mono">01</span>
                  <span className="font-serif text-base text-[#1C1C1A] mt-1 block">Bridal Makeup</span>
                </div>
                <div className="p-4 bg-[#FAF8F5] border border-[#E8E0D4] text-center">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#7A7265] block font-mono">02</span>
                  <span className="font-serif text-base text-[#1C1C1A] mt-1 block">Engagement Looks</span>
                </div>
                <div className="p-4 bg-[#FAF8F5] border border-[#E8E0D4] text-center">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#7A7265] block font-mono">03</span>
                  <span className="font-serif text-base text-[#1C1C1A] mt-1 block">Pre-Bridal Rituals</span>
                </div>
              </div>
            </div>

            {/* Right Packages & Inquiries */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#7A7265] font-medium flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#B7A17A]" />
                  Curated Bridal Suites
                </div>

                <div className="space-y-4">
                  {BRIDAL_PACKAGES.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-6 border transition-all duration-300 cursor-pointer ${
                        selectedPackage.id === pkg.id
                          ? 'bg-[#FAF8F5] border-[#1C1C1A] shadow-[0_8px_30px_rgba(28,28,26,0.05)]'
                          : 'bg-[#F7F4EE] border-[#E8E0D4] hover:border-[#B7A17A]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-serif text-2xl text-[#1C1C1A]">{pkg.title}</h3>
                            {selectedPackage.id === pkg.id && (
                              <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-[#B7A17A] text-[#1C1C1A] font-semibold">
                                Selected
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#7A7265] block mt-0.5">{pkg.subtitle}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-serif text-xl text-[#1C1C1A]">{pkg.price}</span>
                          <span className="text-[10px] font-mono text-[#A69C8D] block">{pkg.duration}</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#5E584F] font-light mt-3 leading-relaxed">
                        {pkg.description}
                      </p>

                      {/* Expanded features for selected package */}
                      {selectedPackage.id === pkg.id && (
                        <div className="mt-4 pt-4 border-t border-[#E8E0D4] space-y-2">
                          {pkg.features.map((feat) => (
                            <div key={feat} className="flex items-start gap-2 text-xs text-[#5E584F]">
                              <Check className="w-3.5 h-3.5 text-[#B7A17A] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => setConsultModalOpen(true)}
                  className="inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium text-[#F7F4EE] bg-[#1C1C1A] hover:bg-[#2A2926] transition-all duration-300 cursor-pointer shadow-[0_10px_30px_rgba(28,28,26,0.06)]"
                >
                  <span>Explore Bridal Consultation</span>
                  <ArrowRight className="w-4 h-4 ml-2 text-[#B7A17A]" />
                </button>

                <button
                  onClick={() => onOpenBooking('makeup', 'makeup-engagement')}
                  className="inline-flex items-center justify-center px-6 py-4 text-xs uppercase tracking-[0.2em] font-medium text-[#1C1C1A] border border-[#1C1C1A]/20 hover:border-[#1C1C1A] hover:bg-[#E8E0D4]/30 transition-colors cursor-pointer"
                >
                  Reserve Date
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bridal Consultation Modal */}
      {consultModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-[#1C1C1A]/80 backdrop-blur-xs"
            onClick={() => setConsultModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-[#F7F4EE] border border-[#E8E0D4] p-8 sm:p-10 shadow-2xl z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E8E0D4] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B7A17A] font-medium">
                  Private Bridal Concierge
                </span>
                <h3 className="font-serif text-3xl text-[#1C1C1A]">Bridal Inquiry</h3>
              </div>
              <button
                onClick={() => setConsultModalOpen(false)}
                className="p-2 text-[#1C1C1A] hover:text-[#B7A17A] cursor-pointer rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#5E584F] font-light leading-relaxed">
              Every wedding is unique. Share your dates and wedding vision, and our Bridal Director will arrange a complimentary private trial & consultation.
            </p>

            {inquirySuccess ? (
              <div className="py-8 text-center space-y-3 bg-[#FAF8F5] border border-[#B7A17A]/40 p-6">
                <CheckCircle2 className="w-10 h-10 text-[#B7A17A] mx-auto" />
                <h4 className="font-serif text-2xl text-[#1C1C1A]">Bridal Inquiry Transmitted</h4>
                <p className="text-xs text-[#5E584F] leading-relaxed">
                  Your wedding consultation details have been forwarded to our Bridal Concierge and logged in our Atelier booking desk.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBridalSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#7A7265] mb-1">
                    Bride&apos;s Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Radhika Merchant"
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none text-sm text-[#1C1C1A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#7A7265] mb-1">
                      Wedding Date *
                    </label>
                    <input
                      required
                      type="date"
                      value={weddingDate}
                      onChange={(e) => setWeddingDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none text-sm text-[#1C1C1A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#7A7265] mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="9345781106"
                      value={bridePhone}
                      onChange={(e) => setBridePhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none text-sm text-[#1C1C1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#7A7265] mb-1">
                    Special Requests / Vision Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Traditional south Indian saree draping, outdoor venue..."
                    value={brideNotes}
                    onChange={(e) => setBrideNotes(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E0D4] focus:border-[#1C1C1A] focus:outline-none text-sm text-[#1C1C1A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#F7F4EE] bg-[#1C1C1A] hover:bg-[#B7A17A] hover:text-[#1C1C1A] transition-colors cursor-pointer"
                >
                  Send Bridal Inquiry
                </button>
              </form>
            )}

            <div className="pt-3 border-t border-[#E8E0D4] text-center text-xs text-[#A69C8D]">
              Direct Bridal Line: {SALON_INFO.phone}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
