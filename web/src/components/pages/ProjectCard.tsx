import { TLink } from '@/components/site/TLink'
import { Arrow } from '@/components/site/Sprites'
import type { Project } from '@/lib/cms/types'

export function ProjectCard({ p }: { p: Project }) {
  return (
    <TLink href={`/projects/${p.slug}`} className={`pcard tone-${p.color}`}>
      <div className="pcard__cover">
        {p.cover_url ? <img src={p.cover_url} alt="" /> : <div className="pcard__screen">{p.name}</div>}
        {p.tags[0] && <span className="pcard__tag">{p.tags[0].text}</span>}
      </div>
      <div className="pcard__meta">
        <div>
          <h3 className="pcard__name">{p.name}</h3>
          <p className="pcard__info">{[p.category, p.year].filter(Boolean).join(' · ')}</p>
        </div>
        <span className="arrow-btn"><Arrow /></span>
      </div>
    </TLink>
  )
}
