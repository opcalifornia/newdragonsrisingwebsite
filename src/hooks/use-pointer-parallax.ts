"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Normalized pointer position (-1..1 on each axis) relative to the given
 * container, for driving subtle parallax/tilt. Always returns {0,0} under
 * prefers-reduced-motion so callers don't need to branch themselves.
 */
export function usePointerParallax(ref: RefObject<HTMLElement | null>) {
  const reduceMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    function handleMove(e: PointerEvent) {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = el!.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        setPos({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
      });
    }

    function handleLeave() {
      setPos({ x: 0, y: 0 });
    }

    window.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [ref, reduceMotion]);

  return reduceMotion ? { x: 0, y: 0 } : pos;
}
