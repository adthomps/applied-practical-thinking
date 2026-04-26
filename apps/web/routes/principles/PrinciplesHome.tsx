import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
  AptButton,
  AptCard,
  AptCardDescription,
  AptCardTitle,
  AptTag,
  SectionIntro,
} from "@/components/apt";
import { principlesLifecycle, principlesSections } from "@/src/data/principles";

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

export default function PrinciplesHome() {
  return (
    <div className="container py-12 md:py-16 space-y-10">
      <section>
        <SectionIntro
          title="Principles"
          description="Defines how decisions are made and systems are structured. Twelve groups covering thinking, design, architecture, execution, and operations."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg max-w-3xl"
        >
          <div className="flex flex-wrap gap-3">
            <AptButton variant="outline" asChild>
              <a href="https://github.com/adthomps/apt-principles" target="_blank" rel="noreferrer">
                Open Principles in GitHub Repo
                <ExternalLink className="h-4 w-4" />
              </a>
            </AptButton>
          </div>
        </SectionIntro>
      </section>

      <section>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {principlesLifecycle.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span>{step}</span>
              {index < principlesLifecycle.length - 1 ? (
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {principlesSections.map((section) => (
            <AptCard key={section.slug} variant="interactive" className="group h-full">
              <Link to={`/principles/${section.slug}`} className="flex h-full flex-col p-6 focus:outline-none">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <AptTag variant="primary" size="sm">Principle</AptTag>
                  <AptTag variant="muted" size="sm">
                    {PRINCIPLE_PHASE_LABELS[section.slug] || section.slug}
                  </AptTag>
                </div>

                <AptCardTitle className="text-2xl leading-tight transition-colors group-hover:text-primary">
                  {section.title}
                </AptCardTitle>
                <AptCardDescription className="mt-3 text-base">
                  {section.summary}
                </AptCardDescription>

                <div className="mt-6 flex-1 border-t border-border/60 pt-4">
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>{section.keyRules.length} rules · {section.examples.length} examples</span>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground/90">Includes decision cues + mapped examples</p>
                  </div>
                </div>
              </Link>
            </AptCard>
          ))}
        </div>
      </section>
    </div>
  );
}
