// Simple session management - client-side protection layer
const SESSION_KEY = 'mshop_adm_session';
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

export function isAdminAuthenticated() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    if (!session?.token || !session?.expires) return false;
    if (Date.now() > session.expires) {
      localStorage.removeItem(SESSION_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function adminLogin(username, password) {
  if (username === 'lucaneves' && password === '1928759923') {
    const session = {
      token: btoa(`${username}:${Date.now()}`),
      expires: Date.now() + SESSION_DURATION,
      user: username,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

export function adminLogout() {
  localStorage.removeItem(SESSION_KEY);
}
