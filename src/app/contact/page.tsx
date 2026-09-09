import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact New Dragons Rising in Stockton, CA.",
};

export default function ContactPage() {
  const { contact } = siteConfig;
  const fullAddress = `${contact.address.line1}, ${contact.address.city}, ${contact.address.state} ${contact.address.zip}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.2em] text-red-core">
          Contact
        </p>
        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          Visit the Dojo
        </h1>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-6 text-lg text-text-body">
            <div>
              <p className="text-sm text-text-muted">Phone</p>
              <a href={contact.phoneHref} className="text-white hover:text-red-highlight">
                {contact.phone}
              </a>
            </div>
            <div>
              <p className="text-sm text-text-muted">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className="text-white hover:text-red-highlight"
              >
                {contact.email}
              </a>
            </div>
            <div>
              <p className="text-sm text-text-muted">Address</p>
              <p className="text-white">
                {contact.address.line1}
                <br />
                {contact.address.city}, {contact.address.state}{" "}
                {contact.address.zip}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Hours</p>
              <p className="text-white">
                Contact us for the current class schedule.
              </p>
            </div>
          </div>

          <div className="mt-10 aspect-video overflow-hidden rounded-sm border border-surface-border">
            <iframe
              title="Map to New Dragons Rising"
              className="h-full w-full grayscale invert-[0.9]"
              loading="lazy"
              src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="space-y-5">
            <div>
              <label htmlFor="contact-name" className="text-sm text-text-muted">
                Name
              </label>
              <input
                id="contact-name"
                required
                className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="text-sm text-text-muted">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="text-sm text-text-muted">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={6}
                required
                className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-sm bg-red-core px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-highlight"
            >
              Send Message
            </button>
            <p className="text-xs text-text-muted">
              Not yet connected to a live email backend — see README.
            </p>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
