import "server-only";
import Stripe from "stripe";

let cached: Stripe | null = null;

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/**
 * Returns null instead of throwing when STRIPE_SECRET_KEY isn't set, so
 * callers can degrade to the "payment not connected" UI instead of a
 * 500. No Stripe account exists in this environment, so this path has
 * only been exercised with the key absent — verify the configured path
 * against a real (test-mode) Stripe account before launch.
 */
export function getStripe(): Stripe | null {
  if (!isStripeConfigured()) return null;
  if (!cached) {
    cached = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return cached;
}
