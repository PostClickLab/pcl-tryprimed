import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useFinePointer, useReducedMotion } from '@/lib/hooks'

/**
 * Trailing cursor ring. Elements can opt into a labelled state with
 * `data-cursor="View"`; links and buttons make the ring contract.
 */
export function Cursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })
  const [label, setLabel] = useState<string | null>(null)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!fine || reduced) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target as HTMLElement
      const labelled = target.closest<HTMLElement>('[data-cursor]')
      setLabel(labelled?.dataset.cursor ?? null)
      setHovering(!!target.closest('a, button, [role="button"], input, select, textarea, label'))
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [fine, reduced, x, y])

  if (!fine || reduced) return null

  return (
    <motion.div aria-hidden className="pointer-events-none fixed top-0 left-0 z-[90]" style={{ x: sx, y: sy }}>
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-teal/70 text-[11px] font-bold tracking-[0.18em] text-white uppercase"
        animate={{
          width: label ? 88 : hovering ? 18 : 36,
          height: label ? 88 : hovering ? 18 : 36,
          backgroundColor: label ? 'rgba(0,155,173,0.92)' : hovering ? 'rgba(0,155,173,0.25)' : 'rgba(0,155,173,0)',
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}>
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
