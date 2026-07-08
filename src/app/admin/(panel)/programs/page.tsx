import { prisma } from "@/lib/prisma";
import { updateProgram } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const ACCENTS = ["vermilion", "cobalt", "sunflower", "leaf"];

const inputClass =
  "w-full rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm text-ink outline-none focus-visible:shadow-[3px_3px_0_0_var(--color-cobalt)]";

export default async function AdminPrograms() {
  const programs = await prisma.program.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="font-display text-4xl font-semibold text-ink">Programs</h1>
      <p className="mt-2 text-ink/60">The cards in the &ldquo;Pick your adventure&rdquo; section.</p>

      <ul className="mt-8 grid gap-5 lg:grid-cols-2">
        {programs.map((p) => (
          <li key={p.id} className="rounded-2xl border-2 border-ink bg-paper p-5 shadow-[4px_4px_0_0_var(--color-ink)]">
            <form action={updateProgram} className="space-y-3">
              <input type="hidden" name="id" value={p.id} />
              <input type="hidden" name="order" value={p.order} />
              <label className="block text-xs font-semibold text-ink/70">
                Title
                <input name="title" defaultValue={p.title} required className={`${inputClass} mt-1`} />
              </label>
              <label className="block text-xs font-semibold text-ink/70">
                Tagline
                <input name="tagline" defaultValue={p.tagline} className={`${inputClass} mt-1`} />
              </label>
              <label className="block text-xs font-semibold text-ink/70">
                Body
                <textarea name="body" defaultValue={p.body} rows={4} className={`${inputClass} mt-1 resize-none`} />
              </label>
              <div className="flex items-end justify-between gap-3">
                <label className="block text-xs font-semibold text-ink/70">
                  Accent colour
                  <select name="accent" defaultValue={p.accent} className={`${inputClass} mt-1`}>
                    {ACCENTS.map((a) => <option key={a}>{a}</option>)}
                  </select>
                </label>
                <button className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper hover:bg-leaf">
                  Save
                </button>
              </div>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
