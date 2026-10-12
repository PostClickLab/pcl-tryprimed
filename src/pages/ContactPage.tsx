import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { SelectField, TextArea, TextField } from '@/components/ui/Field'
import { Icon, type IconName } from '@/components/ui/Icon'
import { EASE, Reveal, SpotlightCard } from '@/components/ui/motion'
import { PageHero } from '@/components/sections/PageHero'
import { FaqSection } from '@/components/sections/FaqSection'
import { site } from '@/data/site'
import { treatments } from '@/data/treatments'
import { submitContact } from '@/lib/api'
import { usePageMeta } from '@/lib/hooks'

const topics = [
  { value: 'general', label: 'General question' },
  { value: 'consultation', label: 'My consultation' },
  { value: 'billing', label: 'Billing & cancellation' },
  { value: 'privacy', label: 'Privacy & data' },
  ...treatments.map((t) => ({ value: t.slug, label: `About ${t.name}` })),
]

const channels: { icon: IconName; title: string; value: string; href?: string; note: string }[] = [
  { icon: 'mail', title: 'Email', value: site.email, href: `mailto:${site.email}`, note: 'Replies within one business day' },
  { icon: 'phone', title: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, '')}`, note: site.hours },
  { icon: 'chat', title: 'Existing patients', value: 'Message your care team', note: 'From your account dashboard' },
]

export default function ContactPage() {
  usePageMeta('Contact', 'Get in touch with the PRIMED care team.')
  const [params] = useSearchParams()
  const initialTopic = topics.some((t) => t.value === params.get('topic')) ? params.get('topic')! : ''
  const [form, setForm] = useState({ name: '', email: '', topic: initialTopic, message: '' })
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Contact' }]}
        eyebrow="Contact"
        title={'We are here\nto help.'}
        lead="Questions about consultations, treatment options or your account? Send us a message and our care team will get back to you."
      />

      <section className="pb-20">
        <div className="container-x grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="relative overflow-hidden rounded-[28px] bg-sky-50 p-6 ring-1 ring-sky-200 sm:p-10">
            <AnimatePresence mode="wait">
              {state === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                    className="grid size-20 place-items-center rounded-full bg-teal text-white shadow-glow"
                  >
                    <Icon name="check" size={36} strokeWidth={2.4} />
                  </motion.span>
                  <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-navy">Message sent.</h2>
                  <p className="mt-2 max-w-sm text-slate">
                    Thanks, {form.name.split(' ')[0] || 'there'}. We will reply to {form.email} within one business day.
                  </p>
                  <button
                    onClick={() => {
                      setForm({ name: '', email: '', topic: '', message: '' })
                      setState('idle')
                    }}
                    className="mt-6 text-sm font-semibold text-teal"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setState('sending')
                    await submitContact(form)
                    setState('sent')
                  }}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:col-span-2">Send a message</h2>
                  <TextField label="Full name" required autoComplete="name" value={form.name} onChange={set('name')} />
                  <TextField label="Email address" type="email" required autoComplete="email" value={form.email} onChange={set('email')} />
                  <SelectField label="Topic" required options={topics} value={form.topic} onChange={set('topic')} className="sm:col-span-2" />
                  <TextArea label="How can we help?" required value={form.message} onChange={set('message')} className="sm:col-span-2" />
                  <p className="text-xs leading-relaxed text-slate sm:col-span-2">
                    Please do not include detailed medical information here. For clinical questions, start a consultation or message your care team. If this is
                    an emergency, call 911.
                  </p>
                  <div className="sm:col-span-2">
                    <Button type="submit" size="lg" arrow disabled={state === 'sending'}>
                      {state === 'sending' ? 'Sending…' : 'Send message'}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          <Reveal stagger={0.1} className="space-y-4">
            {channels.map((c) => {
              const inner = (
                <div className="flex h-full items-start gap-4 rounded-[24px] bg-white p-6 ring-1 ring-sky-200 transition-all duration-500 group-hover/card:-translate-y-1 group-hover/card:shadow-lift">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sky text-teal transition-colors duration-500 group-hover/card:bg-teal group-hover/card:text-white">
                    <Icon name={c.icon} size={22} />
                  </span>
                  <div>
                    <p className="text-xs font-bold tracking-[0.16em] text-slate-light uppercase">{c.title}</p>
                    <p className="mt-1 font-bold text-navy">{c.value}</p>
                    <p className="mt-1 text-sm text-slate">{c.note}</p>
                  </div>
                </div>
              )
              return (
                <SpotlightCard key={c.title} className="rounded-[24px]">
                  {c.href ? <a href={c.href}>{inner}</a> : inner}
                </SpotlightCard>
              )
            })}
            <div className="flex items-start gap-4 rounded-[24px] bg-navy p-6 text-white">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-danger/90">
                <Icon name="heart" size={22} />
              </span>
              <div>
                <p className="font-bold">Medical emergency?</p>
                <p className="mt-1 text-sm text-white/75">PRIMED is not an emergency service. Call 911 or go to your nearest emergency department.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection />
    </>
  )
}
