import { cn } from "@/lib/utils";

/**
 * The site's structural motif: a lit cylindrical rattan stick standing in
 * for a plain horizontal rule. Built from stacked gradients (dark wood
 * base, a red rimlight catching one edge, a soft highlight running the
 * length) rather than an image, so it scales and themes for free.
 */
export function RattanDivider({ className }: { className?: string }) {
  return (
    <div
      role="separator"
      aria-hidden="true"
      className={cn("relative h-3 w-full max-w-xs mx-auto", className)}
      style={{
        borderRadius: "9999px",
        background:
          "linear-gradient(180deg, #3a2a1a 0%, #6b4a2a 35%, #4a3320 55%, #241a10 100%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -2px 3px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.5)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[2px] rounded-full opacity-70"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--red-highlight) 20%, var(--red-core) 50%, var(--red-highlight) 80%, transparent 100%)",
        }}
      />
    </div>
  );
}
