
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchContentIndex, fetchContentMarkdown, ContentIndexItem } from "@/src/services/contentIndex";
import { ContentDetailPage } from "@/components/apt/ContentDetailPage";

export default function SystemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState<ContentIndexItem | null>(null);
  const [markdown, setMarkdown] = useState("");
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

  if (loading) return <div className="container py-12">Loading…</div>;
  if (error || !item) return <div className="container py-12 text-red-500">{error || "System not found"}</div>;

  return (
    <ContentDetailPage
      backHref="/systems"
      backLabel="Back to Systems"
      item={item}
      markdown={markdown}
      aboutTitle="About this System"
      markdownTitle={item.title}
    />
  );
}
