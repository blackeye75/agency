import { Lines } from '@/components/motion/Lines'
import { Cta } from '@/components/site/Cta'
import { ScBadge } from '@/components/site/ScBadge'
import type { CtaBandData } from '@/lib/cms/types'

export function CtaBand({ data }: { data: CtaBandData }) {
  return (
    <section className="ctaband">
      {data.button?.href && <ScBadge href={data.button.href} label={"LET'S\nTALK"} tone="lime" />}
      <Lines text={data.title} className="mega ctaband__title" />
      {data.text && <p className="ctaband__text" data-reveal>{data.text}</p>}
      {data.button?.href && <div data-reveal="0.1"><Cta href={data.button.href} label={data.button.label} variant="ink" /></div>}
    </section>
  )
}
