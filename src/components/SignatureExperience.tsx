import { useState } from 'react';
import { Sparkles, ArrowRight, X, Droplet, Moon, Heart, Flame } from 'lucide-react';

interface SignatureExperienceProps {
  onOpenBooking: () => void;
}

export default function SignatureExperience({ onOpenBooking }: SignatureExperienceProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const rituals = [
    {
      icon: Droplet,
      name: 'Japanese Hinoki Head Spa',
      duration: '90 Minutes',
      description: 'Micro-mist follicular cleanse, hot stone shoulder massage, and continuous cascading waterfall therapy.'
    },
    {
      icon: Flame,
      name: '24K Gold Cellular Renewal',
      duration: '75 Minutes',
      description: 'Enzyme resurfacing paired with real 24-karat gold leaf lymphatic sculpting for profound illumination.'
    },
    {
      icon: Moon,
      name: 'Warm Milk & Rose Somatic Pedicure',
      duration: '65 Minutes',
      description: 'Organic oat milk bath, dead sea mineral polish, and heated magnesium muscle wrap.'
    },
    {
      icon: Heart,
      name: 'The Four-Hand Sensory Symphony',
      duration: '120 Minutes',
      description: 'Synchronized scalp ritual, botanical facial sculpting, and manicure care simultaneously in your private suite.'
    }
  ];

  return (
    <>
      <section id="signature-ritual" className="py-24 lg:py-32 bg-[#1C1C1A] text-[#F7F4EE] relative overflow-hidden">
        {/* Ambient Subtle Accent Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B7A17A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Big Heading */}
            <div className="lg:col-span-6 space-y-8">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#B7A17A]" />
                <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-[#B7A17A]">
                  SANCTUARY RITUALS
                </span>
              </div>

              <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.0] tracking-tight">
                Your time.
                <br />
                <span className="italic font-normal text-[#E8E0D4]">Your ritual.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#A69C8D] font-light leading-relaxed max-w-lg">
                Time slows down the moment you step across our threshold. Our signature rituals are crafted as multi-sensory escapes—fusing botanical science with mindful touch.
              </p>

              {/* Ritual Highlight Badges */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4 py-3 border-b border-[#333330]">
                  <span className="font-mono text-xs text-[#B7A17A]">01</span>
                  <span className="text-sm text-[#F7F4EE] font-light">Custom Soundscapes & Aroma Inhalation</span>
                </div>
                <div className="flex items-center gap-4 py-3 border-b border-[#333330]">
                  <span className="font-mono text-xs text-[#B7A17A]">02</span>
                  <span className="text-sm text-[#F7F4EE] font-light">Zero-Pressure Organic Botanical Formulations</span>
                </div>
                <div className="flex items-center gap-4 py-3 border-b border-[#333330]">
                  <span className="font-mono text-xs text-[#B7A17A]">03</span>
                  <span className="text-sm text-[#F7F4EE] font-light">Private Suite with Herbal Tea Pairing</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#1C1C1A] bg-[#F7F4EE] hover:bg-[#B7A17A] hover:text-[#1C1C1A] transition-all duration-300 cursor-pointer"
                >
                  <span>Discover More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#F7F4EE] border border-[#F7F4EE]/30 hover:border-[#B7A17A] hover:text-[#B7A17A] transition-colors cursor-pointer"
                >
                  Reserve Ritual
                </button>
              </div>
            </div>

            {/* Right Large Editorial Visual with Floating Minimal Glass Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Main Image */}
                <div className="aspect-[4/5] overflow-hidden rounded-xs border border-[#333330] bg-[#222220] p-2">
                  <div className="img-zoom-container w-full h-full relative">
                    <img
                      src="/image/Front2.png"
                      alt="Lumière Signature salon treatment"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Minimal Floating Glass Card */}
                <div className="absolute -bottom-8 -left-4 sm:-left-8 right-4 sm:right-auto sm:max-w-xs bg-[#1C1C1A]/85 backdrop-blur-md border border-[#E8E0D4]/20 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#B7A17A] font-medium mb-2">
                    <Sparkles className="w-3 h-3" />
                    SIGNATURE EXPERIENCE
                  </div>
                  <p className="font-serif text-lg text-[#F7F4EE] leading-snug">
                    &ldquo;Personalized beauty rituals designed around you.&rdquo;
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#333330] flex items-center justify-between text-[11px] text-[#A69C8D]">
                    <span>Exclusive Atelier</span>
                    <button
                      onClick={() => setModalOpen(true)}
                      className="text-[#B7A17A] hover:underline cursor-pointer"
                    >
                      Explore Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover More Ritual Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-[#1C1C1A]/80 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
          />

          <div className="relative w-full max-w-2xl bg-[#F7F4EE] border border-[#E8E0D4] p-8 sm:p-10 shadow-2xl z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E8E0D4] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B7A17A] font-medium">
                  The Lumière Menu
                </span>
                <h3 className="font-serif text-3xl text-[#1C1C1A]">Signature Sanctuary Rituals</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-[#1C1C1A] hover:text-[#B7A17A] cursor-pointer rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {rituals.map((r) => {
                const Icon = r.icon;
                return (
                  <div
                    key={r.name}
                    className="p-5 bg-[#FAF8F5] border border-[#E8E0D4] flex items-start gap-4"
                  >
                    <div className="p-3 bg-[#E8E0D4]/40 border border-[#E8E0D4] text-[#1C1C1A]">
                      <Icon className="w-5 h-5 text-[#B7A17A]" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-xl text-[#1C1C1A]">{r.name}</h4>
                        <span className="text-xs font-mono text-[#7A7265]">{r.duration}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#5E584F] font-light leading-relaxed">
                        {r.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#E8E0D4] flex items-center justify-between">
              <span className="text-xs text-[#7A7265]">Private suites tailored per client.</span>
              <button
                onClick={() => {
                  setModalOpen(false);
                  onOpenBooking();
                }}
                className="px-6 py-3 text-xs uppercase tracking-[0.18em] font-medium text-[#F7F4EE] bg-[#1C1C1A] hover:bg-[#B7A17A] transition-colors cursor-pointer"
              >
                Book a Ritual
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
