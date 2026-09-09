import "server-only";

/**
 * ⚠️ PLACEHOLDER DATA STORE — same caveats as mock-db.ts (in-memory,
 * resets on restart, not shared across serverless instances). Tracks
 * which users are enrolled in which training modules and which lessons
 * they've completed, so /account and the module detail page can show
 * real (if non-persistent) progress instead of static mock numbers.
 *
 * In production, enrollment should be created by a Stripe webhook after
 * a successful payment (see src/app/api/webhooks/stripe/route.ts) or an
 * admin action, not granted directly by the student — the "Enroll Now"
 * button on the module page currently grants access immediately with no
 * payment step, which is fine for exercising this feature end-to-end
 * but must not ship that way.
 */

export type Enrollment = {
  userId: string;
  moduleSlug: string;
  enrolledAt: string;
  completedLessonIds: string[];
};

type EnrollmentDb = { enrollments: Map<string, Enrollment> };

const globalForDb = globalThis as unknown as { __ndrEnrollmentDb?: EnrollmentDb };

const db: EnrollmentDb = globalForDb.__ndrEnrollmentDb ?? { enrollments: new Map() };
if (process.env.NODE_ENV !== "production") {
  globalForDb.__ndrEnrollmentDb = db;
}

function key(userId: string, moduleSlug: string) {
  return `${userId}:${moduleSlug}`;
}

export async function getEnrollment(
  userId: string,
  moduleSlug: string,
): Promise<Enrollment | null> {
  return db.enrollments.get(key(userId, moduleSlug)) ?? null;
}

export async function getEnrollmentsForUser(userId: string): Promise<Enrollment[]> {
  return [...db.enrollments.values()].filter((e) => e.userId === userId);
}

export async function enroll(userId: string, moduleSlug: string): Promise<Enrollment> {
  const existing = await getEnrollment(userId, moduleSlug);
  if (existing) return existing;

  const enrollment: Enrollment = {
    userId,
    moduleSlug,
    enrolledAt: new Date().toISOString(),
    completedLessonIds: [],
  };
  db.enrollments.set(key(userId, moduleSlug), enrollment);
  return enrollment;
}

export async function setLessonComplete(
  userId: string,
  moduleSlug: string,
  lessonId: string,
  complete: boolean,
): Promise<Enrollment | null> {
  const enrollment = await getEnrollment(userId, moduleSlug);
  if (!enrollment) return null;

  const has = enrollment.completedLessonIds.includes(lessonId);
  if (complete && !has) {
    enrollment.completedLessonIds.push(lessonId);
  } else if (!complete && has) {
    enrollment.completedLessonIds = enrollment.completedLessonIds.filter(
      (id) => id !== lessonId,
    );
  }
  return enrollment;
}

export function computeProgress(enrollment: Enrollment, totalLessons: number): number {
  if (totalLessons === 0) return 0;
  return Math.round((enrollment.completedLessonIds.length / totalLessons) * 100);
}
