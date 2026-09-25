import { TLink } from '@/components/site/TLink'
import type { Post, Tone } from '@/lib/cms/types'

const TONES: Tone[] = ['orange', 'blue', 'lime', 'violet', 'pink', 'sky']
export const formatDate = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

export function PostCard({ post, i }: { post: Post; i: number }) {
  return (
    <TLink href={`/blog/${post.slug}`} className={`bcard tone-${TONES[i % TONES.length]}`} data-reveal={String((i % 3) * 0.1)}>
      <div className="bcard__cover">
        {post.cover_url ? <img src={post.cover_url} alt="" /> : <svg aria-hidden="true"><use href={i % 2 ? '#flower12' : '#asterisk'} /></svg>}
      </div>
      <div className="bcard__tags">{post.tags.map((t) => <span className="tag" key={t.text}>{t.text}</span>)}</div>
      <h3 className="bcard__title">{post.title}</h3>
      <p className="bcard__excerpt">{post.excerpt}</p>
      <span className="bcard__date">{formatDate(post.published_at)}{post.read_minutes ? ` · ${post.read_minutes} min read` : ''}</span>
    </TLink>
  )
}
