import type { ContentIndexItem } from "@/src/services/contentIndex";
import type { PublicFeedItem } from "@/src/services/feed";

export function toContentIndexItemFromFeed(item: PublicFeedItem): ContentIndexItem {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    description: item.description,
    summary: item.summary,
    type: item.type || item.kind,
    status: item.status,
    concepts: item.topics,
    tags: item.topics,
    platforms: item.platforms,
    technologies: item.technologies,
    publishedAt: item.publishedAt,
    contentPath: item.contentPath,
    links: item.links,
    excerpt: item.excerpt,
    date: item.date,
    duration: item.duration,
    problem: item.problem,
    thumbnail: item.thumbnail,
    assetBasePath: item.assetBasePath,
    indexType: item.sourceIndexType,
  };
}

export function getLabsFilterType(item: PublicFeedItem) {
  if (item.kind === "live-demo") return "live demo";
  if (item.kind === "concept") return "concept";
  if (item.kind === "mock") return "mock";
  return "prototype";
}
