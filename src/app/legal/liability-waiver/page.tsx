import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Liability Waiver" };

const waiverReviewNote = (
  <>
    <strong className="text-text-primary">
      Do not use this page to collect signatures as-is.
    </strong>{" "}
    This did not exist on the old site at all, and it is the single highest-
    stakes document on this entire site — Escrima, Arnis, and Kali training
    involves real weapons and live sparring, and a real physical injury
    lawsuit is the scenario this document exists to withstand. The text
    below is a solid, standard-form starting draft, but it{" "}
    <strong className="text-text-primary">must</strong> be reviewed and
    adapted by a California-licensed attorney before a single student signs
    it. This site also does not yet have a signature-capture workflow built
    (see <code className="text-text-primary">README.md</code>) — until both
    the legal review and a real e-signature (or wet-signature-on-file)
    process exist, continue collecting waivers the way you do today.
  </>
);

export default function LiabilityWaiverPage() {
  return (
    <LegalPage
      title="Liability Waiver / Assumption of Risk"
      active="/legal/liability-waiver"
      reviewNote={waiverReviewNote}
    >
      <p className="text-xs uppercase tracking-wider text-text-muted">
        Draft only — not yet attorney-reviewed or in signature-collection use
      </p>

      <p>
        In consideration of being permitted to participate in any Escrima,
        Arnis, Kali, or Mestizo Method training, classes, seminars, or
        related activities offered by {siteConfig.name} (&ldquo;NDR&rdquo;),
        I agree to the following on behalf of myself and, if applicable, my
        minor child or ward:
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        1. Assumption of Risk
      </h2>
      <p>
        I understand that Filipino martial arts training involves inherent
        risks, including but not limited to strikes, joint manipulation,
        sparring, and the use of training weapons (rattan sticks, padded
        weapons, and training blades), and that these activities can result
        in injury — including serious injury. I understand these risks exist
        even when instructors, equipment, and facilities meet a reasonable
        standard of care, and I voluntarily assume all such risks.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        2. Release of Liability
      </h2>
      <p>
        To the fullest extent permitted by California law, I release and
        agree not to sue {siteConfig.name}, its instructors, staff, and the
        owner(s) of its training facility, from any and all liability,
        claims, or causes of action arising out of my (or my child&rsquo;s)
        participation, except for liability arising from gross negligence or
        willful misconduct, which cannot be waived under California law.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        3. Medical Information &amp; Emergency Care
      </h2>
      <p>
        I confirm that I am (or my child is) physically fit to participate,
        with no medical condition that would make participation unsafe, and
        I will inform NDR of any condition that could affect my safety in
        training. I authorize NDR staff to arrange emergency medical
        treatment on my (or my child&rsquo;s) behalf if I cannot be reached,
        and I accept financial responsibility for that care.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        4. Photo &amp; Video Release (Optional)
      </h2>
      <p>
        I understand I may separately opt in or out of allowing NDR to use
        photos or video of me (or my child) taken during training for
        promotional purposes, and that declining has no effect on my ability
        to train.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        5. Acknowledgment
      </h2>
      <p>
        I confirm that I have read this waiver in full, understand it, and
        sign it voluntarily. If signing on behalf of a minor, I confirm I am
        that minor&rsquo;s parent or legal guardian and have authority to
        agree to these terms on their behalf.
      </p>

      <p className="pt-4 text-sm text-text-muted">
        Signature, printed name, date, and (if applicable) parent/guardian
        name and relationship to minor are required fields on the actual
        waiver form used at enrollment.
      </p>
    </LegalPage>
  );
}
