# PRIMED — web

Marketing site and consultation intake for PRIMED, built with **React 19, TypeScript, Tailwind CSS v4, Motion and Lenis** on Vite.

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build
npm run images     # re-export /design assets to optimized WebP
npm run format     # prettier (+ tailwind class sorting)
```

## Structure

```
design/                 Raw design exports (mockups, PNGs, SVGs). Source of truth for images.
scripts/                optimize-images.mjs → src/assets/images/*.webp (35 MB → ~1.2 MB)
src/
  data/                 ALL content: site config, nav, goals, treatments, FAQs, legal docs,
                        consultation questionnaire schema, media registry
  components/
    ui/                 Primitives: Button, Icon, Logo/VialGlyph, Accordion, Field,
                        ProductVisual, Section, motion.tsx (Reveal, TextReveal, ScrollText,
                        ParallaxImage, SpotlightCard, Marquee, Counter)
    layout/             Layout (route transitions), Header + mega menu, Footer, Preloader,
                        CommandPalette (⌘K), Cursor, ScrollProgress
    sections/           Reusable page sections: PageHero, FinalCta, FaqSection, CareJourney, TreatmentCard
    home/               Homepage-only sections
  pages/                One file per route (lazy loaded)
  providers/            IntroProvider (preloader state), SmoothScroll (Lenis)
  lib/                  cn, hooks, api (integration stubs)
  routes.tsx            Route table
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home (pixel-matched to the desktop mockup) |
| `/treatments` | Collection with goal + format filters synced to the URL (`?goal=…&format=…`) |
| `/treatments/:slug` | Product detail (gallery, facts, safety accordion, related) |
| `/how-it-works` | Sticky scroll storytelling of the care journey |
| `/our-story` | Scroll-lit manifesto, counters, pinned horizontal principles |
| `/faqs` | Searchable, categorized FAQ (deep-linkable via `#question-id`) |
| `/contact` | Contact form (topic prefill via `?topic=slug`) |
| `/consultation` | Multi-step intake rendered from `data/consultation.ts`, saved to localStorage |
| `/legal/:slug` | Privacy, terms, telehealth consent, refunds, accessibility (scroll-spy TOC) |

## Extending

- **New treatment:** add an entry to `src/data/treatments.ts`. It appears in the collection, filters, mega menu, explorer, search and related carousels automatically.
- **New question in the consultation:** add a field/step to `src/data/consultation.ts`.
- **New policy:** add a doc to `src/data/legal.ts`. It gets a page at `/legal/<slug>`.
- **New page:** create `src/pages/XPage.tsx` and add one line to `src/routes.tsx`.
- **Backend:** replace the stubs in `src/lib/api.ts` (`submitConsultation`, `submitContact`, `joinWaitlist`).
- **Design tokens:** colors, easing, shadows and keyframes live in the `@theme` block of `src/index.css`.

## Motion & interaction

- Preloader: the vial in the wordmark fills with **real** asset/font load progress, then teal floods from the vial and drains upward to reveal the page (shortened on repeat visits in the same session).
- Lenis smooth scrolling; navy curtain transitions between routes.
- Masked word reveals, scroll-linked parallax, magnetic buttons with liquid fill, cursor-following spotlight + 3D tilt cards, custom cursor with contextual labels.
- ⌘K / Ctrl+K site search across pages, goals, treatments, FAQs and policies.
- Everything respects `prefers-reduced-motion`.

## Content notes

All imagery is generated concept art; testimonials and clinician images are illustrative. Treatment names, availability, pricing and legal copy are placeholders and must be confirmed (and legally reviewed) before launch.
