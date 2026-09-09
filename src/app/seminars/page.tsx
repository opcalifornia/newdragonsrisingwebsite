import type { Metadata } from "next";
import Link from "next/link";
import { getAllEvents } from "@/lib/data/events";
import { Reveal } from "@/components/motion/reveal";
import { CardTilt } from "@/components/motion/card-tilt";
import { RattanDivider } from "@/components/ui/rattan-divider";

export const metadata: Metadata = {
  title: "Seminars & Events",
  description: "Upcoming seminars, open houses, and past events at New Dragons Rising.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function SeminarsPage() {
  const events = getAllEvents();
  const upcoming = events.filter((e) => !e.past);
  const past = events.filter((e) => e.past);

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.2em] text-red-highlight">
          Seminars & Events
        </p>
        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          Train With Us
        </h1>
      </Reveal>

      <section className="mt-14">
        <Reveal>
          <h2 className="font-display text-2xl text-white">Upcoming</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event, i) => (
            <Reveal key={event.slug} delay={i * 0.05}>
              <Link href={`/seminars/${event.slug}`}>
                <CardTilt className="p-6">
                  <p className="text-sm text-red-highlight">
                    {formatDate(event.date)}
                  </p>
                  <h3 className="mt-2 font-display text-lg text-white">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted">
                    {event.location}
                  </p>
                  <p className="mt-4 text-white">
                    {event.priceUsd === 0 ? "Free" : `$${event.priceUsd}`}
                  </p>
                </CardTilt>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <RattanDivider className="my-16" />

      <section>
        <Reveal>
          <h2 className="font-display text-2xl text-white">Past Events</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {past.map((event, i) => (
            <Reveal key={event.slug} delay={i * 0.05}>
              <div className="rounded-sm border border-surface-border p-6 opacity-70">
                <p className="text-sm text-text-muted">
                  {formatDate(event.date)}
                </p>
                <h3 className="mt-2 font-display text-lg text-white">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  {event.location}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
