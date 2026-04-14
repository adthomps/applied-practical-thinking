import { useQuery } from "@tanstack/react-query";
import {
  fetchContentIndex,
  type ContentIndexItem,
  type ContentIndexType,
} from "@/src/services/contentIndex";
import { queryKeys } from "@/hooks/queryKeys";

const FIVE_MINUTES_MS = 5 * 60 * 1000;

export function useContentIndexQuery(type: ContentIndexType) {
  return useQuery<ContentIndexItem[], Error>({
    queryKey: queryKeys.contentIndex(type),
    queryFn: () => fetchContentIndex(type),
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useContentIndexesQuery(types: ContentIndexType[]) {
  return useQuery<Record<ContentIndexType, ContentIndexItem[]>, Error>({
    queryKey: queryKeys.contentIndexes(types),
    queryFn: async () => {
      const pairs = await Promise.all(
        types.map(async (type) => [type, await fetchContentIndex(type)] as const)
      );
      return Object.fromEntries(pairs) as Record<ContentIndexType, ContentIndexItem[]>;
    },
    staleTime: FIVE_MINUTES_MS,
  });
}
