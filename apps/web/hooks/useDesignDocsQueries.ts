import { useQuery } from "@tanstack/react-query";
import type { PublicDesignDocItem } from "@apt/knowledge";
import {
  fetchDesignDoc,
  fetchDesignDocVersion,
  fetchDesignDocs,
} from "@/src/services/contentIndex";
import { queryKeys } from "@/hooks/queryKeys";

const FIVE_MINUTES_MS = 5 * 60 * 1000;

export function useDesignDocsQuery() {
  return useQuery({
    queryKey: queryKeys.designDocsAll(),
    queryFn: fetchDesignDocs,
    staleTime: FIVE_MINUTES_MS,
  });
}

export function usePatternDesignDocsQuery() {
  return useQuery({
    queryKey: queryKeys.designDocsPatterns(),
    queryFn: async () => (await fetchDesignDocs()).filter((doc) => doc.slug.startsWith("patterns/")),
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useDesignDocQuery(slug: string, activeMajor: number | null) {
  return useQuery({
    queryKey: queryKeys.designDoc(slug, activeMajor ?? "latest"),
    queryFn: () => (activeMajor ? fetchDesignDocVersion(slug, activeMajor) : fetchDesignDoc(slug)),
    enabled: slug.length > 0,
    staleTime: FIVE_MINUTES_MS,
  });
}

export function splitDoctrineAndPatterns(docs: PublicDesignDocItem[]) {
  const doctrineDocs = docs.filter((doc) => !doc.slug.startsWith("patterns/"));
  const patternDocs = docs.filter((doc) => doc.slug.startsWith("patterns/"));
  return { doctrineDocs, patternDocs };
}

