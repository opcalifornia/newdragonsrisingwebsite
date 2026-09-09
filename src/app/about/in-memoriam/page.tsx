import type { Metadata } from "next";
import { AboutTabs } from "@/components/layout/about-tabs";

export const metadata: Metadata = {
  title: "In Memoriam: Rudy Torres Jr.",
  description: "In loving memory of Rudy Torres Jr.",
};

/**
 * Deliberately built differently from the rest of the site. No Reveal,
 * no CardTilt, no rattan divider, no crest, no red-hot accents, no
 * scroll/pointer parallax — per the build brief, this page is the
 * emotional core of the brand and should read as the calmest thing on
 * the site. Do not add motion or the red accent system here.
 */
export default function InMemoriamPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-28 sm:px-6 lg:px-8">
      <AboutTabs active="/about/in-memoriam" />

      <div className="text-center">
        <p className="text-sm tracking-[0.15em] text-text-muted">
          In Loving Memory
        </p>
        <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">
          Rudy Torres Jr.
        </h1>
      </div>

      <div
        className="mx-auto mt-16 aspect-[4/5] max-w-sm overflow-hidden rounded-sm"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 30%, #1c1c1c 0%, #0a0a0a 70%, #000 100%)",
        }}
        aria-hidden="true"
      />
      <p className="mt-3 text-center text-xs text-text-muted">
        Photograph pending — one image, chosen by the family.
      </p>

      <div className="mx-auto mt-20 max-w-xl space-y-8 text-center text-lg leading-loose text-text-body">
        <p>
          Rudy Torres Jr. was, in his father&rsquo;s words, a martial
          artist extraordinaire. Trained by Grandmaster Rudy Torres, he
          embraced the philosophy of learning from everyone and
          everything — the intricate techniques of Esgrima, the fluid
          movements of Kali, the practical applications of Arnis. That
          ethos became the cornerstone of New Dragons Rising, and his
          journey alongside his father shaped the Mestizo Method as it is
          practiced today.
        </p>
        <p>
          He was taken from us in a devastating accident. Though he is
          physically gone, his spirit, perseverance, inspiration, and
          contribution to life and the martial arts will forever live in
          perpetuity.
        </p>
        <p className="pt-4 text-white">God bless and keep you.</p>
      </div>

      <div className="mx-auto mt-24 h-px w-16 bg-surface-border" />

      <p className="mx-auto mt-10 max-w-md text-center text-sm leading-relaxed text-text-muted">
        This page holds space for a fuller tribute — additional
        photographs, memories from those who trained alongside him, or
        words from the family — whenever GM Torres and the New Dragons
        Rising family are ready to share more. Nothing here should be
        added without their direction.
      </p>
    </div>
  );
}
