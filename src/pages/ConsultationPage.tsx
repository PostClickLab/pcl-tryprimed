import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Checkbox, SelectField, TextArea, TextField } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { VialGlyph } from '@/components/ui/Logo'
import { EASE } from '@/components/ui/motion'
import { consultationSteps, isStepComplete, type Answers, type ConsultationStep, type Field } from '@/data/consultation'
import { journeySteps } from '@/data/content'
import { isGoalId } from '@/data/goals'
import { photos } from '@/data/media'
import { treatmentBySlug } from '@/data/treatments'
import { submitConsultation } from '@/lib/api'
import { cn } from '@/lib/cn'
import { usePageMeta, usePersistentState } from '@/lib/hooks'
import { useScrollTo } from '@/providers/SmoothScroll'

const STORAGE_KEY = 'primed:consultation'

export default function ConsultationPage() {
  usePageMeta('Start my consultation', 'Share your goals and health history with a licensed clinician.')
  const [params] = useSearchParams()
  const [answers, setAnswers] = usePersistentState<Answers>(STORAGE_KEY, {})
  const [stepIndex, setStepIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [status, setStatus] = useState<'editing' | 'submitting' | 'done'>('editing')
  const [reference, setReference] = useState('')
  const scrollTo = useScrollTo()
  const treatment = treatmentBySlug(params.get('treatment') ?? undefined)

  // Prefill goals coming from the homepage selector or a treatment page.
  useEffect(() => {
    const fromUrl = (params.get('goals') ?? '').split(',').filter(isGoalId)
    if (fromUrl.length) setAnswers((a) => ({ ...a, goals: Array.from(new Set([...(Array.isArray(a.goals) ? a.goals : []), ...fromUrl])) }))
  }, [params, setAnswers])

  const step = consultationSteps[stepIndex]
  const complete = isStepComplete(step, answers)
  const isLast = stepIndex === consultationSteps.length - 1
  const progress = status === 'done' ? 1 : (stepIndex + (complete ? 1 : 0.4)) / consultationSteps.length

  const go = (delta: number) => {
    setDirection(delta)
    setStepIndex((i) => Math.min(consultationSteps.length - 1, Math.max(0, i + delta)))
    scrollTo(0, { offset: 0 })
  }

  const submit = async () => {
    setStatus('submitting')
    const res = await submitConsultation({ ...answers, treatment: treatment?.slug ?? '' })
    setReference(res.reference)
    setStatus('done')
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    scrollTo(0, { offset: 0 })
  }

  return (
    <section className="relative min-h-svh bg-gradient-to-b from-sky to-white pt-24 pb-20 lg:pt-28">
      <div className="container-x grid gap-8 lg:grid-cols-[360px_1fr] lg:gap-12">
        {/* Sidebar */}
        <aside className="grain relative hidden overflow-hidden rounded-[28px] bg-navy p-8 text-white lg:sticky lg:top-28 lg:block lg:self-start">
          <div aria-hidden className="absolute -top-24 -right-24 size-72 animate-blob bg-gradient-to-br from-teal-300/40 to-teal/10" />
          <p className="relative eyebrow text-teal-200">Your consultation</p>
          <ol className="relative mt-8 space-y-1">
            {consultationSteps.map((s, i) => {
              const done = status === 'done' || i < stepIndex
              const current = status !== 'done' && i === stepIndex
              return (
                <li key={s.id} className="flex items-center gap-4 py-2">
                  <span
                    className={cn(
                      'grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-all duration-500',
                      done ? 'bg-teal text-white' : current ? 'bg-white text-navy' : 'bg-white/10 text-white/60',
                    )}
                  >
                    {done ? <Icon name="check" size={14} strokeWidth={3} /> : i + 1}
                  </span>
                  <span className={cn('text-sm font-semibold transition-colors', current ? 'text-white' : 'text-white/60')}>{s.eyebrow}</span>
                </li>
              )
            })}
          </ol>
          <div className="relative mt-10 flex items-center gap-4 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
            <img src={photos.clinician} alt="" className="size-14 rounded-xl object-cover object-[35%_center]" />
            <p className="text-xs leading-relaxed text-white/75">A licensed clinician reviews every consultation individually. Images are illustrative.</p>
          </div>
          <div className="relative mt-6 flex items-center gap-2 text-xs text-white/60">
            <Icon name="lock" size={16} className="text-teal-300" /> Encrypted and confidential
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white ring-1 ring-sky-200">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-teal to-teal-300"
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.8, ease: EASE }}
              />
            </div>
            <span className="text-sm font-bold text-navy tabular-nums">{Math.round(progress * 100)}%</span>
          </div>

          <div className="relative overflow-hidden rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-sky-200 sm:p-10 lg:min-h-[560px]">
            <AnimatePresence mode="wait" custom={direction}>
              {status === 'done' ? (
                <Success key="done" reference={reference} />
              ) : (
                <motion.div
                  key={step.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: direction * -60, filter: 'blur(6px)' }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <p className="eyebrow text-teal">
                    Step {stepIndex + 1} of {consultationSteps.length} · {step.eyebrow}
                  </p>
                  <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-[44px] sm:leading-[1.05]">{step.title}</h1>
                  <p className="mt-3 text-slate">{step.description}</p>
                  {treatment && stepIndex === 0 && (
                    <div className="mt-5 inline-flex items-center gap-3 rounded-full bg-sky-50 py-1.5 pr-4 pl-1.5 text-sm ring-1 ring-sky-200">
                      <img
                        src={treatment.image}
                        alt=""
                        className={cn('size-8 rounded-full bg-white', treatment.imageKind === 'cutout' ? 'object-contain p-0.5' : 'object-cover')}
                      />
                      <span className="text-slate">
                        Interested in <span className="font-semibold text-navy">{treatment.name}</span>
                      </span>
                    </div>
                  )}

                  <StepFields step={step} answers={answers} onChange={(name, value) => setAnswers((a) => ({ ...a, [name]: value }))} />

                  <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-sky-200 pt-6">
                    <button
                      onClick={() => go(-1)}
                      disabled={stepIndex === 0}
                      className="flex items-center gap-2 text-sm font-semibold text-navy transition-opacity disabled:opacity-0"
                    >
                      <Icon name="chevronLeft" size={18} /> Back
                    </button>
                    {isLast ? (
                      <Button size="lg" arrow disabled={!complete || status === 'submitting'} onClick={submit}>
                        {status === 'submitting' ? 'Submitting…' : 'Submit for clinical review'}
                      </Button>
                    ) : (
                      <Button size="lg" arrow disabled={!complete} onClick={() => go(1)}>
                        Continue
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="mt-4 text-center text-xs text-slate">
            Your progress is saved on this device. Not for emergencies: call 911. By continuing you agree to our{' '}
            <Link to="/legal/telehealth-consent" className="font-semibold text-teal">
              telehealth consent
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}

function StepFields({ step, answers, onChange }: { step: ConsultationStep; answers: Answers; onChange: (name: string, value: Answers[string]) => void }) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {step.fields.map((field) => (
        <FieldRenderer key={field.name} field={field} value={answers[field.name]} onChange={(v) => onChange(field.name, v)} />
      ))}
    </div>
  )
}

function FieldRenderer({ field, value, onChange }: { field: Field; value: Answers[string] | undefined; onChange: (v: Answers[string]) => void }) {
  switch (field.kind) {
    case 'cards': {
      const selected = Array.isArray(value) ? value : []
      const toggle = (v: string) => {
        if (!field.multiple) return onChange([v])
        if (field.exclusive && v === field.exclusive) return onChange(selected.includes(v) ? [] : [v])
        const base = selected.filter((x) => x !== field.exclusive)
        onChange(base.includes(v) ? base.filter((x) => x !== v) : [...base, v])
      }
      return (
        <div className="grid grid-cols-1 gap-3 sm:col-span-2 sm:grid-cols-2 lg:grid-cols-3">
          {field.options.map((o, i) => {
            const active = selected.includes(o.value)
            return (
              <motion.button
                key={o.value}
                type="button"
                aria-pressed={active}
                onClick={() => toggle(o.value)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.04, duration: 0.5, ease: EASE }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'group relative flex items-center gap-4 rounded-2xl p-4 text-left ring-1 transition-all duration-300',
                  active
                    ? 'bg-teal/[0.06] ring-2 ring-teal'
                    : 'bg-sky-50 ring-sky-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-soft hover:ring-teal/40',
                )}
              >
                {o.icon && (
                  <span
                    className={cn(
                      'grid size-11 shrink-0 place-items-center rounded-xl transition-colors duration-300',
                      active ? 'bg-teal text-white' : 'bg-white text-teal',
                    )}
                  >
                    <Icon name={o.icon} size={22} />
                  </span>
                )}
                <span className="flex-1">
                  <span className="block font-semibold text-navy">{o.label}</span>
                  {o.hint && <span className="block text-xs text-slate">{o.hint}</span>}
                </span>
                <span
                  className={cn(
                    'grid size-6 place-items-center rounded-full ring-1 transition-all duration-300',
                    active ? 'bg-teal text-white ring-teal' : 'ring-navy/20',
                  )}
                >
                  <Icon name="check" size={13} strokeWidth={3} className={cn('transition-transform', active ? 'scale-100' : 'scale-0')} />
                </span>
              </motion.button>
            )
          })}
        </div>
      )
    }
    case 'text':
      return (
        <TextField
          label={field.label}
          type={field.type ?? 'text'}
          autoComplete={field.autoComplete}
          required={field.required}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )
    case 'select':
      return (
        <SelectField
          label={field.label}
          required={field.required}
          options={field.options.map((o) => ({ value: o, label: o }))}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )
    case 'textarea':
      return <TextArea label={field.label} value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)} className="sm:col-span-2" />
    case 'consent':
      return (
        <Checkbox
          className="sm:col-span-2"
          checked={value === true}
          onChange={onChange}
          label={
            <>
              I agree to the{' '}
              <Link to="/legal/terms-of-service" className="font-semibold text-teal">
                Terms of service
              </Link>
              ,{' '}
              <Link to="/legal/privacy-policy" className="font-semibold text-teal">
                Privacy policy
              </Link>{' '}
              and{' '}
              <Link to="/legal/telehealth-consent" className="font-semibold text-teal">
                Telehealth consent
              </Link>
              .
            </>
          }
        />
      )
  }
}

function Success({ reference }: { reference: string }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: EASE }} className="text-center">
      <div className="relative mx-auto grid size-28 place-items-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full bg-teal/20"
            initial={{ scale: 0.6, opacity: 0.8 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.7 }}
          />
        ))}
        <span className="relative grid size-24 place-items-center rounded-full bg-navy text-white">
          <VialGlyph level={1} strokeWidth={2.4} className="h-14" liquidClassName="fill-teal" />
        </span>
      </div>
      <h1 className="mt-8 text-4xl font-extrabold tracking-[-0.03em] text-navy sm:text-5xl">You are all set.</h1>
      <p className="mx-auto mt-3 max-w-md text-slate">
        Your consultation has been submitted for individual clinical review. We have sent a confirmation to your email.
      </p>
      <p className="mt-4 inline-flex rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-navy ring-1 ring-sky-200">Reference {reference}</p>

      <ol className="mx-auto mt-10 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
        {journeySteps.map((s, i) => (
          <motion.li
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: EASE }}
            className={cn('rounded-2xl p-5 ring-1', i === 0 ? 'bg-teal/[0.06] ring-teal/40' : 'bg-sky-50 ring-sky-200')}
          >
            <span className={cn('grid size-8 place-items-center rounded-full text-xs font-bold', i === 0 ? 'bg-teal text-white' : 'bg-white text-navy')}>
              {i === 0 ? <Icon name="check" size={14} strokeWidth={3} /> : i + 1}
            </span>
            <p className="mt-3 font-bold text-navy">{s.title}</p>
            <p className="mt-1 text-xs text-slate">{i === 0 ? 'Done' : s.description}</p>
          </motion.li>
        ))}
      </ol>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button to="/" arrow>
          Back to home
        </Button>
        <Button to="/how-it-works" variant="outline">
          What happens next
        </Button>
      </div>
    </motion.div>
  )
}
