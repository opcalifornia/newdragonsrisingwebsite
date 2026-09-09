import { cn } from "@/lib/utils";
import type { ModuleLevel } from "@/lib/data/modules";

const levels: ModuleLevel[] = ["Beginner", "Intermediate", "Advanced", "Instructor"];

export function CurriculumPath({ current }: { current: ModuleLevel }) {
  const currentIndex = levels.indexOf(current);

  return (
    <div
      className="flex items-center gap-2 overflow-x-auto py-4"
      style={{ perspective: "800px" }}
    >
      {levels.map((level, i) => {
        const isPast = i < currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <div key={level} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-16 min-w-28 items-center justify-center rounded-sm border px-4 text-center text-xs transition-transform",
                isCurrent
                  ? "border-red-core bg-red-core/10 text-white"
                  : isPast
                    ? "border-surface-border text-text-muted"
                    : "border-dashed border-surface-border text-text-muted/60",
              )}
              style={{
                transform: `translateZ(${isCurrent ? 20 : 0}px) scale(${isCurrent ? 1.05 : 0.96})`,
              }}
            >
              {level}
            </div>
            {i < levels.length - 1 && (
              <div className="h-px w-6 shrink-0 bg-surface-border" />
            )}
          </div>
        );
      })}
    </div>
  );
}
