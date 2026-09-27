import { useState, type FormEvent } from 'react'
import { ApiError, reserveSeats, type ApiEvent, type Reservation, type ReservationInput } from '../api'
import { Field, inputClass } from './form'
import Modal from './Modal'

const MAX_SEATS = 10

interface Props {
  event: ApiEvent | null
  onClose: () => void
  onReserved: (eventId: number, seats: number) => void
}

export default function ReserveDialog({ event, onClose, onReserved }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [reservation, setReservation] = useState<Reservation | null>(null)

  function close() {
    setError(null)
    setReservation(null)
    onClose()
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!event) return
    const data = new FormData(e.currentTarget)
    const phone = String(data.get('phone') ?? '').trim()
    const input: ReservationInput = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      seats: Number(data.get('seats') ?? 1),
      ...(phone && { phone }),
    }

    setSubmitting(true)
    setError(null)
    try {
      const r = await reserveSeats(event.id, input)
      setReservation(r)
      onReserved(event.id, r.seats)
    } catch (err) {
      setError(err instanceof ApiError ? err : new ApiError('Something went wrong. Please try again.', 0))
    } finally {
      setSubmitting(false)
    }
  }

  const maxSeats = Math.min(MAX_SEATS, event?.available_seats ?? MAX_SEATS)
  const fieldError = (f: keyof ReservationInput) => error?.fieldErrors[f]
  const generalError = error && Object.keys(error.fieldErrors).length === 0 ? error.message : null

  return (
    <Modal open={!!event} onClose={close} labelledBy="reserve-title" initialFocus='input[name="name"]'>
      {event && (
        <div className="p-7 sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-lagoon">Hifadhi nafasi · Reserve</p>
              <h2 id="reserve-title" className="mt-2 font-display text-2xl font-extrabold leading-tight">
                {event.title}
              </h2>
              <p className="mt-2 text-sm text-fg/60">
                {new Date(`${event.date}T${event.time}`).toLocaleDateString('en', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}{' '}
                · {event.time}
                <br />
                📍 {event.location}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="grid size-9 shrink-0 place-items-center rounded-full border border-fg/15 text-fg/70 transition hover:border-coral hover:text-coral"
            >
              ✕
            </button>
          </div>

          {reservation ? (
            <div role="status" className="mt-8 rounded-2xl border border-lagoon/30 bg-lagoon/10 p-6 text-center">
              <p className="text-4xl">🎟️</p>
              <h3 className="mt-3 font-display text-2xl font-bold">You’re in, {reservation.name.split(' ')[0]}!</h3>
              <p className="mt-2 text-fg/70">
                {reservation.seats} seat{reservation.seats === 1 ? '' : 's'} reserved for{' '}
                <span className="font-semibold">{reservation.email}</span>.
              </p>
              <p className="mt-1 font-mono text-xs text-fg/50">Reservation #{reservation.id}</p>
              <button
                type="button"
                onClick={close}
                className="mt-6 rounded-full bg-coral px-6 py-2.5 font-semibold text-ocean-950 transition hover:bg-fg hover:text-canvas"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <Field label="Full name" error={fieldError('name')}>
                <input
                  name="name"
                  required
                  maxLength={200}
                  autoComplete="name"
                  placeholder="Jane Doe"
                  aria-invalid={!!fieldError('name')}
                  className={inputClass}
                />
              </Field>
              <Field label="Email" error={fieldError('email')}>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="jane@example.com"
                  aria-invalid={!!fieldError('email')}
                  className={inputClass}
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
                <Field label="Phone (optional)" error={fieldError('phone')}>
                  <input
                    name="phone"
                    type="tel"
                    maxLength={30}
                    autoComplete="tel"
                    placeholder="+255700000000"
                    aria-invalid={!!fieldError('phone')}
                    className={inputClass}
                  />
                </Field>
                <Field label="Seats" error={fieldError('seats')}>
                  <select name="seats" defaultValue={1} aria-invalid={!!fieldError('seats')} className={inputClass}>
                    {Array.from({ length: maxSeats }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {generalError && (
                <p role="alert" className="rounded-xl border border-coral/40 bg-coral/10 px-4 py-3 text-sm text-fg/85">
                  {generalError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-coral py-3.5 font-semibold text-ocean-950 transition hover:bg-fg hover:text-canvas disabled:cursor-wait disabled:opacity-60"
              >
                {submitting ? 'Reserving…' : 'Reserve my seat'}
              </button>
              <p className="text-center text-xs text-fg/50">
                {event.available_seats === null
                  ? 'Open entry — reserving helps us plan.'
                  : `${event.available_seats} seat${event.available_seats === 1 ? '' : 's'} left · max ${MAX_SEATS} per booking`}
              </p>
            </form>
          )}
        </div>
      )}
    </Modal>
  )
}
