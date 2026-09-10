import { NextResponse } from "next/server";
import * as z from "zod";
import { sendEmail } from "@/lib/email";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderFields(fields: Record<string, string>): string {
  return Object.entries(fields)
    .filter(([, value]) => value)
    .map(
      ([key, value]) =>
        `<p><strong>${escapeHtml(key)}:</strong> ${escapeHtml(value).replace(/\n/g, "<br>")}</p>`,
    )
    .join("");
}

const ContactSchema = z.object({
  formType: z.literal("contact"),
  name: z.string().min(1),
  email: z.email(),
  message: z.string().min(1),
});

const BookingSchema = z.object({
  formType: z.literal("booking"),
  name: z.string().min(1),
  phone: z.string().optional(),
  bookingType: z.string(),
  notes: z.string().optional(),
});

const AffiliateSchema = z.object({
  formType: z.literal("affiliate"),
  schoolName: z.string().min(1),
  location: z.string().min(1),
  email: z.email(),
  disciplines: z.string().optional(),
  message: z.string().optional(),
});

const RequestSchema = z.discriminatedUnion("formType", [
  ContactSchema,
  BookingSchema,
  AffiliateSchema,
]);

const subjects = {
  contact: "New contact form submission",
  booking: "New booking request",
  affiliate: "New affiliate school application",
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const { formType, ...fields } = parsed.data;
  const replyTo = "email" in fields ? fields.email : undefined;

  const result = await sendEmail({
    subject: subjects[formType],
    html: renderFields(fields as Record<string, string>),
    replyTo,
  });

  if (!result.ok) {
    if (result.error === "not_configured") {
      return NextResponse.json(
        { error: "not_configured", message: "Email sending is not connected yet." },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
