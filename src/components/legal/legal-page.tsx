import type { ReactNode } from "react";
import Link from "next/link";
import { legalNav } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const defaultReviewNote = (
  <>
    <strong className="text-text-primary">Attorney review pending.</strong>{" "}
    The old site never had real language here (see{" "}
    <code className="text-text-primary">content/source/CLIENT-AUDIT.md</code>
    ) — what follows is a complete draft written for New Dragons Rising&rsquo;s
    actual business (Stockton, CA; the services, products, and data practices
    described on this site), not generic filler. It has not yet been reviewed
    by a licensed attorney and should not be treated as final until it is.
  </>
);

export function LegalPage({
  title,
  active,
  needsLegalReview = true,
  reviewNote = defaultReviewNote,
  children,
}: {
  title: string;
  active: string;
  needsLegalReview?: boolean;
  reviewNote?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
        <nav className="space-y-1 text-sm">
          {legalNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-sm px-3 py-2 transition-colors",
                item.href === active
                  ? "bg-surface text-white"
                  : "text-text-muted hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div>
          <h1 className="font-display text-3xl text-white sm:text-4xl">
            {title}
          </h1>

          {needsLegalReview && (
            <div className="mt-6 rounded-sm border border-dashed border-red-core/50 bg-red-core/5 p-5 text-sm text-text-body">
              {reviewNote}
            </div>
          )}

          <div className="mt-8 space-y-5 text-base leading-relaxed text-text-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
