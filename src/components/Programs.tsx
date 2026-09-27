import { programs } from '../data'
import Section from './Section'

export default function Programs() {
  return (
    <Section
      id="programs"
      eyebrow="Tunachofanya · What we do"
      title="Programs built to take you from curious to confident."
      className="bg-canvas-alt"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((p) => (
          <article
            key={p.title}
            className="group rounded-2xl border border-fg/10 bg-surface p-7 transition hover:-translate-y-1 hover:border-lagoon/50"
          >
            <div className="grid size-12 place-items-center rounded-xl bg-lagoon/10 text-2xl transition group-hover:bg-lagoon/20">
              {p.icon}
            </div>
            <h3 className="mt-5 font-display text-xl font-bold">{p.title}</h3>
            <p className="mt-2 leading-relaxed text-fg/65">{p.text}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
