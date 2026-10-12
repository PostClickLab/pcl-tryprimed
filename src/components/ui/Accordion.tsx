import { type ReactNode, useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/cn'
import { EASE } from './motion'

export interface AccordionItemData {
  id: string
  title: ReactNode
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItemData[]
  className?: string
  itemClassName?: string
  /** Allow several panels open at once. */
  multiple?: boolean
  defaultOpen?: string[]
  variant?: 'card' | 'line'
}

export function Accordion({ items, className, itemClassName, multiple, defaultOpen = [], variant = 'card' }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen)
  const toggle = (id: string) => setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : multiple ? [...prev, id] : [id]))

  return (
    <div className={className}>
      {items.map((item) => (
        <AccordionItem key={item.id} item={item} open={open.includes(item.id)} onToggle={() => toggle(item.id)} className={itemClassName} variant={variant} />
      ))}
    </div>
  )
}

function AccordionItem({
  item,
  open,
  onToggle,
  className,
  variant,
}: {
  item: AccordionItemData
  open: boolean
  onToggle: () => void
  className?: string
  variant: 'card' | 'line'
}) {
  const id = useId()
  return (
    <div
      className={cn(
        'group/acc transition-[background-color,border-color,box-shadow] duration-500',
        variant === 'card' && 'rounded-2xl border border-sky-200 bg-white hover:border-teal/40 hover:shadow-soft',
        variant === 'card' && open && 'border-teal/40 shadow-soft',
        variant === 'line' && 'border-b border-navy/10',
        className,
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className={cn(
          'flex w-full items-center justify-between gap-6 text-left font-semibold text-navy',
          variant === 'card' ? 'px-5 py-4 text-[15px] sm:px-6' : 'py-5 text-base sm:text-lg',
        )}
      >
        <span>{item.title}</span>
        <span
          className={cn(
            'relative grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-out-expo',
            open ? 'rotate-180 border-teal bg-teal text-white' : 'border-navy/15 text-navy group-hover/acc:border-teal group-hover/acc:text-teal',
          )}
        >
          <span className="absolute h-[1.6px] w-3 rounded bg-current" />
          <span className={cn('absolute h-3 w-[1.6px] rounded bg-current transition-transform duration-500 ease-out-expo', open && 'scale-y-0')} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="overflow-hidden"
          >
            <div className={cn('text-[15px] leading-relaxed text-slate', variant === 'card' ? 'px-5 pb-5 sm:px-6' : 'pr-10 pb-6')}>{item.content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
