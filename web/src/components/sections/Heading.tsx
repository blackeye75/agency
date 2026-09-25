import { Lines } from '@/components/motion/Lines'
import { Wave } from '@/components/motion/Wave'
import type { HeadingData } from '@/lib/cms/types'

export function Heading({ data, next }: { data: HeadingData; next?: string }) {
  return (
    <section className="services-head">
      <Lines text={data.title} className="mega mega--ink" />
      {next && <Wave color={next} />}
    </section>
  )
}
