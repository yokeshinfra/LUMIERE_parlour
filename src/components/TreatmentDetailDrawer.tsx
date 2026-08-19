import { X, Clock, Sparkles, Check, ArrowRight } from 'lucide-react';
import { ServiceCardData, TreatmentItem } from '../types';

interface TreatmentDetailDrawerProps {
  service: ServiceCardData | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectTreatment: (serviceId: string, treatmentId: string) => void;
}

export default function TreatmentDetailDrawer({
  service,
  isOpen,
  onClose,
  onSelectTreatment,
}: TreatmentDetailDrawerProps) {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1C1A]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-2xl bg-[#F7F4EE] border-l border-[#E8E0D4] shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="p-5 sm:p-8 border-b border-[#E8E0D4] bg-[#FAF8F5] sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="font-mono text-xs uppercase tracking-widest text-[#B7A17A]">
                  Service Menu {service.number}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B7A17A]" />
                <span className="text-xs uppercase tracking-wider text-[#A69C8D]">
                  {service.tagline}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#1C1C1A] hover:text-[#B7A17A] hover:bg-[#E8E0D4]/40 rounded-full transition-colors cursor-pointer"
                aria-label="Close treatment menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1C1A] mt-3">
              {service.name} Artistry & Treatments
            </h2>
            <p className="text-xs sm:text-sm text-[#5E584F] font-light mt-1 max-w-lg">
              {service.description}
            </p>
          </div>

          {/* Treatment List */}
          <div className="p-5 sm:p-8 space-y-6 flex-1">
            <div className="text-xs uppercase tracking-[0.2em] text-[#7A7265] font-medium flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B7A17A]" />
              Curated Treatment Menu
            </div>

            <div className="space-y-4">
              {service.treatments.map((treatment: TreatmentItem) => (
                <div
                  key={treatment.id}
                  className="p-6 bg-[#FAF8F5] border border-[#E8E0D4] hover:border-[#B7A17A] transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-serif text-xl text-[#1C1C1A] group-hover:text-[#B7A17A] transition-colors">
                          {treatment.name}
                        </h4>
                        {treatment.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-[#E8E0D4]/60 text-[#1C1C1A]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm text-[#5E584F] font-light leading-relaxed">
                        {treatment.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-[#7A7265] pt-1">
                        <span className="flex items-center gap-1.5 font-mono">
                          <Clock className="w-3.5 h-3.5 text-[#B7A17A]" />
                          {treatment.duration}
                        </span>
                        <span>·</span>
                        <span className="font-medium text-[#1C1C1A] text-sm">
                          {treatment.price}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectTreatment(service.id, treatment.id);
                      }}
                      className="inline-flex items-center justify-center px-4 py-2.5 text-xs uppercase tracking-wider font-medium text-[#F7F4EE] bg-[#1C1C1A] hover:bg-[#B7A17A] transition-colors duration-200 shrink-0 cursor-pointer gap-1.5"
                    >
                      <span>Reserve</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Features Checklist */}
            <div className="p-6 bg-[#E8E0D4]/30 border border-[#E8E0D4] space-y-3 mt-8">
              <h4 className="text-xs uppercase tracking-[0.16em] text-[#1C1C1A] font-medium">
                Included in every {service.name.toLowerCase()} appointment:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5E584F]">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#B7A17A] shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-[#E8E0D4] bg-[#FAF8F5] flex items-center justify-between">
            <span className="text-xs text-[#7A7265]">
              Consultations are complimentary with every session.
            </span>
            <button
              onClick={() => {
                onClose();
                onSelectTreatment(service.id, service.treatments[0]?.id || '');
              }}
              className="px-6 py-3 text-xs uppercase tracking-[0.18em] font-medium text-[#F7F4EE] bg-[#1C1C1A] hover:bg-[#B7A17A] transition-colors cursor-pointer"
            >
              Book This Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
