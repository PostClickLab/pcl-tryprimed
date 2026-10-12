import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/motion'
import { SectionHeading } from '@/components/ui/Section'
import { cn } from '@/lib/cn'

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-xs font-medium text-slate', className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {[{ label: 'Home', to: '/' }, ...items].map((c, i, arr) => (
          <li key={c.label} className="flex items-center gap-1.5">
            {c.to && i < arr.length - 1 ? (
              <Link to={c.to} className="transition-colors hover:text-teal">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-navy">
                {c.label}
              </span>
            )}
            {i < arr.length - 1 && <Icon name="chevronRight" size={12} />}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Light hero used by inner pages, with organic shapes and an optional aside. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  aside,
  children,
  className,
}: {
  eyebrow?: string
  title: string
  lead?: ReactNode
  crumbs?: Crumb[]
  aside?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <section className={cn('relative overflow-hidden bg-gradient-to-b from-sky to-white pt-28 pb-12 sm:pb-16 lg:pt-36', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-32 size-[560px] animate-blob bg-gradient-to-br from-teal-100 via-teal-200/40 to-transparent"
      />
      <div aria-hidden className="pointer-events-none absolute bottom-0 -left-40 size-[380px] animate-blob bg-white/70 [animation-delay:-7s]" />
      <div className={cn('relative container-x', aside && 'grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]')}>
        <div>
          {crumbs && (
            <Reveal y={10}>
              <Breadcrumbs items={crumbs} className="mb-6" />
            </Reveal>
          )}
          <SectionHeading as="h1" eyebrow={eyebrow} title={title} lead={lead} />
          {children && (
            <Reveal delay={0.3} className="mt-8">
              {children}
            </Reveal>
          )}
        </div>
        {aside && (
          <Reveal delay={0.2} y={40}>
            {aside}
          </Reveal>
        )}
      </div>
    </section>
  )
}
