"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { type Consent, readStoredConsent, saveConsent } from "@/lib/consent";

export function CookieConsent() {
  // Starts false on both server and client so hydration matches; flips
  // true client-side once we can actually check localStorage.
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (readStoredConsent() === null) setVisible(true);
  }, []);

  function save(consent: Consent) {
    saveConsent(consent);
    setVisible(false);
    setShowPreferences(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-surface-border bg-black/95 p-4 backdrop-blur sm:p-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-body">
          We use cookies for essential site function and, with your
          consent, analytics. See our{" "}
          <Link href="/legal/privacy-policy" className="underline hover:text-white">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setShowPreferences(true)}
            className="rounded-sm border border-surface-border px-4 py-2 text-sm text-text-body hover:border-white/40"
          >
            Preferences
          </button>
          <button
            type="button"
            onClick={() => save({ necessary: true, analytics: false })}
            className="rounded-sm border border-surface-border px-4 py-2 text-sm text-text-body hover:border-white/40"
          >
            Necessary Only
          </button>
          <button
            type="button"
            onClick={() => save({ necessary: true, analytics: true })}
            className="rounded-sm bg-red-core px-4 py-2 text-sm font-medium text-white hover:bg-red-highlight"
          >
            Accept All
          </button>
        </div>
      </div>

      {showPreferences && (
        <div className="mx-auto mt-4 max-w-5xl rounded-sm border border-surface-border bg-surface p-5">
          <div className="flex items-center justify-between">
            <p className="text-white">Necessary cookies</p>
            <span className="text-xs text-text-muted">Always on</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-white">Analytics cookies</p>
            <button
              type="button"
              role="switch"
              aria-checked={analytics}
              onClick={() => setAnalytics((v) => !v)}
              className={`h-6 w-11 rounded-full transition-colors ${analytics ? "bg-red-core" : "bg-surface-border"}`}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-white transition-transform ${analytics ? "translate-x-5" : "translate-x-0.5"}`}
              />
            </button>
          </div>
          <button
            type="button"
            onClick={() => save({ necessary: true, analytics })}
            className="mt-5 rounded-sm bg-red-core px-4 py-2 text-sm font-medium text-white hover:bg-red-highlight"
          >
            Save Preferences
          </button>
        </div>
      )}
    </div>
  );
}
