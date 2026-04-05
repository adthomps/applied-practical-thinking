import { useEffect, useMemo, useState } from "react";

import {
  ContentDetailMatch,
  fetchContentDetail,
} from "@/src/services/contentDetail";
import { ContentIndexItem, ContentIndexType } from "@/src/services/contentIndex";

export function useContentDetail(params: {
  indexTypes: ContentIndexType[];
  idOrSlug: string | undefined;
  match?: ContentDetailMatch;
}) {
  const { indexTypes, idOrSlug, match } = params;
  const indexTypesKey = useMemo(() => indexTypes.join("|"), [indexTypes]);

  const [items, setItems] = useState<ContentIndexItem[]>([]);
  const [item, setItem] = useState<ContentIndexItem | null>(null);
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!idOrSlug) {
        setLoading(false);
        setError("Not found");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await fetchContentDetail({
          indexTypes,
          idOrSlug,
          match,
        });

        if (cancelled) return;

        setItems(result.items);
        setItem(result.item);
        setMarkdown(result.markdown);

        if (!result.item) {
          setError("Not found");
        }
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message || "Failed to load content");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [indexTypes, indexTypesKey, idOrSlug, match]);

  return { items, item, markdown, loading, error };
}
