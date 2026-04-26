import { useQuery } from "@tanstack/react-query";
import type { ContentIndexItem } from "@/src/services/contentIndex";
import { fetchFeed } from "@/src/services/feed";
import { toContentIndexItemFromFeed } from "@/src/services/feedAdapters";
import { queryKeys } from "@/hooks/queryKeys";

const FIVE_MINUTES_MS = 5 * 60 * 1000;

function sortByPublishedAt(items: ContentIndexItem[]) {
  return [...items].sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
}

function toSortedContentItemsFromFeed(feedItems: Awaited<ReturnType<typeof fetchFeed>>) {
  return sortByPublishedAt(feedItems.map(toContentIndexItemFromFeed));
}

function getFeatureDate(item: ContentIndexItem) {
  return new Date(item.date || item.publishedAt || 0).getTime();
}

type HomepageFeatureLane = "experiments" | "learn" | "systems";

function getHomepageFeatureLane(item: ContentIndexItem): HomepageFeatureLane {
  if (item.indexType === "labs" || item.indexType === "demos") return "experiments";
  if (item.indexType === "systems") return "systems";
  return "learn";
}

export function selectHomepageFeatured(items: ContentIndexItem[]) {
  const featured = [...items]
    .filter((item) => item.featured === true)
    .sort((a, b) => getFeatureDate(b) - getFeatureDate(a));
  const selected: ContentIndexItem[] = [];
  const selectedIds = new Set<string>();

  const addItem = (item: ContentIndexItem) => {
    const key = item.id || item.slug || item.contentPath;
    if (selectedIds.has(key) || selected.length >= 6) return;
    selectedIds.add(key);
    selected.push(item);
  };

  const laneCaps: Record<HomepageFeatureLane, number> = {
    experiments: 2,
    learn: 3,
    systems: 1,
  };

  (Object.keys(laneCaps) as HomepageFeatureLane[]).forEach((lane) => {
    featured
      .filter((item) => getHomepageFeatureLane(item) === lane)
      .slice(0, laneCaps[lane])
      .forEach(addItem);
  });

  featured.forEach(addItem);
  return selected;
}

export function useHomeFeaturedContentQuery() {
  return useQuery<ContentIndexItem[], Error>({
    queryKey: queryKeys.homeFeaturedContent(),
    queryFn: async () => {
      const [labsFeed, proofFeed, insightsFeed] = await Promise.all([
        fetchFeed("labs"),
        fetchFeed("proof"),
        fetchFeed("insights"),
      ]);
      const items = [
        ...labsFeed.map(toContentIndexItemFromFeed),
        ...proofFeed.map(toContentIndexItemFromFeed),
        ...insightsFeed.map(toContentIndexItemFromFeed),
      ];
      return selectHomepageFeatured(items);
    },
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useInsightsIndexQuery() {
  /** @deprecated Use useInsightsFeedQuery from useFeedQueries.ts */
  return useQuery<ContentIndexItem[], Error>({
    queryKey: queryKeys.insightsIndex(),
    queryFn: async () => toSortedContentItemsFromFeed(await fetchFeed("insights")),
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useBlogsIndexQuery() {
  /** @deprecated Use useInsightsFeedQuery and filter by kind=blog */
  return useQuery<ContentIndexItem[], Error>({
    queryKey: queryKeys.blogsIndex(),
    queryFn: async () =>
      toSortedContentItemsFromFeed((await fetchFeed("insights")).filter((item) => item.kind === "blog")),
    staleTime: FIVE_MINUTES_MS,
  });
}

export function usePodcastsIndexQuery() {
  /** @deprecated Use useInsightsFeedQuery and filter by kind=podcast */
  return useQuery<ContentIndexItem[], Error>({
    queryKey: queryKeys.podcastsIndex(),
    queryFn: async () =>
      toSortedContentItemsFromFeed((await fetchFeed("insights")).filter((item) => item.kind === "podcast")),
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useGuidesAndReviewsIndexQuery() {
  /** @deprecated Use useInsightsFeedQuery and filter by kind=guide/case-study */
  return useQuery<ContentIndexItem[], Error>({
    queryKey: queryKeys.guidesAndReviewsIndex(),
    queryFn: async () =>
      toSortedContentItemsFromFeed(
        (await fetchFeed("insights")).filter((item) => item.kind === "guide" || item.kind === "case-study")
      ),
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useExperimentsLabsIndexQuery() {
  return useQuery<ContentIndexItem[], Error>({
    queryKey: queryKeys.experimentsLabsIndex(),
    queryFn: async () =>
      toSortedContentItemsFromFeed((await fetchFeed("labs")).filter((item) => item.kind !== "live-demo")),
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useLabsAndDemosIndexQuery() {
  /** @deprecated Use useLabsFeedQuery from useFeedQueries.ts */
  return useQuery<ContentIndexItem[], Error>({
    queryKey: queryKeys.labsMixedIndex(),
    queryFn: async () => toSortedContentItemsFromFeed(await fetchFeed("labs")),
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useLegacyLabsIndexQuery() {
  return useQuery<ContentIndexItem[], Error>({
    queryKey: queryKeys.labsLegacyIndex(),
    queryFn: async () =>
      toSortedContentItemsFromFeed((await fetchFeed("labs")).filter((item) => item.kind !== "live-demo")),
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useSystemsIndexQuery() {
  return useQuery<ContentIndexItem[], Error>({
    queryKey: queryKeys.systemsIndex(),
    queryFn: async () =>
      toSortedContentItemsFromFeed((await fetchFeed("proof")).filter((item) => item.kind === "system")),
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useAboutExperimentsCountQuery() {
  return useQuery<number, Error>({
    queryKey: queryKeys.aboutExperimentsCount(),
    queryFn: async () => (await fetchFeed("labs")).length,
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useAboutInsightsCountQuery() {
  return useQuery<number, Error>({
    queryKey: queryKeys.aboutInsightsCount(),
    queryFn: async () => (await fetchFeed("insights")).length,
    staleTime: FIVE_MINUTES_MS,
  });
}
