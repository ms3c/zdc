import type { ReactNode } from 'react'

export const inputClass =
  'w-full rounded-xl border border-fg/15 bg-canvas-alt/60 px-4 py-3 text-fg placeholder:text-fg/35 outline-none transition focus:border-lagoon focus:ring-2 focus:ring-lagoon/30 aria-invalid:border-coral'

export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-fg/70">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-sm text-coral">{error}</span>}
    </label>
  )
}
