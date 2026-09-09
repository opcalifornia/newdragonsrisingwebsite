import Link from "next/link";
import { CardTilt } from "@/components/motion/card-tilt";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import type { Product } from "@/lib/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="block h-full">
      <CardTilt className="h-full">
        <PortraitPlaceholder name={product.name} aspect="aspect-square" />
        <div className="p-5">
          <p className="text-xs text-text-muted">{product.category}</p>
          <h3 className="mt-2 font-display text-lg text-white">
            {product.name}
          </h3>
          <p className="mt-3 font-display text-xl text-red-highlight">
            ${product.priceUsd}
          </p>
        </div>
      </CardTilt>
    </Link>
  );
}
