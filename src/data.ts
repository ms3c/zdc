export type EventKind = 'Meetup' | 'Workshop' | 'Hackathon'

export interface CommunityEvent {
  id: number
  kind: EventKind
  title: string
  date: string
  time: string
  venue: string
  blurb: string
}

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#programs', label: 'Programs' },
  { href: '#events', label: 'Events' },
  { href: '#stack', label: 'Tracks' },
  { href: '#join', label: 'Join' },
]

export const stats = [
  { value: '600+', label: 'Members across Unguja & Pemba' },
  { value: '40+', label: 'Meetups hosted' },
  { value: '12', label: 'Hackathons run' },
  { value: '25', label: 'Volunteer mentors' },
]

export const programs = [
  {
    icon: '☕',
    title: 'Monthly Meetups',
    text: 'Talks, lightning demos and chai in Stone Town. Share what you are building, learn what others ship.',
  },
  {
    icon: '🛠',
    title: 'Hands-on Workshops',
    text: 'Weekend sessions on web, mobile, cloud and data — laptops open, code running by the end.',
  },
  {
    icon: '⚡',
    title: 'Hackathons',
    text: 'Build for tourism, fisheries, health and education. Local problems, local solutions, real prizes.',
  },
  {
    icon: '🧭',
    title: 'Mentorship',
    text: 'Pair students and career-switchers with working engineers for 12-week guided journeys.',
  },
  {
    icon: '🌍',
    title: 'Open Source',
    text: 'Contribute to community projects, including Swahili-first tools and localisation efforts.',
  },
  {
    icon: '💼',
    title: 'Jobs & Gigs Board',
    text: 'Connect with startups, NGOs and remote teams looking for talent from the islands.',
  },
]

export const events: CommunityEvent[] = [
  {
    id: 1,
    kind: 'Meetup',
    title: 'Dev Night: Building for Low Bandwidth',
    date: '2026-10-15',
    time: '18:00',
    venue: 'Stone Town, Zanzibar',
    blurb: 'Offline-first patterns, PWAs and USSD integrations that work where connectivity does not.',
  },
  {
    id: 2,
    kind: 'Workshop',
    title: 'Intro to Mobile Money APIs',
    date: '2026-10-25',
    time: '10:00',
    venue: 'Mwanakwerekwe Tech Hub',
    blurb: 'Integrate payments end-to-end: sandbox setup, callbacks, reconciliation and security.',
  },
  {
    id: 3,
    kind: 'Hackathon',
    title: 'Blue Economy Hack 2026',
    date: '2026-11-13',
    time: '09:00',
    venue: 'Michenzani, Zanzibar',
    blurb: '48 hours to build tools for fishers, seaweed farmers and coastal communities.',
  },
  {
    id: 4,
    kind: 'Workshop',
    title: 'AI in Kiswahili: Hands-on with LLMs',
    date: '2026-11-28',
    time: '10:00',
    venue: 'Online + Stone Town',
    blurb: 'Prompting, evaluation and building simple assistants that understand Kiswahili.',
  },
  {
    id: 5,
    kind: 'Meetup',
    title: 'Pemba Dev Meetup',
    date: '2026-12-05',
    time: '16:00',
    venue: 'Chake Chake, Pemba',
    blurb: 'Our first meetup in Pemba — show-and-tell, career chat and community planning.',
  },
]

export const tracks = [
  'JavaScript',
  'TypeScript',
  'React',
  'Flutter',
  'Kotlin',
  'Python',
  'Django',
  'Go',
  'PHP / Laravel',
  'Data Science',
  'Machine Learning',
  'DevOps',
  'Cloud',
  'Cybersecurity',
  'UI / UX',
  'Blockchain',
]

export const voices = [
  {
    quote:
      'I wrote my first line of code at a ZDC workshop. A year later I shipped an app used by guest houses across Nungwi.',
    name: 'Community member',
    role: 'Mobile developer',
  },
  {
    quote:
      'The mentorship program connected me with engineers who had walked the same path. That changed everything.',
    name: 'Mentee, 2025 cohort',
    role: 'Backend engineer',
  },
  {
    quote:
      'Hosting a hackathon with ZDC brought us talent we could not find anywhere else on the island.',
    name: 'Partner organisation',
    role: 'Local startup',
  },
]
