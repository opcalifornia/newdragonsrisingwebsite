import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Accessibility Statement" };

export default function AccessibilityStatementPage() {
  return (
    <LegalPage title="Accessibility Statement" active="/legal/accessibility-statement">
      <p className="text-xs uppercase tracking-wider text-text-muted">
        Last updated: [effective date to be added at launch]
      </p>

      <p>
        {siteConfig.name} is committed to making {siteConfig.url} usable by
        everyone, including people using assistive technology such as screen
        readers, keyboard-only navigation, or voice control.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Conformance Target
      </h2>
      <p>
        This site is built to meet the{" "}
        <a
          href="https://www.w3.org/TR/WCAG22/"
          className="underline hover:text-white"
          target="_blank"
          rel="noreferrer"
        >
          Web Content Accessibility Guidelines (WCAG) 2.2
        </a>{" "}
        at Level AA.
      </p>

      <h2 className="pt-2 font-display text-xl text-white">
        Measures We&rsquo;ve Taken
      </h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Full keyboard navigability with a visible focus state throughout</li>
        <li>Text contrast checked against both black and surface backgrounds, meeting AA thresholds</li>
        <li>All animation and 3D effects respect your device&rsquo;s reduced-motion setting</li>
        <li>Semantic headings, landmarks, and labeled form fields throughout</li>
        <li>Accessible names on icon-only controls (cart, menu, account, social links)</li>
      </ul>

      <h2 className="pt-2 font-display text-xl text-white">
        Known Limitations
      </h2>
      <p>
        We&rsquo;re not aware of every limitation until real content and
        real users test it. Two known gaps as of this writing:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          Real photography is still being added; descriptive alt text will
          be written for each image as it&rsquo;s supplied.
        </li>
        <li>
          Video captions for training module lessons will be added once
          video hosting is connected.
        </li>
      </ul>

      <h2 className="pt-2 font-display text-xl text-white">Feedback</h2>
      <p>
        If you encounter an accessibility barrier on this site, please tell
        us — we want to fix it. Contact{" "}
        <a href={`mailto:${siteConfig.contact.email}`} className="underline hover:text-white">
          {siteConfig.contact.email}
        </a>{" "}
        or {siteConfig.contact.phone} with the page and a description of the
        issue, and we&rsquo;ll respond and work to address it.
      </p>
    </LegalPage>
  );
}
