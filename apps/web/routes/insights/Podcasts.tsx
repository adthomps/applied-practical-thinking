import { useState, useMemo, useEffect } from "react";
import { InsightCard } from "@/components/apt/InsightCard";
import { ContentFilters, FilterConfig, SelectedFilters } from "@/components/apt";
import { fetchContentIndex, ContentIndexItem } from "@/src/services/contentIndex";

export default function InsightsPodcasts() {
  const [podcasts, setPodcasts] = useState<ContentIndexItem[]>([]);
  const [selected, setSelected] = useState<SelectedFilters>({
    topics: [],
  });

  // Get unique filter options
  const config = useMemo<FilterConfig>(() => {
    const topics = [...new Set(podcasts.flatMap((b) => b.concepts || []))].sort();
    return { topics };
  }, [podcasts]);

  // Filter podcasts
  const filteredPodcasts = useMemo(() => {
    if (!selected.topics?.length) return podcasts;
    return podcasts.filter((podcast) =>
      selected.topics?.some((t) => (podcast.concepts || []).includes(t))
    );
  }, [selected.topics, podcasts]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchContentIndex("podcasts")
      .then((data) => {
        setPodcasts(data.sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || "")));
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div className="container py-12 text-center">Loading podcasts…</div>;
  }
  if (error) {
    return <div className="container py-12 text-center text-destructive">{error}</div>;
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Podcasts
        </h1>
        <p className="text-lg text-muted-foreground">
          Audio discussions exploring thinking, frameworks, and real-world tradeoffs.
        </p>
      </div>

      <ContentFilters
        config={config}
        selected={selected}
        onChange={setSelected}
        resultCount={filteredPodcasts.length}
        totalCount={podcasts.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPodcasts.map((podcast) => (
          <InsightCard key={podcast.id} insight={podcast} to={`/learn/${podcast.id}`} />
        ))}
      </div>

      {filteredPodcasts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No podcasts match your filters.
        </div>
      )}
    </div>
  );
}
