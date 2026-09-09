/**
 * Mock seminar/event data — the old site had no events calendar.
 * Placeholder structure for the client to replace with real dates.
 */

export type SeminarEvent = {
  slug: string;
  title: string;
  date: string;
  location: string;
  priceUsd: number;
  description: string;
  past: boolean;
};

export const events: SeminarEvent[] = [
  {
    slug: "kali-advanced-seminar-spring",
    title: "Kali Advanced Techniques Seminar",
    date: "2026-04-18",
    location: "New Dragons Rising, Stockton, CA",
    priceUsd: 150,
    description:
      "A live seminar covering advanced Kali angles, disarms, and retention drills.",
    past: false,
  },
  {
    slug: "mestizo-method-open-house",
    title: "Mestizo Method Open House",
    date: "2026-05-09",
    location: "New Dragons Rising, Stockton, CA",
    priceUsd: 0,
    description:
      "An open house introducing the Mestizo Method to new and prospective students.",
    past: false,
  },
  {
    slug: "arnis-mastery-cohort",
    title: "Arnis Mastery Course — Winter Cohort",
    date: "2025-11-14",
    location: "New Dragons Rising, Stockton, CA",
    priceUsd: 200,
    description: "Comprehensive foundation course in Arnis.",
    past: true,
  },
];

export function getAllEvents() {
  return events;
}

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}
