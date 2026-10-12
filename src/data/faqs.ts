import type { Faq } from '@/types'

export const faqCategories: { id: Faq['category']; label: string }[] = [
  { id: 'consultation', label: 'Consultation' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'treatments', label: 'Treatment options' },
  { id: 'billing', label: 'Costs & cancellation' },
  { id: 'privacy', label: 'Privacy & data' },
]

export const faqs: Faq[] = [
  {
    id: 'how-consultation-works',
    category: 'consultation',
    featured: true,
    question: 'How does the consultation work?',
    answer:
      'You start online by sharing your goals and health history. A licensed clinician reviews your information and, where needed, follows up by message or video. Together you discuss whether any options may be appropriate and agree on next steps.',
  },
  {
    id: 'what-options',
    category: 'treatments',
    featured: true,
    question: 'What options can I discuss?',
    answer:
      'Depending on your goals, you can discuss options for weight management, wellness, hair and skin, and recovery, in formats such as injections, oral medications, topicals and nasal sprays. Availability depends on clinical suitability and where you live.',
  },
  {
    id: 'prescription-guaranteed',
    category: 'eligibility',
    featured: true,
    question: 'Is a prescription guaranteed?',
    answer:
      'No. Every request is reviewed individually. A clinician will only prescribe if they determine a treatment is clinically appropriate for you. If it is not, they will explain why and may suggest alternatives.',
  },
  {
    id: 'costs-cancellation',
    category: 'billing',
    featured: true,
    question: 'What about costs and cancellation?',
    answer:
      'Pricing is shared clearly before you commit to anything. Consultation, pricing and service details are pending confirmation in this preview. You will be able to cancel ongoing plans from your account.',
  },
  {
    id: 'how-long',
    category: 'consultation',
    question: 'How long does it take?',
    answer:
      'The online questionnaire takes most people around 10 minutes. Clinical review timing varies, and your clinician may ask follow-up questions before making a recommendation.',
  },
  {
    id: 'video-required',
    category: 'consultation',
    question: 'Do I need a video call?',
    answer:
      'It depends on your location and the options being discussed. Some reviews can be completed asynchronously; others require a live video visit. You will be told before anything is scheduled.',
  },
  {
    id: 'who-eligible',
    category: 'eligibility',
    question: 'Who can use PRIMED?',
    answer:
      'Adults aged 18 and over located in a supported state can start a consultation. Some options have additional clinical criteria that your clinician will review with you.',
  },
  {
    id: 'labs',
    category: 'eligibility',
    question: 'Will I need lab work?',
    answer:
      'Sometimes. Your clinician may request recent lab results or recommend new tests before making a decision, depending on your history and the options discussed.',
  },
  {
    id: 'switch-options',
    category: 'treatments',
    question: 'Can I change or stop a treatment?',
    answer: 'Yes. Message your clinician at any time. They can review how things are going and discuss adjustments, alternatives or stopping safely.',
  },
  {
    id: 'insurance',
    category: 'billing',
    question: 'Do you accept insurance?',
    answer: 'Insurance and payment details are pending confirmation. We aim to make pricing transparent before you start any plan.',
  },
  {
    id: 'data-safety',
    category: 'privacy',
    question: 'How is my health information protected?',
    answer:
      'Your information is encrypted in transit and at rest and only accessible to the people involved in your care. Read our Privacy policy for full details.',
  },
  {
    id: 'data-sharing',
    category: 'privacy',
    question: 'Do you sell my data?',
    answer: 'No. We do not sell your personal or health information.',
  },
]
