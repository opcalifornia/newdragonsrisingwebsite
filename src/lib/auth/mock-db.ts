import "server-only";

/**
 * ⚠️ PLACEHOLDER DATA STORE — in-memory only.
 *
 * There is no database configured in this environment (no Postgres/
 * MySQL/etc. credentials). This Map holds users only for the lifetime
 * of the running process: it resets on every server restart and, in a
 * real serverless deployment (e.g. Vercel), is NOT shared across
 * function instances — two requests can hit different in-memory stores
 * entirely. This is enough to exercise the signup/login/session/role
 * flow end-to-end in development, but it is NOT production-ready.
 *
 * Before launch, replace the functions below with real queries against
 * a real database (e.g. Postgres via Vercel Postgres/Neon/Supabase,
 * queried with an ORM like Drizzle or Prisma) — the call sites in
 * src/app/actions/auth.ts and src/lib/auth/dal.ts don't need to change,
 * only these implementations.
 */

export type UserRole = "student" | "instructor" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
};

type MockDb = { users: Map<string, User> };

const globalForDb = globalThis as unknown as { __ndrMockDb?: MockDb };

const db: MockDb = globalForDb.__ndrMockDb ?? { users: new Map() };
if (process.env.NODE_ENV !== "production") {
  globalForDb.__ndrMockDb = db;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  for (const user of db.users.values()) {
    if (user.email.toLowerCase() === email.toLowerCase()) return user;
  }
  return null;
}

export async function findUserById(id: string): Promise<User | null> {
  return db.users.get(id) ?? null;
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
  role?: UserRole;
}): Promise<User> {
  const user: User = {
    id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    passwordHash: input.passwordHash,
    role: input.role ?? "student",
    createdAt: new Date().toISOString(),
  };
  db.users.set(user.id, user);
  return user;
}
