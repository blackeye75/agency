'use client'
import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP, prefersReduced } from '@/components/motion/gsap'
import { ProjectCard } from '@/components/pages/ProjectCard'
import type { Project, ProjectsGridData } from '@/lib/cms/types'

// All projects with webmind-style category filters.
export function ProjectsGrid({ data, projects }: { data: ProjectsGridData; projects: Project[] }) {
  const ref = useRef<HTMLElement>(null)
  const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))]
  const [filter, setFilter] = useState<string | null>(null)
  const shown = filter ? projects.filter((p) => p.category === filter) : projects
  const first = useRef(true)

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.pcard', ref.current)
    if (prefersReduced()) return
    if (first.current) {
      first.current = false
      cards.forEach((c, i) => gsap.from(c, { y: 90, opacity: 0, duration: 1, ease: 'power3.out', delay: (i % 2) * 0.12, scrollTrigger: { trigger: c, start: 'top 92%', toggleActions: 'play none none reverse' } }))
    } else {
      gsap.fromTo(cards, { y: 50, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)', stagger: 0.06 })
      ScrollTrigger.refresh()
    }
  }, { scope: ref, dependencies: [filter, projects.length], revertOnUpdate: true })

  return (
    <section className="sec sec--surface" ref={ref}>
      <div className="sec-head">
        <p className="label label--orange">{data.label}</p>
      </div>
      {categories.length > 1 && (
        <div className="filters" role="group" aria-label="Filter projects">
          <button className="filter" aria-pressed={filter === null} onClick={() => setFilter(null)} data-cursor="click">{data.allLabel}<sup>{projects.length}</sup></button>
          {categories.map((c) => (
            <button key={c} className="filter" aria-pressed={filter === c} onClick={() => setFilter(c)} data-cursor="click">
              {c}<sup>{projects.filter((p) => p.category === c).length}</sup>
            </button>
          ))}
        </div>
      )}
      <div className="pgrid">{shown.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
    </section>
  )
}
