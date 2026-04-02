// src/services/contentIndex.ts
// Runtime content/doc API client for public content indexes and details

import type {
  ContentDetailResponse,
  ContentIndexItem,
  ContentIndexType,
  PublicDesignDocDetailResponse,
  PublicDesignDocItem,
} from "@apt/knowledge";

export async function fetchContentIndex(type: ContentIndexType): Promise<ContentIndexItem[]> {
  const res = await fetch(`/api/content/${type}`);
  if (!res.ok) throw new Error(`Failed to load ${type} index`);
  return res.json();
}

export async function fetchContentEntry(
  type: ContentIndexType,
  idOrSlug: string
): Promise<ContentDetailResponse> {
  const res = await fetch(`/api/content/${type}/${encodeURIComponent(idOrSlug)}`);
  if (!res.ok) throw new Error(`Failed to load ${type} entry`);
  return res.json();
}

export async function fetchDesignDocs(): Promise<PublicDesignDocItem[]> {
  const res = await fetch("/api/design/docs");
  if (!res.ok) throw new Error("Failed to load design docs");
  return res.json();
}

export async function fetchDesignDoc(slug: string): Promise<PublicDesignDocDetailResponse> {
  const res = await fetch(`/api/design/docs/${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error(`Failed to load design doc: ${slug}`);
  return res.json();
}

export type { ContentIndexItem, ContentIndexType };
