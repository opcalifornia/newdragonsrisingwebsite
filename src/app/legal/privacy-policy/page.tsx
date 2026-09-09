import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" active="/legal/privacy-policy">
      <p>This policy needs to cover, at minimum:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>What information is collected (contact forms, newsletter signups, account/member data, payment data processed via Stripe)</li>
        <li>How information is used and whether it is shared with third parties</li>
        <li>Cookies and analytics (see the cookie consent banner site-wide)</li>
        <li>Data retention and how users can request deletion</li>
        <li>Contact information for privacy questions</li>
      </ul>
      <p>
        Placeholder only — do not publish without real, reviewed policy
        text.
      </p>
    </LegalPage>
  );
}
