"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const variantGroup = product.variants?.[0];
  const [variant, setVariant] = useState(variantGroup?.options[0]);
  const [added, setAdded] = useState(false);

  return (
    <div>
      {variantGroup && (
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-text-muted">
            {variantGroup.label}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {variantGroup.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setVariant(opt)}
                className={cn(
                  "rounded-sm border px-3 py-1.5 text-sm transition-colors",
                  variant === opt
                    ? "border-red-core bg-red-core text-white"
                    : "border-surface-border text-text-muted hover:border-white/40 hover:text-white",
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          addItem({
            slug: product.slug,
            name: product.name,
            priceUsd: product.priceUsd,
            variant,
          });
          setAdded(true);
          setTimeout(() => setAdded(false), 1800);
        }}
        className="w-full rounded-sm bg-red-core px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-highlight"
      >
        {added ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}
