import { goals } from '@/data/goals'
import type { IconName } from '@/components/ui/Icon'

/**
 * Consultation questionnaire, defined as data. Add, remove or reorder steps
 * here; the ConsultationPage renders whatever this schema describes.
 */
export type Option = { value: string; label: string; icon?: IconName; hint?: string }

export type Field =
  | { kind: 'cards'; name: string; options: Option[]; multiple?: boolean; exclusive?: string }
  | { kind: 'text'; name: string; label: string; type?: 'text' | 'email' | 'tel' | 'date'; autoComplete?: string; required?: boolean }
  | { kind: 'select'; name: string; label: string; options: string[]; required?: boolean }
  | { kind: 'textarea'; name: string; label: string; placeholder?: string }
  | { kind: 'consent'; name: string; label: string; required?: boolean }

export interface ConsultationStep {
  id: string
  eyebrow: string
  title: string
  description: string
  fields: Field[]
}

export type Answers = Record<string, string | string[] | boolean>

const states = [
  'Arizona',
  'California',
  'Colorado',
  'Florida',
  'Georgia',
  'Illinois',
  'New Jersey',
  'New York',
  'North Carolina',
  'Ohio',
  'Pennsylvania',
  'Texas',
  'Virginia',
  'Washington',
  'Other',
]

export const consultationSteps: ConsultationStep[] = [
  {
    id: 'goals',
    eyebrow: 'Your goals',
    title: 'What brings you here?',
    description: 'Choose everything that applies. You can discuss each one with your clinician.',
    fields: [{ kind: 'cards', name: 'goals', multiple: true, options: goals.map((g) => ({ value: g.id, label: g.label, icon: g.icon })) }],
  },
  {
    id: 'about',
    eyebrow: 'About you',
    title: 'Tell us a little about yourself.',
    description: 'This helps your clinician understand your starting point.',
    fields: [
      { kind: 'text', name: 'firstName', label: 'First name', autoComplete: 'given-name', required: true },
      { kind: 'text', name: 'dob', label: 'Date of birth', type: 'date', autoComplete: 'bday', required: true },
      { kind: 'select', name: 'state', label: 'State you live in', options: states, required: true },
    ],
  },
  {
    id: 'history',
    eyebrow: 'Health history',
    title: 'Do any of these apply to you?',
    description: 'Your answers are confidential and only shared with your care team.',
    fields: [
      {
        kind: 'cards',
        name: 'conditions',
        multiple: true,
        exclusive: 'none',
        options: [
          { value: 'none', label: 'None of these', icon: 'check' },
          { value: 'diabetes', label: 'Diabetes', icon: 'clinical' },
          { value: 'thyroid', label: 'Thyroid condition', icon: 'clinical' },
          { value: 'heart', label: 'Heart condition', icon: 'heart' },
          { value: 'pregnancy', label: 'Pregnant or breastfeeding', icon: 'user' },
          { value: 'other', label: 'Something else', icon: 'plus' },
        ],
      },
      {
        kind: 'textarea',
        name: 'medications',
        label: 'Current medications (optional)',
        placeholder: 'List any prescriptions, supplements or over-the-counter products.',
      },
    ],
  },
  {
    id: 'preferences',
    eyebrow: 'Preferences',
    title: 'Which formats would you consider?',
    description: 'There is no wrong answer. Your clinician will discuss what may be appropriate.',
    fields: [
      {
        kind: 'cards',
        name: 'formats',
        multiple: true,
        exclusive: 'any',
        options: [
          { value: 'any', label: 'No preference', icon: 'sparkle', hint: 'Let my clinician advise' },
          { value: 'injection', label: 'Injection', icon: 'syringe' },
          { value: 'oral', label: 'Oral', icon: 'pill' },
          { value: 'topical', label: 'Topical', icon: 'tube' },
          { value: 'nasal', label: 'Nasal', icon: 'spray' },
        ],
      },
    ],
  },
  {
    id: 'contact',
    eyebrow: 'Almost done',
    title: 'Where can your clinician reach you?',
    description: 'We will send updates about your review here.',
    fields: [
      { kind: 'text', name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', required: true },
      { kind: 'text', name: 'phone', label: 'Mobile number', type: 'tel', autoComplete: 'tel' },
      { kind: 'consent', name: 'consent', label: 'I agree to the Terms of service, Privacy policy and Telehealth consent.', required: true },
    ],
  },
]

export function isStepComplete(step: ConsultationStep, answers: Answers) {
  return step.fields.every((field) => {
    const value = answers[field.name]
    if (field.kind === 'cards') return Array.isArray(value) && value.length > 0
    if (field.kind === 'consent') return !field.required || value === true
    if ('required' in field && field.required) {
      if (typeof value !== 'string' || !value.trim()) return false
      if (field.kind === 'text' && field.type === 'email') return /^\S+@\S+\.\S+$/.test(value)
    }
    return true
  })
}
