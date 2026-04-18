import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shapes } from "lucide-react";
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
import { usePatternDesignDocsQuery } from "@/hooks/useDesignDocsQueries";

function toPatternGroupTitle(slug: string) {
  const parts = slug.split("/");
  if (parts.length < 2) return "Patterns";
  const last = parts[parts.length - 1];
  return last
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function DesignPatterns() {
  usePageMetadata({
    title: "Design Patterns",
    description:
      "Reusable design pattern docs from the manifest-driven APT doctrine runtime.",
  });

  const docsQuery = usePatternDesignDocsQuery();
  const patternDocs = useMemo(() => docsQuery.data || [], [docsQuery.data]);

  if (docsQuery.isLoading) {
    return <div className="container py-12 text-center">Loading patterns…</div>;
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
            {docsQuery.error?.message || "Failed to load pattern docs."}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12 space-y-10">
      <section>
        <SectionIntro
          title="Design Patterns"
          description="Pattern docs are published from the design docs manifest and rendered through the same version-aware runtime as doctrine docs."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
          eyebrow={<AptTag variant="accent">Patterns</AptTag>}
        />
      </section>

      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patternDocs.map((doc) => (
            <Link key={doc.slug} to={`/design/docs/${doc.slug}`} className="block group">
              <AptCard variant="interactive" className="h-full">
                <AptCardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <Shapes className="h-4 w-4" />
                    </div>
                    <AptTag variant="accent">Pattern</AptTag>
                    {typeof doc.major === "number" ? (
                      <AptTag variant="muted">v{doc.major}</AptTag>
                    ) : null}
                  </div>
                  <AptCardTitle>{doc.title || toPatternGroupTitle(doc.slug)}</AptCardTitle>
                  <AptCardDescription>
                    {doc.description || "Manifest-published pattern documentation."}
                  </AptCardDescription>
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
