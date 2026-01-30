import { useEffect, useState } from "react";
import { fetchContentIndex, fetchContentMarkdown, ContentIndexItem } from "@/src/services/contentIndex";
import {
  AptCard,
  AptCardHeader,
  AptCardTitle,
  AptCardDescription,
  AptCardContent,
  AptTag,
  DecisionBlock,
} from "@/components/apt";

  const [caseStudies, setCaseStudies] = useState<ContentIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [markdownContent, setMarkdownContent] = useState<Record<string, string>>({});

  useEffect(() => {
    setLoading(true);
    fetchContentIndex("case-studies")
      .then((data) => {
        setCaseStudies(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const handleExpand = (id: string, contentPath: string) => {
    setExpanded(expanded === id ? null : id);
    if (!markdownContent[id]) {
      fetchContentMarkdown(contentPath).then((md) => {
        setMarkdownContent((prev) => ({ ...prev, [id]: md }));
      });
    }
  };

  if (loading) {
    return <div className="container py-12 text-center">Loading case studies…</div>;
  }
  if (error) {
    return <div className="container py-12 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Strong</h1>
        <p className="text-muted-foreground max-w-2xl">
          Case studies of significant challenges and how they were addressed.
          Each includes the problem context, approach taken, and key decisions.
        </p>
      </div>

      <div className="space-y-6">
        {caseStudies.map((item) => (
          <AptCard key={item.id} variant="default" padding="large">
            <AptCardHeader className="p-0">
              <div className="flex items-start justify-between">
                <AptCardTitle className="text-xl">{item.title}</AptCardTitle>
                <div className="flex gap-1.5">
                  {(item.concepts || []).slice(0, 3).map((tag) => (
                    <AptTag key={tag} variant="muted">
                      {tag}
                    </AptTag>
                  ))}
                </div>
              </div>
              <p className="text-sm font-medium text-primary mt-2">
                {item.description}
              </p>
            </AptCardHeader>

            <AptCardContent className="mt-4 p-0">
              <button
                className="text-xs text-accent underline mb-2"
                onClick={() => handleExpand(item.id, item.contentPath)}
              >
                {expanded === item.id ? "Hide Details" : "Show Details"}
              </button>
              {expanded === item.id && (
                <div className="prose-custom mt-4">
                  {markdownContent[item.id]
                    ? markdownContent[item.id]
                        .split('\n')
                        .map((line, i) => <p key={i}>{line}</p>)
                    : "Loading…"}
                </div>
              )}
            </AptCardContent>
          </AptCard>
        ))}
      </div>
    </div>
  );
}
