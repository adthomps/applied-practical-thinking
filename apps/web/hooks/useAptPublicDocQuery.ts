import { useQuery } from "@tanstack/react-query";
import { fetchAptPublicDocMarkdown } from "@/src/services/aptPrinciplesPublicDocs";
import { queryKeys } from "@/hooks/queryKeys";

const FIVE_MINUTES_MS = 5 * 60 * 1000;

export function useAptPublicDocQuery(publicPath: string | null | undefined) {
  const normalizedPath = publicPath || "";

  return useQuery({
    queryKey: queryKeys.aptPublicDoc(normalizedPath),
    queryFn: () => fetchAptPublicDocMarkdown(normalizedPath),
    enabled: normalizedPath.length > 0,
    staleTime: FIVE_MINUTES_MS,
  });
}
