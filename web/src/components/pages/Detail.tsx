import { Lines } from '@/components/motion/Lines'
import { TLink } from '@/components/site/TLink'
import { Arrow } from '@/components/site/Sprites'
import type { Tone } from '@/lib/cms/types'

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb" data-reveal>
      {items.map((c, i) => (
        <span key={i} style={{ display: 'contents' }}>
          {i > 0 && <span aria-hidden="true">/</span>}
          {c.href ? <TLink href={c.href}>{c.label}</TLink> : <span aria-current="page">{c.label}</span>}
        </span>
      ))}
    </nav>
  )
}

export function NextLink({ href, label, title, tone }: { href: string; label: string; title: string; tone: Tone }) {
  return (
    <TLink href={href} className={`next-link tone-${tone}`}>
      <div><span>{label}</span><Lines as="strong" text={title} start="top 95%" /></div>
      <span className="arrow-btn"><Arrow /></span>
    </TLink>
  )
}

export function DetailFallback() {
  return <section className="phero" aria-busy="true"><p className="phero__eyebrow">Loading…</p></section>
}
