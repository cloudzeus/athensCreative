import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const COOKIE = "ac_admin";
const SESSION_HOURS = 12;

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not set");
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function makeToken(userId: number): string {
  const expires = Date.now() + SESSION_HOURS * 3600_000;
  const payload = `${userId}.${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string | undefined): { userId: number } | null {
  if (!token) return null;
  const [userId, expires, sig] = token.split(".");
  if (!userId || !expires || !sig) return null;
  const expected = sign(`${userId}.${expires}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  if (Number(expires) < Date.now()) return null;
  return { userId: Number(userId) };
}

export async function getSession(): Promise<{ userId: number } | null> {
  const jar = await cookies();
  return verifyToken(jar.get(COOKIE)?.value);
}

export async function login(email: string, password: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) return false;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return false;
  const jar = await cookies();
  jar.set(COOKIE, makeToken(user.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_HOURS * 3600,
    path: "/",
  });
  return true;
}

export async function logout(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}
