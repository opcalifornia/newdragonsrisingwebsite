import { cn } from "@/lib/utils";

/**
 * PLACEHOLDER mark. The real NDR dragon crest has not been supplied to
 * this build (see public/images/manifest.json / IMAGE-SHORTLIST.md) —
 * this is a monogram standing in for it so the header, hero, and loading
 * states have something to render. Swap the <svg> body for the real
 * crest geometry once the client provides a vector/high-res logo file;
 * the surrounding rimlight/bevel treatment can stay.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ndr-mark-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--red-highlight)" />
          <stop offset="55%" stopColor="var(--red-core)" />
          <stop offset="100%" stopColor="var(--red-shadow)" />
        </linearGradient>
      </defs>
      <path
        d="M32 4 L58 18 V46 L32 60 L6 46 V18 Z"
        fill="none"
        stroke="url(#ndr-mark-fill)"
        strokeWidth="3"
      />
      <path
        d="M20 32 L30 20 L32 28 L44 16"
        fill="none"
        stroke="url(#ndr-mark-fill)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 40 L30 44 L32 36 L44 48"
        fill="none"
        stroke="url(#ndr-mark-fill)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
