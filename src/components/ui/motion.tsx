import { Children, type ReactNode, useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { cn } from '@/lib/cn'
import { useFinePointer } from '@/lib/hooks'
import { useIntro } from '@/providers/IntroProvider'

export const EASE = [0.16, 1, 0.3, 1] as const

/** In-view trigger that also waits for the intro preloader to finish. */
export function useReveal<T extends Element>(amount = 0.25) {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { once: true, amount })
  const { ready } = useIntro()
  return [ref, inView && ready] as const
}

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
  scale?: number
  blur?: boolean
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: number
  as?: 'div' | 'section' | 'li' | 'ul' | 'span' | 'article'
}

export function Reveal({ children, className, delay = 0, y = 32, x = 0, scale = 1, blur = false, stagger, as = 'div' }: RevealProps) {
  const [ref, show] = useReveal<HTMLDivElement>(0.15)
  const Comp = motion[as] as typeof motion.div
  const hidden = { opacity: 0, y, x, scale, filter: blur ? 'blur(10px)' : 'blur(0px)' }
  const visible = { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' }

  if (stagger) {
    return (
      <Comp
        ref={ref}
        className={className}
        initial="hidden"
        animate={show ? 'show' : 'hidden'}
        variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      >
        {Children.map(children, (child) => (
          <motion.div variants={{ hidden, show: { ...visible, transition: { duration: 0.9, ease: EASE } } }}>{child}</motion.div>
        ))}
      </Comp>
    )
  }

  return (
    <Comp ref={ref} className={className} initial={hidden} animate={show ? visible : hidden} transition={{ duration: 1, delay, ease: EASE }}>
      {children}
    </Comp>
  )
}

/**
 * Masked word-by-word headline reveal.
 * Wrap words in *asterisks* to render them in the accent colour; use \n for line breaks.
 */
export function TextReveal({
  text,
  as = 'h2',
  className,
  delay = 0,
  stagger = 0.06,
  accentClassName = 'text-teal',
}: {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
  stagger?: number
  accentClassName?: string
}) {
  const [ref, show] = useReveal<HTMLHeadingElement>(0.3)
  const Tag = motion[as] as typeof motion.h2
  let index = 0
  const lines = text.split('\n')
  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\*/g, '')}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line
            .split(/(\*[^*]+\*)/g)
            .filter(Boolean)
            .map((chunk, ci) => {
              const accent = chunk.startsWith('*')
              return chunk
                .replace(/\*/g, '')
                .split(' ')
                .filter(Boolean)
                .map((word, wi) => {
                  const i = index++
                  return (
                    <span key={`${ci}-${wi}`} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                      <motion.span
                        className={cn('inline-block will-change-transform', accent && accentClassName)}
                        initial={{ y: '110%', rotate: 4 }}
                        animate={show ? { y: '0%', rotate: 0 } : { y: '110%', rotate: 4 }}
                        transition={{ duration: 1, delay: delay + i * stagger, ease: EASE }}
                      >
                        <TightPunctuation word={word} />
                      </motion.span>
                      {' '}
                    </span>
                  )
                })
            })}
        </span>
      ))}
    </Tag>
  )
}

/** Pulls a trailing period closer; the display font gives it a wide left bearing. */
function TightPunctuation({ word }: { word: string }) {
  if (word.length < 2 || !word.endsWith('.')) return word
  return (
    <>
      {word.slice(0, -1)}
      <span className="-ml-[0.06em]">.</span>
    </>
  )
}

/** Paragraph whose words light up as it scrolls through the viewport. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={cn('flex flex-wrap', className)}>
      {words.map((word, i) => (
        <ScrollWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </ScrollWord>
      ))}
    </p>
  )
}

function ScrollWord({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const y = useTransform(progress, range, [6, 0])
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  )
}

/** Image that drifts against the scroll direction inside an overflow-hidden frame. */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  strength = 12,
  eager,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  strength?: number
  eager?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])
  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={{ y, scale: 1 + strength / 50 }}
        className={cn('absolute inset-0 h-full w-full object-cover', imgClassName)}
      />
    </div>
  )
}

/** Card with a cursor-following radial highlight and optional 3D tilt. */
export function SpotlightCard({
  children,
  className,
  tilt = false,
  glow = 'rgb(0 155 173 / 0.16)',
}: {
  children: ReactNode
  className?: string
  tilt?: boolean
  glow?: string
}) {
  const fine = useFinePointer()
  const mx = useMotionValue(-400)
  const my = useMotionValue(-400)
  const rx = useSpring(0, { stiffness: 160, damping: 18 })
  const ry = useSpring(0, { stiffness: 160, damping: 18 })
  const background = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, ${glow}, transparent 65%)`

  return (
    <motion.div
      onPointerMove={(e) => {
        if (!fine) return
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(e.clientX - r.left)
        my.set(e.clientY - r.top)
        if (tilt) {
          rx.set(((e.clientY - r.top) / r.height - 0.5) * -8)
          ry.set(((e.clientX - r.left) / r.width - 0.5) * 8)
        }
      }}
      onPointerLeave={() => {
        mx.set(-400)
        my.set(-400)
        rx.set(0)
        ry.set(0)
      }}
      style={tilt ? { rotateX: rx, rotateY: ry, transformPerspective: 1000 } : undefined}
      className={cn('group/card relative isolate', className)}
    >
      <motion.div
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
      />
      {children}
    </motion.div>
  )
}

/** Infinite horizontal ticker. Pauses on hover. */
export function Marquee({ children, className, reverse }: { children: ReactNode; className?: string; reverse?: boolean }) {
  return (
    <div className={cn('group/marquee flex overflow-hidden mask-fade-x', className)}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="flex shrink-0 animate-marquee items-center group-hover/marquee:[animation-play-state:paused]"
          style={reverse ? { animationDirection: 'reverse' } : undefined}
        >
          {children}
          {children}
        </div>
      ))}
    </div>
  )
}

/** Number that counts up once visible. */
export function Counter({ to, suffix = '', className }: { to: number; suffix?: string; className?: string }) {
  const [ref, show] = useReveal<HTMLSpanElement>(0.6)
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!show) return
    const controls = animate(0, to, { duration: 1.8, ease: EASE, onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [show, to])
  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {value}
      {suffix}
    </span>
  )
}
