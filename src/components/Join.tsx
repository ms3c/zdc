import { useState, type FormEvent } from 'react'
import codeImg from '../assets/code-screen.jpg'
import { tracks } from '../data'

const inputClass =
  'w-full rounded-xl border border-fg/15 bg-canvas/60 px-4 py-3 text-fg placeholder:text-fg/35 outline-none transition focus:border-lagoon focus:ring-2 focus:ring-lagoon/30'

export default function Join() {
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setName(String(data.get('name') ?? '').split(' ')[0])
    // No backend yet — wire this up to your form service or API.
    setSubmitted(true)
  }

  return (
    <section id="join" className="px-5 py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-raised p-8 md:p-14">
        <img
          src={codeImg}
          alt=""
          loading="lazy"
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-raised via-raised/95 to-raised/85 dark:via-raised/90 dark:to-raised/55" />
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-coral/20 blur-3xl" />
        <div className="relative grid gap-12 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-lagoon">Jiunge · Join us</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
              Pull up a chair.
              <br />
              <span className="text-brass">There’s room for you.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-fg/70">
              Membership is free. Get event invites, join our chat groups and find people to build with.
            </p>
            <ul className="mt-8 space-y-3 text-fg/80">
              {[
                'Early access to events & workshops',
                'Access to mentors and study groups',
                'Job and gig opportunities',
              ].map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="grid size-6 place-items-center rounded-full bg-lagoon/20 text-xs text-lagoon">
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {submitted ? (
            <div
              className="grid place-items-center rounded-2xl border border-lagoon/30 bg-canvas/50 p-10 text-center"
              role="status"
            >
              <div>
                <p className="text-5xl">🌴</p>
                <h3 className="mt-4 font-display text-3xl font-bold">Karibu sana{name ? `, ${name}` : ''}!</h3>
                <p className="mt-2 text-fg/70">You’re on the list. Watch your inbox for the next event invite.</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm text-lagoon underline-offset-4 hover:underline"
                >
                  Register someone else
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm text-fg/70">Full name</span>
                  <input name="name" required autoComplete="name" placeholder="Amina Juma" className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm text-fg/70">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-sm text-fg/70">Experience level</span>
                <select name="level" required defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option>Just starting out</option>
                  <option>Student</option>
                  <option>Junior developer</option>
                  <option>Mid / Senior developer</option>
                  <option>Designer / Product</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-fg/70">Main interest</span>
                <select name="interest" defaultValue={tracks[0]} className={inputClass}>
                  {tracks.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="w-full rounded-xl bg-coral py-3.5 font-semibold text-ocean-950 transition hover:bg-fg hover:text-canvas"
              >
                Join ZDC — it’s free
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
