import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Studio Admin — Athens Creative English",
  robots: { index: false, follow: false },
};

const TABS = [
  { href: "/admin", label: "Inbox" },
  { href: "/admin/lessons", label: "Lessons" },
  { href: "/admin/programs", label: "Programs" },
  { href: "/admin/schedule", label: "Hours" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-svh bg-paper-deep">
      <header className="border-b-2 border-ink bg-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-semibold text-ink">Athens Creative</span>
            <span className="font-hand text-lg text-vermilion">admin</span>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            {TABS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="rounded-full border-2 border-ink px-4 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-sunflower"
              >
                {t.label}
              </Link>
            ))}
            <a
              href="/"
              className="rounded-full border-2 border-transparent px-4 py-1.5 text-sm font-semibold text-ink/60 hover:text-ink"
            >
              View site ↗
            </a>
            <form action={logoutAction}>
              <button className="rounded-full bg-ink px-4 py-1.5 text-sm font-semibold text-paper hover:bg-vermilion">
                Log out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
    </div>
  );
}
