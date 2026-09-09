import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllModules, getModuleBySlug } from "@/lib/data/modules";
import { getInstructorBySlug } from "@/lib/content/instructors";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { RattanDivider } from "@/components/ui/rattan-divider";
import { CurriculumPath } from "@/components/modules/curriculum-path";

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_380px]">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-red-core">
            {m.discipline} · {m.level}
          </p>
          <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            {m.title}
          </h1>
          <p className="mt-4 text-lg text-text-body">{m.tagline}</p>

          <div className="mt-8">
            <PortraitPlaceholder name={m.title} aspect="aspect-[16/9]" className="w-full" />
          </div>

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
              Curriculum Outline
            </h2>
            <div className="mt-5 space-y-4">
              {m.curriculum.map((unit) => (
                <div
                  key={unit.title}
                  className="rounded-sm border border-surface-border p-5"
                >
                  <p className="font-medium text-white">{unit.title}</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-muted">
                    {unit.lessons.map((lesson) => (
                      <li key={lesson}>{lesson}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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

          <button
            type="button"
            className="mt-6 w-full rounded-sm bg-red-core px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-highlight"
          >
            Enroll Now
          </button>
          <p className="mt-3 text-center text-xs text-text-muted">
            Checkout is not yet wired to a live payment processor — see
            README for the Stripe integration plan.
          </p>

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
