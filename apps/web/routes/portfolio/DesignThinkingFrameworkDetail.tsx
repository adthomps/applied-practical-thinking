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
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  FileText,
} from "lucide-react";
import {
  designThinkingFrameworks,
  getDesignThinkingFramework,
} from "@/data/designThinkingFrameworks";
import { getWorkerApiConfigError, tryGetWorkerApiUrl } from "@/src/services/api";

export default function DesignThinkingFrameworkDetail() {
  const { framework } = useParams<{ framework: string }>();
  const entry = framework ? getDesignThinkingFramework(framework) : null;
  const thinkingDocUrl = tryGetWorkerApiUrl("/api/design/docs/thinking");
  const configError = getWorkerApiConfigError();

  if (!entry) {
    return <Navigate to="/design/thinking" replace />;
  }

  const relatedFrameworks = designThinkingFrameworks.filter(
    (item) => item.slug !== entry.slug
  ).slice(0, 3);

  return (
    <div className="container py-12 md:py-16 space-y-12">
      <section>
        <AptButton variant="ghost" size="sm" asChild>
          <Link to="/design/thinking">
            <ArrowLeft className="h-4 w-4" />
            Back to Design Thinking
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
              <AptTag variant="accent">Thinking Framework</AptTag>
              <AptTag variant="outline">{entry.shortTitle}</AptTag>
            </div>
          }
        >
          <div className="flex flex-wrap gap-3">
            <AptButton variant="outline" asChild>
              <a
                href={thinkingDocUrl || "#"}
                target={thinkingDocUrl ? "_blank" : undefined}
                rel={thinkingDocUrl ? "noopener noreferrer" : undefined}
                aria-disabled={!thinkingDocUrl}
              >
                <FileText className="h-4 w-4" />
                Read Full Design Thinking Doc
              </a>
            </AptButton>
          </div>
          {!thinkingDocUrl && configError ? (
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
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                {entry.icon}
              </div>
              <AptCardTitle>Framework Overview</AptCardTitle>
            </div>
            <AptCardDescription>{entry.whyItMatters}</AptCardDescription>
          </AptCardHeader>
          <AptCardContent>
            <div className="space-y-5">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  When to use
                </p>
                <p className="text-sm text-muted-foreground">{entry.when}</p>
              </div>
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Core process
                </p>
                <ol className="space-y-2">
                  {entry.steps.map((step, index) => (
                    <li key={step} className="flex items-start gap-3 text-sm">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </AptCardContent>
        </AptCard>

        <AptCard variant="subtle" padding="large">
          <AptCardHeader>
            <AptCardTitle>Working Prompts</AptCardTitle>
            <AptCardDescription>
              Practical prompts to help apply the framework while defining a problem or reviewing a direction.
            </AptCardDescription>
          </AptCardHeader>
          <AptCardContent>
            <div className="space-y-3">
              {entry.prompts.map((prompt) => (
                <div key={prompt} className="rounded-lg border border-border/60 bg-background/40 p-4 text-sm text-muted-foreground">
                  {prompt}
                </div>
              ))}
            </div>
          </AptCardContent>
        </AptCard>
      </section>

      <section className="space-y-6">
        <SectionIntro
          title="Related Frameworks"
          description="Other thinking moves inside APT that commonly connect with this one."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedFrameworks.map((framework) => (
            <Link key={framework.slug} to={`/design/thinking/${framework.slug}`} className="block group">
              <AptCard variant="interactive" className="h-full">
                <div className="p-6 space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                        {framework.icon}
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          Framework
                        </p>
                        <h3 className="text-lg font-semibold">{framework.title}</h3>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{framework.description}</p>
                    <p className="text-xs text-primary/80 italic">{framework.when}</p>
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
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1">
                  Design Thinking
                </p>
                <h3 className="text-xl font-semibold mb-1">Return to the Full Framework Set</h3>
                <p className="text-muted-foreground">
                  Use the overview page to compare frameworks and move between them as part of the broader APT thinking model.
                </p>
              </div>
            </div>

            <AptButton variant="outline" asChild>
              <Link to="/design/thinking">
                All Thinking Frameworks
                <ArrowRight className="h-4 w-4" />
              </Link>
            </AptButton>
          </div>
        </AptCard>
      </section>
    </div>
  );
}
