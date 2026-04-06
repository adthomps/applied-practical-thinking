import { useEffect, useState } from "react";
import type { PublicValidationReport } from "@/src/types/validationReport";
import { fetchPublicValidationReport } from "@/src/services/contentIndex";

type UseValidationReportState = {
  report: PublicValidationReport | null;
  loading: boolean;
  error: string | null;
};

export function useValidationReport(): UseValidationReportState {
  const [report, setReport] = useState<PublicValidationReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchPublicValidationReport();
        if (!cancelled) {
          setReport(result);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load validation report.");
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { report, loading, error };
}
