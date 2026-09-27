import { useState } from 'react'
import { events, type EventKind } from '../data'
import Section from './Section'

const filters: Array<'All' | EventKind> = ['All', 'Meetup', 'Workshop', 'Hackathon']

const kindStyles: Record<EventKind, string> = {
  Meetup: 'bg-lagoon/15 text-lagoon',
  Workshop: 'bg-brass/15 text-brass',
  Hackathon: 'bg-coral/15 text-coral',
}

export default function Events() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const visible = filter === 'All' ? events : events.filter((e) => e.kind === filter)

  return (
    <Section
      id="events"
      eyebrow="Matukio · Events"
      title="Upcoming events"
      intro="All events are free. Bring a laptop, a friend and your questions."
    >
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter events">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              filter === f ? 'bg-fg text-canvas' : 'border border-fg/20 text-fg/75 hover:border-fg/50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="divide-y divide-fg/10 border-y border-fg/10">
        {visible.map((e) => {
          const d = new Date(`${e.date}T${e.time}`)
          return (
            <li key={e.id} className="grid gap-4 py-7 md:grid-cols-[7rem_1fr_auto] md:items-center md:gap-8">
              <time dateTime={e.date} className="flex items-baseline gap-2 md:block">
                <span className="font-display text-4xl font-extrabold text-brass">{d.getDate()}</span>
                <span className="block font-mono text-xs uppercase tracking-widest text-fg/60">
                  {d.toLocaleString('en', { month: 'short' })} · {e.time}
                </span>
              </time>
              <div>
                <span className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider ${kindStyles[e.kind]}`}>
                  {e.kind}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold">{e.title}</h3>
                <p className="mt-1 text-fg/65">{e.blurb}</p>
                <p className="mt-2 text-sm text-fg/50">📍 {e.venue}</p>
              </div>
              <a
                href="#join"
                className="justify-self-start rounded-full border border-fg/25 px-5 py-2.5 text-sm font-semibold transition hover:border-coral hover:bg-coral hover:text-ocean-950"
              >
                RSVP
              </a>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
