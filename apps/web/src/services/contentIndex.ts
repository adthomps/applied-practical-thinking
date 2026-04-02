// src/services/contentIndex.ts
// Runtime content/doc API client for public content indexes and details

import type {
  ContentDetailResponse,
  ContentIndexItem,
  ContentIndexType,
  PublicDesignDocDetailResponse,
  PublicDesignDocItem,
} from "@apt/knowledge";
import { fetchWorkerJson } from "./api";

export async function fetchContentIndex(type: ContentIndexType): Promise<ContentIndexItem[]> {
  return fetchWorkerJson<ContentIndexItem[]>(`/api/content/${type}`);
}

export async function fetchContentEntry(
  type: ContentIndexType,
  idOrSlug: string
): Promise<ContentDetailResponse> {
  return fetchWorkerJson<ContentDetailResponse>(
    `/api/content/${type}/${encodeURIComponent(idOrSlug)}`
  );
}

export async function fetchDesignDocs(): Promise<PublicDesignDocItem[]> {
  return fetchWorkerJson<PublicDesignDocItem[]>("/api/design/docs");
}

export async function fetchDesignDoc(slug: string): Promise<PublicDesignDocDetailResponse> {
  return fetchWorkerJson<PublicDesignDocDetailResponse>(
    `/api/design/docs/${encodeURIComponent(slug)}`
  );
}

export type { ContentIndexItem, ContentIndexType };
