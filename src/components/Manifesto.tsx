"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/components/gsap";
import { CircleScribble, SpeechBubble, Sun, Underline } from "@/components/Doodles";

const CARDS = [
  {
    icon: SpeechBubble,
    accent: "text-vermilion",
    title: "Speak before you write",
    body: "Everyone learns to speak before they write. How will we know what to write if we don't know what to say? Conversation comes first — always.",
  },
  {
    icon: Sun,
    accent: "text-cobalt",
    title: "Student-led, not teacher-led",
    body: "Children taking a lead role in their education is an internationally practiced, research-supported approach. They choose; English follows.",
  },
  {
    icon: Underline,
    accent: "text-leaf",
    title: "Comfort opens minds",
    body: "The more comfortable children are, the more their minds open — and they flow into English effortlessly, without noticing they're 'studying'.",
  },
];

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const split = SplitText.create(".manifesto-heading", {
        type: "lines",
        linesClass: "overflow-hidden pb-[0.1em] -mb-[0.1em]",
      });
      const inner = SplitText.create(split.lines, { type: "lines" });

      gsap.from(inner.lines, {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: ".manifesto-heading", start: "top 78%" },
      });

      // The circled word draws itself once the heading has landed.
      gsap.fromTo(
        ".manifesto-circle .doodle-stroke",
        { strokeDasharray: 1400, strokeDashoffset: 1400 },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".manifesto-heading", start: "top 60%" },
        }
      );

      gsap.from(".manifesto-card", {
        y: 60,
        opacity: 0,
        rotate: (i) => (i % 2 === 0 ? -2 : 2),
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".manifesto-cards", start: "top 80%" },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="idea" className="relative overflow-hidden bg-paper px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-ink/60">
          <span className="inline-block h-px w-10 bg-vermilion" />
          The idea
        </p>

        <h2 className="manifesto-heading max-w-5xl font-display text-4xl font-medium leading-[1.12] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          Children walk in and are instantly{" "}
          <span className="relative inline-block whitespace-nowrap">
            inspired
            <CircleScribble className="manifesto-circle pointer-events-none absolute -inset-x-[8%] -inset-y-[18%] h-[136%] w-[116%] text-vermilion" />
          </span>
          {" "}— colours, sounds, <em className="font-light italic">the air of freedom.</em>
        </h2>

        <div className="manifesto-cards mt-16 grid gap-6 sm:mt-24 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <article
              key={card.title}
              className={`manifesto-card rounded-3xl border-2 border-ink bg-paper-deep p-7 shadow-[6px_6px_0_0_var(--color-ink)] sm:p-8 ${
                i === 1 ? "md:translate-y-10" : ""
              }`}
            >
              <card.icon className={`h-12 w-12 ${card.accent}`} />
              <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{card.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/75">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
