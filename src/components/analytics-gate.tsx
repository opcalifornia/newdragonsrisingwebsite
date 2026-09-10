"use client";

import { Analytics } from "@vercel/analytics/next";
import { useAnalyticsConsent } from "@/lib/consent";

/**
 * The cookie banner promises analytics only run with consent, so this
 * gates Vercel Analytics on that choice rather than loading it
 * unconditionally. Renders nothing (and Vercel Analytics never mounts)
 * until the visitor opts in via the banner or preferences panel.
 */
export function AnalyticsGate() {
  const analyticsConsent = useAnalyticsConsent();
  if (!analyticsConsent) return null;
  return <Analytics />;
}
