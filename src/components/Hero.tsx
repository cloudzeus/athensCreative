"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/components/gsap";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const split = SplitText.create(".hero-line", {
        type: "lines,words",
        linesClass: "overflow-hidden pb-[0.08em] -mb-[0.08em]",
      });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(split.words, {
        yPercent: 115,
        rotate: 3,
        duration: 1.3,
        stagger: 0.06,
        delay: 0.5,
      })
        .from(".hero-kicker", { opacity: 0, y: 16, duration: 0.8 }, "-=0.8")
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.7, stagger: 0.12 }, "-=0.5")
        .from(".hero-scroll", { opacity: 0, duration: 0.9 }, "-=0.2");

      // Gentle parallax: content drifts up as you leave the hero.
      gsap.to(".hero-content", {
        yPercent: -18,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="top" className="relative flex h-svh min-h-[620px] flex-col justify-end overflow-hidden bg-ink">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-90"
        src="/video/athens-creative.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-ink/50" />

      <div className="hero-content relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
        <p className="hero-kicker mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-sunflower sm:text-sm">
          <span className="inline-block h-px w-10 bg-sunflower" />
          An English studio in Gkyzi, Athens
        </p>

        <h1 className="font-display text-[13.5vw] font-semibold leading-[0.95] tracking-tight text-paper sm:text-[9vw] lg:text-[7.5rem]">
          <span className="hero-line block">English, taught</span>
          <span className="hero-line block">
            like <em className="font-light italic text-sunflower">an art.</em>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
          <p className="hero-sub max-w-md text-base leading-relaxed text-paper/85 sm:text-lg">
            Children paint, sing, build and perform their way into English — no
            textbooks, no drills. Just curiosity, comfort, and conversation.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="hero-cta group inline-flex items-center gap-2 rounded-full bg-vermilion px-7 py-4 text-base font-semibold text-paper shadow-[4px_4px_0_0_rgba(250,243,231,0.25)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(250,243,231,0.35)]"
            >
              Book a free trial lesson
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#method"
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-paper/40 px-7 py-4 text-base font-semibold text-paper transition-colors hover:border-sunflower hover:text-sunflower"
            >
              Explore the method
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper/60 sm:flex">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
        <span className="block h-8 w-px animate-pulse bg-paper/50" />
      </div>
    </section>
  );
}
