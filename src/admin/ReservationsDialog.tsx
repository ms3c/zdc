import { useEffect, useState } from 'react'
import type { ApiEvent, Reservation } from '../api'
import Modal from '../components/Modal'
import { listReservations } from './adminApi'

interface Props {
  event: ApiEvent | null
  token: string
  onClose: () => void
  onAuthError: (err: unknown) => boolean
}

export default function ReservationsDialog({ event, token, onClose, onAuthError }: Props) {
  return (
    <Modal open={!!event} onClose={onClose} labelledBy="reservations-title" className="max-w-3xl">
      {event && (
        <ReservationsList key={event.id} event={event} token={token} onClose={onClose} onAuthError={onAuthError} />
      )}
    </Modal>
  )
}

function ReservationsList({ event, token, onClose, onAuthError }: Props & { event: ApiEvent }) {
  const [reservations, setReservations] = useState<Reservation[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    listReservations(token, event.id, controller.signal)
      .then(setReservations)
      .catch((err: unknown) => {
        if (controller.signal.aborted || onAuthError(err)) return
        console.error(err)
        setError(true)
      })
    return () => controller.abort()
  }, [event.id, token, onAuthError])

  return (
    <div className="p-6">
      <div className="flex items-start justify-between gap-4">
        <h2 id="reservations-title" className="text-xl font-bold">
          Reservations — {event.title}
        </h2>
        <button type="button" onClick={onClose} aria-label="Close" className="text-fg/60 hover:text-coral">
          ✕
        </button>
      </div>

      <div className="mt-5">
        {error ? (
          <p className="text-coral">Couldn't load reservations.</p>
        ) : reservations === null ? (
          <p className="text-fg/60">Loading…</p>
        ) : reservations.length === 0 ? (
          <p className="text-fg/60">No reservations yet.</p>
        ) : (
          <div className="max-h-[60vh] overflow-auto rounded-xl border border-fg/10">
            <table className="w-full min-w-xl text-left text-sm">
              <thead className="sticky top-0 bg-canvas-alt text-fg/60">
                <tr>
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Email</th>
                  <th className="px-4 py-2 font-medium">Phone</th>
                  <th className="px-4 py-2 font-medium">Seats</th>
                  <th className="px-4 py-2 font-medium">Booked</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-fg/10">
                {reservations.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-2">{r.name}</td>
                    <td className="px-4 py-2">{r.email}</td>
                    <td className="px-4 py-2">{r.phone || '—'}</td>
                    <td className="px-4 py-2">{r.seats}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-fg/60">
                      {new Date(r.created_at).toLocaleString('en', { dateStyle: 'medium', timeStyle: 'short' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
