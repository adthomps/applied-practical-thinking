import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AptCard, AptCardDescription, AptCardTitle, AptTag, ContentStateGate, SectionIntro } from "@/components/apt";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useProofFeedQuery } from "@/hooks/useFeedQueries";
import { getWorkerApiConfigError } from "@/src/services/api";
import type { PublicFeedItem } from "@/src/services/feed";

type ProofTab = "all" | "systems" | "live-demos" | "case-studies";

type ProofCardItem = {
  id: string;
  title: string;
  description: string;
  kind: "system" | "live-demo" | "case-study";
  statusLabel: string;
  tags: string[];
  href: string;
};

const PROOF_TAB_ITEMS: Array<{ key: ProofTab; label: string }> = [
  { key: "all", label: "All" },
  { key: "systems", label: "Systems" },
  { key: "live-demos", label: "Live Demos" },
  { key: "case-studies", label: "Case Studies" },
];

function ProofCard({ item }: { item: ProofCardItem }) {
  const kindLabel =
    item.kind === "system"
      ? "System"
      : item.kind === "live-demo"
        ? "Live Demo"
        : "Case Study";

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
  const [activeTab, setActiveTab] = useState<ProofTab>("all");

  usePageMetadata({
    title: "Proof",
    description:
      "Working systems, live demos, and complete implementations. When a lab is interactive, complete, and demonstrable - it lives here.",
  });

  const proofQuery = useProofFeedQuery();
  const loading = proofQuery.isLoading;

  const items = useMemo<ProofCardItem[]>(() => {
    const feedItems = proofQuery.data || [];
    return feedItems.map((item: PublicFeedItem) => ({
      id: item.id || item.slug || item.title,
      title: item.title,
      description: item.description || item.summary || item.excerpt || "Applied implementation artifact",
      kind:
        item.kind === "system"
          ? "system"
          : item.kind === "live-demo"
            ? "live-demo"
            : "case-study",
      statusLabel: item.status === "live" ? "Live" : "Stable",
      tags: [...(item.topics || []), ...(item.platforms || []), ...(item.technologies || [])].slice(0, 3),
      href: item.href,
    }));
  }, [proofQuery.data]);

  const filteredItems = useMemo(() => {
    if (activeTab === "all") return items;
    if (activeTab === "systems") return items.filter((item) => item.kind === "system");
    if (activeTab === "live-demos") return items.filter((item) => item.kind === "live-demo");
    return items.filter((item) => item.kind === "case-study");
  }, [activeTab, items]);

  const configError = proofQuery.isError ? getWorkerApiConfigError() : null;

  return (
    <div className="container py-10 md:py-12">
      <section className="space-y-3">
        <SectionIntro
          title="Proof"
          description="Working systems, live demos, and complete implementations. When a lab is interactive, complete, and demonstrable - it lives here."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg max-w-3xl"
        />
      </section>

      <div className="mt-8 border-b border-border/60">
        <nav className="flex flex-wrap items-center gap-1" aria-label="Proof tabs">
          {PROOF_TAB_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveTab(item.key)}
              className={
                activeTab === item.key
                  ? "inline-flex items-center border-b-2 border-primary px-3 py-2 text-sm font-medium text-foreground"
                  : "inline-flex items-center border-b-2 border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

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
