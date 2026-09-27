import { useState, type FormEvent } from 'react'
import { ApiError } from '../api'
import { Field, inputClass } from '../components/form'
import { login, type Session } from './adminApi'

interface Props {
  notice: string | null
  onLogin: (session: Session) => void
}

export default function LoginPage({ notice, onLogin }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setSubmitting(true)
    setError(null)
    try {
      onLogin(await login(String(data.get('username')).trim(), String(data.get('password'))))
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 401
          ? 'Invalid username or password.'
          : 'Could not sign in. Please try again.',
      )
      setSubmitting(false)
    }
  }

  return (
    <main className="grid min-h-svh place-items-center px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-2xl border border-fg/10 bg-surface p-8"
      >
        <h1 className="text-2xl font-bold">ZDC Admin</h1>
        {notice && <p className="text-sm text-brass">{notice}</p>}
        <Field label="Username">
          <input name="username" required autoComplete="username" autoFocus className={inputClass} />
        </Field>
        <Field label="Password">
          <input name="password" type="password" required autoComplete="current-password" className={inputClass} />
        </Field>
        {error && (
          <p role="alert" className="text-sm text-coral">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-coral py-3 font-semibold text-ocean-950 disabled:opacity-60"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}
