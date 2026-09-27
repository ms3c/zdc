import { useEffect, useState } from 'react'
import { navLinks } from '../data'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-canvas/90 shadow-lg shadow-black/20 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight">
          <Logo className="size-8" />
          <span>
            ZDC<span className="text-lagoon">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 text-sm md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-fg/75 transition hover:text-lagoon">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <a
            href="#join"
            className="hidden rounded-full bg-coral px-5 py-2 text-sm font-semibold text-ocean-950 transition hover:-translate-y-0.5 hover:bg-fg hover:text-canvas md:inline-block"
          >
            Join the community
          </a>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg border border-fg/15 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-fg transition ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-fg transition ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-fg transition ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-fg/10 px-5 pb-6 pt-2 md:hidden">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-lg text-fg/85 hover:text-lagoon"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
