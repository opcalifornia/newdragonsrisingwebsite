import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { RattanDivider } from "@/components/ui/rattan-divider";
import { CardTilt } from "@/components/motion/card-tilt";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Join New Dragons Rising as a student, association member, or affiliate school.",
};

/**
 * The old site's Members/Groups pages carried no real tier structure or
 * pricing (see content/source/members.md, groups.md) — these tiers and
 * prices are a reasonable proposed structure matching the brief's
 * example ("e.g. Student, Association Member, Affiliate School"), not
 * scraped facts. Flagged for client confirmation before launch.
 */
const tiers = [
  {
    name: "Student",
    price: "Contact for pricing",
    description: "Regular class access at the Stockton dojo.",
    features: [
      "Unlimited class attendance",
      "Access to Beginner and Intermediate training modules",
      "Eligible for rank testing",
    ],
  },
  {
    name: "Association Member",
    price: "Contact for pricing",
    description: "Full access across the New Dragons Rising curriculum.",
    features: [
      "Everything in Student",
      "Access to the full Training Modules catalog",
      "Seminar discounts",
      "Voting voice in association community events",
    ],
    featured: true,
  },
  {
    name: "Affiliate School",
    price: "Apply below",
    description:
      "For outside schools and martial artists who want to formally affiliate with New Dragons Rising and the Mestizo Method.",
    features: [
      "Use of the New Dragons Rising / Mestizo Method curriculum",
      "Instructor support from GM Torres and senior instructors",
      "Listed as an affiliate school",
    ],
  },
];

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.2em] text-red-highlight">
          Membership
        </p>
        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          Join New Dragons Rising
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-body">
          Explore the rich heritage of Filipino martial arts. Join us to
          learn, practice, and master Esgrima, Arnis, and Kali.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
        {tiers.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 0.06}>
            <CardTilt
              className={
                tier.featured ? "border-red-core" : undefined
              }
            >
              <div className="p-6">
                <h2 className="font-display text-xl text-white">
                  {tier.name}
                </h2>
                <p className="mt-2 text-2xl text-red-highlight">
                  {tier.price}
                </p>
                <p className="mt-3 text-sm text-text-muted">
                  {tier.description}
                </p>
                <ul className="mt-6 space-y-2 text-sm text-text-body">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-core" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-8 w-full rounded-sm border border-red-core px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-core"
                >
                  Get Started
                </button>
              </div>
            </CardTilt>
          </Reveal>
        ))}
      </div>

      <RattanDivider className="my-20" />

      <Reveal>
        <div id="affiliate" className="mx-auto max-w-2xl">
          <h2 className="text-center font-display text-3xl text-white">
            Affiliate a School
          </h2>
          <p className="mt-4 text-center text-text-body">
            New Dragons Rising invites outside schools and martial
            artists to formally affiliate and train under the Mestizo
            Method. Tell us about your school below and GM Torres&rsquo;
            team will follow up.
          </p>

          <form className="mt-10 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="school-name" className="text-sm text-text-muted">
                  School / instructor name
                </label>
                <input
                  id="school-name"
                  required
                  className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
                />
              </div>
              <div>
                <label htmlFor="school-location" className="text-sm text-text-muted">
                  Location
                </label>
                <input
                  id="school-location"
                  required
                  className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
                />
              </div>
            </div>
            <div>
              <label htmlFor="school-email" className="text-sm text-text-muted">
                Email
              </label>
              <input
                id="school-email"
                type="email"
                required
                className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
              />
            </div>
            <div>
              <label htmlFor="school-disciplines" className="text-sm text-text-muted">
                Disciplines taught
              </label>
              <input
                id="school-disciplines"
                className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
              />
            </div>
            <div>
              <label htmlFor="school-message" className="text-sm text-text-muted">
                Tell us about your school
              </label>
              <textarea
                id="school-message"
                rows={4}
                className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-sm bg-red-core px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-highlight"
            >
              Submit Application
            </button>
            <p className="text-center text-xs text-text-muted">
              This form is not yet connected to an email/CRM backend —
              see README.
            </p>
          </form>
        </div>
      </Reveal>
    </div>
  );
}
