import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy" active="/legal/refund-policy">
      <p>This policy needs to cover, at minimum:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Refunds/exchanges for physical goods (training weapons, apparel, patches)</li>
        <li>Refund eligibility for digital downloads (typically non-refundable once accessed)</li>
        <li>Refund/cancellation terms for training module enrollment</li>
        <li>Refund/cancellation terms for seminar tickets</li>
        <li>How to request a refund and expected timeline</li>
      </ul>
      <p>
        Placeholder only — do not publish without real, reviewed policy
        text.
      </p>
    </LegalPage>
  );
}
