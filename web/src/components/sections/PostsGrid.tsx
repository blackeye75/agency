import { PostCard } from '@/components/pages/PostCard'
import type { Post, PostsGridData } from '@/lib/cms/types'

export function PostsGrid({ data, posts }: { data: PostsGridData; posts: Post[] }) {
  return (
    <section className="sec sec--cream">
      <div className="sec-head"><p className="label label--orange">{data.label}</p></div>
      {posts.length ? <div className="bgrid">{posts.map((p, i) => <PostCard key={p.id} post={p} i={i} />)}</div> : <p className="empty">{data.empty}</p>}
    </section>
  )
}
