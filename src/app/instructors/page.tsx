import type { Metadata } from "next";
import Link from "next/link";
import { getAllInstructors } from "@/lib/content/instructors";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { CardTilt } from "@/components/motion/card-tilt";
import { RattanDivider } from "@/components/ui/rattan-divider";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Instructors",
  description:
    "Meet the instructors of New Dragons Rising — the lineage behind the Mestizo Method.",
};

export default function InstructorsPage() {
  const instructors = getAllInstructors();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-red-core">
          Our Family
        </p>
        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          Instructors
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-text-body">
          Every discipline that feeds the Mestizo Method is carried by
          someone here — decades of Esgrima, Kali, Arnis, and the
          disciplines that surround them, taught by people who trained
          under Grand Master Rudy Torres or trained him in return.
        </p>
      </header>

      <RattanDivider className="my-14" />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {instructors.map((instructor, i) => (
          <Reveal key={instructor.slug} delay={i * 0.05}>
            <Link href={`/instructors/${instructor.slug}`} className="block h-full">
              <CardTilt className="h-full">
                <PortraitPlaceholder name={instructor.name} />
                <div className="p-5">
                  <h2 className="font-display text-xl text-white">
                    {instructor.name}
                  </h2>
                  <p className="mt-1 text-sm text-red-highlight">
                    {instructor.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {instructor.signatureDetail}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {instructor.disciplines.map((d) => (
                      <li
                        key={d}
                        className="rounded-full border border-surface-border px-3 py-1 text-xs text-text-muted"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardTilt>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
