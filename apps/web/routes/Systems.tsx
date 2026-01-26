import { systems } from "@/data/systems";
import {
  AptCard,
  AptCardHeader,
  AptCardTitle,
  AptCardDescription,
  AptCardContent,
  AptTag,
  AptButton,
  DecisionBlock,
  LimitationNotice,
} from "@/components/apt";
import { Link } from "react-router-dom";
import { ExternalLink, FileText } from "lucide-react";

export default function Systems() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Systems</h1>
        <p className="text-muted-foreground max-w-2xl">
          Complete systems with documented architecture, key decisions, and
          known tradeoffs. Each system is designed to solve a real problem.
        </p>
      </div>

      <div className="space-y-6">
        {systems.map((system) => (
          <AptCard key={system.id} variant="default" padding="large">
            <AptCardHeader className="p-0">
              <div className="flex items-start justify-between">
                <div>
                  <AptCardTitle className="text-xl">{system.title}</AptCardTitle>
                  <p className="text-sm font-medium text-primary mt-1">
                    {system.purpose}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  {system.tags.slice(0, 3).map((tag) => (
                    <AptTag key={tag} variant="muted">
                      {tag}
                    </AptTag>
                  ))}
                </div>
              </div>
            </AptCardHeader>

            <AptCardContent className="mt-4 p-0">
              <AptCardDescription className="mb-6">
                {system.description}
              </AptCardDescription>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DecisionBlock decisions={system.decisions} />
                <LimitationNotice
                  title="Tradeoffs"
                  limitations={system.tradeoffs}
                />
              </div>
            </AptCardContent>

            {(system.links.demo || system.links.docs || system.links.repo) && (
              <div className="flex gap-2 mt-6 pt-4 border-t border-border">
                {system.links.demo && (
                  <AptButton variant="secondary" size="sm" asChild>
                    <Link to={system.links.demo}>
                      <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                      Demo
                    </Link>
                  </AptButton>
                )}
                {system.links.docs && (
                  <AptButton variant="ghost" size="sm" asChild>
                    <Link to={system.links.docs}>
                      <FileText className="h-3.5 w-3.5 mr-1.5" />
                      Docs
                    </Link>
                  </AptButton>
                )}
                {system.links.repo && (
                  <AptButton variant="ghost" size="sm" asChild>
                    <a
                      href={system.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Repo
                    </a>
                  </AptButton>
                )}
              </div>
            )}
          </AptCard>
        ))}
      </div>
    </div>
  );
}
