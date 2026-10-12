import type { RouteObject } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'

/** Each page is code-split; adding a page means adding one entry here. */
const page = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({ Component: (await load()).default })

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'treatments', lazy: page(() => import('@/pages/TreatmentsPage')) },
      { path: 'treatments/:slug', lazy: page(() => import('@/pages/TreatmentPage')) },
      { path: 'how-it-works', lazy: page(() => import('@/pages/HowItWorksPage')) },
      { path: 'our-story', lazy: page(() => import('@/pages/OurStoryPage')) },
      { path: 'faqs', lazy: page(() => import('@/pages/FaqPage')) },
      { path: 'contact', lazy: page(() => import('@/pages/ContactPage')) },
      { path: 'consultation', lazy: page(() => import('@/pages/ConsultationPage')) },
      { path: 'legal/:slug', lazy: page(() => import('@/pages/LegalPage')) },
      { path: '*', lazy: page(() => import('@/pages/NotFoundPage')) },
    ],
  },
]
