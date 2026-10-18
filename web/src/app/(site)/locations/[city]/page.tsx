import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { loadCtx } from '@/lib/cms/page'
import { LOCATIONS, getLocation } from '@/lib/locations'
import { JsonLd, ORG_ID, abs } from '@/lib/seo'
import { LocationBody, LocationHero } from '@/components/pages/Location'
import { LocationLinks } from '@/components/pages/LocationLinks'
import { DetailFallback } from '@/components/pages/Detail'
import { ProjectCard } from '@/components/pages/ProjectCard'
import { Faq } from '@/components/sections/Faq'
import { ServicesList } from '@/components/sections/ServicesList'
import { CtaBand } from '@/components/sections/CtaBand'
import { Lines } from '@/components/motion/Lines'
import { PageMotion } from '@/components/motion/PageMotion'
import { Cta } from '@/components/site/Cta'

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ city: l.slug }))
}

export async function generateMetadata({ params }: PageProps<'/locations/[city]'>): Promise<Metadata> {
  const l = getLocation((await params).city)
  if (!l) return {}
  return {
    title: l.seoTitle, description: l.seoDescription,
    alternates: { canonical: `/locations/${l.slug}` },
    openGraph: { title: l.seoTitle, description: l.seoDescription, url: `/locations/${l.slug}`, images: ['/og'] },
  }
}

async function CityDetail({ params }: Pick<PageProps<'/locations/[city]'>, 'params'>) {
  const l = getLocation((await params).city)
  if (!l) notFound()
  const ctx = await loadCtx()
  const projects = ctx.projects.filter((p) => p.featured).slice(0, 4)
  return (
    <>
      <LocationHero crumbs={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/locations' }, { label: l.name }]} eyebrow={l.eyebrow} title={l.title} intro={l.intro} />
      <LocationBody body={l.body} aside={<>
        <div><h2>Areas we serve</h2><ul className="chips">{l.areas.map((a) => <li key={a}><span>{a}</span></li>)}</ul></div>
        <div><h2>Industries</h2><ul className="chips">{l.industries.map((a) => <li key={a}><span>{a}</span></li>)}</ul></div>
        <Cta href="/quote" label="get a quote" variant="ink" />
      </>} />
      <ServicesList data={{ label: `SERVICES IN ${l.name.toUpperCase()}`, title: 'WHAT WE\nDO' }} services={ctx.services} />
      {projects.length > 0 && (
        <section className="sec sec--surface">
          <div className="sec-head"><Lines text={'RECENT\nWORK'} className="mega" /></div>
          <div className="pgrid">{projects.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
        </section>
      )}
      <Faq faqs={l.faqs} />
      <LocationLinks current={l.slug} />
      <CtaBand data={{ title: ctx.settings.detailCta.title, text: '', button: ctx.settings.detailCta.button }} />
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'Service',
        name: `Website development, digital marketing and AI automation in ${l.name}`,
        url: abs(`/locations/${l.slug}`), provider: { '@id': ORG_ID },
        areaServed: [{ '@type': 'City', name: l.name }, ...l.areas.map((name) => ({ '@type': 'Place', name }))],
        hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Services', itemListElement: ctx.services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, url: abs(`/services/${s.slug}`) } })) },
      }} />
      <PageMotion version={l.slug} />
    </>
  )
}

export default function CityPage({ params }: PageProps<'/locations/[city]'>) {
  return <Suspense fallback={<DetailFallback />}><CityDetail params={params} /></Suspense>
}
