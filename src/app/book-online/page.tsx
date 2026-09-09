import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { RattanDivider } from "@/components/ui/rattan-divider";

export const metadata: Metadata = {
  title: "Book Online",
  description:
    "Book a class trial, request a private lesson, or reserve a seminar spot with New Dragons Rising.",
};

const services = [
  { name: "Kali Advanced Techniques", tagline: "Experience Kali Like Never Before", priceUsd: 150, status: "Open" },
  { name: "Esgrima Basics", tagline: "Master the Art of Escrima", priceUsd: 100, status: "Ended" },
  { name: "Arnis Mastery Course", tagline: "Comprehensive Foundation in Arnis", priceUsd: 200, status: "Ended" },
];

export default function BookOnlinePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.2em] text-red-highlight">
          Book Online
        </p>
        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          Start Training
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-body">
          Whether you want to try a class, book a private lesson, or
          reserve a seminar spot, start here.
        </p>
      </Reveal>

      <RattanDivider className="my-14" />

      <Reveal>
        <h2 className="font-display text-2xl text-white">Our Services</h2>
        <div className="mt-6 space-y-4">
          {services.map((s) => (
            <div
              key={s.name}
              className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-surface-border p-5"
            >
              <div>
                <p className="text-white">{s.name}</p>
                <p className="text-sm text-text-muted">{s.tagline}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-display text-lg text-red-highlight">
                  ${s.priceUsd}
                </span>
                <span
                  className={
                    s.status === "Open"
                      ? "rounded-full border border-red-core px-3 py-1 text-xs text-white"
                      : "rounded-full border border-surface-border px-3 py-1 text-xs text-text-muted"
                  }
                >
                  {s.status === "Open" ? "Book Now" : "Ended"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <RattanDivider className="my-14" />

      <Reveal>
        <h2 className="font-display text-2xl text-white">
          Request a Class Trial or Private Lesson
        </h2>
        <form className="mt-6 space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="book-name" className="text-sm text-text-muted">
                Name
              </label>
              <input
                id="book-name"
                required
                className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
              />
            </div>
            <div>
              <label htmlFor="book-phone" className="text-sm text-text-muted">
                Phone
              </label>
              <input
                id="book-phone"
                type="tel"
                className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
              />
            </div>
          </div>
          <div>
            <label htmlFor="book-type" className="text-sm text-text-muted">
              What are you booking?
            </label>
            <select
              id="book-type"
              className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
            >
              <option>Class trial</option>
              <option>Private lesson</option>
              <option>Seminar</option>
            </select>
          </div>
          <div>
            <label htmlFor="book-notes" className="text-sm text-text-muted">
              Notes
            </label>
            <textarea
              id="book-notes"
              rows={4}
              className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
            />
          </div>
          <button
            type="submit"
            className="rounded-sm bg-red-core px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-red-highlight"
          >
            Request Booking
          </button>
          <p className="text-xs text-text-muted">
            Not yet connected to a live scheduling backend — see README.
          </p>
        </form>
      </Reveal>
    </div>
  );
}
