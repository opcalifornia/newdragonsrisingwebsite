# New Dragons Rising — static test preview

This branch is **not** the source code — it's a frozen static snapshot of
the real site (built from `claude/ndr-website-rebuild-1s62uy`) for
browsing purposes only, published via GitHub Pages.

**What works:** clicking around — every real page (Home, About + its
sub-pages, Instructors, Training Modules, Shop, Seminars, Blog, Legal,
Join, Contact, Testimonials, Book Online, Login/Signup, Cart) is here as
real, navigable content, captured straight from the actual running app
after scrolling the full page so every scroll-triggered entrance
animation settles, then stripping all JavaScript so nothing tries to
hydrate against a server that isn't there.

**What doesn't work here:** anything that needs a server. So:

- Contact/booking/affiliate/seminar forms render but don't submit
- Login/signup, filter buttons, and the mobile menu don't do anything
- Cart/checkout won't process a real purchase
- Enrolling in a module or registering for a paid seminar won't do
  anything

For an actually-interactive test (forms, auth, cart, checkout against
Stripe/Resend in test mode), the real app needs to run on a real Node
host — see the main branch's `README.md` for a Vercel deploy.

Regenerated with a small Playwright script that visits each real route,
scrolls the full page to trigger every `whileInView` entrance animation,
waits for it to settle, and saves the DOM as a plain HTML file with all
`<script>` tags removed. See `content/source/CLIENT-AUDIT.md` on the main
branch for what's real content vs. placeholder.
