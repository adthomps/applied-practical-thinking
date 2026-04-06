// src/services/contentIndex.ts
// Runtime content/doc API client for public content indexes and details

import type {
  ContentDetailResponse,
  ContentIndexItem,
  ContentIndexType,
  PublicDesignDocDetailResponse,
  PublicDesignDocItem,
  PublicDesignDocVersionsResponse,
  PublicReviewBundleManifest,
} from "@apt/knowledge";
import { fetchWorkerJson } from "./api";
import type { PublicValidationReport } from "@/src/types/validationReport";

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

export async function fetchDesignDocVersion(
  slug: string,
  major: number
): Promise<PublicDesignDocDetailResponse> {
  return fetchWorkerJson<PublicDesignDocDetailResponse>(
    `/api/design/docs/${encodeURIComponent(slug)}/${encodeURIComponent(String(major))}`
  );
}

export async function fetchDesignDocVersions(slug: string): Promise<PublicDesignDocVersionsResponse> {
  return fetchWorkerJson<PublicDesignDocVersionsResponse>(
    `/api/design/docs/${encodeURIComponent(slug)}/versions`
  );
}

export async function fetchDesignReviewBundleManifest(): Promise<PublicReviewBundleManifest> {
  return fetchWorkerJson<PublicReviewBundleManifest>("/api/design/review-bundle");
}

export async function fetchPublicValidationReport(): Promise<PublicValidationReport> {
  const response = await fetch("/docs/design/validation/LATEST.json");
  if (!response.ok) {
    throw new Error(`Failed to load validation report: ${response.status}`);
  }
  return (await response.json()) as PublicValidationReport;
}

export type { ContentIndexItem, ContentIndexType };
