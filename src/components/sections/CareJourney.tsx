import { Fragment } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { EASE, useReveal } from '@/components/ui/motion'
import { Eyebrow } from '@/components/ui/Section'
import { journeySteps } from '@/data/content'

/** Three-step care journey card with a connecting line that draws in. */
export function CareJourney({ className }: { className?: string }) {
  const [ref, show] = useReveal<HTMLDivElement>(0.35)
  return (
    <section className={className ?? 'py-6'}>
      <div className="container-x">
        <div ref={ref} className="rounded-[28px] border border-sky-200 bg-gradient-to-b from-white to-sky-50 p-6 shadow-[0_2px_0_rgb(8_38_76/0.02)] sm:p-10">
          <Eyebrow className="mb-8">A simple care journey</Eyebrow>
          <ol className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center md:gap-6">
            {journeySteps.map((step, i) => (
              <Fragment key={step.id}>
                <motion.li
                  initial={{ opacity: 0, y: 24 }}
                  animate={show ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: i * 0.18, ease: EASE }}
                  className="group flex items-center gap-5 rounded-2xl bg-white p-4 ring-1 ring-sky-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft hover:ring-teal/30 md:bg-transparent md:p-0 md:ring-0 md:hover:translate-y-0 md:hover:shadow-none"
                >
                  <span className="relative grid size-14 shrink-0 place-items-center rounded-full bg-teal text-lg font-bold text-white shadow-glow transition-transform duration-500 ease-out-expo group-hover:scale-110">
                    <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-teal/40" />
                    </span>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <Icon name={step.icon} size={30} strokeWidth={1.4} className="mb-2 text-navy transition-colors duration-300 group-hover:text-teal" />
                    <h3 className="text-base font-bold text-navy">{step.title}</h3>
                    <p className="mt-0.5 max-w-[15rem] text-sm text-slate">{step.description}</p>
                  </div>
                </motion.li>
                {i < journeySteps.length - 1 && (
                  <motion.span
                    aria-hidden
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={show ? { scaleX: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.18, ease: EASE }}
                    className="hidden origin-left items-center text-navy md:flex"
                  >
                    <span className="h-px w-10 bg-gradient-to-r from-transparent to-navy/40 lg:w-16" />
                    <Icon name="chevronRight" size={18} />
                  </motion.span>
                )}
              </Fragment>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
