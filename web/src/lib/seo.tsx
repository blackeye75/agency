// Structured data (schema.org JSON-LD) and the business facts it needs.
// Contact details, socials and services come from the CMS; the rest lives here.

import { SITE_URL } from '@/lib/supabase/env'
import { plain } from '@/lib/cms/text'
import type { Post, Project, Service, Settings } from '@/lib/cms/types'
import { LOCATIONS } from '@/lib/locations'

export const BUSINESS = {
  legalName: 'NexusBee',
  foundingDate: '2019',
  locality: 'Noida',
  region: 'Uttar Pradesh',
  country: 'IN',
}

export const ORG_ID = `${SITE_URL}/#organization`
export const abs = (path: string) => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path}`)

// The seed socials point at bare network homepages; those are placeholders, not profiles.
const realProfiles = (s: Settings) => s.socials.map((l) => l.href).filter((h) => /^https?:\/\/[^/]+\/.+/.test(h))

export function JsonLd({ data }: { data: object }) {
  // Escape "<" so CMS text can never close the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

export function organizationLd(s: Settings, services: Service[]) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: BUSINESS.legalName,
    url: SITE_URL,
    logo: abs('/apple-icon'),
    image: s.seo.ogImage || abs('/og'),
    description: s.seo.description,
    slogan: s.brand.tagline,
    foundingDate: BUSINESS.foundingDate,
    email: s.contact.email,
    telephone: s.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.contact.address,
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    areaServed: [{ '@type': 'Country', name: 'India' }, ...LOCATIONS.map((l) => ({ '@type': 'City', name: l.name }))],
    sameAs: realProfiles(s),
    knowsAbout: ['Website development', 'Web application development', 'E-commerce development', 'Mobile app development', 'SEO', 'Digital marketing', 'AI automation', 'AI agents', 'Business process automation'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital services',
      itemListElement: services.map((x) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: x.title, url: abs(`/services/${x.slug}`) } })),
    },
  }
}

export function websiteLd(s: Settings) {
  return { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: s.brand.name, publisher: { '@id': ORG_ID }, inLanguage: 'en-IN' }
}

export function breadcrumbLd(items: { label: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, ...(c.href && { item: abs(c.href) }) })),
  }
}

export function serviceLd(s: Service, areaServed: string[] = ['India']) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    serviceType: s.title,
    description: s.seo_description || s.summary,
    url: abs(`/services/${s.slug}`),
    image: s.cover_url ? abs(s.cover_url) : undefined,
    provider: { '@id': ORG_ID },
    areaServed: areaServed.map((name) => ({ '@type': name === 'India' ? 'Country' : 'City', name })),
  }
}

// A post edited before its scheduled date was still last changed when it went live.
export const postModified = (p: Post) =>
  p.updated_at && new Date(p.updated_at) > new Date(p.published_at) ? p.updated_at : p.published_at

export function postLd(p: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.seo_description || p.excerpt,
    image: abs(p.cover_url || '/og'),
    datePublished: p.published_at,
    dateModified: postModified(p),
    author: p.author && p.author !== BUSINESS.legalName ? { '@type': 'Person', name: p.author } : { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: abs(`/blog/${p.slug}`),
    keywords: p.tags.map((t) => t.text.toLowerCase()).join(', '),
  }
}

export function projectLd(p: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: plain(p.name),
    description: p.seo_description || p.summary,
    url: abs(`/projects/${p.slug}`),
    image: p.cover_url ? abs(p.cover_url) : undefined,
    dateCreated: p.year ? String(p.year) : undefined,
    creator: { '@id': ORG_ID },
    ...(p.client && { sourceOrganization: { '@type': 'Organization', name: p.client } }),
    keywords: p.tags.map((t) => t.text).join(', '),
  }
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}
