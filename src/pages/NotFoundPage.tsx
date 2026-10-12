import { motion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { VialGlyph } from '@/components/ui/Logo'
import { usePageMeta } from '@/lib/hooks'

export default function NotFoundPage() {
  usePageMeta('Page not found')
  return (
    <section className="relative grid min-h-svh place-items-center overflow-hidden bg-gradient-to-b from-sky to-white px-4 pt-24 text-center">
      <div aria-hidden className="absolute top-1/2 left-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2 animate-blob bg-teal-100/70" />
      <div className="relative">
        <div className="flex items-baseline justify-center text-[34vw] leading-none font-extrabold tracking-[-0.05em] text-navy sm:text-[220px]">
          4
          <motion.span
            animate={{ rotate: [0, -8, 8, -4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1 }}
            className="mx-[0.04em] inline-block origin-bottom"
          >
            <VialGlyph level={0.15} strokeWidth={2} className="h-[0.74em]" />
          </motion.span>
          4
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">This page took a different path.</h1>
        <p className="mx-auto mt-3 max-w-md text-slate">The page you are looking for does not exist or has moved. Let’s get you back on track.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/" size="lg" arrow>
            Back to home
          </Button>
          <Button to="/treatments" variant="outline" size="lg">
            Explore treatments
          </Button>
        </div>
      </div>
    </section>
  )
}
