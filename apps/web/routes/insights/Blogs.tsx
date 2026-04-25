import { useMemo, useState } from "react";
import { InsightCard } from "@/components/apt/InsightCard";
import { ContentFilters, FilterConfig, SelectedFilters, RuntimeConfigNotice } from "@/components/apt";
import { getWorkerApiConfigError } from "@/src/services/api";
import { useBlogsIndexQuery } from "@/hooks/useContentAggregateQueries";

export default function InsightsBlogs() {
  const [selected, setSelected] = useState<SelectedFilters>({ topics: [] });

  const blogsQuery = useBlogsIndexQuery();

  const blogs = useMemo(() => blogsQuery.data || [], [blogsQuery.data]);
  const loading = blogsQuery.isLoading;

  const config = useMemo<FilterConfig>(() => {
    const topics = [...new Set(blogs.flatMap((b) => b.concepts || []))].sort();
    return { topics };
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    if (!selected.topics?.length) return blogs;
    return blogs.filter((blog) =>
      selected.topics?.some((t) => (blog.concepts || []).includes(t))
    );
  }, [selected.topics, blogs]);

  const configError = blogsQuery.isError ? getWorkerApiConfigError() : null;

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
        totalCount={blogs.length}
      />

      {loading ? (
        <div className="py-12 text-center text-muted-foreground">Loading articles…</div>
      ) : blogsQuery.isError ? (
        <div className="py-2">
          {configError ? (
            <RuntimeConfigNotice
              message={configError.message}
              envVar={configError.envVar}
              expectedValue={configError.expectedProductionValue}
            />
          ) : (
            <div className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {blogsQuery.error?.message || "Unable to load articles."}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBlogs.map((blog) => (
              <InsightCard key={blog.id} insight={blog} to={`/insights/${blog.id}`} />
            ))}
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No articles match your filters.
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
