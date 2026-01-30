// src/services/contentIndex.ts
// Service to load content indexes for blog, guides, podcasts, and case-studies

export type ContentIndexItem = {
  title: string;
  id: string;
  type: string;
  description?: string;
  publishedAt?: string;
  concepts?: string[];
  contentPath: string;
  excerpt?: string;
  [key: string]: any;
};

const INDEX_PATHS = {
  blog: '/data/blog-index.json',
  guides: '/data/guides-index.json',
  podcasts: '/data/podcasts-index.json',
  'case-studies': '/data/case-studies-index.json',
};

export async function fetchContentIndex(type: keyof typeof INDEX_PATHS): Promise<ContentIndexItem[]> {
  const res = await fetch(INDEX_PATHS[type]);
  if (!res.ok) throw new Error(`Failed to load ${type} index`);
  return res.json();
}

export async function fetchContentMarkdown(contentPath: string): Promise<string> {
  const res = await fetch(`/content/${contentPath}`);
  if (!res.ok) throw new Error(`Failed to load content: ${contentPath}`);
  return res.text();
}
