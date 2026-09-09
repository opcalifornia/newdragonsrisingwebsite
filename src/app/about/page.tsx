import type { Metadata } from "next";
import { AboutTabs } from "@/components/layout/about-tabs";
import { Reveal } from "@/components/motion/reveal";
import { RattanDivider } from "@/components/ui/rattan-divider";

export const metadata: Metadata = {
  title: "The Association",
  description:
    "New Dragons Rising's vision and mission, and its collaboration with the American Filipino Martial Arts Association.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <AboutTabs active="/about" />

      <Reveal>
        <p className="text-sm uppercase tracking-[0.2em] text-red-highlight">
          The Association
        </p>
        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          Our Vision
        </h1>
        <p className="mt-8 text-xl leading-relaxed text-text-body">
          We envision a world where the essence of Filipino martial arts
          is celebrated and practiced worldwide. Through our
          collaboration with the American Filipino Martial Arts
          Association, we aim to empower individuals with self-defense
          skills, foster a sense of community, and honor the ancestral
          lineage of these ancient practices.
        </p>
      </Reveal>

      <RattanDivider className="my-16" />

      <Reveal>
        <h2 className="font-display text-2xl text-white">Our Mission</h2>
        <p className="mt-6 text-lg leading-relaxed text-text-body">
          New Dragons Rising exists to foster growth, experience,
          diversity, and knowledge within the martial arts community.
          Founded by Grandmaster Rudy Torres and built alongside friends,
          family, and fellow martial artists, the association brings
          together practitioners of Esgrima, Kali, and Arnis under the
          shared discipline of the Mestizo Method — inviting martial
          artists and schools everywhere to train, share expertise, and
          grow together.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-text-body">
          That mission continues through New Dragons Rising's
          collaboration with the American Filipino Martial Arts
          Association, extending the reach of the Mestizo Method and its
          principles beyond Stockton to martial artists and affiliate
          schools across the country.
        </p>
      </Reveal>
    </div>
  );
}
