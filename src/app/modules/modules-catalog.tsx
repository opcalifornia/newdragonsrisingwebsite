"use client";

import { useMemo, useState } from "react";
import { ModuleCard } from "@/components/modules/module-card";
import { Reveal } from "@/components/motion/reveal";
import type { TrainingModule } from "@/lib/data/modules";
import { cn } from "@/lib/utils";

const disciplines = ["All", "Escrima", "Arnis", "Kali", "Mestizo Method"] as const;
const levels = ["All", "Beginner", "Intermediate", "Advanced", "Instructor"] as const;
const formats = ["All", "video", "live-seminar", "in-person"] as const;

const formatLabels: Record<string, string> = {
  video: "Video",
  "live-seminar": "Live Seminar",
  "in-person": "In-Person",
};

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-text-muted">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              value === opt
                ? "border-red-core bg-red-core text-white"
                : "border-surface-border text-text-muted hover:border-white/40 hover:text-white",
            )}
          >
            {formatLabels[opt] ?? opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ModulesCatalog({ modules }: { modules: TrainingModule[] }) {
  const [discipline, setDiscipline] = useState<string>("All");
  const [level, setLevel] = useState<string>("All");
  const [format, setFormat] = useState<string>("All");

  const filtered = useMemo(() => {
    return modules.filter((m) => {
      if (discipline !== "All" && m.discipline !== discipline) return false;
      if (level !== "All" && m.level !== level) return false;
      if (format !== "All" && !m.format.includes(format as never)) return false;
      return true;
    });
  }, [modules, discipline, level, format]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 border-b border-surface-border pb-10 sm:grid-cols-3">
        <FilterGroup
          label="Discipline"
          options={disciplines}
          value={discipline}
          onChange={setDiscipline}
        />
        <FilterGroup
          label="Level"
          options={levels}
          value={level}
          onChange={setLevel}
        />
        <FilterGroup
          label="Format"
          options={formats}
          value={format}
          onChange={setFormat}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-text-muted">
          No modules match those filters yet.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.04}>
              <ModuleCard module={m} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
