import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion, useScroll, useTransform } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Counter, EASE, Marquee, ParallaxImage, Reveal, ScrollText, TextReveal } from '@/components/ui/motion'
import { Eyebrow } from '@/components/ui/Section'
import { FinalCta } from '@/components/sections/FinalCta'
import { Breadcrumbs } from '@/components/sections/PageHero'
import { goals } from '@/data/goals'
import { marqueeWords, storyFacts, storyPrinciples } from '@/data/content'
import { photos } from '@/data/media'
import { useMediaQuery, usePageMeta } from '@/lib/hooks'
import { useIntro } from '@/providers/IntroProvider'

export default function OurStoryPage() {
  usePageMeta('Our story', 'Why PRIMED exists: personalized, clinician-led online care built around your goals.')
  return (
    <>
      <StoryHero />

      {/* Manifesto */}
      <section className="py-20 sm:py-32">
        <div className="container-x grid gap-10 lg:grid-cols-[0.35fr_1fr]">
          <Eyebrow>Why we exist</Eyebrow>
          <ScrollText
            className="text-[28px] leading-[1.15] font-extrabold tracking-[-0.02em] text-navy sm:text-5xl"
            text="Too many people make health decisions without a real conversation. Rushed appointments, confusing options and one-size-fits-all answers. PRIMED was built to change that: personalized online care where a licensed clinician listens first, explains clearly and helps you plan your next chapter."
          />
        </div>
      </section>

      {/* Facts */}
      <section className="pb-20">
        <div className="container-x">
          <Reveal stagger={0.08} className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-sky-200 ring-1 ring-sky-200 lg:grid-cols-4">
            {storyFacts.map((f) => (
              <div key={f.label} className="group h-full bg-white p-6 transition-colors duration-500 hover:bg-sky-50 sm:p-10">
                <Counter
                  to={f.value}
                  suffix={f.suffix}
                  className="text-5xl font-extrabold tracking-tighter text-navy transition-colors duration-500 group-hover:text-teal sm:text-7xl"
                />
                <p className="mt-3 text-sm font-medium text-slate">{f.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <Principles />

      {/* Care areas */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Areas of care</Eyebrow>
              <TextReveal text={'Built around\nwhat matters to you.'} className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl" />
            </div>
            <Button to="/treatments" variant="outline" arrow>
              Explore treatment options
            </Button>
          </div>
          <Reveal stagger={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {goals.map((g) => (
              <Link key={g.id} to={`/treatments?goal=${g.id}`} data-cursor="Explore" className="group relative block h-[420px] overflow-hidden rounded-[26px]">
                <img
                  src={g.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_25%] transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-x-6 bottom-6 text-white">
                  <Icon name={g.icon} size={28} />
                  <h3 className="mt-3 text-2xl font-extrabold">{g.label}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm text-white/80 opacity-0 transition-all duration-700 ease-out-expo group-hover:max-h-32 group-hover:opacity-100">
                    {g.description}
                  </p>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <div className="border-y border-sky-200 bg-sky-50 py-6">
        <Marquee reverse>
          {marqueeWords.map((w) => (
            <span key={w} className="flex items-center gap-8 px-8 text-3xl font-extrabold tracking-tight text-navy/80 sm:text-5xl">
              {w}
              <span className="size-3 rounded-full bg-teal" />
            </span>
          ))}
        </Marquee>
      </div>

      <FinalCta title={'Let’s write your\nnext chapter\ntogether.'} image={photos.heroCouple} />
    </>
  )
}

function StoryHero() {
  const { ready } = useIntro()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86])
  const radius = useTransform(scrollYProgress, [0, 1], [0, 48])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])

  return (
    <section ref={ref} className="relative h-[110svh] bg-white">
      <motion.div style={{ scale, borderRadius: radius }} className="sticky top-0 h-svh overflow-hidden">
        <motion.img
          src={photos.heroCouple}
          alt="Couple smiling together by a mountain lake"
          initial={{ scale: 1.25 }}
          animate={ready ? { scale: 1.05 } : {}}
          transition={{ duration: 2.4, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/30 to-transparent" />
        <motion.div style={{ y: textY }} className="relative container-x flex h-full flex-col justify-end pb-16 text-white sm:pb-24">
          <Breadcrumbs items={[{ label: 'Our story' }]} className="mb-6 text-white/70 [&_[aria-current]]:text-white" />
          <TextReveal
            as="h1"
            text={'More life.\nMore *you.*'}
            accentClassName="text-teal-300"
            className="text-[56px] leading-[0.92] font-extrabold tracking-[-0.04em] sm:text-8xl lg:text-[140px]"
          />
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-md text-lg text-white/85">We believe better care starts with a better conversation. This is why we built PRIMED.</p>
          </Reveal>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Principles() {
  const desktop = useMediaQuery('(min-width: 1024px)')
  return desktop ? <PinnedPrinciples /> : <MobilePrinciples />
}

function MobilePrinciples() {
  return (
    <section className="bg-navy py-16 text-white">
      <div className="container-x">
        <Eyebrow light>Our principles</Eyebrow>
        <TextReveal text="What guides every conversation." className="mt-4 text-4xl font-extrabold tracking-tight" />
      </div>
      <div className="mt-10 no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
        {storyPrinciples.map((p) => (
          <PrincipleCard key={p.id} principle={p} />
        ))}
      </div>
    </section>
  )
}

/** Horizontally scrolling principles, pinned while the page scrolls vertically. */
function PinnedPrinciples() {
  const ref = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  useLayoutEffect(() => {
    const measure = () => trackRef.current && setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 40))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <section ref={ref} className="relative bg-navy text-white" style={{ height: `${storyPrinciples.length * 80}vh` }}>
      <div className="grain sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-x mb-10 flex items-end justify-between">
          <div>
            <Eyebrow light>Our principles</Eyebrow>
            <TextReveal text="What guides every conversation." className="mt-4 text-5xl font-extrabold tracking-[-0.03em]" />
          </div>
          <div className="h-1 w-48 overflow-hidden rounded-full bg-white/15">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-teal-300" />
          </div>
        </div>
        <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-6 pr-10 pl-[max(2.5rem,calc((100vw-1360px)/2+2.5rem))]">
          {storyPrinciples.map((p) => (
            <PrincipleCard key={p.id} principle={p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function PrincipleCard({ principle }: { principle: (typeof storyPrinciples)[number] }) {
  return (
    <article className="group relative grid h-[460px] w-[82vw] shrink-0 snap-start overflow-hidden rounded-[28px] bg-white/[0.06] ring-1 ring-white/10 sm:w-[420px] lg:h-[54vh] lg:w-[min(780px,58vw)] lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col justify-between p-7 lg:p-10">
        <span className="text-7xl leading-none font-extrabold tracking-tighter text-teal-300/80 transition-colors duration-500 group-hover:text-teal-300">
          {principle.number}
        </span>
        <div>
          <h3 className="text-3xl font-extrabold tracking-tight lg:text-4xl">{principle.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/75 lg:text-base">{principle.body}</p>
        </div>
      </div>
      <ParallaxImage
        src={principle.image}
        alt=""
        className="hidden h-full lg:block"
        imgClassName="transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110"
        strength={4}
      />
    </article>
  )
}
