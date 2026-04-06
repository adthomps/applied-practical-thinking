import {
  Download,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  ArrowRight,
} from "lucide-react";
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
import { useValidationReport } from "@/hooks/useValidationReport";

const VALIDATION_JSON_URL = "/docs/design/validation/LATEST.json";
const VALIDATION_MD_URL = "/docs/design/validation/LATEST.md";

function recommendationToTagVariant(recommendation: string) {
  if (recommendation === "pass") return "accent";
  if (recommendation === "pass_with_fixes") return "outline";
  return "primary";
}

function recommendationToLabel(recommendation: string) {
  if (recommendation === "pass_with_fixes") return "Pass with fixes";
  return recommendation.charAt(0).toUpperCase() + recommendation.slice(1);
}

function RecommendationIcon({ recommendation }: { recommendation: string }) {
  if (recommendation === "pass") return <ShieldCheck className="h-5 w-5" />;
  if (recommendation === "pass_with_fixes") return <ShieldAlert className="h-5 w-5" />;
  return <ShieldX className="h-5 w-5" />;
}

export default function PortfolioDesignValidation() {
  const { report, loading, error } = useValidationReport();

  return (
    <div className="container py-12 md:py-16 space-y-12">
      <SectionIntro
        title="Design Validation Status"
        description="Public snapshot of Design System, Architecture, and Docs Governance validation outcomes."
        titleClassName="text-3xl md:text-4xl"
        descriptionClassName="text-lg"
        eyebrow={<AptTag variant="accent">Validation</AptTag>}
      >
        <div className="flex flex-wrap gap-3">
          <AptButton variant="outline" asChild>
            <a href={VALIDATION_JSON_URL} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" />
              Open JSON
            </a>
          </AptButton>
          <AptButton variant="outline" asChild>
            <a href={VALIDATION_JSON_URL} download>
              <Download className="h-4 w-4" />
              Download JSON
            </a>
          </AptButton>
          <AptButton variant="outline" asChild>
            <a href={VALIDATION_MD_URL} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" />
              Open Markdown
            </a>
          </AptButton>
          <AptButton variant="outline" asChild>
            <a href={VALIDATION_MD_URL} download>
              <Download className="h-4 w-4" />
              Download Markdown
            </a>
          </AptButton>
        </div>
      </SectionIntro>

      {loading ? (
        <AptCard variant="subtle" padding="large">
          <AptCardHeader>
            <AptCardTitle>Loading validation report…</AptCardTitle>
          </AptCardHeader>
        </AptCard>
      ) : null}

      {error ? (
        <AptCard variant="subtle" padding="large">
          <AptCardHeader>
            <AptCardTitle>Validation report unavailable</AptCardTitle>
            <AptCardDescription>{error}</AptCardDescription>
          </AptCardHeader>
        </AptCard>
      ) : null}

      {report ? (
        <>
          <section>
            <AptCard variant="feature" padding="large">
              <AptCardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <RecommendationIcon recommendation={report.recommendation} />
                  </div>
                  <AptTag variant={recommendationToTagVariant(report.recommendation)}>
                    {recommendationToLabel(report.recommendation)}
                  </AptTag>
                </div>
                <AptCardTitle className="text-xl">Current Recommendation</AptCardTitle>
                <AptCardDescription>
                  Generated from the latest governance run at {report.run.timestamp || "unknown time"}.
                </AptCardDescription>
              </AptCardHeader>
            </AptCard>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {(["designSystem", "architecture", "docsGovernance"] as const).map((key) => {
              const section = report.sections[key];
              return (
                <AptCard key={key} variant="subtle">
                  <AptCardHeader>
                    <AptCardTitle className="text-lg">{key}</AptCardTitle>
                    <AptCardDescription>Status: {section?.status || "unknown"}</AptCardDescription>
                  </AptCardHeader>
                  <AptCardContent className="space-y-2 text-sm text-muted-foreground">
                    {(section?.checks || []).map((check) => (
                      <p key={check.name}>
                        {check.name}: {check.status} ({check.severity})
                      </p>
                    ))}
                  </AptCardContent>
                </AptCard>
              );
            })}
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <AptCard variant="default">
              <AptCardHeader>
                <AptCardTitle className="text-lg">Severity Summary</AptCardTitle>
              </AptCardHeader>
              <AptCardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Critical: {report.severitySummary.critical}</p>
                <p>High: {report.severitySummary.high}</p>
                <p>Medium: {report.severitySummary.medium}</p>
                <p>Low: {report.severitySummary.low}</p>
              </AptCardContent>
            </AptCard>
            <AptCard variant="default">
              <AptCardHeader>
                <AptCardTitle className="text-lg">Wave Progress</AptCardTitle>
              </AptCardHeader>
              <AptCardContent className="space-y-2 text-sm text-muted-foreground">
                {(report.waveProgress || []).map((wave) => (
                  <p key={wave.id}>
                    {wave.id}: {wave.completionPercent}% complete ({wave.passed}/{wave.total})
                  </p>
                ))}
              </AptCardContent>
            </AptCard>
          </section>

          <section>
            <AptCard variant="subtle">
              <AptCardHeader>
                <AptCardTitle className="text-lg">Exception Summary</AptCardTitle>
                <AptCardDescription>Declared rollout exceptions included in current governance output.</AptCardDescription>
              </AptCardHeader>
              <AptCardContent className="space-y-2 text-sm text-muted-foreground">
                {(report.exceptionSummary || []).length === 0 ? (
                  <p>None</p>
                ) : (
                  report.exceptionSummary.map((exception, index) => (
                    <p key={`${exception.waveId || "unscoped"}-${index}`}>
                      [{exception.waveId || "unscoped"}] {exception.reason}
                    </p>
                  ))
                )}
              </AptCardContent>
            </AptCard>
          </section>

          <section className="pt-2">
            <AptButton variant="ghost" asChild>
              <a href="/design/review-bundle">
                Open AI Review Bundle
                <ArrowRight className="h-4 w-4" />
              </a>
            </AptButton>
          </section>
        </>
      ) : null}
    </div>
  );
}
