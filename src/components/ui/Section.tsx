import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal, TextReveal } from './motion'

export function Eyebrow({ children, className, light }: { children: ReactNode; className?: string; light?: boolean }) {
  return <p className={cn('eyebrow', light ? 'text-teal-200' : 'text-teal', className)}>{children}</p>
}

/** Eyebrow + animated headline + optional lead paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
  align = 'left',
  light,
  as = 'h2',
  titleClassName,
}: {
  eyebrow?: string
  title: string
  lead?: ReactNode
  className?: string
  align?: 'left' | 'center'
  light?: boolean
  as?: 'h1' | 'h2'
  titleClassName?: string
}) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <Reveal y={12}>
          <Eyebrow light={light} className="mb-4">
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <TextReveal
        as={as}
        text={title}
        className={cn(
          'font-extrabold tracking-[-0.03em] text-balance',
          as === 'h1' ? 'text-[44px] leading-[0.98] sm:text-6xl lg:text-[80px]' : 'text-[34px] leading-[1.05] sm:text-5xl',
          light ? 'text-white' : 'text-navy',
          titleClassName,
        )}
      />
      {lead && (
        <Reveal delay={0.2} y={16}>
          <p
            className={cn(
              'mt-5 max-w-xl text-base leading-relaxed text-pretty sm:text-lg',
              align === 'center' && 'mx-auto',
              light ? 'text-white/75' : 'text-slate',
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  )
}
