import { Button } from '@/components/ui/Button'
import { ParallaxImage, Reveal, TextReveal } from '@/components/ui/motion'
import { Eyebrow } from '@/components/ui/Section'
import { photos } from '@/data/media'
import { site } from '@/data/site'

export function FinalCta({
  eyebrow = 'More life. More you.',
  title = 'Your next chapter\nstarts with a\nconversation.',
  lead = 'Share your goals. Discuss your options with a clinician.',
  image = photos.careLifestyle,
}: {
  eyebrow?: string
  title?: string
  lead?: string
  image?: string
}) {
  return (
    <section data-cta-zone className="grain relative isolate overflow-hidden bg-navy text-white">
      {/* Soft light, no hard-edged shapes behind the headline */}
      <div
        aria-hidden
        className="absolute -top-1/2 -left-1/3 aspect-square w-[110vmax] rounded-full bg-[radial-gradient(circle,rgb(0_155_173/0.22),transparent_55%)] md:w-[70vmax]"
      />
      <div className="absolute inset-y-0 right-0 hidden w-[50%] md:block">
        <div
          aria-hidden
          className="absolute top-1/2 left-0 aspect-square h-[150%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgb(0_155_173/0.35),transparent_62%)]"
        />
        <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent_4%,black_44%)]">
          <ParallaxImage src={image} alt="Smiling woman outdoors looking ahead" className="h-full w-full" imgClassName="object-[30%_center]" strength={8} />
        </div>
      </div>
      <div className="relative container-x pt-16 pb-10 md:py-24 lg:py-28">
        <div className="max-w-2xl md:max-w-[52%] lg:max-w-2xl">
          <Reveal y={12}>
            <Eyebrow light className="text-white/80">
              {eyebrow}
            </Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            text={title}
            className="mt-4 text-[36px] leading-[0.98] font-extrabold tracking-[-0.02em] text-balance uppercase sm:text-6xl lg:text-[64px]"
          />
          <Reveal delay={0.3}>
            <p className="mt-5 text-base text-white/85 sm:mt-6 sm:text-lg">{lead}</p>
            <div className="mt-8 sm:inline-block">
              <Button to={site.consultationPath} size="lg" arrow full data-cursor="Begin">
                Start my consultation
              </Button>
            </div>
            <p className="mt-4 text-xs text-white/60">Individual clinical review required.</p>
          </Reveal>
        </div>
      </div>
      <Reveal y={30} className="relative container-x pb-5 md:hidden">
        <div className="aspect-[4/3] overflow-hidden rounded-[24px] ring-1 ring-white/10">
          <img src={image} alt="" loading="lazy" className="h-full w-full object-cover object-[45%_30%]" />
        </div>
      </Reveal>
    </section>
  )
}
