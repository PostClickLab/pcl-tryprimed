import { Accordion } from '@/components/ui/Accordion'
import { ArrowLink } from '@/components/ui/Button'
import { Reveal, TextReveal } from '@/components/ui/motion'
import { faqs as allFaqs } from '@/data/faqs'
import type { Faq } from '@/types'

export function FaqSection({
  title = 'Frequently asked questions.',
  items = allFaqs.filter((f) => f.featured),
  className,
}: {
  title?: string
  items?: Faq[]
  className?: string
}) {
  const half = Math.ceil(items.length / 2)
  const columns = [items.slice(0, half), items.slice(half)]
  const toItems = (list: Faq[]) => list.map((f) => ({ id: f.id, title: f.question, content: f.answer }))
  return (
    <section className={className ?? 'py-16 sm:py-20'}>
      <div className="container-x">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <TextReveal text={title} className="text-[28px] font-extrabold tracking-[-0.02em] sm:text-4xl" />
          <ArrowLink to="/faqs">All questions</ArrowLink>
        </div>
        <Reveal className="grid gap-3 md:grid-cols-2 md:gap-4">
          {columns.map((col, i) => (
            <Accordion key={i} items={toItems(col)} className="space-y-3 md:space-y-4" />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
