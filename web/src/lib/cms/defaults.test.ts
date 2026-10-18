import { test } from 'node:test'
import assert from 'node:assert/strict'
import { withCurrentServices, withDefaultPosts, withPageSeo, withPostDefaults, withProjectService, withSectionDefaults, withServiceDefaults, withSettingsDefaults } from './defaults.ts'
import { LEGACY_FOOTER_LEGAL, LEGACY_POST_BODIES, LEGACY_SECTIONS, LEGACY_SERVICE_BODIES, LEGACY_SERVICE_SEO, LEGACY_SERVICES, LEGACY_SITE_SEO } from './legacy.ts'
import { seedPages, seedPosts, seedProjects, seedSections, seedServices, seedSettings } from './seed.ts'
import { SERVICE_COPY } from './service-copy.ts'

test('legacy site title and description are upgraded, edited ones kept', () => {
  const old = withSettingsDefaults({ ...seedSettings, seo: { title: LEGACY_SITE_SEO.titles[0], description: LEGACY_SITE_SEO.descriptions[0] } })
  assert.equal(old.seo.title, seedSettings.seo.title)
  assert.equal(old.seo.description, seedSettings.seo.description)
  const mine = withSettingsDefaults({ ...seedSettings, seo: { title: 'My title', description: 'Mine' } })
  assert.deepEqual(mine.seo, { title: 'My title', description: 'Mine', gtmId: 'GTM-PBF89LDZ', googleVerification: seedSettings.seo.googleVerification })
  assert.equal(withSettingsDefaults({ ...seedSettings, seo: { ...mine.seo, gtmId: 'GTM-OTHER1' } }).seo.gtmId, 'GTM-OTHER1')
})

test('legacy page SEO is upgraded, edited and unknown pages kept', () => {
  const page = { slug: 'services', title: 'Services', seo_title: 'Services · NexusBee', seo_description: 'Custom', og_image: null }
  const r = withPageSeo(page)
  assert.equal(r.seo_title, seedPages.find((p) => p.slug === 'services')!.seo_title)
  assert.equal(r.seo_description, 'Custom')
  const home = { slug: 'home', title: 'Home', seo_title: null, seo_description: null, og_image: null }
  assert.deepEqual(withPageSeo(home), home)
})

test('services: sample body becomes long copy, missing SEO filled, edits kept', () => {
  const base = seedServices.find((s) => s.slug === 'digital-marketing')!
  const sample = withServiceDefaults({ ...base, body: LEGACY_SERVICE_BODIES['digital-marketing'][0], seo_title: null, seo_description: null })
  assert.equal(sample.body, SERVICE_COPY['digital-marketing'].body)
  assert.equal(sample.seo_title, SERVICE_COPY['digital-marketing'].seo_title)
  const edited = withServiceDefaults({ ...base, body: 'Our own words', seo_title: 'Own title' })
  assert.equal(edited.body, 'Our own words')
  assert.equal(edited.seo_title, 'Own title')
  const unknown = withServiceDefaults({ ...base, slug: 'new-service', body: 'x', seo_title: null, seo_description: null })
  assert.equal(unknown.seo_title, null)
})

test('posts: sample body becomes the full guide, edited post kept', () => {
  const base = seedPosts.find((p) => p.slug === 'why-website-speed-wins-clients')!
  const sample = withPostDefaults({ ...base, body: LEGACY_POST_BODIES['why-website-speed-wins-clients'], seo_title: null })
  assert.equal(sample.body, base.body)
  assert.equal(sample.seo_title, base.seo_title)
  const edited = { ...base, body: 'Edited' }
  assert.deepEqual(withPostDefaults(edited), edited)
})

test('nine legacy services become the five current ones, in order', () => {
  const legacy = (slug: string) => ({ ...seedServices.find((s) => s.slug === slug)!, ...LEGACY_SERVICES[slug] })
  const merged = ['corporate-web-design', 'web-software-apps', 'e-commerce', 'mobile-apps', 'business-automation']
    .map((slug, i) => ({ ...seedServices[0], id: slug, slug, position: 10 + i }))
  const rows = [...merged, legacy('seo-performance'), legacy('management-maintenance'), legacy('digital-marketing'), legacy('ai-agents-automation')]
  const out = withCurrentServices(rows)
  assert.deepEqual(out.map((s) => s.slug), ['website-app-development', 'digital-marketing', 'ai-agents-automation', 'seo-performance', 'management-maintenance'])
  assert.equal(out[1].title, 'Digital marketing & social media management')
})

test('edited services keep their fields; old October SEO titles upgrade', () => {
  const dm = { ...seedServices.find((s) => s.slug === 'digital-marketing')!, ...LEGACY_SERVICES['digital-marketing'], title: 'Growth marketing', position: 7 }
  const [first, ...rest] = withCurrentServices([dm])
  assert.equal(first.slug, 'website-app-development')
  assert.equal(rest[0].title, 'Growth marketing')
  assert.equal(rest[0].position, 7)
  const old = withServiceDefaults({ ...dm, seo_title: LEGACY_SERVICE_SEO['digital-marketing'].seo_title })
  assert.match(old.seo_title!, /Social Media Management/)
})

test('projects on a merged service point at its replacement', () => {
  const p = withProjectService({ ...seedProjects[0], service_slug: 'e-commerce' })
  assert.equal(p.service_slug, 'website-app-development')
})

test('default posts missing from the database are added, newest first, without duplicates', () => {
  const inDb = { ...seedPosts.find((p) => p.slug === 'shopify-or-custom-store')!, title: 'Edited title' }
  const out = withDefaultPosts([inDb])
  assert.equal(out.length, seedPosts.length)
  assert.equal(out.filter((p) => p.slug === inDb.slug).length, 1)
  assert.equal(out.find((p) => p.slug === inDb.slug)!.title, 'Edited title')
  assert.deepEqual(out.map((p) => p.published_at), [...out.map((p) => p.published_at)].sort().reverse())
})

test('home FAQ is added before the enquiry form until the database has it; legacy fields upgrade', () => {
  const legacyHome = seedSections.filter((s) => s.page_slug === 'home' && s.key !== 'faq').map((s, i) => ({ ...s, position: i }))
  legacyHome.find((s) => s.key === 'hero')!.data = { ...legacyHome.find((s) => s.key === 'hero')!.data, words: LEGACY_SECTIONS['home/hero'].words[0] } as never
  const out = withSectionDefaults('home', legacyHome)
  const keys = out.map((s) => s.key)
  assert.equal(keys.indexOf('faq'), keys.indexOf('enquiry') - 1)
  assert.deepEqual((out[0].data as { words: unknown }).words, (seedSections.find((s) => s.key === 'hero' && s.page_slug === 'home')!.data as { words: unknown }).words)
  const hiddenFaq = [...legacyHome, { ...seedSections.find((s) => s.key === 'faq')!, visible: false }]
  assert.equal(withSectionDefaults('home', hiddenFaq).some((s) => s.key === 'faq'), false)
})

test('legacy footer links and both earlier flip-card versions upgrade', () => {
  const legacyFooter = withSettingsDefaults({ ...seedSettings, footer: { ...seedSettings.footer, legal: LEGACY_FOOTER_LEGAL } })
  assert.deepEqual(legacyFooter.footer.legal, seedSettings.footer.legal)
  const mine = [{ label: 'Terms', href: '/terms' }]
  assert.deepEqual(withSettingsDefaults({ ...seedSettings, footer: { ...seedSettings.footer, legal: mine } }).footer.legal, mine)
  const seedCards = seedSections.find((s) => s.page_slug === 'home' && s.key === 'service-cards')!
  for (const cards of LEGACY_SECTIONS['home/service-cards'].cards) {
    const out = withSectionDefaults('home', [{ ...seedCards, data: { cards } } as never])
    assert.deepEqual(out[0].data, seedCards.data)
  }
})
