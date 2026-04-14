import { useQuery } from "@tanstack/react-query";
import type { PublicValidationReport } from "@/src/types/validationReport";
import { fetchPublicValidationReport } from "@/src/services/contentIndex";
import { queryKeys } from "@/hooks/queryKeys";

type UseValidationReportState = {
  report: PublicValidationReport | null;
  loading: boolean;
  error: string | null;
};

export function useValidationReport(): UseValidationReportState {
  const query = useQuery<PublicValidationReport, Error>({
    queryKey: queryKeys.validationReportLatest(),
    queryFn: fetchPublicValidationReport,
    staleTime: 5 * 60 * 1000,
  });

  return {
    report: query.data ?? null,
    loading: query.isLoading,
    error: query.error?.message ?? null,
  };
}
