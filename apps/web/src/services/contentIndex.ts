// src/services/contentIndex.ts
// Service to load content indexes for blog, guides, podcasts, and case-studies

import type { ContentIndexItem, ContentIndexType } from "@apt/knowledge";

const INDEX_PATHS = {
  blog: '/data/blog-index.json',
  guides: '/data/guides-index.json',
  podcasts: '/data/podcasts-index.json',
  'case-studies': '/data/case-studies-index.json',
  labs: '/data/labs-index.json',
  demos: '/data/demos-index.json',
  systems: '/data/systems-index.json',
} satisfies Record<ContentIndexType, string>;

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

export type { ContentIndexItem, ContentIndexType };
