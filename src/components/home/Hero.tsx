import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { EASE } from '@/components/ui/motion'
import { heroTrust } from '@/data/content'
import { photos } from '@/data/media'
import { site } from '@/data/site'
import { treatments } from '@/data/treatments'
import { useFinePointer } from '@/lib/hooks'
import { useIntro } from '@/providers/IntroProvider'

const heroVials = ['semaglutide', 'tirzepatide', 'nad-plus'].map((slug) => treatments.find((t) => t.slug === slug)!)

export function Hero() {
  const { ready } = useIntro()
  const fine = useFinePointer()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 60, damping: 20 })
  const sy = useSpring(py, { stiffness: 60, damping: 20 })
  const imgX = useTransform(sx, (v) => v * -14)
  const imgY = useTransform(sy, (v) => v * -10)
  const cardX = useTransform(sx, (v) => v * 22)
  const cardY = useTransform(sy, (v) => v * 16)

  const onMove = (e: React.PointerEvent) => {
    if (!fine) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay, ease: EASE },
  })

  return (
    <section
      onPointerMove={onMove}
      className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white pt-24 lg:h-[clamp(620px,54vw,820px)] lg:pt-0"
    >
      {/* Desktop photo. The frame keeps the photo's native 2:1 ratio so the overlays are
          positioned in image space and never drift onto the subject's face. */}
      <motion.div
        className="absolute top-0 right-0 hidden aspect-[2/1] h-full lg:-right-[4%] lg:block xl:right-0"
        initial={{ clipPath: 'inset(0 0 0 100%)' }}
        animate={ready ? { clipPath: 'inset(0 0 0 0%)' } : {}}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      >
        <motion.img
          src={photos.heroConsultation}
          alt="Woman smiling during an online consultation on her laptop"
          style={{ x: imgX, y: imgY }}
          initial={{ scale: 1.15 }}
          animate={ready ? { scale: 1.04 } : {}}
          transition={{ duration: 2.2, ease: EASE }}
          className="h-full w-full [mask-image:linear-gradient(to_right,transparent_8%,black_34%)] object-cover"
        />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-white to-transparent" />

        {/* Floating video call card, over the plants to the right of her face */}
        <motion.div style={{ x: cardX, y: cardY }} className="absolute top-[14%] left-[77%] z-10 w-[17%] min-w-[190px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
          >
            <VideoCard />
          </motion.div>
        </motion.div>

        {/* Vials resting in front of the laptop */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 1.05, ease: EASE }}
          className="group/vials absolute bottom-[5%] left-[74%] z-10 flex h-[18%] items-end"
        >
          {heroVials.map((t, i) => (
            <Link
              key={t.slug}
              to={`/treatments/${t.slug}`}
              aria-label={t.name}
              className="-ml-[6%] h-full transition-all duration-700 ease-out-expo group-hover/vials:mx-2 first:ml-0 hover:!-translate-y-4"
              style={{ zIndex: 3 - i }}
            >
              <img src={t.image} alt="" className="h-full w-auto drop-shadow-[0_18px_20px_rgb(8_38_76/0.3)]" />
            </Link>
          ))}
        </motion.div>
      </motion.div>

      <div className="relative container-x lg:flex lg:h-full lg:items-center">
        <div className="relative z-10 text-center lg:max-w-[520px] lg:pt-16 lg:text-left xl:max-w-[560px]">
          <motion.p {...enter(0.15)} className="hidden eyebrow text-teal lg:block">
            Personalized online care
          </motion.p>
          <h1 className="mt-4 text-[44px] leading-[0.95] font-extrabold tracking-[-0.04em] text-navy sm:text-6xl lg:text-[76px] xl:text-[92px]">
            {['More life', 'More you'].map((line, i) => (
              <span key={line} className="inline-block overflow-hidden pb-[0.06em] lg:block">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%', rotate: 5 }}
                  animate={ready ? { y: '0%', rotate: 0 } : {}}
                  transition={{ duration: 1.2, delay: 0.25 + i * 0.12, ease: EASE }}
                >
                  {line}
                  <span className="-ml-[0.06em] text-teal">.</span>
                  {i === 0 && <span className="lg:hidden">&nbsp;</span>}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p {...enter(0.55)} className="mt-5 text-base font-semibold text-navy sm:text-lg lg:mt-6">
            Personalized online care, built around you.
          </motion.p>
          <motion.p {...enter(0.62)} className="mx-auto mt-1.5 max-w-sm text-[15px] leading-relaxed text-slate lg:mx-0">
            Share your goals and discuss your options with a clinician.
          </motion.p>
          <motion.div {...enter(0.72)} className="mt-7 sm:inline-block lg:mt-8">
            <Button to={site.consultationPath} size="lg" arrow full data-cursor="Begin">
              Start my consultation
            </Button>
          </motion.div>

          <motion.ul {...enter(0.85)} className="mt-10 hidden items-center gap-5 lg:flex xl:gap-8">
            {heroTrust.map((item) => (
              <li key={item.label} className="group flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full border border-navy/20 bg-white/70 text-navy backdrop-blur transition-all duration-500 group-hover:border-teal group-hover:bg-teal group-hover:text-white">
                  <Icon name={item.icon} size={20} />
                </span>
                <span className="text-xs leading-tight font-medium whitespace-pre-line text-navy">{item.label}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* Mobile photo */}
      <motion.div {...enter(0.8)} className="relative mx-4 mt-8 aspect-[4/3.2] overflow-hidden rounded-[28px] sm:mx-6 lg:hidden">
        <img src={photos.heroConsultation} alt="Woman smiling during an online consultation" className="h-full w-full object-cover object-[65%_center]" />
        <div className="absolute top-3 right-3 w-[38%] max-w-[180px]">
          <VideoCard compact />
        </div>
      </motion.div>
      <motion.ul {...enter(0.9)} className="mt-6 no-scrollbar flex justify-between gap-4 overflow-x-auto px-4 pb-2 sm:justify-center sm:gap-10 lg:hidden">
        {heroTrust.map((item) => (
          <li key={item.label} className="flex shrink-0 items-center gap-2">
            <span className="grid size-9 place-items-center rounded-full border border-navy/20 text-navy">
              <Icon name={item.icon} size={17} />
            </span>
            <span className="text-[11px] leading-tight font-medium whitespace-pre-line text-navy">{item.label}</span>
          </li>
        ))}
      </motion.ul>
    </section>
  )
}

function VideoCard({ compact }: { compact?: boolean }) {
  const [seconds, setSeconds] = useState(127)
  useEffect(() => {
    const t = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])
  const time = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

  return (
    <div className="animate-float overflow-hidden rounded-2xl bg-white p-1.5 shadow-lift ring-1 ring-white/80 transition-transform duration-500 hover:scale-[1.03]">
      <div className="relative aspect-[4/3.4] overflow-hidden rounded-xl">
        <img src={photos.clinician} alt="Clinician on a video call (illustrative)" className="h-full w-full scale-[1.6] object-cover object-[42%_30%]" />
        <div className="absolute top-2 left-2 flex items-center gap-1.5 rounded-full bg-navy/60 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-red-400" />
            <span className="relative size-1.5 rounded-full bg-red-500" />
          </span>
          {time}
        </div>
        {!compact && (
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-navy/50 to-transparent pt-6 pb-2.5">
            {(['mic', 'video', 'camera'] as const).map((name) => (
              <span key={name} className="grid size-8 place-items-center rounded-full bg-white/90 text-navy transition-colors hover:bg-white">
                <Icon name={name} size={15} strokeWidth={1.8} />
              </span>
            ))}
            <span className="grid size-8 place-items-center rounded-full bg-danger text-white">
              <Icon name="phoneOff" size={15} strokeWidth={1.8} />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
