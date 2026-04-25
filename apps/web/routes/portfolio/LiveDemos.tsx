
import { useState, useMemo } from "react";
import { DemoCard } from "@/components/apt/DemoCard";
import { ContentFilters, FilterConfig, SelectedFilters, ContentStateGate } from "@/components/apt";
import { getWorkerApiConfigError } from "@/src/services/api";
import { LabsTabs } from "./LabsTabs";
import { useLabsFeedQuery } from "@/hooks/useFeedQueries";
import { toContentIndexItemFromFeed } from "@/src/services/feedAdapters";

export default function PortfolioLiveDemos() {
  const [selected, setSelected] = useState<SelectedFilters>({
    types: [],
    topics: [],
    platforms: [],
    technologies: [],
    statuses: [],
  });
  const demosQuery = useLabsFeedQuery();
  const loading = demosQuery.isLoading;
  const error = demosQuery.error?.message || null;
  const demos = useMemo(
    () => (demosQuery.data || []).filter((item) => item.kind === "live-demo"),
    [demosQuery.data]
  );

  const config = useMemo<FilterConfig>(() => {
    const types = [...new Set(demos.map((d) => d.kind))];
    const topics = [...new Set(demos.flatMap((d) => d.topics || []))].sort();
    const platforms = [...new Set(demos.flatMap((d) => d.platforms || []))];
    const technologies = [...new Set(demos.flatMap((d) => d.technologies || []))];
    const statuses = [...new Set(demos.map((d) => d.status))];
    return { types, topics, platforms, technologies, statuses };
  }, [demos]);

  const filteredDemos = useMemo(() => {
    return demos.filter((demo) => {
      if (selected.types?.length && !selected.types.includes(demo.kind)) {
        return false;
      }
      if (selected.topics?.length && !(demo.topics || []).some((t: string) => selected.topics?.includes(t))) {
        return false;
      }
      if (selected.platforms?.length && !(demo.platforms || []).some((p: string) => selected.platforms?.includes(p))) {
        return false;
      }
      if (selected.technologies?.length && !(demo.technologies || []).some((t: string) => selected.technologies?.includes(t))) {
        return false;
      }
      if (selected.statuses?.length && !selected.statuses.includes(demo.status)) {
        return false;
      }
      return true;
    });
  }, [selected, demos]);

  const sortedDemos = useMemo(() => {
    const statusOrder: Record<string, number> = { live: 0, "coming-soon": 1, archived: 2 };
    return [...filteredDemos].sort(
      (a, b) => (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99)
    );
  }, [filteredDemos]);

  return (
    <div className="container py-10 md:py-12 space-y-8">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Live Demos
        </h1>
        <p className="text-lg text-muted-foreground">
          Interactive working demos nested under Labs. This is the runnable proof layer for concepts, mocks, and prototypes that have become observable enough to click through.
        </p>
      </div>

      <LabsTabs />

      <ContentFilters
        config={config}
        selected={selected}
        onChange={setSelected}
        resultCount={filteredDemos.length}
        totalCount={demos.length}
      />

      <ContentStateGate
        loading={loading}
        isError={Boolean(error)}
        errorMessage={error}
        configError={error ? getWorkerApiConfigError() : null}
        empty={sortedDemos.length === 0}
        loadingLabel="Loading…"
        emptyLabel="No demos match your filters."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sortedDemos.map((demo) => (
            <DemoCard key={demo.slug || demo.id} demo={toContentIndexItemFromFeed(demo)} />
          ))}
        </div>
      </ContentStateGate>
    </div>
  );
}
