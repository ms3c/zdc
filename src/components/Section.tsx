import type { ReactNode } from 'react'

interface Props {
  id: string
  eyebrow: string
  title: ReactNode
  intro?: string
  className?: string
  children: ReactNode
}

export default function Section({ id, eyebrow, title, intro, className = '', children }: Props) {
  return (
    <section id={id} className={`px-5 py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-lagoon">{eyebrow}</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
          {title}
        </h2>
        {intro && <p className="mt-5 max-w-xl text-lg text-fg/70">{intro}</p>}
        <div className="mt-14">{children}</div>
      </div>
    </section>
  )
}
