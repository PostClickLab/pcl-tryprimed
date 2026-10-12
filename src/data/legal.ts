import type { LegalDoc } from '@/types'

const PLACEHOLDER = 'Placeholder copy for the design preview. Final wording must be reviewed and approved by counsel before publication.'

export const legalDocs: LegalDoc[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy policy',
    summary: 'How PRIMED collects, uses and protects your personal and health information.',
    updated: 'October 1, 2026',
    sections: [
      {
        id: 'overview',
        heading: 'Overview',
        body: [
          PLACEHOLDER,
          'This policy explains what information we collect when you use our website and online consultation service, why we collect it, and the choices you have.',
        ],
      },
      {
        id: 'information-we-collect',
        heading: 'Information we collect',
        body: [
          'Information you provide: name, contact details, date of birth, location, health history, goals, and messages you send to your care team.',
          'Information collected automatically: device and browser data, pages visited and interactions, collected through cookies and similar technologies.',
          'Information from others: pharmacies, labs or payment providers involved in your care, where permitted by law.',
        ],
      },
      {
        id: 'how-we-use',
        heading: 'How we use information',
        body: [
          'To provide and coordinate your care, including clinical review, prescriptions where appropriate, and follow-up.',
          'To operate, secure and improve our services, communicate with you and meet legal obligations.',
        ],
      },
      {
        id: 'sharing',
        heading: 'How we share information',
        body: [
          'We share information only with clinicians, pharmacies, labs and service providers who need it to deliver your care or run our service, or when required by law. We do not sell your personal or health information.',
        ],
      },
      {
        id: 'security',
        heading: 'Security',
        body: ['We use administrative, technical and physical safeguards, including encryption in transit and at rest, to protect your information.'],
      },
      {
        id: 'your-rights',
        heading: 'Your rights and choices',
        body: [
          'Depending on where you live, you may have the right to access, correct, delete or obtain a copy of your information, and to opt out of certain processing. Contact us to make a request.',
        ],
      },
      { id: 'contact', heading: 'Contact', body: ['Questions about this policy can be sent to privacy@tryprimed.com.'] },
    ],
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of service',
    summary: 'The terms that apply when you use the PRIMED website and online care services.',
    updated: 'October 1, 2026',
    sections: [
      {
        id: 'acceptance',
        heading: 'Acceptance of terms',
        body: [PLACEHOLDER, 'By accessing or using PRIMED, you agree to these terms. If you do not agree, please do not use the service.'],
      },
      {
        id: 'medical-services',
        heading: 'Medical services',
        body: [
          'Clinical services are provided by independent licensed clinicians. PRIMED does not practice medicine. Submitting a consultation does not guarantee a diagnosis, treatment or prescription.',
        ],
      },
      {
        id: 'eligibility',
        heading: 'Eligibility',
        body: [
          'You must be at least 18 years old and located in a supported state at the time of your consultation. You agree to provide accurate and complete information.',
        ],
      },
      {
        id: 'not-emergency',
        heading: 'Not for emergencies',
        body: ['PRIMED is not an emergency service. If you think you may have a medical emergency, call 911 or go to the nearest emergency department.'],
      },
      {
        id: 'payments',
        heading: 'Payments and subscriptions',
        body: ['Prices are shown before you commit. Recurring plans renew until cancelled. See our Refund & cancellation policy for details.'],
      },
      {
        id: 'liability',
        heading: 'Limitation of liability',
        body: ['To the extent permitted by law, PRIMED is not liable for indirect, incidental or consequential damages arising from your use of the service.'],
      },
      { id: 'changes', heading: 'Changes to these terms', body: ['We may update these terms from time to time. We will notify you of material changes.'] },
    ],
  },
  {
    slug: 'telehealth-consent',
    title: 'Telehealth consent',
    summary: 'What you agree to when receiving care through an online consultation.',
    updated: 'October 1, 2026',
    sections: [
      {
        id: 'what-is-telehealth',
        heading: 'What telehealth is',
        body: [PLACEHOLDER, 'Telehealth means receiving clinical services using electronic communications such as secure messaging, questionnaires and video.'],
      },
      {
        id: 'benefits-risks',
        heading: 'Benefits and risks',
        body: [
          'Telehealth can improve access and convenience. Risks include technical failures and the limits of a remote assessment; your clinician may recommend in-person care when appropriate.',
        ],
      },
      {
        id: 'your-consent',
        heading: 'Your consent',
        body: ['By continuing, you consent to receive care via telehealth and understand you may withdraw consent at any time.'],
      },
    ],
  },
  {
    slug: 'refund-policy',
    title: 'Refunds & cancellation',
    summary: 'How cancellations, refunds and plan changes work.',
    updated: 'October 1, 2026',
    sections: [
      {
        id: 'overview',
        heading: 'Overview',
        body: [PLACEHOLDER, 'Pricing, refund and cancellation terms are pending confirmation and will be shown clearly before you commit to any plan.'],
      },
      { id: 'cancel', heading: 'Cancelling a plan', body: ['You will be able to cancel an ongoing plan from your account before your next billing date.'] },
      { id: 'refunds', heading: 'Refunds', body: ['If a clinician determines that treatment is not appropriate, you will not be charged for medication.'] },
    ],
  },
  {
    slug: 'accessibility',
    title: 'Accessibility',
    summary: 'Our commitment to an accessible experience for everyone.',
    updated: 'October 1, 2026',
    sections: [
      {
        id: 'commitment',
        heading: 'Our commitment',
        body: ['We aim to meet WCAG 2.2 Level AA. The site supports keyboard navigation, screen readers and respects reduced-motion preferences.'],
      },
      {
        id: 'feedback',
        heading: 'Feedback',
        body: ['If you experience any difficulty accessing content, contact accessibility@tryprimed.com and we will help.'],
      },
    ],
  },
]

export const legalBySlug = (slug: string | undefined) => legalDocs.find((d) => d.slug === slug)
