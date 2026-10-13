import { useMemo, useState } from "react";
import { InsightCard } from "@/components/apt/InsightCard";
import { ContentFilters, FilterConfig, SelectedFilters, ContentStateGate } from "@/components/apt";
import { getWorkerApiConfigError } from "@/src/services/api";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useInsightsFeedQuery } from "@/hooks/useFeedQueries";
import { toContentIndexItemFromFeed } from "@/src/services/feedAdapters";

export default function InsightsGuides() {
  usePageMetadata({
    title: "Case Studies",
    description: "Case studies that name the decision, the tradeoff, and what was left out.",
  });

  const [selected, setSelected] = useState<SelectedFilters>({ topics: [] });

  const guidesQuery = useInsightsFeedQuery();

  const guides = useMemo(
    () => (guidesQuery.data || []).filter((item) => item.sourceIndexType === "case-studies"),
    [guidesQuery.data]
  );
  const loading = guidesQuery.isLoading;

  const config = useMemo<FilterConfig>(() => {
    const topics = [...new Set(guides.flatMap((b) => b.topics || []))].sort();
    return { topics };
  }, [guides]);

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      return !selected.topics?.length || selected.topics.some((t) => (guide.topics || []).includes(t));
    });
  }, [selected.topics, guides]);

  const configError = guidesQuery.isError ? getWorkerApiConfigError() : null;

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Case Studies
        </h1>
        <p className="text-lg text-muted-foreground">
          Decisions from real APT work, including what was left out.
        </p>
      </div>

      <ContentFilters
        config={config}
        selected={selected}
        onChange={setSelected}
        resultCount={filteredGuides.length}
        totalCount={guides.length}
      />

      <ContentStateGate
        loading={loading}
        isError={guidesQuery.isError}
        errorMessage={guidesQuery.error?.message || "Unable to load case study content."}
        configError={configError}
        empty={filteredGuides.length === 0}
        loadingLabel="Loading case study content…"
        emptyLabel="No case study items match your filters."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredGuides.map((guide) => (
            <InsightCard
              key={guide.id}
              insight={toContentIndexItemFromFeed(guide)}
              to={`/insights/${guide.id}`}
            />
          ))}
        </div>
      </ContentStateGate>
    </div>
  );
}
