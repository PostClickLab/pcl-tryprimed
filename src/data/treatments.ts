import { photos, products } from '@/data/media'
import type { FormatId, GoalId, Treatment } from '@/types'

/**
 * Treatment catalogue. Names, formats and availability are design-preview
 * placeholders and must be confirmed against the actual service before launch.
 */
export const treatments: Treatment[] = [
  {
    slug: 'semaglutide',
    name: 'Semaglutide',
    tagline: 'A weekly injection option to discuss for weight management.',
    summary: 'A GLP-1 receptor agonist your clinician may consider as part of a broader weight management plan.',
    format: 'injection',
    goals: ['weight-management'],
    image: products.vialSemaglutide,
    imageKind: 'cutout',
    gallery: [products.vialSemaglutide, photos.weight],
    availability: 'available',
    highlights: ['Reviewed by a licensed clinician', 'Plan built around your history', 'Ongoing check-ins'],
    overview:
      'Semaglutide belongs to a class of medicines called GLP-1 receptor agonists. During your consultation, a clinician reviews your health history, current medications and goals to decide whether it may be appropriate for you.',
    prescribing:
      'If a clinician determines it is appropriate, they will explain dosing, how to administer it, what to expect and how follow-up works. A prescription is never guaranteed.',
    considerations: [
      'Share your full medical history, including any personal or family history of thyroid conditions or pancreatitis.',
      'Tell your clinician about all medications and supplements you take.',
      'Not intended for use during pregnancy or while breastfeeding unless your clinician advises otherwise.',
    ],
  },
  {
    slug: 'tirzepatide',
    name: 'Tirzepatide',
    tagline: 'A dual-action injection option to discuss for weight management.',
    summary: 'A GIP and GLP-1 receptor agonist that may be considered after an individual clinical review.',
    format: 'injection',
    goals: ['weight-management'],
    image: products.vialTirzepatide,
    imageKind: 'cutout',
    gallery: [products.vialTirzepatide, photos.weight],
    availability: 'available',
    highlights: ['Individual suitability review', 'Clear guidance on next steps', 'Ongoing clinician support'],
    overview:
      'Tirzepatide acts on two hormone receptors (GIP and GLP-1). Your clinician will discuss whether it may suit your goals and health history, and how it compares with other options.',
    prescribing:
      'If appropriate, your clinician will walk you through dosing, administration, possible side effects and how your progress will be reviewed over time.',
    considerations: [
      'Disclose any history of thyroid, pancreatic, kidney or gallbladder conditions.',
      'Some medications may interact; share your current prescriptions.',
      'Your clinician may recommend lab work before making a decision.',
    ],
  },
  {
    slug: 'retatrutide',
    name: 'Retatrutide',
    tagline: 'An emerging option you can ask your clinician about.',
    summary: 'A next-generation option still under evaluation. Join the waitlist to be informed if availability changes.',
    format: 'injection',
    goals: ['weight-management'],
    image: products.vialReta,
    imageKind: 'cutout',
    gallery: [products.vialReta, photos.weight],
    availability: 'waitlist',
    highlights: ['Waitlist only', 'Updates as regulatory status changes', 'Discuss current alternatives now'],
    overview:
      'Retatrutide is an investigational compound and is not currently offered. You can join the waitlist and discuss currently available options with a clinician in the meantime.',
    prescribing:
      'PRIMED will only offer treatments that meet applicable regulatory requirements. Joining the waitlist does not guarantee future availability or a prescription.',
    considerations: ['Not currently available for prescription.', 'Your clinician can discuss established alternatives during your consultation.'],
  },
  {
    slug: 'nad-plus',
    name: 'NAD+',
    tagline: 'A wellness injection option to discuss with your clinician.',
    summary: 'A coenzyme found in every cell, sometimes discussed as part of a wellness and longevity routine.',
    format: 'injection',
    goals: ['wellness', 'recovery'],
    image: products.vialNad,
    imageKind: 'cutout',
    gallery: [products.vialNad, photos.longevity],
    availability: 'available',
    highlights: ['Wellness-focused conversation', 'Clinician-guided routine', 'Adjustments over time'],
    overview:
      'NAD+ (nicotinamide adenine dinucleotide) is a coenzyme involved in cellular energy processes. A clinician can talk through what is known, what is not, and whether it fits your wellness goals.',
    prescribing:
      'If it may be appropriate, your clinician will explain how it is used and what follow-up looks like. Evidence for some wellness uses is still developing.',
    considerations: ['Share any chronic conditions and current medications.', 'Discuss realistic expectations with your clinician.'],
  },
  {
    slug: 'ghk-cu',
    name: 'GHK-Cu',
    tagline: 'A copper peptide option to discuss for skin and recovery goals.',
    summary: 'A naturally occurring copper peptide sometimes discussed in skin and recovery care.',
    format: 'injection',
    goals: ['hair-skin', 'recovery'],
    image: products.vialGhkcu,
    imageKind: 'cutout',
    gallery: [products.vialGhkcu, photos.hairSkin],
    availability: 'available',
    highlights: ['Skin and recovery focus', 'Individual review', 'Follow-up included'],
    overview:
      'GHK-Cu is a copper-binding peptide. During your consultation, a clinician can discuss whether it may be suitable for your skin or recovery goals and what the current evidence suggests.',
    prescribing: 'Any recommendation follows a review of your history. Your clinician will explain use, expectations and when to check in.',
    considerations: ['Disclose any known sensitivities or allergies.', 'Share current skincare treatments and medications.'],
  },
  {
    slug: 'oral-options',
    name: 'Oral options',
    tagline: 'Capsule and tablet options for people who prefer not to inject.',
    summary: 'Oral formats your clinician may consider for weight management or wellness goals.',
    format: 'oral',
    goals: ['weight-management', 'wellness'],
    image: products.oralOptions,
    imageKind: 'photo',
    gallery: [products.oralOptions, photos.careLifestyle],
    availability: 'available',
    highlights: ['No injections', 'Fits daily routines', 'Clinician-reviewed'],
    overview:
      'Some goals may be supported by oral medications. Your clinician will review whether an oral option could be appropriate and how it compares with other formats.',
    prescribing: 'If appropriate, you will receive clear guidance on how and when to take your medication, plus a plan for follow-up.',
    considerations: ['Share all medications, including over-the-counter products.', 'Tell your clinician about digestive conditions.'],
  },
  {
    slug: 'topical-cream',
    name: 'Topical cream',
    tagline: 'A topical option to discuss for hair and skin goals.',
    summary: 'Clinician-reviewed topical formulations for hair and skin concerns.',
    format: 'topical',
    goals: ['hair-skin'],
    image: products.topicalCream,
    imageKind: 'photo',
    gallery: [products.topicalCream, photos.hairSkin],
    availability: 'available',
    highlights: ['Applied at home', 'Personalized to your concern', 'Progress check-ins'],
    overview:
      'Topical formulations are applied directly to the skin or scalp. A clinician can review your concern, photos where relevant and history to discuss suitable options.',
    prescribing: 'If a topical option is appropriate, your clinician will explain how to apply it and what to watch for.',
    considerations: ['Mention skin sensitivities or reactions to previous products.', 'Avoid applying to broken or irritated skin unless advised.'],
  },
  {
    slug: 'nasal-spray',
    name: 'Nasal spray',
    tagline: 'A needle-free format to discuss for wellness and recovery.',
    summary: 'A nasal format your clinician may consider for certain wellness goals.',
    format: 'nasal',
    goals: ['wellness', 'recovery'],
    image: products.nasalSpray,
    imageKind: 'photo',
    gallery: [products.nasalSpray, photos.recovery],
    availability: 'available',
    highlights: ['Needle-free', 'Simple routine', 'Clinician-guided'],
    overview:
      'Nasal sprays offer a needle-free way to use certain medications. Your clinician will discuss whether a nasal option may be appropriate for your goals.',
    prescribing: 'If appropriate, your clinician will explain how to use it and how follow-up works.',
    considerations: ['Share any nasal or respiratory conditions.', 'Tell your clinician about other nasal products you use.'],
  },
]

export const treatmentBySlug = (slug: string | undefined) => treatments.find((t) => t.slug === slug)

export function filterTreatments({ goal, format }: { goal?: GoalId | null; format?: FormatId | null }) {
  return treatments.filter((t) => (!goal || t.goals.includes(goal)) && (!format || t.format === format))
}

export function relatedTreatments(treatment: Treatment, limit = 4) {
  return treatments
    .filter((t) => t.slug !== treatment.slug)
    .map((t) => ({ t, score: t.goals.filter((g) => treatment.goals.includes(g)).length + (t.format === treatment.format ? 0.5 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ t }) => t)
}
