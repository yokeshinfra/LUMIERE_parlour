import { Calendar, Phone, ArrowUpRight } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface AppointmentCtaProps {
  onOpenBooking: () => void;
}

export default function AppointmentCta({ onOpenBooking }: AppointmentCtaProps) {
  return (
    <section className="py-24 lg:py-36 bg-[#F7F4EE] border-t border-[#E8E0D4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="relative border border-[#E8E0D4] bg-[#FAF8F5] p-10 sm:p-16 lg:p-20 overflow-hidden shadow-[0_20px_50px_rgba(28,28,26,0.03)]">
          {/* Subtle Ambient Background Watermark / Image */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-15 pointer-events-none">
            <img
              src="/image/Front1.png"
              alt="Lumière salon texture"
              className="w-full h-full object-cover grayscale"
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/image/nail-after.png';
              }}
            />
          </div>

          <div className="relative z-10 max-w-2xl space-y-8">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#B7A17A]" />
              <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-[#7A7265]">
                PRIVATE ATELIER RESERVATIONS
              </span>
            </div>

            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-[#1C1C1A] leading-[1.0] tracking-tight">
              Ready for your
              <br />
              <span className="italic font-normal">next look?</span>
            </h2>

            <p className="text-base sm:text-lg text-[#5E584F] font-light leading-relaxed max-w-lg">
              Reserve a private beauty appointment with us. Experience unhurried luxury, bespoke consultations, and transformative care.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="cta-book-appointment-btn"
                onClick={onOpenBooking}
                className="group inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium text-[#F7F4EE] bg-[#1C1C1A] hover:bg-[#2A2926] transition-all duration-300 cursor-pointer shadow-[0_10px_30px_rgba(28,28,26,0.08)]"
              >
                <span>Book an Appointment</span>
                <ArrowUpRight className="w-4 h-4 ml-2 text-[#B7A17A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href={`tel:${SALON_INFO.rawPhone}`}
                className="inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium text-[#1C1C1A] border border-[#1C1C1A]/20 hover:border-[#1C1C1A] hover:bg-[#E8E0D4]/30 transition-colors gap-2"
              >
                <Phone className="w-4 h-4 text-[#7A7265]" />
                <span>{SALON_INFO.phone}</span>
              </a>
            </div>

            <div className="pt-6 border-t border-[#E8E0D4] flex flex-wrap items-center gap-6 text-xs text-[#7A7265]">
              <span>✓ Private suites with zero waiting time</span>
              <span>✓ Complimentary artisanal refreshments</span>
              <span>✓ Bespoke consultations included</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
