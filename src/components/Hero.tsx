import coastImg from '../assets/zanzibar-coast.jpg'
import { stats } from '../data'

// Brass studs laid out along a Zanzibar-door arch.
const studs = Array.from({ length: 9 }, (_, i) => {
  const angle = Math.PI - (i * Math.PI) / 8
  return { cx: 200 + 150 * Math.cos(angle), cy: 190 - 150 * Math.sin(angle) }
})

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-20 pt-32 md:pt-40">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-lagoon/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-40 size-[26rem] rounded-full bg-coral/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-lagoon/30 bg-lagoon/10 px-4 py-1.5 font-mono text-xs text-lagoon">
            <span className="size-1.5 rounded-full bg-lagoon" />
            Karibu — Unguja &amp; Pemba
          </p>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Where the islands
            <br />
            <span className="text-brass">write code</span>
            <span className="text-coral">.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-fg/75">
            Zanzibar Developers Community brings together builders, students and makers across the archipelago to learn,
            share and ship technology that matters — from Stone Town to the world.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#join"
              className="rounded-full bg-coral px-7 py-3.5 font-semibold text-ocean-950 shadow-lg shadow-coral/20 transition hover:-translate-y-0.5 hover:bg-fg hover:text-canvas"
            >
              Become a member
            </a>
            <a
              href="#events"
              className="rounded-full border border-fg/25 px-7 py-3.5 font-semibold transition hover:border-lagoon hover:text-lagoon"
            >
              Upcoming events →
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-float">
          <svg
            viewBox="0 0 400 480"
            className="w-full drop-shadow-2xl"
            role="img"
            aria-label="Aerial view of the Zanzibar coastline framed by a carved Zanzibar door arch"
          >
            <defs>
              <clipPath id="door">
                <path d="M40 480V190a160 160 0 0 1 320 0v290z" />
              </clipPath>
            </defs>
            <image
              href={coastImg}
              x="40"
              y="30"
              width="320"
              height="450"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#door)"
            />
            <path
              d="M70 480V195a130 130 0 0 1 260 0v285"
              fill="none"
              stroke="#f4ead5"
              strokeOpacity=".45"
              strokeWidth="2"
            />
            <path d="M40 480V190a160 160 0 0 1 320 0v290" fill="none" className="stroke-brass" strokeWidth="10" />
            {studs.map((s, i) => (
              <circle key={i} cx={s.cx} cy={s.cy} r="7" className="fill-brass" />
            ))}
          </svg>

          <div className="absolute -left-4 bottom-10 w-64 rounded-xl border border-sand/10 bg-ocean-950/95 p-4 font-mono text-sand backdrop-blur sm:-left-10 sm:w-72 text-[11px] leading-relaxed shadow-2xl sm:text-xs">
            <div className="mb-3 flex gap-1.5">
              <span className="size-2.5 rounded-full bg-coral" />
              <span className="size-2.5 rounded-full bg-brass" />
              <span className="size-2.5 rounded-full bg-lagoon" />
            </div>
            <p>
              <span className="text-lagoon-bright">$</span> zdc join --island unguja
            </p>
            <p className="text-sand/50">✓ Karibu sana, mjenzi!</p>
            <p className="text-sand/50">✓ Meetups, mentors &amp; hackathons</p>
            <p>
              <span className="text-lagoon-bright">$</span>{' '}
              <span className="inline-block h-3.5 w-2 translate-y-0.5 animate-blink bg-sand" />
            </p>
          </div>
        </div>
      </div>

      <dl className="relative mx-auto mt-20 grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-fg/10 bg-fg/10 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-canvas p-6">
            <dt className="text-sm text-fg/60">{s.label}</dt>
            <dd className="mt-1 font-display text-4xl font-extrabold text-brass">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
