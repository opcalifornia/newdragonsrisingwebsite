"use client";

import { useCart } from "@/lib/cart-context";

/**
 * Checkout is not yet wired to a live payment processor — no Stripe
 * keys exist in this environment, and fabricating a working payment
 * flow without real credentials would be actively unsafe. This renders
 * the real order summary from the cart and a disabled submit state so
 * the UI/flow is complete; wiring it to Stripe Checkout or Payment
 * Element is a matter of adding STRIPE_SECRET_KEY /
 * NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY and a /api/checkout route — see
 * README.
 */
export default function CheckoutPage() {
  const { items, subtotalUsd } = useCart();

  return (
    <div className="mx-auto max-w-xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl text-white sm:text-4xl">
        Checkout
      </h1>

      <div className="mt-8 rounded-sm border border-surface-border bg-surface p-6">
        {items.map((item) => (
          <div
            key={`${item.slug}-${item.variant ?? ""}`}
            className="flex justify-between py-2 text-sm text-text-body"
          >
            <span>
              {item.name}
              {item.variant ? ` (${item.variant})` : ""} × {item.quantity}
            </span>
            <span>${item.priceUsd * item.quantity}</span>
          </div>
        ))}
        <div className="mt-3 flex justify-between border-t border-surface-border pt-3 font-medium text-white">
          <span>Total</span>
          <span>${subtotalUsd}</span>
        </div>
      </div>

      <div className="mt-8 rounded-sm border border-dashed border-red-core/50 bg-red-core/5 p-5 text-sm text-text-body">
        Payment processing is not connected yet. This build ships the
        cart and checkout UI end-to-end; the client needs to supply
        Stripe API keys before this can accept a real payment.
      </div>

      <button
        type="button"
        disabled
        className="mt-8 w-full cursor-not-allowed rounded-sm bg-surface-border px-6 py-3 text-sm font-medium text-text-muted"
      >
        Pay ${subtotalUsd} (Stripe not connected)
      </button>
    </div>
  );
}
