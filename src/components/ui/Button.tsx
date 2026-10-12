import { type ComponentProps, type ReactNode, useRef } from 'react'
import { Link } from 'react-router'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { cn } from '@/lib/cn'
import { useFinePointer } from '@/lib/hooks'
import { Icon } from './Icon'

type Variant = 'primary' | 'navy' | 'white' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-teal text-white shadow-[0_10px_30px_-10px_rgb(0_155_173/0.7)] hover:shadow-glow',
  navy: 'bg-navy text-white hover:bg-navy-700',
  white: 'bg-white text-navy shadow-soft',
  outline: 'border border-navy/15 bg-white/60 text-navy backdrop-blur hover:border-teal hover:text-teal',
  ghost: 'text-teal hover:text-teal-700',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-[13px]',
  md: 'h-12 px-7 text-sm',
  lg: 'h-14 px-8 text-[15px]',
}

interface BaseProps {
  variant?: Variant
  size?: Size
  arrow?: boolean
  magnetic?: boolean
  icon?: ReactNode
  /** Stretch to the container width (used for mobile CTAs). */
  full?: boolean
  className?: string
  children: ReactNode
}

type ButtonProps = BaseProps &
  (
    | ({ to: string; href?: never } & Omit<ComponentProps<typeof Link>, 'to' | 'className' | 'children'>)
    | ({ href: string; to?: never } & Omit<ComponentProps<'a'>, 'className' | 'children'>)
    | ({ to?: never; href?: never } & Omit<ComponentProps<'button'>, 'className' | 'children'>)
  )

/**
 * Pill button with a magnetic pull, a liquid fill sweep and a sliding arrow.
 * Renders a router Link, an anchor or a native button depending on props.
 */
export function Button({ variant = 'primary', size = 'md', arrow, magnetic = true, icon, full, className, children, ...rest }: ButtonProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const fine = useFinePointer()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })

  const onMove = (e: React.PointerEvent) => {
    if (!magnetic || !fine || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const classes = cn(
    'group/btn relative isolate inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold whitespace-nowrap',
    'transition-[background-color,color,box-shadow,border-color] duration-300 disabled:pointer-events-none disabled:opacity-40',
    variant !== 'ghost' && sizes[size],
    variants[variant],
    full && 'w-full',
    className,
  )

  const content = (
    <>
      {variant === 'primary' && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 translate-y-full rounded-full bg-teal-700 transition-transform duration-500 ease-out-expo group-hover/btn:translate-y-0"
        />
      )}
      {(variant === 'primary' || variant === 'navy') && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 -z-[5] w-1/3 -skew-x-12 bg-white/25 blur-md transition-[left] duration-700 ease-out-expo group-hover/btn:left-[130%]"
        />
      )}
      {icon}
      <span className="relative">{children}</span>
      {arrow && (
        <span className="relative -mr-1 inline-flex size-5 overflow-hidden">
          <Icon
            name="arrow"
            size={18}
            strokeWidth={2}
            className="absolute inset-0 m-auto transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-6"
          />
          <Icon
            name="arrow"
            size={18}
            strokeWidth={2}
            className="absolute inset-0 m-auto -translate-x-6 transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-0"
          />
        </span>
      )}
    </>
  )

  let element: ReactNode
  if ('to' in rest && rest.to !== undefined) {
    const { to, ...linkProps } = rest
    element = (
      <Link to={to} className={classes} {...linkProps}>
        {content}
      </Link>
    )
  } else if ('href' in rest && rest.href !== undefined) {
    element = (
      <a className={classes} {...(rest as ComponentProps<'a'>)}>
        {content}
      </a>
    )
  } else {
    element = (
      <button className={classes} {...(rest as ComponentProps<'button'>)}>
        {content}
      </button>
    )
  }

  return (
    <motion.span ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className={full ? 'flex w-full' : 'inline-flex max-w-full'}>
      {element}
    </motion.span>
  )
}

/** Inline text link with an animated underline and arrow. */
export function ArrowLink({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={cn('group/link inline-flex items-center gap-2 text-sm font-semibold text-teal', className)}>
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1.5px] bg-[position:0_100%] bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-expo group-hover/link:bg-[length:0%_1.5px] group-hover/link:bg-[position:100%_100%]">
        {children}
      </span>
      <Icon name="arrow" size={16} strokeWidth={2} className="transition-transform duration-500 ease-out-expo group-hover/link:translate-x-1" />
    </Link>
  )
}
