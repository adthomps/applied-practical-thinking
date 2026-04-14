import { useMemo, useState } from "react";
import { InsightCard } from "@/components/apt/InsightCard";
import { AptButton, ContentFilters, FilterConfig, SelectedFilters, RuntimeConfigNotice } from "@/components/apt";
import { getWorkerApiConfigError } from "@/src/services/api";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useGuidesAndReviewsIndexQuery } from "@/hooks/useContentAggregateQueries";

export default function InsightsGuides() {
  usePageMetadata({
    title: "Practice",
    description: "Practical guides and design reviews for applied thinking, repeatable workflows, and artifact review.",
  });

  const [selected, setSelected] = useState<SelectedFilters>({ topics: [] });
  const [subtype, setSubtype] = useState<"all" | "guide" | "design-review">("all");

  const guidesQuery = useGuidesAndReviewsIndexQuery();

  const guides = useMemo(() => guidesQuery.data || [], [guidesQuery.data]);
  const loading = guidesQuery.isLoading;

  const config = useMemo<FilterConfig>(() => {
    const topics = [...new Set(guides.flatMap((b) => b.concepts || []))].sort();
    return { topics };
  }, [guides]);

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      const matchesTopics =
        !selected.topics?.length || selected.topics.some((t) => (guide.concepts || []).includes(t));
      const matchesSubtype = subtype === "all" || guide.type === subtype;
      return matchesTopics && matchesSubtype;
    });
  }, [selected.topics, guides, subtype]);

  if (loading) {
    return <div className="container py-12 text-center">Loading practice content…</div>;
  }
  if (guidesQuery.isError) {
    const configError = getWorkerApiConfigError();
    return (
      <div className="container py-12">
        {configError ? (
          <RuntimeConfigNotice
            message={configError.message}
            envVar={configError.envVar}
            expectedValue={configError.expectedProductionValue}
          />
        ) : (
          <div className="text-center text-destructive">{guidesQuery.error?.message}</div>
        )}
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Practice
        </h1>
        <p className="text-lg text-muted-foreground">
          Practical guides and design reviews for applied thinking. Use guides to learn the workflow and reviews to see how decisions hold up against real artifacts.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { value: "all", label: "All" },
          { value: "guide", label: "Guides" },
          { value: "design-review", label: "Design Reviews" },
        ].map((option) => (
          <AptButton
            key={option.value}
            onClick={() => setSubtype(option.value as "all" | "guide" | "design-review")}
            variant={subtype === option.value ? "primary" : "ghost"}
            size="sm"
          >
            {option.label}
          </AptButton>
        ))}
      </div>

      <ContentFilters
        config={config}
        selected={selected}
        onChange={setSelected}
        resultCount={filteredGuides.length}
        totalCount={guides.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGuides.map((guide) => (
          <InsightCard key={guide.id} insight={guide} to={`/learn/${guide.id}`} />
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No practice items match your filters.
        </div>
      )}
    </div>
  );
}
