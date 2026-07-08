"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/admin/actions";

const inputClass =
  "w-full rounded-2xl border-2 border-ink bg-paper px-5 py-3.5 text-ink outline-none focus-visible:shadow-[4px_4px_0_0_var(--color-cobalt)]";

export default function AdminLogin() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, {
    error: "",
  });

  return (
    <main className="flex min-h-svh items-center justify-center bg-paper-deep px-5">
      <form
        action={formAction}
        className="w-full max-w-sm rotate-[-1deg] rounded-[2rem] border-2 border-ink bg-paper p-8 shadow-[8px_8px_0_0_var(--color-ink)]"
      >
        <p className="font-hand text-2xl text-vermilion">the teacher&apos;s desk</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ink">Studio Admin</h1>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
              Email
            </label>
            <input id="email" name="email" type="email" required autoComplete="username" className={inputClass} />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink">
              Password
            </label>
            <input id="password" name="password" type="password" required autoComplete="current-password" className={inputClass} />
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-full bg-ink px-6 py-3.5 font-semibold text-paper shadow-[4px_4px_0_0_var(--color-sunflower)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {pending ? "Unlocking…" : "Open the studio →"}
        </button>

        {state.error && (
          <p role="alert" className="mt-4 rounded-2xl border-2 border-vermilion bg-vermilion/10 px-4 py-2.5 text-sm font-medium text-vermilion">
            {state.error}
          </p>
        )}
      </form>
    </main>
  );
}
