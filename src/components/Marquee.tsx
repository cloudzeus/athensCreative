"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/gsap";
import { Star } from "@/components/Doodles";

const WORDS = ["Paint", "Sing", "Play", "Speak", "Build", "Imagine", "Perform"];
const ACCENTS = ["text-vermilion", "text-cobalt", "text-sunflower", "text-leaf"];

export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to(".marquee-track", {
        xPercent: reverse ? 0 : -50,
        startAt: { xPercent: reverse ? -50 : 0 },
        duration: 28,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="relative z-10 overflow-hidden border-y-2 border-ink bg-paper py-4 sm:py-5"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {WORDS.map((word, i) => (
              <span key={`${copy}-${word}`} className="flex items-center">
                <span
                  className={`px-6 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl ${
                    i % 2 === 1 ? "italic font-light" : ""
                  }`}
                >
                  {word}
                </span>
                <Star className={`h-6 w-6 ${ACCENTS[i % ACCENTS.length]}`} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
