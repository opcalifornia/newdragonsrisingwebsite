import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" active="/legal/terms-and-conditions">
      <p>This policy needs to cover, at minimum:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Rules governing site use and account creation</li>
        <li>Terms for purchasing shop items and training module enrollment</li>
        <li>Terms for membership subscriptions and cancellation</li>
        <li>Intellectual property (curriculum video content, the Mestizo Method name/mark)</li>
        <li>Limitation of liability and dispute resolution</li>
      </ul>
      <p>
        Placeholder only — do not publish without real, reviewed policy
        text.
      </p>
    </LegalPage>
  );
}
