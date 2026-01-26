import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { insights } from "@/data/learn";
import { AptCard } from "@/components/apt/AptCard";
import { AptTag } from "@/components/apt/AptTag";
import { ContentFilters, FilterConfig, SelectedFilters } from "@/components/apt";
import { FileText } from "lucide-react";

export default function InsightsBlogs() {
  const blogs = insights.filter((i) => i.type === "blog");
  
  const [selected, setSelected] = useState<SelectedFilters>({
    topics: [],
  });

  // Get unique filter options
  const config = useMemo<FilterConfig>(() => {
    const topics = [...new Set(blogs.flatMap((b) => b.concepts))].sort();
    return { topics };
  }, []);

  // Filter blogs
  const filteredBlogs = useMemo(() => {
    if (!selected.topics?.length) return blogs;
    return blogs.filter((blog) =>
      selected.topics?.some((t) => blog.concepts.includes(t))
    );
  }, [selected.topics]);

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Blogs
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBlogs.map((blog) => (
          <Link key={blog.id} to={`/insights/${blog.id}`}>
            <AptCard variant="interactive" padding="none" className="h-full overflow-hidden">
              {/* Thumbnail */}
              <div className="aspect-video bg-muted/30 relative">
                {blog.thumbnail ? (
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <AptTag variant="primary">Blog</AptTag>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5 space-y-3">
                <h2 className="font-semibold text-lg line-clamp-2">{blog.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {blog.description}
                </p>
                {blog.concepts && blog.concepts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {blog.concepts.slice(0, 3).map((concept) => (
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

      {filteredBlogs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No blog posts match your filters.
        </div>
      )}
    </div>
  );
}
