"use server";

import { prisma } from "@/lib/prisma";

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

  try {
    await prisma.contactMessage.create({ data: { name, email, message } });
    return { status: "success", message: "Ευχαριστούμε! We'll be in touch soon." };
  } catch {
    console.warn("[contact] MySQL unreachable — message not stored");
    return {
      status: "error",
      message:
        "We couldn't save your message just now — please email us directly at info@athens-creative.com.",
    };
  }
}
