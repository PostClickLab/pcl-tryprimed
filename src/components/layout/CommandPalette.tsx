import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Icon, type IconName } from '@/components/ui/Icon'
import { EASE } from '@/components/ui/motion'
import { faqs } from '@/data/faqs'
import { goals } from '@/data/goals'
import { legalDocs } from '@/data/legal'
import { mainNav, site } from '@/data/site'
import { treatments } from '@/data/treatments'
import { cn } from '@/lib/cn'
import { useScrollLock } from '@/providers/SmoothScroll'

const OPEN_EVENT = 'primed:open-search'
export const openSearch = () => window.dispatchEvent(new Event(OPEN_EVENT))

interface Entry {
  id: string
  group: string
  title: string
  subtitle?: string
  to: string
  icon: IconName
  keywords: string
}

const index: Entry[] = [
  {
    id: 'consult',
    group: 'Quick actions',
    title: 'Start my consultation',
    subtitle: 'Share your goals with a clinician',
    to: site.consultationPath,
    icon: 'consultation',
    keywords: 'start begin quiz intake',
  },
  ...mainNav.map((n) => ({ id: `page-${n.to}`, group: 'Pages', title: n.label, to: n.to, icon: 'arrowUpRight' as IconName, keywords: n.label })),
  ...goals.map((g) => ({
    id: `goal-${g.id}`,
    group: 'Goals',
    title: g.label,
    subtitle: g.headline,
    to: `/treatments?goal=${g.id}`,
    icon: g.icon,
    keywords: g.description,
  })),
  ...treatments.map((t) => ({
    id: `t-${t.slug}`,
    group: 'Treatment options',
    title: t.name,
    subtitle: t.tagline,
    to: `/treatments/${t.slug}`,
    icon: 'sparkle' as IconName,
    keywords: `${t.format} ${t.goals.join(' ')} ${t.summary}`,
  })),
  ...faqs.map((f) => ({ id: `faq-${f.id}`, group: 'FAQs', title: f.question, to: `/faqs#${f.id}`, icon: 'chat' as IconName, keywords: f.answer })),
  ...legalDocs.map((d) => ({
    id: `legal-${d.slug}`,
    group: 'Legal',
    title: d.title,
    subtitle: d.summary,
    to: `/legal/${d.slug}`,
    icon: 'shield' as IconName,
    keywords: d.summary,
  })),
]

function search(query: string) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
  if (!terms.length) return index.filter((e) => e.group !== 'FAQs' && e.group !== 'Legal')
  return index
    .map((e) => {
      const title = e.title.toLowerCase()
      const hay = `${title} ${e.subtitle ?? ''} ${e.keywords}`.toLowerCase()
      if (!terms.every((t) => hay.includes(t))) return null
      return { e, score: terms.reduce((s, t) => s + (title.startsWith(t) ? 3 : title.includes(t) ? 2 : 1), 0) }
    })
    .filter((x): x is { e: Entry; score: number } => !!x)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.e)
}

/** ⌘K / Ctrl+K site-wide search across pages, treatments, FAQs and policies. */
export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const listRef = useRef<HTMLDivElement>(null)
  useScrollLock(open)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_EVENT, onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
    }
  }, [open])

  const results = useMemo(() => search(query), [query])
  const groups = useMemo(() => {
    const map = new Map<string, Entry[]>()
    results.forEach((r) => map.set(r.group, [...(map.get(r.group) ?? []), r]))
    return [...map.entries()]
  }, [results])

  useEffect(() => setActive(0), [query])
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const go = (entry: Entry | undefined) => {
    if (!entry) return
    setOpen(false)
    navigate(entry.to)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(results.length - 1, a + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(0, a - 1))
    } else if (e.key === 'Enter') {
      go(results[active])
    }
  }

  let i = -1
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-navy/50 backdrop-blur-md" onClick={() => setOpen(false)} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search PRIMED"
            initial={{ y: 24, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 12, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-navy/5"
          >
            <div className="flex items-center gap-3 border-b border-sky-200 px-5">
              <Icon name="search" className="text-teal" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search treatments, goals, questions…"
                className="h-16 w-full bg-transparent text-base text-navy outline-none placeholder:text-slate-light"
                aria-label="Search"
              />
              <kbd className="rounded-md border border-sky-200 px-2 py-1 text-[11px] font-semibold text-slate">ESC</kbd>
            </div>
            <div ref={listRef} data-lenis-prevent className="max-h-[55vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <div className="px-4 py-12 text-center text-slate">
                  No results for “{query}”. Try{' '}
                  <button className="font-semibold text-teal" onClick={() => go(index[0])}>
                    starting a consultation
                  </button>
                  .
                </div>
              )}
              {groups.map(([group, entries]) => (
                <div key={group} className="mb-2">
                  <div className="px-3 pt-3 pb-1 text-[11px] font-bold tracking-[0.18em] text-slate-light uppercase">{group}</div>
                  {entries.map((entry) => {
                    i++
                    const idx = i
                    return (
                      <button
                        key={entry.id}
                        data-index={idx}
                        onMouseEnter={() => setActive(idx)}
                        onClick={() => go(entry)}
                        className={cn(
                          'flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left transition-colors',
                          active === idx ? 'bg-sky' : 'hover:bg-sky-50',
                        )}
                      >
                        <span
                          className={cn(
                            'grid size-10 shrink-0 place-items-center rounded-xl transition-colors',
                            active === idx ? 'bg-teal text-white' : 'bg-sky text-teal',
                          )}
                        >
                          <Icon name={entry.icon} size={20} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-semibold text-navy">{entry.title}</span>
                          {entry.subtitle && <span className="block truncate text-sm text-slate">{entry.subtitle}</span>}
                        </span>
                        <Icon
                          name="arrow"
                          size={18}
                          className={cn('text-teal transition-all duration-300', active === idx ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0')}
                        />
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-sky-200 bg-sky-50 px-5 py-3 text-xs text-slate">
              <span className="flex items-center gap-3">
                <span>
                  <kbd className="font-semibold">↑↓</kbd> navigate
                </span>
                <span>
                  <kbd className="font-semibold">↵</kbd> open
                </span>
              </span>
              <span className="font-semibold text-navy">PRIMED search</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
