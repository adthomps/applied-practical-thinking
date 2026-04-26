import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import {
  AptButton,
  AptCard,
  AptTag,
  SectionIntro,
} from "@/components/apt";
import {
  getPrincipleSection,
  principlesSections,
  resolvePrincipleSlug,
  type PrincipleSlug,
} from "@/src/data/principles";

const PRINCIPLE_PHASE_LABELS: Record<string, string> = {
  framework: "Overview",
  thinking: "Why",
  design: "What",
  architecture: "How",
  system: "Consistency",
  execution: "Build",
  quality: "Validate",
  release: "Promote",
  operations: "Run",
  knowledge: "Learn",
  ai: "Augment",
  security: "Secure",
};

const EXAMPLE_CODE_SNIPPETS: Partial<Record<PrincipleSlug, string>> = {
  thinking: `interface Decision {
  context: string;
  alternatives: string[];
  chosen: string;
  tradeoffs: string[];
}`,
  architecture: `type Boundary = {
  owner: "web" | "worker" | "shared";
  contract: string;
  risk: "low" | "medium" | "high";
};`,
  system: `export const statusVocabulary = [
  "draft",
  "active",
  "stable",
  "archived",
] as const;`,
};

type PrinciplesDetailProps = {
  readonly initialSection?: PrincipleSlug;
};

export default function PrinciplesDetail(props: PrinciplesDetailProps) {
  const params = useParams<{ section?: string }>();
  const resolvedSlug = props.initialSection ?? resolvePrincipleSlug(params.section);

  if (!resolvedSlug) {
    return <Navigate to="/principles" replace />;
  }

  const section = getPrincipleSection(resolvedSlug);
  const codeSnippet = EXAMPLE_CODE_SNIPPETS[section.slug];
  const summarySource = section.sourceAnchors.find((anchor) => anchor.id === "summary")?.href || section.sourceHref;
  const rulesSource = section.sourceAnchors.find((anchor) => anchor.id === "rules")?.href || section.sourceHref;
  const patternsSource = section.sourceAnchors.find((anchor) => anchor.id === "patterns")?.href || section.sourceHref;
  const aiSource = section.sourceAnchors.find((anchor) => anchor.id === "ai")?.href || section.sourceHref;
  const sectionIndex = principlesSections.findIndex((item) => item.slug === section.slug);
  const previousSection = sectionIndex > 0 ? principlesSections[sectionIndex - 1] : null;
  const nextSection = sectionIndex < principlesSections.length - 1 ? principlesSections[sectionIndex + 1] : null;

  const getExampleType = (href: string) => {
    if (href.startsWith("/labs")) return "Lab";
    if (href.startsWith("/proof")) return "Proof";
    if (href.startsWith("/insights")) return "Insight";
    if (href.startsWith("/design")) return "Design";
    return "Example";
  };

  return (
    <div className="container py-12 md:py-16 space-y-10">
      <section>
        <AptButton variant="ghost" size="sm" asChild>
          <Link to="/principles">
            <ArrowLeft className="h-4 w-4" />
            Back to Principles
          </Link>
        </AptButton>
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <main className="space-y-10">
          <section className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <AptTag variant="primary">Principle</AptTag>
              <AptTag variant="muted">{PRINCIPLE_PHASE_LABELS[section.slug] || section.slug}</AptTag>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{section.title}</h1>
            <p className="max-w-4xl text-2xl leading-relaxed text-muted-foreground">{section.summary}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {section.sourceAnchors.map((anchor) => (
                <a
                  key={anchor.id}
                  href={anchor.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-border/60 px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {anchor.label}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </section>

          <section>
            <SectionIntro title="Operational Summary" className="mb-5" />
            <AptCard variant="default" padding="large">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">Focus</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {section.operationalSummary.focus.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">Outputs</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {section.operationalSummary.outputs.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-foreground">{section.operationalSummary.practicalExample}</p>
            </AptCard>
          </section>

          <section>
            <SectionIntro title="Summary" description={section.role} />
            <div className="mt-3">
              <a
                href={summarySource}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Read canonical summary context
              </a>
            </div>
            <details className="mt-4 rounded-md border border-border/60 bg-muted/20 p-3">
              <summary className="cursor-pointer text-sm font-medium text-foreground">More detail</summary>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {section.moreDetail.decisionCues.map((cue) => (
                  <li key={cue} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{cue}</span>
                  </li>
                ))}
              </ul>
            </details>
          </section>

          <section>
            <SectionIntro title="Key Rules" className="mb-5" />
            <AptCard variant="default" padding="large">
              <ul className="space-y-3 text-lg text-foreground">
                {section.keyRules.map((rule) => (
                  <li key={rule} className="flex items-start gap-3">
                    <span className="text-primary">→</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </AptCard>
            <div className="mt-3">
              <a href={rulesSource} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">
                Read canonical rules and standards
              </a>
            </div>
            <details className="mt-4 rounded-md border border-border/60 bg-muted/20 p-3">
              <summary className="cursor-pointer text-sm font-medium text-foreground">More detail</summary>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {section.moreDetail.failureModes.map((failureMode) => (
                  <li key={failureMode} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                    <span>{failureMode}</span>
                  </li>
                ))}
              </ul>
            </details>
          </section>

          <section>
            <SectionIntro title="How This Is Used" className="mb-4" />
            <p className="text-lg leading-relaxed text-muted-foreground">
              {section.howUsed.join(" ")}
            </p>
          </section>

          <section>
            <SectionIntro title="When To Use" className="mb-4" />
            <AptCard variant="default" padding="large">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.whenToUse.map((cue) => (
                  <li key={cue} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{cue}</span>
                  </li>
                ))}
              </ul>
            </AptCard>
          </section>

          <section>
            <SectionIntro title="When Not To Use" className="mb-4" />
            <AptCard variant="default" padding="large">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.whenNotToUse.map((cue) => (
                  <li key={cue} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                    <span>{cue}</span>
                  </li>
                ))}
              </ul>
            </AptCard>
          </section>

          <section>
            <SectionIntro title="Patterns" className="mb-4" />
            <div className="grid gap-3 md:grid-cols-2">
              {section.patterns.map((pattern) => (
                <AptCard key={pattern} variant="default" padding="small">
                  <p className="text-base text-foreground">{pattern}</p>
                </AptCard>
              ))}
            </div>
            <div className="mt-3">
              <a href={patternsSource} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">
                Read canonical patterns and usage
              </a>
            </div>
            <details className="mt-4 rounded-md border border-border/60 bg-muted/20 p-3">
              <summary className="cursor-pointer text-sm font-medium text-foreground">More detail</summary>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {section.moreDetail.implementationHeuristics.map((heuristic) => (
                  <li key={heuristic} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{heuristic}</span>
                  </li>
                ))}
              </ul>
            </details>
          </section>

          {codeSnippet ? (
            <section>
              <SectionIntro title="Example Code" className="mb-4" />
              <AptCard variant="default" padding="none">
                <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                  <code>{codeSnippet}</code>
                </pre>
              </AptCard>
            </section>
          ) : null}

          <section>
            <SectionIntro title="Prompt Starter" className="mb-4" />
            <AptCard variant="default" padding="large">
              <p className="text-sm text-foreground"><span className="font-semibold">Goal:</span> {section.promptStarter.goal}</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">Inputs</h3>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    {section.promptStarter.inputs.map((input) => (
                      <li key={input} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{input}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">Expected Output Format</h3>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    {section.promptStarter.expectedOutputFormat.map((formatItem) => (
                      <li key={formatItem} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{formatItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AptCard>
          </section>

          <section>
            <SectionIntro title="AI Usage" className="mb-5" />
            <AptCard variant="default" padding="large">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.aiUsage.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AptCard>
            <div className="mt-3">
              <a href={aiSource} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">
                Read canonical AI and agent guidance
              </a>
            </div>
            <details className="mt-4 rounded-md border border-border/60 bg-muted/20 p-3">
              <summary className="cursor-pointer text-sm font-medium text-foreground">More detail</summary>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {section.moreDetail.antiPatterns.map((antiPattern) => (
                  <li key={antiPattern} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    <span>{antiPattern}</span>
                  </li>
                ))}
              </ul>
            </details>
          </section>

          <section>
            <SectionIntro title="All Principles" description="Navigate across framework and all principle groups." className="mb-5" />
            <div className="flex flex-wrap gap-2 rounded-md border border-border/60 p-3">
              {principlesSections.map((item) => (
                <AptButton
                  key={item.slug}
                  variant={item.slug === section.slug ? "secondary" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link className="text-xs" to={`/principles/${item.slug}`}>{item.title}</Link>
                </AptButton>
              ))}
            </div>
          </section>

          <section>
            <SectionIntro title="Adjacent Principles" className="mb-4" />
            <AptCard variant="default" padding="small">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {previousSection ? (
                  <AptButton variant="ghost" size="sm" asChild>
                    <Link to={`/principles/${previousSection.slug}`}>
                      <ArrowLeft className="h-4 w-4" />
                      {previousSection.title}
                    </Link>
                  </AptButton>
                ) : <span className="text-xs text-muted-foreground">Start of sequence</span>}
                {nextSection ? (
                  <AptButton variant="ghost" size="sm" asChild>
                    <Link to={`/principles/${nextSection.slug}`}>
                      {nextSection.title}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </AptButton>
                ) : <span className="text-xs text-muted-foreground">End of sequence</span>}
              </div>
            </AptCard>
          </section>
        </main>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section>
            <SectionIntro title="Examples" className="mb-4" />
            <AptCard variant="default" padding="small">
              {section.examples.length > 0 ? (
                <div className="space-y-3">
                  {section.examples.map((example) => (
                    <Link
                      key={`${example.href}-${example.label}`}
                      to={example.href}
                      className="block rounded-md border border-border/60 p-3 transition-colors hover:border-primary/50"
                    >
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-foreground">{example.label}</p>
                        <AptTag variant="muted" size="sm">{getExampleType(example.href)}</AptTag>
                      </div>
                      <p className="text-xs text-muted-foreground">{example.rationale}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Examples will be added as APT labs and apps evolve.
                </p>
              )}
            </AptCard>
          </section>

          {section.relatedArtifacts.length > 0 ? (
            <section>
              <SectionIntro title="Related Artifacts" className="mb-4" />
              <AptCard variant="default" padding="small">
                <div className="space-y-3">
                  {section.relatedArtifacts.map((artifact) => (
                    <Link
                      key={`${artifact.href}-${artifact.label}`}
                      to={artifact.href}
                      className="block rounded-md border border-border/60 p-3 transition-colors hover:border-primary/50"
                    >
                      <p className="text-sm font-medium text-foreground">{artifact.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{artifact.note}</p>
                    </Link>
                  ))}
                </div>
              </AptCard>
            </section>
          ) : null}

          <section>
            <SectionIntro title="Source of Truth" className="mb-4" />
            <AptCard variant="default" padding="small">
              <a
                href={section.sourceHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-md border border-border/60 px-3 py-2 text-sm transition-colors hover:border-primary/50"
              >
                <span className="inline-flex items-center gap-2 text-foreground">
                  <Github className="h-4 w-4" />
                  apt-principles
                </span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            </AptCard>
          </section>
        </aside>
      </div>
    </div>
  );
}
