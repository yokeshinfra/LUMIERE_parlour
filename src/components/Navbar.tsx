import { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, Sparkles, ShieldCheck, Search } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface NavbarProps {
  onOpenBooking: (serviceId?: string, treatmentId?: string) => void;
  onOpenAdmin: () => void;
  onOpenStatusLookup?: () => void;
  isStaff?: boolean;
  pendingCount?: number;
}

export default function Navbar({ 
  onOpenBooking, 
  onOpenAdmin, 
  onOpenStatusLookup,
  isStaff = false, 
  pendingCount = 0 
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Experience', href: '#experience' },
    { label: 'Transformations', href: '#transformations' },
    { label: 'Bridal', href: '#bridal' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Gallery', href: '#gallery' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#E8E0D4] py-3.5 shadow-[0_4px_24px_rgba(28,28,26,0.03)]'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="group flex items-center gap-2 focus:outline-none"
            aria-label="LUMIÈRE Home"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-medium text-[#1C1C1A] transition-colors duration-300 group-hover:text-[#B7A17A]">
              LUMIÈRE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7A17A] inline-block transition-transform duration-300 group-hover:scale-125" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-9">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-[13px] tracking-[0.14em] uppercase text-[#1C1C1A]/80 hover:text-[#1C1C1A] transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B7A17A] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Track Booking Button */}
            {onOpenStatusLookup && (
              <button
                onClick={onOpenStatusLookup}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-[0.14em] font-medium text-[#1C1C1A] hover:text-[#B7A17A] border border-[#E8E0D4] hover:border-[#1C1C1A] bg-[#FAF8F5] transition-all duration-200 cursor-pointer"
                title="Check Reservation Status by Ticket # or Phone"
              >
                <Search className="w-3.5 h-3.5 text-[#B7A17A]" />
                <span>Track Booking</span>
              </button>
            )}

            {/* Show discreet staff button ONLY when staff is authenticated */}
            {isStaff && (
              <button
                onClick={onOpenAdmin}
                className="relative inline-flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-[0.16em] font-medium text-[#1C1C1A] hover:text-[#B7A17A] border border-[#B7A17A]/50 bg-[#F3EDE2] transition-all duration-200 cursor-pointer shadow-xs"
                title="Open Reception Desk"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#B7A17A]" />
                <span>Staff Desk</span>
                {pendingCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-amber-500 text-white text-[9px] font-bold rounded-full animate-pulse">
                    {pendingCount}
                  </span>
                )}
              </button>
            )}

            <a
              href={`tel:${SALON_INFO.rawPhone}`}
              className="p-2.5 rounded-full border border-[#E8E0D4] hover:border-[#B7A17A] text-[#1C1C1A] hover:text-[#B7A17A] transition-colors duration-200"
              title="Call Reception"
              aria-label="Call salon"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              id="navbar-book-btn"
              onClick={() => onOpenBooking()}
              className="group relative inline-flex items-center justify-center px-6 py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-[#F7F4EE] bg-[#1C1C1A] hover:bg-[#2A2926] active:scale-[0.98] transition-all duration-300 rounded-none cursor-pointer border border-[#1C1C1A]"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#B7A17A] transition-transform duration-300 group-hover:rotate-12" />
                Book Appointment
              </span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            {onOpenStatusLookup && (
              <button
                onClick={onOpenStatusLookup}
                className="p-2 text-[#1C1C1A] hover:text-[#B7A17A] border border-[#E8E0D4] bg-[#FAF8F5] cursor-pointer"
                title="Track Reservation"
                aria-label="Track booking"
              >
                <Search className="w-3.5 h-3.5 text-[#B7A17A]" />
              </button>
            )}

            {isStaff && (
              <button
                onClick={onOpenAdmin}
                className="px-2 py-1.5 text-[9px] uppercase tracking-wider font-medium text-[#1C1C1A] border border-[#B7A17A]/40 bg-[#F3EDE2] flex items-center gap-1 cursor-pointer"
                title="Staff Desk"
              >
                <ShieldCheck className="w-3 h-3 text-[#B7A17A]" />
                <span>Staff</span>
                {pendingCount > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                )}
              </button>
            )}

            <button
              onClick={() => onOpenBooking()}
              className="px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] font-medium text-[#F7F4EE] bg-[#1C1C1A] cursor-pointer"
            >
              Book
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1C1C1A] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F7F4EE] pt-24 px-8 pb-12 flex flex-col justify-between lg:hidden animate-fadeIn">
          <div className="space-y-6">
            <div className="text-xs uppercase tracking-[0.2em] text-[#A69C8D] pb-3 border-b border-[#E8E0D4] flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-[#B7A17A]" />
              Navigation
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="font-serif text-2xl text-[#1C1C1A] hover:text-[#B7A17A] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pt-8 border-t border-[#E8E0D4]">
            {onOpenStatusLookup && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStatusLookup();
                }}
                className="w-full py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#1C1C1A] bg-[#FAF8F5] border border-[#E8E0D4] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#B7A17A]" />
                Track My Reservation
              </button>
            )}

            {isStaff && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#1C1C1A] bg-[#FAF8F5] border border-[#B7A17A]/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#B7A17A]" />
                Concierge Reception Desk
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#F7F4EE] bg-[#1C1C1A] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#B7A17A]" />
              Book an Appointment
            </button>
            <div className="text-center text-xs text-[#A69C8D] tracking-wider">
              {SALON_INFO.phone} · {SALON_INFO.city}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
