import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export default function Hero({ onOpenBooking, onExploreServices }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[94vh] lg:min-h-screen flex flex-col justify-between pt-28 lg:pt-36 pb-12 overflow-hidden"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#E8E0D4]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#B7A17A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Editorial Content */}
          <div className="lg:col-span-7 space-y-8 z-10">
            {/* Minimal Badge / Sub-tagline */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-[#E8E0D4] bg-[#F7F4EE]/70 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7A17A]" />
              <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-[#7A7265]">
                {SALON_INFO.subTagline}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl xl:text-[92px] font-light leading-[0.95] tracking-[-0.02em] text-[#1C1C1A]">
              Beauty,
              <br />
              <span className="italic font-normal text-[#1C1C1A] relative inline-block">
                refined.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-[6px] text-[#B7A17A]/40"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5.5C45 2.5 140 1 199 5.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#5E584F] max-w-md font-light leading-relaxed">
              {SALON_INFO.description}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-primary-book-btn"
                onClick={onOpenBooking}
                className="group inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium text-[#F7F4EE] bg-[#1C1C1A] hover:bg-[#2A2926] transition-all duration-300 shadow-[0_10px_30px_rgba(28,28,26,0.08)] cursor-pointer"
              >
                <span>Book an Appointment</span>
                <ArrowUpRight className="w-4 h-4 ml-2 text-[#B7A17A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                id="hero-secondary-explore-btn"
                onClick={onExploreServices}
                className="inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium text-[#1C1C1A] bg-transparent border border-[#1C1C1A]/20 hover:border-[#1C1C1A] hover:bg-[#E8E0D4]/30 transition-all duration-300 cursor-pointer"
              >
                <span>Explore Services</span>
              </button>
            </div>

            {/* Key stats / hallmarks */}
            <div className="pt-6 border-t border-[#E8E0D4] grid grid-cols-3 gap-6 max-w-md">
              <div>
                <div className="font-serif text-2xl text-[#1C1C1A]">06</div>
                <div className="text-[11px] uppercase tracking-wider text-[#A69C8D] mt-0.5">
                  Private Suites
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl text-[#1C1C1A]">100%</div>
                <div className="text-[11px] uppercase tracking-wider text-[#A69C8D] mt-0.5">
                  Botanical Care
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl text-[#1C1C1A]">1-on-1</div>
                <div className="text-[11px] uppercase tracking-wider text-[#A69C8D] mt-0.5">
                  Artisan Attention
                </div>
              </div>
            </div>
          </div>

          {/* Right Editorial Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Subtle Frame */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-xs border border-[#E8E0D4] bg-[#E8E0D4]/30 p-2 shadow-[0_20px_50px_rgba(28,28,26,0.06)]">
                <div className="img-zoom-container w-full h-full relative">
                  <img
                    src="/image/Front1.png"
                    alt="Editorial model in luxury minimal salon setting"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/image/nail.png';
                    }}
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating Minimal Accent Tag */}
              <div className="absolute -bottom-5 -left-4 sm:-left-8 bg-[#F7F4EE]/95 backdrop-blur-md border border-[#E8E0D4] p-4 shadow-[0_12px_32px_rgba(28,28,26,0.06)] max-w-[220px]">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#B7A17A] font-medium mb-1">
                  <Sparkles className="w-3 h-3" />
                  Quiet Luxury
                </div>
                <p className="text-xs text-[#1C1C1A] font-light leading-snug">
                  Calm acoustic suites designed for unhurried pampering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full flex items-center justify-between pt-8 border-t border-[#E8E0D4]/60 mt-8 text-xs text-[#A69C8D]">
        <span className="tracking-[0.2em] uppercase text-[10px]">
          Chennai · Est. 2018
        </span>
        <a
          href="#experience"
          className="inline-flex items-center gap-2 hover:text-[#1C1C1A] transition-colors duration-200"
          aria-label="Scroll to experience section"
        >
          <span className="tracking-[0.16em] uppercase text-[10px]">Scroll Down</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
