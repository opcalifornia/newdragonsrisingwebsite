"use client";

import { useState } from "react";
import { useApiForm } from "@/hooks/use-api-form";
import { FormStatusMessage } from "@/components/ui/form-status-message";

/** Paid events: real money, so this goes through Stripe Checkout like module enrollment. */
export function PaidSeminarRegisterButton({
  eventSlug,
  priceUsd,
}: {
  eventSlug: string;
  priceUsd: number;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "not_configured" | "error">("idle");

  async function handleClick() {
    setStatus("loading");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "seminar", eventSlug }),
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
    <div className="max-w-md">
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "loading"}
        className="w-full rounded-sm bg-red-core px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-highlight disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Redirecting to payment…" : `Register — $${priceUsd}`}
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

/** Free events: no payment involved, so this is just a notification email like the other forms. */
export function FreeSeminarRegisterForm({ eventTitle }: { eventTitle: string }) {
  const { status, submit } = useApiForm("/api/contact");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    submit({
      formType: "seminar",
      eventTitle,
      name: form.get("name"),
      email: form.get("email"),
    });
  }

  if (status === "success") {
    return <FormStatusMessage status={status} successText="You're registered — see you there." />;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <label htmlFor="reg-name" className="text-sm text-text-muted">
          Full name
        </label>
        <input
          id="reg-name"
          name="name"
          required
          className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
        />
      </div>
      <div>
        <label htmlFor="reg-email" className="text-sm text-text-muted">
          Email
        </label>
        <input
          id="reg-email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
        />
      </div>

      <FormStatusMessage status={status} successText="" />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-sm bg-red-core px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-highlight disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Registering…" : "Register — Free"}
      </button>
    </form>
  );
}
