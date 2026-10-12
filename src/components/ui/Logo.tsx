import { useId } from 'react'
import { Link } from 'react-router'
import { motion, type MotionValue } from 'motion/react'
import { cn } from '@/lib/cn'

interface VialGlyphProps {
  className?: string
  /** 0–1 liquid level. Accepts a MotionValue for animated fills. */
  level?: number | MotionValue<number>
  liquidClassName?: string
  strokeWidth?: number
}

/** The vial that replaces the "I" in the PRIMED wordmark. */
export function VialGlyph({ className, level = 0.42, liquidClassName = 'fill-teal', strokeWidth = 2.6 }: VialGlyphProps) {
  const clipId = useId()
  // Liquid occupies the body of the vial: y 22 → 63 (41 units tall).
  const height = typeof level === 'number' ? 41 * level : undefined
  return (
    <svg viewBox="0 0 24 64" className={cn('inline-block h-[0.74em] w-auto overflow-visible', className)} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <path d="M5 21.5 1.5 26v31a5.5 5.5 0 0 0 5.5 5.5h10a5.5 5.5 0 0 0 5.5-5.5V26L19 21.5z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {typeof level === 'number' ? (
          <rect x="0" width="24" y={63 - (height ?? 0)} height={height} className={liquidClassName} />
        ) : (
          <motion.rect x="0" width="24" height="41" y="22" className={liquidClassName} style={{ scaleY: level, originY: 1, transformBox: 'fill-box' }} />
        )}
      </g>
      <g fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round">
        <rect x="3.5" y="1.5" width="17" height="7.5" rx="2" />
        <path d="M5.5 9v6.5L1.5 21v36a5.5 5.5 0 0 0 5.5 5.5h10a5.5 5.5 0 0 0 5.5-5.5V21l-4-5.5V9" />
      </g>
    </svg>
  )
}

export function Wordmark({ className, level }: { className?: string; level?: number }) {
  return (
    <span className={cn('inline-flex items-baseline leading-none font-extrabold tracking-[-0.02em]', className)}>
      PR
      <VialGlyph level={level} className="mx-[0.06em]" />
      MED
    </span>
  )
}

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link to="/" aria-label="PRIMED home" className={cn('group inline-flex', inverted ? 'text-white' : 'text-navy', className)}>
      <Wordmark className="text-[26px] transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]" />
    </Link>
  )
}
