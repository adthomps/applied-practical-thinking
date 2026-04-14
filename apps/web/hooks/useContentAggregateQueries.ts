import { useQuery } from "@tanstack/react-query";
import type { ContentIndexItem } from "@/src/services/contentIndex";
import { fetchContentIndex } from "@/src/services/contentIndex";
import { queryKeys } from "@/hooks/queryKeys";

const FIVE_MINUTES_MS = 5 * 60 * 1000;

function sortByPublishedAt(items: ContentIndexItem[]) {
  return [...items].sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
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
      const [labs, blog, guides, podcasts, reviews, demos, systems] = await Promise.all([
        fetchContentIndex("labs"),
        fetchContentIndex("blog"),
        fetchContentIndex("guides"),
        fetchContentIndex("podcasts"),
        fetchContentIndex("design-reviews"),
        fetchContentIndex("demos"),
        fetchContentIndex("systems"),
      ]);
      return selectHomepageFeatured([...labs, ...blog, ...guides, ...podcasts, ...reviews, ...demos, ...systems]);
    },
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useInsightsIndexQuery() {
  return useQuery<ContentIndexItem[], Error>({
    queryKey: queryKeys.insightsIndex(),
    queryFn: async () => {
      const [blog, guides, podcasts, reviews] = await Promise.all([
        fetchContentIndex("blog"),
        fetchContentIndex("guides"),
        fetchContentIndex("podcasts"),
        fetchContentIndex("design-reviews"),
      ]);
      return sortByPublishedAt([...blog, ...guides, ...podcasts, ...reviews]);
    },
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useBlogsIndexQuery() {
  return useQuery<ContentIndexItem[], Error>({
    queryKey: queryKeys.blogsIndex(),
    queryFn: async () => sortByPublishedAt(await fetchContentIndex("blog")),
    staleTime: FIVE_MINUTES_MS,
  });
}

export function usePodcastsIndexQuery() {
  return useQuery<ContentIndexItem[], Error>({
    queryKey: queryKeys.podcastsIndex(),
    queryFn: async () => sortByPublishedAt(await fetchContentIndex("podcasts")),
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useGuidesAndReviewsIndexQuery() {
  return useQuery<ContentIndexItem[], Error>({
    queryKey: queryKeys.guidesAndReviewsIndex(),
    queryFn: async () => {
      const [guideItems, reviews] = await Promise.all([
        fetchContentIndex("guides"),
        fetchContentIndex("design-reviews"),
      ]);
      return sortByPublishedAt([...guideItems, ...reviews]);
    },
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useExperimentsLabsIndexQuery() {
  return useQuery<ContentIndexItem[], Error>({
    queryKey: queryKeys.experimentsLabsIndex(),
    queryFn: () => fetchContentIndex("labs"),
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useLegacyLabsIndexQuery() {
  return useQuery<ContentIndexItem[], Error>({
    queryKey: queryKeys.labsLegacyIndex(),
    queryFn: () => fetchContentIndex("labs"),
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useSystemsIndexQuery() {
  return useQuery<ContentIndexItem[], Error>({
    queryKey: queryKeys.systemsIndex(),
    queryFn: () => fetchContentIndex("systems"),
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useAboutExperimentsCountQuery() {
  return useQuery<number, Error>({
    queryKey: queryKeys.aboutExperimentsCount(),
    queryFn: async () => (await fetchContentIndex("labs")).length,
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useAboutInsightsCountQuery() {
  return useQuery<number, Error>({
    queryKey: queryKeys.aboutInsightsCount(),
    queryFn: async () => {
      const [blog, guides, podcasts, reviews] = await Promise.all([
        fetchContentIndex("blog"),
        fetchContentIndex("guides"),
        fetchContentIndex("podcasts"),
        fetchContentIndex("design-reviews"),
      ]);
      return blog.length + guides.length + podcasts.length + reviews.length;
    },
    staleTime: FIVE_MINUTES_MS,
  });
}

