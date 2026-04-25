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
          </section>

          <section>
            <SectionIntro title="Summary" description={section.role} />
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
          </section>

          <section>
            <SectionIntro title="How This Is Used" className="mb-4" />
            <p className="text-lg leading-relaxed text-muted-foreground">
              {section.howUsed.join(" ")}
            </p>
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
                  <Link to={`/principles/${item.slug}`}>{item.title}</Link>
                </AptButton>
              ))}
            </div>
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
                      <p className="text-xs text-muted-foreground">{example.href}</p>
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
