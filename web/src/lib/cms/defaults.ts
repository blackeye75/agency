// Sample content the site shipped with is upgraded when it is shown, so a live database that was never
// edited gets today's keyword-targeted copy without anyone running SQL. Edited content is always left alone.
import { LEGACY_PAGE_SEO, LEGACY_POST_BODIES, LEGACY_SERVICE_BODIES, LEGACY_SITE_SEO } from './legacy.ts'
import { seedPages, seedSettings } from './seed.ts'
import { SEO_POSTS } from './seo-posts.ts'
import { SERVICE_COPY } from './service-copy.ts'
import type { Page, Post, Service, Settings } from './types'

export function withSettingsDefaults(settings: Settings): Settings {
  const seo = { ...settings.seo }
  if (LEGACY_SITE_SEO.titles.includes(seo.title)) seo.title = seedSettings.seo.title
  if (LEGACY_SITE_SEO.descriptions.includes(seo.description)) seo.description = seedSettings.seo.description
  return { ...settings, seo }
}

export function withPageSeo(page: Page): Page {
  const old = LEGACY_PAGE_SEO[page.slug], seed = seedPages.find((p) => p.slug === page.slug)
  if (!old || !seed) return page
  return {
    ...page,
    seo_title: page.seo_title === old.seo_title ? seed.seo_title : page.seo_title,
    seo_description: page.seo_description === old.seo_description ? seed.seo_description : page.seo_description,
  }
}

export const withServiceDefaults = (s: Service): Service => ({
  ...s,
  body: s.body === LEGACY_SERVICE_BODIES[s.slug] ? SERVICE_COPY[s.slug]?.body ?? s.body : s.body,
  seo_title: s.seo_title || SERVICE_COPY[s.slug]?.seo_title || null,
  seo_description: s.seo_description || SERVICE_COPY[s.slug]?.seo_description || null,
})

// An unedited sample post is shown as its full guide, with the guide's SEO fields where none were set.
export function withPostDefaults(p: Post): Post {
  const full = p.body === LEGACY_POST_BODIES[p.slug] ? SEO_POSTS.find((x) => x.slug === p.slug) : undefined
  if (!full) return p
  return { ...p, body: full.body, excerpt: full.excerpt, read_minutes: full.read_minutes, seo_title: p.seo_title || full.seo_title, seo_description: p.seo_description || full.seo_description }
}
