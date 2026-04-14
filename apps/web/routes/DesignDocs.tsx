import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpenText, Shapes } from "lucide-react";
import {
  AptCard,
  AptCardContent,
  AptCardDescription,
  AptCardHeader,
  AptCardTitle,
  AptTag,
  RuntimeConfigNotice,
  SectionIntro,
} from "@/components/apt";
import { getWorkerApiConfigError } from "@/src/services/api";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { AptButton } from "@/components/apt";
import { splitDoctrineAndPatterns, useDesignDocsQuery } from "@/hooks/useDesignDocsQueries";

export default function DesignDocs() {
  usePageMetadata({
    title: "Design Docs",
    description:
      "Manifest-driven design doctrine and pattern documentation with version-aware browsing.",
  });

  const docsQuery = useDesignDocsQuery();

  const docs = useMemo(() => docsQuery.data || [], [docsQuery.data]);
  const { doctrineDocs, patternDocs } = useMemo(() => splitDoctrineAndPatterns(docs), [docs]);

  if (docsQuery.isLoading) {
    return <div className="container py-12 text-center">Loading design docs…</div>;
  }

  if (docsQuery.isError) {
    const configError = getWorkerApiConfigError();
    return (
      <div className="container py-12">
        {configError ? (
          <RuntimeConfigNotice
            message={configError.message}
            envVar={configError.envVar}
            expectedValue={configError.expectedProductionValue}
          />
        ) : (
          <div className="text-center text-destructive">
            {docsQuery.error?.message || "Failed to load design docs."}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12 space-y-12">
      <section>
        <SectionIntro
          title="Design Docs"
          description="Browse APT doctrine and pattern documents directly from the design docs manifest. Open any doc for version-aware rendering and markdown source access."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
          eyebrow={<AptTag variant="accent">Manifest-Driven</AptTag>}
        >
          <AptButton variant="ghost" asChild>
            <Link to="/design/patterns">
              Patterns landing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AptButton>
        </SectionIntro>
      </section>

      <section className="space-y-6">
        <SectionIntro
          title="Doctrine"
          description="Core design doctrine documents that define APT methods, architecture, and governance."
          eyebrow={<AptTag variant="outline">Core</AptTag>}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctrineDocs.map((doc) => (
            <Link key={doc.slug} to={`/design/docs/${doc.slug}`} className="block group">
              <AptCard variant="interactive" className="h-full">
                <AptCardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <BookOpenText className="h-4 w-4" />
                    </div>
                    <AptTag variant="primary">Doc</AptTag>
                    {typeof doc.major === "number" ? (
                      <AptTag variant="muted">v{doc.major}</AptTag>
                    ) : null}
                  </div>
                  <AptCardTitle>{doc.title}</AptCardTitle>
                  <AptCardDescription>{doc.description}</AptCardDescription>
                </AptCardHeader>
                <AptCardContent>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Open doc
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </AptCardContent>
              </AptCard>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionIntro
          title="Patterns"
          description="Reusable UI and interaction patterns, including forms and field-state conventions."
          eyebrow={<AptTag variant="outline">Patterns</AptTag>}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {patternDocs.map((doc) => (
            <Link key={doc.slug} to={`/design/docs/${doc.slug}`} className="block group">
              <AptCard variant="interactive" className="h-full">
                <AptCardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-lg bg-accent/10 p-2 text-accent">
                      <Shapes className="h-4 w-4" />
                    </div>
                    <AptTag variant="accent">Pattern</AptTag>
                    {typeof doc.major === "number" ? (
                      <AptTag variant="muted">v{doc.major}</AptTag>
                    ) : null}
                  </div>
                  <AptCardTitle>{doc.title}</AptCardTitle>
                  <AptCardDescription>{doc.description}</AptCardDescription>
                </AptCardHeader>
                <AptCardContent>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Open pattern
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
