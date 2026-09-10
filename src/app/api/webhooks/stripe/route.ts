import { NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { enroll } from "@/lib/auth/enrollment-db";
import { recordOrder } from "@/lib/auth/orders-db";
import type Stripe from "stripe";

/**
 * Fulfillment lives here, not in the client after redirect: a
 * checkout.session.completed event from Stripe is the only trustworthy
 * signal that money actually changed hands. Enrollment/order creation
 * on the client-side success page would let anyone visit that URL
 * directly and get free access.
 *
 * Requires STRIPE_WEBHOOK_SECRET (from the Stripe CLI or Dashboard
 * webhook config) in addition to STRIPE_SECRET_KEY. Not exercised
 * against a real Stripe account in this environment — verify signature
 * handling with `stripe listen --forward-to` before relying on it.
 */
export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "webhook_secret_missing" }, { status: 503 });
  }

  const stripe = getStripe()!;
  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature!, webhookSecret);
  } catch (err) {
    return NextResponse.json(
      { error: "invalid_signature", message: (err as Error).message },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata ?? {};

    if (metadata.type === "module" && metadata.moduleSlug && metadata.userId) {
      await enroll(metadata.userId, metadata.moduleSlug);
    } else if (metadata.type === "cart") {
      const items = metadata.items ? JSON.parse(metadata.items) : [];
      await recordOrder({
        userId: metadata.userId || null,
        stripeSessionId: session.id,
        items,
        totalUsd: (session.amount_total ?? 0) / 100,
      });
    }
  }

  return NextResponse.json({ received: true });
}
