import { useState, type FormEvent } from 'react'
import { ApiError, type ApiEvent } from '../api'
import { Field, inputClass } from '../components/form'
import Modal from '../components/Modal'
import { createEvent, updateEvent, type EventInput } from './adminApi'

interface Props {
  /** `undefined` = closed, `null` = create a new event, an event = edit it. */
  event: ApiEvent | null | undefined
  token: string
  onClose: () => void
  onSaved: () => void
  onAuthError: (err: unknown) => boolean
}

export default function EventFormDialog({ event, ...props }: Props) {
  return (
    <Modal
      open={event !== undefined}
      onClose={props.onClose}
      labelledBy="event-form-title"
      initialFocus='input[name="title"]'
    >
      {/* Keyed so the form resets whenever a different event is opened. */}
      <EventForm key={event?.id ?? 'new'} event={event ?? null} {...props} />
    </Modal>
  )
}

function EventForm({ event, token, onClose, onSaved, onAuthError }: Omit<Props, 'event'> & { event: ApiEvent | null }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const capacity = String(data.get('capacity')).trim()
    const input: EventInput = {
      title: String(data.get('title')).trim(),
      description: String(data.get('description')).trim(),
      location: String(data.get('location')).trim(),
      date: String(data.get('date')),
      time: String(data.get('time')).slice(0, 5),
      capacity: capacity ? Number(capacity) : null,
    }

    setSubmitting(true)
    setError(null)
    try {
      if (event) await updateEvent(token, event.id, input)
      else await createEvent(token, input)
      onSaved()
    } catch (err) {
      if (onAuthError(err)) return
      setError(err instanceof ApiError ? err : new ApiError('Something went wrong.', 0))
      setSubmitting(false)
    }
  }

  const fieldError = (f: keyof EventInput) => error?.fieldErrors[f]
  const generalError = error && Object.keys(error.fieldErrors).length === 0 ? error.message : null

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <h2 id="event-form-title" className="text-xl font-bold">
        {event ? 'Edit event' : 'New event'}
      </h2>

      <Field label="Title" error={fieldError('title')}>
        <input name="title" required maxLength={200} defaultValue={event?.title} className={inputClass} />
      </Field>
      <Field label="Description" error={fieldError('description')}>
        <textarea
          name="description"
          rows={3}
          maxLength={5000}
          defaultValue={event?.description}
          className={inputClass}
        />
      </Field>
      <Field label="Location" error={fieldError('location')}>
        <input name="location" required maxLength={300} defaultValue={event?.location} className={inputClass} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Date" error={fieldError('date')}>
          <input name="date" type="date" required defaultValue={event?.date} className={inputClass} />
        </Field>
        <Field label="Time" error={fieldError('time')}>
          <input name="time" type="time" required defaultValue={event?.time} className={inputClass} />
        </Field>
        <Field label="Capacity" error={fieldError('capacity')}>
          <input
            name="capacity"
            type="number"
            min={1}
            defaultValue={event?.capacity ?? ''}
            placeholder="Unlimited"
            className={inputClass}
          />
        </Field>
      </div>
      <p className="text-xs text-fg/55">Leave capacity empty for unlimited seats.</p>

      {generalError && <p className="text-sm text-coral">{generalError}</p>}

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onClose} className="rounded-lg border border-fg/20 px-4 py-2">
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-coral px-4 py-2 font-semibold text-ocean-950 disabled:opacity-60"
        >
          {submitting ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  )
}
