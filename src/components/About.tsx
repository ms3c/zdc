import stoneTownImg from '../assets/stone-town.jpg'
import Section from './Section'

const values = [
  { title: 'Learn in public', text: 'Share what you know, ask what you don’t. Every level is welcome here.' },
  {
    title: 'Build for home',
    text: 'We focus on problems that matter to Zanzibar — tourism, the ocean, health, education.',
  },
  { title: 'Lift each other', text: 'Mentors today were beginners yesterday. We pay it forward, always.' },
]

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="Kuhusu sisi · About"
      title={
        <>
          A home for every developer on the <span className="text-lagoon">spice islands</span>.
        </>
      }
      intro="We’re a volunteer-run, non-profit community of software engineers, designers, data folks and curious beginners. No gatekeeping — just people who love building."
    >
      <div className="grid items-center gap-12 md:grid-cols-[5fr_6fr] lg:gap-20">
        <figure className="relative">
          <img
            src={stoneTownImg}
            alt="A shopkeeper at a fruit stall in front of a carved doorway in Stone Town"
            loading="lazy"
            width={900}
            height={1350}
            className="aspect-[4/5] w-full rounded-t-full rounded-b-3xl object-cover shadow-2xl ring-4 ring-brass/60"
          />
          <figcaption className="absolute -bottom-5 right-4 rounded-full bg-coral px-4 py-2 font-mono text-xs text-ocean-950 shadow-lg">
            📍 Stone Town, Unguja
          </figcaption>
        </figure>

        <div className="space-y-10">
          {values.map((v, i) => (
            <div key={v.title} className="relative border-l-2 border-brass/60 pl-6">
              <span className="font-mono text-sm text-brass">0{i + 1}</span>
              <h3 className="mt-2 font-display text-2xl font-bold">{v.title}</h3>
              <p className="mt-2 text-fg/70">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
