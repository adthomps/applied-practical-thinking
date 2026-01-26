import { useState, useMemo } from "react";
import { labs } from "@/data/labs";
import { LabCard } from "@/components/apt/LabCard";
import { ContentFilters, FilterConfig, SelectedFilters } from "@/components/apt";

export default function PortfolioLabs() {
  const [selected, setSelected] = useState<SelectedFilters>({
    types: [],
    topics: [],
    platforms: [],
    technologies: [],
    statuses: [],
  });

  // Get unique filter options
  const config = useMemo<FilterConfig>(() => {
    const types = [...new Set(labs.map((lab) => lab.type))];
    const topics = [...new Set(labs.flatMap((lab) => lab.tags))].sort();
    const platforms = [...new Set(labs.flatMap((lab) => lab.platforms))];
    const technologies = [...new Set(labs.flatMap((lab) => lab.technologies))];
    const statuses = [...new Set(labs.map((lab) => lab.status))];
    return { types, topics, platforms, technologies, statuses };
  }, []);

  // Filter labs
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
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Labs
        </h1>
        <p className="text-lg text-muted-foreground">
          AI-assisted concept construction using tools like Lovable, Figma Make, and Copilot.
          Ideas given shape—early, imperfect, and intentional.
        </p>
      </div>

      <ContentFilters
        config={config}
        selected={selected}
        onChange={setSelected}
        resultCount={filteredLabs.length}
        totalCount={labs.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLabs.map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>

      {filteredLabs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No labs match your current filters.
        </div>
      )}
    </div>
  );
}
