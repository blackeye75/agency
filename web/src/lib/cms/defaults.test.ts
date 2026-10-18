import { test } from 'node:test'
import assert from 'node:assert/strict'
import { withPageSeo, withPostDefaults, withServiceDefaults, withSettingsDefaults } from './defaults.ts'
import { LEGACY_POST_BODIES, LEGACY_SERVICE_BODIES, LEGACY_SITE_SEO } from './legacy.ts'
import { seedPages, seedPosts, seedServices, seedSettings } from './seed.ts'
import { SERVICE_COPY } from './service-copy.ts'

test('legacy site title and description are upgraded, edited ones kept', () => {
  const old = withSettingsDefaults({ ...seedSettings, seo: { title: LEGACY_SITE_SEO.titles[0], description: LEGACY_SITE_SEO.descriptions[0] } })
  assert.equal(old.seo.title, seedSettings.seo.title)
  assert.equal(old.seo.description, seedSettings.seo.description)
  const mine = withSettingsDefaults({ ...seedSettings, seo: { title: 'My title', description: 'Mine' } })
  assert.deepEqual(mine.seo, { title: 'My title', description: 'Mine' })
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
  const sample = withServiceDefaults({ ...base, body: LEGACY_SERVICE_BODIES['digital-marketing'], seo_title: null, seo_description: null })
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
