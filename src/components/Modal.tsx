import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  labelledBy: string
  className?: string
  /** Selector for the element to focus when the dialog opens. */
  initialFocus?: string
  children: ReactNode
}

/** Native <dialog> modal: focus trap, Escape and backdrop click to close. */
export default function Modal({ open, onClose, labelledBy, className = 'max-w-lg', initialFocus, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      if (initialFocus) dialog.querySelector<HTMLElement>(initialFocus)?.focus()
    }
    if (!open && dialog.open) dialog.close()
  }, [open, initialFocus])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby={labelledBy}
      className={`m-auto w-[calc(100%-2rem)] rounded-3xl border border-fg/10 bg-canvas p-0 text-fg shadow-2xl backdrop:bg-ocean-950/70 backdrop:backdrop-blur-sm ${className}`}
    >
      {open && children}
    </dialog>
  )
}
