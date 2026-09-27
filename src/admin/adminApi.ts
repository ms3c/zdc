import { apiRequest, type ApiEvent, type EventPage, type Reservation } from '../api'

export interface EventInput {
  title: string
  description: string
  location: string
  date: string // YYYY-MM-DD
  time: string // HH:MM
  capacity: number | null // null = unlimited
}

export interface Session {
  token: string
  username: string
  expiresAt: number // epoch ms
}

interface LoginResponse {
  token: string
  expires_in: number
  user: { id: number; username: string; role: string }
}

export async function login(username: string, password: string): Promise<Session> {
  const data = await apiRequest<LoginResponse>('/api/auth/login', { method: 'POST', body: { username, password } })
  return { token: data.token, username: data.user.username, expiresAt: Date.now() + data.expires_in * 1000 }
}

export function listEvents(token: string, signal?: AbortSignal) {
  return apiRequest<EventPage>('/api/events?page=1&per_page=100&upcoming=false', { token, signal })
}

export async function createEvent(token: string, input: EventInput) {
  const data = await apiRequest<{ event: ApiEvent }>('/api/events', { method: 'POST', body: input, token })
  return data.event
}

export async function updateEvent(token: string, id: number, input: Partial<EventInput>) {
  const data = await apiRequest<{ event: ApiEvent }>(`/api/events/${id}`, { method: 'PATCH', body: input, token })
  return data.event
}

export async function deleteEvent(token: string, id: number) {
  await apiRequest(`/api/events/${id}`, { method: 'DELETE', token })
}

export async function listReservations(token: string, eventId: number, signal?: AbortSignal) {
  const data = await apiRequest<{ reservations: Reservation[] }>(`/api/events/${eventId}/reservations`, {
    token,
    signal,
  })
  return data.reservations
}
