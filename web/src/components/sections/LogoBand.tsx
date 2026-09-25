import { BRAND_ICONS } from '@/lib/brand-icons'
import { MarqueeMotion } from '@/components/motion/Motion'
import { Use } from '@/components/site/Sprites'
import type { LogoBandData } from '@/lib/cms/types'

// Tilted marquee band for the tech stack and partners. Brand marks are
// resolved here on the server so the icon set never ships to the browser.
export function LogoBand({ data }: { data: LogoBandData }) {
  const items = data.items.filter((i) => i.name || i.logo)
  const chip = (item: LogoBandData['items'][number], k: string, hidden?: boolean) => {
    const icon = item.icon ? BRAND_ICONS[item.icon] : undefined
    return (
      <span className="lchip" key={k} aria-hidden={hidden || undefined}>
        {item.logo ? <img src={item.logo} alt="" /> : icon ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg> : <i className="lchip__dot" />}
        {item.name}
      </span>
    )
  }
  // Repeat short lists so one half of the track is always wider than the screen.
  const reps = Math.max(1, Math.ceil(12 / Math.max(items.length, 1)))
  const half = Array.from({ length: reps }, () => items).flat()
  return (
    <section className={`lband lband--${data.direction} tone-${data.tone}`} aria-label={data.label}>
      <div className="lband__strip">
        {data.label && <p className="lband__label"><Use id="asterisk" />{data.label}</p>}
        <div className="lband__viewport">
          <div className="lband__track">
            {half.map((item, i) => chip(item, `a${i}`, i >= items.length))}
            {half.map((item, i) => chip(item, `b${i}`, true))}
          </div>
        </div>
        <MarqueeMotion selector=".lband__track" duration={Math.max(18, half.length * 2.2)} reverse={data.direction === 'right'} />
      </div>
      <ul className="sr">{items.map((i, k) => <li key={k}>{i.name}</li>)}</ul>
    </section>
  )
}
