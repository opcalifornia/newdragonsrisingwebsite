import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const INSTRUCTORS_DIR = path.join(process.cwd(), "content", "instructors");

export type Instructor = {
  name: string;
  slug: string;
  title: string;
  rank: string | null;
  disciplines: string[];
  yearsTraining?: string;
  signatureDetail: string;
  order: number;
  image: string;
  content: string;
};

export function getAllInstructors(): Instructor[] {
  const files = fs
    .readdirSync(INSTRUCTORS_DIR)
    .filter((f) => f.endsWith(".mdx"));

  const instructors = files.map((file) => {
    const raw = fs.readFileSync(path.join(INSTRUCTORS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return { ...(data as Omit<Instructor, "content">), content };
  });

  return instructors.sort((a, b) => a.order - b.order);
}

export function getInstructorBySlug(slug: string): Instructor | undefined {
  return getAllInstructors().find((i) => i.slug === slug);
}
