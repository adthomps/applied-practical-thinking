import { useMemo, useState } from "react";
import { LabCard } from "@/components/apt/LabCard";
import { DemoCard } from "@/components/apt/DemoCard";
import {
  ContentFilters,
  type FilterConfig,
  SectionIntro,
  type SelectedFilters,
  RuntimeConfigNotice,
} from "@/components/apt";
import { getWorkerApiConfigError } from "@/src/services/api";
import { useLabsAndDemosIndexQuery } from "@/hooks/useContentAggregateQueries";
import type { ContentIndexItem } from "@/src/services/contentIndex";
import { LabsTabs } from "./LabsTabs";

function normalizeType(item: ContentIndexItem) {
  if (item.indexType === "demos") return "live demo";
  if (item.type === "concept") return "concept";
  if (item.type === "mock") return "mock";
  return "prototype";
}

export default function PortfolioLabs() {
  const [selected, setSelected] = useState<SelectedFilters>({
    types: [],
    topics: [],
    platforms: [],
    technologies: [],
    statuses: [],
  });

  const labsQuery = useLabsAndDemosIndexQuery();
  const items = useMemo(() => labsQuery.data || [], [labsQuery.data]);
  const loading = labsQuery.isLoading;
  const error = labsQuery.error?.message || null;

  const config = useMemo<FilterConfig>(() => {
    const types = [...new Set(items.map((item) => normalizeType(item)))];
    const topics = [...new Set(items.flatMap((item) => item.tags || []))].sort();
    const platforms = [...new Set(items.flatMap((item) => item.platforms || []))];
    const technologies = [...new Set(items.flatMap((item) => item.technologies || []))];
    const statuses = [...new Set(items.map((item) => item.status))];
    return { types, topics, platforms, technologies, statuses };
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const normalizedType = normalizeType(item);
      if (selected.types?.length && !selected.types.includes(normalizedType)) return false;
      if (selected.topics?.length && !(item.tags || []).some((tag) => selected.topics?.includes(tag))) return false;
      if (selected.platforms?.length && !(item.platforms || []).some((platform) => selected.platforms?.includes(platform))) return false;
      if (selected.technologies?.length && !(item.technologies || []).some((tech) => selected.technologies?.includes(tech))) return false;
      if (selected.statuses?.length && !selected.statuses.includes(item.status)) return false;
      return true;
    });
  }, [items, selected]);

  return (
    <div className="container py-10 md:py-12 space-y-8">
      <section className="space-y-3">
        <SectionIntro
          title="Labs"
          description="Experiments, prototypes, UI concepts, and API demos. Ideas given shape — early, imperfect, and intentional."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
        />
      </section>

      <LabsTabs />

      <section className="space-y-6">
        <ContentFilters
          config={config}
          selected={selected}
          onChange={setSelected}
          resultCount={filteredItems.length}
          totalCount={items.length}
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.map((item) =>
              item.indexType === "demos" ? (
                <DemoCard key={item.slug || item.id} demo={item} />
              ) : (
                <LabCard key={item.slug || item.id} lab={item} />
              )
            )}
          </div>
        )}

        {!loading && !error && filteredItems.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No labs match your current filters.
          </div>
        ) : null}
      </section>
    </div>
  );
}
