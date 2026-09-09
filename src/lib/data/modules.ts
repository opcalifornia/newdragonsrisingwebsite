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
  curriculum: { title: string; lessons: { id: string; title: string }[] }[];
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
        lessons: [
          { id: "angle-combinations", title: "Angle combinations" },
          { id: "broken-rhythm-timing", title: "Broken rhythm timing" },
        ],
      },
      {
        title: "Module 2 — Disarms & Retention",
        lessons: [
          { id: "live-disarm-drills", title: "Live disarm drills" },
          { id: "retention-against-resistance", title: "Retention against resistance" },
        ],
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
        lessons: [
          { id: "stance-and-grip", title: "Stance and grip" },
          { id: "the-12-strikes", title: "The 12 strikes" },
        ],
      },
      {
        title: "Module 2 — Partner Drills",
        lessons: [
          { id: "sinawali-basics", title: "Sinawali basics" },
          { id: "controlled-sparring-intro", title: "Controlled sparring intro" },
        ],
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
        lessons: [
          { id: "triangle-footwork", title: "Triangle footwork" },
          { id: "pattern-combinations", title: "Pattern combinations" },
        ],
      },
      {
        title: "Module 2 — Stick & Dagger",
        lessons: [
          { id: "dagger-retention", title: "Dagger retention" },
          { id: "combined-weapon-flow", title: "Combined weapon flow" },
        ],
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
        lessons: [
          { id: "origins-of-the-mestizo-method", title: "Origins of the Mestizo Method" },
          { id: "cross-discipline-drilling", title: "Cross-discipline drilling" },
        ],
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
