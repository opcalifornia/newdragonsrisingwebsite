/**
 * Mock catalog data for Training Modules. Pricing for the first three
 * entries is real, carried over from the old site's /book-online page
 * (content/source/book-online.md) — Kali Advanced Techniques ($150),
 * Esgrima Basics ($100), Arnis Mastery Course ($200). Everything else
 * (curriculum outlines, prerequisites, lesson lists) is placeholder
 * structure for the client to replace with real curriculum — clearly
 * not scraped or invented as fact, just shaped to match the schema.
 */

export type ModuleLevel = "Beginner" | "Intermediate" | "Advanced" | "Instructor";
export type ModuleFormat = "video" | "live-seminar" | "in-person";
export type ModuleDiscipline = "Escrima" | "Arnis" | "Kali" | "Mestizo Method";

export type TrainingModule = {
  slug: string;
  title: string;
  tagline: string;
  discipline: ModuleDiscipline;
  level: ModuleLevel;
  format: ModuleFormat[];
  priceUsd: number;
  instructorSlug: string;
  prerequisites: string[];
  whatYouLearn: string[];
  curriculum: { title: string; lessons: string[] }[];
};

export const trainingModules: TrainingModule[] = [
  {
    slug: "kali-advanced-techniques",
    title: "Kali Advanced Techniques",
    tagline: "Experience Kali Like Never Before",
    discipline: "Kali",
    level: "Advanced",
    format: ["live-seminar", "in-person"],
    priceUsd: 150,
    instructorSlug: "rudy-torres",
    prerequisites: ["Esgrima Basics", "12+ months active training"],
    whatYouLearn: [
      "Advanced footwork and angling under pressure",
      "Weapon retention and disarms",
      "Transitioning between empty-hand and weapon ranges",
    ],
    curriculum: [
      {
        title: "Module 1 — Advanced Angles",
        lessons: ["Angle combinations", "Broken rhythm timing"],
      },
      {
        title: "Module 2 — Disarms & Retention",
        lessons: ["Live disarm drills", "Retention against resistance"],
      },
    ],
  },
  {
    slug: "esgrima-basics",
    title: "Esgrima Basics",
    tagline: "Master the Art of Escrima",
    discipline: "Escrima",
    level: "Beginner",
    format: ["video", "in-person"],
    priceUsd: 100,
    instructorSlug: "david-aviles",
    prerequisites: [],
    whatYouLearn: [
      "Foundational stances and grips",
      "The 12 basic strikes",
      "Solo and partner striking drills",
    ],
    curriculum: [
      {
        title: "Module 1 — Foundations",
        lessons: ["Stance and grip", "The 12 strikes"],
      },
      {
        title: "Module 2 — Partner Drills",
        lessons: ["Sinawali basics", "Controlled sparring intro"],
      },
    ],
  },
  {
    slug: "arnis-mastery-course",
    title: "Arnis Mastery Course",
    tagline: "Comprehensive Foundation in Arnis",
    discipline: "Arnis",
    level: "Intermediate",
    format: ["video", "live-seminar"],
    priceUsd: 200,
    instructorSlug: "mark-cantu",
    prerequisites: ["Esgrima Basics"],
    whatYouLearn: [
      "Arnis-specific footwork patterns",
      "Stick-and-dagger combinations",
      "Transitioning Arnis principles into empty-hand defense",
    ],
    curriculum: [
      {
        title: "Module 1 — Footwork & Patterns",
        lessons: ["Triangle footwork", "Pattern combinations"],
      },
      {
        title: "Module 2 — Stick & Dagger",
        lessons: ["Dagger retention", "Combined weapon flow"],
      },
    ],
  },
  {
    slug: "mestizo-method-foundations",
    title: "Mestizo Method Foundations",
    tagline: "Where Esgrima, Kali, and Arnis converge",
    discipline: "Mestizo Method",
    level: "Beginner",
    format: ["in-person"],
    priceUsd: 120,
    instructorSlug: "rudy-torres",
    prerequisites: [],
    whatYouLearn: [
      "The core principles behind the Mestizo Method",
      "How Esgrima, Kali, and Arnis inform one another",
      "Building a personal training path toward rank",
    ],
    curriculum: [
      {
        title: "Module 1 — Principles",
        lessons: ["Origins of the Mestizo Method", "Cross-discipline drilling"],
      },
    ],
  },
];

export function getAllModules() {
  return trainingModules;
}

export function getModuleBySlug(slug: string) {
  return trainingModules.find((m) => m.slug === slug);
}
