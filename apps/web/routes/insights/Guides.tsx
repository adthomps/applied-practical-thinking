import { useState, useMemo, useEffect } from "react";
import { fetchContentIndex, ContentIndexItem } from "@/src/services/contentIndex";
import { InsightCard } from "@/components/apt/InsightCard";
import { ContentFilters, FilterConfig, SelectedFilters } from "@/components/apt";

export default function InsightsGuides() {
  const [guides, setGuides] = useState<ContentIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<SelectedFilters>({ topics: [] });

  useEffect(() => {
    setLoading(true);
    fetchContentIndex("guides")
      .then((data) => {
        setGuides(data.sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || "")));
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
    if (!selected.topics?.length) return guides;
    return guides.filter((guide) =>
      selected.topics?.some((t) => (guide.concepts || []).includes(t))
    );
  }, [selected.topics, guides]);

  if (loading) {
    return <div className="container py-12 text-center">Loading guides…</div>;
  }
  if (error) {
    return <div className="container py-12 text-center text-destructive">{error}</div>;
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Guides
        </h1>
        <p className="text-lg text-muted-foreground">
          Step-by-step walkthroughs and practical how-tos for applied thinking.
        </p>
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
          <InsightCard key={guide.id} insight={guide} to={`/guides/${guide.id}`} />
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No guides match your filters.
        </div>
      )}
    </div>
  );
}
