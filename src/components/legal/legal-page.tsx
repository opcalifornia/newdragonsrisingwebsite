import type { ReactNode } from "react";
import Link from "next/link";
import { legalNav } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function LegalPage({
  title,
  active,
  needsLegalReview = true,
  children,
}: {
  title: string;
  active: string;
  needsLegalReview?: boolean;
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
              <strong className="text-text-primary">
                Pending legal review.
              </strong>{" "}
              The old site&rsquo;s version of this page was Wix&rsquo;s
              own unfilled template, never completed for New Dragons
              Rising (see{" "}
              <code className="text-text-primary">
                content/source/CLIENT-AUDIT.md
              </code>
              ). The text below is placeholder structure, not
              finished policy — a lawyer needs to draft and review real
              language before this page can ship live.
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
