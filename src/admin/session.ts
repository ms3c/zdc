import type { Session } from './adminApi'

// sessionStorage: the token is cleared when the tab closes, and isn't shared across tabs.
const KEY = 'zdc-admin-session'

export function loadSession(): Session | null {
  try {
    const session = JSON.parse(sessionStorage.getItem(KEY) ?? 'null') as Session | null
    return session && session.expiresAt > Date.now() ? session : null
  } catch {
    return null
  }
}

export function saveSession(session: Session | null) {
  if (session) sessionStorage.setItem(KEY, JSON.stringify(session))
  else sessionStorage.removeItem(KEY)
}
