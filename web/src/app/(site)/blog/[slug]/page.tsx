import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPosts, getSettings } from '@/lib/cms/queries'
import { loadCtx } from '@/lib/cms/page'
import { Lines } from '@/components/motion/Lines'
import { PageMotion } from '@/components/motion/PageMotion'
import { Markdown } from '@/components/pages/Markdown'
import { PostCard, formatDate } from '@/components/pages/PostCard'
import { Crumbs, DetailFallback } from '@/components/pages/Detail'
import { CtaBand } from '@/components/sections/CtaBand'
import { JsonLd, postLd } from '@/lib/seo'
import { splitFaqs } from '@/lib/cms/faq'
import { Faq } from '@/components/sections/Faq'
import { TLink } from '@/components/site/TLink'

export async function generateStaticParams() {
  return (await getPosts()).filter((p) => p.published).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const [posts, settings] = await Promise.all([getPosts(), getSettings()])
  const p = posts.find((x) => x.slug === slug && x.published)
  if (!p) return {}
  const title = p.seo_title || `${p.title} · ${settings.brand.name}`
  const description = p.seo_description || p.excerpt
  return {
    title, description, alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: 'article', title, description, publishedTime: p.published_at, images: [p.cover_url || '/og'] },
  }
}

async function PostDetail({ params }: Pick<PageProps<'/blog/[slug]'>, 'params'>) {
  const { slug } = await params
  const ctx = await loadCtx()
  const post = ctx.posts.find((p) => p.slug === slug)
  if (!post) notFound()
  const more = ctx.posts.filter((p) => p.slug !== slug).slice(0, 3)
  const { body, faqs } = splitFaqs(post.body)
  return (
    <>
      <section className="phero" style={{ minHeight: '70vh' }}>
        <Crumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.title }]} />
        <div className="bcard__tags" data-reveal>{post.tags.map((t) => <span className="tag" key={t.text}>{t.text}</span>)}</div>
        <Lines as="h1" text={post.title} className="phero__title" start="top 95%" />
        <div className="post-meta" data-reveal="0.2">
          <span>{formatDate(post.published_at)}</span>
          {post.read_minutes && <span>{post.read_minutes} min read</span>}
          {post.author && <span>By {post.author}</span>}
        </div>
      </section>
      <section className="sec sec--cream">
        {post.cover_url && <div className="dhero__cover" style={{ marginTop: 0, marginBottom: '8vh' }} data-reveal><img src={post.cover_url} alt={post.title} /></div>}
        <div style={{ display: 'flex', justifyContent: 'center' }} data-reveal><Markdown>{body}</Markdown></div>
        <nav className="post-services" aria-label="Our services" data-reveal>
          <h2>How we can help</h2>
          <ul className="chips">{ctx.services.map((s) => <li key={s.slug}><TLink href={`/services/${s.slug}`}>{s.title}</TLink></li>)}</ul>
        </nav>
      </section>
      <Faq faqs={faqs} />
      {more.length > 0 && (
        <section className="sec sec--surface">
          <div className="sec-head"><Lines text={'KEEP\nREADING'} className="mega" /></div>
          <div className="bgrid">{more.map((p, i) => <PostCard key={p.id} post={p} i={i + 1} />)}</div>
        </section>
      )}
      <CtaBand data={{ title: ctx.settings.detailCta.title, text: '', button: ctx.settings.detailCta.button }} />
      <JsonLd data={postLd(post)} />
      <PageMotion version={post.id} />
    </>
  )
}

export default function PostPage({ params }: PageProps<'/blog/[slug]'>) {
  return <Suspense fallback={<DetailFallback />}><PostDetail params={params} /></Suspense>
}
