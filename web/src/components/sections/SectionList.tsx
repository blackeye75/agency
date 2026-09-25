import { Fragment, type ReactNode } from 'react'
import type { Post, Project, Section, SectionType, Service, Settings } from '@/lib/cms/types'
import { PageMotion } from '@/components/motion/PageMotion'
import { Hero } from './Hero'
import { Manifesto } from './Manifesto'
import { Story } from './Story'
import { Connection } from './Connection'
import { LogoBand } from './LogoBand'
import { Heading } from './Heading'
import { ServiceCards } from './ServiceCards'
import { Cases } from './Cases'
import { Signposts } from './Signposts'
import { Bond } from './Bond'
import { About } from './About'
import { Audit } from './Audit'
import { Mood } from './Mood'
import { Marquee } from './Marquee'
import { PageHero } from './PageHero'
import { ServicesList } from './ServicesList'
import { Process } from './Process'
import { CtaBand } from './CtaBand'
import { ProjectsGrid } from './ProjectsGrid'
import { PostsGrid } from './PostsGrid'
import { Contact } from './Contact'
import { Quote } from './Quote'
import { Enquiry } from './Enquiry'

// The footer follows the last section.
const FOOTER_BG = 'var(--surface)'

export type Ctx = { settings: Settings; services: Service[]; projects: Project[]; posts: Post[] }

// Background of each section type, so a wavy edge can blend into what follows.
const BG: Record<SectionType, string> = {
  hero: 'var(--surface)', manifesto: 'var(--blue)', story: 'var(--lilac)', connection: 'var(--cream)', logoBand: 'var(--surface)',
  heading: 'var(--cream)', serviceCards: 'var(--surface)', cases: 'var(--surface)', signposts: 'var(--surface)', bond: 'var(--cream)',
  about: 'var(--orange)', audit: 'var(--surface)', mood: 'var(--lilac)', marquee: 'var(--orange)', pageHero: 'var(--surface)',
  servicesList: 'var(--cream)', process: 'var(--lilac)', ctaBand: 'var(--orange)', projectsGrid: 'var(--surface)', postsGrid: 'var(--cream)',
  contact: 'var(--cream)', quote: 'var(--cream)', enquiry: 'var(--cream)',
}

function render(s: Section, ctx: Ctx, next: string | undefined, index: number): ReactNode {
  const wave = next && next !== BG[s.type] ? next : undefined
  switch (s.type) {
    case 'hero': return <Hero data={s.data as Section<'hero'>['data']} next={wave} />
    case 'manifesto': return <Manifesto data={s.data as Section<'manifesto'>['data']} />
    case 'story': return <Story data={s.data as Section<'story'>['data']} />
    case 'connection': return <Connection data={s.data as Section<'connection'>['data']} />
    case 'logoBand': return <LogoBand data={s.data as Section<'logoBand'>['data']} />
    case 'heading': return <Heading data={s.data as Section<'heading'>['data']} next={wave} />
    case 'serviceCards': return <ServiceCards data={s.data as Section<'serviceCards'>['data']} />
    case 'cases': {
      const limit = (s.data as Section<'cases'>['data']).limit || 11
      const featured = ctx.projects.filter((p) => p.featured)
      return <Cases projects={(featured.length ? featured : ctx.projects).slice(0, limit)} brand={ctx.settings.brand.name} />
    }
    case 'signposts': return <Signposts data={s.data as Section<'signposts'>['data']} />
    case 'bond': return <Bond data={s.data as Section<'bond'>['data']} />
    case 'about': return <About data={s.data as Section<'about'>['data']} next={wave} />
    case 'audit': return <Audit data={s.data as Section<'audit'>['data']} next={wave} />
    case 'mood': return <Mood data={s.data as Section<'mood'>['data']} />
    case 'marquee': return <Marquee data={s.data as Section<'marquee'>['data']} />
    case 'pageHero': return <PageHero data={s.data as Section<'pageHero'>['data']} next={wave} index={String(index + 1).padStart(2, '0')} />
    case 'servicesList': return <ServicesList data={s.data as Section<'servicesList'>['data']} services={ctx.services} />
    case 'process': return <Process data={s.data as Section<'process'>['data']} />
    case 'ctaBand': return <CtaBand data={s.data as Section<'ctaBand'>['data']} />
    case 'projectsGrid': return <ProjectsGrid data={s.data as Section<'projectsGrid'>['data']} projects={ctx.projects} />
    case 'postsGrid': return <PostsGrid data={s.data as Section<'postsGrid'>['data']} posts={ctx.posts} />
    case 'contact': return <Contact data={s.data as Section<'contact'>['data']} settings={ctx.settings} services={ctx.services} />
    case 'enquiry': return <Enquiry data={s.data as Section<'enquiry'>['data']} services={ctx.services} settings={ctx.settings} />
    case 'quote': return <Quote data={s.data as Section<'quote'>['data']} services={ctx.services} settings={ctx.settings} />
    default: return null
  }
}

export function SectionList({ sections, ctx }: { sections: Section[]; ctx: Ctx }) {
  const version = sections.map((s) => s.id + s.position).join('|')
  return (
    <>
      {sections.map((s, i) => (
        <Fragment key={s.id}>{render(s, ctx, sections[i + 1] ? BG[sections[i + 1].type] : FOOTER_BG, i)}</Fragment>
      ))}
      <PageMotion version={version} />
    </>
  )
}
