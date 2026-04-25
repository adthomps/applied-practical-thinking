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
  aptPrinciplesFrameworkIndex,
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
          description="Canonical doctrine is rendered directly from generated apt-principles public docs, then paired with operational summaries for implementation."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
          eyebrow={<AptTag variant="accent">Principles</AptTag>}
        >
          <div className="flex flex-wrap items-center gap-2">
            <AptTag variant="secondary">{aptPrinciplesFrameworkPublicDocMeta?.version || "v1"}</AptTag>
            <AptTag variant="outline">{aptPrinciplesFrameworkPublicDocMeta?.status || "draft"}</AptTag>
            <AptTag variant="muted">Updated {formatDate(aptPrinciplesFrameworkPublicDocMeta?.lastUpdated)}</AptTag>
            {aptPrinciplesFrameworkPublicDocMeta?.checksum ? (
              <AptTag variant="muted">sha {aptPrinciplesFrameworkPublicDocMeta.checksum.slice(0, 8)}</AptTag>
            ) : null}
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
              Download Canonical Markdown
            </AptButton>
            {aptPrinciplesFrameworkPublicDocPath ? (
              <AptButton variant="ghost" asChild>
                <a href={aptPrinciplesFrameworkPublicDocPath} target="_blank" rel="noreferrer">
                  Open canonical
                </a>
              </AptButton>
            ) : null}
          </div>
        </SectionIntro>

        <AptCard className="mt-6">
          <div className="p-6 md:p-8">
            {frameworkDocQuery.isLoading ? (
              <p className="text-sm text-muted-foreground">Loading canonical framework markdown…</p>
            ) : frameworkDocQuery.isError ? (
              <p className="text-sm text-muted-foreground">
                Canonical framework markdown is unavailable right now. Regenerate and publish `/docs/apt/apt-principles.md` to refresh this page.
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
          title="Framework Index"
          description="Canonical 11-entry index for scanability and deep-link navigation."
          className="mb-6"
        />
        <AptCard variant="feature" padding="large">
          <ol className="space-y-3">
            {aptPrinciplesFrameworkIndex.map((item) => (
              <li key={item.id}>
                <div className="rounded-md border border-border/60 bg-background/40 p-3">
                  <Link
                    to={item.path}
                    className="flex items-start justify-between gap-3 transition-colors hover:text-primary"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </Link>
                  {item.frameworkPath ? (
                    <div className="mt-2">
                      <Link to={item.frameworkPath} className="text-xs text-muted-foreground hover:text-foreground">
                        Scan in framework section
                      </Link>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
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
                      <AptTag variant="outline">{group.publicDocMeta?.status || "draft"}</AptTag>
                      <AptTag variant="muted">Updated {formatDate(group.publicDocMeta?.lastUpdated)}</AptTag>
                      {group.publicDocMeta?.checksum ? (
                        <AptTag variant="muted">sha {group.publicDocMeta.checksum.slice(0, 8)}</AptTag>
                      ) : null}
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Focus</p>
                      <ul className="space-y-1.5 text-sm text-muted-foreground">
                        {group.focus.map((item) => (
                          <li key={`${group.id}-focus-${item}`} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Outputs</p>
                      <ul className="space-y-1.5 text-sm text-muted-foreground">
                        {group.outputs.map((item) => (
                          <li key={`${group.id}-output-${item}`} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <AptButton variant="outline" asChild>
                        <Link to={group.detailPath}>Open detail</Link>
                      </AptButton>
                      {group.publicDocPath ? (
                        <AptButton variant="ghost" asChild>
                          <a href={group.publicDocPath} target="_blank" rel="noreferrer">Open source doc</a>
                        </AptButton>
                      ) : null}
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
          description="Lifecycle progression from strategy to operations, with AI as a cross-layer accelerator."
          className="mb-6"
        />
        <AptCard variant="feature" padding="large">
          <AptCardHeader className="p-0">
            <AptCardTitle className="text-xl">Lifecycle Map</AptCardTitle>
            <AptCardDescription>
              {"Thinking -> Design -> Architecture -> System -> Execution -> Quality & Testing -> Release & Change Management -> Operations -> Knowledge"}
            </AptCardDescription>
          </AptCardHeader>
          <AptCardContent className="p-0 mt-6 space-y-4">
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
            <div className="rounded-lg border border-border/60 bg-background/50 p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{aptPrincipleGroupsById[aptAiOverlayGroupId].displayLabel}</span>
                {" "}acts as an augmentation layer across every stage: prompts, workflows, execution support, and evaluation.
              </p>
            </div>
          </AptCardContent>
        </AptCard>
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
