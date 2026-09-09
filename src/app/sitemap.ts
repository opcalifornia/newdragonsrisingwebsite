import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllInstructors } from "@/lib/content/instructors";
import { getAllModules } from "@/lib/data/modules";
import { getAllProducts } from "@/lib/data/products";
import { getAllEvents } from "@/lib/data/events";
import { getAllBlogPosts } from "@/lib/data/blog-posts";
import { legalNav } from "@/lib/site-config";

const staticRoutes = [
  "",
  "/about",
  "/about/mestizo-method",
  "/about/lineage",
  "/about/in-memoriam",
  "/instructors",
  "/modules",
  "/shop",
  "/join",
  "/seminars",
  "/testimonials",
  "/blog",
  "/book-online",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
  }));

  for (const i of getAllInstructors()) {
    entries.push({ url: `${base}/instructors/${i.slug}`, lastModified: now });
  }
  for (const m of getAllModules()) {
    entries.push({ url: `${base}/modules/${m.slug}`, lastModified: now });
  }
  for (const p of getAllProducts()) {
    entries.push({ url: `${base}/shop/${p.slug}`, lastModified: now });
  }
  for (const e of getAllEvents()) {
    entries.push({ url: `${base}/seminars/${e.slug}`, lastModified: now });
  }
  for (const b of getAllBlogPosts()) {
    entries.push({ url: `${base}/blog/${b.slug}`, lastModified: now });
  }
  for (const l of legalNav) {
    entries.push({ url: `${base}${l.href}`, lastModified: now });
  }

  return entries;
}
