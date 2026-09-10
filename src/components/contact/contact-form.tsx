"use client";

import { useApiForm } from "@/hooks/use-api-form";
import { FormStatusMessage } from "@/components/ui/form-status-message";

export function ContactForm() {
  const { status, submit } = useApiForm("/api/contact");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    submit({
      formType: "contact",
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    });
  }

  if (status === "success") {
    return <FormStatusMessage status={status} successText="Message sent — we'll get back to you soon." />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="text-sm text-text-muted">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          required
          className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="text-sm text-text-muted">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="text-sm text-text-muted">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
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
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
