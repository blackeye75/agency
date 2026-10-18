import type { Metadata } from 'next'
import { loadCtx } from '@/lib/cms/page'
import { INDIA, LOCATIONS } from '@/lib/locations'
import { JsonLd, ORG_ID, abs } from '@/lib/seo'
import { LocationBody, LocationHero } from '@/components/pages/Location'
import { Faq } from '@/components/sections/Faq'
import { ServicesList } from '@/components/sections/ServicesList'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageMotion } from '@/components/motion/PageMotion'
import { TLink } from '@/components/site/TLink'

export const metadata: Metadata = {
  title: INDIA.seoTitle,
  description: INDIA.seoDescription,
  alternates: { canonical: '/locations' },
  openGraph: { title: INDIA.seoTitle, description: INDIA.seoDescription, url: '/locations', images: ['/og'] },
}

export default async function LocationsPage() {
  const ctx = await loadCtx()
  return (
    <>
      <LocationHero crumbs={[{ label: 'Home', href: '/' }, { label: 'Locations' }]} eyebrow={INDIA.eyebrow} title={INDIA.title} intro={INDIA.intro} />
      <LocationBody body={INDIA.body} aside={
        <div>
          <h2>Our cities</h2>
          <ul className="chips">{LOCATIONS.map((l) => <li key={l.slug}><TLink href={`/locations/${l.slug}`}>{l.name}</TLink></li>)}</ul>
        </div>
      } />
      <ServicesList data={{ label: 'SERVICES ACROSS INDIA', title: 'WHAT WE\nDO' }} services={ctx.services} />
      <Faq faqs={INDIA.faqs} />
      <CtaBand data={{ title: ctx.settings.detailCta.title, text: '', button: ctx.settings.detailCta.button }} />
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'Service',
        name: 'Website development, digital marketing and AI automation in India',
        url: abs('/locations'), provider: { '@id': ORG_ID }, areaServed: { '@type': 'Country', name: 'India' },
        hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Services', itemListElement: ctx.services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, url: abs(`/services/${s.slug}`) } })) },
      }} />
      <PageMotion version="locations" />
    </>
  )
}
