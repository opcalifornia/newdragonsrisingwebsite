"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeItem, setQuantity, subtotalUsd } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl text-white">Your Cart</h1>
        <p className="mt-4 text-text-muted">Your cart is empty.</p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-sm bg-red-core px-8 py-3 text-sm font-medium text-white hover:bg-red-highlight"
        >
          Browse the Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl text-white sm:text-4xl">
        Your Cart
      </h1>

      <div className="mt-10 divide-y divide-surface-border border-y border-surface-border">
        {items.map((item) => (
          <div
            key={`${item.slug}-${item.variant ?? ""}`}
            className="flex items-center justify-between gap-4 py-5"
          >
            <div>
              <p className="text-white">{item.name}</p>
              {item.variant && (
                <p className="text-sm text-text-muted">{item.variant}</p>
              )}
              <button
                type="button"
                onClick={() => removeItem(item.slug, item.variant)}
                className="mt-1 text-xs text-text-muted underline hover:text-red-highlight"
              >
                Remove
              </button>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  setQuantity(
                    item.slug,
                    item.variant,
                    Math.max(1, Number(e.target.value) || 1),
                  )
                }
                className="w-16 rounded-sm border border-surface-border bg-surface px-2 py-1 text-center text-sm text-white"
                aria-label={`Quantity for ${item.name}`}
              />
              <p className="w-16 text-right text-white">
                ${item.priceUsd * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-text-muted">Subtotal</p>
        <p className="font-display text-2xl text-white">${subtotalUsd}</p>
      </div>

      <Link
        href="/checkout"
        className="mt-8 block w-full rounded-sm bg-red-core px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-red-highlight"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
