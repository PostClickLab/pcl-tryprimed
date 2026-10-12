import { cn } from '@/lib/cn'
import type { Treatment } from '@/types'

const VEINS = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='40'%3E%3Cpath d='M0 20 Q50 5 100 22 T200 15' stroke='%23b8c6d0' stroke-width='.6' fill='none' opacity='.6'/%3E%3C/svg%3E")`

/** Marble-like cylindrical pedestal rendered in CSS. */
export function Pedestal({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('relative', className)}>
      <div className="absolute inset-x-0 top-[18%] bottom-0 rounded-b-[50%/18%] bg-[linear-gradient(90deg,#d9e3ea_0%,#ffffff_35%,#f2f6f8_60%,#c9d6df_100%)] shadow-[0_40px_60px_-30px_rgb(8_38_76/0.45)]" />
      <div className="absolute inset-x-0 top-0 aspect-[5/1] rounded-[50%] bg-[radial-gradient(ellipse_at_40%_40%,#ffffff,#e7eef2_60%,#d2dde4)] shadow-[inset_0_-2px_6px_rgb(8_38_76/0.08)]" />
      <div className="absolute inset-x-0 top-0 aspect-[5/1] rounded-[50%] bg-cover opacity-60" style={{ backgroundImage: VEINS }} />
    </div>
  )
}

/**
 * Renders a treatment image appropriately: transparent vials float above a
 * pedestal, lifestyle/product photos fill a rounded frame.
 */
export function ProductVisual({
  treatment,
  className,
  size = 'md',
  priority,
}: {
  treatment: Treatment
  className?: string
  size?: 'sm' | 'md' | 'lg'
  priority?: boolean
}) {
  if (treatment.imageKind === 'photo') {
    return (
      <div className={cn('relative h-full w-full overflow-hidden', className)}>
        <img
          src={treatment.image}
          alt={treatment.name}
          loading={priority ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover/card:scale-[1.06]"
        />
      </div>
    )
  }
  return (
    <div className={cn('relative flex h-full w-full items-end justify-center', className)}>
      <div className={cn('absolute bottom-[6%] left-1/2 -translate-x-1/2', size === 'sm' ? 'w-[62%]' : size === 'md' ? 'w-[58%]' : 'w-[64%]')}>
        <Pedestal className="aspect-[5/2] w-full" />
      </div>
      <img
        src={treatment.image}
        alt={treatment.name}
        loading={priority ? 'eager' : 'lazy'}
        className={cn(
          'relative z-10 w-auto object-contain drop-shadow-[0_30px_30px_rgb(8_38_76/0.25)] transition-transform duration-[1.2s] ease-out-expo group-hover/card:-translate-y-3 group-hover/card:rotate-[-3deg]',
          size === 'sm' ? 'mb-[13%] h-[72%]' : size === 'md' ? 'mb-[14%] h-[76%]' : 'mb-[16%] h-[78%]',
        )}
      />
    </div>
  )
}
