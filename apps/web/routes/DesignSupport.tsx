import { useEffect, useState } from "react";
import { AptCard } from "@/components/apt/AptCard";
import { MarkdownContent } from "@/components/apt/MarkdownContent";

export default function DesignSupport() {
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/docs/design/APT-SUPPORT-DESIGN.md");
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const text = await res.text();
        if (cancelled) return;
        setMarkdown(text);
      } catch (err: any) {
        if (cancelled) return;
        setError(err?.message || "Failed to load document");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div className="container py-12">Loading Support Design…</div>;
  if (error) return <div className="container py-12 text-destructive">{error}</div>;

  return (
    <div className="container py-12 md:py-16">
      <AptCard>
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-4">Support Design</h1>
          <article className="prose-custom">
            <MarkdownContent markdown={markdown} contentPath="docs/design" />
          </article>
        </div>
      </AptCard>
    </div>
  );
}
