import { Sparkles, ShieldCheck, HeartHandshake, Feather } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export default function BrandExperience() {
  const pillars = [
    {
      icon: Feather,
      title: 'Bespoke Formulations',
      description: 'Clean, botanical-rich and ammonia-free treatments tailored to your exact hair and skin physiology.'
    },
    {
      icon: HeartHandshake,
      title: 'Master Artisans',
      description: 'Dedicated senior stylists and certified aestheticians providing unhurried one-on-one attention.'
    },
    {
      icon: ShieldCheck,
      title: 'Acoustic Sanctuary',
      description: 'Private suites insulated from city noise, infused with Hinoki cypress aroma and soothing sounds.'
    }
  ];

  return (
    <section id="experience" className="py-24 lg:py-32 bg-[#FAF8F5] border-y border-[#E8E0D4] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-[#B7A17A]" />
            <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-[#7A7265]">
              THE LUMIÈRE EXPERIENCE
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#1C1C1A] leading-[1.08] tracking-tight">
            Where beauty meets
            <br />
            <span className="italic font-normal">quiet confidence.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#5E584F] font-light leading-relaxed max-w-2xl">
            We believe true elegance never shouts. LUMIÈRE was created as a sanctuary where modern women 
            can pause, rejuvenate, and experience personalized hair, skin, makeup, and bridal artistry 
            grounded in craftsmanship and refined aesthetics.
          </p>
        </div>

        {/* Asymmetrical Layout with Whitespace & Editorial Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Primary Image */}
          <div className="lg:col-span-6 space-y-8">
            <div className="aspect-[4/5] overflow-hidden rounded-xs border border-[#E8E0D4] bg-[#E8E0D4]/30 relative p-2 shadow-[0_16px_40px_rgba(28,28,26,0.04)]">
              <div className="img-zoom-container w-full h-full relative">
                <img
                  src="/image/BG.png"
                  alt="Lumière sensorial beauty treatment"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop';
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-[#F7F4EE] border border-[#E8E0D4]">
              <div>
                <p className="font-serif text-xl text-[#1C1C1A]">Clean Philosophy</p>
                <p className="text-xs text-[#7A7265] font-light mt-0.5">
                  100% cruelty-free, bio-fermented & clean botanical extracts.
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-[#B7A17A] shrink-0" />
            </div>
          </div>

          {/* Right Content & Secondary Staggered Block */}
          <div className="lg:col-span-6 space-y-12">
            {/* The 3 Core Pillars */}
            <div className="space-y-8">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-6 sm:p-7 bg-[#F7F4EE] border border-[#E8E0D4] hover:border-[#B7A17A]/60 transition-colors duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#E8E0D4]/50 border border-[#E8E0D4] text-[#1C1C1A] group-hover:text-[#B7A17A] group-hover:bg-[#F7F4EE] transition-colors duration-300">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] uppercase font-mono text-[#A69C8D]">0{idx + 1}</span>
                          <h3 className="font-serif text-xl text-[#1C1C1A]">{pillar.title}</h3>
                        </div>
                        <p className="text-sm text-[#5E584F] font-light leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Asymmetrical Secondary Visual Quote */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="aspect-[4/3] overflow-hidden rounded-xs border border-[#E8E0D4] bg-[#E8E0D4]/20 p-1.5">
                <img
                  src="https://images.unsplash.com/photo-1629198658000-7332617e8b24?q=80&w=800&auto=format&fit=crop"
                  alt="Lumière serene interior styling"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col justify-center p-6 bg-[#E8E0D4]/40 border border-[#E8E0D4]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7265] font-medium mb-1">
                  Private Reservation
                </span>
                <p className="font-serif text-lg text-[#1C1C1A] italic">
                  &ldquo;A quiet space where every detail is in harmony.&rdquo;
                </p>
                <div className="mt-3 text-xs text-[#7A7265]">
                  — {SALON_INFO.name} Atelier
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
