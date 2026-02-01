import matter from "gray-matter";

import {
  ContentIndexItem,
  ContentIndexType,
  fetchContentIndex,
  fetchContentMarkdown,
} from "./contentIndex";

export type ContentDetailMatch = "id" | "slug" | "idOrSlug";

export function stripFrontmatter(markdown: string): string {
  try {
    const parsed = matter(markdown);
    return (parsed.content || "").trim();
  } catch {
    // Fallback: keep existing behavior if parsing fails
    return markdown.replace(/^---[\s\S]*?---\s*/, "").trim();
  }
}

export async function fetchContentItems(indexTypes: ContentIndexType[]): Promise<ContentIndexItem[]> {
  const all = await Promise.all(indexTypes.map((t) => fetchContentIndex(t)));
  return all.flat();
}

export function findContentItem(
  items: ContentIndexItem[],
  idOrSlug: string,
  match: ContentDetailMatch
): ContentIndexItem | null {
  const predicate = (item: ContentIndexItem) => {
    if (match === "id") return item.id === idOrSlug;
    if (match === "slug") return item.slug === idOrSlug;
    return item.id === idOrSlug || item.slug === idOrSlug;
  };
  return items.find(predicate) || null;
}

export async function fetchContentDetail(params: {
  indexTypes: ContentIndexType[];
  idOrSlug: string;
  match?: ContentDetailMatch;
}): Promise<{ items: ContentIndexItem[]; item: ContentIndexItem | null; markdown: string }>{
  const { indexTypes, idOrSlug, match = "idOrSlug" } = params;

  const items = await fetchContentItems(indexTypes);
  const item = findContentItem(items, idOrSlug, match);

  if (!item?.contentPath) {
    return { items, item, markdown: "" };
  }

  const raw = await fetchContentMarkdown(item.contentPath);
  return { items, item, markdown: stripFrontmatter(raw) };
}
