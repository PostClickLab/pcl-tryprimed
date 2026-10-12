import { useMemo, useState } from 'react'
import { useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Accordion } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/motion'
import { FinalCta } from '@/components/sections/FinalCta'
import { PageHero } from '@/components/sections/PageHero'
import { faqCategories, faqs } from '@/data/faqs'
import { cn } from '@/lib/cn'
import { usePageMeta } from '@/lib/hooks'
import type { Faq } from '@/types'

export default function FaqPage() {
  usePageMeta('FAQs', 'Answers to common questions about consultations, eligibility, treatment options, costs and privacy.')
  const { hash } = useLocation()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Faq['category'] | 'all'>('all')

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    return faqs.filter((f) => (category === 'all' || f.category === category) && (!q || `${f.question} ${f.answer}`.toLowerCase().includes(q)))
  }, [query, category])

  const grouped = faqCategories.map((c) => ({ ...c, items: results.filter((f) => f.category === c.id) })).filter((g) => g.items.length)
  const openFromHash = hash ? [hash.slice(1)] : []

  return (
    <>
      <PageHero
        crumbs={[{ label: 'FAQs' }]}
        eyebrow="Help centre"
        title={'Frequently asked\nquestions.'}
        lead="Everything you need to know before starting a consultation. Can’t find an answer? Our care team is here to help."
      >
        <div className="relative max-w-xl">
          <Icon name="search" size={20} className="absolute top-1/2 left-5 -translate-y-1/2 text-teal" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            aria-label="Search questions"
            className="h-14 w-full rounded-full bg-white pr-5 pl-13 text-navy shadow-soft ring-1 ring-sky-200 transition-shadow outline-none placeholder:text-slate-light focus:ring-2 focus:ring-teal"
          />
        </div>
      </PageHero>

      <section className="pb-20">
        <div className="container-x grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="-mx-4 no-scrollbar flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:px-0">
              {[{ id: 'all' as const, label: 'All questions' }, ...faqCategories].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={cn(
                    'relative isolate shrink-0 rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-colors',
                    category === c.id ? 'text-white' : 'text-navy hover:bg-sky-50',
                  )}
                >
                  {category === c.id && <motion.span layoutId="faq-cat" className="absolute inset-0 -z-10 rounded-xl bg-navy" />}
                  {c.label}
                </button>
              ))}
            </div>
            <div className="mt-8 hidden rounded-[24px] bg-sky-50 p-6 ring-1 ring-sky-200 lg:block">
              <Icon name="chat" size={28} className="text-teal" />
              <p className="mt-4 font-bold text-navy">Still have questions?</p>
              <p className="mt-1 text-sm text-slate">Our care team usually replies within one business day.</p>
              <Button to="/contact" variant="navy" size="sm" arrow className="mt-5">
                Contact us
              </Button>
            </div>
          </aside>

          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${category}-${query}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                {grouped.map((g) => (
                  <div key={g.id}>
                    <h2 className="mb-4 text-xl font-extrabold text-navy">{g.label}</h2>
                    <Accordion
                      defaultOpen={openFromHash}
                      className="space-y-3"
                      items={g.items.map((f) => ({ id: f.id, title: <span id={f.id}>{f.question}</span>, content: f.answer }))}
                    />
                  </div>
                ))}
                {grouped.length === 0 && (
                  <Reveal className="rounded-[24px] bg-sky-50 p-12 text-center ring-1 ring-sky-200">
                    <p className="text-lg font-bold text-navy">No questions match “{query}”.</p>
                    <p className="mt-2 text-slate">Try another word, or contact our care team.</p>
                  </Reveal>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
