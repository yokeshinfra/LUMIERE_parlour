import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandExperience from './components/BrandExperience';
import ServicesSection from './components/ServicesSection';
import SignatureExperience from './components/SignatureExperience';
import TransformationSection from './components/TransformationSection';
import BridalSection from './components/BridalSection';
import TestimonialsSection from './components/TestimonialsSection';
import GallerySection from './components/GallerySection';
import AppointmentCta from './components/AppointmentCta';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import BookingStatusModal from './components/BookingStatusModal';
import AdminPanel from './components/AdminPanel';
import AdminSignInModal from './components/AdminSignInModal';
import { getStoredAppointments, APPOINTMENTS_EVENT } from './utils/appointmentStorage';
import { isStaffAuthenticated, AUTH_EVENT } from './utils/adminAuth';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>();
  const [preselectedTreatment, setPreselectedTreatment] = useState<string | undefined>();
  const [isStatusLookupOpen, setIsStatusLookupOpen] = useState(false);
  const [activeLookupTicketId, setActiveLookupTicketId] = useState<string | undefined>();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // Sync pending count
  const syncPendingCount = () => {
    const appts = getStoredAppointments();
    const pending = appts.filter(a => a.status === 'pending').length;
    setPendingCount(pending);
  };

  // Sync auth state
  const syncAuthState = () => {
    const authenticated = isStaffAuthenticated();
    setIsStaff(authenticated);
  };

  useEffect(() => {
    syncAuthState();
    syncPendingCount();

    // Check if URL has #admin, #signin, or #track
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#admin' || hash === '#signin') {
        if (isStaffAuthenticated()) {
          setIsAdminOpen(true);
        } else {
          setIsSignInOpen(true);
        }
      } else if (hash === '#track' || hash === '#lookup') {
        setIsStatusLookupOpen(true);
      }
    };

    handleHash();

    const handleHashChange = () => {
      handleHash();
    };

    const handleAuthChange = () => {
      syncAuthState();
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener(AUTH_EVENT, handleAuthChange);
    window.addEventListener(APPOINTMENTS_EVENT, syncPendingCount);
    window.addEventListener('storage', () => {
      syncAuthState();
      syncPendingCount();
    });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener(AUTH_EVENT, handleAuthChange);
      window.removeEventListener(APPOINTMENTS_EVENT, syncPendingCount);
      window.removeEventListener('storage', syncPendingCount);
    };
  }, []);

  const handleOpenBooking = (serviceId?: string, treatmentId?: string) => {
    setPreselectedService(serviceId);
    setPreselectedTreatment(treatmentId);
    setBookingModalOpen(true);
  };

  const handleOpenStatusLookup = (ticketId?: string) => {
    setActiveLookupTicketId(ticketId);
    setIsStatusLookupOpen(true);
  };

  const handleExploreServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenStaffAccess = () => {
    if (isStaffAuthenticated()) {
      setIsAdminOpen(true);
      window.location.hash = '#admin';
    } else {
      setIsSignInOpen(true);
    }
  };

  const handleSignInSuccess = () => {
    setIsSignInOpen(false);
    setIsStaff(true);
    setIsAdminOpen(true);
    window.location.hash = '#admin';
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  const handleSignOut = () => {
    setIsAdminOpen(false);
    setIsStaff(false);
    if (window.location.hash === '#admin' || window.location.hash === '#signin') {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1C1C1A] selection:bg-[#E8E0D4] selection:text-[#1C1C1A] relative">
      {/* Sticky Minimal Navbar */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenAdmin={handleOpenStaffAccess}
        onOpenStatusLookup={() => handleOpenStatusLookup()}
        isStaff={isStaff}
        pendingCount={pendingCount}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreServices={handleExploreServices}
        />

        {/* 2. Brand Introduction (The Lumière Experience) */}
        <BrandExperience />

        {/* 3. Services Section */}
        <ServicesSection onOpenBooking={handleOpenBooking} />

        {/* 4. Signature Experience (Ritual Section) */}
        <SignatureExperience onOpenBooking={() => handleOpenBooking('hair', 'hair-scalp-spa')} />

        {/* 5. Before / After (The Transformation) */}
        <TransformationSection />

        {/* 6. Bridal Section */}
        <BridalSection onOpenBooking={handleOpenBooking} />

        {/* 7. Testimonials */}
        <TestimonialsSection />

        {/* 8. Gallery */}
        <GallerySection />

        {/* 9. Appointment CTA */}
        <AppointmentCta onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* 10. Footer */}
      <Footer
        onOpenStaffSignIn={handleOpenStaffAccess}
        onOpenStatusLookup={() => handleOpenStatusLookup()}
        isStaff={isStaff}
      />

      {/* Global Appointment Booking Modal */}
      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialServiceId={preselectedService}
        initialTreatmentId={preselectedTreatment}
        onTrackBooking={(ticketId) => {
          setBookingModalOpen(false);
          handleOpenStatusLookup(ticketId);
        }}
      />

      {/* Patron Reservation Lookup & Status Modal */}
      <BookingStatusModal
        isOpen={isStatusLookupOpen}
        onClose={() => {
          setIsStatusLookupOpen(false);
          setActiveLookupTicketId(undefined);
          if (window.location.hash === '#track' || window.location.hash === '#lookup') {
            history.pushState('', document.title, window.location.pathname + window.location.search);
          }
        }}
        initialTicketId={activeLookupTicketId}
        onBookNew={() => {
          setIsStatusLookupOpen(false);
          handleOpenBooking();
        }}
      />

      {/* Staff Sign In Modal */}
      <AdminSignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSuccess={handleSignInSuccess}
      />

      {/* Full-Screen Atelier Admin & Reception Panel */}
      {isAdminOpen && (
        <AdminPanel
          onClose={handleCloseAdmin}
          onSignOut={handleSignOut}
        />
      )}
    </div>
  );
}
