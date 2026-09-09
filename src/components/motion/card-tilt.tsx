"use client";

import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const MAX_TILT_DEG = 7;

/**
 * Perspective tilt driven by real pointer position, with a specular red
 * highlight that tracks the cursor. Used on module/product cards. Caps
 * at ~7deg per the design brief (6-8 max) and no-ops under
 * prefers-reduced-motion.
 */
export function CardTilt({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 2 * MAX_TILT_DEG;
    const rotateX = (0.5 - py) * 2 * MAX_TILT_DEG;

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015,1.015,1.015)`,
    });
    setGlow({ x: px * 100, y: py * 100, opacity: 0.35 });
  }

  function handleLeave() {
    setStyle({
      transform:
        "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    });
    setGlow((g) => ({ ...g, opacity: 0 }));
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn(
        "relative overflow-hidden rounded-sm border border-surface-border bg-surface transition-transform duration-200 ease-out will-change-transform",
        className,
      )}
      style={style}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(240px circle at ${glow.x}% ${glow.y}%, var(--red-highlight), transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
