import { useEffect, useMemo, useState } from "react";
import { LabCard } from "@/components/apt/LabCard";
import { ContentFilters, FilterConfig, SelectedFilters, RuntimeConfigNotice } from "@/components/apt";
import { fetchContentIndex, ContentIndexItem } from "@/src/services/contentIndex";
import { getWorkerApiConfigError } from "@/src/services/api";

export default function ExperimentsMocks() {
  const [selected, setSelected] = useState<SelectedFilters>({
    types: [],
    topics: [],
    platforms: [],
    technologies: [],
    statuses: [],
  });
  const [labs, setLabs] = useState<ContentIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContentIndex("labs")
      .then((data) => setLabs(data.filter((item) => item.type === "mock")))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const config = useMemo<FilterConfig>(() => {
    const types = [...new Set(labs.map((lab) => lab.type))];
    const topics = [...new Set(labs.flatMap((lab) => lab.tags || []))].sort();
    const platforms = [...new Set(labs.flatMap((lab) => lab.platforms || []))];
    const technologies = [...new Set(labs.flatMap((lab) => lab.technologies || []))];
    const statuses = [...new Set(labs.map((lab) => lab.status))];
    return { types, topics, platforms, technologies, statuses };
  }, [labs]);

  const filteredLabs = useMemo(() => {
    return labs.filter((lab) => {
      if (selected.types?.length && !selected.types.includes(lab.type)) return false;
      if (selected.topics?.length && !(lab.tags || []).some((tag: string) => selected.topics?.includes(tag))) return false;
      if (selected.platforms?.length && !(lab.platforms || []).some((platform: string) => selected.platforms?.includes(platform))) return false;
      if (selected.technologies?.length && !(lab.technologies || []).some((tech: string) => selected.technologies?.includes(tech))) return false;
      if (selected.statuses?.length && !selected.statuses.includes(lab.status)) return false;
      return true;
    });
  }, [labs, selected]);

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Experiment Mocks</h1>
        <p className="text-lg text-muted-foreground">
          Framed experience representations that clarify structure, flow, and direction before implementation hardens.
        </p>
      </div>

      <ContentFilters
        config={config}
        selected={selected}
        onChange={setSelected}
        resultCount={filteredLabs.length}
        totalCount={labs.length}
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
      ) : filteredLabs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLabs.map((lab) => (
            <LabCard key={lab.slug || lab.id} lab={lab} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">No mock experiments match your current filters.</div>
      )}
    </div>
  );
}
