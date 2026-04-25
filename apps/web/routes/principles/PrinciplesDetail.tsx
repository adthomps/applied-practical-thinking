import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

  return (
    <div className="container py-12 md:py-16 space-y-12">
      <section>
        <AptButton variant="ghost" size="sm" asChild>
          <Link to="/principles">
            <ArrowLeft className="h-4 w-4" />
            Back to Principles
          </Link>
        </AptButton>
      </section>

      <section>
        <SectionIntro
          title={section.title}
          description={section.role}
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
          eyebrow={<AptTag variant="accent">Principles Summary</AptTag>}
        />
      </section>

      <section>
        <SectionIntro title="Summary" description={section.summary} />
      </section>

      <section>
        <SectionIntro title="Key Rules" className="mb-5" />
        <AptCard variant="default" padding="large">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {section.keyRules.map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </AptCard>
      </section>

      <section>
        <SectionIntro title="How This Is Used" className="mb-5" />
        <AptCard variant="default" padding="large">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {section.howUsed.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </AptCard>
      </section>

      <section>
        <SectionIntro title="Patterns" className="mb-5" />
        <AptCard variant="default" padding="large">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {section.patterns.map((pattern) => (
              <li key={pattern} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>{pattern}</span>
              </li>
            ))}
          </ul>
        </AptCard>
      </section>

      <section>
        <SectionIntro title="Examples" className="mb-5" />
        <AptCard variant="default" padding="large">
          {section.examples.length > 0 ? (
            <ul className="space-y-3">
              {section.examples.map((example) => (
                <li key={`${example.href}-${example.label}`} className="flex items-center justify-between gap-3">
                  <span className="text-sm text-foreground">{example.label}</span>
                  <div className="flex items-center gap-2">
                    {example.status ? <AptTag variant="muted">{example.status}</AptTag> : null}
                    <AptButton variant="ghost" size="sm" asChild>
                      <Link to={example.href}>
                        Open
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </AptButton>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              Examples will be added as APT labs and apps evolve.
            </p>
          )}
        </AptCard>
      </section>

      <section>
        <SectionIntro title="Source of Truth" className="mb-5" />
        <AptCard variant="default" padding="large">
          <p className="text-sm text-muted-foreground mb-3">
            Canonical details for this principle area live in the `apt-principles` GitHub repository.
          </p>
          <AptButton variant="outline" asChild>
            <a href={section.sourceHref} target="_blank" rel="noreferrer">
              Open Canonical Source
            </a>
          </AptButton>
        </AptCard>
      </section>

      <section>
        <SectionIntro title="AI Usage" className="mb-5" />
        <AptCard variant="default" padding="large">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {section.aiUsage.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
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
    </div>
  );
}
