"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSession, login, logout } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type LoginState = { error: string };

async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/lessons");
  revalidatePath("/admin/programs");
  revalidatePath("/admin/schedule");
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  let ok = false;
  try {
    ok = await login(email, password);
  } catch {
    return { error: "Database unreachable — try again in a moment." };
  }
  if (!ok) return { error: "Wrong email or password." };
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await logout();
  redirect("/admin/login");
}

export async function upsertLesson(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const data = {
    day: String(formData.get("day") ?? "Wednesday"),
    start: String(formData.get("start") ?? "10:00"),
    end: String(formData.get("end") ?? "11:00"),
    title: String(formData.get("title") ?? "").trim(),
    kind: String(formData.get("kind") ?? "art"),
    ages: String(formData.get("ages") ?? "all ages").trim(),
    spots: Number(formData.get("spots") ?? 4),
    order: Number(formData.get("order") ?? 0),
  };
  if (!data.title) return;
  if (id > 0) {
    await prisma.lesson.update({ where: { id }, data });
  } else {
    await prisma.lesson.create({ data });
  }
  revalidateAll();
}

export async function deleteLesson(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  if (id > 0) await prisma.lesson.delete({ where: { id } });
  revalidateAll();
}

export async function updateProgram(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  if (id <= 0) return;
  await prisma.program.update({
    where: { id },
    data: {
      title: String(formData.get("title") ?? "").trim(),
      tagline: String(formData.get("tagline") ?? "").trim(),
      body: String(formData.get("body") ?? "").trim(),
      accent: String(formData.get("accent") ?? "vermilion"),
      order: Number(formData.get("order") ?? 0),
    },
  });
  revalidateAll();
}

export async function updateSlot(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  if (id <= 0) return;
  await prisma.scheduleSlot.update({
    where: { id },
    data: {
      opens: String(formData.get("opens") ?? "10:00"),
      closes: String(formData.get("closes") ?? "18:00"),
      note: String(formData.get("note") ?? ""),
    },
  });
  revalidateAll();
}

export async function deleteMessage(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  if (id > 0) await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin");
}
