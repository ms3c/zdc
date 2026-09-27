// Base URL of the ZDC backend. Empty by default so requests go to `/api/...`,
// which the Vite dev server proxies to the local worker (see vite.config.ts).
const API_URL = import.meta.env.VITE_API_URL ?? ''

export interface ApiEvent {
  id: number
  title: string
  description: string
  location: string
  date: string // YYYY-MM-DD
  time: string // HH:MM
  capacity: number | null
  reserved_seats: number
  available_seats: number | null
  created_at: string
  updated_at: string
}

export interface EventPage {
  events: ApiEvent[]
  page: number
  per_page: number
  total: number
}

export interface ReservationInput {
  name: string
  email: string
  phone?: string
  seats: number
}

export interface Reservation extends Omit<ReservationInput, 'phone'> {
  id: number
  event_id: number
  phone: string | null
  created_at: string
}

/** Error from the API, with per-field messages when the backend rejected specific fields. */
export class ApiError extends Error {
  status: number
  fieldErrors: Record<string, string>

  constructor(message: string, status: number, fieldErrors: Record<string, string> = {}) {
    super(message)
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

interface ApiErrorBody {
  errors?: Array<{ message: string; path?: string[] }>
}

interface RequestOptions {
  method?: string
  body?: unknown
  token?: string
  signal?: AbortSignal
}

/** Calls the API and returns the parsed body, throwing `ApiError` on any failure. */
export async function apiRequest<T>(path: string, { method = 'GET', body, token, signal }: RequestOptions = {}) {
  const headers: Record<string, string> = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  })
  const data = await res.json().catch(() => null)

  if (!res.ok || !data?.success) {
    const errors = (data as ApiErrorBody | null)?.errors ?? []
    const fieldErrors: Record<string, string> = {}
    for (const e of errors) {
      const field = e.path?.[0] === 'body' ? e.path[1] : undefined
      if (field) fieldErrors[field] ??= e.message
    }
    const general = errors.find((e) => !e.path)?.message
    throw new ApiError(general ?? errors[0]?.message ?? `Request failed (HTTP ${res.status})`, res.status, fieldErrors)
  }
  return data as T
}

export function fetchEvents(
  { page, perPage, upcoming = true, search }: { page: number; perPage: number; upcoming?: boolean; search?: string },
  signal?: AbortSignal,
) {
  const params = new URLSearchParams({ page: String(page), per_page: String(perPage), upcoming: String(upcoming) })
  if (search) params.set('search', search)
  return apiRequest<EventPage>(`/api/events?${params}`, { signal })
}

export function fetchUpcomingEvents(page: number, perPage: number, signal?: AbortSignal) {
  return fetchEvents({ page, perPage }, signal)
}

export async function reserveSeats(eventId: number, input: ReservationInput): Promise<Reservation> {
  const data = await apiRequest<{ reservation: Reservation }>(`/api/events/${eventId}/reservations`, {
    method: 'POST',
    body: input,
  })
  return data.reservation
}
