import { MarqueeMotion } from '@/components/motion/Motion'
import { Use } from '@/components/site/Sprites'
import type { MarqueeData } from '@/lib/cms/types'

export function Marquee({ data }: { data: MarqueeData }) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} style={{ display: 'contents' }}><span>{data.text}</span><Use id="asterisk" className="mq-ast" /></span>
        ))}
      </div>
      <MarqueeMotion selector=".marquee__track" spin=".mq-ast" />
    </div>
  )
}
