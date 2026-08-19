import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/salonData';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 lg:py-36 bg-[#FAF8F5] border-t border-[#E8E0D4] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#B7A17A]" />
            <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-[#7A7265]">
              CLIENT REFLECTIONS
            </span>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-[#1C1C1A] leading-[1.0] tracking-tight">
            Loved by women
            <br />
            <span className="italic font-normal">who value the details.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#5E584F] font-light leading-relaxed max-w-xl">
            Read unprompted notes from patrons who trust us with their regular rituals, key milestones, and most intimate celebrations.
          </p>
        </div>

        {/* 3 Spacious Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className="p-8 sm:p-10 bg-[#F7F4EE] border border-[#E8E0D4] hover:border-[#1C1C1A]/30 transition-all duration-300 flex flex-col justify-between shadow-[0_4px_24px_rgba(28,28,26,0.02)] relative group"
            >
              {/* Top Rating & Index */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* 5 Minimalist Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#B7A17A] text-[#B7A17A]"
                      />
                    ))}
                  </div>
                  <span className="font-mono text-xs text-[#A69C8D]">0{idx + 1}</span>
                </div>

                {/* Quote */}
                <p className="font-serif text-xl sm:text-2xl text-[#1C1C1A] leading-snug font-light italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              {/* Author & Service Badge */}
              <div className="pt-8 mt-8 border-t border-[#E8E0D4] flex items-center gap-4">
                {/* Small Circular Customer Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#E8E0D4] shrink-0 bg-[#E8E0D4]/30">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-0.5">
                  <h4 className="font-medium text-sm text-[#1C1C1A]">
                    {testimonial.name}
                  </h4>
                  <div className="text-[11px] text-[#7A7265] font-light">
                    {testimonial.role} · <span className="text-[#B7A17A]">{testimonial.service}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google & Verified Rating Badge */}
        <div className="mt-12 p-6 bg-[#F7F4EE] border border-[#E8E0D4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7265]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-700 animate-pulse" />
            <span className="font-medium text-[#1C1C1A]">4.98 / 5.0 Average Client Score</span>
            <span>·</span>
            <span>Based on 840+ verified salon appointments</span>
          </div>

          <div className="text-[11px] uppercase tracking-wider text-[#A69C8D]">
            Excellence Certified 2026
          </div>
        </div>
      </div>
    </section>
  );
}
