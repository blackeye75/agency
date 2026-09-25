'use client'
import Link from 'next/link'
import type { ComponentProps } from 'react'
import { useSite } from './SiteProvider'

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string; cursor?: 'click' | 'drag' | 'you' }

// A link that plays the band transition between pages. External links, new
// tabs and modified clicks behave like normal links.
export function TLink({ href, cursor = 'click', onClick, ...rest }: Props) {
  const { navigate } = useSite()
  const external = /^(https?:|mailto:|tel:)/.test(href)
  if (external) {
    const newTab = href.startsWith('http')
    return <a href={href} data-cursor={cursor} target={newTab ? '_blank' : undefined} rel={newTab ? 'noreferrer' : undefined} onClick={onClick} {...(rest as ComponentProps<'a'>)} />
  }
  return (
    <Link
      href={href}
      data-cursor={cursor}
      onClick={onClick}
      onNavigate={(e) => {
        e.preventDefault()
        navigate(href)
      }}
      {...rest}
    />
  )
}
