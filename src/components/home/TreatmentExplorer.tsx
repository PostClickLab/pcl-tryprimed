import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { ArrowLink } from '@/components/ui/Button'
import { Icon, type IconName } from '@/components/ui/Icon'
import { EASE, Reveal, TextReveal } from '@/components/ui/motion'
import { Pedestal } from '@/components/ui/ProductVisual'
import { Eyebrow } from '@/components/ui/Section'
import { formats } from '@/data/goals'
import { products } from '@/data/media'
import { treatments } from '@/data/treatments'
import { cn } from '@/lib/cn'
import { useFinePointer } from '@/lib/hooks'
import type { Format } from '@/types'

type Group = Format['group']

const tabs: { id: Group; label: string; short: string; icon: IconName; link: string }[] = [
  { id: 'injection', label: 'Injection options', short: 'Injection', icon: 'syringe', link: '/treatments?format=injection' },
  { id: 'oral', label: 'Oral options', short: 'Oral', icon: 'pill', link: '/treatments?format=oral' },
  { id: 'topical-nasal', label: 'Topical & nasal', short: 'Topical & nasal', icon: 'tube', link: '/treatments?format=topical' },
]

const inGroup = (group: Group) => treatments.filter((t) => formats.find((f) => f.id === t.format)?.group === group)
const vials = inGroup('injection')

export function TreatmentExplorer() {
  const [tab, setTab] = useState<Group>('injection')
  const [vial, setVial] = useState(0)
  const fine = useFinePointer()
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 })
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 })

  useEffect(() => {
    if (tab !== 'injection') return
    const t = window.setInterval(() => setVial((v) => (v + 1) % vials.length), 3200)
    return () => clearInterval(t)
  }, [tab])

  const current = tabs.find((t) => t.id === tab)!

  return (
    <section className="relative mt-6 overflow-hidden bg-gradient-to-br from-sky via-sky-50 to-white py-14 sm:mt-10 lg:py-0">
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 -left-40 size-[520px] animate-blob bg-gradient-to-br from-teal-100 to-transparent opacity-80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-30%] left-[30%] size-[420px] animate-blob rounded-full bg-white/70 [animation-delay:-5s]"
      />

      <div className="relative container-x grid items-center gap-8 lg:min-h-[560px] lg:grid-cols-2">
        <div
          className="relative order-2 h-[340px] sm:h-[420px] lg:order-1 lg:h-[520px]"
          onPointerMove={(e) => {
            if (!fine) return
            const r = e.currentTarget.getBoundingClientRect()
            ry.set(((e.clientX - r.left) / r.width - 0.5) * 18)
            rx.set(((e.clientY - r.top) / r.height - 0.5) * -12)
          }}
          onPointerLeave={() => {
            rx.set(0)
            ry.set(0)
          }}
          data-cursor={tab === 'injection' ? 'Drag' : undefined}
        >
          <AnimatePresence mode="wait">
            {tab === 'injection' && (
              <motion.div
                key="injection"
                className="absolute inset-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <Pedestal className="absolute bottom-[4%] left-1/2 aspect-[5/2] w-[64%] max-w-[420px] -translate-x-1/2" />
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.3}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) > 60) setVial((v) => (v + (info.offset.x < 0 ? 1 : vials.length - 1)) % vials.length)
                  }}
                  style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
                  className="absolute inset-x-0 top-0 bottom-[13%] flex cursor-grab items-end justify-center active:cursor-grabbing"
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.img
                      key={vials[vial].slug}
                      src={vials[vial].image}
                      alt={vials[vial].name}
                      draggable={false}
                      initial={{ opacity: 0, x: 80, rotate: 8 }}
                      animate={{ opacity: 1, x: 0, rotate: 0 }}
                      exit={{ opacity: 0, x: -80, rotate: -8 }}
                      transition={{ duration: 0.8, ease: EASE }}
                      className="h-[88%] w-auto drop-shadow-[0_40px_40px_rgb(8_38_76/0.3)]"
                    />
                  </AnimatePresence>
                </motion.div>
                <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-2">
                  {vials.map((v, i) => (
                    <button key={v.slug} aria-label={`Show ${v.name}`} onClick={() => setVial(i)} className="group p-1">
                      <span
                        className={cn(
                          'block h-1.5 rounded-full transition-all duration-500',
                          i === vial ? 'w-7 bg-teal' : 'w-1.5 bg-navy/20 group-hover:bg-navy/40',
                        )}
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
            {tab === 'oral' && (
              <motion.div
                key="oral"
                className="absolute inset-0 grid place-items-center"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <div className="aspect-square w-[82%] max-w-[460px] animate-blob overflow-hidden shadow-lift">
                  <img src={products.oralOptions} alt="Oral treatment capsules beside a glass of water" className="h-full w-full scale-110 object-cover" />
                </div>
              </motion.div>
            )}
            {tab === 'topical-nasal' && (
              <motion.div
                key="topical"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ x: -40, rotate: -6 }}
                  animate={{ x: 0, rotate: -4 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="absolute top-[12%] left-[4%] w-[58%] overflow-hidden rounded-[28px] shadow-lift"
                >
                  <img src={products.topicalCream} alt="Topical cream tube" className="aspect-[4/3] w-full object-cover" />
                </motion.div>
                <motion.div
                  initial={{ x: 40, rotate: 8 }}
                  animate={{ x: 0, rotate: 5 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                  className="absolute right-[4%] bottom-[8%] w-[52%] overflow-hidden rounded-[28px] shadow-lift ring-8 ring-white"
                >
                  <img src={products.nasalSpray} alt="Nasal spray bottle" className="aspect-[4/3] w-full object-cover" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="order-1 text-center lg:order-2 lg:py-20 lg:text-left">
          <Reveal y={12}>
            <Eyebrow className="hidden sm:block">Treatment options</Eyebrow>
          </Reveal>
          <TextReveal
            text={'Explore options with\nyour clinician.'}
            className="mt-3 text-[28px] leading-[1.08] font-extrabold tracking-[-0.025em] sm:text-[44px]"
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 hidden max-w-md text-base text-slate sm:block lg:mx-0">
              Discuss available treatment options to see what may be appropriate for you.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div
              role="tablist"
              aria-label="Treatment formats"
              className="mt-7 inline-flex w-full gap-1.5 rounded-2xl bg-white/70 p-1.5 shadow-soft ring-1 ring-sky-200 backdrop-blur sm:w-auto"
            >
              {tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    'relative flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-semibold transition-colors duration-300 sm:flex-none sm:px-4 sm:text-[13px]',
                    tab === t.id ? 'text-white' : 'text-navy hover:text-teal',
                  )}
                >
                  {tab === t.id && (
                    <motion.span
                      layoutId="explorer-tab"
                      className="absolute inset-0 rounded-xl bg-teal shadow-glow"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon name={t.icon} size={18} className="relative hidden sm:block" />
                  <span className="relative">
                    <span className="sm:hidden">{t.short}</span>
                    <span className="hidden sm:inline">{t.label}</span>
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.ul
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start"
            >
              {inGroup(tab).map((t, i) => (
                <li key={t.slug}>
                  <Link
                    to={`/treatments/${t.slug}`}
                    onMouseEnter={() => tab === 'injection' && setVial(i)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-300',
                      tab === 'injection' && i === vial
                        ? 'border-teal bg-teal/10 text-teal'
                        : 'border-navy/10 bg-white text-navy hover:border-teal hover:text-teal',
                    )}
                  >
                    {t.name}
                    {t.availability === 'waitlist' && <span className="rounded-full bg-navy/5 px-1.5 text-[10px] text-slate">Waitlist</span>}
                  </Link>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>

          <Reveal delay={0.35}>
            <ArrowLink to={current.link} className="mt-7">
              View treatment options
            </ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
