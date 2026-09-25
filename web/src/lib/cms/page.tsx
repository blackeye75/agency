import 'server-only'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SectionList, type Ctx } from '@/components/sections/SectionList'
import { getPage, getPosts, getProjects, getServices, getSettings } from './queries'

export async function loadCtx(): Promise<Ctx> {
  const [settings, services, projects, posts] = await Promise.all([getSettings(), getServices(), getProjects(), getPosts()])
  return {
    settings,
    services: services.filter((s) => s.published),
    projects: projects.filter((p) => p.published),
    posts: posts.filter((p) => p.published),
  }
}

export async function pageMetadata(slug: string): Promise<Metadata> {
  const [content, settings] = await Promise.all([getPage(slug), getSettings()])
  if (!content) return {}
  const { page } = content
  const title = page.seo_title || (slug === 'home' ? settings.seo.title : `${page.title} · ${settings.brand.name}`)
  const description = page.seo_description || settings.seo.description
  const image = page.og_image || settings.seo.ogImage
  return {
    title, description,
    alternates: { canonical: slug === 'home' ? '/' : `/${slug}` },
    openGraph: { title, description, images: image ? [image] : undefined },
  }
}

// Renders a CMS page: its visible sections, in order.
export async function CmsPage({ slug }: { slug: string }) {
  const [content, ctx] = await Promise.all([getPage(slug), loadCtx()])
  if (!content) notFound()
  return <SectionList sections={content.sections} ctx={ctx} />
}
