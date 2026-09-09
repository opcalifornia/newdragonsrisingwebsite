import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Liability Waiver" };

export default function LiabilityWaiverPage() {
  return (
    <LegalPage title="Liability Waiver / Assumption of Risk" active="/legal/liability-waiver">
      <p className="text-red-highlight">
        This page did not exist on the old site at all. For a martial
        arts school, a liability waiver and assumption-of-risk agreement
        is essential — a lawyer must draft and review this before
        launch, and every student should sign a copy (digitally, on
        enrollment) in addition to whatever is posted here.
      </p>
      <p>A real waiver needs to cover, at minimum:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>The inherent risks of contact martial arts training (Escrima, Arnis, Kali involve weapons and sparring)</li>
        <li>Assumption of risk by the student (or guardian, for minors)</li>
        <li>Release of liability for New Dragons Rising, its instructors, and the facility</li>
        <li>Medical/insurance disclosures</li>
        <li>Signature capture and record-keeping requirements</li>
      </ul>
    </LegalPage>
  );
}
