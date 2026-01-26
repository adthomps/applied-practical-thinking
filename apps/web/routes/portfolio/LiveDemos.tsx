import { useState, useMemo } from "react";
import { demos } from "@/data/demos";
import { DemoCard } from "@/components/apt/DemoCard";
import { ContentFilters, FilterConfig, SelectedFilters } from "@/components/apt";

export default function PortfolioLiveDemos() {
  const [selected, setSelected] = useState<SelectedFilters>({
    types: [],
    topics: [],
    platforms: [],
    technologies: [],
    statuses: [],
  });

  // Get unique filter options
  const config = useMemo<FilterConfig>(() => {
    const types = [...new Set(demos.map((d) => d.type))];
    const topics = [...new Set(demos.flatMap((d) => d.tags))].sort();
    const platforms = [...new Set(demos.flatMap((d) => d.platforms))];
    const technologies = [...new Set(demos.flatMap((d) => d.technologies))];
    const statuses = [...new Set(demos.map((d) => d.status))];
    return { types, topics, platforms, technologies, statuses };
  }, []);

  // Filter demos
  const filteredDemos = useMemo(() => {
    return demos.filter((demo) => {
      if (selected.types?.length && !selected.types.includes(demo.type)) {
        return false;
      }
      if (selected.topics?.length && !demo.tags.some((t) => selected.topics?.includes(t))) {
        return false;
      }
      if (selected.platforms?.length && !demo.platforms.some((p) => selected.platforms?.includes(p))) {
        return false;
      }
      if (selected.technologies?.length && !demo.technologies.some((t) => selected.technologies?.includes(t))) {
        return false;
      }
      if (selected.statuses?.length && !selected.statuses.includes(demo.status)) {
        return false;
      }
      return true;
    });
  }, [selected]);

  // Sort: live first, then coming-soon, then archived
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
          Real, running demos that make concepts observable and testable. Not
          products—clickable proof.
        </p>
      </div>

      <ContentFilters
        config={config}
        selected={selected}
        onChange={setSelected}
        resultCount={filteredDemos.length}
        totalCount={demos.length}
      />

      {sortedDemos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDemos.map((demo) => (
            <DemoCard key={demo.id} demo={demo} />
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
