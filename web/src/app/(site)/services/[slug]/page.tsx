import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPage, getServices, getSettings } from '@/lib/cms/queries'
import { loadCtx } from '@/lib/cms/page'
import { Lines } from '@/components/motion/Lines'
import { PageMotion } from '@/components/motion/PageMotion'
import { ScBadge } from '@/components/site/ScBadge'
import { Cta } from '@/components/site/Cta'
import { Markdown } from '@/components/pages/Markdown'
import { ProjectCard } from '@/components/pages/ProjectCard'
import { Crumbs, DetailFallback, NextLink } from '@/components/pages/Detail'
import { Process } from '@/components/sections/Process'
import { CtaBand } from '@/components/sections/CtaBand'
import { pad } from '@/lib/cms/text'
import type { ProcessData, Tone } from '@/lib/cms/types'

const FEATURE_TONES: Tone[] = ['lime', 'orange', 'blue', 'violet', 'pink', 'sky']

export async function generateStaticParams() {
  return (await getServices()).filter((s) => s.published).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps<'/services/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const [services, settings] = await Promise.all([getServices(), getSettings()])
  const s = services.find((x) => x.slug === slug && x.published)
  if (!s) return {}
  const title = s.seo_title || `${s.title} · ${settings.brand.name}`
  const description = s.seo_description || s.summary
  return { title, description, alternates: { canonical: `/services/${slug}` }, openGraph: { title, description, images: s.cover_url ? [s.cover_url] : undefined } }
}

async function ServiceDetail({ params }: Pick<PageProps<'/services/[slug]'>, 'params'>) {
  const { slug } = await params
  const [ctx, servicesPage] = await Promise.all([loadCtx(), getPage('services')])
  const i = ctx.services.findIndex((s) => s.slug === slug)
  const s = ctx.services[i]
  if (!s) notFound()
  const next = ctx.services[(i + 1) % ctx.services.length]
  const related = ctx.projects.filter((p) => p.service_slug === s.slug)
  const process = servicesPage?.sections.find((x) => x.type === 'process')?.data as ProcessData | undefined
  const quoteHref = `/quote?service=${s.slug}`

  return (
    <>
      <section className={`dhero tone-${s.color}`}>
        <Crumbs items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: s.title }]} />
        <p className="dhero__num" data-reveal>({pad(i + 1)}) SERVICE</p>
        <Lines as="h1" text={s.title} className="dhero__title" start="top 95%" />
        <p className="dhero__sum" data-reveal="0.2">{s.summary}</p>
        <ScBadge href={quoteHref} label={'GET A\nQUOTE'} tone={s.color === 'orange' ? 'lime' : 'orange'} large />
        {s.cover_url && <div className="dhero__cover" data-reveal><img src={s.cover_url} alt="" /></div>}
      </section>

      <section className="sec sec--cream">
        <div className="dbody">
          <div data-reveal><Markdown>{s.body}</Markdown></div>
          <aside className="dside" data-reveal="0.1">
            {s.deliverables.length > 0 && (
              <div>
                <h2>What you get</h2>
                <ul className="chips">{s.deliverables.map((d) => <li key={d.text}><span>{d.text}</span></li>)}</ul>
              </div>
            )}
            <Cta href={quoteHref} label="get a quote" variant="ink" />
          </aside>
        </div>
        {s.features.length > 0 && (
          <div className="features">
            {s.features.map((f, k) => (
              <article key={k} className={`feature tone-${FEATURE_TONES[k % FEATURE_TONES.length]}`} data-reveal={String((k % 2) * 0.1)}>
                <b>{pad(k + 1)}</b>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      {related.length > 0 && (
        <section className="sec sec--surface">
          <div className="sec-head"><Lines text={'RELATED\nPROJECTS'} className="mega" /></div>
          <div className="pgrid">{related.slice(0, 4).map((p) => <ProjectCard key={p.id} p={p} />)}</div>
        </section>
      )}

      {process && <Process data={process} />}
      {next && next.slug !== s.slug && <NextLink href={`/services/${next.slug}`} label="Next service" title={next.title} tone={next.color} />}
      <CtaBand data={{ title: ctx.settings.detailCta.title, text: '', button: { ...ctx.settings.detailCta.button, href: quoteHref } }} />
      <PageMotion version={s.id} />
    </>
  )
}

export default function ServicePage({ params }: PageProps<'/services/[slug]'>) {
  return <Suspense fallback={<DetailFallback />}><ServiceDetail params={params} /></Suspense>
}
