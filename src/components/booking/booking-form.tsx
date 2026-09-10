"use client";

import { useApiForm } from "@/hooks/use-api-form";
import { FormStatusMessage } from "@/components/ui/form-status-message";

export function BookingForm() {
  const { status, submit } = useApiForm("/api/contact");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    submit({
      formType: "booking",
      name: form.get("name"),
      phone: form.get("phone"),
      bookingType: form.get("bookingType"),
      notes: form.get("notes"),
    });
  }

  if (status === "success") {
    return <FormStatusMessage status={status} successText="Request sent — we'll follow up to confirm." />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="book-name" className="text-sm text-text-muted">
            Name
          </label>
          <input
            id="book-name"
            name="name"
            required
            className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
          />
        </div>
        <div>
          <label htmlFor="book-phone" className="text-sm text-text-muted">
            Phone
          </label>
          <input
            id="book-phone"
            name="phone"
            type="tel"
            className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
          />
        </div>
      </div>
      <div>
        <label htmlFor="book-type" className="text-sm text-text-muted">
          What are you booking?
        </label>
        <select
          id="book-type"
          name="bookingType"
          className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
        >
          <option>Class trial</option>
          <option>Private lesson</option>
          <option>Seminar</option>
        </select>
      </div>
      <div>
        <label htmlFor="book-notes" className="text-sm text-text-muted">
          Notes
        </label>
        <textarea
          id="book-notes"
          name="notes"
          rows={4}
          className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
        />
      </div>

      <FormStatusMessage status={status} successText="" />

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-sm bg-red-core px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-red-highlight disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Request Booking"}
      </button>
    </form>
  );
}
