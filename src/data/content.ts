import { photos } from '@/data/media'
import type { IconName } from '@/components/ui/Icon'
import type { Step } from '@/types'

export const heroTrust: { icon: IconName; label: string }[] = [
  { icon: 'consultation', label: 'Online\nconsultation' },
  { icon: 'clinical', label: 'Individual\nclinical review' },
  { icon: 'user', label: 'Personalized\ncare' },
]

export const conversationPoints: Step[] = [
  { id: 'review', icon: 'clinical', title: 'Clinical review', description: 'A clinician reviews whether treatment is appropriate.' },
  { id: 'goals', icon: 'chat', title: 'Your goals', description: 'Discuss your options and care plan.' },
  { id: 'next', icon: 'user', title: 'Your next steps', description: 'Get guidance on potential next steps.' },
]

export const journeySteps: Step[] = [
  {
    id: 'share',
    icon: 'chat',
    title: 'Share your goals',
    description: 'Complete your health history.',
    detail:
      'Answer a short online questionnaire about your goals, medical history, medications and lifestyle. It takes around 10 minutes and you can save as you go.',
  },
  {
    id: 'review',
    icon: 'clinical',
    title: 'Clinical review',
    description: 'A clinician reviews whether treatment is appropriate.',
    detail:
      'A licensed clinician reviews your information, may ask follow-up questions or request a video visit, and considers whether any option is clinically appropriate.',
  },
  {
    id: 'plan',
    icon: 'user',
    title: 'Plan your next steps',
    description: 'Discuss your options and care plan.',
    detail:
      'You receive a clear recommendation, including when treatment is not the right fit. If prescribed, you get guidance, check-ins and direct messaging with your care team.',
  },
]

export const perspectives = [
  { id: 'patient', quote: 'I want clear answers before deciding.', label: 'Illustrative feedback', image: photos.careLifestyle },
  {
    id: 'clinician',
    quote: 'Understanding your health history and goals comes first.',
    label: 'Illustrative professional perspective',
    image: photos.clinician,
  },
]

export const marqueeWords = [
  'Online consultation',
  'Individual clinical review',
  'Personalized care',
  'Ongoing support',
  'Transparent next steps',
  'Licensed clinicians',
]

export const included: { icon: IconName; title: string; description: string }[] = [
  { icon: 'consultation', title: 'Online consultation', description: 'Start from any device, whenever it suits you.' },
  { icon: 'clinical', title: 'Licensed clinicians', description: 'Every request is reviewed individually by a licensed clinician.' },
  { icon: 'chat', title: 'Direct messaging', description: 'Ask questions and get answers from your care team.' },
  { icon: 'shield', title: 'Private by design', description: 'Your health information is encrypted and never sold.' },
  { icon: 'calendar', title: 'Ongoing check-ins', description: 'Progress reviews and adjustments when you need them.' },
  { icon: 'box', title: 'Discreet delivery', description: 'If prescribed, medication can be delivered to your door.' },
]

export const storyPrinciples = [
  {
    id: 'listen',
    number: '01',
    title: 'Listen first.',
    body: 'Care starts with your story: your history, your goals and what matters to you. Not with a product.',
    image: photos.careLifestyle,
  },
  {
    id: 'clinical',
    number: '02',
    title: 'Clinically led.',
    body: 'Licensed clinicians make every decision. A prescription is a clinical judgement, never a checkout button.',
    image: photos.clinician,
  },
  {
    id: 'honest',
    number: '03',
    title: 'Honest answers.',
    body: 'Sometimes the right answer is “not this” or “not yet”. We say so clearly, and explain why.',
    image: photos.hairSkin,
  },
  {
    id: 'human',
    number: '04',
    title: 'Human, online.',
    body: 'Technology removes the waiting room, not the person. You can always reach your care team.',
    image: photos.heroConsultation,
  },
  {
    id: 'chapter',
    number: '05',
    title: 'For your next chapter.',
    body: 'Care that adapts as you do, so you can keep showing up for the life you are building.',
    image: photos.heroCouple,
  },
]

export const storyFacts = [
  { value: 4, suffix: '', label: 'Areas of care' },
  { value: 3, suffix: '', label: 'Simple steps to start' },
  { value: 100, suffix: '%', label: 'Online, from any device' },
  { value: 1, suffix: ':1', label: 'Clinician review for every request' },
]
