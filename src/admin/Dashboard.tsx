import { useEffect, useState } from 'react'
import type { ApiEvent } from '../api'
import { listEvents, type Session } from './adminApi'
import DeleteEventDialog from './DeleteEventDialog'
import EventFormDialog from './EventFormDialog'
import ReservationsDialog from './ReservationsDialog'

interface Props {
  session: Session
  onLogout: () => void
  onAuthError: (err: unknown) => boolean
}

const buttonClass = 'rounded-lg border border-fg/20 px-3 py-1.5 text-sm hover:border-lagoon hover:text-lagoon'

export default function Dashboard({ session, onLogout, onAuthError }: Props) {
  const { token } = session
  const [events, setEvents] = useState<ApiEvent[] | null>(null)
  const [error, setError] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  const [editing, setEditing] = useState<ApiEvent | null | undefined>(undefined)
  const [deleting, setDeleting] = useState<ApiEvent | null>(null)
  const [viewing, setViewing] = useState<ApiEvent | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    listEvents(token, controller.signal)
      .then((res) => setEvents(res.events))
      .catch((err: unknown) => {
        if (controller.signal.aborted || onAuthError(err)) return
        console.error(err)
        setError(true)
      })
    return () => controller.abort()
  }, [token, reloadKey, onAuthError])

  function reload() {
    setError(false)
    setReloadKey((k) => k + 1)
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <header className="flex items-center justify-between border-b border-fg/10 pb-5">
        <h1 className="font-display text-2xl font-extrabold">ZDC Admin</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-fg/60">{session.username}</span>
          <button type="button" onClick={onLogout} className={buttonClass}>
            Sign out
          </button>
        </div>
      </header>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-xl font-bold">Events</h2>
        <button
          type="button"
          onClick={() => setEditing(null)}
          className="rounded-lg bg-coral px-4 py-2 font-semibold text-ocean-950 hover:opacity-90"
        >
          + New event
        </button>
      </div>

      {error ? (
        <p className="mt-6 text-fg/70">
          Couldn't load events.{' '}
          <button type="button" onClick={reload} className="text-lagoon underline">
            Try again
          </button>
        </p>
      ) : events === null ? (
        <p className="mt-6 text-fg/60">Loading…</p>
      ) : events.length === 0 ? (
        <p className="mt-6 text-fg/60">No events yet.</p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-xl border border-fg/10">
          <table className="w-full min-w-176 text-left text-sm">
            <thead className="bg-canvas-alt text-fg/60">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Event</th>
                <th className="px-4 py-3 font-medium">Reserved</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-fg/10">
              {events.map((e) => (
                <tr key={e.id}>
                  <td className="whitespace-nowrap px-4 py-3">
                    {e.date}
                    <span className="block text-fg/55">{e.time}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold">{e.title}</span>
                    <span className="block text-fg/55">{e.location}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {e.reserved_seats} / {e.capacity ?? '∞'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setViewing(e)} className={buttonClass}>
                        Reservations
                      </button>
                      <button type="button" onClick={() => setEditing(e)} className={buttonClass}>
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleting(e)}
                        className="rounded-lg border border-coral/40 px-3 py-1.5 text-sm text-coral hover:bg-coral hover:text-ocean-950"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EventFormDialog
        event={editing}
        token={token}
        onClose={() => setEditing(undefined)}
        onAuthError={onAuthError}
        onSaved={() => {
          setEditing(undefined)
          reload()
        }}
      />
      <DeleteEventDialog
        event={deleting}
        token={token}
        onClose={() => setDeleting(null)}
        onAuthError={onAuthError}
        onDeleted={() => {
          setDeleting(null)
          reload()
        }}
      />
      <ReservationsDialog event={viewing} token={token} onClose={() => setViewing(null)} onAuthError={onAuthError} />
    </div>
  )
}
