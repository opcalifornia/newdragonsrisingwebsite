"use client";

import { useMemo, useState } from "react";
import { testimonials } from "@/lib/data/testimonials";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const disciplines = ["All", "Escrima", "Arnis", "Kali", "Mestizo Method"] as const;

export default function TestimonialsPage() {
  const [filter, setFilter] = useState<(typeof disciplines)[number]>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? testimonials
        : testimonials.filter((t) => t.discipline === filter),
    [filter],
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.2em] text-red-highlight">
          Testimonials
        </p>
        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          What Our Students Say
        </h1>
        <div className="mt-6 rounded-sm border border-dashed border-surface-border p-4 text-sm text-text-muted">
          The old site had no testimonials at all. Every entry below is a
          clearly-marked placeholder — real quotes go here once
          submitted by students and affiliate schools.
        </div>
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-2">
        {disciplines.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setFilter(d)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              filter === d
                ? "border-red-core bg-red-core text-white"
                : "border-surface-border text-text-muted hover:border-white/40 hover:text-white",
            )}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {filtered.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.05}>
            <blockquote className="h-full rounded-sm border border-dashed border-surface-border p-6 text-text-muted">
              <p className="italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 text-sm text-text-primary">
                — {t.attribution}
              </footer>
              <p className="mt-2 text-xs text-red-highlight">{t.discipline}</p>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
