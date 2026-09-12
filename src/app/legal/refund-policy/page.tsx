import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy" active="/legal/refund-policy">
      <p className="text-xs uppercase tracking-wider text-text-muted">
        Last updated: [effective date to be added at launch]
      </p>

      <p>
        We want you to be genuinely happy with what you buy from New Dragons
        Rising. The terms below explain what to expect if something needs to
        be returned, canceled, or refunded — the specific windows are a
        starting policy, not something you need to accept as-is; adjust the
        numbers to match how you actually want to run things before launch.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Physical Goods (Shop)
      </h2>
      <p>
        Training sticks, padded weapons, apparel, and patches may be returned
        within 30 days of delivery for a full refund, provided the item is
        unused and in its original condition. Training blades may be
        returned under the same terms, provided the blade shows no signs of
        use. To start a return, contact us at{" "}
        <a href={`mailto:${siteConfig.contact.email}`} className="underline hover:text-white">
          {siteConfig.contact.email}
        </a>{" "}
        with your order number. Buyers are responsible for return shipping
        unless the item arrived defective or incorrect, in which case we
        cover it.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Training Module Enrollment
      </h2>
      <p>
        If you haven&rsquo;t started any lessons in a module, you may request
        a full refund within 7 days of enrolling. Once you&rsquo;ve begun a
        module&rsquo;s lessons, enrollment is non-refundable, since you&rsquo;ve
        already accessed the curriculum content.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Seminars &amp; Events
      </h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          Cancel your registration at least 7 days before the event for a
          full refund.
        </li>
        <li>
          Cancellations within 7 days of the event are non-refundable, but we
          will transfer your registration to a future date of the same
          seminar where one exists.
        </li>
        <li>
          If New Dragons Rising cancels or reschedules an event, you&rsquo;ll
          receive a full refund or the option to transfer to the new date —
          your choice.
        </li>
      </ul>

      <h2 className="pt-2 font-display text-xl text-white">
        How to Request a Refund
      </h2>
      <p>
        Email{" "}
        <a href={`mailto:${siteConfig.contact.email}`} className="underline hover:text-white">
          {siteConfig.contact.email}
        </a>{" "}
        or call {siteConfig.contact.phone} with your order or registration
        details. Approved refunds are issued to your original payment method
        within 5–10 business days.
      </p>
    </LegalPage>
  );
}
