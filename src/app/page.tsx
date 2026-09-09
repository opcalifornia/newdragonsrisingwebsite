import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { MestizoDepth } from "@/components/home/mestizo-depth";
import { Reveal } from "@/components/motion/reveal";
import { RattanDivider } from "@/components/ui/rattan-divider";
import { ModuleCard } from "@/components/modules/module-card";
import { ProductCard } from "@/components/shop/product-card";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { CardTilt } from "@/components/motion/card-tilt";
import { getAllInstructors } from "@/lib/content/instructors";
import { getAllModules } from "@/lib/data/modules";
import { getAllProducts } from "@/lib/data/products";
import { testimonials } from "@/lib/data/testimonials";

export default function Home() {
  const instructors = getAllInstructors().slice(0, 4);
  const modules = getAllModules().slice(0, 3);
  const products = getAllProducts().slice(0, 4);

  return (
    <>
      <Hero />

      {/* Vision */}
      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl text-white sm:text-4xl">
            Our Vision
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-body">
            We envision a world where the essence of Filipino martial arts
            is celebrated and practiced worldwide. Through our
            collaboration with the American Filipino Martial Arts
            Association, we aim to empower individuals with self-defense
            skills, foster a sense of community, and honor the ancestral
            lineage of these ancient practices.
          </p>
        </Reveal>
      </section>

      <RattanDivider className="my-4" />

      {/* Mestizo Method brief */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="font-display text-sm text-red-highlight">
              A Living Synthesis
            </p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              The Mestizo Method
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-body">
              New Dragons Rising was created by Grand Master Rudy Torres,
              formed alongside friends, family, and fellow martial artists
              into a method that seamlessly integrates Esgrima, Kali, and
              Arnis — not three separate systems studied in parallel, but
              one method built from where they meet.
            </p>
            <Link
              href="/about/mestizo-method"
              className="mt-8 inline-block border-b border-red-core pb-1 text-white transition-colors hover:text-red-highlight"
            >
              Read the full history →
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <MestizoDepth />
          </Reveal>
        </div>
      </section>

      <RattanDivider className="my-4" />

      {/* Featured instructors */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Our Family
            </h2>
            <Link
              href="/instructors"
              className="text-sm text-text-muted hover:text-white"
            >
              Meet every instructor →
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((instructor, i) => (
            <Reveal key={instructor.slug} delay={i * 0.05}>
              <Link href={`/instructors/${instructor.slug}`}>
                <CardTilt>
                  <PortraitPlaceholder name={instructor.name} />
                  <div className="p-4">
                    <h3 className="font-display text-base text-white">
                      {instructor.name}
                    </h3>
                    <p className="mt-1 text-xs text-red-highlight">
                      {instructor.title}
                    </p>
                  </div>
                </CardTilt>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured training modules */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <h2 className="font-display text-3xl text-white sm:text-4xl">
                Training Modules
              </h2>
              <Link
                href="/modules"
                className="text-sm text-text-muted hover:text-white"
              >
                Browse the full catalog →
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m, i) => (
              <Reveal key={m.slug} delay={i * 0.05}>
                <ModuleCard module={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured store */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              From the Shop
            </h2>
            <Link
              href="/shop"
              className="text-sm text-text-muted hover:text-white"
            >
              Visit the shop →
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl text-white sm:text-4xl">
              What Our Students Say
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.05}>
                <blockquote className="h-full rounded-sm border border-dashed border-surface-border p-6 text-text-muted">
                  <p className="italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4 text-sm text-text-primary">
                    — {t.attribution}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA + newsletter */}
      <section className="mx-auto max-w-4xl px-4 py-28 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-4xl text-white sm:text-5xl">
            Join Now
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-text-body">
            Explore the rich heritage of Filipino martial arts. Join us to
            learn, practice, and master Esgrima, Arnis, and Kali.
          </p>
          <Link
            href="/join"
            className="mt-8 inline-block rounded-sm bg-red-core px-10 py-4 text-sm font-medium text-white transition-colors hover:bg-red-highlight"
          >
            Get Started
          </Link>

          <form className="mx-auto mt-16 flex max-w-md flex-col gap-3 border-t border-surface-border pt-10 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Your email"
              className="flex-1 rounded-sm border border-surface-border bg-surface px-4 py-3 text-sm text-white placeholder:text-text-muted focus-visible:border-red-core"
            />
            <button
              type="submit"
              className="rounded-sm border border-white/25 px-6 py-3 text-sm text-white hover:border-white"
            >
              Subscribe
            </button>
          </form>
        </Reveal>
      </section>
    </>
  );
}
