import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/data/blog-posts";
import { Reveal } from "@/components/motion/reveal";
import { CardTilt } from "@/components/motion/card-tilt";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";

export const metadata: Metadata = {
  title: "Blog",
  description: "News and articles from New Dragons Rising.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <h1 className="font-display text-4xl text-white sm:text-5xl">
          Blog
        </h1>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.06}>
            <Link href={`/blog/${post.slug}`}>
              <CardTilt>
                <PortraitPlaceholder name={post.title} aspect="aspect-[16/10]" />
                <div className="p-5">
                  <p className="text-xs text-text-muted">
                    {post.author} · {formatDate(post.date)}
                  </p>
                  <h2 className="mt-2 font-display text-lg text-white">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-text-muted">
                    {post.excerpt}
                  </p>
                </div>
              </CardTilt>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
