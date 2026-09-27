import { voices } from '../data'
import Section from './Section'

export default function Voices() {
  return (
    <Section id="voices" eyebrow="Sauti · Voices" title="What the community says">
      <div className="grid gap-6 md:grid-cols-3">
        {voices.map((v) => (
          <figure key={v.name} className="flex flex-col rounded-2xl bg-fg p-7 text-canvas">
            <span className="font-display text-6xl leading-none text-coral">“</span>
            <blockquote className="-mt-4 flex-1 text-lg leading-relaxed">{v.quote}</blockquote>
            <figcaption className="mt-6 border-t border-canvas/10 pt-4">
              <p className="font-semibold">{v.name}</p>
              <p className="text-sm text-canvas/60">{v.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
