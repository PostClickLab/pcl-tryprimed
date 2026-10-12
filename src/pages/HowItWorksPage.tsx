import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { EASE, Marquee, Reveal, SpotlightCard, TextReveal } from '@/components/ui/motion'
import { Eyebrow, SectionHeading } from '@/components/ui/Section'
import { FaqSection } from '@/components/sections/FaqSection'
import { FinalCta } from '@/components/sections/FinalCta'
import { PageHero } from '@/components/sections/PageHero'
import { Button } from '@/components/ui/Button'
import { included, journeySteps, marqueeWords } from '@/data/content'
import { faqs } from '@/data/faqs'
import { photos } from '@/data/media'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import { usePageMeta } from '@/lib/hooks'

const stepImages = [photos.heroConsultation, photos.clinician, photos.heroCouple]

export default function HowItWorksPage() {
  usePageMeta('How it works', 'Share your goals, get an individual clinical review, and plan your next steps.')
  const [active, setActive] = useState(0)

  return (
    <>
      <PageHero
        crumbs={[{ label: 'How it works' }]}
        eyebrow="How it works"
        title={'Care that starts\nwith a conversation.'}
        lead="Three clear steps, a licensed clinician at every decision, and honest answers, including when treatment is not the right fit."
        aside={
          <div className="relative">
            <div className="aspect-[4/3.4] animate-blob overflow-hidden shadow-lift">
              <img src={photos.heroConsultation} alt="Woman on an online consultation" className="h-full w-full scale-110 object-cover object-[60%_center]" />
            </div>
            <div className="absolute -bottom-4 left-0 flex animate-float items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-lift sm:-left-6">
              <span className="grid size-10 place-items-center rounded-xl bg-teal text-white">
                <Icon name="clock" size={20} />
              </span>
              <span>
                <span className="block text-sm font-bold text-navy">~10 minutes</span>
                <span className="block text-xs text-slate">to share your health history</span>
              </span>
            </div>
          </div>
        }
      >
        <Button to={site.consultationPath} size="lg" arrow>
          Start my consultation
        </Button>
      </PageHero>

      <div className="border-y border-sky-200 bg-white py-5">
        <Marquee>
          {marqueeWords.map((w) => (
            <span key={w} className="flex items-center gap-6 px-6 text-xl font-extrabold tracking-tight text-navy sm:text-2xl">
              {w}
              <Icon name="sparkle" size={18} className="text-teal" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Scrollytelling steps */}
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="The journey" title="Three steps. One clinician-led plan." className="mb-12 max-w-2xl lg:mb-4" />
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <div className="hidden lg:block">
              <div className="sticky top-0 flex h-screen items-center">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-sky">
                  <AnimatePresence mode="popLayout">
                    <motion.img
                      key={active}
                      src={stepImages[active]}
                      alt=""
                      initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.15 }}
                      animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, ease: EASE }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 flex items-end gap-4 text-white">
                    <span className="text-[120px] leading-[0.8] font-extrabold tracking-tighter">0{active + 1}</span>
                    <span className="pb-2 text-sm font-semibold text-white/80">/ 0{journeySteps.length}</span>
                  </div>
                  <div className="absolute top-6 right-6 flex flex-col gap-2">
                    {journeySteps.map((_, i) => (
                      <span key={i} className={cn('w-1.5 rounded-full transition-all duration-500', i === active ? 'h-8 bg-white' : 'h-1.5 bg-white/40')} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              {journeySteps.map((step, i) => (
                <StepBlock key={step.id} index={i} onActive={setActive} active={active === i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="bg-sky-50 py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="What is included" title="Everything you need, nothing you do not." align="center" className="mb-12 max-w-2xl" />
          <Reveal stagger={0.07} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item) => (
              <SpotlightCard key={item.title} tilt className="h-full rounded-[24px]">
                <div className="h-full rounded-[24px] bg-white p-7 ring-1 ring-sky-200 transition-shadow duration-500 group-hover/card:shadow-lift">
                  <span className="grid size-12 place-items-center rounded-2xl bg-sky text-teal transition-all duration-500 ease-out-expo group-hover/card:rotate-[-8deg] group-hover/card:bg-teal group-hover/card:text-white">
                    <Icon name={item.icon} size={24} />
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{item.description}</p>
                </div>
              </SpotlightCard>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Honesty */}
      <section className="py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <Eyebrow>Our promise</Eyebrow>
            <TextReveal
              text={'Clear answers,\neven when the\nanswer is *no.*'}
              className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl"
            />
          </div>
          <Reveal stagger={0.1} className="grid gap-4 sm:grid-cols-2">
            <div className="h-full rounded-[24px] bg-navy p-7 text-white">
              <p className="eyebrow text-teal-200">We will</p>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  'Review your history individually',
                  'Explain options and trade-offs',
                  'Tell you when treatment is not appropriate',
                  'Support you with ongoing check-ins',
                ].map((x) => (
                  <li key={x} className="flex gap-3">
                    <Icon name="check" size={18} strokeWidth={2.2} className="mt-0.5 shrink-0 text-teal-300" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-full rounded-[24px] bg-sky-50 p-7 ring-1 ring-sky-200">
              <p className="eyebrow text-slate">We will not</p>
              <ul className="mt-5 space-y-3 text-sm text-navy">
                {['Guarantee a prescription', 'Pressure you into a plan', 'Sell your health data', 'Replace emergency care'].map((x) => (
                  <li key={x} className="flex gap-3">
                    <Icon name="close" size={18} strokeWidth={2.2} className="mt-0.5 shrink-0 text-slate-light" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection items={faqs.filter((f) => f.category === 'consultation' || f.category === 'eligibility').slice(0, 6)} className="pb-20" />
      <FinalCta />
    </>
  )
}

function StepBlock({ index, onActive, active }: { index: number; onActive: (i: number) => void; active: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  const step = journeySteps[index]
  useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])

  return (
    <div ref={ref} className="flex min-h-[auto] items-center py-6 lg:min-h-[80vh]">
      <Reveal className={cn('w-full rounded-[28px] p-7 transition-all duration-700 sm:p-10', active ? 'bg-sky-50 ring-1 ring-sky-200' : 'lg:opacity-40')}>
        <div className="mb-6 overflow-hidden rounded-2xl lg:hidden">
          <img src={stepImages[index]} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" />
        </div>
        <div className="flex items-center gap-4">
          <span className="grid size-14 place-items-center rounded-full bg-teal text-lg font-bold text-white shadow-glow">0{index + 1}</span>
          <Icon name={step.icon} size={30} className="text-navy" />
        </div>
        <h3 className="mt-6 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{step.title}</h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-slate sm:text-lg">{step.detail}</p>
      </Reveal>
    </div>
  )
}
