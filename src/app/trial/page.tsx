import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTrialOffer } from "@/lib/data/trial-offer";
import { getInstructorBySlug } from "@/lib/content/instructors";
import { RattanDivider } from "@/components/ui/rattan-divider";
import { TrialForm } from "@/components/trial/trial-form";

export const metadata: Metadata = {
  title: "Start Free",
  description:
    "Begin the Mestizo Method with a free unit of Esgrima Basics — real lessons from the New Dragons Rising curriculum, no card required.",
};

export default function TrialPage() {
  const offer = getTrialOffer();
  if (!offer) notFound();

  const { module: m, freeUnit, freeLessons, lockedUnits, lockedLessonCount } = offer;
  const instructor = getInstructorBySlug(m.instructorSlug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-red-highlight">
            Start free
          </p>
          <h1 className="mt-3 font-display text-4xl leading-[1.1] text-white sm:text-5xl">
            Your first lessons, on the house
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-body">
            Take <span className="text-white">{freeUnit.title}</span> from{" "}
            <span className="text-white">{m.title}</span> — free, in full. Not a
            preview reel or a sales pitch: the same opening unit every New
            Dragons Rising student works through, taught the same way.
          </p>

          <div className="mt-10">
            <RattanDivider className="max-w-[6rem] ml-0" />
            <p className="mt-6 max-w-xl font-display text-lg italic leading-relaxed text-white/90">
              &ldquo;{m.heritage}&rdquo;
            </p>
          </div>

          <section className="mt-14">
            <h2 className="font-display text-2xl text-white">
              What you get, free
            </h2>
            <ul className="mt-5 space-y-3">
              {freeLessons.map((lesson, i) => (
                <li
                  key={lesson.id}
                  className="flex items-center gap-4 rounded-sm border border-surface-border p-4"
                >
                  <span className="font-display text-lg text-red-highlight">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white">{lesson.title}</span>
                  <span className="ml-auto rounded-full border border-red-core px-3 py-1 text-xs text-white">
                    Free
                  </span>
                </li>
              ))}
            </ul>

            {lockedUnits.length > 0 && (
              <>
                <p className="mt-8 text-sm text-text-muted">
                  Then, if you want the rest of {m.title} (${m.priceUsd}, one-time —{" "}
                  {lockedLessonCount} more{" "}
                  {lockedLessonCount === 1 ? "lesson" : "lessons"}):
                </p>
                <ul className="mt-4 space-y-2">
                  {lockedUnits.flatMap((unit) =>
                    unit.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="flex items-center gap-4 rounded-sm border border-dashed border-surface-border p-4 text-text-muted"
                      >
                        <span className="font-display text-lg">—</span>
                        <span>{lesson.title}</span>
                      </li>
                    )),
                  )}
                </ul>
              </>
            )}
          </section>

          <section className="mt-14">
            <h2 className="font-display text-2xl text-white">
              What happens after you sign up
            </h2>
            <ol className="mt-5 space-y-4 text-text-body">
              <li className="flex gap-4">
                <span className="font-display text-lg text-red-highlight">01</span>
                <span>
                  Your lessons unlock on this page straight away — nothing to
                  wait for, nothing to confirm in your inbox.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-display text-lg text-red-highlight">02</span>
                <span>
                  Work through them at your own pace. There&rsquo;s no clock on
                  this and no card on file.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-display text-lg text-red-highlight">03</span>
                <span>
                  If it lands, carry on into the full module — or come put it to
                  work on the floor with us in Stockton.
                </span>
              </li>
            </ol>
          </section>
        </div>

        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-sm border border-surface-border bg-surface p-6">
            <p className="font-display text-2xl text-white">
              {freeUnit.title}
            </p>
            <p className="mt-1 text-sm text-text-muted">
              {freeLessons.length}{" "}
              {freeLessons.length === 1 ? "lesson" : "lessons"} from {m.title} ·{" "}
              {m.level}
            </p>

            <div className="mt-6">
              <TrialForm
                moduleSlug={m.slug}
                moduleTitle={m.title}
                unitTitle={freeUnit.title}
                lessons={freeLessons}
              />
            </div>

            {instructor && (
              <div className="mt-6 border-t border-surface-border pt-6">
                <p className="text-sm text-text-muted">Taught by</p>
                <Link
                  href={`/instructors/${instructor.slug}`}
                  className="mt-1 block text-sm text-white hover:text-red-highlight"
                >
                  {instructor.name}
                </Link>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-text-muted">
            Rather talk to a person first?{" "}
            <Link href="/contact" className="text-white underline hover:text-red-highlight">
              Get in touch
            </Link>
          </p>
        </aside>
      </div>
    </div>
  );
}
