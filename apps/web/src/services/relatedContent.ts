// src/services/relatedContent.ts
// Utility to resolve related content items by ID from all indexes

import { ContentIndexItem, fetchContentIndex, ContentIndexType } from "./contentIndex";

const ALL_INDEX_TYPES: ContentIndexType[] = [
  "blog",
  "guides",
  "podcasts",
  "design-reviews",
  "labs",
  "demos",
  "systems",
];

// Loads all indexes and returns a map of id/slug to item
export async function loadAllContentIndexes(): Promise<Record<string, ContentIndexItem>> {
  const all: Record<string, ContentIndexItem> = {};
  await Promise.all(
    ALL_INDEX_TYPES.map(async (type) => {
      try {
        const items = await fetchContentIndex(type);
        for (const item of items) {
          if (item.id) all[item.id] = item;
          if (item.slug) all[item.slug] = item;
        }
      } catch {
        return;
      }
    })
  );
  return all;
}

// Given a list of IDs, returns the matching content items (in order)
export function resolveRelatedItems(ids: string[], all: Record<string, ContentIndexItem>): ContentIndexItem[] {
  return ids.map((id) => all[id]).filter(Boolean);
}
