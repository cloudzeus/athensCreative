import { prisma } from "@/lib/prisma";
import {
  LESSONS,
  PROGRAMS,
  SCHEDULE,
  type Accent,
  type LessonContent,
  type LessonKind,
  type ProgramContent,
  type ScheduleSlotContent,
} from "@/lib/content";

// Server-component data access. Falls back to the canonical static content
// whenever the database is unreachable, so the site never renders empty.

export async function getPrograms(): Promise<ProgramContent[]> {
  try {
    const rows = await prisma.program.findMany({ orderBy: { order: "asc" } });
    if (rows.length === 0) return PROGRAMS;
    return rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      tagline: r.tagline,
      body: r.body,
      accent: r.accent as Accent,
      order: r.order,
    }));
  } catch {
    console.warn("[data] Postgres unreachable — serving static programs");
    return PROGRAMS;
  }
}

export async function getSchedule(): Promise<ScheduleSlotContent[]> {
  try {
    const rows = await prisma.scheduleSlot.findMany({ orderBy: { order: "asc" } });
    if (rows.length === 0) return SCHEDULE;
    return rows.map((r) => ({
      day: r.day,
      opens: r.opens,
      closes: r.closes,
      note: r.note,
      order: r.order,
    }));
  } catch {
    console.warn("[data] Postgres unreachable — serving static schedule");
    return SCHEDULE;
  }
}

export async function getLessons(): Promise<LessonContent[]> {
  try {
    const rows = await prisma.lesson.findMany({ orderBy: { order: "asc" } });
    if (rows.length === 0) return LESSONS;
    return rows.map((r) => ({
      day: r.day,
      start: r.start,
      end: r.end,
      title: r.title,
      kind: r.kind as LessonKind,
      ages: r.ages,
      spots: r.spots,
      order: r.order,
    }));
  } catch {
    console.warn("[data] Postgres unreachable — serving static lessons");
    return LESSONS;
  }
}
