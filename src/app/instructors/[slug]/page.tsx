import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllInstructors, getInstructorBySlug } from "@/lib/content/instructors";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { MDXContent } from "@/components/mdx-content";
import { RattanDivider } from "@/components/ui/rattan-divider";

export function generateStaticParams() {
  return getAllInstructors().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const instructor = getInstructorBySlug(slug);
  if (!instructor) return {};
  return {
    title: instructor.name,
    description: instructor.signatureDetail,
  };
}

export default async function InstructorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const instructor = getInstructorBySlug(slug);
  if (!instructor) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[320px_1fr]">
        <div>
          <PortraitPlaceholder name={instructor.name} className="w-full" />
          <dl className="mt-6 space-y-4 border-t border-surface-border pt-6 text-sm">
            {instructor.rank && (
              <div>
                <dt className="text-text-muted">Rank</dt>
                <dd className="mt-1 text-white">{instructor.rank}</dd>
              </div>
            )}
            <div>
              <dt className="text-text-muted">Discipline lineage</dt>
              <dd className="mt-1 text-white">
                {instructor.disciplines.join(" · ")}
              </dd>
            </div>
            {instructor.yearsTraining && (
              <div>
                <dt className="text-text-muted">Years training</dt>
                <dd className="mt-1 text-white">{instructor.yearsTraining}</dd>
              </div>
            )}
          </dl>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-red-core">
            {instructor.title}
          </p>
          <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            {instructor.name}
          </h1>
          <RattanDivider className="my-8 ml-0 max-w-[200px]" />
          <MDXContent source={instructor.content} />
        </div>
      </div>
    </div>
  );
}
