import { useMemo, useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import { AptButton, AptCard, AptTag, DesignDocVersionSwitcher, SectionIntro } from "@/components/apt";
import {
  designSectionCatalog,
  mostUsedDesignSectionPaths,
  type DesignSection,
  type DesignSectionCategory,
} from "@/data/designSections";
import { aptPrinciplesFrameworkIndex } from "@/data/aptPrinciples";
import { getWorkerApiConfigError, tryGetWorkerApiUrl } from "@/src/services/api";
import { useDesignDocVersion } from "@/hooks/useDesignDocVersion";
import { downloadWorkerMarkdown } from "@/src/services/download";
import { 
  Palette, 
  Brain, 
  Target,
  Network,
  Layers3,
  Route,
  ArrowRight,
  FileText,
  Bot,
  BookOpenText,
  Shapes,
  LifeBuoy,
  Database,
} from "lucide-react";

const designSections = designSectionCatalog;

const sectionIcons: Record<string, ComponentType<{ className?: string }>> = {
  "/design/system": Palette,
  "/design/thinking": Brain,
  "/design/principles": Target,
  "/design/architecture": Network,
  "/design/systems": Layers3,
  "/design/content-strategy": Route,
  "/design/review-bundle": Bot,
  "/design/docs": BookOpenText,
  "/design/patterns": Shapes,
  "/design/support": LifeBuoy,
  "/design/knowledge-engine": Database,
};

type DesignFilter = "all" | DesignSectionCategory;

function getDesignSectionCategoryLabel(category: DesignSectionCategory) {
  if (category === "core") return "Core";
  if (category === "runtime") return "Runtime";
  return "Reference";
}

export default function Portfolio() {
  const [filter, setFilter] = useState<DesignFilter>("all");
  const overviewVersion = useDesignDocVersion("overview");
  const overviewDocUrl = tryGetWorkerApiUrl(overviewVersion.downloadApiPath);
  const overviewCanonicalUrl = overviewVersion.canonicalPath || null;
  const configError = getWorkerApiConfigError();

  const handleOverviewMarkdownDownload = async () => {
    const majorSuffix = overviewVersion.activeMajor ? `-v${overviewVersion.activeMajor}` : "";
    await downloadWorkerMarkdown(overviewVersion.downloadApiPath, `apt-design-overview${majorSuffix}.md`);
  };

  const mostUsedSet = useMemo(() => new Set(mostUsedDesignSectionPaths), []);
  const mostUsedSections = useMemo(
    () => designSections.filter((section) => mostUsedSet.has(section.path)),
    [mostUsedSet]
  );

  const filteredSections = useMemo(() => {
    if (filter === "all") return designSections;
    return designSections.filter((section) => section.category === filter);
  }, [filter]);

  function renderDesignCard(section: DesignSection) {
    const Icon = sectionIcons[section.path] ?? Brain;
    const category = getDesignSectionCategoryLabel(section.category);

    return (
      <Link key={section.path} to={section.path} className="block group">
        <AptCard variant="interactive" className="h-full">
          <div className="p-6 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <AptTag variant="outline" size="sm" className="mb-2">{category}</AptTag>
                  <h3 className="text-lg font-semibold">{section.label}</h3>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">{section.description}</p>
              {section.tagline ? <p className="text-xs text-primary/80 italic">{section.tagline}</p> : null}
            </div>
          </div>
        </AptCard>
      </Link>
    );
  }

  return (
    <div className="container py-8 md:py-12 space-y-12">
      <section>
        <SectionIntro
          title="Design"
          description="The public operating model for APT: how problems are framed, how the system is expressed, how architecture enforces it, and where stable system references live."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
        >
          <div className="flex flex-wrap gap-3">
            <AptButton asChild>
              <Link to="/design/review-bundle">
                <Bot className="h-4 w-4" />
                Open AI Review Bundle
              </Link>
            </AptButton>
            <AptButton
              variant="outline"
              type="button"
              onClick={() => {
                void handleOverviewMarkdownDownload();
              }}
              disabled={!overviewDocUrl}
            >
              <FileText className="h-4 w-4" />
              Download Design Markdown
            </AptButton>
            {overviewCanonicalUrl ? (
              <AptButton variant="ghost" asChild>
                <a href={overviewCanonicalUrl} target="_blank" rel="noreferrer">
                  Open canonical
                </a>
              </AptButton>
            ) : null}
          </div>
          <DesignDocVersionSwitcher versionState={overviewVersion} />
          {!overviewDocUrl && configError ? (
            <p className="text-sm text-muted-foreground mt-3">
              Configure <code>{configError.envVar}</code> on the Pages project to enable full-doc links.
            </p>
          ) : null}
        </SectionIntro>
      </section>

      <section>
        <SectionIntro
          title="Principles Framework Index"
          description="Canonical 11-entry principles listing used across nav and doctrine surfaces."
          className="mb-6"
        />
        <AptCard variant="feature" padding="large">
          <div className="space-y-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <AptTag variant="accent" size="sm">Canonical Framework</AptTag>
                <h2 className="text-2xl font-semibold tracking-tight">APT Principles Framework</h2>
                <p className="text-sm text-muted-foreground">
                  Use this index to jump directly to the framework or any principle group section.
                </p>
              </div>
              <AptButton asChild>
                <Link to="/design/principles">
                  Open Principles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </AptButton>
            </div>
            <ol className="grid gap-3 md:grid-cols-2">
              {aptPrinciplesFrameworkIndex.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className="flex items-start justify-between gap-3 rounded-md border border-border/60 bg-background/40 p-3 transition-colors hover:bg-accent/10"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </AptCard>
      </section>

      <section className="space-y-6">
        <SectionIntro
          title="Most Used"
          description="Start here for the most common design paths across doctrine, runtime docs, and reference review."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mostUsedSections.map(renderDesignCard)}
        </div>
      </section>

      <section className="space-y-6">
        <SectionIntro
          title="All Docs"
          description="The full design catalog, grouped by Core, Runtime, and Reference to keep scanning predictable as content grows."
        />

        <div className="flex flex-wrap gap-2">
          <AptButton
            variant={filter === "all" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </AptButton>
          <AptButton
            variant={filter === "core" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter("core")}
          >
            Core
          </AptButton>
          <AptButton
            variant={filter === "runtime" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter("runtime")}
          >
            Runtime
          </AptButton>
          <AptButton
            variant={filter === "reference" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter("reference")}
          >
            Reference
          </AptButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSections.map(renderDesignCard)}
        </div>
      </section>
    </div>
  );
}
