import { photos } from '@/data/media'
import type { Format, FormatId, Goal, GoalId } from '@/types'

export const goals: Goal[] = [
  {
    id: 'weight-management',
    label: 'Weight management',
    shortLabel: 'Weight\nmanagement',
    icon: 'scale',
    image: photos.weight,
    headline: 'A plan that fits your life.',
    description: 'Talk through your history, habits and goals with a clinician who can review whether medical weight management is appropriate for you.',
  },
  {
    id: 'wellness',
    label: 'Wellness',
    shortLabel: 'Wellness',
    icon: 'lotus',
    image: photos.longevity,
    headline: 'Energy for what matters.',
    description: 'Explore wellness and longevity options focused on how you want to feel day to day, guided by an individual clinical review.',
  },
  {
    id: 'hair-skin',
    label: 'Hair & skin',
    shortLabel: 'Hair\n& skin',
    icon: 'face',
    image: photos.hairSkin,
    headline: 'Care you can see.',
    description: 'Discuss hair and skin concerns with a clinician and learn which topical or other options may be suitable.',
  },
  {
    id: 'recovery',
    label: 'Recovery',
    shortLabel: 'Recovery',
    icon: 'dumbbell',
    image: photos.recovery,
    headline: 'Keep moving forward.',
    description: 'Share your training, recovery and lifestyle goals and review potential options together with a clinician.',
  },
]

export const formats: Format[] = [
  { id: 'injection', label: 'Injection', group: 'injection', icon: 'syringe' },
  { id: 'oral', label: 'Oral', group: 'oral', icon: 'pill' },
  { id: 'topical', label: 'Topical', group: 'topical-nasal', icon: 'tube' },
  { id: 'nasal', label: 'Nasal', group: 'topical-nasal', icon: 'spray' },
]

export const goalById = (id: GoalId) => goals.find((g) => g.id === id)!
export const formatById = (id: FormatId) => formats.find((f) => f.id === id)!
export const isGoalId = (value: string | null): value is GoalId => goals.some((g) => g.id === value)
export const isFormatId = (value: string | null): value is FormatId => formats.some((f) => f.id === value)
