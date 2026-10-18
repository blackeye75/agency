import type { ReactNode } from 'react'
import { Lines } from '@/components/motion/Lines'
import { Use } from '@/components/site/Sprites'
import { Markdown } from './Markdown'
import { Crumbs } from './Detail'

export function LocationHero({ crumbs, eyebrow, title, intro }: { crumbs: { label: string; href?: string }[]; eyebrow: string; title: string; intro: string }) {
  return (
    <section className="phero">
      <Crumbs items={crumbs} />
      <svg className="phero__ast" aria-hidden="true" data-spin><use href="#asterisk" /></svg>
      <p className="phero__eyebrow" data-reveal><Use id="flower8" />{eyebrow}</p>
      <Lines as="h1" text={title} className="phero__title" start="top 95%" />
      <div className="phero__foot"><p className="phero__text" data-reveal="0.2">{intro}</p></div>
    </section>
  )
}

export function LocationBody({ body, aside }: { body: string; aside: ReactNode }) {
  return (
    <section className="sec sec--cream">
      <div className="dbody">
        <div data-reveal><Markdown>{body}</Markdown></div>
        <aside className="dside" data-reveal="0.1">{aside}</aside>
      </div>
    </section>
  )
}
