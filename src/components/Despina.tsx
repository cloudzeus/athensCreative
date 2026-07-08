"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/gsap";
import { MusicNote, Squiggle, Star } from "@/components/Doodles";

const STATS = [
  { value: 2013, label: "teaching through art & play since", format: (v: number) => `${Math.round(v)}` },
  { value: 4, label: "continents performed on", format: (v: number) => `${Math.round(v)}` },
  { value: 1, label: "Award of Excellence in Directing — Sears Festival, Canada", format: (v: number) => `${Math.round(v)}` },
];

export default function Despina() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(".despina-frame", {
        rotate: -9,
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });

      gsap.from(".despina-copy > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".despina-copy", start: "top 78%" },
      });

      gsap.utils.toArray<HTMLElement>(".despina-stat-value").forEach((el) => {
        const target = Number(el.dataset.value);
        const counter = { v: target > 100 ? target - 30 : 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.v)}`;
          },
        });
      });

      gsap.fromTo(
        ".despina-squiggle .doodle-stroke",
        { strokeDasharray: 600, strokeDashoffset: 600 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".despina-copy", start: "top 70%" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="despina" className="relative overflow-hidden bg-paper-deep px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[5fr_6fr] lg:gap-20">
        {/* Collage portrait card */}
        <div className="despina-frame relative mx-auto w-full max-w-md">
          <div className="rotate-[-3deg] rounded-[2rem] border-2 border-ink bg-paper p-6 shadow-[10px_10px_0_0_var(--color-ink)] sm:p-8">
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[1.4rem] bg-cobalt">
              <span className="font-display text-[11rem] font-semibold leading-none text-paper/95 sm:text-[13rem]">
                D
              </span>
              <Star className="absolute left-6 top-6 h-10 w-10 text-sunflower" />
              <MusicNote className="absolute bottom-8 right-6 h-14 w-14 text-paper/80" />
              <Star className="absolute bottom-24 left-8 h-6 w-6 rotate-12 text-vermilion" />
            </div>
            <p className="mt-5 text-center font-hand text-2xl text-ink">
              Despina — actor, musician, teacher
            </p>
          </div>
          <div className="absolute -right-4 -top-5 rotate-6 rounded-full bg-vermilion px-5 py-2 font-hand text-xl text-paper shadow-[3px_3px_0_0_var(--color-ink)]">
            your teacher!
          </div>
        </div>

        {/* Bio */}
        <div className="despina-copy">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-ink/60">
            <span className="inline-block h-px w-10 bg-cobalt" />
            Meet Despina
          </p>
          <h2 className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-6xl">
            An artist who teaches,{" "}
            <em className="font-light italic">not a teacher who assigns.</em>
          </h2>
          <Squiggle className="despina-squiggle mt-5 h-8 w-48 text-vermilion" />
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/80">
            Despina is an actor and musician with post-secondary studies in
            sociology and a diploma from Mayfield Regional Arts School in
            Toronto. She has performed across North and South America, Asia,
            Southeast Asia, and Europe — and as a self-taught pianist she
            composes and records her own music.
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/80">
            Since 2013 she has poured all of it into one thing: teaching
            English through art and play, so children learn the way artists
            do — by making things they care about.
          </p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label} className="border-t-2 border-ink pt-4">
                <dd
                  className="despina-stat-value font-display text-5xl font-semibold text-ink"
                  data-value={s.value}
                >
                  {s.value}
                </dd>
                <dt className="mt-2 text-sm leading-snug text-ink/70">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
