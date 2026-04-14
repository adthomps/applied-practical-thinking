import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  ContentDetailMatch,
  fetchContentDetail,
} from "@/src/services/contentDetail";
import { ContentIndexType } from "@/src/services/contentIndex";
import { queryKeys } from "@/hooks/queryKeys";

export function useContentDetail(params: {
  indexTypes: ContentIndexType[];
  idOrSlug: string | undefined;
  match?: ContentDetailMatch;
}) {
  const { indexTypes, idOrSlug, match } = params;
  const resolvedMatch = match || "idOrSlug";
  const normalizedTypes = useMemo(() => [...indexTypes].sort(), [indexTypes]);

  const query = useQuery({
    queryKey: queryKeys.contentDetail(normalizedTypes, idOrSlug ?? "", resolvedMatch),
    queryFn: () =>
      fetchContentDetail({
        indexTypes: normalizedTypes,
        idOrSlug: idOrSlug || "",
        match: resolvedMatch,
      }),
    enabled: Boolean(idOrSlug),
    staleTime: 5 * 60 * 1000,
  });

  const item = query.data?.item ?? null;
  const error =
    !idOrSlug
      ? "Not found"
      : query.error?.message ?? (!query.isLoading && !item ? "Not found" : null);

  return {
    items: query.data?.items ?? [],
    item,
    markdown: query.data?.markdown ?? "",
    loading: idOrSlug ? query.isLoading : false,
    error,
  };
}
