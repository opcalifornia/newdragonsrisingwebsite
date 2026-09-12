import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" active="/legal/privacy-policy">
      <p className="text-xs uppercase tracking-wider text-text-muted">
        Last updated: [effective date to be added at launch]
      </p>

      <p>
        This Privacy Policy explains how {siteConfig.name} (&ldquo;NDR,&rdquo;
        &ldquo;we,&rdquo; &ldquo;us&rdquo;) collects, uses, and protects
        information when you visit {siteConfig.url}, create an account,
        enroll in a training module, register for a seminar, or purchase
        something from our shop.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Information We Collect
      </h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong className="text-white">Contact form submissions</strong> —
          name, email, phone (if provided), and message content, from the
          Contact, Booking, Affiliate, and seminar registration forms.
        </li>
        <li>
          <strong className="text-white">Account information</strong> —
          email address and a securely hashed password when you create an
          account. We never store your password in plain text.
        </li>
        <li>
          <strong className="text-white">Order and enrollment records</strong>{" "}
          — which shop items, training modules, or seminars you&rsquo;ve
          purchased or enrolled in, and your lesson-completion progress
          within a module.
        </li>
        <li>
          <strong className="text-white">Payment information</strong> — shop
          and enrollment payments are processed by Stripe. We do not receive
          or store your full card number; Stripe provides us only a
          confirmation that payment succeeded.
        </li>
        <li>
          <strong className="text-white">Cookies and analytics</strong> — see
          the &ldquo;Cookies &amp; Analytics&rdquo; section below.
        </li>
      </ul>

      <h2 className="pt-2 font-display text-xl text-white">
        How We Use Information
      </h2>
      <p>We use the information above to:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Create and maintain your account and enrollment records</li>
        <li>Process payments and fulfill orders, enrollments, and seminar registrations</li>
        <li>Respond to contact, booking, and affiliate inquiries</li>
        <li>Send transactional emails (e.g. order confirmations, form-submission notifications)</li>
        <li>Maintain the security of the site and prevent abuse</li>
        <li>Understand aggregate site usage, only where you&rsquo;ve consented to analytics</li>
      </ul>
      <p>
        We do not sell your personal information, and we do not share it with
        third parties for their own marketing purposes.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Cookies &amp; Analytics
      </h2>
      <p>
        We use a small number of strictly necessary cookies to run the site
        (e.g. keeping you logged in, remembering items in your cart). These
        cannot be turned off, since the site can&rsquo;t function without
        them.
      </p>
      <p>
        With your consent — via the cookie banner shown on your first visit,
        or anytime after in its Preferences panel — we also use Vercel
        Analytics to understand aggregate traffic (pages visited, general
        device/browser type). This analytics tool does not use tracking
        cookies and does not build an individual profile of you across other
        sites. If you decline or later withdraw consent, this analytics code
        does not run.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Third-Party Service Providers
      </h2>
      <p>We share the minimum information necessary with:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong className="text-white">Stripe</strong>, to process
          payments (Stripe&rsquo;s own privacy policy governs how it handles
          your payment details)
        </li>
        <li>
          <strong className="text-white">Resend</strong>, to deliver
          transactional emails on our behalf (e.g. contact-form
          notifications)
        </li>
        <li>
          <strong className="text-white">Vercel</strong>, which hosts this
          site and, only with your consent, provides aggregate analytics
        </li>
      </ul>
      <p>
        These providers are only permitted to use your information to
        provide the service to us, not for their own independent purposes.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Data Retention &amp; Your Rights
      </h2>
      <p>
        We keep account, order, and enrollment records for as long as your
        account is active and as needed to meet our legal and tax
        obligations. You can request a copy of the personal information we
        hold about you, ask us to correct it, or ask us to delete your
        account and associated data, by contacting us at{" "}
        <a href={`mailto:${siteConfig.contact.email}`} className="underline hover:text-white">
          {siteConfig.contact.email}
        </a>
        . California residents have specific rights under the CCPA/CPRA to
        know, delete, and opt out of the sale of personal information; as
        noted above, we do not sell personal information.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Children&rsquo;s Privacy
      </h2>
      <p>
        This website&rsquo;s account-creation and checkout features are not
        directed at children under 13, and we do not knowingly collect
        personal information from them online. Minors do train at New
        Dragons Rising in person, but that relationship is handled through
        our in-person enrollment paperwork and Liability Waiver, not through
        website account data.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">Security</h2>
      <p>
        We use industry-standard measures to protect your information,
        including encrypted password storage and encrypted connections
        (HTTPS) site-wide. No online system is 100% secure, but we work to
        protect your data appropriately for what we collect.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Changes to This Policy
      </h2>
      <p>
        If we make material changes to this policy, we&rsquo;ll update the
        date at the top of this page.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">Contact Us</h2>
      <p>
        Questions about this policy or your data can be sent to{" "}
        <a href={`mailto:${siteConfig.contact.email}`} className="underline hover:text-white">
          {siteConfig.contact.email}
        </a>{" "}
        or {siteConfig.contact.phone}, or by mail to{" "}
        {siteConfig.contact.address.line1}, {siteConfig.contact.address.city},{" "}
        {siteConfig.contact.address.state} {siteConfig.contact.address.zip}.
      </p>
    </LegalPage>
  );
}
