import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  authorRole: string;
  category: string;
  readTime: string;
  excerpt: string;
  image: string;
  contentHtml?: string;
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const processed = await remark().use(html).process(content);
    const contentHtml = processed.toString();

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      authorRole: data.authorRole,
      category: data.category,
      readTime: data.readTime,
      excerpt: data.excerpt,
      image: data.image,
      contentHtml,
    };
  } catch {
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        author: data.author,
        authorRole: data.authorRole,
        category: data.category,
        readTime: data.readTime,
        excerpt: data.excerpt,
        image: data.image,
      };
    });

  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}