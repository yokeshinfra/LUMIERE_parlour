import { useState } from 'react';
import { Sparkles, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { TRANSFORMATIONS } from '../data/salonData';
import { TransformationItem } from '../types';

export default function TransformationSection() {
  const [activeItem, setActiveItem] = useState<TransformationItem>(TRANSFORMATIONS[0]);
  const [showAfterOnly, setShowAfterOnly] = useState(false);

  return (
    <section id="transformations" className="py-24 lg:py-36 bg-[#FAF8F5] border-t border-[#E8E0D4]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 pb-6 border-b border-[#E8E0D4] gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#B7A17A]" />
              <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-[#7A7265]">
                REFINED ELEVATION
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#1C1C1A] tracking-tight">
              The Transformation
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#5E584F] font-light max-w-md">
            Our results are never artificial or overpowering. We celebrate your authentic features with nuanced, bespoke refinement.
          </p>
        </div>

        {/* Featured Interactive Transformation Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Before/After Comparison Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Before Card */}
              <div className="group relative bg-[#F7F4EE] border border-[#E8E0D4] p-3 overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden bg-[#E8E0D4]/30 relative">
                  <img
                    src={activeItem.beforeImage}
                    alt={`${activeItem.title} Before`}
                    className="w-full h-full object-cover grayscale-[20%]"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop';
                    }}
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-[#1C1C1A]/80 text-[#F7F4EE] backdrop-blur-xs">
                    Initial State
                  </span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-xs text-[#7A7265] uppercase tracking-wider">Before Treatment</span>
                </div>
              </div>

              {/* After Card (Lumière Result) */}
              <div className="group relative bg-[#F7F4EE] border border-[#B7A17A]/60 p-3 overflow-hidden shadow-[0_12px_36px_rgba(183,161,122,0.12)]">
                <div className="aspect-[3/4] overflow-hidden bg-[#E8E0D4]/30 relative">
                  <img
                    src={activeItem.afterImage}
                    alt={`${activeItem.title} After Result`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/image/afterImage.png';
                    }}
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-[#B7A17A] text-[#1C1C1A] font-semibold backdrop-blur-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Lumière Result
                  </span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-xs text-[#1C1C1A] font-medium uppercase tracking-wider">
                    After Artistry
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-2 bg-[#F7F4EE] border border-[#E8E0D4] text-xs text-[#7A7265]">
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="w-3.5 h-3.5 text-[#B7A17A]" />
                <span>Select a case study on the right to examine different treatments</span>
              </div>
              <span className="hidden sm:inline font-mono">100% Authentic Client Unretouched</span>
            </div>
          </div>

          {/* Details & Selector Tabs */}
          <div className="lg:col-span-5 space-y-6">
            {/* Active Details Card */}
            <div className="p-8 bg-[#F7F4EE] border border-[#E8E0D4] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#B7A17A] font-medium">
                  {activeItem.category}
                </span>
                <span className="text-xs font-mono text-[#A69C8D]">Case {activeItem.id.replace('trans-', '0')}</span>
              </div>

              <h3 className="font-serif text-3xl text-[#1C1C1A]">
                {activeItem.title}
              </h3>

              <p className="text-sm text-[#5E584F] font-light leading-relaxed">
                {activeItem.description}
              </p>

              <div className="pt-4 border-t border-[#E8E0D4] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#7A7265]">
                  <span>Treatment Protocol:</span>
                  <span className="font-medium text-[#1C1C1A]">{activeItem.treatmentName}</span>
                </div>
                <div className="flex items-center justify-between text-[#7A7265]">
                  <span>Lead Artisan:</span>
                  <span className="font-medium text-[#1C1C1A]">{activeItem.artisan}</span>
                </div>
              </div>
            </div>

            {/* Case Study List Selector */}
            <div className="space-y-2.5">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#7A7265] font-medium mb-1">
                Explore Case Studies
              </div>
              {TRANSFORMATIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`w-full text-left p-4 border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    activeItem.id === item.id
                      ? 'bg-[#1C1C1A] text-[#F7F4EE] border-[#1C1C1A]'
                      : 'bg-[#F7F4EE] text-[#1C1C1A] border-[#E8E0D4] hover:border-[#B7A17A]'
                  }`}
                >
                  <div>
                    <span className={`text-[10px] uppercase tracking-wider block ${
                      activeItem.id === item.id ? 'text-[#B7A17A]' : 'text-[#7A7265]'
                    }`}>
                      {item.category}
                    </span>
                    <span className="font-serif text-lg">{item.title}</span>
                  </div>
                  {activeItem.id === item.id && (
                    <CheckCircle2 className="w-4 h-4 text-[#B7A17A]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
