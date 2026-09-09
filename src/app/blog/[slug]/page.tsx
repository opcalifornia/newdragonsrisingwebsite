import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/data/blog-posts";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
      <PortraitPlaceholder name={post.title} aspect="aspect-[16/9]" className="w-full" />

      <p className="mt-8 text-sm text-text-muted">
        {post.author} · {formatDate(post.date)}
      </p>
      <h1 className="mt-3 font-display text-3xl text-white sm:text-4xl">
        {post.title}
      </h1>

      {post.body ? (
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-text-body">
          {post.body}
        </div>
      ) : (
        <>
          <p className="mt-8 text-lg leading-relaxed text-text-body">
            {post.excerpt}
          </p>
          <div className="mt-10 rounded-sm border border-dashed border-surface-border p-5 text-sm text-text-muted">
            This migrated post currently carries only the excerpt captured
            from the old site&rsquo;s blog index — the full article text
            was not available to this build. Add the complete article to{" "}
            <code className="text-text-primary">
              src/lib/data/blog-posts.ts
            </code>{" "}
            once it&rsquo;s pulled from the live post.
          </div>
        </>
      )}
    </div>
  );
}
