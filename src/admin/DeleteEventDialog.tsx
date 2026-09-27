import { useState } from 'react'
import { ApiError, type ApiEvent } from '../api'
import Modal from '../components/Modal'
import { deleteEvent } from './adminApi'

interface Props {
  event: ApiEvent | null
  token: string
  onClose: () => void
  onDeleted: () => void
  onAuthError: (err: unknown) => boolean
}

export default function DeleteEventDialog({ event, token, onClose, onDeleted, onAuthError }: Props) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function close() {
    setError(null)
    onClose()
  }

  async function handleDelete() {
    if (!event) return
    setDeleting(true)
    setError(null)
    try {
      await deleteEvent(token, event.id)
      onDeleted()
    } catch (err) {
      if (!onAuthError(err)) setError(err instanceof ApiError ? err.message : 'Something went wrong.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Modal open={!!event} onClose={close} labelledBy="delete-title" className="max-w-md" initialFocus="[data-cancel]">
      {event && (
        <div className="p-6">
          <h2 id="delete-title" className="text-xl font-bold">
            Delete “{event.title}”?
          </h2>
          <p className="mt-2 text-fg/70">
            This can't be undone.
            {event.reserved_seats > 0 && ` ${event.reserved_seats} seat(s) are reserved for this event.`}
          </p>
          {error && <p className="mt-3 text-sm text-coral">{error}</p>}
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" data-cancel onClick={close} className="rounded-lg border border-fg/20 px-4 py-2">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-lg bg-coral px-4 py-2 font-semibold text-ocean-950 disabled:opacity-60"
            >
              {deleting ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}
