"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Section entrance treatment: a clip-path wipe (like a blade strike)
 * rather than the generic fade-and-slide-up used everywhere. Disabled
 * entirely under prefers-reduced-motion — content simply appears.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      // No negative margin: shrinking the intersection root (e.g. "-10%")
      // requires an element to scroll further into the viewport before it
      // registers as "seen" — for a tall section positioned near the end
      // of a page's scroll range, that shrunk zone can end up entirely
      // past the page's max scroll position, so `whileInView` never
      // fires and the content stays permanently clipped. Reproduced on
      // /join's affiliate form (confirmed via computed style: clip-path
      // stuck at inset(0 100% 0 0) even after scrolling it into view and
      // waiting). Default margin (0) fires as soon as any pixel is
      // visible, which is always reachable by scrolling to page bottom.
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const }}
    >
      {children}
    </motion.div>
  );
}
