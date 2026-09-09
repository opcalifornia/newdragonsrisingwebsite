"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((m) => m.HeroScene),
  { ssr: false },
);

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const line: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  show: (i: number) => ({
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 0.8, delay: 0.3 + i * 0.15, ease: EASE_OUT_EXPO },
  }),
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const pointer = usePointerParallax(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-black"
      style={{ perspective: "1400px" }}
    >
      {/* z-plane 1: deep background photography, subtle parallax */}
      <div
        aria-hidden="true"
        className="absolute -left-16 top-10 hidden w-72 opacity-30 blur-[1px] lg:block"
        style={{
          transform: `translate3d(${pointer.x * -14}px, ${pointer.y * -10}px, 0)`,
          transition: reduceMotion ? undefined : "transform 0.15s ease-out",
        }}
      >
        <PortraitPlaceholder name="Mestizo Method" aspect="aspect-[3/4]" />
      </div>

      {/* z-plane 2: closer photography, more parallax travel */}
      <div
        aria-hidden="true"
        className="absolute -right-10 bottom-0 hidden w-80 opacity-60 lg:block"
        style={{
          transform: `translate3d(${pointer.x * 22}px, ${pointer.y * 16}px, 0)`,
          transition: reduceMotion ? undefined : "transform 0.12s ease-out",
        }}
      >
        <PortraitPlaceholder name="Esgrima" aspect="aspect-[4/5]" />
      </div>

      {/* z-plane 3: the crest, front-and-center, lit 3D object */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-90"
      >
        <div className="h-[70vmin] w-[70vmin] max-w-2xl">
          <HeroScene />
        </div>
      </div>

      {/* foreground: copy */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.p
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-[0.25em] text-red-highlight"
        >
          Stockton, California
        </motion.p>

        <h1 className="mt-6 font-display text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
          <motion.span
            custom={0}
            variants={line}
            initial={reduceMotion ? undefined : "hidden"}
            animate={reduceMotion ? undefined : "show"}
            className="block"
          >
            Unleash
          </motion.span>
          <motion.span
            custom={1}
            variants={line}
            initial={reduceMotion ? undefined : "hidden"}
            animate={reduceMotion ? undefined : "show"}
            className="block text-red-core"
          >
            Your Potential
          </motion.span>
        </h1>

        <motion.p
          initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-text-body"
        >
          New Dragons Rising teaches Escrima, Arnis, and Kali through the
          Mestizo Method — a lifetime's synthesis of Filipino martial arts,
          built by Grandmaster Rudy Torres and carried forward by the
          instructors who trained under him.
        </motion.p>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/about/mestizo-method"
            className="rounded-sm bg-red-core px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-red-highlight"
          >
            Explore the Mestizo Method
          </Link>
          <Link
            href="/join"
            className="rounded-sm border border-white/25 px-8 py-3 text-sm font-medium text-white transition-colors hover:border-white"
          >
            Join New Dragons Rising
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
