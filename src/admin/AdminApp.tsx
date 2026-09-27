import { useCallback, useEffect, useState } from 'react'
import { ApiError } from '../api'
import type { Session } from './adminApi'
import Dashboard from './Dashboard'
import LoginPage from './LoginPage'
import { loadSession, saveSession } from './session'

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(loadSession)
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Admin · Zanzibar Developers Community'
  }, [])

  const logout = useCallback((message: string | null = null) => {
    saveSession(null)
    setSession(null)
    setNotice(message)
  }, [])

  // Sign out when the token expires, even if the tab is left open.
  useEffect(() => {
    if (!session) return
    const timer = setTimeout(
      () => logout('Your session expired. Please sign in again.'),
      session.expiresAt - Date.now(),
    )
    return () => clearTimeout(timer)
  }, [session, logout])

  /** Returns true if the error was an auth failure (and signs the admin out). */
  const handleAuthError = useCallback(
    (err: unknown) => {
      if (err instanceof ApiError && err.status === 401) {
        logout('Your session is no longer valid. Please sign in again.')
        return true
      }
      return false
    },
    [logout],
  )

  if (!session) {
    return (
      <LoginPage
        notice={notice}
        onLogin={(s) => {
          saveSession(s)
          setSession(s)
          setNotice(null)
        }}
      />
    )
  }

  return <Dashboard session={session} onLogout={() => logout()} onAuthError={handleAuthError} />
}
