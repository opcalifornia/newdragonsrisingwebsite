"use client";

import { useRef } from "react";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";

const disciplines = [
  { name: "Esgrima", offset: -1, depth: 0 },
  { name: "Kali", offset: 0, depth: 1 },
  { name: "Arnis", offset: 1, depth: 0 },
];

/**
 * "Evolution through depth, not decoration": three disciplines rendered
 * as receding CSS 3D planes that converge toward the Mestizo Method,
 * instead of a flat three-column flowchart. Pointer position adds a
 * small amount of additional convergence for a sense of real depth.
 */
export function MestizoDepth() {
  const ref = useRef<HTMLDivElement>(null);
  const pointer = usePointerParallax(ref);

  return (
    <div
      ref={ref}
      className="relative mx-auto h-[420px] w-full max-w-3xl"
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {disciplines.map((d) => {
          const rotateY = d.offset * -18 + pointer.x * 6;
          const translateX = d.offset * 130;
          const translateZ = d.depth * 60 - 40;
          return (
            <div
              key={d.name}
              className="absolute left-1/2 top-1/2 flex h-56 w-52 items-center justify-center rounded-sm border border-surface-border bg-surface"
              style={{
                transform: `translate(-50%, -50%) translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg)`,
                transformStyle: "preserve-3d",
                boxShadow:
                  d.depth === 1
                    ? "0 30px 60px -20px rgba(196,30,46,0.35)"
                    : "0 20px 40px -20px rgba(0,0,0,0.6)",
                zIndex: d.depth === 1 ? 10 : 1,
              }}
            >
              <div
                className="absolute inset-0 rounded-sm opacity-60"
                style={{
                  background:
                    d.depth === 1
                      ? "linear-gradient(160deg, rgba(196,30,46,0.18), transparent 60%)"
                      : "linear-gradient(160deg, rgba(255,255,255,0.04), transparent 60%)",
                }}
              />
              <span className="relative font-display text-2xl text-white">
                {d.name}
              </span>
            </div>
          );
        })}

        <div
          className="absolute left-1/2 top-1/2 flex h-24 w-24 items-center justify-center rounded-full border border-red-core text-center"
          style={{
            transform: "translate(-50%, -50%) translateZ(90px)",
            boxShadow: "0 0 40px rgba(196,30,46,0.45)",
          }}
        >
          <span className="font-display text-xs uppercase tracking-widest text-red-highlight">
            Mestizo
            <br />
            Method
          </span>
        </div>
      </div>
    </div>
  );
}
