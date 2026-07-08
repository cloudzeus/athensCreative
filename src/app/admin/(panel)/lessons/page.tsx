import { prisma } from "@/lib/prisma";
import { deleteLesson, upsertLesson } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const DAYS = ["Wednesday", "Thursday", "Friday", "Saturday", "Online"];
const KINDS = ["art", "music", "play", "speak"];

const inputClass =
  "rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm text-ink outline-none focus-visible:shadow-[3px_3px_0_0_var(--color-cobalt)]";

function LessonForm({
  lesson,
}: {
  lesson?: {
    id: number; day: string; start: string; end: string; title: string;
    kind: string; ages: string; spots: number; order: number;
  };
}) {
  return (
    <form
      action={upsertLesson}
      className="grid grid-cols-2 items-end gap-3 sm:grid-cols-4 lg:grid-cols-9"
    >
      {lesson && <input type="hidden" name="id" value={lesson.id} />}
      <label className="col-span-2 flex flex-col gap-1 text-xs font-semibold text-ink/70">
        Title
        <input name="title" defaultValue={lesson?.title} required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-xs font-semibold text-ink/70">
        Day
        <select name="day" defaultValue={lesson?.day ?? "Wednesday"} className={inputClass}>
          {DAYS.map((d) => <option key={d}>{d}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs font-semibold text-ink/70">
        Kind
        <select name="kind" defaultValue={lesson?.kind ?? "art"} className={inputClass}>
          {KINDS.map((k) => <option key={k}>{k}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs font-semibold text-ink/70">
        Start
        <input name="start" defaultValue={lesson?.start ?? "10:00"} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-xs font-semibold text-ink/70">
        End
        <input name="end" defaultValue={lesson?.end ?? "11:30"} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-xs font-semibold text-ink/70">
        Ages
        <input name="ages" defaultValue={lesson?.ages ?? "all ages"} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-xs font-semibold text-ink/70">
        Spots
        <input name="spots" type="number" min={0} defaultValue={lesson?.spots ?? 4} className={inputClass} />
      </label>
      <div className="flex gap-2">
        <input type="hidden" name="order" value={lesson?.order ?? 99} />
        <button className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-leaf">
          {lesson ? "Save" : "+ Add"}
        </button>
      </div>
    </form>
  );
}

export default async function AdminLessons() {
  const lessons = await prisma.lesson.findMany({ orderBy: [{ order: "asc" }] });

  return (
    <div>
      <h1 className="font-display text-4xl font-semibold text-ink">Lessons</h1>
      <p className="mt-2 text-ink/60">
        These drive the timetable on the homepage. Changes go live within the hour (or instantly on next deploy).
      </p>

      <div className="mt-6 rounded-2xl border-2 border-dashed border-ink/40 bg-paper p-5">
        <p className="mb-3 font-hand text-xl text-leaf">add a new lesson</p>
        <LessonForm />
      </div>

      <ul className="mt-8 space-y-4">
        {lessons.map((l) => (
          <li key={l.id} className="rounded-2xl border-2 border-ink bg-paper p-5 shadow-[4px_4px_0_0_var(--color-ink)]">
            <div className="flex items-start justify-between gap-4">
              <div className="w-full">
                <LessonForm lesson={l} />
              </div>
              <form action={deleteLesson} className="shrink-0 pt-5">
                <input type="hidden" name="id" value={l.id} />
                <button className="rounded-full border-2 border-vermilion px-3 py-1.5 text-xs font-semibold text-vermilion hover:bg-vermilion hover:text-paper">
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
