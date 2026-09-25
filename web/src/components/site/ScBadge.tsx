import { scallop, starPath } from '@/components/motion/shapes'
import { TLink } from './TLink'
import { lines } from '@/lib/cms/text'

const SCALLOP = scallop(8, 98, 16)

export function ScBadge({ href, label, tone = 'orange', large, className = '' }: { href: string; label: string; tone?: 'orange' | 'lime'; large?: boolean; className?: string }) {
  return (
    <TLink href={href} className={`scbadge scbadge--${tone}${large ? ' scbadge--lg' : ''} ${className}`}>
      <svg viewBox="-100 -100 200 200" aria-hidden="true"><path d={SCALLOP} /></svg>
      <span>{lines(label)}</span>
    </TLink>
  )
}

export const Star = ({ n, ro, ri, ...rest }: { n: number; ro: number; ri: number } & React.SVGProps<SVGPathElement>) => (
  <path d={starPath(n, ro, ri)} {...rest} />
)
