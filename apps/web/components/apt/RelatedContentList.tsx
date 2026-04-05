import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContentIndexItem } from "@/src/services/contentIndex";
import { loadAllContentIndexes, resolveRelatedItems } from "@/src/services/relatedContent";
import { AptCard, AptCardTitle, AptCardDescription } from "@/components/apt/AptCard";

export function RelatedContentList({ related }: { related: string[] }) {
  const [items, setItems] = useState<ContentIndexItem[]>([]);

  useEffect(() => {
    if (!related || related.length === 0) return;
    loadAllContentIndexes().then((all) => {
      setItems(resolveRelatedItems(related, all));
    });
  }, [related]);

  if (!related || related.length === 0 || items.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3">Related Content</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link key={item.id || item.slug} to={getContentUrl(item)}>
            <AptCard variant="subtle" padding="compact" className="h-full">
              <AptCardTitle className="text-base">{item.title}</AptCardTitle>
              <AptCardDescription className="mt-2">
                {item.summary || item.description}
              </AptCardDescription>
            </AptCard>
          </Link>
        ))}
      </div>
    </div>
  );
}

function getContentUrl(item: ContentIndexItem): string {
  if (item.type === "article" || item.type === "blog") return `/learn/${item.id}`;
  if (item.type === "design-review") return `/learn/${item.id}`;
  if (item.type === "guide") return `/learn/${item.id}`;
  if (item.type === "podcast") return `/learn/${item.id}`;
  if (item.type === "lab" || item.type === "mock" || item.type === "demo") return `/experiments/${item.slug || item.id}`;
  if (item.type === "system" || item.contentPath?.startsWith("systems/")) return `/design/systems/${item.id}`;
  // fallback
  return `/learn/${item.id || item.slug}`;
}
