import { Lines } from '@/components/motion/Lines'
import { JsonLd, faqLd } from '@/lib/seo'
import type { Faq as FaqItem } from '@/lib/locations'

// Native <details> keeps answers in the HTML, so Google reads them even when closed.
export function Faq({ faqs, title = 'QUESTIONS\nWE GET ASKED' }: { faqs: FaqItem[]; title?: string }) {
  if (!faqs.length) return null
  return (
    <section className="sec sec--cream faq">
      <div className="sec-head"><Lines as="h2" text={title} className="mega mega--ink" /></div>
      <div className="faq__list">
        {faqs.map((f) => (
          <details key={f.q} className="faq__item" data-reveal>
            <summary><h3>{f.q}</h3></summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqLd(faqs)} />
    </section>
  )
}
