import type { IconName } from '@/components/ui/Icon'

export type GoalId = 'weight-management' | 'wellness' | 'hair-skin' | 'recovery'
export type FormatId = 'injection' | 'oral' | 'topical' | 'nasal'
export type Availability = 'available' | 'waitlist'

export interface NavLink {
  label: string
  to: string
}

export interface Goal {
  id: GoalId
  label: string
  /** Two-line label used by compact chips, e.g. "Hair\n& skin". */
  shortLabel: string
  icon: IconName
  image: string
  headline: string
  description: string
}

export interface Format {
  id: FormatId
  label: string
  /** Groups used by the treatment explorer tabs. */
  group: 'injection' | 'oral' | 'topical-nasal'
  icon: IconName
}

export interface Treatment {
  slug: string
  name: string
  tagline: string
  summary: string
  format: FormatId
  goals: GoalId[]
  image: string
  /** Transparent cut-out renders sit on a pedestal; photos fill their frame. */
  imageKind: 'cutout' | 'photo'
  gallery: string[]
  availability: Availability
  highlights: string[]
  overview: string
  prescribing: string
  considerations: string[]
}

export interface Faq {
  id: string
  category: 'consultation' | 'eligibility' | 'treatments' | 'billing' | 'privacy'
  question: string
  answer: string
  featured?: boolean
}

export interface Step {
  id: string
  icon: IconName
  title: string
  description: string
  detail?: string
}

export interface LegalSection {
  id: string
  heading: string
  body: string[]
}

export interface LegalDoc {
  slug: string
  title: string
  summary: string
  updated: string
  sections: LegalSection[]
}
