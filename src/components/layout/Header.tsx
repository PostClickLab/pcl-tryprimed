import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Logo } from '@/components/ui/Logo'
import { EASE } from '@/components/ui/motion'
import { goals } from '@/data/goals'
import { mainNav, site } from '@/data/site'
import { treatments } from '@/data/treatments'
import { cn } from '@/lib/cn'
import { useIntro } from '@/providers/IntroProvider'
import { useScrollLock } from '@/providers/SmoothScroll'
import { openSearch } from './CommandPalette'

export function Header() {
  const { ready } = useIntro()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mega, setMega] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 320 && y > prev && !menuOpen)
  })

  useEffect(() => {
    setMenuOpen(false)
    setMega(false)
  }, [location.pathname, location.search])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: ready ? (hidden && !mega ? -110 : 0) : -100, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: ready && !scrolled ? 0.5 : 0 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
        onMouseLeave={() => setMega(false)}
      >
        <div
          className={cn(
            'relative container-x flex h-16 items-center justify-between rounded-full transition-[background-color,box-shadow,backdrop-filter] duration-500 lg:h-[68px]',
            scrolled || mega || menuOpen
              ? 'bg-white/85 shadow-[0_8px_30px_-12px_rgb(8_38_76/0.18)] ring-1 ring-navy/5 backdrop-blur-xl'
              : 'bg-white/45 ring-1 ring-white/50 backdrop-blur-md',
          )}
        >
          <Logo />

          <nav aria-label="Main" className="hidden items-center lg:flex" onMouseLeave={() => setHovered(null)}>
            {mainNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onMouseEnter={() => {
                  setHovered(item.to)
                  setMega(item.to === '/treatments')
                }}
                className={({ isActive }) =>
                  cn('relative px-4 py-2 text-[13px] font-semibold transition-colors duration-300', isActive ? 'text-teal' : 'text-navy hover:text-navy')
                }
              >
                {({ isActive }) => (
                  <>
                    {hovered === item.to && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-sky"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="flex items-center gap-1">
                      {item.label}
                      {item.to === '/treatments' && (
                        <Icon name="chevronDown" size={14} strokeWidth={2.2} className={cn('transition-transform duration-300', mega && 'rotate-180')} />
                      )}
                    </span>
                    {isActive && <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-teal" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={openSearch}
              aria-label="Search (Command K)"
              className="group hidden h-10 items-center gap-2 rounded-full border border-navy/10 bg-white/60 pr-2 pl-3 text-[13px] text-slate transition-colors hover:border-teal/50 hover:text-navy sm:flex"
            >
              <Icon name="search" size={16} className="text-teal" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="rounded-md bg-sky px-1.5 py-0.5 text-[10px] font-bold text-navy">⌘K</kbd>
            </button>
            <Button to={site.consultationPath} size="sm" arrow className="hidden sm:inline-flex">
              Start my consultation
            </Button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="relative grid size-11 place-items-center rounded-full bg-navy text-white lg:hidden"
            >
              <span
                className={cn(
                  'absolute h-[2px] w-5 rounded bg-current transition-transform duration-500 ease-out-expo',
                  menuOpen ? 'rotate-45' : '-translate-y-[5px]',
                )}
              />
              <span
                className={cn(
                  'absolute h-[2px] rounded bg-current transition-all duration-500 ease-out-expo',
                  menuOpen ? 'w-5 -rotate-45' : 'w-3.5 translate-x-[3px] translate-y-[5px]',
                )}
              />
            </button>
          </div>

          <AnimatePresence>{mega && <MegaMenu />}</AnimatePresence>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

function MegaMenu() {
  const [preview, setPreview] = useState(goals[0])
  const featured = treatments.filter((t) => t.availability === 'available').slice(0, 3)
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="absolute inset-x-4 top-[calc(100%+10px)] hidden origin-top overflow-hidden rounded-[28px] bg-white p-3 shadow-lift ring-1 ring-navy/5 lg:grid lg:grid-cols-[1.1fr_1fr_1.3fr] lg:gap-3"
    >
      <div className="p-4">
        <p className="mb-4 eyebrow text-teal">Explore by goal</p>
        <ul className="space-y-1">
          {goals.map((g) => (
            <li key={g.id}>
              <Link
                to={`/treatments?goal=${g.id}`}
                onMouseEnter={() => setPreview(g)}
                className={cn('group flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors', preview.id === g.id ? 'bg-sky' : 'hover:bg-sky-50')}
              >
                <span className="grid size-10 place-items-center rounded-xl bg-white text-teal shadow-sm">
                  <Icon name={g.icon} size={20} />
                </span>
                <span className="flex-1 font-semibold text-navy">{g.label}</span>
                <Icon
                  name="arrow"
                  size={16}
                  className="-translate-x-2 text-teal opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative min-h-[280px] overflow-hidden rounded-[22px] bg-sky">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={preview.id}
            src={preview.image}
            alt=""
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="text-xl font-bold">{preview.headline}</p>
          <p className="mt-1 line-clamp-2 text-sm text-white/75">{preview.description}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="eyebrow text-teal">Treatment options</p>
          <Link to="/treatments" className="text-xs font-semibold text-navy hover:text-teal">
            View all
          </Link>
        </div>
        <ul className="space-y-2">
          {featured.map((t) => (
            <li key={t.slug}>
              <Link to={`/treatments/${t.slug}`} className="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-sky-50">
                <span className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-b from-sky to-white">
                  <img
                    src={t.image}
                    alt=""
                    className={cn(
                      'transition-transform duration-500 group-hover:scale-110',
                      t.imageKind === 'cutout' ? 'h-14 w-auto' : 'h-full w-full object-cover',
                    )}
                  />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold text-navy">{t.name}</span>
                  <span className="block truncate text-sm text-slate">{t.tagline}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useScrollLock(open)
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-sky-50 px-4 pt-24 pb-8 lg:hidden"
          initial={{ clipPath: 'circle(0% at calc(100% - 40px) 44px)' }}
          animate={{ clipPath: 'circle(150% at calc(100% - 40px) 44px)' }}
          exit={{ clipPath: 'circle(0% at calc(100% - 40px) 44px)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          data-lenis-prevent
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {[{ label: 'Home', to: '/' }, ...mainNav].map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease: EASE }}
              >
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between border-b border-navy/10 py-4 text-3xl font-extrabold tracking-tight',
                      isActive ? 'text-teal' : 'text-navy',
                    )
                  }
                >
                  {item.label}
                  <Icon name="arrowUpRight" size={22} className="text-teal" />
                </NavLink>
              </motion.div>
            ))}
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6, ease: EASE }} className="mt-8">
            <p className="mb-3 eyebrow text-teal">Explore by goal</p>
            <div className="flex flex-wrap gap-2">
              {goals.map((g) => (
                <Link
                  key={g.id}
                  to={`/treatments?goal=${g.id}`}
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-sm"
                >
                  <Icon name={g.icon} size={16} className="text-teal" />
                  {g.label}
                </Link>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6, ease: EASE }}
            className="mt-auto space-y-3 pt-10"
          >
            <Button to={site.consultationPath} size="lg" arrow full magnetic={false}>
              Start my consultation
            </Button>
            <button
              onClick={() => {
                onClose()
                openSearch()
              }}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-navy/10 text-sm font-semibold text-navy"
            >
              <Icon name="search" size={18} className="text-teal" /> Search
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
