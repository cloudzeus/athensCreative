"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/components/gsap";

const LINKS = [
  { href: "#idea", label: "The Idea" },
  { href: "#method", label: "The Method" },
  { href: "#despina", label: "Despina" },
  { href: "#programs", label: "Programs" },
  { href: "#schedule", label: "Schedule" },
];

export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      // Solidify the bar once the hero is scrolled past.
      ScrollTrigger.create({
        start: "80 top",
        onToggle: (self) => {
          ref.current?.classList.toggle("nav-solid", self.isActive);
        },
      });
      gsap.from(ref.current, { yPercent: -100, duration: 0.9, ease: "power4.out", delay: 0.4 });
    },
    { scope: ref }
  );

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500 [&.nav-solid]:bg-paper/90 [&.nav-solid]:shadow-[0_1px_0_0_var(--color-ink)] [&.nav-solid]:backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-baseline gap-1 text-paper [.nav-solid_&]:text-ink">
          <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
            Athens Creative
          </span>
          <span className="font-hand text-2xl leading-none text-vermilion transition-transform duration-300 group-hover:rotate-[20deg]">
            *
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium tracking-wide text-paper/90 transition-colors hover:text-sunflower [.nav-solid_&]:text-ink/80 [.nav-solid_&]:hover:text-vermilion"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full bg-vermilion px-5 py-2.5 text-sm font-semibold text-paper shadow-[3px_3px_0_0_rgba(33,29,25,0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_rgba(33,29,25,0.9)] sm:inline-block"
          >
            Book a trial lesson
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-current text-paper [.nav-solid_&]:text-ink lg:hidden"
          >
            <span className={`h-0.5 w-4 bg-current transition-transform ${open ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`h-0.5 w-4 bg-current transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-paper px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 font-display text-2xl text-ink hover:text-vermilion"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-block rounded-full bg-vermilion px-5 py-2.5 text-sm font-semibold text-paper"
              >
                Book a trial lesson
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
