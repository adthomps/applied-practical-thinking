import { describe, expect, it } from "vitest";
import type { PublicFeedItem } from "@apt/knowledge";
import { toContentIndexItemFromFeed } from "@/src/services/feedAdapters";
import { selectHomepageFeatured } from "@/hooks/useContentAggregateQueries";

function feedItem(overrides: Partial<PublicFeedItem>): PublicFeedItem {
  return {
    id: overrides.id || "item",
    slug: overrides.slug || overrides.id || "item",
    title: overrides.title || "Item",
    description: overrides.description || "Description",
    kind: overrides.kind || "blog",
    status: overrides.status || "active",
    topics: overrides.topics || [],
    platforms: overrides.platforms || [],
    technologies: overrides.technologies || [],
    href: overrides.href || "/insights/item",
    contentPath: overrides.contentPath || "blog/item.md",
    sourceIndexType: overrides.sourceIndexType || "blog",
    publishedAt: overrides.publishedAt || "2026-01-01",
    featured: overrides.featured,
  };
}

describe("home featured content", () => {
  it("preserves the feed featured flag for home card selection", () => {
    const converted = toContentIndexItemFromFeed(
      feedItem({
        id: "featured-blog",
        featured: true,
        sourceIndexType: "blog",
      })
    );

    expect(converted.featured).toBe(true);
    expect(selectHomepageFeatured([converted])).toHaveLength(1);
  });
});
