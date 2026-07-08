# Athens Creative — Site Redesign Design Spec

**Date:** 2026-07-08
**Status:** Approved for autonomous build (user delegated creative decisions)

## Goal

Rebuild athens-creative.com as an award-calibre marketing site for Athens Creative
English — Despina's studio in Gkyzi, Athens, where children learn English through
art, music, and play instead of textbook lessons. Keep the existing hero video;
redesign and expand everything else.

## Creative Direction — "The Atelier"

A child's art studio elevated to gallery level. Playful but art-directed, never
childish. The site should feel like walking into the studio Despina describes:
"colours, sounds, the air of freedom."

- **Canvas:** warm paper cream `#FAF3E7`, ink charcoal `#211D19` for type.
- **Crayon accents:** vermilion `#E8503A`, cobalt `#2B50C8`, sunflower `#F5B933`,
  leaf `#3E8E5A`. Dominant cream/ink with sharp crayon punctuation.
- **Type:** Fraunces (soft-wonk display serif) for headlines, Karla for body,
  Gochi Hand for hand-written annotations/doodle labels (sparingly).
- **Texture:** subtle paper-grain overlay, hand-drawn SVG doodles (squiggles,
  stars, circled words) that draw themselves in on scroll (stroke-dashoffset).
- **Motion (GSAP 3.13+, all plugins free):** SplitText hero reveal, ScrollTrigger
  section choreography, pinned horizontal-scroll "Method" section, marquee strip,
  animated counters, magnetic CTA buttons. `prefers-reduced-motion` respected.

## Sections (single-page home)

1. **Hero** — existing background video (downloaded to `public/`), ink gradient
   overlay, giant staggered headline "English, taught like an art.", CTAs, nav.
2. **Marquee** — Paint · Sing · Play · Speak · Build · Imagine · Perform loop.
3. **Manifesto** — "What is Athens Creative?" line-by-line text reveal built from
   Despina's real quotes (speak before you write; comfort opens minds).
4. **The Method** — pinned horizontal scroll, 4 crayon-coloured panels:
   Art & Craft / Music & Song / Play & Performance / Speak First.
5. **Meet Despina** — bio (actor, musician, Mayfield Regional Arts Toronto,
   Sears Festival directing award, performing on 4 continents, teaching since
   2013), animated stat counters, collage portrait frame.
6. **Programs** — Private seminars, semi-private, field trips, events, online
   (from DB).
7. **Schedule** — Wed/Thu/Fri/Sat 10:00–18:00 in-studio, online on request
   (from DB).
8. **Contact** — form → server action → Prisma `ContactMessage`; address
   (77 Ragkavi, Gkyzi, 114 75 Athens), phone +30 693 952 3314,
   info@athens-creative.com, socials (Facebook, Instagram).
9. **Footer** — sign-off, socials, copyright.

## Tech

- **Next.js (App Router, latest), TypeScript, Tailwind CSS 4**, per global rules.
- **GSAP** via `useGSAP` hook (`@gsap/react`); client components only for
  animated leaves, data fetching stays in server components.
- **Prisma ORM over MySQL 8**: models `Program`, `ScheduleSlot`, `ContactMessage`.
  Seed script provided. Every read wrapped with a static-content fallback so the
  site renders fully even when MySQL isn't running; contact form degrades to a
  mailto hint if the DB write fails.
- **shadcn/ui** primitives for form controls (Button, Input, Textarea, Label),
  restyled to the atelier theme.
- Hero video self-hosted in `public/video/athens-creative.mp4` (26 MB, poster
  frame extracted for fast paint; `preload="metadata"`).

## Error handling & a11y

- DB unavailable → fallback constants, no crash, `console.warn` server-side.
- Form validation server-side (zod-free, simple checks) + honeypot field.
- Reduced-motion media query disables pins/split animations.
- Semantic landmarks, alt text, focus-visible styles, AA contrast on cream.
