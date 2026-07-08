import { prisma } from "@/lib/prisma";
import { updateSlot } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const inputClass =
  "rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm text-ink outline-none focus-visible:shadow-[3px_3px_0_0_var(--color-cobalt)]";

export default async function AdminSchedule() {
  const slots = await prisma.scheduleSlot.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="font-display text-4xl font-semibold text-ink">Studio hours</h1>
      <p className="mt-2 text-ink/60">
        Opening hours per day. Use &ldquo;—&rdquo; for days handled by note only (e.g. Online).
      </p>

      <ul className="mt-8 space-y-4">
        {slots.map((s) => (
          <li key={s.id} className="rounded-2xl border-2 border-ink bg-paper p-5 shadow-[4px_4px_0_0_var(--color-ink)]">
            <form action={updateSlot} className="flex flex-wrap items-end gap-3">
              <input type="hidden" name="id" value={s.id} />
              <span className="w-28 font-display text-xl font-semibold text-ink">{s.day}</span>
              <label className="flex flex-col gap-1 text-xs font-semibold text-ink/70">
                Opens
                <input name="opens" defaultValue={s.opens} className={inputClass} />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold text-ink/70">
                Closes
                <input name="closes" defaultValue={s.closes} className={inputClass} />
              </label>
              <label className="flex min-w-48 flex-1 flex-col gap-1 text-xs font-semibold text-ink/70">
                Note
                <input name="note" defaultValue={s.note} className={inputClass} />
              </label>
              <button className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper hover:bg-leaf">
                Save
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
