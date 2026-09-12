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
        All sales are final. New Dragons Rising does not offer refunds on
        shop purchases, training module enrollment, seminar registration, or
        any other purchase made through this site, except where noted below.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Physical Goods (Shop)
      </h2>
      <p>
        Training sticks, padded weapons, training blades, apparel, and
        patches are sold as final sale. We do not accept returns or offer
        refunds or exchanges for a change of mind.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Training Module Enrollment
      </h2>
      <p>
        Module enrollment is non-refundable once purchased, regardless of
        whether you&rsquo;ve started the module&rsquo;s lessons.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Seminars &amp; Events
      </h2>
      <p>
        Seminar and event registration fees are non-refundable, including if
        you cancel or don&rsquo;t attend. If New Dragons Rising cancels or
        reschedules an event, you&rsquo;ll receive a full refund or the
        option to transfer to the new date — your choice.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Defective or Incorrect Items
      </h2>
      <p>
        The one exception to &ldquo;all sales are final&rdquo;: if a physical
        item arrives damaged, defective, or different from what you ordered,
        contact us at{" "}
        <a href={`mailto:${siteConfig.contact.email}`} className="underline hover:text-white">
          {siteConfig.contact.email}
        </a>{" "}
        within 14 days of delivery and we&rsquo;ll replace it or refund that
        item — at our option — at no cost to you.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">Questions</h2>
      <p>
        Email{" "}
        <a href={`mailto:${siteConfig.contact.email}`} className="underline hover:text-white">
          {siteConfig.contact.email}
        </a>{" "}
        or call {siteConfig.contact.phone}.
      </p>
    </LegalPage>
  );
}
