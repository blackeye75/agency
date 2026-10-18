// A "## FAQ" (or "## Frequently asked questions") heading in a Markdown body starts
// an FAQ block: each "### Question" and the text under it becomes one entry.
// This lets editors add FAQs (and FAQ rich results) from the existing Body field.
export function splitFaqs(md: string): { body: string; faqs: { q: string; a: string }[] } {
  const m = /^##\s+(faqs?|frequently asked questions)\s*$/im.exec(md)
  if (!m) return { body: md, faqs: [] }
  const rest = md.slice(m.index + m[0].length)
  const end = rest.search(/^##\s/m) // a later H2 ends the FAQ block
  const block = end < 0 ? rest : rest.slice(0, end)
  const faqs = block.split(/^###\s+/m).slice(1).map((chunk) => {
    const [q, ...a] = chunk.split('\n')
    return { q: q.trim(), a: a.join('\n').trim() }
  }).filter((f) => f.q && f.a)
  return { body: (md.slice(0, m.index) + (end < 0 ? '' : rest.slice(end))).trim(), faqs }
}
