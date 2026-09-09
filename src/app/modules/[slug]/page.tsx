import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllModules, getModuleBySlug } from "@/lib/data/modules";
import { getInstructorBySlug } from "@/lib/content/instructors";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { RattanDivider } from "@/components/ui/rattan-divider";
import { CurriculumPath } from "@/components/modules/curriculum-path";
import { CurriculumChecklist } from "@/components/modules/curriculum-checklist";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";
import { getOptionalSession } from "@/lib/auth/dal";
import { getEnrollment, computeProgress } from "@/lib/auth/enrollment-db";
import { enrollInModule } from "@/app/actions/enrollment";

export function generateStaticParams() {
  return getAllModules().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getModuleBySlug(slug);
  if (!m) return {};
  return { title: m.title, description: m.tagline };
}

const formatLabels: Record<string, string> = {
  video: "Video",
  "live-seminar": "Live Seminar",
  "in-person": "In-Person",
};

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = getModuleBySlug(slug);
  if (!m) notFound();
  const instructor = getInstructorBySlug(m.instructorSlug);

  const session = await getOptionalSession();
  const enrollment = session ? await getEnrollment(session.userId, slug) : null;
  const totalLessons = m.curriculum.flatMap((u) => u.lessons).length;
  const progress = enrollment ? computeProgress(enrollment, totalLessons) : 0;

  async function enrollAction() {
    "use server";
    await enrollInModule(slug);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: m.title,
          description: m.tagline,
          provider: {
            "@type": "Organization",
            name: siteConfig.name,
            sameAs: siteConfig.url,
          },
          offers: {
            "@type": "Offer",
            price: m.priceUsd,
            priceCurrency: "USD",
          },
        }}
      />
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_380px]">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-red-highlight">
            {m.discipline} · {m.level}
          </p>
          <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            {m.title}
          </h1>
          <p className="mt-4 text-lg text-text-body">{m.tagline}</p>

          {!enrollment && (
            <div className="mt-8">
              <PortraitPlaceholder name={m.title} aspect="aspect-[16/9]" className="w-full" />
            </div>
          )}

          <div className="mt-10">
            <p className="text-xs uppercase tracking-wider text-text-muted">
              Curriculum path
            </p>
            <CurriculumPath current={m.level} />
          </div>

          <RattanDivider className="my-12" />

          <section>
            <h2 className="font-display text-2xl text-white">
              What You&rsquo;ll Learn
            </h2>
            <ul className="mt-5 space-y-3 text-text-body">
              {m.whatYouLearn.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-core" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl text-white">
              {enrollment ? "Your Lessons" : "Curriculum Outline"}
            </h2>

            {enrollment ? (
              <div className="mt-5">
                <CurriculumChecklist
                  moduleSlug={slug}
                  curriculum={m.curriculum}
                  initialCompletedLessonIds={enrollment.completedLessonIds}
                />
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {m.curriculum.map((unit) => (
                  <div
                    key={unit.title}
                    className="rounded-sm border border-surface-border p-5"
                  >
                    <p className="font-medium text-white">{unit.title}</p>
                    <ul className="mt-2 space-y-1 text-sm text-text-muted">
                      {unit.lessons.map((lesson) => (
                        <li key={lesson.id}>{lesson.title}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>

          {m.prerequisites.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-2xl text-white">
                Prerequisites
              </h2>
              <ul className="mt-4 space-y-2 text-text-body">
                {m.prerequisites.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="h-fit rounded-sm border border-surface-border bg-surface p-6 lg:sticky lg:top-24">
          <p className="font-display text-3xl text-red-highlight">
            ${m.priceUsd}
          </p>
          <p className="mt-1 text-sm text-text-muted">One-time enrollment</p>

          {enrollment ? (
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white">Your progress</span>
                <span className="text-text-muted">{progress}%</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-border">
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
            </div>
          ) : session ? (
            <form action={enrollAction}>
              <button
                type="submit"
                className="mt-6 w-full rounded-sm bg-red-core px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-highlight"
              >
                Enroll Now
              </button>
              <p className="mt-3 text-center text-xs text-text-muted">
                Enrollment isn&rsquo;t gated by payment yet — Stripe isn&rsquo;t
                connected, so this grants access immediately. Production
                should only enroll after a successful payment (see README).
              </p>
            </form>
          ) : (
            <Link
              href={`/login?from=/modules/${slug}`}
              className="mt-6 block w-full rounded-sm bg-red-core px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-red-highlight"
            >
              Log In to Enroll
            </Link>
          )}

          <div className="mt-6 border-t border-surface-border pt-6 text-sm">
            <p className="text-text-muted">Format</p>
            <p className="mt-1 text-white">
              {m.format.map((f) => formatLabels[f]).join(" · ")}
            </p>
          </div>

          {instructor && (
            <div className="mt-6 border-t border-surface-border pt-6">
              <p className="text-sm text-text-muted">Instructor</p>
              <Link
                href={`/instructors/${instructor.slug}`}
                className="mt-3 flex items-center gap-3 hover:opacity-80"
              >
                <PortraitPlaceholder
                  name={instructor.name}
                  aspect="aspect-square"
                  className="w-12"
                />
                <span className="text-sm text-white">{instructor.name}</span>
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
