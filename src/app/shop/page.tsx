import type { Metadata } from "next";
import { getAllProducts } from "@/lib/data/products";
import { ShopCatalog } from "./shop-catalog";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Training weapons, apparel, patches, and digital downloads from New Dragons Rising.",
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.2em] text-red-highlight">
          The Shop
        </p>
        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          Gear Up
        </h1>
      </Reveal>
      <div className="mt-14">
        <ShopCatalog products={products} />
      </div>
    </div>
  );
}
