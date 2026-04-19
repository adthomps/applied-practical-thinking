import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import {
  AptButton,
  AptCard,
  AptCardContent,
  AptCardDescription,
  AptCardHeader,
  AptCardTitle,
  AptTag,
  DesignDocVersionSwitcher,
  SectionIntro,
} from "@/components/apt";
import {
  getAptAdjacentPrincipleGroups,
  getAptPrincipleGroupByRouteSegment,
} from "@/data/aptPrinciples";
import { getWorkerApiConfigError, tryGetWorkerApiUrl } from "@/src/services/api";
import { useDesignDocVersion } from "@/hooks/useDesignDocVersion";
import { downloadWorkerMarkdown } from "@/src/services/download";

export default function PrincipleDetail() {
  const { group: groupParam } = useParams<{ group: string }>();
  const group = groupParam ? getAptPrincipleGroupByRouteSegment(groupParam) : null;
  const docSlug = group?.docSlug || "thinking";
  const versionState = useDesignDocVersion(docSlug);
  const docUrl = tryGetWorkerApiUrl(versionState.downloadApiPath);
  const canonicalUrl = versionState.canonicalPath || null;
  const configError = getWorkerApiConfigError();

  if (!group) {
    return <Navigate to="/design/principles" replace />;
  }

  const adjacent = getAptAdjacentPrincipleGroups(group.id);

  const handleMarkdownDownload = async () => {
    const majorSuffix = versionState.activeMajor ? `-v${versionState.activeMajor}` : "";
    await downloadWorkerMarkdown(
      versionState.downloadApiPath,
      `apt-principles-${group.id}${majorSuffix}.md`
    );
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
          <div className="flex flex-wrap gap-3">
            <AptButton
              variant="outline"
              onClick={() => {
                void handleMarkdownDownload();
              }}
              disabled={!docUrl}
            >
              <FileText className="h-4 w-4" />
              Download Markdown
            </AptButton>
            {canonicalUrl ? (
              <AptButton variant="ghost" asChild>
                <a href={canonicalUrl} target="_blank" rel="noreferrer">
                  Open canonical
                </a>
              </AptButton>
            ) : null}
          </div>
          <DesignDocVersionSwitcher versionState={versionState} />
          {!docUrl && configError ? (
            <p className="text-sm text-muted-foreground mt-3">
              Configure <code>{configError.envVar}</code> on the Pages project to enable full-doc links.
            </p>
          ) : null}
        </SectionIntro>
      </section>

      <section>
        <SectionIntro title="Focus" description="What this principle group is optimizing for." className="mb-5" />
        <AptCard variant="default" padding="large">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {group.focus.map((item) => (
              <li key={`focus-${item}`} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </AptCard>
      </section>

      <section>
        <SectionIntro title="Principles" description="Rules that govern decision quality in this layer." className="mb-5" />
        <AptCard variant="default" padding="large">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {group.principles.map((item) => (
              <li key={`principle-${item}`} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </AptCard>
      </section>

      <section>
        <SectionIntro title="Outputs" description="Expected artifacts this group should produce." className="mb-5" />
        <AptCard variant="default" padding="large">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {group.outputs.map((item) => (
              <li key={`output-${item}`} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </AptCard>
      </section>

      <section>
        <SectionIntro title="Practical Example" description="Starter scenario showing the principle in action." className="mb-5" />
        <AptCard variant="subtle" padding="large">
          <p className="text-sm text-muted-foreground">{group.example}</p>
        </AptCard>
      </section>

      <section>
        <SectionIntro
          title="AI Prompt Example"
          description="Stub prompt format for this principle group. Expand with richer prompt packs in the next pass."
          className="mb-5"
        />
        <AptCard variant="feature" padding="large">
          <AptCardHeader className="p-0">
            <AptCardTitle className="text-lg">Prompt Starter</AptCardTitle>
            <AptCardDescription>Use this structure to keep AI assistance aligned with APT doctrine.</AptCardDescription>
          </AptCardHeader>
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
        </AptCard>
      </section>

      <section>
        <SectionIntro title="Related Links" description="Move through framework layers or return to overview." className="mb-5" />
        <div className="grid gap-4 md:grid-cols-3">
          <AptCard variant="subtle" padding="large" className="h-full">
            <AptCardHeader className="p-0">
              <AptCardTitle className="text-lg">Framework Overview</AptCardTitle>
              <AptCardDescription>Return to the full 10-group model and lifecycle map.</AptCardDescription>
            </AptCardHeader>
            <AptCardContent className="p-0 mt-4">
              <AptButton variant="ghost" asChild className="px-0">
                <Link to="/design/principles">
                  Back to Framework
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </AptButton>
            </AptCardContent>
          </AptCard>

          <AptCard variant="subtle" padding="large" className="h-full">
            <AptCardHeader className="p-0">
              <AptCardTitle className="text-lg">Previous</AptCardTitle>
              <AptCardDescription>
                {adjacent.previous ? adjacent.previous.displayLabel : "You are at the first principle detail."}
              </AptCardDescription>
            </AptCardHeader>
            <AptCardContent className="p-0 mt-4">
              {adjacent.previous ? (
                <AptButton variant="ghost" asChild className="px-0">
                  <Link to={adjacent.previous.detailPath}>
                    Open Previous
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </AptButton>
              ) : null}
            </AptCardContent>
          </AptCard>

          <AptCard variant="subtle" padding="large" className="h-full">
            <AptCardHeader className="p-0">
              <AptCardTitle className="text-lg">Next</AptCardTitle>
              <AptCardDescription>
                {adjacent.next ? adjacent.next.displayLabel : "You are at the final principle detail."}
              </AptCardDescription>
            </AptCardHeader>
            <AptCardContent className="p-0 mt-4">
              {adjacent.next ? (
                <AptButton variant="ghost" asChild className="px-0">
                  <Link to={adjacent.next.detailPath}>
                    Open Next
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </AptButton>
              ) : null}
            </AptCardContent>
          </AptCard>
        </div>
      </section>
    </div>
  );
}
