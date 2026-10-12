import type { NavLink } from '@/types'

export const site = {
  name: 'PRIMED',
  tagline: 'More life. More you.',
  description: 'Personalized online care, built around you. Discuss your goals and explore options with a clinician.',
  email: 'care@tryprimed.com',
  phone: '+1 (800) 555-0142',
  hours: 'Mon–Fri, 8am–8pm ET · Sat, 9am–3pm ET',
  consultationPath: '/consultation',
  disclaimer:
    'Treatment options require individual clinical review. This is a design preview; consultation, pricing and service details are pending confirmation.',
  year: 2026,
} as const

export const mainNav: NavLink[] = [
  { label: 'Treatments', to: '/treatments' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'Our story', to: '/our-story' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Contact', to: '/contact' },
]

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: 'Care',
    links: [
      { label: 'Weight management', to: '/treatments?goal=weight-management' },
      { label: 'Wellness', to: '/treatments?goal=wellness' },
      { label: 'Hair & skin', to: '/treatments?goal=hair-skin' },
      { label: 'Recovery', to: '/treatments?goal=recovery' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'How it works', to: '/how-it-works' },
      { label: 'Our story', to: '/our-story' },
      { label: 'FAQs', to: '/faqs' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', to: '/legal/privacy-policy' },
      { label: 'Terms of service', to: '/legal/terms-of-service' },
      { label: 'Telehealth consent', to: '/legal/telehealth-consent' },
      { label: 'Refunds & cancellation', to: '/legal/refund-policy' },
      { label: 'Accessibility', to: '/legal/accessibility' },
    ],
  },
]
