import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { insights } from "@/data/learn";
import { AptCard } from "@/components/apt/AptCard";
import { AptTag } from "@/components/apt/AptTag";
import { ContentFilters, FilterConfig, SelectedFilters } from "@/components/apt";
import { BookOpen } from "lucide-react";

export default function InsightsCaseStudies() {
  // Filter for guide type which maps to case studies
  const caseStudies = insights.filter((i) => i.type === "guide");
  
  const [selected, setSelected] = useState<SelectedFilters>({
    topics: [],
  });

  // Get unique filter options
  const config = useMemo<FilterConfig>(() => {
    const topics = [...new Set(caseStudies.flatMap((s) => s.concepts))].sort();
    return { topics };
  }, []);

  // Filter case studies
  const filteredCaseStudies = useMemo(() => {
    if (!selected.topics?.length) return caseStudies;
    return caseStudies.filter((study) =>
      selected.topics?.some((t) => study.concepts.includes(t))
    );
  }, [selected.topics]);

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Case Studies
        </h1>
        <p className="text-lg text-muted-foreground">
          Narrative breakdowns of problems, constraints, decisions, and outcomes.
        </p>
      </div>

      <ContentFilters
        config={config}
        selected={selected}
        onChange={setSelected}
        resultCount={filteredCaseStudies.length}
        totalCount={caseStudies.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCaseStudies.map((study) => (
          <Link key={study.id} to={`/insights/${study.id}`}>
            <AptCard variant="interactive" padding="none" className="h-full overflow-hidden">
              {/* Thumbnail */}
              <div className="aspect-video bg-muted/30 relative">
                {study.thumbnail ? (
                  <img
                    src={study.thumbnail}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <AptTag variant="primary">Case Study</AptTag>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5 space-y-3">
                <h2 className="font-semibold text-lg line-clamp-2">{study.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {study.description}
                </p>
                {study.concepts && study.concepts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {study.concepts.slice(0, 3).map((concept) => (
                      <AptTag key={concept} variant="ghost" size="sm">
                        {concept}
                      </AptTag>
                    ))}
                  </div>
                )}
              </div>
            </AptCard>
          </Link>
        ))}
      </div>

      {filteredCaseStudies.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No case studies match your filters.
        </div>
      )}
    </div>
  );
}
