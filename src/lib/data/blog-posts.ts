/**
 * Real post metadata scraped from the old site's /blog index
 * (content/source/blog-index.md) — author, date, and excerpt are real.
 * The full article body was never provided (each post page cuts off
 * with "..." and full text was not pasted into this build), so `body`
 * is intentionally left undefined rather than inventing article text —
 * per the build brief, content isn't to be fabricated. Fill in `body`
 * with the real article text once available.
 */

export type BlogPost = {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  body?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "discovering-the-legacy-of-grand-master-rudy-torres",
    title: "Discovering the Legacy of Grand Master Rudy Torres",
    author: "David Aviles",
    date: "2025-02-12",
    excerpt:
      "In the realm of Filipino martial arts, there are legends whose legacy continues to inspire and shape the landscape of self-defense and...",
  },
  {
    slug: "mastering-escrima-techniques-a-step-by-step-guide",
    title: "Mastering Escrima Techniques: A Step-by-Step Guide",
    author: "David Aviles",
    date: "2025-02-12",
    excerpt:
      "In the world of Filipino martial arts, there is a rich tradition of techniques that have been passed down through generations, each move...",
  },
  {
    slug: "unlocking-the-secrets-of-filipino-martial-arts-masters",
    title: "Unlocking the Secrets of Filipino Martial Arts Masters",
    author: "David Aviles",
    date: "2025-02-12",
    excerpt:
      "In the world of Filipino martial arts, there lies a rich tapestry of culture, history, and lineage that dates back generations. At New...",
  },
];

export function getAllBlogPosts() {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
