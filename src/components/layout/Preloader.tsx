import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue } from 'motion/react'
import { VialGlyph } from '@/components/ui/Logo'
import { EASE } from '@/components/ui/motion'
import { criticalImages } from '@/data/media'
import { useReducedMotion } from '@/lib/hooks'
import { useIntro } from '@/providers/IntroProvider'

const MESSAGES = ['Share your goals.', 'Talk to a clinician.', 'Plan your next chapter.']
const SESSION_KEY = 'primed:intro-seen'

type Phase = 'loading' | 'flood' | 'reveal' | 'gone'

function preload(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = img.onerror = () => resolve()
    img.src = src
  })
}

/**
 * Intro sequence:
 * 1. The vial inside the PRIMED wordmark fills as critical assets load (real progress, eased).
 * 2. Teal liquid floods the screen from the vial.
 * 3. The panel drains upward with a liquid edge, revealing the page.
 */
export function Preloader() {
  const { setReady } = useIntro()
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('loading')
  const [message, setMessage] = useState(0)
  const [percent, setPercent] = useState(0)
  const progress = useMotionValue(0)
  const vialRef = useRef<HTMLSpanElement>(null)
  const [origin, setOrigin] = useState({ x: '50%', y: '50%' })

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1'
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* ignore */
    }
    const minDuration = reduced ? 300 : seen ? 1100 : 2600
    const tasks = [...criticalImages.map(preload), document.fonts?.ready.then(() => undefined) ?? Promise.resolve()]
    let done = 0
    let target = 0
    tasks.forEach((t) => t.then(() => (target = ++done / tasks.length)))
    const fallback = window.setTimeout(() => (target = 1), 7000)

    const start = performance.now()
    let shown = 0
    let frame = 0
    const tick = (now: number) => {
      const cap = Math.min(1, (now - start) / minDuration)
      shown += (Math.min(cap, target) - shown) * 0.09
      if (Math.min(cap, target) === 1 && shown > 0.995) shown = 1
      progress.set(shown)
      setPercent(Math.round(shown * 100))
      setMessage(Math.min(MESSAGES.length - 1, Math.floor(shown * MESSAGES.length)))
      if (shown >= 1) {
        const r = vialRef.current?.getBoundingClientRect()
        if (r) setOrigin({ x: `${r.left + r.width / 2}px`, y: `${r.top + r.height * 0.7}px` })
        window.setTimeout(() => setPhase('flood'), reduced ? 0 : 250)
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(fallback)
    }
  }, [progress, reduced])

  useEffect(() => {
    if (phase === 'flood') {
      const t = window.setTimeout(() => setPhase('reveal'), reduced ? 0 : 750)
      return () => clearTimeout(t)
    }
    if (phase === 'reveal') {
      document.documentElement.style.overflow = ''
      setReady(true)
    }
  }, [phase, reduced, setReady])

  const flooding = phase === 'flood' || phase === 'reveal'

  return (
    <AnimatePresence onExitComplete={() => setPhase('gone')}>
      {phase !== 'reveal' && phase !== 'gone' && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label={`Loading PRIMED, ${percent}%`}
          className="fixed inset-0 z-[100] text-white"
          exit={{ y: '-100%' }}
          transition={{ duration: reduced ? 0.2 : 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 overflow-hidden bg-navy">
            {/* Ambient shapes */}
            <div aria-hidden className="grain absolute inset-0">
              <motion.div
                className="absolute top-[10%] -left-[20%] size-[70vmax] animate-blob bg-gradient-to-br from-teal/35 to-transparent blur-3xl"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <div className="absolute -right-[20%] -bottom-[30%] size-[60vmax] animate-blob bg-gradient-to-tl from-teal-200/20 to-transparent blur-3xl [animation-delay:-8s]" />
            </div>

            {/* Grid lines */}
            <div
              aria-hidden
              className="absolute inset-0 [background-image:linear-gradient(to_right,white_1px,transparent_1px)] [background-size:calc(100%/6)_100%] opacity-[0.07]"
            />

            <div className="relative flex h-full flex-col justify-between p-5 sm:p-10">
              <div className="flex items-start justify-between text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase">
                <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: EASE }}>
                  Personalized online care
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
                  className="hidden sm:block"
                >
                  Est. {new Date().getFullYear()}
                </motion.span>
              </div>

              <div className="flex flex-col items-center">
                <motion.div
                  className="flex items-baseline text-[22vw] leading-none font-extrabold tracking-[-0.03em] sm:text-[15vw] lg:text-[12rem]"
                  animate={flooding ? { opacity: 0, scale: 1.08, filter: 'blur(12px)' } : {}}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <span className="overflow-hidden pb-[0.05em]">
                    <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}>
                      PR
                    </motion.span>
                  </span>
                  <motion.span
                    ref={vialRef}
                    className="mx-[0.05em] inline-block"
                    initial={{ y: 40, opacity: 0, rotate: -12 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    transition={{ duration: 1.2, ease: EASE, delay: 0.25 }}
                  >
                    <VialGlyph level={progress} strokeWidth={2} className="h-[0.76em] text-white" liquidClassName="fill-teal" />
                  </motion.span>
                  <span className="overflow-hidden pb-[0.05em]">
                    <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.18 }}>
                      MED
                    </motion.span>
                  </span>
                </motion.div>

                <div className="mt-6 h-7 overflow-hidden text-center text-base font-medium text-white/80 sm:text-lg">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={message}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: '-100%', opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      {MESSAGES[message]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-end justify-between gap-6">
                <div className="w-full max-w-xs">
                  <div className="mb-3 text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase">More life. More you.</div>
                  <div className="h-px w-full bg-white/15">
                    <motion.div className="h-px origin-left bg-teal-300" style={{ scaleX: progress }} />
                  </div>
                </div>
                <div className="text-[18vw] leading-[0.8] font-extrabold tracking-[-0.05em] text-white/90 tabular-nums sm:text-[9rem]">
                  {String(percent).padStart(3, '0')}
                </div>
              </div>
            </div>

            {/* Flood: a teal circle bursting out of the vial */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal"
              style={{ left: origin.x, top: origin.y }}
              initial={{ scale: 0 }}
              animate={flooding ? { scale: 120 } : { scale: 0 }}
              transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
            />
          </div>

          {/* Liquid edge trailing the panel as it drains upward */}
          <svg aria-hidden viewBox="0 0 100 10" preserveAspectRatio="none" className="absolute top-full left-0 h-[14vh] w-full fill-teal">
            <path d="M0 0h100v2C75 10 25 10 0 2z" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
