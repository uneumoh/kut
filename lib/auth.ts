// lib/auth.ts
import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const key = new TextEncoder().encode(process.env.SESSION_SECRET);
const SESSION_COOKIE = "session";

type SessionPayload = {
  userId: string;
  role: "CUSTOMER" | "ADMIN";
};

// --- Password helpers ---

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

// --- Session helpers ---

export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, key);
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

// --- Guards for Server Actions ---

export async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.role !== "ADMIN") throw new Error("Not authorized");
  return session;
}

// --- Login ---

export async function login(email: string, password: string) {
  const user = await (prisma as any).user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const valid = await verifyPassword(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  await createSession({ userId: user.id, role: user.role });
  return { userId: user.id, role: user.role };
}
