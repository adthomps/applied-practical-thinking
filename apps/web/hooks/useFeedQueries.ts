import { useQuery } from "@tanstack/react-query";
import {
  fetchFeed,
  fetchFeedEntry,
  type PublicFeedDetailResponse,
  type PublicFeedItem,
  type PublicFeedType,
} from "@/src/services/feed";
import { queryKeys } from "@/hooks/queryKeys";

const FIVE_MINUTES_MS = 5 * 60 * 1000;

export function useFeedQuery(feed: PublicFeedType) {
  return useQuery<PublicFeedItem[], Error>({
    queryKey: queryKeys.feed(feed),
    queryFn: () => fetchFeed(feed),
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useLabsFeedQuery() {
  return useFeedQuery("labs");
}

export function useProofFeedQuery() {
  return useFeedQuery("proof");
}

export function useInsightsFeedQuery() {
  return useFeedQuery("insights");
}

export function useFeedDetailQuery(feed: PublicFeedType, idOrSlug: string | undefined) {
  return useQuery<PublicFeedDetailResponse, Error>({
    queryKey: queryKeys.feedDetail(feed, idOrSlug || ""),
    queryFn: () => fetchFeedEntry(feed, idOrSlug || ""),
    enabled: Boolean(idOrSlug),
    staleTime: FIVE_MINUTES_MS,
  });
}
