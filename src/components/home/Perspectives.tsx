import { Reveal, SpotlightCard, TextReveal } from '@/components/ui/motion'
import { perspectives } from '@/data/content'

export function Perspectives() {
  return (
    <section className="pt-14 sm:pt-16">
      <div className="container-x">
        <TextReveal text="Perspectives on care." className="mb-6 text-[26px] font-extrabold tracking-[-0.02em] sm:text-[32px]" />
        <Reveal stagger={0.12} className="grid gap-4 md:grid-cols-2 md:gap-8">
          {perspectives.map((p) => (
            <SpotlightCard key={p.id} className="h-full rounded-[22px]">
              <figure className="grid h-full grid-cols-[110px_1fr] overflow-hidden rounded-[22px] bg-sky-50 ring-1 ring-sky-200 transition-all duration-500 ease-out-expo group-hover/card:-translate-y-1 group-hover/card:shadow-lift sm:grid-cols-[38%_1fr]">
                <div className="relative min-h-[130px] overflow-hidden sm:min-h-[180px]">
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-[40%_center] transition-transform duration-[1.2s] ease-out-expo group-hover/card:scale-110"
                  />
                </div>
                <div className="relative flex flex-col justify-center px-5 py-6 sm:px-8">
                  <span
                    aria-hidden
                    className="absolute top-2 right-5 text-7xl leading-none font-extrabold text-teal/10 transition-all duration-700 ease-out-expo group-hover/card:-translate-y-1 group-hover/card:text-teal/25"
                  >
                    ”
                  </span>
                  <blockquote className="text-lg leading-snug font-bold text-pretty text-navy sm:text-xl">“{p.quote}”</blockquote>
                  <figcaption className="mt-3 text-xs text-slate">{p.label}</figcaption>
                </div>
              </figure>
            </SpotlightCard>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
