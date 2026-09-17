"use client";

import Link from "next/link";
import { useApiForm } from "@/hooks/use-api-form";
import { FormStatusMessage } from "@/components/ui/form-status-message";

type Lesson = { id: string; title: string };

/**
 * Lead capture for the trial funnel. Three fields only (phone optional) —
 * every extra field costs completions, and the dojo can ask everything
 * else on the follow-up call.
 *
 * On success the lessons unlock on this page immediately rather than
 * behind a "check your email" step: the visitor already proved intent,
 * and a mail round-trip is one more place to lose them. The submission
 * still notifies the dojo so someone can follow up while interest is hot.
 */
export function TrialForm({
  moduleSlug,
  moduleTitle,
  unitTitle,
  lessons,
}: {
  moduleSlug: string;
  moduleTitle: string;
  unitTitle: string;
  lessons: Lesson[];
}) {
  const { status, submit } = useApiForm("/api/contact");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    submit({
      formType: "trial",
      moduleTitle,
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone") || undefined,
    });
  }

  if (status === "success" || status === "not_configured") {
    return (
      <div className="rounded-sm border border-red-core/40 bg-red-core/5 p-6">
        <p className="font-display text-xl text-white">
          You&rsquo;re in. Here&rsquo;s {unitTitle}.
        </p>
        <p className="mt-2 text-sm text-text-body">
          These lessons are yours to work through at your own pace. No
          card, no expiry.
        </p>

        <ul className="mt-6 space-y-3">
          {lessons.map((lesson, i) => (
            <li
              key={lesson.id}
              className="flex items-center gap-4 rounded-sm border border-surface-border bg-surface p-4"
            >
              <span className="font-display text-lg text-red-highlight">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-white">{lesson.title}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={`/modules/${moduleSlug}`}
            className="rounded-sm bg-red-core px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-red-highlight"
          >
            Open {moduleTitle}
          </Link>
          <Link
            href="/contact"
            className="rounded-sm border border-white/25 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:border-white"
          >
            Train with us in person
          </Link>
        </div>

        {status === "not_configured" && (
          <p className="mt-5 text-xs text-text-muted">
            Setup notice — the lessons unlocked, but nobody at the dojo was
            notified, so this lead is currently lost. Email isn&rsquo;t
            connected: add{" "}
            <code className="text-text-primary">RESEND_API_KEY</code> to start
            capturing these. This message disappears once it&rsquo;s set. See
            README.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="trial-name" className="text-sm text-text-muted">
          Full name
        </label>
        <input
          id="trial-name"
          name="name"
          required
          autoComplete="name"
          className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
        />
      </div>

      <div>
        <label htmlFor="trial-email" className="text-sm text-text-muted">
          Email
        </label>
        <input
          id="trial-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
        />
      </div>

      <div>
        <label htmlFor="trial-phone" className="text-sm text-text-muted">
          Phone <span className="text-text-muted/60">(optional)</span>
        </label>
        <input
          id="trial-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
        />
      </div>

      <FormStatusMessage status={status} successText="" />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-sm bg-red-core px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-red-highlight disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Unlocking…" : "Unlock My Free Lessons"}
      </button>

      <p className="text-center text-xs text-text-muted">
        No card required. We&rsquo;ll never sell your details — see our{" "}
        <Link href="/legal/privacy-policy" className="underline hover:text-white">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
