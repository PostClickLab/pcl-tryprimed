import { Link } from 'react-router'
import { Icon } from '@/components/ui/Icon'
import { ParallaxImage, Reveal, TextReveal } from '@/components/ui/motion'
import { photos } from '@/data/media'
import { cn } from '@/lib/cn'

const tiles = [
  { image: photos.hairSkin, label: 'Hair & skin', to: '/treatments?goal=hair-skin', position: 'object-[50%_30%]' },
  { image: photos.recovery, label: 'Recovery', to: '/treatments?goal=recovery', position: 'object-[50%_25%]' },
]

/** Asymmetric editorial photography block. */
export function Editorial() {
  return (
    <section className="py-4 sm:py-6">
      <div className="container-x grid gap-3 sm:gap-4 lg:grid-cols-[1.9fr_1fr]">
        <Reveal y={40} className="h-full">
          <Link to="/our-story" data-cursor="Our story" className="group relative block h-[340px] overflow-hidden rounded-[22px] sm:h-[420px] lg:h-[460px]">
            <ParallaxImage
              src={photos.heroCouple}
              alt="Couple smiling together by a mountain lake"
              className="h-full w-full"
              imgClassName="object-[70%_center] transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.08]"
              strength={6}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-navy/70 via-navy/10 to-transparent" />
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10">
              <TextReveal
                as="h2"
                text={'Care for\nyour next\nchapter.'}
                className="text-[38px] leading-[1.02] font-extrabold tracking-[-0.02em] text-white sm:text-[56px]"
              />
              <span className="mt-5 inline-flex translate-y-3 items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white opacity-0 backdrop-blur transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
                Read our story <Icon name="arrow" size={16} />
              </span>
            </div>
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-1 lg:grid-rows-2">
          {tiles.map((tile, i) => (
            <Reveal key={tile.label} y={40} delay={0.12 * (i + 1)} className="h-full">
              <Link to={tile.to} data-cursor="Explore" className="group relative block h-[220px] overflow-hidden rounded-[22px] sm:h-[260px] lg:h-full">
                <img
                  src={tile.image}
                  alt={tile.label}
                  loading="lazy"
                  className={cn(
                    'absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110',
                    tile.position,
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
                  <span className="font-bold">{tile.label}</span>
                  <span className="grid size-9 -rotate-45 place-items-center rounded-full bg-white text-teal transition-transform duration-500 ease-out-expo group-hover:rotate-0">
                    <Icon name="arrow" size={16} strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
