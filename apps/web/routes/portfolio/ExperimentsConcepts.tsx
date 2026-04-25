import { useMemo, useState } from "react";
import { LabCard } from "@/components/apt/LabCard";
import { ContentFilters, FilterConfig, SelectedFilters, ContentStateGate } from "@/components/apt";
import { getWorkerApiConfigError } from "@/src/services/api";
import { LabsTabs } from "./LabsTabs";
import { useLabsFeedQuery } from "@/hooks/useFeedQueries";
import { toContentIndexItemFromFeed } from "@/src/services/feedAdapters";

export default function ExperimentsConcepts() {
  const [selected, setSelected] = useState<SelectedFilters>({
    types: [],
    topics: [],
    platforms: [],
    technologies: [],
    statuses: [],
  });
  const labsQuery = useLabsFeedQuery();
  const loading = labsQuery.isLoading;
  const error = labsQuery.error?.message || null;
  const labs = useMemo(
    () => (labsQuery.data || []).filter((item) => item.kind === "concept"),
    [labsQuery.data]
  );

  const config = useMemo<FilterConfig>(() => {
    const types = [...new Set(labs.map((lab) => lab.kind))];
    const topics = [...new Set(labs.flatMap((lab) => lab.topics || []))].sort();
    const platforms = [...new Set(labs.flatMap((lab) => lab.platforms || []))];
    const technologies = [...new Set(labs.flatMap((lab) => lab.technologies || []))];
    const statuses = [...new Set(labs.map((lab) => lab.status))];
    return { types, topics, platforms, technologies, statuses };
  }, [labs]);

  const filteredLabs = useMemo(() => {
    return labs.filter((lab) => {
      if (selected.types?.length && !selected.types.includes(lab.kind)) return false;
      if (selected.topics?.length && !(lab.topics || []).some((tag: string) => selected.topics?.includes(tag))) return false;
      if (selected.platforms?.length && !(lab.platforms || []).some((platform: string) => selected.platforms?.includes(platform))) return false;
      if (selected.technologies?.length && !(lab.technologies || []).some((tech: string) => selected.technologies?.includes(tech))) return false;
      if (selected.statuses?.length && !selected.statuses.includes(lab.status)) return false;
      return true;
    });
  }, [labs, selected]);

  return (
    <div className="container py-10 md:py-12 space-y-8">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Lab Concepts</h1>
        <p className="text-lg text-muted-foreground">
          Early conceptual builds and prototype directions that give an idea its first coherent form.
        </p>
      </div>

      <LabsTabs />

      <ContentFilters
        config={config}
        selected={selected}
        onChange={setSelected}
        resultCount={filteredLabs.length}
        totalCount={labs.length}
      />

      <ContentStateGate
        loading={loading}
        isError={Boolean(error)}
        errorMessage={error}
        configError={error ? getWorkerApiConfigError() : null}
        empty={filteredLabs.length === 0}
        loadingLabel="Loading…"
        emptyLabel="No concept labs match your current filters."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLabs.map((lab) => (
            <LabCard key={lab.slug || lab.id} lab={toContentIndexItemFromFeed(lab)} />
          ))}
        </div>
      </ContentStateGate>
    </div>
  );
}
