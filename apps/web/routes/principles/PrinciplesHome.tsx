import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
import {
  AptButton,
  AptCard,
  AptCardDescription,
  AptCardTitle,
  AptTag,
  SectionIntro,
} from "@/components/apt";
import {
  PRINCIPLE_PHASE_LABELS,
  aptProjectProfile,
  principlesLifecycle,
  principlesSections,
  projectPrincipleEvidence,
} from "@/src/data/principles";

export default function PrinciplesHome() {
  return (
    <div className="container py-12 md:py-16 space-y-10">
      <section>
        <SectionIntro
          title="Principles"
          description="APT's principle groups across thinking, design, architecture, execution, and operations, shown as both doctrine mirror and live project demonstration for this repository."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg max-w-3xl"
        >
          <div className="flex flex-wrap gap-3">
            <AptButton variant="outline" asChild>
              <a href="https://github.com/adthomps/apt-principles" target="_blank" rel="noreferrer">
                Open Doctrine Repo
                <ExternalLink className="h-4 w-4" />
              </a>
            </AptButton>
            <AptButton variant="ghost" asChild>
              <a href={aptProjectProfile.sourceHref} target="_blank" rel="noreferrer">
                Open Project Profile
                <FileText className="h-4 w-4" />
              </a>
            </AptButton>
          </div>
        </SectionIntro>
      </section>

      <section>
        <AptCard variant="subtle" padding="large">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                <AptTag variant="primary">{aptProjectProfile.adoptionMode}</AptTag>
                <AptTag variant="muted">{aptProjectProfile.maturity}</AptTag>
              </div>
              <AptCardTitle className="text-2xl">{aptProjectProfile.project}</AptCardTitle>
              <AptCardDescription className="mt-3 text-base">
                {aptProjectProfile.showcaseSummary}
              </AptCardDescription>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {aptProjectProfile.learningValue}
              </p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">{aptProjectProfile.sourcePath}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                { label: "Architecture", value: aptProjectProfile.architecturePattern },
                { label: "AI usage", value: aptProjectProfile.aiAgentUsage },
                { label: "Security model", value: aptProjectProfile.securityModel },
              ].map((item) => (
                <div key={item.label} className="rounded-md border border-border/60 bg-card/60 p-3">
                  <p className="text-xs font-medium uppercase text-muted-foreground">{item.label}</p>
                  <p className="mt-1 text-sm text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </AptCard>
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
        <SectionIntro
          title="How This Repo Demonstrates APT"
          description="Project-profile evidence mapped to the principle groups this repository actively applies and showcases."
          className="mb-5"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projectPrincipleEvidence.map((item) => {
            const section = principlesSections.find((candidate) => candidate.slug === item.slug);
            if (!section) return null;

            return (
              <AptCard key={item.slug} variant="default" padding="large">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <AptTag variant="secondary" size="sm">
                    {PRINCIPLE_PHASE_LABELS[item.slug]}
                  </AptTag>
                  <AptButton variant="ghost" size="sm" asChild>
                    <Link to={`/principles/${item.slug}`}>
                      Detail
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </AptButton>
                </div>
                <AptCardTitle className="text-lg">{section.title}</AptCardTitle>
                <AptCardDescription className="mt-2">{item.summary}</AptCardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.evidence.map((evidence) => (
                    <AptTag key={evidence} variant="muted" size="sm">
                      {evidence}
                    </AptTag>
                  ))}
                </div>
              </AptCard>
            );
          })}
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
