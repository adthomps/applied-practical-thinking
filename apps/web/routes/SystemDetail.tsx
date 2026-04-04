
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContentIndexItem } from "@/src/services/contentIndex";
import { AptButton, AptCard, AptTag, RuntimeConfigNotice } from "@/components/apt";
import { ContentDetailPage } from "@/components/apt/ContentDetailPage";
import { systems as systemDefinitions } from "@/data/systems";
import { loadAllContentIndexes, resolveRelatedItems } from "@/src/services/relatedContent";
import { useContentDetail } from "@/hooks/useContentDetail";
import { getWorkerApiConfigError } from "@/src/services/api";
import { ExternalLink, Network } from "lucide-react";

export default function SystemDetail() {
  const { id } = useParams();
  const { item, markdown, loading, error } = useContentDetail({
    indexTypes: ["systems"],
    idOrSlug: id,
    match: "id",
  });
  const [relatedItems, setRelatedItems] = useState<ContentIndexItem[]>([]);

  useEffect(() => {
    if (!item?.related?.length) {
      setRelatedItems([]);
      return;
    }

    loadAllContentIndexes().then((all) => {
      setRelatedItems(resolveRelatedItems(item.related || [], all));
    });
  }, [item]);

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

  const systemDefinition = systemDefinitions.find((entry) => entry.id === item.id);
  const relatedExperiments = useMemo(
    () => relatedItems.filter((entry) => entry.type === "lab" || entry.type === "mock" || entry.type === "demo"),
    [relatedItems]
  );
  const relatedLearn = useMemo(
    () => relatedItems.filter((entry) => entry.type === "blog" || entry.type === "guide" || entry.type === "podcast" || entry.type === "case-study"),
    [relatedItems]
  );

  const systemOverview = systemDefinition?.purpose || item.description;
  const headerMeta = (
    <div className="flex flex-wrap gap-2">
      <AptTag variant="accent">Reference Model</AptTag>
      {systemDefinition?.referenceType ? (
        <AptTag variant="outline">{systemDefinition.referenceType}</AptTag>
      ) : null}
      {systemDefinition?.status ? (
        <AptTag variant="secondary">{systemDefinition.status}</AptTag>
      ) : null}
    </div>
  );

  const heroFallback = (
    <div className="flex h-full w-full items-center justify-center bg-muted/20">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Network className="h-10 w-10" />
      </div>
    </div>
  );

  const mainTop = systemDefinition ? (
    <div className="grid gap-6 md:grid-cols-2">
      <AptCard variant="subtle">
        <div className="p-6">
          <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Key Decisions</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {systemDefinition.decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </div>
      </AptCard>

      <AptCard variant="subtle">
        <div className="p-6">
          <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Tradeoffs</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {systemDefinition.tradeoffs.map((tradeoff) => (
              <li key={tradeoff}>{tradeoff}</li>
            ))}
          </ul>
        </div>
      </AptCard>
    </div>
  ) : null;

  const mainBottom = systemDefinition?.productionGuide ? (
    <div className="grid gap-6 md:grid-cols-2">
      <AptCard variant="default">
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Deployment</h2>
            <p className="text-sm text-muted-foreground">{systemDefinition.productionGuide.deployment}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Operations</h2>
            <p className="text-sm text-muted-foreground">{systemDefinition.productionGuide.operations}</p>
          </div>
        </div>
      </AptCard>

      <AptCard variant="subtle">
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Where This Model Applies</h2>
            {systemDefinition.appliesTo?.length ? (
              <div className="flex flex-wrap gap-2">
                {systemDefinition.appliesTo.map((scope) => (
                  <AptTag key={scope} variant="ghost">
                    {scope}
                  </AptTag>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Use where the same pattern or structure can travel beyond a single implementation.</p>
            )}
          </div>
          {systemDefinition.learningResources?.rationale ? (
            <div>
              <h2 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Rationale</h2>
              <p className="text-sm text-muted-foreground">{systemDefinition.learningResources.rationale}</p>
            </div>
          ) : null}
        </div>
      </AptCard>
    </div>
  ) : null;

  const actionsOverride = systemDefinition?.links ? (
    <AptCard>
      <div className="p-6 space-y-4">
        {systemDefinition.links.demo ? (
          <a href={systemDefinition.links.demo} target={systemDefinition.links.demo.startsWith("http") ? "_blank" : undefined} rel={systemDefinition.links.demo.startsWith("http") ? "noopener noreferrer" : undefined} className="block">
            <AptButton variant="primary" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open related surface
            </AptButton>
          </a>
        ) : null}
        {systemDefinition.links.docs ? (
          <a href={systemDefinition.links.docs} target={systemDefinition.links.docs.startsWith("http") ? "_blank" : undefined} rel={systemDefinition.links.docs.startsWith("http") ? "noopener noreferrer" : undefined} className="block">
            <AptButton variant="outline" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              Related docs
            </AptButton>
          </a>
        ) : null}
        {systemDefinition.links.repo ? (
          <a href={systemDefinition.links.repo} target="_blank" rel="noopener noreferrer" className="block">
            <AptButton variant="outline" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              Repository
            </AptButton>
          </a>
        ) : null}
      </div>
    </AptCard>
  ) : undefined;

  const sidebarTop = (
    <AptCard>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-2">Reference Model Overview</h3>
          <p className="text-sm text-muted-foreground">{systemOverview}</p>
        </div>

        {systemDefinition?.referenceType ? (
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-semibold mb-2">Reference Type</h3>
            <p className="text-sm text-muted-foreground">{systemDefinition.referenceType}</p>
          </div>
        ) : null}

        {relatedExperiments.length > 0 ? (
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-semibold mb-2">Related Experiments</h3>
            <div className="flex flex-wrap gap-2">
              {relatedExperiments.map((entry) => (
                <AptButton key={entry.id || entry.slug} variant="ghost" size="sm" asChild>
                  <Link to={`/experiments/${entry.slug || entry.id}`}>{entry.title}</Link>
                </AptButton>
              ))}
            </div>
          </div>
        ) : null}

        {relatedLearn.length > 0 ? (
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-semibold mb-2">Related Learn Content</h3>
            <div className="flex flex-wrap gap-2">
              {relatedLearn.map((entry) => (
                <AptButton key={entry.id || entry.slug} variant="ghost" size="sm" asChild>
                  <Link to={`/learn/${entry.id || entry.slug}`}>{entry.title}</Link>
                </AptButton>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </AptCard>
  );

  return (
    <ContentDetailPage
      backHref="/design/systems"
      backLabel="Back to Systems"
      item={item}
      markdown={markdown}
      aboutTitle="Reference Model Summary"
      markdownTitle={item.title}
      headerMeta={headerMeta}
      heroFallback={heroFallback}
      mainTop={mainTop}
      mainBottom={mainBottom}
      sidebarTop={sidebarTop}
      actionsOverride={actionsOverride}
    />
  );
}
