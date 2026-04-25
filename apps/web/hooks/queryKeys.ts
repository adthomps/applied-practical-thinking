import type { ContentDetailMatch } from "@/src/services/contentDetail";
import type { ContentIndexType } from "@/src/services/contentIndex";

function normalizeTypes(types: ContentIndexType[]) {
  return [...types].sort().join("|");
}

export const queryKeys = {
  contentIndex: (type: ContentIndexType) => ["content-index", type] as const,
  contentIndexes: (types: ContentIndexType[]) => ["content-indexes", normalizeTypes(types)] as const,
  contentDetail: (types: ContentIndexType[], idOrSlug: string, match: ContentDetailMatch) =>
    ["content-detail", normalizeTypes(types), idOrSlug, match] as const,
  designDocsAll: () => ["design-docs", "all"] as const,
  designDocsPatterns: () => ["design-docs", "patterns-only"] as const,
  designDoc: (slug: string, major: number | "latest") => ["design-doc", slug, major] as const,
  designDocVersions: (slug: string) => ["design-doc-versions", slug] as const,
  aptPublicDoc: (publicPath: string) => ["apt-public-doc", publicPath] as const,
  designReviewBundleManifest: () => ["design-review-bundle-manifest"] as const,
  validationReportLatest: () => ["validation-report", "latest"] as const,
  homeFeaturedContent: () => ["home", "featured-content"] as const,
  insightsIndex: () => ["learn", "insights-index"] as const,
  blogsIndex: () => ["learn", "blog-index"] as const,
  podcastsIndex: () => ["learn", "podcasts-index"] as const,
  guidesAndReviewsIndex: () => ["learn", "guides-and-reviews"] as const,
  experimentsLabsIndex: () => ["experiments", "labs-index"] as const,
  labsLegacyIndex: () => ["labs", "legacy-index"] as const,
  systemsIndex: () => ["design", "systems-index"] as const,
  aboutExperimentsCount: () => ["about", "experiments-count"] as const,
  aboutInsightsCount: () => ["about", "insights-count"] as const,
};
