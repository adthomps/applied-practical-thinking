import { useState, useMemo } from "react";
import { labs } from "@/data/labs";
import { LabCard } from "@/components/apt/LabCard";
import { ContentFilters, FilterConfig, SelectedFilters } from "@/components/apt";

export default function Labs() {
  const [selected, setSelected] = useState<SelectedFilters>({
    types: [],
    topics: [],
    platforms: [],
    technologies: [],
    statuses: [],
  });

  // Extract unique filter options from labs data
  const config = useMemo<FilterConfig>(() => {
    const types = [...new Set(labs.map((lab) => lab.type))];
    const topics = [...new Set(labs.flatMap((lab) => lab.tags))].sort();
    const platforms = [...new Set(labs.flatMap((lab) => lab.platforms))];
    const technologies = [...new Set(labs.flatMap((lab) => lab.technologies))];
    const statuses = [...new Set(labs.map((lab) => lab.status))];
    return { types, topics, platforms, technologies, statuses };
  }, []);

  // Filter labs based on selections
  const filteredLabs = useMemo(() => {
    return labs.filter((lab) => {
      if (selected.types?.length && !selected.types.includes(lab.type)) {
        return false;
      }
      if (selected.topics?.length && !lab.tags.some((t) => selected.topics?.includes(t))) {
        return false;
      }
      if (selected.platforms?.length && !lab.platforms.some((p) => selected.platforms?.includes(p))) {
        return false;
      }
      if (selected.technologies?.length && !lab.technologies.some((t) => selected.technologies?.includes(t))) {
        return false;
      }
      if (selected.statuses?.length && !selected.statuses.includes(lab.status)) {
        return false;
      }
      return true;
    });
  }, [selected]);

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">APT Labs</h1>
        <p className="text-muted-foreground max-w-2xl">
          Experimental projects and reference implementations. Each lab explores
          a specific problem with working code, mocks, or documented decisions.
        </p>
      </div>

      <ContentFilters
        config={config}
        selected={selected}
        onChange={setSelected}
        resultCount={filteredLabs.length}
        totalCount={labs.length}
      />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabs.map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>

      {/* Empty state */}
      {filteredLabs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No labs match the selected filters.
          </p>
        </div>
      )}
    </div>
  );
}
