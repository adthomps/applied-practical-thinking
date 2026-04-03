import { useState, useMemo, useEffect } from "react";
import { fetchContentIndex, ContentIndexItem } from "@/src/services/contentIndex";
import { InsightCard } from "@/components/apt/InsightCard";
import { AptButton, ContentFilters, FilterConfig, SelectedFilters, RuntimeConfigNotice } from "@/components/apt";
import { getWorkerApiConfigError } from "@/src/services/api";

export default function InsightsGuides() {
  const [guides, setGuides] = useState<ContentIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<SelectedFilters>({ topics: [] });
  const [subtype, setSubtype] = useState<"all" | "guide" | "case-study">("all");

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchContentIndex("guides"), fetchContentIndex("case-studies")])
      .then(([guideItems, caseStudies]) => {
        setGuides(
          [...guideItems, ...caseStudies].sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""))
        );
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

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
    return <div className="container py-12 text-center">Loading guides…</div>;
  }
  if (error) {
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
          <div className="text-center text-destructive">{error}</div>
        )}
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Guides
        </h1>
        <p className="text-lg text-muted-foreground">
          Practical walkthroughs, reference guides, and worked examples for applied thinking.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { value: "all", label: "All" },
          { value: "guide", label: "Guides" },
          { value: "case-study", label: "Case Studies" },
        ].map((option) => (
          <AptButton
            key={option.value}
            onClick={() => setSubtype(option.value as "all" | "guide" | "case-study")}
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
          No guides or case studies match your filters.
        </div>
      )}
    </div>
  );
}
