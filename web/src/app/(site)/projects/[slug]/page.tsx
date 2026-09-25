import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjects, getSettings } from '@/lib/cms/queries'
import { loadCtx } from '@/lib/cms/page'
import { Lines } from '@/components/motion/Lines'
import { PageMotion } from '@/components/motion/PageMotion'
import { TLink } from '@/components/site/TLink'
import { Markdown } from '@/components/pages/Markdown'
import { Crumbs, DetailFallback, NextLink } from '@/components/pages/Detail'
import { CtaBand } from '@/components/sections/CtaBand'

export async function generateStaticParams() {
  return (await getProjects()).filter((p) => p.published).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const [projects, settings] = await Promise.all([getProjects(), getSettings()])
  const p = projects.find((x) => x.slug === slug && x.published)
  if (!p) return {}
  const title = p.seo_title || `${p.name} · ${settings.brand.name}`
  const description = p.seo_description || p.summary
  return { title, description, alternates: { canonical: `/projects/${slug}` }, openGraph: { title, description, images: p.cover_url ? [p.cover_url] : undefined } }
}

async function ProjectDetail({ params }: Pick<PageProps<'/projects/[slug]'>, 'params'>) {
  const { slug } = await params
  const ctx = await loadCtx()
  const i = ctx.projects.findIndex((p) => p.slug === slug)
  const p = ctx.projects[i]
  if (!p) notFound()
  const next = ctx.projects[(i + 1) % ctx.projects.length]
  const service = ctx.services.find((s) => s.slug === p.service_slug)

  return (
    <>
      <section className={`dhero tone-${p.color}`}>
        <Crumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }, { label: p.name }]} />
        <p className="dhero__num" data-reveal>{[p.category, ...p.tags.slice(0, 1).map((t) => t.text)].filter(Boolean).join(' · ')}</p>
        <Lines as="h1" text={p.name} className="dhero__title" start="top 95%" />
        {p.summary && <p className="dhero__sum" data-reveal="0.2">{p.summary}</p>}
        <dl className="dhero__meta" data-reveal="0.3">
          {p.client && <div><dt>Client</dt><dd>{p.client}</dd></div>}
          {p.year && <div><dt>Year</dt><dd>{p.year}</dd></div>}
          {service && <div><dt>Service</dt><dd><TLink href={`/services/${service.slug}`}>{service.title}</TLink></dd></div>}
          {p.url && <div><dt>Website</dt><dd><TLink href={p.url}>Visit ↗</TLink></dd></div>}
        </dl>
        {p.cover_url && <div className="dhero__cover" data-reveal><img src={p.cover_url} alt={`${p.name} cover`} /></div>}
      </section>

      {p.results.length > 0 && (
        <section className="sec sec--surface">
          <div className="results">
            {p.results.map((r, k) => <div className="result" key={k} data-reveal={String(k * 0.08)}><b>{r.value}</b><span>{r.label}</span></div>)}
          </div>
        </section>
      )}

      <section className="sec sec--cream">
        <div className="dbody">
          <div data-reveal><Markdown>{p.body}</Markdown></div>
          <aside className="dside" data-reveal="0.1">
            {p.tags.length > 0 && <div><h2>Scope</h2><ul className="chips">{p.tags.map((t) => <li key={t.text}><span>{t.text}</span></li>)}</ul></div>}
            {p.rating != null && <div><h2>Client rating</h2><p style={{ font: '400 64px/1 var(--display)', margin: 0, color: 'var(--orange)' }}>{Number(p.rating).toFixed(1)}<small style={{ fontSize: 24 }}>/5</small></p></div>}
          </aside>
        </div>
        {p.gallery.length > 0 && (
          <div className="gallery" style={{ marginTop: '8vh' }}>
            {p.gallery.map((g, k) => <figure key={k} data-reveal={String((k % 2) * 0.1)}><img src={g.src} alt={g.alt} /></figure>)}
          </div>
        )}
      </section>

      {p.quote && (
        <section className="sec sec--lilac bigquote">
          <blockquote style={{ margin: 0 }}>
            <Lines as="p" text={`“${p.quote}”`} />
            <footer data-reveal>{p.rating != null && <span className="case__rating">{Number(p.rating).toFixed(1)}</span>}{p.quote_author || p.client}</footer>
          </blockquote>
        </section>
      )}

      {next && next.slug !== p.slug && <NextLink href={`/projects/${next.slug}`} label="Next project" title={next.name} tone={next.color} />}
      <CtaBand data={{ title: ctx.settings.detailCta.title, text: '', button: ctx.settings.detailCta.button }} />
      <PageMotion version={p.id} />
    </>
  )
}

export default function ProjectPage({ params }: PageProps<'/projects/[slug]'>) {
  return <Suspense fallback={<DetailFallback />}><ProjectDetail params={params} /></Suspense>
}
