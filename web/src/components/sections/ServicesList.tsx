import { Lines } from '@/components/motion/Lines'
import { TLink } from '@/components/site/TLink'
import { Arrow } from '@/components/site/Sprites'
import { pad } from '@/lib/cms/text'
import type { Service, ServicesListData } from '@/lib/cms/types'

export function ServicesList({ data, services }: { data: ServicesListData; services: Service[] }) {
  return (
    <section className="sec sec--cream" id="services">
      <div className="sec-head">
        <div>
          <p className="label label--orange" style={{ marginBottom: '3vh' }}>{data.label}</p>
          <Lines text={data.title} className="mega" />
        </div>
        <span className="sec-head__num">({pad(services.length)})</span>
      </div>
      <ol className="slist">
        {services.map((s, i) => (
          <li key={s.slug} className={`srow tone-${s.color}`} data-reveal>
            <TLink href={`/services/${s.slug}`}>
              <span className="srow__num">{pad(i + 1)}</span>
              <h3 className="srow__title">{s.title}</h3>
              <p className="srow__sum">{s.summary}</p>
              <span className="arrow-btn"><Arrow /></span>
            </TLink>
          </li>
        ))}
      </ol>
    </section>
  )
}
