import { useParams, Link, Navigate } from "react-router-dom";
import { labs } from "@/data/labs";
import { AptCard } from "@/components/apt/AptCard";
import { AptButton } from "@/components/apt/AptButton";
import { AptTag } from "@/components/apt/AptTag";
import { ArrowLeft, ExternalLink, Github, Image as ImageIcon } from "lucide-react";

export default function PortfolioLabDetail() {
  const { id } = useParams<{ id: string }>();
  const lab = labs.find((l) => l.id === id);

  if (!lab) {
    return <Navigate to="/portfolio/labs" replace />;
  }

  return (
    <div className="container py-12 md:py-16">
      {/* Back Link */}
      <Link
        to="/portfolio/labs"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Labs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Featured Image */}
          <div className="aspect-video rounded-xl overflow-hidden bg-muted/30 border border-border/50">
            {lab.thumbnail ? (
              <img
                src={lab.thumbnail}
                alt={lab.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
              </div>
            )}
          </div>

          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AptTag variant="primary">{lab.type}</AptTag>
              <AptTag variant="secondary">{lab.status}</AptTag>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {lab.title}
            </h1>
          </div>

          {/* Problem */}
          <AptCard variant="subtle">
            <div className="p-6">
              <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">
                Problem
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {lab.problem}
              </p>
            </div>
          </AptCard>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-4">About This Lab</h2>
            <p className="text-muted-foreground leading-relaxed">
              {lab.description}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <AptCard>
            <div className="p-6 space-y-4">
              {lab.links?.demo && (
                <a
                  href={lab.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <AptButton variant="primary" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Live Demo
                  </AptButton>
                </a>
              )}
              {lab.links?.repo && (
                <a
                  href={lab.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <AptButton variant="outline" className="w-full">
                    <Github className="h-4 w-4 mr-2" />
                    View Repository
                  </AptButton>
                </a>
              )}
            </div>
          </AptCard>

          {/* Technologies */}
          <AptCard>
            <div className="p-6">
              <h3 className="text-sm font-semibold mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {lab.technologies.map((tech) => (
                  <AptTag key={tech} variant="outline">
                    {tech}
                  </AptTag>
                ))}
              </div>
            </div>
          </AptCard>

          {/* Platforms */}
          <AptCard>
            <div className="p-6">
              <h3 className="text-sm font-semibold mb-4">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {lab.platforms.map((platform) => (
                  <AptTag key={platform} variant="secondary">
                    {platform}
                  </AptTag>
                ))}
              </div>
            </div>
          </AptCard>

          {/* Tags */}
          {lab.tags && lab.tags.length > 0 && (
            <AptCard>
              <div className="p-6">
                <h3 className="text-sm font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {lab.tags.map((tag) => (
                    <AptTag key={tag} variant="ghost">
                      {tag}
                    </AptTag>
                  ))}
                </div>
              </div>
            </AptCard>
          )}
        </div>
      </div>
    </div>
  );
}
