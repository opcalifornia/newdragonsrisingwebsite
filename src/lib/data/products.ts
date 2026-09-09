/**
 * Mock shop catalog. Nothing here is scraped from the old site (it had
 * no shop) — placeholder products shaped to match the categories called
 * for in the build brief, for the client to replace with real SKUs,
 * pricing, and photography.
 */

export type ProductCategory =
  | "Training Weapons"
  | "Apparel"
  | "Patches"
  | "Digital"
  | "Seminar Tickets";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  priceUsd: number;
  description: string;
  variants?: { label: string; options: string[] }[];
};

export const products: Product[] = [
  {
    slug: "rattan-training-stick",
    name: "Rattan Training Stick",
    category: "Training Weapons",
    priceUsd: 24,
    description:
      "Standard 28\" rattan stick for Escrima, Arnis, and Kali drilling.",
    variants: [{ label: "Length", options: ["26\"", "28\"", "30\""] }],
  },
  {
    slug: "padded-training-stick",
    name: "Padded Training Stick",
    category: "Training Weapons",
    priceUsd: 34,
    description: "Foam-padded stick for full-contact sparring drills.",
  },
  {
    slug: "training-blade",
    name: "Training Blade",
    category: "Training Weapons",
    priceUsd: 29,
    description: "Blunted rubber training blade for dagger work.",
  },
  {
    slug: "ndr-training-shirt",
    name: "New Dragons Rising Training Shirt",
    category: "Apparel",
    priceUsd: 28,
    description: "Moisture-wicking training shirt with the NDR crest.",
    variants: [{ label: "Size", options: ["S", "M", "L", "XL", "XXL"] }],
  },
  {
    slug: "ndr-patch",
    name: "New Dragons Rising Patch",
    category: "Patches",
    priceUsd: 10,
    description: "Embroidered crest patch for gi or bag.",
  },
  {
    slug: "mestizo-method-vol-1",
    name: "Mestizo Method Vol. 1 (Digital Download)",
    category: "Digital",
    priceUsd: 45,
    description: "Foundational curriculum video download.",
  },
];

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
