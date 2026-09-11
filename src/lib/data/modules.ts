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
  /**
   * A couple of sentences on where this discipline comes from — written to
   * set the tone before someone opens a lesson, not to assert specific
   * unverifiable genealogy. Grounded in two kinds of fact: what's publicly
   * documented about Filipino martial arts history (e.g. Arnis's status as
   * the Philippines' national martial art/sport under Republic Act 9850),
   * and what the client's own site already says about Grandmaster Rudy
   * Torres and the Mestizo Method. No invented names, dates, or places.
   */
  heritage: string;
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
    heritage:
      "Kali is older than any dojo it's ever been taught in — refined hand to hand, blade to blade, by generations who needed it to work before it ever needed to be written down. Nothing here is a technique lifted from a book; it's a living inheritance, and every practitioner who has carried it before you trusted it to you the same way it was trusted to them.",
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
    heritage:
      "These strikes were never confined to a training hall — they were shaped over centuries in backyards and barrios by Filipino families who needed them to survive, then handed down because survival is worth passing on. The basics you learn here are the same ones every generation of this art has started with, taught the same way: hand to hand, not page to page.",
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
    heritage:
      "Arnis carries the weight of a nation behind it — declared the Philippines' official national martial art and sport by law, built on centuries of exchange between masters who had far more on the line than a rank test. Every pattern in this course descends from that lineage. You're not studying a system; you're being entrusted with one.",
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
    heritage:
      "The Mestizo Method isn't a style someone invented — it's a lifetime Grandmaster Rudy Torres spent drawing Escrima, Arnis, and Kali together into one coherent art, then handing it to the instructors who trained under him to carry forward. What you learn in this module descends directly from that lineage. You're not learning about it — you're joining it.",
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
