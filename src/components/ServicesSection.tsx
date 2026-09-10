import { useState } from 'react';
import { ArrowUpRight, Sparkles, ChevronRight } from 'lucide-react';
import { SERVICES } from '../data/salonData';
import { ServiceCardData } from '../types';
import TreatmentDetailDrawer from './TreatmentDetailDrawer';

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string, treatmentId?: string) => void;
}

export default function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceCardData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDetail = (service: ServiceCardData) => {
    setSelectedService(service);
    setIsDrawerOpen(true);
  };

  const handleSelectTreatmentFromDrawer = (serviceId: string, treatmentId: string) => {
    setIsDrawerOpen(false);
    onOpenBooking(serviceId, treatmentId);
  };

  return (
    <section id="services" className="py-24 lg:py-36 bg-[#F7F4EE] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 pb-6 border-b border-[#E8E0D4] gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#B7A17A]" />
              <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-[#7A7265]">
                DISCIPLINE & CRAFT
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#1C1C1A] tracking-tight">
              Our Services
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#5E584F] font-light max-w-md">
            Meticulously executed hair, dermal, makeup, and nail architecture designed with organic integrity and quiet luxury.
          </p>
        </div>

        {/* 4 Minimalist Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => handleOpenDetail(service)}
              className="group relative bg-[#FAF8F5] border border-[#E8E0D4] hover:border-[#1C1C1A]/40 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_rgba(28,28,26,0.02)] hover:shadow-[0_16px_40px_rgba(28,28,26,0.06)]"
            >
              {/* Top Bar with Large Number & Tagline */}
              <div className="p-8 pb-4 flex items-center justify-between border-b border-[#E8E0D4]/60">
                <span className="font-serif text-3xl sm:text-4xl text-[#7A7265] group-hover:text-[#B7A17A] transition-colors duration-300 font-light">
                  {service.number}
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#7A7265]">
                  {service.tagline}
                </span>
              </div>

              {/* Minimal Image Container */}
              <div className="px-8 pt-6">
                <div className="aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-[#E8E0D4]/40 border border-[#E8E0D4] relative">
                  <img
                    src={service.image}
                    alt={`${service.name} service at Lumière`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/image/nail-after.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-[#1C1C1A]/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-3xl text-[#1C1C1A] group-hover:text-[#B7A17A] transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#5E584F] font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Micro Features & Arrow */}
                <div className="pt-6 border-t border-[#E8E0D4]/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#7A7265]">
                    <Sparkles className="w-3.5 h-3.5 text-[#B7A17A]" />
                    <span>{service.treatments.length} Signature Rituals</span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] font-medium text-[#1C1C1A] group-hover:text-[#B7A17A] transition-colors">
                    <span>View Menu</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Fast Booking Strip */}
        <div className="mt-12 p-8 bg-[#E8E0D4]/30 border border-[#E8E0D4] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-2xl text-[#1C1C1A]">
              Seeking a bespoke combination?
            </h4>
            <p className="text-xs text-[#5E584F] font-light">
              Our master artisans can orchestrate simultaneous hair, skin, and nail treatments in your private suite.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking()}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs uppercase tracking-[0.18em] font-medium text-[#F7F4EE] bg-[#1C1C1A] hover:bg-[#B7A17A] transition-colors duration-300 shrink-0 cursor-pointer"
          >
            <span>Book Consultation</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Itemized Drawer */}
      <TreatmentDetailDrawer
        service={selectedService}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectTreatment={handleSelectTreatmentFromDrawer}
      />
    </section>
  );
}
