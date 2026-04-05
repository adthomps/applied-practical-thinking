import { useEffect, useState } from "react";
import type { PublicReviewBundleManifest } from "@apt/knowledge";
import { fetchDesignReviewBundleManifest } from "@/src/services/contentIndex";

type UseReviewBundleManifestState = {
  manifest: PublicReviewBundleManifest | null;
  loading: boolean;
  error: string | null;
};

export function useReviewBundleManifest(): UseReviewBundleManifestState {
  const [manifest, setManifest] = useState<PublicReviewBundleManifest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchDesignReviewBundleManifest();
        if (!cancelled) {
          setManifest(result);
          setLoading(false);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message || "Failed to load review bundle metadata.");
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { manifest, loading, error };
}
