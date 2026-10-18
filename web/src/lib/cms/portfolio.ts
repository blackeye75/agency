// Real client work, listed ahead of the sample projects. Served from here until the database has a row for
// each slug, so new work goes live without SQL. No made-up results or quotes: add those in the CMS when known.
import type { Project } from './types'

const project = (p: Pick<Project, 'slug' | 'name' | 'client' | 'category' | 'service_slug' | 'url' | 'color' | 'summary' | 'body' | 'tags' | 'position'>): Project => ({
  id: `portfolio-${p.slug}`, year: null, cover_url: null, gallery: [], quote: '', quote_author: '', rating: null, results: [],
  featured: true, published: true, seo_title: null, seo_description: null, ...p,
})

export const PORTFOLIO: Project[] = [
  project({
    slug: 'hockerty', name: 'HOCKERTY', client: 'Hockerty', category: 'Web Development', service_slug: 'website-app-development',
    url: 'https://www.hockerty.com/en-us/', color: 'blue', position: -30,
    tags: [{ text: 'E-COMMERCE WEBSITE' }, { text: 'MADE-TO-MEASURE' }],
    summary: 'Website development for Hockerty, a made-to-measure menswear brand where customers design suits, shirts and more online.',
    body: 'Hockerty sells made-to-measure menswear to customers around the world. Its online store lets shoppers customise each garment, choose fabrics and details, and order to their own measurements.\n\nOur work focused on a fast, reliable storefront for a catalogue built around personalisation, across product, customisation and checkout journeys.',
  }),
  project({
    slug: 'beyoung', name: 'BEYOUNG', client: 'Beyoung', category: 'Web Development', service_slug: 'website-app-development',
    url: 'https://www.beyoung.in/', color: 'orange', position: -20,
    tags: [{ text: 'D2C E-COMMERCE' }, { text: 'FASHION' }],
    summary: 'Website development for Beyoung, an Indian D2C fashion brand selling casual wear for men and women online.',
    body: 'Beyoung is a direct-to-consumer fashion brand from India with a large, fast-moving catalogue of casual wear for men and women.\n\nOur work focused on a fast, mobile-first shopping experience for Indian customers: browsing large collections, product pages and a smooth path to checkout.',
  }),
  project({
    slug: 'casio-india', name: 'CASIO INDIA', client: 'Casio India', category: 'Web Development', service_slug: 'website-app-development',
    url: 'https://www.casio.com/in/', color: 'lime', position: -10,
    tags: [{ text: 'BRAND WEBSITE' }, { text: 'E-COMMERCE' }],
    summary: 'Website development for Casio India, the Indian site for Casio watches, calculators and musical instruments.',
    body: "Casio's Indian website showcases and sells the brand's watches, including G-SHOCK and EDIFICE, along with calculators and musical instruments.\n\nOur work focused on a large product catalogue for Indian shoppers, with clear navigation across product families and a fast, consistent experience on mobile.",
  }),
  project({
    slug: 'railfeast', name: 'RAILFEAST', client: 'RailFeast', category: 'Mobile Apps', service_slug: 'website-app-development',
    url: 'https://play.google.com/store/apps/details?id=com.railfeast', color: 'pink', position: -9,
    tags: [{ text: 'ANDROID APP' }, { text: 'FOOD DELIVERY' }],
    summary: 'Android app for RailFeast, a food delivery service that lets passengers order meals to their train seat.',
    body: 'RailFeast lets railway passengers order food from local restaurants and have it delivered to their seat during the journey.\n\nOur work covered the customer app experience: browsing menus, placing orders for a specific train and station, and following the order through to delivery.',
  }),
  project({
    slug: 'apna-mechanic', name: 'APNA MECHANIC', client: 'Apna Mechanic', category: 'Mobile Apps', service_slug: 'website-app-development',
    url: 'https://play.google.com/store/apps/details?id=com.apna.mechanic', color: 'sky', position: -8,
    tags: [{ text: 'ANDROID APP' }, { text: 'AUTOMOBILE SERVICES' }],
    summary: 'Android app for Apna Mechanic, an on-demand platform for booking vehicle repair and servicing.',
    body: 'Apna Mechanic connects vehicle owners with mechanics for repairs and servicing.\n\nOur work covered the booking experience: choosing a service, sharing location and vehicle details, and tracking the request until the job is done.',
  }),
  project({
    slug: 'vc-doctor', name: 'VC DOCTOR', client: 'Innocirc', category: 'Mobile Apps', service_slug: 'website-app-development',
    url: 'https://play.google.com/store/apps/details?id=com.innocirc.vcdoctor', color: 'violet', position: -7,
    tags: [{ text: 'ANDROID APPS' }, { text: 'HEALTHCARE' }],
    summary: 'Connected doctor and patient apps for video consultations, built as a pair for a healthcare platform.',
    body: 'VC Doctor and VC Patient are two connected Android apps: one for doctors and one for patients.\n\nOur work covered both sides of the consultation: appointments, video calls and the information each side needs before, during and after a consultation.\n\n- [VC Doctor on Google Play](https://play.google.com/store/apps/details?id=com.innocirc.vcdoctor)\n- [VC Patient on Google Play](https://play.google.com/store/apps/details?id=com.innocirc.vcpatient)',
  }),
  project({
    slug: 'cybermart', name: 'CYBERMART', client: 'CyberMart', category: 'Mobile Apps', service_slug: 'website-app-development',
    url: 'https://play.google.com/store/apps/details?id=com.cybermart.ind', color: 'yellow', position: -6,
    tags: [{ text: 'ANDROID APP' }, { text: 'E-COMMERCE' }],
    summary: 'Android shopping app for CyberMart, with product browsing, cart and checkout on mobile.',
    body: 'CyberMart is an online shopping app for customers in India.\n\nOur work covered the core shopping journey on mobile: browsing categories, product pages, cart and checkout, and order updates.',
  }),
]
