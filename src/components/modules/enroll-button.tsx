"use client";

import { useState } from "react";

export function EnrollButton({ moduleSlug }: { moduleSlug: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "not_configured" | "error">("idle");

  async function handleClick() {
    setStatus("loading");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "module", moduleSlug }),
      });
      if (res.status === 503) {
        setStatus("not_configured");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        return;
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "loading"}
        className="w-full rounded-sm bg-red-core px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-highlight disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Redirecting to payment…" : "Enroll Now"}
      </button>
      {status === "not_configured" && (
        <p className="mt-3 text-center text-xs text-text-muted">
          Payment processing isn&rsquo;t connected yet — add{" "}
          <code className="text-text-primary">STRIPE_SECRET_KEY</code> to enable this.
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-center text-xs text-red-highlight">
          Something went wrong starting checkout. Please try again.
        </p>
      )}
    </div>
  );
}
