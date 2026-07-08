import { prisma } from "@/lib/prisma";
import { deleteMessage } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminInbox() {
  const [messages, lessonCount, programCount] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.lesson.count(),
    prisma.program.count(),
  ]);

  return (
    <div>
      <h1 className="font-display text-4xl font-semibold text-ink">Inbox</h1>
      <div className="mt-4 flex flex-wrap gap-4">
        {[
          { label: "messages", value: messages.length },
          { label: "lessons on the timetable", value: lessonCount },
          { label: "programs", value: programCount },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border-2 border-ink bg-paper px-5 py-3 shadow-[4px_4px_0_0_var(--color-ink)]">
            <span className="font-display text-3xl font-semibold text-ink">{s.value}</span>
            <span className="ml-2 text-sm text-ink/60">{s.label}</span>
          </div>
        ))}
      </div>

      <ul className="mt-8 space-y-4">
        {messages.length === 0 && (
          <li className="rounded-2xl border-2 border-dashed border-ink/30 p-8 text-center text-ink/50">
            No messages yet — they&apos;ll land here when parents write in.
          </li>
        )}
        {messages.map((m) => (
          <li key={m.id} className="rounded-2xl border-2 border-ink bg-paper p-5 shadow-[4px_4px_0_0_var(--color-ink)]">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <span className="font-display text-lg font-semibold text-ink">{m.name}</span>
                <a href={`mailto:${m.email}`} className="ml-3 text-sm font-medium text-cobalt underline underline-offset-2">
                  {m.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <time className="text-xs text-ink/50">
                  {m.createdAt.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                </time>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <button className="rounded-full border-2 border-vermilion px-3 py-1 text-xs font-semibold text-vermilion hover:bg-vermilion hover:text-paper">
                    Delete
                  </button>
                </form>
              </div>
            </div>
            <p className="mt-3 whitespace-pre-wrap leading-relaxed text-ink/80">{m.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
