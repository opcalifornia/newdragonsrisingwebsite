"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/shop/product-card";
import { Reveal } from "@/components/motion/reveal";
import type { Product, ProductCategory } from "@/lib/data/products";
import { cn } from "@/lib/utils";

const categories: (ProductCategory | "All")[] = [
  "All",
  "Training Weapons",
  "Apparel",
  "Patches",
  "Digital",
  "Seminar Tickets",
];

export function ShopCatalog({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () =>
      category === "All"
        ? products
        : products.filter((p) => p.category === category),
    [products, category],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-surface-border pb-8">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              category === c
                ? "border-red-core bg-red-core text-white"
                : "border-surface-border text-text-muted hover:border-white/40 hover:text-white",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {filtered.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.04}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
