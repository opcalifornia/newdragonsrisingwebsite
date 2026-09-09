import type { Metadata } from "next";
import { getAllModules } from "@/lib/data/modules";
import { ModulesCatalog } from "./modules-catalog";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Training Modules",
  description:
    "Browse New Dragons Rising's Escrima, Arnis, Kali, and Mestizo Method training modules by discipline, level, and format.",
};

export default function ModulesPage() {
  const modules = getAllModules();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.2em] text-red-highlight">
          The Curriculum
        </p>
        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          Training Modules
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-body">
          Every module below stacks toward rank in the Mestizo Method.
          Filter by discipline, level, or format to find where to start —
          or where to go next.
        </p>
      </Reveal>

      <div className="mt-14">
        <ModulesCatalog modules={modules} />
      </div>
    </div>
  );
}
