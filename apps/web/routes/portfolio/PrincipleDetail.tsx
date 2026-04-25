import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import {
  AptButton,
  AptCard,
  AptCardContent,
  AptTag,
  SectionIntro,
} from "@/components/apt";
import { MarkdownContent } from "@/components/apt/MarkdownContent";
import {
  aptPrincipleGroups,
  getAptAdjacentPrincipleGroups,
  getAptPrincipleGroupByRouteSegment,
} from "@/data/aptPrinciples";
import { useAptPublicDocQuery } from "@/hooks/useAptPublicDocQuery";
import {
  getAptPublicDocAssetBasePath,
} from "@/src/services/aptPrinciplesPublicDocs";
import { downloadPublicMarkdown } from "@/src/services/download";

function formatDate(value: string | null | undefined) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return value || "n/a";
  const [year, month, day] = value.split("-");
  return `${month}/${day}/${year}`;
}

export default function PrincipleDetail() {
  const { group: groupParam } = useParams<{ group: string }>();
  const group = groupParam ? getAptPrincipleGroupByRouteSegment(groupParam) : null;

  if (!group) {
    return <Navigate to="/design/principles" replace />;
  }

  const docQuery = useAptPublicDocQuery(group.publicDocPath);
  const adjacent = getAptAdjacentPrincipleGroups(group.id);
  const docAssetBasePath = getAptPublicDocAssetBasePath(group.publicDocPath);

  const handleMarkdownDownload = async () => {
    if (!group.publicDocPath) return;
    await downloadPublicMarkdown(group.publicDocPath, `apt-principles-${group.id}.md`);
  };

  return (
    <div className="container py-12 md:py-16 space-y-12">
      <section>
        <AptButton variant="ghost" size="sm" asChild>
          <Link to="/design/principles">
            <ArrowLeft className="h-4 w-4" />
            Back to Framework
          </Link>
        </AptButton>
      </section>

      <section>
        <SectionIntro
          title={group.displayLabel}
          description={group.detailSummary}
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
          eyebrow={<AptTag variant="accent">{group.framing}</AptTag>}
        >
          <div className="flex flex-wrap items-center gap-2">
            <AptTag variant="secondary">{group.publicDocMeta?.version || "v1"}</AptTag>
            <AptTag variant="muted">Updated {formatDate(group.publicDocMeta?.lastUpdated)}</AptTag>
          </div>
          <div className="flex flex-wrap gap-3">
            <AptButton
              variant="outline"
              onClick={() => {
                void handleMarkdownDownload();
              }}
              disabled={!group.publicDocPath}
            >
              <FileText className="h-4 w-4" />
              Download Markdown
            </AptButton>
            {group.publicDocPath ? (
              <AptButton variant="ghost" asChild>
                <a href={group.publicDocPath} target="_blank" rel="noreferrer">
                  Open canonical
                </a>
              </AptButton>
            ) : null}
          </div>
        </SectionIntro>
      </section>

      <section>
        <SectionIntro
          title="Canonical Doctrine"
          description="Primary principle content rendered from generated apt-principles public docs."
          className="mb-5"
        />
        <AptCard>
          <div className="p-6 md:p-8">
            {docQuery.isLoading ? (
              <p className="text-sm text-muted-foreground">Loading canonical principle markdown…</p>
            ) : docQuery.isError ? (
              <p className="text-sm text-muted-foreground">
                Canonical markdown is unavailable for this principle right now. Regenerate and publish its `/docs/apt/*.md` artifact to restore source rendering.
              </p>
            ) : (
              <article className="prose-custom">
                <MarkdownContent
                  markdown={docQuery.data?.markdown || ""}
                  contentPath={group.publicDocPath || "docs/apt"}
                  assetBasePath={docAssetBasePath}
                />
              </article>
            )}
          </div>
        </AptCard>
      </section>

      <section>
        <SectionIntro
          title="Operational Summary"
          description="Structured companion sections for quick implementation and review use."
          className="mb-5"
        />
        <AptCard variant="default" padding="large">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Focus</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {group.focus.slice(0, 3).map((item) => (
                  <li key={`focus-${item}`} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Outputs</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {group.outputs.slice(0, 4).map((item) => (
                  <li key={`output-${item}`} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Practical Example</p>
              <p className="text-sm text-muted-foreground">{group.example}</p>
            </div>
          </div>
        </AptCard>
      </section>

      <section>
        <SectionIntro
          title="AI Prompt Example"
          description="Optional prompt starter aligned to this principle layer."
          className="mb-5"
        />
        <AptCard variant="feature" padding="large">
          <details>
            <summary className="cursor-pointer text-sm font-medium text-foreground">Expand prompt starter</summary>
            <AptCardContent className="p-0 mt-4 space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Goal</p>
                <p className="text-sm text-muted-foreground">{group.aiPromptExample.goal}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Inputs</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {group.aiPromptExample.inputs.map((item) => (
                    <li key={`input-${item}`} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Expected output format</p>
                <p className="text-sm text-muted-foreground">{group.aiPromptExample.expectedOutputFormat}</p>
              </div>
            </AptCardContent>
          </details>
        </AptCard>
      </section>

      <section>
        <SectionIntro
          title="Principle Groups"
          description="Full group traversal lives inside Principles pages."
          className="mb-5"
        />
        <div className="flex flex-wrap gap-2 rounded-md border border-border/60 p-3">
            {aptPrincipleGroups.map((candidate) => (
              <AptButton
                key={candidate.id}
                variant={candidate.id === group.id ? "secondary" : "ghost"}
                size="sm"
                asChild
              >
                <Link to={candidate.detailPath}>{candidate.shortTitle}</Link>
              </AptButton>
            ))}
        </div>
      </section>

      <section>
        <SectionIntro title="Adjacent Groups" description="Navigate to the previous or next principle." className="mb-5" />
        <div className="flex flex-wrap gap-3">
          <AptButton variant="ghost" asChild>
            <Link to="/design/principles">
              Back to Framework
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AptButton>
          {adjacent.previous ? (
            <AptButton variant="outline" asChild>
              <Link to={adjacent.previous.detailPath}>
                Previous: {adjacent.previous.shortTitle}
              </Link>
            </AptButton>
          ) : null}
          {adjacent.next ? (
            <AptButton variant="outline" asChild>
              <Link to={adjacent.next.detailPath}>
                Next: {adjacent.next.shortTitle}
              </Link>
            </AptButton>
          ) : null}
        </div>
      </section>
    </div>
  );
}
