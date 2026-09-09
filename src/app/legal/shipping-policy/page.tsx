import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Shipping Policy" };

export default function ShippingPolicyPage() {
  return (
    <LegalPage title="Shipping Policy" active="/legal/shipping-policy">
      <p className="text-red-highlight">
        This page did not exist on the old site — new, added for the
        shop&rsquo;s physical goods (training weapons, apparel, patches).
      </p>
      <p>A real shipping policy needs to cover, at minimum:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Domestic (and international, if offered) shipping regions and carriers</li>
        <li>Processing and delivery timeframes</li>
        <li>Shipping costs / thresholds for free shipping</li>
        <li>Special handling for training weapons where applicable (e.g. age restrictions, address requirements)</li>
        <li>Lost/damaged package handling</li>
      </ul>
    </LegalPage>
  );
}
