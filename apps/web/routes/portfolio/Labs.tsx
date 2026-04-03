import { useEffect, useMemo, useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import { LabCard } from "@/components/apt/LabCard";
import {
  AptButton,
  ContentFilters,
  FilterConfig,
  LandingSectionCardGrid,
  SelectedFilters,
  RuntimeConfigNotice,
} from "@/components/apt";
import { fetchContentIndex, ContentIndexItem } from "@/src/services/contentIndex";
import { getWorkerApiConfigError } from "@/src/services/api";
import { siteConfig } from "@/data/site";
import { FlaskConical, Lightbulb, LayoutTemplate, PlayCircle } from "lucide-react";

const experimentsNav = siteConfig.nav.find((item) => item.path === "/experiments");
const experimentIcons: Record<string, ComponentType<{ className?: string }>> = {
  "/experiments": FlaskConical,
  "/experiments/concepts": Lightbulb,
  "/experiments/mocks": LayoutTemplate,
  "/experiments/live-demos": PlayCircle,
};

export default function PortfolioLabs() {
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
      .then((data) => setLabs(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

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

  const landingCards = (experimentsNav?.children ?? []).map((section) => ({
    ...section,
    icon: experimentIcons[section.path] ?? FlaskConical,
    metaLabel: "Experiment",
  }));

  return (
    <div className="container py-8 md:py-12 space-y-12">
      <section className="max-w-3xl space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Experiments</h1>
        <p className="text-lg text-muted-foreground">
          Concepts, mocks, prototypes, and live demonstrations that make ideas tangible before they become stable references.
        </p>
      </section>

      <LandingSectionCardGrid items={landingCards} />

      <section className="space-y-6">
        <div className="max-w-3xl space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Browse all Experiments</h2>
          <p className="text-sm text-muted-foreground">
            Filter the exploratory work by type, topic, platform, technology, and status to move from broad exploration into specific proof.
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
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredLabs.map((lab) => (
                <LabCard key={lab.slug || lab.id} lab={lab} />
              ))}
            </div>

            {filteredLabs.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No experiments match your current filters.
              </div>
            )}

            <div className="mt-10 rounded-xl border border-border bg-muted/20 p-6">
              <h2 className="text-lg font-semibold mb-2">Looking for interactive proof?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Live Demos sit under Experiments as the runnable proof layer. Start with concepts or mocks for context, then open demos when you want to interact with the work.
              </p>
              <AptButton variant="ghost" size="sm" asChild>
                <Link to="/experiments/live-demos">Browse Live Demos</Link>
              </AptButton>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
