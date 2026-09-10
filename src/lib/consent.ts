"use client";

import { useEffect, useState } from "react";

export type Consent = { necessary: true; analytics: boolean };

export const CONSENT_STORAGE_KEY = "ndr-cookie-consent";
export const CONSENT_CHANGE_EVENT = "ndr-consent-changed";

export function readStoredConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function saveConsent(consent: Consent) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // localStorage unavailable — consent just won't persist across visits
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: consent }));
}

/** Tracks whether the visitor has consented to analytics, live-updating as they choose in the cookie banner. */
export function useAnalyticsConsent(): boolean {
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    setAnalytics(readStoredConsent()?.analytics ?? false);

    function onChange(e: Event) {
      const consent = (e as CustomEvent<Consent>).detail;
      setAnalytics(consent?.analytics ?? false);
    }
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  return analytics;
}
