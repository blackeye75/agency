import { test } from 'node:test'
import assert from 'node:assert/strict'
import { splitFaqs } from './faq.ts'

test('no FAQ heading leaves the body alone', () => {
  assert.deepEqual(splitFaqs('# Hi\n\ntext'), { body: '# Hi\n\ntext', faqs: [] })
})

test('pulls questions out and keeps text after the block', () => {
  const r = splitFaqs('Intro\n\n## Frequently asked questions\n\n### How long?\n\nSix weeks.\n\n### Cost?\nIt depends.\nOn scope.\n\n## Next\n\nMore')
  assert.deepEqual(r.faqs, [{ q: 'How long?', a: 'Six weeks.' }, { q: 'Cost?', a: 'It depends.\nOn scope.' }])
  assert.equal(r.body, 'Intro\n\n## Next\n\nMore')
})

test('FAQ block at the end, question without answer dropped', () => {
  const r = splitFaqs('A\n## FAQ\n### Q1\nA1\n### Empty\n')
  assert.deepEqual(r.faqs, [{ q: 'Q1', a: 'A1' }])
  assert.equal(r.body, 'A')
})
