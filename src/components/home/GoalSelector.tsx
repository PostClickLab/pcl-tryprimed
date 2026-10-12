import { useState } from 'react'
import { useNavigate } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { EASE, Reveal, TextReveal } from '@/components/ui/motion'
import { Eyebrow } from '@/components/ui/Section'
import { goals } from '@/data/goals'
import { photos } from '@/data/media'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import type { GoalId } from '@/types'

/** Interactive "What brings you here?" panel; selection carries into the consultation. */
export function GoalSelector() {
  const [selected, setSelected] = useState<GoalId[]>(['weight-management'])
  const navigate = useNavigate()
  const latest = selected.length ? goals.find((g) => g.id === selected[selected.length - 1]) : undefined
  const image = latest?.image ?? photos.careLifestyle

  const toggle = (id: GoalId) => setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  return (
    <section className="py-4 sm:py-6">
      <div className="container-x">
        <div className="grain relative isolate overflow-hidden rounded-[28px] bg-navy text-white">
          <div className="absolute inset-y-0 right-0 hidden w-[50%] lg:block">
            {/* Teal glow behind the feathered photo */}
            <div
              aria-hidden
              className="absolute top-1/2 left-0 aspect-square h-[150%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgb(0_155_173/0.35),transparent_62%)]"
            />
            <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent_6%,black_46%)]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={image}
                  src={image}
                  alt=""
                  initial={{ opacity: 0, scale: 1.1, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover object-[50%_22%]"
                />
              </AnimatePresence>
            </div>
          </div>

          <div className="relative px-5 py-9 sm:px-10 sm:py-12 lg:w-[64%] lg:py-14">
            <Reveal y={12}>
              <Eyebrow light className="hidden text-white/80 sm:block">
                Personalized care starts here
              </Eyebrow>
            </Reveal>
            <TextReveal text="What brings you here?" className="mt-3 text-center text-[30px] font-extrabold tracking-[-0.02em] sm:text-left sm:text-[40px]" />
            <Reveal delay={0.15}>
              <p className="mt-2 hidden text-white/80 sm:block">Discuss your goals with a clinician.</p>
            </Reveal>

            <Reveal stagger={0.07} delay={0.2} className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              {goals.map((goal) => {
                const active = selected.includes(goal.id)
                return (
                  <button
                    key={goal.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggle(goal.id)}
                    className={cn(
                      'group relative flex h-[68px] w-full items-center gap-3 rounded-xl bg-white px-3.5 text-left text-navy transition-all duration-500 ease-out-expo sm:w-auto sm:min-w-[118px] sm:px-4',
                      active ? 'shadow-glow ring-[3px] ring-teal' : 'ring-1 ring-white/10 hover:-translate-y-1 hover:shadow-lift',
                    )}
                  >
                    <span
                      className={cn(
                        'relative grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-500',
                        active ? 'bg-teal text-white' : 'bg-sky text-navy group-hover:text-teal sm:bg-transparent',
                      )}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={active ? 'check' : 'icon'}
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon name={active ? 'check' : goal.icon} size={active ? 18 : 24} strokeWidth={active ? 2.4 : 1.5} />
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className="text-[13px] leading-tight font-semibold whitespace-pre-line">{goal.shortLabel}</span>
                  </button>
                )
              })}
            </Reveal>

            <Reveal delay={0.4} className="mt-6 sm:max-w-[430px]">
              <Button
                full
                size="lg"
                arrow
                magnetic={false}
                onClick={() => navigate(`${site.consultationPath}${selected.length ? `?goals=${selected.join(',')}` : ''}`)}
              >
                Continue to consultation
              </Button>
              <AnimatePresence>
                {selected.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 text-center text-xs text-white/60 sm:text-left"
                  >
                    {selected.length} goal{selected.length > 1 ? 's' : ''} selected · you can change this later
                  </motion.p>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
