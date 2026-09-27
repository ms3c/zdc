import { tracks } from '../data'
import Section from './Section'

export default function Tracks() {
  return (
    <Section
      id="stack"
      eyebrow="Njia za kujifunza · Tracks"
      title="Whatever you build with, there’s a circle for you."
      className="bg-canvas-alt"
    >
      <ul className="flex flex-wrap gap-3">
        {tracks.map((t, i) => (
          <li
            key={t}
            className={`rounded-full border px-5 py-2.5 font-mono text-sm transition hover:-translate-y-0.5 ${
              i % 3 === 0
                ? 'border-lagoon/40 text-lagoon hover:bg-lagoon/10'
                : i % 3 === 1
                  ? 'border-brass/40 text-brass hover:bg-brass/10'
                  : 'border-coral/40 text-coral hover:bg-coral/10'
            }`}
          >
            {t}
          </li>
        ))}
      </ul>
    </Section>
  )
}
