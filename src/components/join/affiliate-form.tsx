"use client";

import { useApiForm } from "@/hooks/use-api-form";
import { FormStatusMessage } from "@/components/ui/form-status-message";

export function AffiliateForm() {
  const { status, submit } = useApiForm("/api/contact");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    submit({
      formType: "affiliate",
      schoolName: form.get("schoolName"),
      location: form.get("location"),
      email: form.get("email"),
      disciplines: form.get("disciplines"),
      message: form.get("message"),
    });
  }

  if (status === "success") {
    return (
      <FormStatusMessage
        status={status}
        successText="Application sent — GM Torres' team will follow up."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="school-name" className="text-sm text-text-muted">
            School / instructor name
          </label>
          <input
            id="school-name"
            name="schoolName"
            required
            className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
          />
        </div>
        <div>
          <label htmlFor="school-location" className="text-sm text-text-muted">
            Location
          </label>
          <input
            id="school-location"
            name="location"
            required
            className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
          />
        </div>
      </div>
      <div>
        <label htmlFor="school-email" className="text-sm text-text-muted">
          Email
        </label>
        <input
          id="school-email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
        />
      </div>
      <div>
        <label htmlFor="school-disciplines" className="text-sm text-text-muted">
          Disciplines taught
        </label>
        <input
          id="school-disciplines"
          name="disciplines"
          className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
        />
      </div>
      <div>
        <label htmlFor="school-message" className="text-sm text-text-muted">
          Tell us about your school
        </label>
        <textarea
          id="school-message"
          name="message"
          rows={4}
          className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
        />
      </div>

      <FormStatusMessage status={status} successText="" />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-sm bg-red-core px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-highlight disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Submit Application"}
      </button>
    </form>
  );
}
