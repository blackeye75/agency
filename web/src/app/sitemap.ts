import type { MetadataRoute } from 'next'
import { getPosts, getProjects, getServices } from '@/lib/cms/queries'
import { LOCATIONS } from '@/lib/locations'
import { abs, postModified } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects, posts] = await Promise.all([getServices(), getProjects(), getPosts()])
  const img = (url: string | null) => (url ? [abs(url)] : undefined)
  return [
    { url: abs('/'), changeFrequency: 'weekly', priority: 1 },
    ...['/services', '/locations', '/projects', '/blog', '/contact', '/quote', '/privacy-policy'].map((p) => ({ url: abs(p), changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...services.filter((s) => s.published).map((s) => ({ url: abs(`/services/${s.slug}`), lastModified: s.updated_at, changeFrequency: 'monthly' as const, priority: 0.9, images: img(s.cover_url) })),
    ...LOCATIONS.map((l) => ({ url: abs(`/locations/${l.slug}`), changeFrequency: 'monthly' as const, priority: 0.9 })),
    ...projects.filter((p) => p.published).map((p) => ({ url: abs(`/projects/${p.slug}`), lastModified: p.updated_at, changeFrequency: 'yearly' as const, priority: 0.6, images: [p.cover_url, ...p.gallery.map((g) => g.src)].filter(Boolean).map((u) => abs(u!)) })),
    ...posts.filter((p) => p.published).map((p) => ({ url: abs(`/blog/${p.slug}`), lastModified: postModified(p), changeFrequency: 'yearly' as const, priority: 0.7, images: img(p.cover_url) })),
  ]
}
