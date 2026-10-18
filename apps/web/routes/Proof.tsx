import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AptCard, AptCardDescription, AptCardTitle, AptTag, ContentStateGate, SectionIntro } from "@/components/apt";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useProofFeedQuery } from "@/hooks/useFeedQueries";
import { getWorkerApiConfigError } from "@/src/services/api";
import type { PublicFeedItem } from "@/src/services/feed";

type ProofCardItem = {
  id: string;
  title: string;
  description: string;
  kind: "system";
  statusLabel: string;
  tags: string[];
  href: string;
};

function formatProofStatus(status: string) {
  const normalized = status.trim().toLowerCase();
  if (normalized === "live") return "Live";
  if (normalized === "working-proof") return "Working proof";
  if (normalized === "draft") return "Draft";
  if (normalized === "active" || normalized === "") return "Active";
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function ProofCard({ item }: { item: ProofCardItem }) {
  const kindLabel = "System";

  return (
    <AptCard variant="interactive" padding="none" className="h-full">
      <Link to={item.href} className="flex h-full flex-col p-6 focus:outline-none">
        <div className="mb-4 flex items-start justify-between gap-3">
          <AptTag variant="primary" size="sm">
            {kindLabel}
          </AptTag>
          <AptTag variant="secondary" size="sm">
            {item.statusLabel}
          </AptTag>
        </div>

        <AptCardTitle className="text-[1.75rem] leading-tight transition-colors group-hover:text-primary md:text-2xl">
          {item.title}
        </AptCardTitle>
        <AptCardDescription className="mt-2 line-clamp-2 text-base">
          {item.description}
        </AptCardDescription>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.slice(0, 3).map((tag) => (
            <AptTag key={`${item.id}-${tag}`} variant="muted" size="sm">
              {tag}
            </AptTag>
          ))}
        </div>

        <div className="mt-6 border-t border-border/60 pt-4 text-primary">
          <ArrowRight className="ml-auto h-4 w-4" />
        </div>
      </Link>
    </AptCard>
  );
}

export default function Systems() {
  usePageMetadata({
    title: "Proof",
    description:
      "What is implemented in each APT system, and what must not be claimed.",
  });

  const proofQuery = useProofFeedQuery();
  const loading = proofQuery.isLoading;

  const items = useMemo<ProofCardItem[]>(() => {
    const feedItems = proofQuery.data || [];
    return feedItems.map((item: PublicFeedItem) => ({
      id: item.id || item.slug || item.title,
      title: item.title,
      description: item.description || item.summary || item.excerpt || "Applied implementation artifact",
      kind: "system",
      statusLabel: formatProofStatus(item.status),
      tags: [...(item.topics || []), ...(item.platforms || []), ...(item.technologies || [])].slice(0, 3),
      href: item.href,
    }));
  }, [proofQuery.data]);

  const filteredItems = items;

  const configError = proofQuery.isError ? getWorkerApiConfigError() : null;

  return (
    <div className="container py-10 md:py-12">
      <section className="space-y-3">
        <SectionIntro as="h1"
          title="Proof"
          description="What is implemented, and what must not be claimed. Clickable demos stay in Labs. The story of a decision stays in Insights."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg max-w-3xl"
        />
      </section>

      <section className="mt-8">
        <ContentStateGate
          loading={loading}
          isError={proofQuery.isError}
          errorMessage={proofQuery.error?.message || "Unable to load proof content."}
          configError={configError}
          empty={filteredItems.length === 0}
          loadingLabel="Loading proof artifacts…"
          emptyLabel="No proof items found for this tab."
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <ProofCard key={item.id} item={item} />
            ))}
          </div>
        </ContentStateGate>
      </section>
    </div>
  );
}
