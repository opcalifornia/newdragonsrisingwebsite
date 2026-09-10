import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllEvents, getEventBySlug } from "@/lib/data/events";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { PaidSeminarRegisterButton, FreeSeminarRegisterForm } from "@/components/seminars/seminar-register";

export function generateStaticParams() {
  return getAllEvents().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return { title: event.title, description: event.description };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <PortraitPlaceholder name={event.title} aspect="aspect-[16/7]" className="w-full" />

      <p className="mt-8 text-sm uppercase tracking-[0.2em] text-red-highlight">
        {formatDate(event.date)}
      </p>
      <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
        {event.title}
      </h1>
      <p className="mt-4 text-text-muted">{event.location}</p>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-body">
        {event.description}
      </p>

      {event.past ? (
        <p className="mt-10 text-text-muted">This event has concluded.</p>
      ) : event.priceUsd === 0 ? (
        <div className="mt-10">
          <FreeSeminarRegisterForm eventTitle={event.title} />
        </div>
      ) : (
        <div className="mt-10">
          <PaidSeminarRegisterButton eventSlug={event.slug} priceUsd={event.priceUsd} />
        </div>
      )}
    </div>
  );
}
