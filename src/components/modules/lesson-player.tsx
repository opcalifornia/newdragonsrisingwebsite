import { Play } from "lucide-react";

/**
 * Stands in for a real Mux Player / Cloudflare Stream embed — no video
 * hosting account exists in this environment to create real assets.
 * Once one is set up, replace the body of this component with the
 * provider's player (e.g. `<MuxPlayer playbackId={...} />`); every
 * caller already passes `lessonTitle`, so the swap is contained here.
 */
export function LessonPlayer({ lessonTitle }: { lessonTitle: string }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-sm border border-surface-border bg-surface">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-core">
          <Play className="ml-1 text-red-highlight" size={20} />
        </div>
        <p className="text-white">{lessonTitle}</p>
        <p className="max-w-xs text-xs text-text-muted">
          Video hosting isn&rsquo;t connected yet (no Mux/Cloudflare
          Stream account) — this is a placeholder player.
        </p>
      </div>
    </div>
  );
}
