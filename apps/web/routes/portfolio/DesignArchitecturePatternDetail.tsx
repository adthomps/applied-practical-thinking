import { Link, Navigate, useParams } from "react-router-dom";
import {
  AptButton,
  AptCard,
  AptCardContent,
  AptCardDescription,
  AptCardHeader,
  AptCardTitle,
  AptTag,
  SectionIntro,
} from "@/components/apt";
import { ArrowLeft, ArrowRight, AlertTriangle, FileText, Network } from "lucide-react";
import {
  architecturePatterns,
  getArchitecturePattern,
} from "@/data/architecturePatterns";
import { getWorkerApiConfigError, tryGetWorkerApiUrl } from "@/src/services/api";
import { downloadWorkerMarkdown } from "@/src/services/download";

export default function DesignArchitecturePatternDetail() {
  const { pattern } = useParams<{ pattern: string }>();
  const entry = pattern ? getArchitecturePattern(pattern) : null;
  const architectureDocUrl = tryGetWorkerApiUrl("/api/design/docs/architecture");
  const configError = getWorkerApiConfigError();

  const handleArchitectureMarkdownDownload = async () => {
    await downloadWorkerMarkdown("/api/design/docs/architecture", "apt-design-architecture.md");
  };

  if (!entry) {
    return <Navigate to="/design/architecture" replace />;
  }

  const relatedPatterns = architecturePatterns.filter((item) => item.slug !== entry.slug).slice(0, 3);

  return (
    <div className="container py-12 md:py-16 space-y-12">
      <section>
        <AptButton variant="ghost" size="sm" asChild>
          <Link to="/design/architecture">
            <ArrowLeft className="h-4 w-4" />
            Back to Design Architecture
          </Link>
        </AptButton>
      </section>

      <section>
        <SectionIntro
          title={entry.title}
          description={entry.description}
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
          eyebrow={
            <div className="flex items-center gap-3">
              <AptTag variant="accent">Architectural Pattern</AptTag>
              <AptTag variant="outline">{entry.title}</AptTag>
            </div>
          }
        >
          <AptButton
            variant="outline"
            onClick={() => {
              void handleArchitectureMarkdownDownload();
            }}
            disabled={!architectureDocUrl}
          >
            <FileText className="h-4 w-4" />
            Download Architecture Markdown
          </AptButton>
          {!architectureDocUrl && configError ? (
            <p className="text-sm text-muted-foreground mt-3">
              Configure <code>{configError.envVar}</code> on the Pages project to enable full-doc links.
            </p>
          ) : null}
        </SectionIntro>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <AptCard variant="default" padding="large">
          <AptCardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">{entry.icon}</div>
              <AptCardTitle>Pattern Overview</AptCardTitle>
            </div>
            <AptCardDescription>{entry.whyItMatters}</AptCardDescription>
          </AptCardHeader>
          <AptCardContent>
            <div className="space-y-5">
              <div>
                <AptTag variant="outline" size="sm" className="mb-2">When to apply</AptTag>
                <p className="text-sm text-muted-foreground">{entry.when}</p>
              </div>
              <div>
                <AptTag variant="outline" size="sm" className="mb-3">Hard rules</AptTag>
                <ul className="space-y-2">
                  {entry.rules.map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AptCardContent>
        </AptCard>

        <AptCard variant="subtle" padding="large">
          <AptCardHeader>
            <AptCardTitle>Expected Outputs</AptCardTitle>
            <AptCardDescription>
              The durable artifacts this pattern should leave behind when it is applied well.
            </AptCardDescription>
          </AptCardHeader>
          <AptCardContent>
            <div className="space-y-3">
              {entry.artifacts.map((artifact) => (
                <div key={artifact} className="rounded-lg border border-border/60 bg-background/40 p-4 text-sm text-muted-foreground">
                  {artifact}
                </div>
              ))}
            </div>
          </AptCardContent>
        </AptCard>
      </section>

      <section>
        <AptCard variant="subtle" padding="large">
          <AptCardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <AptCardTitle>Failure Mode to Avoid</AptCardTitle>
            </div>
            <AptCardDescription>
              The common way this pattern becomes decorative or nominal instead of structurally useful.
            </AptCardDescription>
          </AptCardHeader>
          <AptCardContent>
            <p className="text-sm text-muted-foreground">{entry.antiPattern}</p>
          </AptCardContent>
        </AptCard>
      </section>

      <section className="space-y-6">
        <SectionIntro
          title="Related Patterns"
          description="Other architecture patterns inside APT that commonly reinforce this one."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedPatterns.map((patternEntry) => (
            <Link key={patternEntry.slug} to={`/design/architecture/${patternEntry.slug}`} className="block group">
              <AptCard variant="interactive" className="h-full">
                <div className="p-6 space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                        {patternEntry.icon}
                      </div>
                      <div>
                        <AptTag variant="outline" size="sm" className="mb-2">Pattern</AptTag>
                        <h3 className="text-lg font-semibold">{patternEntry.title}</h3>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{patternEntry.description}</p>
                    <p className="text-xs text-primary/80 italic">{patternEntry.when}</p>
                  </div>
                </div>
              </AptCard>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <AptCard variant="feature" padding="large">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Network className="h-6 w-6" />
              </div>
              <div>
                <AptTag variant="outline" size="sm" className="mb-2">Design Architecture</AptTag>
                <h3 className="text-xl font-semibold mb-1">Return to the Full Pattern Set</h3>
                <p className="text-muted-foreground">
                  Use the overview page to compare patterns and connect them back to the broader APT architecture model.
                </p>
              </div>
            </div>

            <AptButton variant="outline" asChild>
              <Link to="/design/architecture">
                All Architectural Patterns
                <ArrowRight className="h-4 w-4" />
              </Link>
            </AptButton>
          </div>
        </AptCard>
      </section>
    </div>
  );
}
