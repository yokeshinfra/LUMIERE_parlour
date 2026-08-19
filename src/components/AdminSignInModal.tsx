import { useState, useEffect } from 'react';
import { Lock, Mail, KeyRound, X, AlertCircle, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { loginStaff } from '../utils/adminAuth';

interface AdminSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminSignInModal({ isOpen, onClose, onSuccess }: AdminSignInModalProps) {
  const [email, setEmail] = useState('yokeshkn2002@gmail.com');
  const [password, setPassword] = useState('lumiere2026');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const res = loginStaff(email, password, rememberMe);
      setLoading(false);
      if (res.success) {
        onSuccess();
      } else {
        setError(res.error || 'Authentication failed');
      }
    }, 350);
  };

  const handleQuickAccess = (role: 'director' | 'reception') => {
    setError(null);
    setLoading(true);
    setTimeout(() => {
      const targetEmail = role === 'director' ? 'yokeshkn2002@gmail.com' : 'concierge@lumiere.com';
      const targetPass = 'lumiere2026';
      setEmail(targetEmail);
      setPassword(targetPass);
      const res = loginStaff(targetEmail, targetPass, true);
      setLoading(false);
      if (res.success) {
        onSuccess();
      }
    }, 250);
  };

  return (
    <div
      id="staff-signin-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1A]/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="staff-signin-title"
    >
      <div
        className="relative w-full max-w-md bg-[#FAF8F5] border border-[#E8E0D4] shadow-2xl p-6 sm:p-8 overflow-hidden text-[#1C1C1A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative top gold line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#B7A17A]/20 via-[#B7A17A] to-[#B7A17A]/20" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#1C1C1A]/60 hover:text-[#1C1C1A] transition-colors duration-200 cursor-pointer"
          aria-label="Close Staff Sign In"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 pt-2">
          <div className="w-12 h-12 mx-auto mb-3.5 rounded-full bg-[#F3EDE2] border border-[#E8E0D4] flex items-center justify-center text-[#B7A17A]">
            <Lock className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B7A17A] font-semibold block mb-1">
            Restricted Staff Portal
          </span>
          <h2 id="staff-signin-title" className="font-serif text-2xl text-[#1C1C1A]">
            Atelier Sign In
          </h2>
          <p className="text-xs text-[#1C1C1A]/65 mt-1.5 leading-relaxed">
            Enter your concierge credentials to access live appointments and reception desk.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-50/90 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.14em] text-[#1C1C1A]/80 font-medium mb-1.5">
              Staff Email / ID
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#1C1C1A]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yokeshkn2002@gmail.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#E8E0D4] text-xs text-[#1C1C1A] placeholder-[#1C1C1A]/30 focus:border-[#B7A17A] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.14em] text-[#1C1C1A]/80 font-medium mb-1.5">
              Security Passcode
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#1C1C1A]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#E8E0D4] text-xs text-[#1C1C1A] placeholder-[#1C1C1A]/30 focus:border-[#B7A17A] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#1C1C1A]/70">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#1C1C1A] border-[#E8E0D4]"
              />
              <span className="text-[11px]">Keep signed in on this station</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#F7F4EE] bg-[#1C1C1A] hover:bg-[#2A2926] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Authenticate & Enter Desk</span>
                <ArrowRight className="w-4 h-4 text-[#B7A17A]" />
              </>
            )}
          </button>
        </form>

        {/* Quick Access Helper Buttons for effortless evaluation */}
        <div className="mt-6 pt-5 border-t border-[#E8E0D4]">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] uppercase tracking-wider text-[#1C1C1A]/60 flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3 h-3 text-[#B7A17A]" />
              Quick One-Click Demo Access
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickAccess('director')}
              className="px-2.5 py-2 text-[10px] uppercase tracking-wider bg-white hover:bg-[#F3EDE2] border border-[#E8E0D4] text-[#1C1C1A] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="w-3 h-3 text-[#B7A17A] shrink-0" />
              <div className="truncate">
                <span className="font-semibold block truncate">Director / Owner</span>
                <span className="text-[9px] text-[#1C1C1A]/50 lowercase truncate">yokeshkn2002@...</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickAccess('reception')}
              className="px-2.5 py-2 text-[10px] uppercase tracking-wider bg-white hover:bg-[#F3EDE2] border border-[#E8E0D4] text-[#1C1C1A] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="w-3 h-3 text-[#B7A17A] shrink-0" />
              <div className="truncate">
                <span className="font-semibold block truncate">Reception Desk</span>
                <span className="text-[9px] text-[#1C1C1A]/50 lowercase truncate">concierge@...</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
