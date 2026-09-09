import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/data/products";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { AddToCart } from "@/components/shop/add-to-cart";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return {};
  return { title: p.name, description: p.description };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
        <PortraitPlaceholder name={product.name} aspect="aspect-square" />

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-red-core">
            {product.category}
          </p>
          <h1 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 font-display text-2xl text-red-highlight">
            ${product.priceUsd}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-text-body">
            {product.description}
          </p>

          <div className="mt-10">
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
