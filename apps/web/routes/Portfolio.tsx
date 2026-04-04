import { useMemo, useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import { AptButton, AptCard, LandingSectionCardGrid, SectionIntro } from "@/components/apt";
import { siteConfig } from "@/data/site";
import { getWorkerApiConfigError, tryGetWorkerApiUrl } from "@/src/services/api";
import { downloadWorkerMarkdown } from "@/src/services/download";
import { 
  Palette, 
  Brain, 
  Network,
  Layers3,
  Route,
  ArrowRight,
  FileText,
} from "lucide-react";

const designNav = siteConfig.nav.find(n => n.path === "/design");
const designSections = designNav?.children ?? [];

const sectionIcons: Record<string, ComponentType<{ className?: string }>> = {
  "/design/system": Palette,
  "/design/thinking": Brain,
  "/design/architecture": Network,
  "/design/systems": Layers3,
  "/design/content-strategy": Route,
};

type DesignFilter = "all" | "doctrine" | "reference";

function getDesignSectionCategory(path: string): DesignFilter {
  return path === "/design/systems" ? "reference" : "doctrine";
}

export default function Portfolio() {
  const [filter, setFilter] = useState<DesignFilter>("all");
  const overviewDocUrl = tryGetWorkerApiUrl("/api/design/docs/overview");
  const configError = getWorkerApiConfigError();

  const handleOverviewMarkdownDownload = async () => {
    await downloadWorkerMarkdown("/api/design/docs/overview", "apt-design-overview.md");
  };

  const landingCards = (designSections ?? []).map((section) => ({
    ...section,
    icon: sectionIcons[section.path] ?? Brain,
    metaLabel: getDesignSectionCategory(section.path) === "reference" ? "Reference" : "Doctrine",
  }));

  const filteredSections = useMemo(() => {
    if (filter === "all") return designSections;
    return designSections.filter((section) => getDesignSectionCategory(section.path) === filter);
  }, [filter]);

  return (
    <div className="container py-8 md:py-12 space-y-12">
      <section>
        <SectionIntro
          title="Design"
          description="The public operating model for APT: how problems are framed, how the system is expressed, how architecture enforces it, and where stable system references live."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
        >
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
          {!overviewDocUrl && configError ? (
            <p className="text-sm text-muted-foreground mt-3">
              Configure <code>{configError.envVar}</code> on the Pages project to enable full-doc links.
            </p>
          ) : null}
        </SectionIntro>
      </section>

      <LandingSectionCardGrid items={landingCards} />

      <section className="space-y-6">
        <SectionIntro
          title="Browse all Design areas"
          description="Move across doctrine and reference layers to see how APT defines problems, expresses systems, and documents the reusable models behind the work."
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
            variant={filter === "doctrine" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter("doctrine")}
          >
            Doctrine
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
          {filteredSections.map((section) => {
            const Icon = sectionIcons[section.path] ?? Brain;
            const category = getDesignSectionCategory(section.path) === "reference" ? "Reference" : "Doctrine";

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
                          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{category}</p>
                          <h3 className="text-lg font-semibold">{section.label}</h3>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                      {"tagline" in section && section.tagline ? (
                        <p className="text-xs text-primary/80 italic">{section.tagline}</p>
                      ) : null}
                    </div>
                  </div>
                </AptCard>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
