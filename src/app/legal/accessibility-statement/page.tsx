import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Accessibility Statement" };

export default function AccessibilityStatementPage() {
  return (
    <LegalPage title="Accessibility Statement" active="/legal/accessibility-statement">
      <p>
        New Dragons Rising is committed to making this site usable by
        everyone. This build targets WCAG 2.2 AA, including:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Keyboard navigability with a visible focus state throughout</li>
        <li>Sufficient color contrast for text on both black and surface backgrounds</li>
        <li>Respecting prefers-reduced-motion for all animation and 3D effects</li>
        <li>Descriptive alt text on all real photography once supplied</li>
        <li>Semantic headings and landmarks</li>
      </ul>
      <p>
        This statement still needs a real, dated publish, a named contact
        for reporting accessibility issues, and a final accessibility
        audit pass before launch.
      </p>
    </LegalPage>
  );
}
