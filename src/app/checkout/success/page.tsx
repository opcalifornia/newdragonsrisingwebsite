import type { Metadata } from "next";
import Link from "next/link";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export const metadata: Metadata = { title: "Order Confirmed" };

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let amountUsd: number | null = null;
  let email: string | null = null;

  if (session_id && isStripeConfigured()) {
    try {
      const session = await getStripe()!.checkout.sessions.retrieve(session_id);
      amountUsd = session.amount_total ? session.amount_total / 100 : null;
      email = session.customer_details?.email ?? null;
    } catch {
      // Session lookup failed (bad/expired ID) — fall back to the generic message below.
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-28 text-center sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.2em] text-red-highlight">
        Order Confirmed
      </p>
      <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
        Thank You
      </h1>
      {amountUsd !== null ? (
        <p className="mt-6 text-lg text-text-body">
          Your payment of <span className="text-white">${amountUsd}</span>{" "}
          was successful
          {email ? (
            <>
              . A confirmation was sent to{" "}
              <span className="text-white">{email}</span>
            </>
          ) : (
            "."
          )}
        </p>
      ) : (
        <p className="mt-6 text-lg text-text-body">
          Your order has been received.
        </p>
      )}
      <Link
        href="/account"
        className="mt-8 inline-block rounded-sm bg-red-core px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-red-highlight"
      >
        Go to My Account
      </Link>
    </div>
  );
}
