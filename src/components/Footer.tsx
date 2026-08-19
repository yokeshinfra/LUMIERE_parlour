import { ArrowUp, Mail, Phone, MapPin, Clock, MessageSquare, Lock, Search } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface FooterProps {
  onOpenStaffSignIn?: () => void;
  onOpenStatusLookup?: () => void;
  isStaff?: boolean;
}

export default function Footer({ onOpenStaffSignIn, onOpenStatusLookup, isStaff = false }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Experience', href: '#experience' },
    { label: 'Transformations', href: '#transformations' },
    { label: 'Bridal Atelier', href: '#bridal' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Gallery', href: '#gallery' },
  ];

  return (
    <footer id="contact" className="bg-[#141413] text-[#F7F4EE] pt-20 pb-12 border-t border-[#292926]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#292926]">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#home" className="inline-flex items-center gap-2">
              <span className="font-serif text-3xl tracking-[0.2em] font-medium text-[#F7F4EE]">
                LUMIÈRE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7A17A]" />
            </a>

            <p className="text-sm text-[#A69C8D] font-light leading-relaxed max-w-sm">
              An atelier dedicated to understated feminine elegance. Bespoke hair architecture, clinical botanical dermal therapies, and couture bridal artistry.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={SALON_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-[#2E2E2B] flex items-center justify-center text-[#A69C8D] hover:text-[#B7A17A] hover:border-[#B7A17A] transition-colors"
                title="Instagram (@shysnapster)"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              <a
                href={`https://wa.me/91${SALON_INFO.rawPhone}`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-[#2E2E2B] flex items-center justify-center text-[#A69C8D] hover:text-[#B7A17A] hover:border-[#B7A17A] transition-colors"
                title="WhatsApp Concierge"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <a
                href={SALON_INFO.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-[#2E2E2B] flex items-center justify-center text-[#A69C8D] hover:text-[#B7A17A] hover:border-[#B7A17A] transition-colors"
                title="GitHub (@yokeshinfre)"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
              </a>

              <a
                href={`mailto:${SALON_INFO.email}`}
                className="w-10 h-10 border border-[#2E2E2B] flex items-center justify-center text-[#A69C8D] hover:text-[#B7A17A] hover:border-[#B7A17A] transition-colors"
                title="Email Salon"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#B7A17A] font-medium block">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs text-[#A69C8D]">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#F7F4EE] transition-colors duration-200 block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {onOpenStatusLookup && (
                <li>
                  <button
                    onClick={onOpenStatusLookup}
                    className="text-[#B7A17A] hover:text-[#F7F4EE] transition-colors duration-200 inline-flex items-center gap-1.5 py-0.5 cursor-pointer text-xs"
                  >
                    <Search className="w-3 h-3 text-[#B7A17A]" />
                    <span>Track Reservation / Status</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Hours */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#B7A17A] font-medium block flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              Opening Hours
            </span>
            <div className="space-y-3 text-xs text-[#A69C8D]">
              {SALON_INFO.hours.map((h) => (
                <div key={h.days} className="border-b border-[#222220] pb-2">
                  <span className="text-[#F7F4EE] block font-medium">{h.days}</span>
                  <span className="text-[#7A7265] block font-mono mt-0.5">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Atelier Sanctuary & Contact */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#B7A17A] font-medium block flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              Atelier Location
            </span>
            <div className="text-xs text-[#A69C8D] space-y-2 font-light">
              <p className="text-[#F7F4EE]">{SALON_INFO.address}</p>
              <p>{SALON_INFO.city}</p>
              <div className="pt-2 space-y-1">
                <a
                  href={`tel:${SALON_INFO.rawPhone}`}
                  className="block text-[#F7F4EE] hover:text-[#B7A17A] transition-colors"
                >
                  {SALON_INFO.phone}
                </a>
                <a
                  href={`mailto:${SALON_INFO.email}`}
                  className="block text-[#7A7265] hover:text-[#F7F4EE] transition-colors"
                >
                  {SALON_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7265]">
          <div className="text-center sm:text-left">
            © 2026 Yokesh. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px]">Private Suites · Bespoke Formulation</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#A69C8D] hover:text-[#B7A17A] transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
