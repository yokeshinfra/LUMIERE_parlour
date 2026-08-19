const AUTH_STORAGE_KEY = 'lumiere_admin_auth_session';
export const AUTH_EVENT = 'lumiere_admin_auth_changed';

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  lastLogin: string;
}

export function getAdminSession(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isStaffAuthenticated(): boolean {
  return getAdminSession() !== null;
}

export function loginStaff(email: string, pass: string, remember: boolean = true): { success: boolean; error?: string; user?: AdminUser } {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = pass.trim();

  // Permitted staff credentials
  // Allows the owner email yokeshkn2002@gmail.com, concierge, or admin with common passwords/PINs
  const isValidOwner = cleanEmail === 'yokeshkn2002@gmail.com' && (cleanPass === '9345781106' || cleanPass === 'lumiere2026' || cleanPass === 'admin' || cleanPass === '1234');
  const isValidStaff = (cleanEmail === 'admin@lumiere.com' || cleanEmail === 'concierge@lumiere.com' || cleanEmail === 'admin' || cleanEmail === 'staff') && (cleanPass === 'lumiere2026' || cleanPass === 'admin123' || cleanPass === '1234' || cleanPass === 'admin');
  
  // Flexible fallback for salon owner/receptionist
  const isMasterKey = cleanPass === 'lumiere2026' || cleanPass === 'admin123' || cleanPass === '9345781106' || cleanPass === '1234';

  if (isValidOwner || isValidStaff || (cleanEmail && isMasterKey)) {
    const user: AdminUser = {
      email: cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@lumiere.com`,
      name: cleanEmail === 'yokeshkn2002@gmail.com' ? 'Yokesh (Director)' : 'Atelier Concierge',
      role: cleanEmail === 'yokeshkn2002@gmail.com' ? 'Director & Owner' : 'Salon Receptionist',
      lastLogin: new Date().toISOString()
    };

    const targetStorage = remember ? localStorage : sessionStorage;
    targetStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: user }));
    return { success: true, user };
  }

  return {
    success: false,
    error: 'Invalid staff credentials. Enter the authorized email and passcode.'
  };
}

export function logoutStaff(): void {
  try {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: null }));
  } catch (err) {
    console.error('Error logging out:', err);
  }
}
