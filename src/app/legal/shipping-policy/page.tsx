import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Shipping Policy" };

export default function ShippingPolicyPage() {
  return (
    <LegalPage title="Shipping Policy" active="/legal/shipping-policy">
      <p className="text-xs uppercase tracking-wider text-text-muted">
        Last updated: [effective date to be added at launch]
      </p>

      <p>
        This page covers shipping for physical shop items — training sticks,
        padded weapons, blades, apparel, and patches. Training module and
        seminar purchases are digital/in-person and are not shipped.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Where We Ship
      </h2>
      <p>
        We currently ship within the United States only. If you&rsquo;re
        outside the US and want to order, contact us at{" "}
        <a href={`mailto:${siteConfig.contact.email}`} className="underline hover:text-white">
          {siteConfig.contact.email}
        </a>{" "}
        before ordering to confirm we can accommodate it.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Processing &amp; Delivery
      </h2>
      <p>
        Orders are processed within 1–3 business days. Once shipped, standard
        delivery typically takes 3–7 business days depending on your
        location. You&rsquo;ll receive a shipping confirmation once your
        order is on its way.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Shipping Costs
      </h2>
      <p>
        Shipping cost is calculated at checkout based on your order
        weight and destination.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Training Weapons
      </h2>
      <p>
        Rattan sticks, padded trainers, and practice blades sold in our shop
        are training equipment, not sharpened weapons, and ship the same way
        as any other package. A valid adult signature (18+) may be required
        on delivery for blade-style trainers depending on carrier and
        destination requirements.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Lost or Damaged Packages
      </h2>
      <p>
        If your order arrives damaged or never arrives, contact us at{" "}
        <a href={`mailto:${siteConfig.contact.email}`} className="underline hover:text-white">
          {siteConfig.contact.email}
        </a>{" "}
        within 14 days of the expected delivery date and we&rsquo;ll arrange
        a replacement or refund.
      </p>
    </LegalPage>
  );
}
