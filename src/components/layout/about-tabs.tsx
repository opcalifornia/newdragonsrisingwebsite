import Link from "next/link";
import { aboutNav } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function AboutTabs({ active }: { active: string }) {
  return (
    <nav className="mb-14 flex flex-wrap gap-x-8 gap-y-3 border-b border-surface-border pb-6">
      {aboutNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm transition-colors",
            item.href === active
              ? "text-white"
              : "text-text-muted hover:text-white",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
