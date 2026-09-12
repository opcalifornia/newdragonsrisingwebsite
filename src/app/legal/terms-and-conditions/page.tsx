import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" active="/legal/terms-and-conditions">
      <p className="text-xs uppercase tracking-wider text-text-muted">
        Last updated: [effective date to be added at launch]
      </p>

      <p>
        These Terms &amp; Conditions govern your use of {siteConfig.url} and
        any purchase, enrollment, or registration made through it. By using
        this site, you agree to these terms.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Accounts
      </h2>
      <p>
        You must provide accurate information when creating an account and
        are responsible for keeping your login credentials confidential and
        for all activity under your account. You must be at least 18 years
        old to create an account or make a purchase on this site; training
        for minors is arranged in person with a parent or guardian, separate
        from website account creation.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Purchases &amp; Enrollment
      </h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong className="text-white">Shop items</strong> are sold at the
          price shown at checkout, processed securely through Stripe. See
          our{" "}
          <Link href="/legal/refund-policy" className="underline hover:text-white">
            Refund Policy
          </Link>{" "}
          and{" "}
          <Link href="/legal/shipping-policy" className="underline hover:text-white">
            Shipping Policy
          </Link>{" "}
          for returns and delivery.
        </li>
        <li>
          <strong className="text-white">Training module enrollment</strong>{" "}
          is a one-time purchase that grants access to that module&rsquo;s
          video lessons and curriculum. Enrollment is personal to your
          account and may not be shared, resold, or transferred.
        </li>
        <li>
          <strong className="text-white">Seminar registration</strong> — some
          events are free and some are paid; paid seminars are processed the
          same way as module enrollment.
        </li>
        <li>
          Some services may in the future be offered as recurring membership
          plans rather than one-time purchases. If so, the recurring charge,
          billing frequency, and cancellation method will be clearly
          disclosed before you enroll, and you may cancel at any time through
          your account or by contacting us.
        </li>
        <li>
          Prices and availability are subject to change, but changes will
          never apply to a purchase you&rsquo;ve already completed.
        </li>
      </ul>

      <h2 className="pt-2 font-display text-xl text-white">
        Training Modules &amp; Digital Content
      </h2>
      <p>
        Enrolling in a training module grants you a personal, non-transferable
        license to view that content for your own instruction. You may not
        download, redistribute, publicly perform, or resell curriculum video
        content. Completing a module reflects that you&rsquo;ve viewed its
        lessons; any belt rank, certification, or in-person qualification
        still requires the corresponding in-person training and instructor
        sign-off — it is not granted by video completion alone.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Intellectual Property
      </h2>
      <p>
        The New Dragons Rising name, the Mestizo Method name, and all site
        content — including text, curriculum videos, and design — belong to
        New Dragons Rising or its licensors and may not be used without
        permission.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">Site Use</h2>
      <p>
        You agree not to misuse this site — including attempting to access
        another user&rsquo;s account, interfering with the site&rsquo;s
        normal operation, or using it for any unlawful purpose.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Physical Training Is Separate From This Site
      </h2>
      <p>
        These Terms cover your use of the website. They do not replace, and
        are separate from, the{" "}
        <Link href="/legal/liability-waiver" className="underline hover:text-white">
          Liability Waiver &amp; Assumption of Risk
        </Link>{" "}
        agreement required before any in-person training, which every
        student (or a parent/guardian, for minors) must sign separately.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Disclaimer &amp; Limitation of Liability
      </h2>
      <p>
        This site and its content are provided &ldquo;as is&rdquo; without
        warranties of any kind. To the fullest extent permitted by law, New
        Dragons Rising is not liable for indirect, incidental, or
        consequential damages arising from your use of the site. Nothing in
        this section limits liability that cannot be limited under
        California law.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Governing Law
      </h2>
      <p>
        These Terms are governed by the laws of the State of California,
        without regard to its conflict-of-law principles.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Changes to These Terms
      </h2>
      <p>
        If we make material changes, we&rsquo;ll update the date at the top
        of this page.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">Contact Us</h2>
      <p>
        Questions about these Terms can be sent to{" "}
        <a href={`mailto:${siteConfig.contact.email}`} className="underline hover:text-white">
          {siteConfig.contact.email}
        </a>{" "}
        or {siteConfig.contact.phone}.
      </p>
    </LegalPage>
  );
}
