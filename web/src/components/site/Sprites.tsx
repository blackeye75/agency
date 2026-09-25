import { scallopOval } from '@/components/motion/shapes'

// Shared SVG symbols, referenced with <use href="#id">.
export function Sprites() {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30)
  const petals8 = Array.from({ length: 8 }, (_, i) => i * 45)
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <clipPath id="scallop-oval" clipPathUnits="objectBoundingBox"><path d={scallopOval()} /></clipPath>
        <symbol id="ic-cursor" viewBox="0 0 100 100">
          <rect x="4" y="4" width="92" height="92" rx="24" fill="var(--pink)" stroke="var(--ink)" strokeWidth="4" />
          <path d="M34 26 L70 52 L54 55 L63 73 L55 77 L46 59 L34 70 Z" fill="var(--ink)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
        </symbol>
        <symbol id="ic-heart" viewBox="0 0 100 100">
          <rect x="4" y="4" width="92" height="92" rx="24" fill="var(--lime)" stroke="var(--ink)" strokeWidth="4" />
          <path d="M50 74 C28 60 22 48 26 38 C30 28 44 27 50 38 C56 27 70 28 74 38 C78 48 72 60 50 74 Z" fill="var(--ink)" />
        </symbol>
        <symbol id="ic-chart" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="var(--sky)" stroke="var(--ink)" strokeWidth="4" />
          <rect x="30" y="52" width="10" height="20" rx="3" fill="var(--ink)" /><rect x="45" y="38" width="10" height="34" rx="3" fill="var(--ink)" /><rect x="60" y="28" width="10" height="44" rx="3" fill="var(--ink)" />
        </symbol>
        <symbol id="ic-crown" viewBox="0 0 100 100">
          <path d="M8 18 H70 L94 50 L70 82 H8 Z" fill="var(--orange)" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
          <path d="M20 64 L24 36 L36 50 L46 32 L56 50 L68 36 L72 64 Z" fill="var(--ink)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
        </symbol>
        <symbol id="ic-bolt" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="var(--red)" stroke="var(--ink)" strokeWidth="4" />
          <path d="M56 18 L30 56 H48 L42 82 L70 42 H52 Z" fill="var(--ink)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
        </symbol>
        <symbol id="flower12" viewBox="-50 -50 100 100">
          <g className="petals">{petals.map((r) => <ellipse key={r} rx="7" ry="17" cy="-28" transform={`rotate(${r})`} />)}</g>
        </symbol>
        <symbol id="flower8" viewBox="-50 -50 100 100">
          <g fill="currentColor">{petals8.map((r) => <ellipse key={r} rx="9" ry="22" cy="-24" transform={`rotate(${r})`} />)}</g>
        </symbol>
        <symbol id="asterisk" viewBox="-50 -50 100 100">
          <g fill="currentColor">
            <rect x="-8" y="-48" width="16" height="96" rx="2" /><rect x="-8" y="-48" width="16" height="96" rx="2" transform="rotate(60)" /><rect x="-8" y="-48" width="16" height="96" rx="2" transform="rotate(120)" />
          </g>
        </symbol>
        <symbol id="arrow-ne" viewBox="0 0 24 24">
          <path d="M7 17 L17 7 M9 7 H17 V15" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
      </defs>
    </svg>
  )
}

export const Use = ({ id, className }: { id: string; className?: string }) => (
  <svg className={className} aria-hidden="true"><use href={`#${id}`} /></svg>
)
export const Arrow = () => <svg aria-hidden="true"><use href="#arrow-ne" /></svg>
