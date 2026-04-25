import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
import { principlesLifecycle, principlesSections } from "@/src/data/principles";

export default function PrinciplesHome() {
  return (
    <div className="container py-12 md:py-16 space-y-14">
      <section>
        <SectionIntro
          title="APT Principles"
          description="A curated summary layer of the APT principles system. The full, evolving doctrine lives in the public apt-principles GitHub repository."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
          eyebrow={<AptTag variant="accent">Principles</AptTag>}
        >
          <div className="flex flex-wrap gap-3">
            <AptButton asChild>
              <a href="https://github.com/adthomps/apt-principles" target="_blank" rel="noreferrer">
                Open apt-principles on GitHub
              </a>
            </AptButton>
            <AptButton variant="ghost" asChild>
              <Link to="/labs">Open Labs</Link>
            </AptButton>
          </div>
        </SectionIntro>
      </section>

      <section>
        <SectionIntro
          title="System Model"
          description="Lifecycle flow used across APT projects, demos, and production-minded implementations."
          className="mb-6"
        />
        <div className="flex flex-wrap items-center gap-2">
          {principlesLifecycle.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <AptTag variant="secondary">{step}</AptTag>
              {index < principlesLifecycle.length - 1 ? (
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionIntro
          title="Principle Groups"
          description="Each area summarizes what it covers, how it is used, and where to find canonical source details."
          className="mb-6"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {principlesSections.map((section) => (
            <AptCard key={section.slug} variant="interactive" className="h-full">
              <AptCardHeader className="space-y-2">
                <AptTag variant="outline" size="sm">{section.slug}</AptTag>
                <AptCardTitle className="text-lg">{section.title}</AptCardTitle>
                <AptCardDescription>{section.summary}</AptCardDescription>
              </AptCardHeader>
              <AptCardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Role:</span> {section.role}
                </p>
                <AptButton variant="outline" asChild>
                  <Link to={`/principles/${section.slug}`}>Open Summary</Link>
                </AptButton>
              </AptCardContent>
            </AptCard>
          ))}
        </div>
      </section>
    </div>
  );
}
