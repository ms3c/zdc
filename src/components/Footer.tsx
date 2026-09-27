import { navLinks } from '../data'
import Logo from './Logo'

const socials = [
  { label: 'GitHub', href: '#' },
  { label: 'X / Twitter', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'WhatsApp', href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-fg/10 bg-canvas-alt px-5 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 font-display text-lg font-extrabold">
            <Logo className="size-8" />
            Zanzibar Developers Community
          </div>
          <p className="mt-4 max-w-sm text-sm text-fg/60">
            Building the tech community of the Zanzibar archipelago, one meetup at a time. Made with ☕ and 🌊 in Stone
            Town.
          </p>
        </div>
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-fg/50">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-fg/75 hover:text-lagoon">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-fg/50">Connect</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="text-fg/75 hover:text-lagoon">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href="mailto:hello@zanzibardevs.org" className="text-fg/75 hover:text-lagoon">
                hello@zanzibardevs.org
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl border-t border-fg/10 pt-6 text-xs text-fg/40">
        © {new Date().getFullYear()} Zanzibar Developers Community. Community-run, non-profit.
      </p>
    </footer>
  )
}
