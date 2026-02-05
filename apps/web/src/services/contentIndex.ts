// src/services/contentIndex.ts
// Service to load content indexes for blog, guides, podcasts, and case-studies

export type ContentIndexItem = {
  title: string;
  id?: string;
  slug?: string;
  type?: string;
  date?: string;
  description?: string;
  publishedAt?: string;
  concepts?: string[];
  tags?: string[];
  platforms?: string[];
  technologies?: string[];
  status?: string;
  links?: Record<string, string>;
  contentPath: string;
  excerpt?: string;
  [key: string]: any;
};


const INDEX_PATHS = {
  blog: '/data/blog-index.json',
  guides: '/data/guides-index.json',
  podcasts: '/data/podcasts-index.json',
  'case-studies': '/data/case-studies-index.json',
  labs: '/data/labs-index.json',
  demos: '/data/demos-index.json',
  systems: '/data/systems-index.json',
};

export type ContentIndexType = keyof typeof INDEX_PATHS;

export async function fetchContentIndex(type: ContentIndexType): Promise<ContentIndexItem[]> {
  const res = await fetch(INDEX_PATHS[type]);
  if (!res.ok) throw new Error(`Failed to load ${type} index`);
  return res.json();
}

export async function fetchContentMarkdown(contentPath: string): Promise<string> {
  const res = await fetch(`/content/${contentPath}`);
  if (!res.ok) throw new Error(`Failed to load content: ${contentPath}`);
  return res.text();
}
