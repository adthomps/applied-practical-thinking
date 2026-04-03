
import { useState, useMemo, useEffect } from "react";
import { DemoCard } from "@/components/apt/DemoCard";
import { ContentFilters, FilterConfig, SelectedFilters, RuntimeConfigNotice } from "@/components/apt";
import { fetchContentIndex, ContentIndexItem } from "@/src/services/contentIndex";
import { getWorkerApiConfigError } from "@/src/services/api";

export default function PortfolioLiveDemos() {
  const [selected, setSelected] = useState<SelectedFilters>({
    types: [],
    topics: [],
    platforms: [],
    technologies: [],
    statuses: [],
  });
  const [demos, setDemos] = useState<ContentIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContentIndex("demos")
      .then((data) => setDemos(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const config = useMemo<FilterConfig>(() => {
    const types = [...new Set(demos.map((d) => d.type))];
    const topics = [...new Set(demos.flatMap((d) => d.tags || []))].sort();
    const platforms = [...new Set(demos.flatMap((d) => d.platforms || []))];
    const technologies = [...new Set(demos.flatMap((d) => d.technologies || []))];
    const statuses = [...new Set(demos.map((d) => d.status))];
    return { types, topics, platforms, technologies, statuses };
  }, [demos]);

  const filteredDemos = useMemo(() => {
    return demos.filter((demo) => {
      if (selected.types?.length && !selected.types.includes(demo.type)) {
        return false;
      }
      if (selected.topics?.length && !(demo.tags || []).some((t: string) => selected.topics?.includes(t))) {
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
      (a, b) => statusOrder[a.status] - statusOrder[b.status]
    );
  }, [filteredDemos]);

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Live Demos
        </h1>
        <p className="text-lg text-muted-foreground">
          Interactive working demos nested under Experiments. This is the runnable proof layer for concepts, mocks, and prototypes that have become observable enough to click through.
        </p>
      </div>

      <ContentFilters
        config={config}
        selected={selected}
        onChange={setSelected}
        resultCount={filteredDemos.length}
        totalCount={demos.length}
      />

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading…</div>
      ) : error ? (
        (() => {
          const configError = getWorkerApiConfigError();
          return configError ? (
            <RuntimeConfigNotice
              message={configError.message}
              envVar={configError.envVar}
              expectedValue={configError.expectedProductionValue}
            />
          ) : (
            <div className="text-center py-12 text-destructive">{error}</div>
          );
        })()
      ) : sortedDemos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedDemos.map((demo) => (
            <DemoCard key={demo.slug || demo.id} demo={demo} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <p>No demos match your filters.</p>
        </div>
      )}
    </div>
  );
}
