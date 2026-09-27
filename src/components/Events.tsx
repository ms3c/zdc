import { useEffect, useState } from 'react'
import { fetchUpcomingEvents, type ApiEvent } from '../api'
import ReserveDialog from './ReserveDialog'
import Section from './Section'

const PER_PAGE = 20

type Status = 'loading' | 'ready' | 'error'

function seatsLabel(e: ApiEvent) {
  if (e.available_seats === null) return { text: 'Open entry', className: 'bg-lagoon/15 text-lagoon' }
  if (e.available_seats === 0) return { text: 'Fully booked', className: 'bg-fg/10 text-fg/60' }
  const low = e.capacity !== null && e.available_seats <= Math.max(5, e.capacity * 0.2)
  return {
    text: `${e.available_seats} seat${e.available_seats === 1 ? '' : 's'} left`,
    className: low ? 'bg-coral/15 text-coral' : 'bg-brass/15 text-brass',
  }
}

export default function Events() {
  const [events, setEvents] = useState<ApiEvent[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<Status>('loading')
  const [attempt, setAttempt] = useState(0)
  const [selected, setSelected] = useState<ApiEvent | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetchUpcomingEvents(page, PER_PAGE, controller.signal)
      .then((res) => {
        setEvents((prev) => (page === 1 ? res.events : [...prev, ...res.events]))
        setTotal(res.total)
        setStatus('ready')
      })
      .catch((err: unknown) => {
        if (!controller.signal.aborted) {
          console.error(err)
          setStatus('error')
        }
      })
    return () => controller.abort()
  }, [page, attempt])

  function loadMore() {
    setStatus('loading')
    setPage((p) => p + 1)
  }

  function retry() {
    setStatus('loading')
    setAttempt((a) => a + 1)
  }

  // Reflect a new reservation locally so the seat count updates without refetching.
  function handleReserved(eventId: number, seats: number) {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              reserved_seats: e.reserved_seats + seats,
              available_seats: e.available_seats === null ? null : e.available_seats - seats,
            }
          : e,
      ),
    )
  }

  const hasMore = events.length < total

  return (
    <Section
      id="events"
      eyebrow="Matukio · Events"
      title="Upcoming events"
      intro="Bring a laptop, a friend and your questions."
    >
      {events.length > 0 && (
        <ul className="divide-y divide-fg/10 border-y border-fg/10">
          {events.map((e) => {
            const d = new Date(`${e.date}T${e.time}`)
            const seats = seatsLabel(e)
            return (
              <li key={e.id} className="grid gap-4 py-7 md:grid-cols-[7rem_1fr_auto] md:items-center md:gap-8">
                <time dateTime={`${e.date}T${e.time}`} className="flex items-baseline gap-2 md:block">
                  <span className="font-display text-4xl font-extrabold text-brass">{d.getDate()}</span>
                  <span className="block font-mono text-xs uppercase tracking-widest text-fg/60">
                    {d.toLocaleString('en', { month: 'short' })} · {e.time}
                  </span>
                </time>
                <div>
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider ${seats.className}`}
                  >
                    {seats.text}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold">{e.title}</h3>
                  <p className="mt-1 text-fg/65">{e.description}</p>
                  <p className="mt-2 text-sm text-fg/50">📍 {e.location}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(e)}
                  disabled={e.available_seats === 0}
                  aria-label={`Reserve a seat for ${e.title}`}
                  className="justify-self-start rounded-full border border-fg/25 px-5 py-2.5 text-sm font-semibold transition hover:border-coral hover:bg-coral hover:text-ocean-950 disabled:pointer-events-none disabled:opacity-40"
                >
                  {e.available_seats === 0 ? 'Full' : 'RSVP'}
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {status === 'loading' && events.length === 0 && (
        <ul className="divide-y divide-fg/10 border-y border-fg/10" aria-busy="true" aria-label="Loading events">
          {[0, 1, 2].map((i) => (
            <li key={i} className="grid animate-pulse gap-4 py-7 md:grid-cols-[7rem_1fr_auto] md:gap-8">
              <div className="h-10 w-16 rounded-lg bg-fg/10" />
              <div className="space-y-3">
                <div className="h-5 w-24 rounded-full bg-fg/10" />
                <div className="h-7 w-2/3 rounded-lg bg-fg/10" />
                <div className="h-4 w-full max-w-lg rounded bg-fg/10" />
              </div>
            </li>
          ))}
        </ul>
      )}

      {status === 'ready' && events.length === 0 && (
        <p className="rounded-2xl border border-dashed border-fg/20 p-10 text-center text-fg/65">
          No upcoming events right now — join the community to hear about the next one first.
        </p>
      )}

      {status === 'error' && (
        <div role="alert" className="mt-6 rounded-2xl border border-coral/40 bg-coral/10 p-6 text-center">
          <p className="text-fg/80">We couldn’t load events right now.</p>
          <button
            type="button"
            onClick={retry}
            className="mt-4 rounded-full bg-coral px-5 py-2 text-sm font-semibold text-ocean-950 transition hover:bg-fg hover:text-canvas"
          >
            Try again
          </button>
        </div>
      )}

      {hasMore && status !== 'error' && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={status === 'loading'}
            className="rounded-full border border-fg/25 px-6 py-3 text-sm font-semibold transition hover:border-lagoon hover:text-lagoon disabled:opacity-50"
          >
            {status === 'loading' ? 'Loading…' : `Load more events (${total - events.length} more)`}
          </button>
        </div>
      )}

      <ReserveDialog event={selected} onClose={() => setSelected(null)} onReserved={handleReserved} />
    </Section>
  )
}
