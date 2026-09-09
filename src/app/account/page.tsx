import type { Metadata } from "next";
import Link from "next/link";
import { verifySession, getUser } from "@/lib/auth/dal";
import { logout } from "@/app/actions/auth";
import { RattanDivider } from "@/components/ui/rattan-divider";
import { getEnrollmentsForUser, computeProgress } from "@/lib/auth/enrollment-db";
import { getModuleBySlug } from "@/lib/data/modules";

export const metadata: Metadata = { title: "My Account" };

const roleLabels = {
  student: "Student",
  instructor: "Instructor",
  admin: "Administrator",
} as const;

export default async function AccountPage() {
  // Redirects to /login if there is no session — see src/lib/auth/dal.ts
  const session = await verifySession();
  const user = await getUser();

  const enrollments = await getEnrollmentsForUser(session.userId);
  const enrolledModules = enrollments
    .map((e) => {
      const m = getModuleBySlug(e.moduleSlug);
      if (!m) return null;
      const totalLessons = m.curriculum.flatMap((u) => u.lessons).length;
      return { module: m, progress: computeProgress(e, totalLessons) };
    })
    .filter((x): x is { module: NonNullable<ReturnType<typeof getModuleBySlug>>; progress: number } => x !== null);

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-red-highlight">
            {roleLabels[session.role]}
          </p>
          <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">
            Welcome, {session.name}
          </h1>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-sm border border-surface-border px-4 py-2 text-sm text-text-body hover:border-white/40"
          >
            Log Out
          </button>
        </form>
      </div>

      {user && (
        <p className="mt-2 text-sm text-text-muted">{user.email}</p>
      )}

      <RattanDivider className="my-12" />

      <section>
        <h2 className="font-display text-2xl text-white">My Training</h2>

        {enrolledModules.length === 0 ? (
          <p className="mt-6 text-text-muted">
            You&rsquo;re not enrolled in any training modules yet.{" "}
            <Link href="/modules" className="text-white underline underline-offset-4">
              Browse the catalog
            </Link>
            .
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {enrolledModules.map(({ module: m, progress }) => (
              <Link
                key={m.slug}
                href={`/modules/${m.slug}`}
                className="block rounded-sm border border-surface-border p-5 hover:border-white/30"
              >
                <div className="flex items-center justify-between">
                  <p className="text-white">{m.title}</p>
                  <p className="text-sm text-text-muted">{progress}%</p>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-border">
                  <div
                    className="h-full rounded-full bg-red-core"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {progress >= 100 && (
                  <p className="mt-3 text-xs text-red-highlight">
                    Certificate of completion earned
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
        <p className="mt-4 text-xs text-text-muted">
          Enrollment and progress are real for this session (stored
          in-memory — see src/lib/auth/enrollment-db.ts) but not backed
          by a persistent database or gated by payment yet. See README.
        </p>
      </section>

      {(session.role === "instructor" || session.role === "admin") && (
        <>
          <RattanDivider className="my-12" />
          <section>
            <h2 className="font-display text-2xl text-white">
              Instructor Tools
            </h2>
            <p className="mt-4 text-text-muted">
              Role-gated section — visible to instructor and admin
              accounts only. Curriculum management tools go here.
            </p>
          </section>
        </>
      )}

      {session.role === "admin" && (
        <>
          <RattanDivider className="my-12" />
          <section>
            <h2 className="font-display text-2xl text-white">Admin</h2>
            <p className="mt-4 text-text-muted">
              Role-gated section — visible to admin accounts only. User
              management, order history, and site settings go here.
            </p>
          </section>
        </>
      )}
    </div>
  );
}
