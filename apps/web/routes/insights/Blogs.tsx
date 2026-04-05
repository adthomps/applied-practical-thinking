
import { useState, useMemo, useEffect } from "react";
import { fetchContentIndex, ContentIndexItem } from "@/src/services/contentIndex";
import { InsightCard } from "@/components/apt/InsightCard";
import { ContentFilters, FilterConfig, SelectedFilters, RuntimeConfigNotice } from "@/components/apt";
import { getWorkerApiConfigError } from "@/src/services/api";

export default function InsightsBlogs() {
  const [blogs, setBlogs] = useState<ContentIndexItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<SelectedFilters>({ topics: [] });

  useEffect(() => {
    fetchContentIndex("blog")
      .then((data) => {
        setBlogs(data.sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || "")));
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  const loading = blogs === null && !error;

  const config = useMemo<FilterConfig>(() => {
    const topics = [...new Set((blogs ?? []).flatMap((b) => b.concepts || []))].sort();
    return { topics };
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    if (!selected.topics?.length) return blogs ?? [];
    return (blogs ?? []).filter((blog) =>
      selected.topics?.some((t) => (blog.concepts || []).includes(t))
    );
  }, [selected.topics, blogs]);

  if (loading) {
    return <div className="container py-12 text-center">Loading articles…</div>;
  }
  if (error) {
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
          <div className="text-center text-destructive">{error}</div>
        )}
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Articles
        </h1>
        <p className="text-lg text-muted-foreground">
          Short- to medium-form writing on applied ideas and practical systems.
        </p>
      </div>

      <ContentFilters
        config={config}
        selected={selected}
        onChange={setSelected}
        resultCount={filteredBlogs.length}
        totalCount={(blogs ?? []).length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBlogs.map((blog) => (
          <InsightCard key={blog.id} insight={blog} to={`/learn/${blog.id}`} />
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No articles match your filters.
        </div>
      )}
    </div>
  );
}
