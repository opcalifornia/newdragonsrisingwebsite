import type { Metadata } from "next";
import Link from "next/link";
import { AboutTabs } from "@/components/layout/about-tabs";
import { Reveal } from "@/components/motion/reveal";
import { RattanDivider } from "@/components/ui/rattan-divider";

export const metadata: Metadata = {
  title: "Lineage",
  description:
    "Grandmaster Rudy Torres and New Dragons Rising's connection to the American Filipino Martial Arts Association.",
};

export default function LineagePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <AboutTabs active="/about/lineage" />

      <Reveal>
        <p className="text-sm uppercase tracking-[0.2em] text-red-highlight">
          Lineage
        </p>
        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          Grandmaster Rudy Torres
        </h1>
      </Reveal>

      <RattanDivider className="my-12" />

      <Reveal>
        <div className="space-y-6 text-lg leading-relaxed text-text-body">
          <p>
            New Dragons Rising was founded by Grandmaster Rudy Torres and
            built into the Mestizo Method alongside friends, family, and
            fellow martial artists — a synthesis of Esgrima, Kali, and
            Arnis carried forward today by the instructors who trained
            directly under him, including{" "}
            <Link href="/instructors/elsa-torres" className="text-white underline underline-offset-4 hover:text-red-highlight">
              Datu Elsa Torres
            </Link>
            ,{" "}
            <Link href="/instructors/david-aviles" className="text-white underline underline-offset-4 hover:text-red-highlight">
              David A. Aviles
            </Link>
            ,{" "}
            <Link href="/instructors/mark-cantu" className="text-white underline underline-offset-4 hover:text-red-highlight">
              Master Mark Cantu
            </Link>
            ,{" "}
            <Link href="/instructors/jordan-corralejo" className="text-white underline underline-offset-4 hover:text-red-highlight">
              Jordan Corralejo
            </Link>
            , and{" "}
            <Link href="/instructors/david-betts" className="text-white underline underline-offset-4 hover:text-red-highlight">
              David Betts
            </Link>
            .
          </p>
          <p>
            New Dragons Rising's mission continues through its
            collaboration with the American Filipino Martial Arts
            Association, extending the reach of the Mestizo Method to
            martial artists and affiliate schools working to honor and
            preserve the ancestral lineage of Filipino martial arts.
          </p>
        </div>

        <div className="mt-10 rounded-sm border border-dashed border-surface-border p-6 text-sm text-text-muted">
          <p>
            <strong className="text-text-primary">Content gap:</strong>{" "}
            The scraped source content does not include a full account of
            GM Torres&rsquo; own training lineage (who he trained under,
            when he founded New Dragons Rising, his own rank history) or
            further detail on the American Filipino Martial Arts
            Association partnership beyond the single mention in the
            homepage vision statement. Rather than invent this history,
            this page will need real detail from the client before
            launch — see{" "}
            <code className="text-text-primary">
              content/source/CLIENT-AUDIT.md
            </code>
            .
          </p>
        </div>
      </Reveal>
    </div>
  );
}
