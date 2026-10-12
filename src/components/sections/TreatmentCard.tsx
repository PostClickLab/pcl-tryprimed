import { Link } from 'react-router'
import { Icon } from '@/components/ui/Icon'
import { SpotlightCard } from '@/components/ui/motion'
import { ProductVisual } from '@/components/ui/ProductVisual'
import { formatById, goalById } from '@/data/goals'
import { cn } from '@/lib/cn'
import type { Treatment } from '@/types'

export function TreatmentCard({ treatment, className }: { treatment: Treatment; className?: string }) {
  const format = formatById(treatment.format)
  return (
    <SpotlightCard tilt className={cn('h-full rounded-[26px]', className)}>
      <Link
        to={`/treatments/${treatment.slug}`}
        data-cursor="View"
        className="flex h-full flex-col overflow-hidden rounded-[26px] bg-white ring-1 ring-sky-200 transition-shadow duration-500 group-hover/card:shadow-lift group-hover/card:ring-teal/30"
      >
        <div
          className={cn(
            'relative aspect-[4/3.6] overflow-hidden',
            treatment.imageKind === 'cutout' ? 'bg-[radial-gradient(circle_at_50%_35%,#ffffff,#eaf6fb_55%,#d6ecf5)]' : 'bg-sky',
          )}
        >
          <ProductVisual treatment={treatment} size="sm" />
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-navy shadow-sm backdrop-blur">
              <Icon name={format.icon} size={13} className="text-teal" /> {format.label}
            </span>
            {treatment.availability === 'waitlist' && <span className="rounded-full bg-navy px-2.5 py-1 text-[11px] font-semibold text-white">Waitlist</span>}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-extrabold tracking-tight text-navy">{treatment.name}</h3>
            <span className="grid size-10 shrink-0 -rotate-45 place-items-center rounded-full bg-sky text-teal transition-all duration-500 ease-out-expo group-hover/card:rotate-0 group-hover/card:bg-teal group-hover/card:text-white">
              <Icon name="arrow" size={18} strokeWidth={2} />
            </span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate">{treatment.tagline}</p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
            {treatment.goals.map((g) => (
              <span key={g} className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-medium text-slate ring-1 ring-sky-200">
                {goalById(g).label}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </SpotlightCard>
  )
}
