import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useScroll, useTransform } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { Logo, VialGlyph } from '@/components/ui/Logo'
import { EASE, Reveal, useReveal } from '@/components/ui/motion'
import { footerNav, site } from '@/data/site'
import { useScrollTo } from '@/providers/SmoothScroll'

export function Footer() {
  const scrollTo = useScrollTo()
  return (
    <footer className="relative overflow-hidden bg-sky-50 pt-16 lg:pt-20">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <Reveal>
            <Logo />
            <p className="mt-5 text-xl font-semibold text-navy">{site.tagline}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate">{site.description}</p>
            <div className="mt-6 flex flex-col gap-2 text-sm">
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 font-semibold text-navy transition-colors hover:text-teal">
                <Icon name="mail" size={18} className="text-teal" /> {site.email}
              </a>
              <span className="inline-flex items-center gap-2 text-slate">
                <Icon name="clock" size={18} className="text-teal" /> {site.hours}
              </span>
            </div>
          </Reveal>

          <Reveal stagger={0.08} className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-sm font-bold text-navy">{col.title}</h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="group inline-flex items-center gap-1 text-sm text-slate transition-colors hover:text-teal">
                        <span className="w-0 overflow-hidden text-teal transition-all duration-300 group-hover:w-3">›</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-navy/10 pt-6 text-xs text-slate sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-3xl leading-relaxed">{site.disclaimer} If you are experiencing a medical emergency, call 911.</p>
          <div className="flex shrink-0 items-center gap-4">
            <p className="text-right">
              © {site.year} {site.name}.
              <br />
              All rights reserved.
            </p>
            <button
              onClick={() => scrollTo(0, { offset: 0 })}
              aria-label="Back to top"
              className="grid size-11 place-items-center rounded-full bg-white text-teal shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:bg-teal hover:text-white"
            >
              <Icon name="arrow" size={18} className="-rotate-90" />
            </button>
          </div>
        </div>
      </div>

      <GiantWordmark />
    </footer>
  )
}

/** Oversized low-contrast wordmark; letters rise in and the vial fills on scroll. */
function GiantWordmark() {
  const [ref, show] = useReveal<HTMLDivElement>(0.2)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start end', 'end end'] })
  const level = useTransform(scrollYProgress, [0, 1], [0, 0.85])
  const letters = ['P', 'R', 'vial', 'M', 'E', 'D']

  return (
    <div ref={scrollRef} className="mt-6 select-none" aria-hidden>
      <div
        ref={ref}
        className="flex items-baseline justify-center overflow-hidden text-[24vw] leading-[0.78] font-extrabold tracking-[-0.04em] text-sky-200 lg:text-[21vw]"
      >
        {letters.map((l, i) => (
          <motion.span
            key={l}
            initial={{ y: '100%' }}
            animate={show ? { y: '0%' } : { y: '100%' }}
            transition={{ duration: 1.2, delay: i * 0.06, ease: EASE }}
            className="inline-block transition-colors duration-500 hover:text-teal-200"
          >
            {l === 'vial' ? <VialGlyph level={level} strokeWidth={1.4} className="mx-[0.04em] h-[0.74em] text-sky-300" liquidClassName="fill-teal-200" /> : l}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
