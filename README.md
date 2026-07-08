# Athens Creative English — athens-creative.com

Award-calibre redesign of the Athens Creative English site: an English studio
in Gkyzi, Athens, where children learn English through **art, music and play**.

Built with **Next.js 16 (App Router) · Tailwind CSS 4 · GSAP 3 · Prisma 7 · PostgreSQL**.

## Design — "The Atelier"

A child's art studio elevated to gallery level. Warm paper cream canvas, ink
charcoal type (Fraunces + Karla + Gochi Hand), crayon accents (vermilion,
cobalt, sunflower, leaf), hand-drawn SVG doodles that draw themselves on
scroll, and a paper-grain overlay. Full design spec:
`docs/superpowers/specs/2026-07-08-athens-creative-redesign-design.md`.
The original site's text is archived in `content/site-content.md`.

### GSAP choreography
- Hero: SplitText word reveal over the original studio video, scroll parallax
- Marquee: infinite Paint · Sing · Play · Speak loop
- "The Idea": line-by-line heading reveal, hand-drawn circle around *inspired*
- "The Method": **pinned horizontal scroll** through four crayon panels
  (≥1024px; stacks vertically on mobile), via `gsap.matchMedia`
- **Dynamic timetable**: day tabs animate 16 Postgres-backed lesson cards in
  with staggered flips; "Grab this slot" prefills the contact form
- Stat counters, stroke-drawn squiggles, staggered card reveals throughout
- Everything respects `prefers-reduced-motion`

## Getting started

```bash
npm install
cp .env.example .env   # set your Postgres DATABASE_URL
npx prisma db push     # create tables in the athenscreative database
npx prisma db seed     # programs, schedule slots, 16 lessons
npm run dev
```

**The site renders fully even without the database**: all reads fall back to
the canonical static content in `src/lib/content.ts` (you'll see a
`[data] Postgres unreachable` warning — that's the fallback working, not an
error). With Postgres up, programs, schedule and lessons are served from the
DB (revalidated hourly) and contact-form submissions are stored in
`ContactMessage`.

## Architecture

```
src/
  app/
    layout.tsx      fonts (Fraunces/Karla/Gochi Hand/Plex Mono) + metadata
    page.tsx        server component — fetches data, composes sections
    actions.ts      "use server" contact-form action (honeypot + validation)
    globals.css     atelier palette, paper grain, Tailwind 4 @theme tokens
  components/       one client component per section (GSAP inside useGSAP)
    gsap.ts         central GSAP plugin registration
    Doodles.tsx     hand-drawn SVGs (animatable .doodle-stroke paths)
    Schedule.tsx    dynamic lessons timetable (day tabs, click-to-book)
  lib/
    content.ts      canonical copy — seeds the DB AND serves as fallback
    data.ts         Prisma reads with static fallback
    prisma.ts       PrismaClient + pg driver adapter (2.5s fail-fast)
prisma/
  schema.prisma     Program, ScheduleSlot, Lesson, ContactMessage
  seed.ts           idempotent seed from src/lib/content.ts
content/
  site-content.md   full text archive of the original WordPress site
```

The hero video is the original from the old site, self-hosted at
`public/video/athens-creative.mp4`.
