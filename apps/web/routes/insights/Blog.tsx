import { useMemo, useState } from "react";
import { InsightCard } from "@/components/apt/InsightCard";
import { ContentFilters, FilterConfig, SelectedFilters, ContentStateGate } from "@/components/apt";
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
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Short- to medium-form writing on applied ideas, implementation tradeoffs, and reusable patterns.
        </p>
      </div>

      <ContentFilters
        config={config}
        selected={selected}
        onChange={setSelected}
        resultCount={filteredBlogs.length}
        totalCount={blogs.length}
      />

      <ContentStateGate
        loading={loading}
        isError={blogsQuery.isError}
        errorMessage={blogsQuery.error?.message || "Unable to load blog posts."}
        configError={configError}
        empty={filteredBlogs.length === 0}
        loadingLabel="Loading blog posts…"
        emptyLabel="No blog posts match your filters."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredBlogs.map((blog) => (
            <InsightCard key={blog.id} insight={blog} to={`/insights/${blog.id}`} />
          ))}
        </div>
      </ContentStateGate>
    </div>
  );
}
