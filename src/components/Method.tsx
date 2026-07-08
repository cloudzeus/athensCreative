"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/components/gsap";
import { Paintbrush, MusicNote, Star, SpeechBubble, Arrow } from "@/components/Doodles";

const PANELS = [
  {
    n: "01",
    title: "Art & Craft",
    body: "We draw, paint, and build entire worlds — then we name them, describe them, and argue about them in English. Vocabulary sticks when your hands made it.",
    icon: Paintbrush,
    bg: "bg-vermilion",
    fg: "text-paper",
    chip: "bg-paper text-vermilion",
  },
  {
    n: "02",
    title: "Music & Song",
    body: "Despina is a musician — so every lesson has a soundtrack. We sing, we compose, we record. Rhythm carries grammar further than any worksheet can.",
    icon: MusicNote,
    bg: "bg-cobalt",
    fg: "text-paper",
    chip: "bg-paper text-cobalt",
  },
  {
    n: "03",
    title: "Play & Performance",
    body: "Role-playing, invented games, little plays with big bows at the end. On stage, children stop translating and start being — in English.",
    icon: Star,
    bg: "bg-sunflower",
    fg: "text-ink",
    chip: "bg-ink text-sunflower",
  },
  {
    n: "04",
    title: "Speak First",
    body: "Speaking is the front door of every language. We talk from minute one — writing joins later, once there's something worth writing down.",
    icon: SpeechBubble,
    bg: "bg-leaf",
    fg: "text-paper",
    chip: "bg-paper text-leaf",
  },
];

export default function Method() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop with motion allowed: pin the section and scroll it sideways.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = ref.current!.querySelector<HTMLElement>(".method-track")!;
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      // Smaller screens: simple staggered reveal, vertical stack.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".method-panel").forEach((panel) => {
          gsap.from(panel, {
            y: 70,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 85%" },
          });
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="method" className="relative overflow-hidden bg-ink">
      <div className="method-track flex flex-col lg:h-svh lg:w-max lg:flex-row">
        {/* Intro panel */}
        <div className="flex flex-col justify-center px-5 py-20 sm:px-8 lg:h-svh lg:w-[44vw] lg:shrink-0 lg:px-16">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-sunflower">
            <span className="inline-block h-px w-10 bg-sunflower" />
            The method
          </p>
          <h2 className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-paper sm:text-6xl lg:text-7xl">
            Four doors <em className="font-light italic text-sunflower">into</em> English
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-paper/70">
            No two lessons look alike, but every one of them walks through at
            least one of these doors. Keep scrolling — the studio opens sideways.
          </p>
          <Arrow className="mt-10 hidden h-16 w-20 text-vermilion lg:block" />
        </div>

        {PANELS.map((p) => (
          <article
            key={p.n}
            className={`method-panel relative flex flex-col justify-between overflow-hidden px-5 py-14 sm:px-8 lg:h-svh lg:w-[38vw] lg:shrink-0 lg:border-l-2 lg:border-ink lg:px-12 lg:py-20 ${p.bg} ${p.fg}`}
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-7xl font-semibold opacity-30 lg:text-8xl">{p.n}</span>
              <p.icon className="h-14 w-14 opacity-90 lg:h-20 lg:w-20" />
            </div>
            <div>
              <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] ${p.chip}`}>
                Door {p.n}
              </span>
              <h3 className="mt-4 font-display text-4xl font-semibold tracking-tight lg:text-6xl">{p.title}</h3>
              <p className="mt-5 max-w-md text-base leading-relaxed opacity-85 lg:text-lg">{p.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
