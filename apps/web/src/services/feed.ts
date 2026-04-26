import type { PublicFeedDetailResponse, PublicFeedItem, PublicFeedType } from "@apt/knowledge";
import { fetchWorkerJson } from "./api";

export async function fetchFeed(feed: PublicFeedType): Promise<PublicFeedItem[]> {
  return fetchWorkerJson<PublicFeedItem[]>(`/api/feed/${feed}`);
}

export async function fetchFeedEntry(
  feed: PublicFeedType,
  idOrSlug: string
): Promise<PublicFeedDetailResponse> {
  return fetchWorkerJson<PublicFeedDetailResponse>(
    `/api/feed/${feed}/${encodeURIComponent(idOrSlug)}`
  );
}

export type { PublicFeedItem, PublicFeedType, PublicFeedDetailResponse };
