"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/gsap";
import type { ProgramContent } from "@/lib/content";

const ACCENT_STYLES: Record<string, { bar: string; tag: string }> = {
  vermilion: { bar: "bg-vermilion", tag: "text-vermilion" },
  cobalt: { bar: "bg-cobalt", tag: "text-cobalt" },
  sunflower: { bar: "bg-sunflower", tag: "text-sunflower-deep" },
  leaf: { bar: "bg-leaf", tag: "text-leaf" },
};

export default function Programs({ programs }: { programs: ProgramContent[] }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".program-card", {
        y: 70,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".program-grid", start: "top 82%" },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="programs" className="bg-paper px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-ink/60">
              <span className="inline-block h-px w-10 bg-leaf" />
              Programs
            </p>
            <h2 className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-6xl">
              Pick your <em className="font-light italic">adventure</em>
            </h2>
          </div>
          <p className="max-w-sm leading-relaxed text-ink/70">
            Private and semi-private seminars, field trips, events and online
            lessons — for students of all ages, from four to grandparents.
          </p>
        </div>

        <div className="program-grid mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => {
            const style = ACCENT_STYLES[p.accent] ?? ACCENT_STYLES.vermilion;
            return (
              <article
                key={p.slug}
                className={`program-card group relative overflow-hidden rounded-3xl border-2 border-ink bg-paper p-8 shadow-[6px_6px_0_0_var(--color-ink)] transition-transform duration-300 hover:-translate-y-2 hover:rotate-[0.5deg] ${
                  i === 0 ? "lg:col-span-2 lg:flex lg:items-end lg:justify-between lg:gap-10" : ""
                }`}
              >
                <div>
                  <span className={`text-xs font-bold uppercase tracking-[0.25em] ${style.tag}`}>
                    {String(i + 1).padStart(2, "0")} — {p.tagline}
                  </span>
                  <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-lg leading-relaxed text-ink/75">{p.body}</p>
                </div>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-2 underline-offset-4 transition-colors hover:text-vermilion lg:mt-0 lg:shrink-0"
                >
                  Ask about this <span aria-hidden>→</span>
                </a>
                <span
                  className={`absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${style.bar}`}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
