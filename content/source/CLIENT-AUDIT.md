# Old site audit — what the client's Wix build got wrong, and what this rebuild fixes

Running list, updated as the build proceeds. Meant for the client
walkthrough conversation: "here's what the old site was actually doing"
next to "here's what we did about it."

---

## Legal / compliance

| Found on old site | Problem | Fix in rebuild |
|---|---|---|
| Privacy Policy page | Wix's generic unfilled "how to write a privacy policy" template — never actually completed for NDR | New page built as a real route; placeholder body clearly marked "pending legal review" until real, NDR-specific policy text is written and a lawyer signs off |
| Accessibility Statement page | Same — Wix template with literal `[enter organization / business name]` brackets never filled in | Same treatment; will describe actual practices (WCAG 2.2 AA target, keyboard nav, alt text, contrast) once real |
| Terms & Conditions page | Same — unfilled Wix template | Same treatment; needs to cover shop purchases, module enrollment, membership subscriptions once those launch |
| Refund Policy page | Same — unfilled Wix template | Same treatment; needs to cover physical goods, digital downloads, seminar tickets |
| No Liability Waiver / Assumption of Risk page | Never existed — essential for any martial arts school and currently missing entirely | New page added to the rebuild; flagged that a lawyer must draft/review this before launch, non-negotiable for a contact sport school |
| No Shipping Policy | Never existed — needed once the shop ships physical goods | New page added |
| No cookie consent banner | Never existed | Added with preferences, per build brief |

**Bottom line for the client:** none of the four existing legal pages
ever had real content — this isn't a redesign of their legal copy, it's
legal copy that needs to be written for the first time. Recommend
budgeting for actual attorney time before launch, especially for the
liability waiver.

## Copy quality

| Found | Problem | Fix |
|---|---|---|
| "OUR FAMLIY" section heading | Misspelled | Corrected to "Our Family" |
| Instructor bios | OCR/export artifacts throughout — stray semicolons standing in for quotation marks (e.g. `;Operation Enduring Freedom;`), `&#39;` HTML entities instead of apostrophes, doubled spaces, missing apostrophes (`Davids`, `Tonys'`) | Cleaned in `content/source/home.md` — no facts, names, ranks, or dates changed, only the mechanical artifacts |
| Copyright line reads "© 2035" | Wrong/stale hardcoded year | Made dynamic (`new Date().getFullYear()`) |

## Technical / structural

| Found | Problem | Fix |
|---|---|---|
| Footer social icons | Link to Wix's own accounts (`facebook.com/wix`, `instagram.com/wix`, etc.) — dead/wrong links live on the site right now | Pulled into one config file as clearly-marked TODO constants; will not ship as dead links, but need NDR's real social URLs from the client |
| Entire site | One enormous scrolling homepage — no real routes/pages, poor for SEO, sharing, and navigation | Broken into real Next.js routes (Home, About, Mestizo Method, In Memoriam, Instructors index + detail pages, etc.) |
| No dedicated Mestizo Method page | The full history/story is buried mid-scroll on the homepage | Given its own page with proper structure |
| No individual instructor pages | Bios are homepage text blocks only | Instructor index + detail page per person, structured schema so more can be added |
| No In Memoriam page for Rudy Torres Jr. | His story is folded into the Mestizo Method narrative rather than honored on its own | Dedicated, deliberately quiet/restrained page |

## Content gaps (things that don't exist yet on the old site, being added new)

- Training Modules (paid curriculum, video hosting, progress tracking, certificates)
- Shop (training weapons, apparel, patches, digital downloads)
- Membership tiers + Affiliate a School application flow
- Seminars & Events calendar/registration
- Testimonials section (none found on old site at all)
- Member portal / auth with role gating

## Still pending capture (not yet pasted into this session)

- `/blog` index + full text of the 3 existing posts
- `/book-online`
- `/groups`
- `/members`
- Confirmation on whether the Privacy Policy / Accessibility Statement / T&C / Refund Policy pages have any content beyond where each paste cut off (unlikely, given the pattern, but worth a final check)
