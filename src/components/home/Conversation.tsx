import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { EASE, ParallaxImage, Reveal, TextReveal, useReveal } from '@/components/ui/motion'
import { conversationPoints } from '@/data/content'
import { photos } from '@/data/media'
import { site } from '@/data/site'

const chat = [
  { from: 'clinician', text: 'What would you like to focus on?' },
  { from: 'patient', text: 'I want to understand my options first.' },
  { from: 'clinician', text: 'Let’s start with your health history.' },
] as const

/** "A conversation. Not a guess." — clinician imagery with a live chat motif. */
export function Conversation() {
  return (
    <section className="py-4 sm:py-6">
      <div className="container-x grid items-center gap-6 lg:grid-cols-[1.05fr_1fr_0.95fr] lg:gap-10">
        <Reveal y={40} className="relative">
          <div className="relative h-[300px] overflow-hidden rounded-[22px] sm:h-[400px] lg:h-[420px]">
            <ParallaxImage
              src={photos.clinician}
              alt="Clinician reviewing information on a laptop (illustrative)"
              className="h-full w-full"
              imgClassName="object-[55%_center]"
              strength={6}
            />
            <span className="absolute top-3 left-4 text-[10px] font-medium text-white/80">Photo for illustration</span>
          </div>
          <ChatBubbles />
        </Reveal>

        <div className="lg:px-2">
          <TextReveal text={'A conversation.\nNot a guess.'} className="text-[32px] leading-[1.05] font-extrabold tracking-[-0.025em] sm:text-[44px]" />
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-slate">
              Discuss your health history, your goals, and whether treatment options may be appropriate for you.
            </p>
            <div className="mt-7">
              <Button to={site.consultationPath} arrow size="lg">
                Start my consultation
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal stagger={0.12} className="divide-y divide-sky-200 rounded-[22px] bg-sky-50 px-6 py-2 ring-1 ring-sky-200">
          {conversationPoints.map((point) => (
            <div key={point.id} className="group flex gap-4 py-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-navy shadow-sm transition-all duration-500 ease-out-expo group-hover:-rotate-6 group-hover:bg-teal group-hover:text-white">
                <Icon name={point.icon} size={22} strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="text-sm font-bold text-navy">{point.title}</h3>
                <p className="mt-0.5 text-[13px] leading-snug text-slate">{point.description}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function ChatBubbles() {
  const [ref, show] = useReveal<HTMLDivElement>(0.5)
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!show) return
    if (count >= chat.length) return
    const t = window.setTimeout(() => setCount((c) => c + 1), count === 0 ? 400 : 1500)
    return () => clearTimeout(t)
  }, [show, count])

  return (
    <div ref={ref} className="pointer-events-none absolute right-3 bottom-12 flex w-[min(80%,290px)] flex-col gap-2 sm:right-5 lg:-right-8">
      <AnimatePresence>
        {chat.slice(0, count).map((m, i) => (
          <motion.div
            key={i}
            layout
            initial={{ opacity: 0, y: 14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className={
              m.from === 'clinician'
                ? 'self-start rounded-2xl rounded-bl-md bg-white/95 px-3.5 py-2.5 text-xs font-medium text-navy shadow-lift backdrop-blur'
                : 'self-end rounded-2xl rounded-br-md bg-teal px-3.5 py-2.5 text-xs font-medium text-white shadow-glow'
            }
          >
            {m.text}
          </motion.div>
        ))}
        {count < chat.length && show && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-1 self-start rounded-2xl bg-white/90 px-3 py-3 shadow-soft"
          >
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="size-1.5 rounded-full bg-teal"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
