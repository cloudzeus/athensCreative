"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/gsap";
import { CONTACT } from "@/lib/content";
import { Arrow } from "@/components/Doodles";

const initialState: ContactState = { status: "idle", message: "" };

const inputClass =
  "w-full rounded-2xl border-2 border-ink bg-paper px-5 py-4 text-ink placeholder:text-ink/40 outline-none transition-shadow focus-visible:shadow-[4px_4px_0_0_var(--color-cobalt)]";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const [message, setMessage] = useState("");

  // "Grab this slot" buttons in the timetable prefill the message here.
  useEffect(() => {
    const onBook = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      document.getElementById("message")?.focus({ preventScroll: true });
    };
    window.addEventListener("ac:book", onBook);
    return () => window.removeEventListener("ac:book", onBook);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".contact-reveal", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 72%" },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden bg-paper px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[5fr_6fr] lg:gap-24">
        <div>
          <p className="contact-reveal mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-ink/60">
            <span className="inline-block h-px w-10 bg-vermilion" />
            Contact
          </p>
          <h2 className="contact-reveal font-display text-5xl font-medium leading-[1.02] tracking-tight text-ink sm:text-7xl">
            Say <em className="font-light italic text-vermilion">hello.</em>
          </h2>
          <p className="contact-reveal mt-6 max-w-md text-lg leading-relaxed text-ink/75">
            Come visit the studio, ask about a program, or book a free trial
            lesson. Παιδιά και γονείς — everyone is welcome.
          </p>

          <dl className="contact-reveal mt-10 space-y-5 text-ink">
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.25em] text-ink/50">Studio</dt>
              <dd className="mt-1 text-lg font-medium">
                {CONTACT.address}
                <br />
                {CONTACT.city}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.25em] text-ink/50">Phone</dt>
              <dd className="mt-1">
                <a href={CONTACT.phoneHref} className="text-lg font-medium underline decoration-sunflower decoration-4 underline-offset-4 hover:text-vermilion">
                  {CONTACT.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.25em] text-ink/50">Email</dt>
              <dd className="mt-1">
                <a href={CONTACT.emailHref} className="text-lg font-medium underline decoration-cobalt decoration-4 underline-offset-4 hover:text-vermilion">
                  {CONTACT.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.25em] text-ink/50">Social</dt>
              <dd className="mt-1 flex gap-4 text-lg font-medium">
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="underline decoration-vermilion decoration-4 underline-offset-4 hover:text-vermilion">
                  Instagram
                </a>
                <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="underline decoration-leaf decoration-4 underline-offset-4 hover:text-vermilion">
                  Facebook
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="contact-reveal relative">
          <Arrow className="absolute -top-12 right-8 hidden h-16 w-20 rotate-[140deg] text-cobalt lg:block" />
          <form
            action={formAction}
            className="rounded-[2rem] border-2 border-ink bg-paper-deep p-7 shadow-[8px_8px_0_0_var(--color-ink)] sm:p-10"
          >
            <p className="font-hand text-2xl text-ink/80">book a free trial lesson ↓</p>

            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink">
                  Your name
                </label>
                <input id="name" name="name" type="text" required placeholder="Maria Papadopoulou" className={inputClass} />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">
                  Email
                </label>
                <input id="email" name="email" type="email" required placeholder="maria@example.com" className={inputClass} />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink">
                  Tell us about your young artist
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="My daughter is 7, loves drawing dragons, and is just starting with English…"
                  className={`${inputClass} resize-none`}
                />
              </div>
              {/* Honeypot — hidden from humans */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="mt-7 w-full rounded-full bg-ink px-7 py-4 text-lg font-semibold text-paper shadow-[4px_4px_0_0_var(--color-vermilion)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-vermilion)] disabled:cursor-wait disabled:opacity-60"
            >
              {pending ? "Sending…" : "Send it with a flourish →"}
            </button>

            {state.status !== "idle" && (
              <p
                role="status"
                className={`mt-5 rounded-2xl border-2 px-5 py-3 text-sm font-medium ${
                  state.status === "success"
                    ? "border-leaf bg-leaf/10 text-leaf"
                    : "border-vermilion bg-vermilion/10 text-vermilion"
                }`}
              >
                {state.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
