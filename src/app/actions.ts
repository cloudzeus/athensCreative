"use server";

import { prisma } from "@/lib/prisma";
import { contactAutoReplyEmail, contactNotificationEmail, sendMail } from "@/lib/mailgun";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot — bots fill every field, humans never see this one.
  if (formData.get("website")) {
    return { status: "success", message: "Ευχαριστούμε! We'll be in touch soon." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (name.length < 2) {
    return { status: "error", message: "Please tell us your name." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That email doesn't look right — mind checking it?" };
  }
  if (message.length < 10) {
    return { status: "error", message: "Tell us a little more — a sentence or two helps." };
  }

  let stored = false;
  try {
    await prisma.contactMessage.create({ data: { name, email, message } });
    stored = true;
  } catch {
    console.warn("[contact] Postgres unreachable — message not stored");
  }

  // Best-effort emails via Mailgun; the DB row is the source of truth.
  const notified = await sendMail(contactNotificationEmail(name, email, message));
  if (notified) void sendMail(contactAutoReplyEmail(name, email));

  if (stored || notified) {
    return { status: "success", message: "Ευχαριστούμε! We'll be in touch soon." };
  }
  return {
    status: "error",
    message:
      "We couldn't send your message just now — please email us directly at info@athens-creative.com.",
  };
}
