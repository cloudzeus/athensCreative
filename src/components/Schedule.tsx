"use client";

import { useMemo, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/gsap";
import type { LessonContent, LessonKind, ScheduleSlotContent } from "@/lib/content";
import { MusicNote, Paintbrush, SpeechBubble, Star, Sun } from "@/components/Doodles";

const DAYS = ["Wednesday", "Thursday", "Friday", "Saturday", "Online"] as const;

const KIND_META: Record<
  LessonKind,
  { label: string; icon: typeof Paintbrush; text: string; bg: string; border: string }
> = {
  art: { label: "Art & Craft", icon: Paintbrush, text: "text-vermilion", bg: "bg-vermilion", border: "border-vermilion" },
  music: { label: "Music & Song", icon: MusicNote, text: "text-cobalt", bg: "bg-cobalt", border: "border-cobalt" },
  play: { label: "Play & Performance", icon: Star, text: "text-sunflower-deep", bg: "bg-sunflower", border: "border-sunflower" },
  speak: { label: "Speak First", icon: SpeechBubble, text: "text-leaf", bg: "bg-leaf", border: "border-leaf" },
};

function bookSlot(lesson: LessonContent) {
  const message = `Hello! I'd like to book "${lesson.title}" (${lesson.day} ${lesson.start}–${lesson.end}, ages ${lesson.ages}). `;
  window.dispatchEvent(new CustomEvent("ac:book", { detail: message }));
}

export default function Schedule({
  lessons,
  slots,
}: {
  lessons: LessonContent[];
  slots: ScheduleSlotContent[];
}) {
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [day, setDay] = useState<(typeof DAYS)[number]>("Wednesday");

  const byDay = useMemo(() => {
    const map = new Map<string, LessonContent[]>();
    for (const l of lessons) {
      map.set(l.day, [...(map.get(l.day) ?? []), l]);
    }
    for (const list of map.values()) list.sort((a, b) => a.start.localeCompare(b.start));
    return map;
  }, [lessons]);

  const hours = useMemo(
    () => slots.filter((s) => s.opens !== "—").map((s) => s.day.slice(0, 3)),
    [slots]
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".timetable-head > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 72%" },
      });
    },
    { scope: ref }
  );

  // Re-animate the cards whenever the selected day changes.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".lesson-card",
        { y: 46, opacity: 0, rotate: (i: number) => (i % 2 ? 1.5 : -1.5) },
        { y: 0, opacity: 1, rotate: 0, duration: 0.55, stagger: 0.08, ease: "power3.out" }
      );
    },
    { scope: gridRef, dependencies: [day] }
  );

  const current = byDay.get(day) ?? [];

  return (
    <section ref={ref} id="schedule" className="bg-ink px-5 py-24 text-paper sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="timetable-head">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-paper/60">
            <span className="inline-block h-px w-10 bg-sunflower" />
            The studio week
          </p>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-2xl font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl">
              Pick a day, <em className="font-light italic text-sunflower">grab a seat</em>
            </h2>
            <p className="max-w-sm leading-relaxed text-paper/70">
              The studio hums {hours.join(", ")} from 10:00 to 18:00 — private
              bookings and seminars in between. Trial lessons are free.
            </p>
          </div>

          {/* Day tabs */}
          <div className="mt-10 flex flex-wrap gap-3" role="tablist" aria-label="Choose a day">
            {DAYS.map((d) => {
              const active = d === day;
              return (
                <button
                  key={d}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setDay(d)}
                  className={`relative rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-200 sm:px-6 sm:text-base ${
                    active
                      ? "border-sunflower bg-sunflower text-ink shadow-[3px_3px_0_0_rgba(250,243,231,0.3)] -translate-y-0.5"
                      : "border-paper/30 text-paper/80 hover:border-sunflower hover:text-sunflower"
                  }`}
                >
                  {d}
                  {d !== "Online" && (
                    <span className={`ml-2 font-mono text-xs ${active ? "text-ink/60" : "text-paper/40"}`}>
                      {(byDay.get(d) ?? []).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lesson rail */}
        <div ref={gridRef} className="mt-12">
          {day === "Online" ? (
            <div className="lesson-card relative overflow-hidden rounded-[2rem] border-2 border-paper/25 bg-paper p-8 text-ink sm:p-12">
              <Sun className="absolute -right-4 -top-4 h-28 w-28 text-sunflower opacity-80" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-cobalt">
                Anywhere on Earth
              </span>
              <h3 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                The studio comes <em className="font-light italic">to you</em>
              </h3>
              <p className="mt-4 max-w-xl leading-relaxed text-ink/75">
                The same playful, speaking-first lessons over video — songs,
                drawing prompts and games designed for the screen. Times are
                arranged around your family, so just ask.
              </p>
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("ac:book", {
                      detail: "Hello! We're interested in online lessons. ",
                    })
                  )
                }
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-cobalt px-7 py-4 font-semibold text-paper shadow-[4px_4px_0_0_var(--color-ink)] transition-all duration-200 hover:-translate-y-1"
              >
                <a href="#contact">Inquire for availability →</a>
              </button>
            </div>
          ) : (
            <ul className="grid gap-5 md:grid-cols-2">
              {current.map((lesson) => {
                const meta = KIND_META[lesson.kind];
                const lastSpot = lesson.spots <= 1;
                return (
                  <li
                    key={`${lesson.day}-${lesson.start}-${lesson.title}`}
                    className={`lesson-card group relative flex flex-col gap-4 rounded-3xl border-l-[10px] bg-paper p-6 text-ink shadow-[5px_5px_0_0_rgba(250,243,231,0.18)] sm:flex-row sm:items-center sm:gap-6 sm:p-7 ${meta.border}`}
                  >
                    <div className="flex shrink-0 items-center gap-4 sm:w-40 sm:flex-col sm:items-start sm:gap-1">
                      <span className="font-mono text-lg font-medium leading-none sm:text-xl">
                        {lesson.start}
                      </span>
                      <span className="font-mono text-sm text-ink/50">— {lesson.end}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] ${meta.text}`}>
                        <meta.icon className="h-5 w-5" />
                        {meta.label}
                      </div>
                      <h3 className="mt-1.5 font-display text-2xl font-semibold tracking-tight">
                        {lesson.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-ink/70">
                        <span className="rounded-full bg-paper-deep px-3 py-1 font-medium">
                          ages {lesson.ages}
                        </span>
                        <span className="flex items-center gap-1.5" aria-label={`${lesson.spots} spots left`}>
                          {Array.from({ length: Math.min(lesson.spots, 6) }).map((_, i) => (
                            <span key={i} className={`inline-block h-2.5 w-2.5 rounded-full ${meta.bg}`} />
                          ))}
                          <span className="ml-1">{lesson.spots} left</span>
                        </span>
                        {lastSpot && (
                          <span className="rotate-[-2deg] font-hand text-lg text-vermilion">
                            last spot!
                          </span>
                        )}
                      </div>
                    </div>

                    <a
                      href="#contact"
                      onClick={() => bookSlot(lesson)}
                      className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-sunflower)] sm:self-center"
                    >
                      Grab this slot →
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <p className="mt-10 text-center font-hand text-xl text-paper/50">
          don't see a time that fits? private slots hide between the lessons — just ask
        </p>
      </div>
    </section>
  );
}
