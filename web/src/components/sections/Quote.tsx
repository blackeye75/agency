import { Lines } from '@/components/motion/Lines'
import { QuoteForm } from '@/components/forms/QuoteForm'
import type { QuoteData, Service, Settings } from '@/lib/cms/types'
import { TLink } from '@/components/site/TLink'

export function Quote({ data, services, settings }: { data: QuoteData; services: Service[]; settings: Settings }) {
  return (
    <section className="sec sec--cream">
      <div className="quote-wrap">
        <div>
          <Lines text={data.title} className="mega contact__title" />
          <p className="contact__text" data-reveal>{data.text}</p>
          <p className="contact__text" data-reveal="0.1">Rather talk? <TLink href={`mailto:${settings.contact.email}`} style={{ textDecoration: 'underline' }}>{settings.contact.email}</TLink></p>
        </div>
        <QuoteForm data={data} services={services.map((s) => ({ slug: s.slug, title: s.title }))} />
      </div>
    </section>
  )
}
