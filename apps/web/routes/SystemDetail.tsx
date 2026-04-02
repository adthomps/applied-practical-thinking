
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchContentIndex, fetchContentMarkdown, ContentIndexItem } from "@/src/services/contentIndex";
import { AptButton, AptCard } from "@/components/apt";
import { ContentDetailPage } from "@/components/apt/ContentDetailPage";
import { systems as systemDefinitions } from "@/data/systems";
import { loadAllContentIndexes, resolveRelatedItems } from "@/src/services/relatedContent";

export default function SystemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState<ContentIndexItem | null>(null);
  const [markdown, setMarkdown] = useState("");
  const [relatedItems, setRelatedItems] = useState<ContentIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchContentIndex("systems")
      .then((items) => {
        const found = items.find((i) => i.id === id);
        setItem(found || null);
        if (found) {
          return fetchContentMarkdown(found.contentPath).then((raw) => {
            // Strip YAML frontmatter if present
            const cleaned = raw.replace(/^---[\s\S]*?---\s*/, "");
            setMarkdown(cleaned);
          });
        }
        return "";
      })
      .then(() => setLoading(false))
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!item?.related?.length) {
      setRelatedItems([]);
      return;
    }

    loadAllContentIndexes().then((all) => {
      setRelatedItems(resolveRelatedItems(item.related || [], all));
    });
  }, [item]);

  if (loading) return <div className="container py-12">Loading…</div>;
  if (error || !item) return <div className="container py-12 text-destructive">{error || "System not found"}</div>;

  const systemDefinition = systemDefinitions.find((entry) => entry.id === item.id);
  const relatedExperiments = useMemo(
    () => relatedItems.filter((entry) => entry.type === "lab" || entry.type === "mock" || entry.type === "demo"),
    [relatedItems]
  );
  const relatedLearn = useMemo(
    () => relatedItems.filter((entry) => entry.type === "blog" || entry.type === "guide" || entry.type === "podcast" || entry.type === "case-study"),
    [relatedItems]
  );

  const systemOverview = systemDefinition?.purpose || item.description;

  const mainTop = systemDefinition ? (
    <div className="grid gap-6 md:grid-cols-2">
      <AptCard variant="subtle">
        <div className="p-6">
          <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Key Decisions</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {systemDefinition.decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </div>
      </AptCard>

      <AptCard variant="subtle">
        <div className="p-6">
          <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Tradeoffs</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {systemDefinition.tradeoffs.map((tradeoff) => (
              <li key={tradeoff}>{tradeoff}</li>
            ))}
          </ul>
        </div>
      </AptCard>
    </div>
  ) : null;

  const sidebarTop = (
    <AptCard>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-2">Overview</h3>
          <p className="text-sm text-muted-foreground">{systemOverview}</p>
        </div>

        {relatedExperiments.length > 0 ? (
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-semibold mb-2">Related Experiments</h3>
            <div className="flex flex-wrap gap-2">
              {relatedExperiments.map((entry) => (
                <AptButton key={entry.id || entry.slug} variant="ghost" size="sm" asChild>
                  <Link to={`/experiments/${entry.slug || entry.id}`}>{entry.title}</Link>
                </AptButton>
              ))}
            </div>
          </div>
        ) : null}

        {relatedLearn.length > 0 ? (
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-semibold mb-2">Related Learn Content</h3>
            <div className="flex flex-wrap gap-2">
              {relatedLearn.map((entry) => (
                <AptButton key={entry.id || entry.slug} variant="ghost" size="sm" asChild>
                  <Link to={`/learn/${entry.id || entry.slug}`}>{entry.title}</Link>
                </AptButton>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </AptCard>
  );

  return (
    <ContentDetailPage
      backHref="/design/systems"
      backLabel="Back to Systems"
      item={item}
      markdown={markdown}
      aboutTitle="System Summary"
      markdownTitle={item.title}
      mainTop={mainTop}
      sidebarTop={sidebarTop}
    />
  );
}
