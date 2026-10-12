import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from '@/lib/hooks'

const LenisContext = createContext<Lenis | null>(null)

/** Inertia-based smooth scrolling for the whole document. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduced) return
    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true,
      anchors: { offset: -96 },
    })
    setLenis(instance)
    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export const useLenis = () => useContext(LenisContext)

/** Scrolls to a target (selector, element or y offset) using Lenis when available. */
export function useScrollTo() {
  const lenis = useLenis()
  return (target: string | HTMLElement | number, opts: { offset?: number; immediate?: boolean } = {}) => {
    const offset = opts.offset ?? -96
    if (lenis) {
      lenis.scrollTo(target, { offset, immediate: opts.immediate, duration: 1.4 })
      return
    }
    const el = typeof target === 'string' ? document.querySelector(target) : typeof target === 'number' ? null : target
    const top = typeof target === 'number' ? target : el ? el.getBoundingClientRect().top + window.scrollY + offset : 0
    window.scrollTo({ top, behavior: opts.immediate ? 'instant' : 'smooth' })
  }
}

/** Pauses smooth scrolling while overlays (menus, dialogs) are open. */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis()
  useEffect(() => {
    if (!locked) return
    lenis?.stop()
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = prev
    }
  }, [locked, lenis])
}
