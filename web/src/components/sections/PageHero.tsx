import { Lines } from '@/components/motion/Lines'
import { Wave } from '@/components/motion/Wave'
import { Use } from '@/components/site/Sprites'
import type { PageHeroData } from '@/lib/cms/types'

export function PageHero({ data, next, index }: { data: PageHeroData; next?: string; index?: string }) {
  return (
    <section className="phero">
      <svg className="phero__ast" aria-hidden="true" data-spin><use href="#asterisk" /></svg>
      <p className="phero__eyebrow" data-reveal><Use id="flower8" />{data.eyebrow}{index && <b>({index})</b>}</p>
      <Lines as="h1" text={data.title} className="phero__title" start="top 95%" />
      {data.text && <div className="phero__foot"><p className="phero__text" data-reveal="0.2">{data.text}</p></div>}
      {next && <Wave color={next} />}
    </section>
  )
}
