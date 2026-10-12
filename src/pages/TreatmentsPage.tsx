import { Link, useSearchParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { EASE, Reveal, TextReveal } from '@/components/ui/motion'
import { CareJourney } from '@/components/sections/CareJourney'
import { FaqSection } from '@/components/sections/FaqSection'
import { FinalCta } from '@/components/sections/FinalCta'
import { PageHero } from '@/components/sections/PageHero'
import { TreatmentCard } from '@/components/sections/TreatmentCard'
import { faqs } from '@/data/faqs'
import { formats, goalById, goals, isFormatId, isGoalId } from '@/data/goals'
import { site } from '@/data/site'
import { filterTreatments } from '@/data/treatments'
import { cn } from '@/lib/cn'
import { usePageMeta } from '@/lib/hooks'

export default function TreatmentsPage() {
  const [params, setParams] = useSearchParams()
  const goalParam = params.get('goal')
  const formatParam = params.get('format')
  const goal = isGoalId(goalParam) ? goalParam : null
  const format = isFormatId(formatParam) ? formatParam : null
  const results = filterTreatments({ goal, format })
  const activeGoal = goal ? goalById(goal) : null

  usePageMeta(activeGoal ? `${activeGoal.label} options` : 'Treatment options', 'Explore treatment options to discuss with a licensed clinician.')

  const update = (key: 'goal' | 'format', value: string | null) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Treatments', to: '/treatments' }, ...(activeGoal ? [{ label: activeGoal.label }] : [])]}
        eyebrow="Treatment options"
        title={activeGoal ? activeGoal.headline : 'Explore options\nwith your clinician.'}
        lead={
          activeGoal
            ? activeGoal.description
            : 'Every option below is a subject for clinical discussion, not a purchase. A licensed clinician reviews your history and goals before anything is prescribed.'
        }
      >
        <Button to={site.consultationPath + (goal ? `?goals=${goal}` : '')} size="lg" arrow>
          Start my consultation
        </Button>
      </PageHero>

      {/* Goal tiles */}
      <section className="pb-6">
        <div className="container-x">
          <Reveal
            stagger={0.06}
            className="-mx-4 no-scrollbar flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0"
          >
            {goals.map((g) => {
              const active = goal === g.id
              return (
                <button
                  key={g.id}
                  onClick={() => update('goal', active ? null : g.id)}
                  aria-pressed={active}
                  className={cn(
                    'group relative h-40 w-[62vw] shrink-0 snap-start overflow-hidden rounded-[22px] text-left sm:h-48 sm:w-full',
                    active && 'ring-4 ring-teal ring-offset-2',
                  )}
                >
                  <img
                    src={g.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-[50%_25%] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110"
                  />
                  <div
                    className={cn(
                      'absolute inset-0 transition-colors duration-500',
                      active ? 'bg-teal/60' : 'bg-gradient-to-t from-navy/75 via-navy/10 to-transparent group-hover:bg-navy/40',
                    )}
                  />
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
                    <span className="flex items-center gap-2 font-bold">
                      <Icon name={g.icon} size={20} /> {g.label}
                    </span>
                    <span
                      className={cn(
                        'grid size-8 place-items-center rounded-full bg-white text-teal transition-transform duration-500',
                        active ? 'rotate-45' : 'group-hover:rotate-90',
                      )}
                    >
                      <Icon name="plus" size={16} strokeWidth={2.2} />
                    </span>
                  </div>
                </button>
              )
            })}
          </Reveal>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-[84px] z-30 py-3 lg:top-[92px]">
        <div className="container-x">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/85 p-2 shadow-soft ring-1 ring-sky-200 backdrop-blur-xl">
            <div className="no-scrollbar flex gap-1 overflow-x-auto">
              <FilterChip active={!format} onClick={() => update('format', null)}>
                All formats
              </FilterChip>
              {formats.map((f) => (
                <FilterChip key={f.id} active={format === f.id} onClick={() => update('format', format === f.id ? null : f.id)}>
                  <Icon name={f.icon} size={15} /> {f.label}
                </FilterChip>
              ))}
            </div>
            <div className="flex items-center gap-3 px-2 text-sm text-slate">
              <span>
                <motion.span key={results.length} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block font-bold text-navy">
                  {results.length}
                </motion.span>{' '}
                option{results.length === 1 ? '' : 's'}
              </span>
              {(goal || format) && (
                <button onClick={() => setParams({}, { replace: true, preventScrollReset: true })} className="font-semibold text-teal hover:underline">
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pt-6 pb-16">
        <div className="container-x">
          <motion.div layout className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {results.map((t, i) => (
                <motion.div
                  key={t.slug}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.6, delay: i * 0.04, ease: EASE }}
                >
                  <TreatmentCard treatment={t} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {results.length === 0 && (
            <div className="rounded-[26px] bg-sky-50 px-6 py-16 text-center ring-1 ring-sky-200">
              <p className="text-xl font-bold text-navy">No options match these filters.</p>
              <p className="mt-2 text-slate">Your clinician can still discuss what may be appropriate for you.</p>
              <button onClick={() => setParams({}, { replace: true })} className="mt-6 font-semibold text-teal">
                Clear filters
              </button>
            </div>
          )}
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-slate">
            Prescription options are available only if a licensed clinician determines they are appropriate after reviewing your health history. Product names,
            formats and availability shown here are part of a design preview and are pending confirmation.
          </p>
        </div>
      </section>

      {/* Not sure banner */}
      <section className="pb-6">
        <div className="container-x">
          <Reveal className="grain relative overflow-hidden rounded-[28px] bg-navy px-6 py-10 text-white sm:px-12 sm:py-14">
            <div aria-hidden className="absolute -top-24 -right-20 size-80 animate-blob bg-gradient-to-br from-teal-300/50 to-teal/10" />
            <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <TextReveal text="Not sure where to start?" className="text-3xl font-extrabold tracking-tight sm:text-4xl" />
                <p className="mt-3 max-w-lg text-white/75">
                  You do not need to choose a treatment. Share your goals and a clinician will guide you through what may be appropriate.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button to={site.consultationPath} size="lg" arrow>
                  Start my consultation
                </Button>
                <Link
                  to="/how-it-works"
                  className="inline-flex h-14 items-center rounded-full px-6 text-sm font-semibold text-white ring-1 ring-white/25 transition-colors hover:bg-white/10"
                >
                  How it works
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CareJourney className="py-10" />
      <FaqSection items={faqs.filter((f) => f.category === 'treatments' || f.category === 'eligibility')} />
      <FinalCta />
    </>
  )
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'relative isolate flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-semibold transition-colors duration-300',
        active ? 'text-white' : 'text-navy hover:bg-sky',
      )}
    >
      {active && (
        <motion.span
          layoutId="filter-pill"
          className="absolute inset-0 -z-10 rounded-xl bg-navy"
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        />
      )}
      {children}
    </button>
  )
}
