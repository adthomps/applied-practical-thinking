import { useQuery } from "@tanstack/react-query";
import type { PublicReviewBundleManifest } from "@apt/knowledge";
import { fetchDesignReviewBundleManifest } from "@/src/services/contentIndex";
import { queryKeys } from "@/hooks/queryKeys";

type UseReviewBundleManifestState = {
  manifest: PublicReviewBundleManifest | null;
  loading: boolean;
  error: string | null;
};

export function useReviewBundleManifest(): UseReviewBundleManifestState {
  const query = useQuery<PublicReviewBundleManifest, Error>({
    queryKey: queryKeys.designReviewBundleManifest(),
    queryFn: fetchDesignReviewBundleManifest,
    staleTime: 5 * 60 * 1000,
  });

  return {
    manifest: query.data ?? null,
    loading: query.isLoading,
    error: query.error?.message ?? null,
  };
}
