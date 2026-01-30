import { InsightMeta } from "@/components/apt/InsightMeta";
import { InsightCard } from "@/components/apt/InsightCard";
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchContentIndex, ContentIndexItem } from "@/src/services/contentIndex";
import { AptCard } from "@/components/apt/AptCard";
import { AptCardTitle, AptCardDescription } from "@/components/apt/AptCard";
import { AptTag } from "@/components/apt/AptTag";
import { ContentFilters, FilterConfig, SelectedFilters } from "@/components/apt";
import { BookOpen } from "lucide-react";
import { ArrowRight } from "lucide-react";

export default function InsightsCaseStudies() {
  const [caseStudies, setCaseStudies] = useState<ContentIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<SelectedFilters>({ topics: [] });

  useEffect(() => {
    setLoading(true);
    fetchContentIndex("case-studies")
      .then((data) => {
        setCaseStudies(data.sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || "")));
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const config = useMemo<FilterConfig>(() => {
    const topics = [...new Set(caseStudies.flatMap((b) => b.concepts || []))].sort();
    return { topics };
  }, [caseStudies]);

  const filteredCaseStudies = useMemo(() => {
    if (!selected.topics?.length) return caseStudies;
    return caseStudies.filter((study) =>
      selected.topics?.some((t) => (study.concepts || []).includes(t))
    );
  }, [selected.topics, caseStudies]);

  if (loading) {
    return <div className="container py-12 text-center">Loading case studies…</div>;
  }
  if (error) {
    return <div className="container py-12 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Case Studies
        </h1>
        <div className="mb-2">
          <span className="inline-block bg-yellow-400/20 text-yellow-800 text-xs font-semibold px-3 py-1 rounded mb-2">Mock Data</span>
        </div>
        <p className="text-lg text-muted-foreground">
          Narrative breakdowns of problems, constraints, decisions, and outcomes.<br />
          <span className="text-yellow-700">These are mock case studies for demonstration purposes only.</span>
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
            {filteredCaseStudies.map((caseStudy) => (
              <InsightCard key={caseStudy.id} insight={caseStudy} to={`/insights/${caseStudy.id}`} />
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
