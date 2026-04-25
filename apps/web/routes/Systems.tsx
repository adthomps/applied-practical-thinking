import { useMemo } from "react";
import { AlertTriangle, CheckCircle2, FileText, Layers3 } from "lucide-react";
import { AptButton, AptCard, AptCardContent, AptCardHeader, AptCardTitle, AptTag, DesignDocVersionSwitcher, ReviewBundleCallout, RuntimeConfigNotice, SectionIntro } from "@/components/apt";
import { SystemCard } from "@/components/apt/SystemCard";
import { getWorkerApiConfigError, tryGetWorkerApiUrl } from "@/src/services/api";
import { useDesignDocVersion } from "@/hooks/useDesignDocVersion";
import { downloadWorkerMarkdown } from "@/src/services/download";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useSystemsIndexQuery } from "@/hooks/useContentAggregateQueries";

export default function Systems() {
  usePageMetadata({
    title: "Proof",
    description: "Stable system references that capture reusable models, key decisions, tradeoffs, and related learning material.",
  });

  const systemsVersion = useDesignDocVersion("systems");
  const systemsQuery = useSystemsIndexQuery();

  const operatingSignals = [
    {
      title: "Capture stable models, not passing ideas",
      description: "A system belongs here when it has enough repeatable structure to be reused, taught, or referenced across projects.",
    },
    {
      title: "Use it when experiments have converged",
      description: "Experiments prove or explore. Systems document the models and patterns that survived that exploration.",
    },
    {
      title: "Favor reusable logic over project trivia",
      description: "What belongs here should clarify a pattern, boundary, or operating model that can travel beyond one isolated implementation.",
    },
  ];

  const artifacts = [
    "A stable model with a clear purpose and scope",
    "Key decisions that shape how the model works",
    "Tradeoffs that explain what the model optimizes for",
    "Links back to related experiments and learning content",
  ];

  const antiPatterns = [
    {
      title: "Archive Everything",
      description: "Not every finished project or experiment becomes a system. If it is not reusable as a model, it does not belong here.",
    },
    {
      title: "Pattern Without Context",
      description: "A reusable pattern is incomplete if it does not explain the problem it solves, the boundary it assumes, and the cost it introduces.",
    },
    {
      title: "Reference Drift",
      description: "A system stops being useful when the public reference no longer matches the actual design, code, or deployment reality.",
    },
  ];
  const systemsDocUrl = tryGetWorkerApiUrl(systemsVersion.downloadApiPath);
  const systemsCanonicalUrl = systemsVersion.canonicalPath || null;

  const handleSystemsMarkdownDownload = async () => {
    const majorSuffix = systemsVersion.activeMajor ? `-v${systemsVersion.activeMajor}` : "";
    await downloadWorkerMarkdown(systemsVersion.downloadApiPath, `apt-design-systems${majorSuffix}.md`);
  };

  const systems = useMemo(() => systemsQuery.data || [], [systemsQuery.data]);
  const loading = systemsQuery.isLoading;

  if (loading) return <div className="container py-12 text-center">Loading systems…</div>;
  if (systemsQuery.isError) {
    const configError = getWorkerApiConfigError();
    return (
      <div className="container py-12">
        {configError ? (
          <RuntimeConfigNotice
            message={configError.message}
            envVar={configError.envVar}
            expectedValue={configError.expectedProductionValue}
          />
        ) : (
          <div className="text-center text-destructive">{systemsQuery.error?.message}</div>
        )}
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <SectionIntro
        title="Reference Models"
        description="Inside APT, Systems are the stable reference layer: reusable models, patterns, and decision structures that persist after exploratory work has been clarified."
        titleClassName="text-3xl md:text-4xl"
        descriptionClassName="text-lg max-w-2xl"
        eyebrow={<AptTag variant="accent">Systems</AptTag>}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-3">
          <AptButton
            variant="outline"
            type="button"
            onClick={() => {
              void handleSystemsMarkdownDownload();
            }}
            disabled={!systemsDocUrl}
          >
            <FileText className="h-4 w-4" />
            Download Systems Markdown
          </AptButton>
          {systemsCanonicalUrl ? (
            <AptButton variant="ghost" asChild>
              <a href={systemsCanonicalUrl} target="_blank" rel="noreferrer">
                Open canonical
              </a>
            </AptButton>
          ) : null}
        </div>
        <DesignDocVersionSwitcher versionState={systemsVersion} />
      </SectionIntro>

      <AptCard variant="subtle" className="mb-8">
        <div className="p-6 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Proof</span> is the stable implementation layer: reusable reference models with documented purpose, decisions, and tradeoffs.
          If you want early exploration, start in <span className="font-semibold text-foreground">Labs</span>. If you want complete and demonstrable system patterns, start here.
        </div>
      </AptCard>

      <section className="mb-12">
        <SectionIntro
          title="When to Capture a System"
          description="A model belongs here when it has matured beyond exploration and can now serve as a reusable reference."
          className="mb-6"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {operatingSignals.map((signal) => (
            <AptCard key={signal.title} variant="subtle">
              <AptCardHeader>
                <AptCardTitle className="text-lg">{signal.title}</AptCardTitle>
              </AptCardHeader>
              <AptCardContent>
                <p className="text-sm text-muted-foreground">{signal.description}</p>
              </AptCardContent>
            </AptCard>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionIntro
          title="What a Good System Contains"
          description="Each entry should be useful as a reusable model, not just a record of something that happened once."
          className="mb-6"
        />
        <AptCard variant="default" padding="large">
          <div className="grid gap-4 md:grid-cols-2">
            {artifacts.map((artifact) => (
              <div key={artifact} className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/40 p-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">{artifact}</p>
              </div>
            ))}
          </div>
        </AptCard>
      </section>

      <section className="mb-12">
        <SectionIntro
          title="Reference Failure Modes"
          description="These are the most common ways a system reference becomes less useful than the work it is supposed to clarify."
          className="mb-6"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {antiPatterns.map((item) => (
            <AptCard key={item.title} variant="subtle">
              <AptCardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <AptCardTitle className="text-lg">{item.title}</AptCardTitle>
                </div>
              </AptCardHeader>
              <AptCardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </AptCardContent>
            </AptCard>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <SectionIntro
          title="Browse Reference Models"
          description="These models capture reusable structures and patterns inside the APT design doctrine."
          className="mb-6"
        />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systems.map((system) => (
          <SystemCard key={system.id} system={system} to={`/proof/${system.id}`} />
        ))}
      </div>

      <AptCard variant="feature" padding="large" className="mt-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <Layers3 className="h-6 w-6" />
            </div>
            <div>
              <AptTag variant="outline" size="sm" className="mb-2">Framing Note</AptTag>
              <h3 className="text-xl font-semibold mb-1">“Systems” currently means reference models</h3>
              <p className="text-muted-foreground">
                If we rename this area later, the clearest candidates are <span className="font-medium text-foreground">Reference Models</span>,
                <span className="font-medium text-foreground"> Pattern Library</span>, or
                <span className="font-medium text-foreground"> Operating Models</span>. Right now the page copy carries that meaning without changing the IA.
              </p>
            </div>
          </div>
        </div>
      </AptCard>

      <ReviewBundleCallout />
    </div>
  );
}
