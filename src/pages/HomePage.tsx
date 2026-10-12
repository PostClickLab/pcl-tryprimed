import { CareJourney } from '@/components/sections/CareJourney'
import { FaqSection } from '@/components/sections/FaqSection'
import { FinalCta } from '@/components/sections/FinalCta'
import { Conversation } from '@/components/home/Conversation'
import { Editorial } from '@/components/home/Editorial'
import { GoalSelector } from '@/components/home/GoalSelector'
import { Hero } from '@/components/home/Hero'
import { Perspectives } from '@/components/home/Perspectives'
import { TreatmentExplorer } from '@/components/home/TreatmentExplorer'
import { usePageMeta } from '@/lib/hooks'

export default function HomePage() {
  usePageMeta('')
  return (
    <>
      <Hero />
      <GoalSelector />
      <Editorial />
      <Conversation />
      <CareJourney />
      <TreatmentExplorer />
      <Perspectives />
      <FaqSection className="pt-12 pb-16 sm:pb-20" />
      <FinalCta />
    </>
  )
}
