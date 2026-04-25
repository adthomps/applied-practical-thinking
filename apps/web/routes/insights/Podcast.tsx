import { useMemo, useState } from "react";
import { InsightCard } from "@/components/apt/InsightCard";
import { ContentFilters, FilterConfig, SelectedFilters, ContentStateGate } from "@/components/apt";
import { getWorkerApiConfigError } from "@/src/services/api";
import { usePodcastsIndexQuery } from "@/hooks/useContentAggregateQueries";

export default function InsightsPodcasts() {
  const [selected, setSelected] = useState<SelectedFilters>({
    topics: [],
  });
  const podcastsQuery = usePodcastsIndexQuery();
  const podcasts = useMemo(() => podcastsQuery.data || [], [podcastsQuery.data]);

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

  const loading = podcastsQuery.isLoading;
  const error = podcastsQuery.error?.message || null;
  const configError = error ? getWorkerApiConfigError() : null;

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
        totalCount={(podcasts ?? []).length}
      />

      <ContentStateGate
        loading={loading}
        isError={Boolean(error)}
        errorMessage={error}
        configError={configError}
        empty={filteredPodcasts.length === 0}
        loadingLabel="Loading podcasts…"
        emptyLabel="No podcasts match your filters."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredPodcasts.map((podcast) => (
            <InsightCard key={podcast.id} insight={podcast} to={`/insights/${podcast.id}`} />
          ))}
        </div>
      </ContentStateGate>
    </div>
  );
}
