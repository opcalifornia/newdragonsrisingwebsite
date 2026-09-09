import Link from "next/link";
import { CardTilt } from "@/components/motion/card-tilt";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import type { TrainingModule } from "@/lib/data/modules";

export function ModuleCard({ module: m }: { module: TrainingModule }) {
  return (
    <Link href={`/modules/${m.slug}`} className="block h-full">
      <CardTilt className="h-full">
        <PortraitPlaceholder name={m.discipline} aspect="aspect-[16/10]" />
        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>{m.discipline}</span>
            <span>{m.level}</span>
          </div>
          <h3 className="mt-2 font-display text-lg text-white">{m.title}</h3>
          <p className="mt-1 text-sm text-text-muted">{m.tagline}</p>
          <p className="mt-4 font-display text-xl text-red-highlight">
            ${m.priceUsd}
          </p>
        </div>
      </CardTilt>
    </Link>
  );
}
