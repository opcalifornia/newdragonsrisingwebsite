import "server-only";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/**
 * No email provider account exists in this environment, so this has
 * only been exercised with the key absent — verify a real send against
 * a Resend (or swap-in provider) test account before launch. Resend
 * requires sending "from" a domain you've verified with them; until
 * that's set up, RESEND_FROM_EMAIL falls back to Resend's own shared
 * onboarding address, which works but shows as unbranded to recipients.
 */
export async function sendEmail(input: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isEmailConfigured()) {
    return { ok: false, error: "not_configured" };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  const { error } = await resend.emails.send({
    from: `New Dragons Rising <${from}>`,
    to: siteConfig.contact.email,
    subject: input.subject,
    html: input.html,
    replyTo: input.replyTo,
  });

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
