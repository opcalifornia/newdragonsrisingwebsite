"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

/**
 * Always attempts a real checkout request rather than pre-declaring
 * "Stripe isn't connected" — the client has no safe way to know that
 * without exposing a secret, so it asks the server and reacts to what
 * comes back. With STRIPE_SECRET_KEY set, this redirects to a real
 * Stripe Checkout Session; without it, /api/checkout returns 503 and
 * this shows that inline.
 */
export default function CheckoutPage() {
  const { items, subtotalUsd } = useCart();
  const [status, setStatus] = useState<"idle" | "loading" | "not_configured" | "error">("idle");

  async function handlePay() {
    setStatus("loading");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "cart",
          items: items.map((i) => ({ slug: i.slug, variant: i.variant, quantity: i.quantity })),
        }),
      });

      if (res.status === 503) {
        setStatus("not_configured");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        return;
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setStatus("error");
    }
  }

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

      {status === "not_configured" && (
        <div className="mt-8 rounded-sm border border-dashed border-red-core/50 bg-red-core/5 p-5 text-sm text-text-body">
          Payment processing is not connected yet — add{" "}
          <code className="text-text-primary">STRIPE_SECRET_KEY</code> to
          enable real checkout. See README.
        </div>
      )}
      {status === "error" && (
        <div className="mt-8 rounded-sm border border-dashed border-red-core/50 bg-red-core/5 p-5 text-sm text-text-body">
          Something went wrong starting checkout. Please try again.
        </div>
      )}

      <button
        type="button"
        onClick={handlePay}
        disabled={status === "loading" || items.length === 0}
        className="mt-8 w-full rounded-sm bg-red-core px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-highlight disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Redirecting to payment…" : `Pay $${subtotalUsd}`}
      </button>
    </div>
  );
}
