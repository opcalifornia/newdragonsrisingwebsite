# New Dragons Rising

Rebuild of newdragonsrising.com for New Dragons Rising (NDR), a Filipino
martial arts association in Stockton, CA founded by Grandmaster Rudy
Torres, teaching Escrima, Arnis, and Kali through the Mestizo Method.

## Stack

- **Next.js 16 (App Router) + TypeScript + Tailwind v4**
- **Framer Motion** for orchestration (reduced-motion aware throughout)
- **React Three Fiber + drei** for the hero's 3D crest only — everything
  else (card tilt, curriculum-path depth, the Mestizo Method converging
  planes) is CSS 3D transforms, per the design brief, so the site stays
  fast on mobile
- **next-mdx-remote** for instructor bios (see Content below)
- **Client-side cart** (React context + localStorage) — no backend yet

## Content: MDX + typed data, not a headless CMS

Instructor bios live as MDX files in `content/instructors/*.mdx` with
typed frontmatter, loaded via `src/lib/content/instructors.ts` (fs +
gray-matter + next-mdx-remote). Training modules, shop products,
seminars, blog posts, and testimonials are typed data files in
`src/lib/data/*.ts`.

**Why not a headless CMS (Sanity/Contentful) as the brief suggested:**
wiring one up requires a live account and API keys that don't exist in
this environment, and provisioning one isn't something to do
unilaterally. MDX + typed data gets the client 90% of "edit content
without touching code" — bios and copy are readable Markdown files, and
non-developers can edit them via GitHub's web editor or a PR — without a
third-party dependency this build can't actually stand up and test.

**Migration path, if the client wants a real CMS later:** the loader
functions in `src/lib/content/` and `src/lib/data/` are the only places
that know where content comes from. Swapping the instructor loader for
a Sanity/Contentful client call, or replacing `src/lib/data/modules.ts`
with a fetch, is a contained change — no page component needs to change,
since they all consume the same typed shapes.

## What's real vs. placeholder

This build pulled everything it could from the live Wix site, but two
things blocked a full 1:1 migration:

1. **Network egress in this session was blocked** — the live site could
   not be scraped automatically. All homepage/instructor copy in
   `content/source/` was manually pasted in by the client instead.
2. **The old site had real content gaps.** All four legal pages
   (Privacy Policy, Terms & Conditions, Refund Policy, Accessibility
   Statement) were Wix's own unfilled templates, never completed. The
   `/blog` posts only have excerpts, not full article text. See
   `content/source/CLIENT-AUDIT.md` for the full list of what the old
   site was actually doing, page by page.

Placeholder/mock content in this build, clearly marked in code and UI:

- **All photography** — no client photography was supplied this
  session (network access to download `static.wixstatic.com` assets was
  also blocked). Every image is a styled placeholder panel. Real files
  should replace them per `public/images/manifest.json` and
  `content/source/IMAGE-SHORTLIST.md`.
- **The hero's 3D crest and the header/footer logo mark** — placeholder
  geometry (a hollow hexagonal medallion with crossed rattan sticks, and
  a matching 2D monogram) standing in for the real NDR dragon crest,
  which hasn't been supplied. The palette's red ramp
  (`--red-shadow` / `--red-core` / `--red-highlight` in
  `src/app/globals.css`) is likewise a provisional sample, not extracted
  from the real logo file — re-sample and update those three values once
  the logo exists; every red accent site-wide derives from that ramp.
- **Training module curriculum, shop products, seminars, testimonials,
  membership tiers** — schemas are real and match the brief; the actual
  entries are placeholder/mock data for the client to replace. Real
  pricing that *was* found on the old site (`/book-online`: Kali
  Advanced Techniques $150, Esgrima Basics $100, Arnis Mastery Course
  $200) was carried over as-is.
- **Blog posts** — title/author/date/excerpt are real (scraped from the
  old site's `/blog` index); full article bodies were never provided and
  are intentionally left unfilled rather than invented.

## Not yet wired (needs real credentials/accounts to go further)

- **Stripe** — cart and checkout UI are complete; no `STRIPE_SECRET_KEY`
  / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` exist in this environment, so
  checkout renders a real order summary with payment intentionally
  disabled rather than a fake success path.
- **Auth / member portal** (NextAuth or Clerk, role gating for
  guest/student/instructor/admin) — not implemented. The Membership page
  and forms are UI-only.
- **Video hosting** (Mux or Cloudflare Stream) for gated module lessons,
  progress tracking, and completion certificates — not implemented.
- **Contact/booking/affiliate forms** — render and validate client-side
  but don't submit anywhere yet (no email/CRM backend configured).

## Fix-list items completed

- Dynamic copyright year (was hardcoded "© 2035")
- "OUR FAMLIY" → "Our Family"
- Bios cleaned of OCR/export artifacts (stray semicolons standing in for
  quotation marks, `&#39;` entities, doubled spaces) with no facts,
  names, ranks, or dates changed — see `content/source/home.md`
- Footer social links pulled into `src/lib/site-config.ts` as explicit
  `null`-until-real-URL constants (`socialLinks`) instead of shipping
  the old site's dead links to `facebook.com/wix` / `instagram.com/wix`
- Site broken into real routes instead of one long scrolling homepage
- Cookie consent banner with a preferences toggle (new — old site had
  none)

## Accessibility

Targets WCAG 2.2 AA. The red accent ramp was contrast-checked against
black: `--red-core` (~3.57:1) is used only for large text, borders, and
button fills, never for small body/label text; `--red-highlight`
(~6.39:1) is used for small eyebrow labels and any red text under large
size. All motion (Framer Motion reveals, the R3F hero, CSS 3D tilts)
respects `prefers-reduced-motion` and degrades to a static, still-composed
layout — see `src/app/globals.css` and the individual motion components
in `src/components/motion/` and `src/components/three/`.

## Structured data / SEO

`src/app/sitemap.ts` and `src/app/robots.ts` are dynamic and include
every instructor/module/product/event/blog route. JSON-LD is emitted
site-wide for `SportsActivityLocation` (root layout) and per-page for
`Course` (module detail) and `Product` (shop detail) — see
`src/components/json-ld.tsx`.

## Development

```bash
npm install
npm run dev
npm run build
```

## Directory map

- `content/source/` — raw scraped/pasted copy from the old site, plus
  `CLIENT-AUDIT.md` (old-site findings) and `IMAGE-SHORTLIST.md`
  (photography still needed from the client)
- `content/instructors/*.mdx` — real instructor bios
- `src/lib/data/*.ts` — typed mock data (modules, products, events, blog,
  testimonials)
- `src/lib/content/instructors.ts` — MDX content loader
- `src/components/three/` — the only React Three Fiber code in the app
- `src/components/motion/` — reduced-motion-aware entrance/tilt primitives
- `public/images/manifest.json` — image inventory and placeholder status
