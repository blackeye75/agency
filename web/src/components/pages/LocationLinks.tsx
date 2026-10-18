import { TLink } from '@/components/site/TLink'
import { LOCATIONS } from '@/lib/locations'

export function LocationLinks({ current }: { current?: string }) {
  return (
    <nav className="sec sec--surface loclinks" aria-label="Cities we serve">
      <p className="label label--orange">CITIES WE SERVE</p>
      <ul className="chips">
        <li><TLink href="/locations">All of India</TLink></li>
        {LOCATIONS.filter((l) => l.slug !== current).map((l) => <li key={l.slug}><TLink href={`/locations/${l.slug}`}>{l.name}</TLink></li>)}
      </ul>
    </nav>
  )
}
