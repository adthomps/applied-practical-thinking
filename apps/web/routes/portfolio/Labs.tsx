import { useMemo, useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import { LabCard } from "@/components/apt/LabCard";
import {
  AptButton,
  ContentFilters,
  FilterConfig,
  LandingSectionCardGrid,
  SectionIntro,
  SelectedFilters,
  RuntimeConfigNotice,
} from "@/components/apt";
import { getWorkerApiConfigError } from "@/src/services/api";
import { FlaskConical, Lightbulb, LayoutTemplate, PlayCircle } from "lucide-react";
import { useExperimentsLabsIndexQuery } from "@/hooks/useContentAggregateQueries";

const labsSections = [
  {
    label: "All Labs",
    path: "/labs",
    description: "The full index of exploratory work across concepts, mocks, prototypes, and live demos.",
  },
  {
    label: "Concepts",
    path: "/labs/concepts",
    description: "Early conceptual builds that shape an idea into a coherent direction.",
  },
  {
    label: "Mocks",
    path: "/labs/mocks",
    description: "Structured representations that clarify flows and experience framing.",
  },
  {
    label: "Live Demos",
    path: "/labs/live-demos",
    description: "Runnable demonstrations that expose implementation behavior.",
  },
] as const;

const experimentIcons: Record<string, ComponentType<{ className?: string }>> = {
  "/labs": FlaskConical,
  "/labs/concepts": Lightbulb,
  "/labs/mocks": LayoutTemplate,
  "/labs/live-demos": PlayCircle,
};

export default function PortfolioLabs() {
  const [selected, setSelected] = useState<SelectedFilters>({
    types: [],
    topics: [],
    platforms: [],
    technologies: [],
    statuses: [],
  });

  const labsQuery = useExperimentsLabsIndexQuery();
  const labs = useMemo(() => labsQuery.data || [], [labsQuery.data]);
  const loading = labsQuery.isLoading;
  const error = labsQuery.error?.message || null;

  // Get unique filter options
  const config = useMemo<FilterConfig>(() => {
    const types = [...new Set(labs.map((lab) => lab.type))];
    const topics = [...new Set(labs.flatMap((lab) => lab.tags || []))].sort();
    const platforms = [...new Set(labs.flatMap((lab) => lab.platforms || []))];
    const technologies = [...new Set(labs.flatMap((lab) => lab.technologies || []))];
    const statuses = [...new Set(labs.map((lab) => lab.status))];
    return { types, topics, platforms, technologies, statuses };
  }, [labs]);

  // Filter labs
  const filteredLabs = useMemo(() => {
    return labs.filter((lab) => {
      if (selected.types?.length && !selected.types.includes(lab.type)) {
        return false;
      }
      if (selected.topics?.length && !(lab.tags || []).some((t: string) => selected.topics?.includes(t))) {
        return false;
      }
      if (selected.platforms?.length && !(lab.platforms || []).some((p: string) => selected.platforms?.includes(p))) {
        return false;
      }
      if (selected.technologies?.length && !(lab.technologies || []).some((t: string) => selected.technologies?.includes(t))) {
        return false;
      }
      if (selected.statuses?.length && !selected.statuses.includes(lab.status)) {
        return false;
      }
      return true;
    });
  }, [selected, labs]);

  const landingCards = labsSections.map((section) => ({
    ...section,
    icon: experimentIcons[section.path] ?? FlaskConical,
    metaLabel: "Lab",
  }));

  return (
    <div className="container py-8 md:py-12 space-y-12">
      <section>
        <SectionIntro
          title="Labs"
          description="Concepts, mocks, prototypes, and live demonstrations that make ideas tangible before they become stable proof."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
        />
      </section>

      <LandingSectionCardGrid items={landingCards} />

      <section className="space-y-6">
        <SectionIntro
          title="Browse all Labs"
          description="Filter exploratory work by type, topic, platform, technology, and status to move from discovery into implementation proof."
        />

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
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredLabs.map((lab) => (
                <LabCard key={lab.slug || lab.id} lab={lab} />
              ))}
            </div>

            {filteredLabs.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No labs match your current filters.
              </div>
            )}

            <div className="mt-10 rounded-xl border border-border bg-muted/20 p-6">
              <h2 className="text-lg font-semibold mb-2">Looking for interactive proof?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Live demos sit under Labs as the runnable proof layer. Start with concepts or mocks for context, then open demos when you want interactive behavior.
              </p>
              <AptButton variant="ghost" size="sm" asChild>
                <Link to="/labs/live-demos">Browse Live Demos</Link>
              </AptButton>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
