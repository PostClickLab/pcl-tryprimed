import { useMemo } from 'react'
import { Link, useParams } from 'react-router'
import { motion } from 'motion/react'
import { Reveal } from '@/components/ui/motion'
import { PageHero } from '@/components/sections/PageHero'
import { legalBySlug, legalDocs } from '@/data/legal'
import { cn } from '@/lib/cn'
import { usePageMeta, useScrollSpy } from '@/lib/hooks'
import { useScrollTo } from '@/providers/SmoothScroll'
import NotFoundPage from './NotFoundPage'

export default function LegalPage() {
  const { slug } = useParams()
  const doc = legalBySlug(slug)
  usePageMeta(doc?.title ?? 'Not found', doc?.summary)
  const ids = useMemo(() => doc?.sections.map((s) => s.id) ?? [], [doc])
  const active = useScrollSpy(ids)
  const scrollTo = useScrollTo()
  if (!doc) return <NotFoundPage />

  return (
    <>
      <PageHero crumbs={[{ label: 'Legal' }, { label: doc.title }]} eyebrow={`Last updated ${doc.updated}`} title={doc.title} lead={doc.summary} />
      <section className="pb-24">
        <div className="container-x grid gap-12 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 eyebrow text-slate">On this page</p>
            <nav className="relative hidden border-l border-sky-200 lg:block">
              {doc.sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(`#${s.id}`)}
                  className={cn(
                    'relative block w-full py-2 pl-5 text-left text-sm transition-colors',
                    active === s.id ? 'font-semibold text-navy' : 'text-slate hover:text-navy',
                  )}
                >
                  {active === s.id && <motion.span layoutId="legal-active" className="absolute inset-y-1 -left-px w-0.5 rounded bg-teal" />}
                  {s.heading}
                </button>
              ))}
            </nav>
            <div className="mt-8 rounded-2xl bg-sky-50 p-5 ring-1 ring-sky-200">
              <p className="mb-3 text-xs font-bold tracking-[0.16em] text-slate-light uppercase">Policies</p>
              <ul className="space-y-2 text-sm">
                {legalDocs.map((d) => (
                  <li key={d.slug}>
                    <Link
                      to={`/legal/${d.slug}`}
                      className={cn('transition-colors hover:text-teal', d.slug === doc.slug ? 'font-semibold text-teal' : 'text-navy')}
                    >
                      {d.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <article className="max-w-3xl">
            {doc.sections.map((s, i) => (
              <Reveal key={s.id} y={20}>
                <section id={s.id} className="scroll-mt-28 border-b border-sky-200 py-8 first:pt-0">
                  <h2 className="flex items-baseline gap-4 text-2xl font-extrabold tracking-tight text-navy">
                    <span className="text-sm font-bold text-teal tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    {s.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate">
                    {s.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </article>
        </div>
      </section>
    </>
  )
}
