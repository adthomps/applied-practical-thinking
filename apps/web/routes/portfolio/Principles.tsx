import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Download,
  FileText,
  FlaskConical,
  Layers3,
  LockKeyhole,
  Network,
  Settings2,
  ShieldCheck,
  Target,
  Wrench,
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
import { MarkdownContent } from "@/components/apt/MarkdownContent";
import {
  aptAiOverlayGroupId,
  aptLifecycleFlow,
  aptPrincipleGroups,
  aptPrincipleGroupsById,
  aptPrinciplesFrameworkPublicDocMeta,
  aptPrinciplesFrameworkPublicDocPath,
  type AptPrincipleGroupId,
} from "@/data/aptPrinciples";
import { useAptPublicDocQuery } from "@/hooks/useAptPublicDocQuery";
import {
  getAptPublicDocAssetBasePath,
} from "@/src/services/aptPrinciplesPublicDocs";
import { downloadPublicMarkdown } from "@/src/services/download";

const groupIcons: Record<AptPrincipleGroupId, ComponentType<{ className?: string }>> = {
  thinking: Target,
  design: Layers3,
  architecture: Network,
  system: Settings2,
  security: LockKeyhole,
  execution: Wrench,
  "quality-testing": ShieldCheck,
  "release-change-management": Download,
  operations: FlaskConical,
  knowledge: BookOpen,
  "ai-agent": Bot,
};

const relatedRoutes = [
  { label: "Principles Home", path: "/design", description: "Principles-first doctrine entry and design catalog." },
  { label: "Design Thinking", path: "/design/thinking", description: "Layer-specific methods for framing and decision quality." },
  { label: "Design Architecture", path: "/design/architecture", description: "Boundaries, deployment contracts, and ownership rules." },
  { label: "Content Strategy", path: "/design/content-strategy", description: "Visitor-intent IA, naming, and placement guidance." },
  { label: "AI Review Bundle", path: "/design/review-bundle", description: "Portable handoff bundles for human and AI review." },
];

function formatDate(value: string | null | undefined) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return value || "n/a";
  const [year, month, day] = value.split("-");
  return `${month}/${day}/${year}`;
}

export default function PortfolioPrinciples() {
  const frameworkDocQuery = useAptPublicDocQuery(aptPrinciplesFrameworkPublicDocPath);
  const frameworkAssetBasePath = getAptPublicDocAssetBasePath(aptPrinciplesFrameworkPublicDocPath);

  const handleFrameworkMarkdownDownload = async () => {
    if (!aptPrinciplesFrameworkPublicDocPath) return;
    await downloadPublicMarkdown(aptPrinciplesFrameworkPublicDocPath, "apt-principles-framework.md");
  };

  return (
    <div className="container py-12 md:py-16 space-y-16">
      <section>
        <SectionIntro
          title="APT Principles Framework"
          description="The published doctrine mirror is rendered from generated apt-principles public docs, then paired with operational summaries for implementation in the portfolio site."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
          eyebrow={<AptTag variant="accent">Principles</AptTag>}
        >
          <div className="flex flex-wrap items-center gap-2">
            <AptTag variant="secondary">{aptPrinciplesFrameworkPublicDocMeta?.version || "v1"}</AptTag>
            <AptTag variant="muted">Updated {formatDate(aptPrinciplesFrameworkPublicDocMeta?.lastUpdated)}</AptTag>
          </div>
          <div className="flex flex-wrap gap-3">
            <AptButton
              variant="outline"
              onClick={() => {
                void handleFrameworkMarkdownDownload();
              }}
              disabled={!aptPrinciplesFrameworkPublicDocPath}
            >
              <FileText className="h-4 w-4" />
              Download Published Markdown
            </AptButton>
            {aptPrinciplesFrameworkPublicDocPath ? (
              <AptButton variant="ghost" asChild>
                <a href={aptPrinciplesFrameworkPublicDocPath} target="_blank" rel="noreferrer">
                  Open published doc
                </a>
              </AptButton>
            ) : null}
          </div>
        </SectionIntro>

        <AptCard className="mt-6">
          <div className="p-6 md:p-8">
            {frameworkDocQuery.isLoading ? (
              <p className="text-sm text-muted-foreground">Loading published framework markdown…</p>
            ) : frameworkDocQuery.isError ? (
              <p className="text-sm text-muted-foreground">
                Published framework markdown is unavailable right now. Regenerate and publish `/docs/apt/apt-principles.md` to refresh this page.
              </p>
            ) : (
              <article className="prose-custom">
                <MarkdownContent
                  markdown={frameworkDocQuery.data?.markdown || ""}
                  contentPath="docs/apt/apt-principles.md"
                  assetBasePath={frameworkAssetBasePath}
                />
              </article>
            )}
          </div>
        </AptCard>
      </section>

      <section>
        <SectionIntro
          title="Core Principle Groups"
          description="Canonical source-linked groups with operational focus, standards, and expected outputs."
          className="mb-6"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {aptPrincipleGroups.map((group) => {
            const Icon = groupIcons[group.id] || Layers3;
            const focusIntent = group.focus[0] || group.detailSummary;
            const outputsPreview = group.outputs.slice(0, 2).join(" • ");
            return (
              <section key={group.id} id={group.anchor} className="scroll-mt-24">
                <AptCard variant="interactive" padding="large">
                  <AptCardHeader className="p-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-lg bg-primary/10 p-2 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <AptTag variant="outline" size="sm" className="mb-1">{group.framing}</AptTag>
                        <AptCardTitle className="text-lg">{group.displayLabel}</AptCardTitle>
                      </div>
                    </div>
                    <AptCardDescription>{group.detailSummary}</AptCardDescription>
                  </AptCardHeader>
                  <AptCardContent className="space-y-5 p-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <AptTag variant="secondary">{group.publicDocMeta?.version || "v1"}</AptTag>
                      <AptTag variant="muted">Updated {formatDate(group.publicDocMeta?.lastUpdated)}</AptTag>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Focus:</span> {focusIntent}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Outputs:</span>{" "}
                      {outputsPreview}
                      {group.outputs.length > 2 ? ` +${group.outputs.length - 2} more` : ""}
                    </p>

                    <div className="flex items-center justify-between gap-2">
                      {group.publicDocPath ? (
                        <a
                          href={group.publicDocPath}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          View source doc
                        </a>
                      ) : <span />}
                      <AptButton variant="outline" asChild>
                        <Link to={group.detailPath}>Open detail</Link>
                      </AptButton>
                    </div>
                  </AptCardContent>
                </AptCard>
              </section>
            );
          })}
        </div>
      </section>

      <section>
        <SectionIntro
          title="How It All Fits Together"
          description="Compact lifecycle view from strategy to operations with AI as an overlay."
          className="mb-6"
        />
        <div className="flex flex-wrap items-center gap-2">
          {aptLifecycleFlow.map((id, index) => {
            const group = aptPrincipleGroupsById[id];
            return (
              <div key={id} className="flex items-center gap-2">
                <AptTag variant="secondary">{group.shortTitle}</AptTag>
                {index < aptLifecycleFlow.length - 1 ? <ArrowRight className="h-4 w-4 text-muted-foreground" /> : null}
              </div>
            );
          })}
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          <span className="font-medium text-foreground">{aptPrincipleGroupsById[aptAiOverlayGroupId].displayLabel}</span>{" "}
          applies across every lifecycle stage.
        </p>
      </section>

      <section>
        <SectionIntro
          title="Related Surfaces"
          description="Use these routes for layer-specific doctrine and implementation guidance."
          className="mb-6"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {relatedRoutes.map((item) => (
            <Link key={item.path} to={item.path} className="block group">
              <AptCard variant="subtle" padding="large" className="h-full">
                <AptCardHeader className="p-0">
                  <AptCardTitle className="text-lg">{item.label}</AptCardTitle>
                  <AptCardDescription>{item.description}</AptCardDescription>
                </AptCardHeader>
                <AptCardContent className="p-0 mt-4">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Open route
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </AptCardContent>
              </AptCard>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
