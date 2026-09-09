import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .replace(/^(Grandmaster|Master|Datu|Mrs\.|Chief Warrant Officer)\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/**
 * Stand-in for a real photograph. No client photography has been supplied
 * to this build yet (see public/images/manifest.json) — swap for an
 * <Image> once files arrive. Deliberately styled as a lit, dimensional
 * panel rather than a flat gray box so it doesn't read as a broken image.
 */
export function PortraitPlaceholder({
  name,
  className,
  aspect = "aspect-[4/5]",
}: {
  name: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-sm",
        aspect,
        className,
      )}
      style={{
        background:
          "radial-gradient(120% 120% at 30% 20%, #1c1c1c 0%, #0a0a0a 60%, #000 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(115deg, transparent 40%, var(--red-shadow) 48%, var(--red-core) 50%, transparent 58%)",
        }}
      />
      <span
        className="font-display text-4xl text-white/80"
        style={{ textShadow: "0 0 24px rgba(196,30,46,0.5)" }}
      >
        {initials(name)}
      </span>
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
  );
}
