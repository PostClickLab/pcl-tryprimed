import { type ReactNode, useEffect, useState } from 'react'
import { useLocation, useOutlet } from 'react-router'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Wordmark } from '@/components/ui/Logo'
import { site } from '@/data/site'
import { useLenis, useScrollTo } from '@/providers/SmoothScroll'
import { CommandPalette } from './CommandPalette'
import { Cursor } from './Cursor'
import { Footer } from './Footer'
import { Header } from './Header'
import { Preloader } from './Preloader'
import { ScrollProgress } from './ScrollProgress'

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const

export function Layout() {
  const location = useLocation()
  const outlet = useOutlet()
  const lenis = useLenis()
  const scrollTo = useScrollTo()

  // Jump to hash targets after the new page mounts.
  useEffect(() => {
    if (!location.hash) return
    const t = window.setTimeout(() => scrollTo(location.hash), 700)
    return () => clearTimeout(t)
  }, [location.hash, location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Header />
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          lenis?.scrollTo(0, { immediate: true, force: true })
          window.scrollTo(0, 0)
        }}
      >
        <Page key={location.pathname}>{outlet}</Page>
      </AnimatePresence>
      <MobileCtaBar hidden={location.pathname.startsWith(site.consultationPath)} />
      <CommandPalette />
      <Cursor />
    </>
  )
}

/** Freezes the outgoing route and wipes a navy curtain across route changes. */
function Page({ children }: { children: ReactNode }) {
  const [frozen] = useState(children)
  return (
    <div>
      <main id="main">{frozen}</main>
      <Footer />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] grid place-items-center bg-navy text-white"
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={{ clipPath: 'inset(100% 0 0 0)' }}
        exit={{ clipPath: 'inset(0% 0 0 0)' }}
        transition={{ duration: 0.6, ease: CURTAIN_EASE }}
      >
        <Wordmark className="text-5xl sm:text-7xl" level={0.6} />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] bg-navy"
        initial={{ clipPath: 'inset(0 0 0% 0)' }}
        animate={{ clipPath: 'inset(0 0 100% 0)' }}
        exit={{ clipPath: 'inset(0 0 100% 0)' }}
        transition={{ duration: 0.7, ease: CURTAIN_EASE, delay: 0.05 }}
      />
    </div>
  )
}

function MobileCtaBar({ hidden }: { hidden: boolean }) {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => {
    // Hide while a section that already shows the consultation CTA is on screen.
    const ctaVisible = [...document.querySelectorAll('[data-cta-zone]')].some((el) => {
      const r = el.getBoundingClientRect()
      return r.top < window.innerHeight && r.bottom > 0
    })
    setShow(y > 650 && !ctaVisible)
  })
  return (
    <AnimatePresence>
      {show && !hidden && (
        <motion.div
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 rounded-full bg-white/90 p-1.5 shadow-lift ring-1 ring-navy/5 backdrop-blur-xl sm:hidden"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
          <Button to={site.consultationPath} arrow full magnetic={false}>
            Start my consultation
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
