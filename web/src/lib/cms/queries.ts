import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { publicClient } from '@/lib/supabase/public'
import { seedPages, seedPosts, seedProjects, seedSections, seedServices, seedSettings } from './seed'
import type { Page, Post, Project, Section, Service, Settings } from './types'

// Every public read is cached under the 'cms' tag. The admin API expires the
// tag after each write, and the site's realtime listener refreshes open tabs.
export const CMS_TAG = 'cms'

function mark() {
  cacheTag(CMS_TAG)
  cacheLife('minutes')
}

export async function getSettings(): Promise<Settings> {
  'use cache'
  mark()
  const db = publicClient()
  if (!db) return seedSettings
  const { data } = await db.from('settings').select('data').eq('id', 'site').maybeSingle()
  const saved = (data?.data ?? {}) as Partial<Settings>
  // Keys added to the site after the row was saved fall back to the defaults.
  return { ...seedSettings, ...saved }
}

export type PageContent = { page: Page; sections: Section[] }

export async function getPage(slug: string): Promise<PageContent | null> {
  'use cache'
  mark()
  const fallback = () => {
    const page = seedPages.find((p) => p.slug === slug)
    return page ? { page, sections: seedSections.filter((s) => s.page_slug === slug) } : null
  }
  const db = publicClient()
  if (!db) return fallback()
  const [page, sections] = await Promise.all([
    db.from('pages').select('slug, title, seo_title, seo_description, og_image').eq('slug', slug).maybeSingle(),
    db.from('sections').select('*').eq('page_slug', slug).eq('visible', true).order('position'),
  ])
  if (page.error || sections.error) return fallback()
  if (!page.data) return fallback()
  return { page: page.data, sections: sections.data as unknown as Section[] }
}

export async function getServices(): Promise<Service[]> {
  'use cache'
  mark()
  const db = publicClient()
  if (!db) return seedServices
  const { data, error } = await db.from('services').select('*').order('position')
  return error ? seedServices : (data as unknown as Service[])
}

export async function getService(slug: string) {
  return (await getServices()).find((s) => s.slug === slug) ?? null
}

export async function getProjects(): Promise<Project[]> {
  'use cache'
  mark()
  const db = publicClient()
  if (!db) return seedProjects
  const { data, error } = await db.from('projects').select('*').order('position')
  return error ? seedProjects : (data as unknown as Project[])
}

export async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug) ?? null
}

export async function getPosts(): Promise<Post[]> {
  'use cache'
  mark()
  const db = publicClient()
  // Scheduled posts stay hidden until their date (the database does the same).
  const live = (posts: Post[]) => posts.filter((p) => new Date(p.published_at).getTime() <= Date.now())
  if (!db) return live(seedPosts)
  const { data, error } = await db.from('posts').select('*').order('published_at', { ascending: false })
  return live(error ? seedPosts : (data as unknown as Post[]))
}

export async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug) ?? null
}
