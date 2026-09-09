import { cn } from "@/lib/utils";

/**
 * Textless moody background panel used for the hero's parallax
 * z-planes, standing in for real fighter photography (none supplied
 * yet — see public/images/manifest.json). Unlike PortraitPlaceholder,
 * this deliberately carries no initials/label: in the hero it reads as
 * atmosphere and depth, not as a broken avatar.
 */
export function AtmospherePanel({
  className,
  aspect = "aspect-[4/5]",
}: {
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative overflow-hidden rounded-sm", aspect, className)}
      style={{
        background:
          "radial-gradient(130% 130% at 25% 15%, #171717 0%, #0a0a0a 55%, #000 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-35"
        style={{
          background:
            "linear-gradient(115deg, transparent 42%, var(--red-shadow) 49%, var(--red-core) 50%, transparent 58%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
