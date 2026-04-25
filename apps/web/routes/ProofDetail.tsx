import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ExternalLink, AlertTriangle } from "lucide-react";
import { AptButton, AptCard, AptTag, RuntimeConfigNotice } from "@/components/apt";
import { useFeedDetailQuery } from "@/hooks/useFeedQueries";
import { systems as systemDefinitions } from "@/data/systems";
import { getWorkerApiConfigError } from "@/src/services/api";
import { usePageMetadata } from "@/hooks/usePageMetadata";

function toLinkTarget(href: string) {
  return href.startsWith("http") ? "_blank" : undefined;
}

function toLinkRel(href: string) {
  return href.startsWith("http") ? "noopener noreferrer" : undefined;
}

export default function SystemDetail() {
  const { id } = useParams();
  const detailQuery = useFeedDetailQuery("proof", id);
  const item = detailQuery.data?.item?.kind === "system" ? detailQuery.data.item : null;
  const loading = detailQuery.isLoading;
  const error = detailQuery.error?.message || (!loading && !item ? "System not found" : null);

  const systemDefinition = useMemo(
    () => systemDefinitions.find((entry) => entry.id === item?.id),
    [item?.id]
  );
  const hasMissingState = !loading && !item;

  usePageMetadata(
    hasMissingState
      ? {
          title: "System not found",
          description: "The requested proof system could not be found.",
          noIndex: true,
        }
      : item
        ? {
            title: item.title,
            description: item.description,
            imageAlt: item.title,
          }
        : {
            title: "Proof",
            description: "Loading system details.",
          }
  );

  if (loading) return <div className="container py-12">Loading…</div>;

  if (error) {
    const configError = getWorkerApiConfigError();
    if (configError) {
      return (
        <div className="container py-12">
          <RuntimeConfigNotice
            message={configError.message}
            envVar={configError.envVar}
            expectedValue={configError.expectedProductionValue}
          />
        </div>
      );
    }
  }

  if (!item) return <div className="container py-12 text-destructive">System not found</div>;

  const statusLabel = "Stable";
  const technologies = item.topics || systemDefinition?.concepts || [];
  const decisions = systemDefinition?.decisions || [];
  const tradeoffs = systemDefinition?.tradeoffs || [];
  const primaryActionHref = systemDefinition?.links?.demo || "/";
  const docsHref = systemDefinition?.links?.docs || "/insights";

  return (
    <div className="container py-12 md:py-16">
      <Link
        to="/proof"
        className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Proof
      </Link>

      <AptCard className="mx-auto max-w-6xl" padding="none">
        <div className="space-y-8 p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <AptTag variant="primary">System</AptTag>
                <AptTag variant="secondary">{statusLabel}</AptTag>
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{item.title}</h1>
                <p className="mt-3 text-xl text-primary">
                  {systemDefinition?.purpose || item.description}
                </p>
              </div>
            </div>

            {technologies.length > 0 ? (
              <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
                {technologies.slice(0, 3).map((tech) => (
                  <AptTag key={tech} variant="muted">
                    {tech}
                  </AptTag>
                ))}
              </div>
            ) : null}
          </div>

          <p className="max-w-4xl text-lg leading-relaxed text-muted-foreground">
            {systemDefinition?.description || item.description}
          </p>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">Key Decisions</h2>
              {decisions.length > 0 ? (
                <ul className="space-y-3">
                  {decisions.map((decision) => (
                    <li key={decision} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">Decision notes will be added as this system evolves.</p>
              )}
            </div>

            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4">
              <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-foreground">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                Tradeoffs
              </h2>
              {tradeoffs.length > 0 ? (
                <ul className="space-y-2 text-muted-foreground">
                  {tradeoffs.map((tradeoff) => (
                    <li key={tradeoff}>- {tradeoff}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">Tradeoff notes will be added as this system matures.</p>
              )}
            </div>
          </div>

          <div className="border-t border-border/60 pt-6">
            <div className="flex flex-wrap gap-3">
              <a href={primaryActionHref} target={toLinkTarget(primaryActionHref)} rel={toLinkRel(primaryActionHref)}>
                <AptButton>
                  <ExternalLink className="h-4 w-4" />
                  View System
                </AptButton>
              </a>

              <a href={docsHref} target={toLinkTarget(docsHref)} rel={toLinkRel(docsHref)}>
                <AptButton variant="outline">
                  <ExternalLink className="h-4 w-4" />
                  Docs
                </AptButton>
              </a>
            </div>
          </div>
        </div>
      </AptCard>
    </div>
  );
}
