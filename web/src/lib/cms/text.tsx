import { Fragment, type ReactNode } from 'react'

// Renders the CMS text markers: {O} or {O|variant} swaps a letter for the
// alternate font, and "\n" becomes a line break.
const ALT = /\{([^}|]+)(?:\|(wide|slant|script|g))?\}/g

export function alt(text: string): ReactNode {
  const out: ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(ALT)) {
    if (m.index > last) out.push(text.slice(last, m.index))
    out.push(
      <span key={m.index} className={m[2] ? `alt alt--${m[2]}` : 'alt'}>
        {m[1]}
      </span>,
    )
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export function lines(text: string, render: (line: string) => ReactNode = alt): ReactNode {
  return text.split('\n').map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {render(line)}
    </Fragment>
  ))
}

// Plain version for screen readers, titles and metadata.
export function plain(text: string) {
  return text.replace(ALT, '$1').replace(/\[(\w+)\]/g, '').replace(/\s*\n\s*/g, ' ').replace(/\s{2,}/g, ' ').trim()
}

// *word* in a paragraph becomes an accent-coloured italic.
export function emphasis(text: string): ReactNode {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') && part.length > 2 ? <em key={i}>{part.slice(1, -1)}</em> : part,
  )
}

export const pad = (n: number) => String(n).padStart(2, '0')
