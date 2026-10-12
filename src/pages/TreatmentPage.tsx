import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { Accordion } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { Icon, type IconName } from '@/components/ui/Icon'
import { EASE, Reveal, TextReveal } from '@/components/ui/motion'
import { Pedestal } from '@/components/ui/ProductVisual'
import { Eyebrow } from '@/components/ui/Section'
import { FinalCta } from '@/components/sections/FinalCta'
import { Breadcrumbs } from '@/components/sections/PageHero'
import { TreatmentCard } from '@/components/sections/TreatmentCard'
import { journeySteps } from '@/data/content'
import { formatById, goalById } from '@/data/goals'
import { site } from '@/data/site'
import { relatedTreatments, treatmentBySlug } from '@/data/treatments'
import { joinWaitlist } from '@/lib/api'
import { cn } from '@/lib/cn'
import { useFinePointer, usePageMeta } from '@/lib/hooks'
import type { Treatment } from '@/types'
import NotFoundPage from './NotFoundPage'

const trust: { icon: IconName; label: string }[] = [
  { icon: 'clinical', label: 'Licensed clinicians' },
  { icon: 'lock', label: 'Private & secure' },
  { icon: 'chat', label: 'Ongoing support' },
]

export default function TreatmentPage() {
  const { slug } = useParams()
  const treatment = treatmentBySlug(slug)
  usePageMeta(treatment?.name ?? 'Not found', treatment?.summary)
  if (!treatment) return <NotFoundPage />

  const format = formatById(treatment.format)
  const consultUrl = `${site.consultationPath}?goals=${treatment.goals.join(',')}&treatment=${treatment.slug}`
  const related = relatedTreatments(treatment)

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white pt-28 pb-16 lg:pt-32">
        <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Gallery treatment={treatment} />
          </div>

          <div>
            <Reveal y={10}>
              <Breadcrumbs items={[{ label: 'Treatments', to: '/treatments' }, { label: treatment.name }]} />
            </Reveal>
            <Reveal y={16} delay={0.05} className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy ring-1 ring-sky-200">
                <Icon name={format.icon} size={14} className="text-teal" /> {format.label}
              </span>
              {treatment.goals.map((g) => (
                <Link
                  key={g}
                  to={`/treatments?goal=${g}`}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate ring-1 ring-sky-200 transition-colors hover:text-teal hover:ring-teal/40"
                >
                  {goalById(g).label}
                </Link>
              ))}
              <span
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-semibold',
                  treatment.availability === 'available' ? 'bg-teal/10 text-teal-700' : 'bg-navy text-white',
                )}
              >
                {treatment.availability === 'available' ? 'Prescription required' : 'Waitlist'}
              </span>
            </Reveal>

            <TextReveal as="h1" text={treatment.name} className="mt-5 text-5xl font-extrabold tracking-[-0.035em] sm:text-6xl lg:text-7xl" />
            <Reveal delay={0.15}>
              <p className="mt-4 text-lg font-semibold text-navy">{treatment.tagline}</p>
              <p className="mt-3 max-w-lg leading-relaxed text-slate">{treatment.summary}</p>
            </Reveal>

            <Reveal delay={0.22} className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-sky-200 ring-1 ring-sky-200">
              {[
                { label: 'Pricing', value: 'Shared after clinical review' },
                { label: 'Starts with', value: 'Online consultation' },
                { label: 'Format', value: format.label },
                { label: 'Follow-up', value: 'Ongoing check-ins' },
              ].map((row) => (
                <div key={row.label} className="bg-white p-4">
                  <p className="text-[11px] font-bold tracking-[0.16em] text-slate-light uppercase">{row.label}</p>
                  <p className="mt-1 text-sm font-semibold text-navy">{row.value}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.3} className="mt-8">
              {treatment.availability === 'available' ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button to={consultUrl} size="lg" arrow full className="sm:w-auto">
                    Start my consultation
                  </Button>
                  <Button to={`/contact?topic=${treatment.slug}`} variant="outline" size="lg" full className="sm:w-auto">
                    Ask a question
                  </Button>
                </div>
              ) : (
                <WaitlistForm treatment={treatment} />
              )}
              <p className="mt-3 text-xs text-slate">A prescription is never guaranteed. Individual clinical review required.</p>
            </Reveal>

            <Reveal delay={0.35} className="mt-8 space-y-3">
              {treatment.highlights.map((h) => (
                <div key={h} className="flex items-center gap-3 text-sm font-medium text-navy">
                  <span className="grid size-6 place-items-center rounded-full bg-teal text-white">
                    <Icon name="check" size={14} strokeWidth={2.6} />
                  </span>
                  {h}
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.4} className="mt-10">
              <Accordion
                variant="line"
                defaultOpen={['overview']}
                className="border-t border-navy/10"
                items={[
                  { id: 'overview', title: 'Overview', content: treatment.overview },
                  { id: 'prescribing', title: 'How it is prescribed', content: treatment.prescribing },
                  {
                    id: 'before',
                    title: 'Before your consultation',
                    content: (
                      <ul className="list-disc space-y-2 pl-5">
                        {treatment.considerations.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    id: 'safety',
                    title: 'Important safety information',
                    content:
                      'All prescription treatments carry potential risks and side effects. Your clinician will review your full health history, current medications and contraindications, and discuss possible side effects before any prescription. Contact your care team or seek medical attention if you experience severe or unexpected symptoms. In an emergency, call 911.',
                  },
                ]}
              />
            </Reveal>

            <Reveal delay={0.45} className="mt-8 grid grid-cols-3 gap-3">
              {trust.map((t) => (
                <div
                  key={t.label}
                  className="group flex flex-col items-center gap-2 rounded-2xl bg-sky-50 p-4 text-center ring-1 ring-sky-200 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-soft"
                >
                  <Icon name={t.icon} size={24} className="text-teal transition-transform duration-500 group-hover:scale-110" />
                  <span className="text-xs font-semibold text-navy">{t.label}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="grain bg-navy py-16 text-white sm:py-24">
        <div className="container-x">
          <Eyebrow light>What to expect</Eyebrow>
          <TextReveal
            text={`From first question\nto ${treatment.name}.`}
            className="mt-4 max-w-3xl text-4xl leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl"
          />
          <Reveal stagger={0.12} className="mt-12 grid gap-4 md:grid-cols-3">
            {journeySteps.map((step, i) => (
              <div
                key={step.id}
                className="group relative h-full overflow-hidden rounded-[24px] bg-white/[0.06] p-7 ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-1 hover:bg-white/10"
              >
                <span className="absolute -top-6 -right-2 text-[120px] leading-none font-extrabold text-white/[0.06] transition-colors duration-500 group-hover:text-teal/30">
                  {i + 1}
                </span>
                <span className="grid size-12 place-items-center rounded-2xl bg-teal text-white">
                  <Icon name={step.icon} size={22} />
                </span>
                <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{step.detail}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <RelatedCarousel items={related} />

      <FinalCta
        title={'Ready to talk\nit through?'}
        lead={`Discuss whether ${treatment.name} may be appropriate for you with a licensed clinician.`}
        image={goalById(treatment.goals[0]).image}
      />
    </>
  )
}

function Gallery({ treatment }: { treatment: Treatment }) {
  const [index, setIndex] = useState(0)
  const fine = useFinePointer()
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 15 })
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 15 })
  const src = treatment.gallery[index]
  const isCutout = index === 0 && treatment.imageKind === 'cutout'

  return (
    <Reveal y={40}>
      <div
        className="relative aspect-square overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_50%_30%,#ffffff,#eaf6fb_50%,#cfe6f1)] ring-1 ring-sky-200"
        onPointerMove={(e) => {
          if (!fine) return
          const r = e.currentTarget.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width
          const y = (e.clientY - r.top) / r.height
          ry.set((x - 0.5) * 16)
          rx.set((y - 0.5) * -12)
        }}
        onPointerLeave={() => {
          rx.set(0)
          ry.set(0)
        }}
      >
        <div aria-hidden className="absolute -top-20 -left-20 size-80 animate-blob bg-teal-100/80" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {isCutout ? (
              <>
                <Pedestal className="absolute bottom-[8%] left-1/2 aspect-[5/2] w-[56%] -translate-x-1/2" />
                <motion.img
                  src={src}
                  alt={treatment.name}
                  style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
                  className="absolute bottom-[17%] left-1/2 h-[72%] w-auto -translate-x-1/2 drop-shadow-[0_40px_40px_rgb(8_38_76/0.28)]"
                />
              </>
            ) : (
              <img src={src} alt={treatment.name} className="h-full w-full object-cover" />
            )}
          </motion.div>
        </AnimatePresence>
        {treatment.availability === 'waitlist' && (
          <span className="absolute top-5 right-5 rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-white">Waitlist</span>
        )}
      </div>
      <div className="mt-4 flex gap-3">
        {treatment.gallery.map((img, i) => (
          <button
            key={img}
            onClick={() => setIndex(i)}
            aria-label={`Show image ${i + 1}`}
            className={cn(
              'relative size-20 overflow-hidden rounded-2xl bg-sky ring-2 transition-all duration-300',
              i === index ? 'ring-teal' : 'opacity-70 ring-transparent hover:opacity-100',
            )}
          >
            <img src={img} alt="" className={cn('h-full w-full', i === 0 && treatment.imageKind === 'cutout' ? 'object-contain p-2' : 'object-cover')} />
          </button>
        ))}
      </div>
    </Reveal>
  )
}

function WaitlistForm({ treatment }: { treatment: Treatment }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle')
  return (
    <AnimatePresence mode="wait">
      {state === 'done' ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-2xl bg-teal/10 p-4 text-sm font-semibold text-teal-700"
        >
          <Icon name="check" size={20} strokeWidth={2.4} /> You are on the list. We will email {email} if availability changes.
        </motion.div>
      ) : (
        <motion.form
          key="form"
          exit={{ opacity: 0 }}
          onSubmit={async (e) => {
            e.preventDefault()
            setState('loading')
            await joinWaitlist(email, treatment.slug)
            setState('done')
          }}
          className="flex flex-col gap-2 rounded-full bg-white p-1.5 ring-1 ring-sky-200 sm:flex-row"
        >
          <label htmlFor="waitlist-email" className="sr-only">
            Email address
          </label>
          <input
            id="waitlist-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="h-12 flex-1 rounded-full bg-transparent px-5 text-sm text-navy outline-none placeholder:text-slate-light"
          />
          <Button type="submit" arrow magnetic={false} disabled={state === 'loading'}>
            {state === 'loading' ? 'Joining…' : 'Join the waitlist'}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

function RelatedCarousel({ items }: { items: Treatment[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' })
  return (
    <section className="py-16 sm:py-24">
      <div className="container-x">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <Eyebrow>Keep exploring</Eyebrow>
            <TextReveal text="Other options to discuss." className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl" />
          </div>
          <div className="hidden gap-2 sm:flex">
            {[-1, 1].map((d) => (
              <button
                key={d}
                onClick={() => scroll(d)}
                aria-label={d < 0 ? 'Previous' : 'Next'}
                className="grid size-12 place-items-center rounded-full border border-navy/15 text-navy transition-all duration-300 hover:border-teal hover:bg-teal hover:text-white"
              >
                <Icon name={d < 0 ? 'chevronLeft' : 'chevronRight'} size={20} />
              </button>
            ))}
          </div>
        </div>
        <div ref={ref} data-lenis-prevent-horizontal className="-mx-4 no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
          {items.map((t) => (
            <div key={t.slug} className="w-[78vw] shrink-0 snap-start sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]">
              <TreatmentCard treatment={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
