import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { AptCard } from "@/components/apt/AptCard";
import { AptButton } from "@/components/apt/AptButton";
import { AptTag } from "@/components/apt/AptTag";
import { MarkdownContent } from "@/components/apt/MarkdownContent";
import { ContentIndexItem } from "@/src/services/contentIndex";
import { RelatedContentList } from "@/components/apt/RelatedContentList";
import { useToast } from "@/hooks/use-toast";
import { shareOrCopy } from "@/src/services/share";
import { getStatusTagDefinition } from "@/lib/tagSemantics";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Image as ImageIcon,
  Share2,
} from "lucide-react";

const contentTypeLabels: Record<string, string> = {
  article: "Article",
  blog: "Article",
  podcast: "Podcast",
  guide: "Guide",
  "design-review": "Design Review",
};

type ContentDetailPageProps = {
  backHref: string;
  backLabel: string;

  item: ContentIndexItem;
  markdown?: string;

  aboutTitle: string;
  markdownTitle?: string;

  /** Optional content inserted in the header area (e.g., InsightMeta). */
  headerMeta?: ReactNode;

  /** Optional fallback rendered in the hero area when thumbnail is missing. */
  heroFallback?: ReactNode;

  /** Optional content inserted near the top of the main column (e.g., podcast player). */
  mainTop?: ReactNode;

  /** Optional content inserted after markdown (e.g., concepts list, share). */
  mainBottom?: ReactNode;

  /** Optional extra content at top of the sidebar. */
  sidebarTop?: ReactNode;

  /** Optional extra content at bottom of the sidebar. */
  sidebarBottom?: ReactNode;

  /** Override actions card entirely; when omitted, uses item.links. */
  actionsOverride?: ReactNode;

  /** When true (default), show a Share action in the sidebar. */
  shareEnabled?: boolean;
};

export function ContentDetailPage(props: ContentDetailPageProps) {
  const {
    backHref,
    backLabel,
    item,
    markdown,
    aboutTitle,
    markdownTitle,
    headerMeta,
    heroFallback,
    mainTop,
    mainBottom,
    sidebarTop,
    sidebarBottom,
    actionsOverride,
    shareEnabled = true,
  } = props;

  const { toast } = useToast();

  const formatDate = (raw?: string) => {
    if (!raw) return null;
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return raw;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const publishedRaw = (item.publishedAt as string | undefined) || (item.date as string | undefined);
  const publishedLabel = formatDate(publishedRaw);
  const currentIdentifiers = new Set(
    [item.id, item.slug].filter((value): value is string => typeof value === "string" && value.length > 0)
  );
  const statusTag = getStatusTagDefinition(item.status as string | undefined);

  const isInternalHref = (href: string) => href.startsWith("/") && !href.startsWith("//");


  // Helper to generate correct internal URLs for known types
  const getInternalUrl = (key: string, href: string) => {
    if (href.startsWith("http")) return href;
    if (isInternalHref(href)) return href;
    const k = key.toLowerCase();
    const id = href.replace(/^\/+/, "");
    if (k.includes("article")) return `/learn/${id}`;
    if (k.includes("blog")) return `/learn/${id}`;
    if (k.includes("podcast")) return `/learn/${id}`;
    if (k.includes("guide")) return `/learn/${id}`;
    if (k.includes("review")) return `/learn/${id}`;
    if (k.includes("system")) return `/design/systems/${id}`;
    return href;
  };

  const ActionLink = ({ href, children, linkKey }: { href: string; children: ReactNode; linkKey?: string }) => {
    const finalHref = linkKey ? getInternalUrl(linkKey, href) : href;
    if (isInternalHref(finalHref)) {
      return (
        <Link to={finalHref} className="block">
          {children}
        </Link>
      );
    }
    return (
      <a href={finalHref} target="_blank" rel="noopener noreferrer" className="block">
        {children}
      </a>
    );
  };

  const links = item.links || {};
  const extraLinks = Object.entries(links)
    .filter(([key, value]) => {
      if (!value) return false;
      if (["demo", "repo", "figma", "lovable"].includes(key)) return false;
      const normalizedTarget = String(value).replace(/^\/+/, "");
      return !currentIdentifiers.has(normalizedTarget);
    })
    .map(([key, value]) => ({
      key,
      href: value,
      label:
        {
          blog: "Article",
          website: "Website",
          article: "Article",
          review: "Design Review",
          system: "System",
          read: "Read",
          listen: "Listen",
          youtube: "YouTube",
          spotify: "Spotify",
          apple: "Apple",
          transcript: "Transcript",
          slides: "Slides",
          pdf: "PDF",
          lovable: "Lovable",
        }[key] || key.replace(/[-_]/g, " "),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const hasDefaultActions = Boolean(links.demo || links.repo || links.figma || links.lovable);
  const hasAnyLinks = hasDefaultActions || extraLinks.length > 0;
  const showActionsCard = Boolean(actionsOverride || hasAnyLinks || shareEnabled);

  const handleShare = async () => {
    const url = window.location.href;
    const result = await shareOrCopy({ title: item.title, url });

    if (result.status === "shared") return;

    if (result.status === "copied") {
      toast({ title: "Link copied", description: "The URL is in your clipboard." });
      return;
    }

    toast({
      title: "Unable to share",
      description: "Sharing is not supported in this browser.",
      variant: "destructive",
    });
  };

  // Use concepts, platforms, and technologies for sidebar
  const conceptsForSidebar: string[] = Array.isArray(item.concepts) && item.concepts.length > 0 ? item.concepts : [];
  const platformsForSidebar: string[] = Array.isArray(item.platforms) && item.platforms.length > 0 ? item.platforms : [];
  const technologiesForSidebar: string[] = Array.isArray(item.technologies) && item.technologies.length > 0 ? item.technologies : [];

  return (
    <div className="container py-12 md:py-16">
      <Link
        to={backHref}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Featured Image */}
          <div className="aspect-video rounded-xl overflow-hidden bg-muted/30 border border-border/50">
            {item.thumbnail ? (
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : heroFallback ? (
              <div className="w-full h-full flex items-center justify-center">
                {heroFallback}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
              </div>
            )}
          </div>

          {/* Header */}
          <div>
            {headerMeta ? <div className="mb-3">{headerMeta}</div> : null}
            <div className="flex items-center gap-2 mb-3">
              {item.type && !headerMeta ? (
                <AptTag variant="primary">{contentTypeLabels[item.type] || item.type}</AptTag>
              ) : null}
              {statusTag ? <AptTag variant={statusTag.variant}>{statusTag.label}</AptTag> : null}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {item.title}
            </h1>
          </div>

          {mainTop ? <div>{mainTop}</div> : null}

          {/* Problem */}
          {item.problem ? (
            <AptCard variant="subtle">
              <div className="p-6">
                <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">
                  Problem
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {item.problem}
                </p>
              </div>
            </AptCard>
          ) : null}

          {/* Description */}
          {item.description ? (
            <AptCard variant="subtle">
              <div className="p-6 md:p-8">
                <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">{aboutTitle}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </AptCard>
          ) : null}

          {/* Markdown */}
          {markdown ? (
            <AptCard>
              <div className="p-6 md:p-8">
                {markdownTitle ? <h2 className="text-xl font-semibold mb-6">{markdownTitle}</h2> : null}
                <article className="prose-custom">
                  <MarkdownContent
                    markdown={markdown}
                    contentPath={item.contentPath}
                    assetBasePath={typeof item.assetBasePath === "string" ? item.assetBasePath : undefined}
                  />
                </article>
              </div>
            </AptCard>
          ) : null}

          {mainBottom ? <div>{mainBottom}</div> : null}

          {/* Related Content */}
          {Array.isArray(item.related) && item.related.length > 0 ? (
            <RelatedContentList related={item.related} />
          ) : null}
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-24 self-start">
          {sidebarTop ? <div>{sidebarTop}</div> : null}

          {/* Published */}
          {publishedLabel ? (
            <AptCard>
              <div className="p-6">
                <h3 className="text-sm font-semibold mb-2">Published</h3>
                <div className="text-sm text-muted-foreground">{publishedLabel}</div>
              </div>
            </AptCard>
          ) : null}

          {/* Actions */}
          {showActionsCard ? (
            actionsOverride ? (
              actionsOverride
            ) : (
              <AptCard>
                <div className="p-6 space-y-4">
                  {links.demo ? (
                    <ActionLink href={links.demo}>
                      <AptButton variant="primary" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Demo
                      </AptButton>
                    </ActionLink>
                  ) : null}

                  {links.repo ? (
                    <ActionLink href={links.repo}>
                      <AptButton variant="outline" className="w-full">
                        <Github className="h-4 w-4 mr-2" />
                        Repository
                      </AptButton>
                    </ActionLink>
                  ) : null}

                  {links.figma ? (
                    <ActionLink href={links.figma}>
                      <AptButton variant="outline" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Figma
                      </AptButton>
                    </ActionLink>
                  ) : null}

                  {links.lovable ? (
                    <ActionLink href={links.lovable}>
                      <AptButton variant="outline" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Lovable
                      </AptButton>
                    </ActionLink>
                  ) : null}


                  {/* Group extra links by type for clarity */}
                  {(() => {
                    const typeGroups = [
                      { type: 'article', label: 'Article', icon: <ExternalLink className="h-4 w-4 mr-2" /> },
                      { type: 'podcast', label: 'Podcast', icon: <ExternalLink className="h-4 w-4 mr-2" /> },
                      { type: 'guide', label: 'Guide', icon: <ExternalLink className="h-4 w-4 mr-2" /> },
                      { type: 'review', label: 'Design Review', icon: <ExternalLink className="h-4 w-4 mr-2" /> },
                    ];
                    // Map keys to types
                    const keyToType = (key) => {
                      if (key.includes('article') || key.includes('blog')) return 'article';
                      if (key.includes('podcast')) return 'podcast';
                      if (key.includes('guide')) return 'guide';
                      if (key.includes('review')) return 'review';
                      return 'other';
                    };
                    const grouped = {};
                    extraLinks.forEach((link) => {
                      const type = keyToType(link.key);
                      if (!grouped[type]) grouped[type] = [];
                      grouped[type].push(link);
                    });
                    return typeGroups.map(({ type, label, icon }) =>
                      grouped[type]?.length ? (
                        <div key={type}>
                          <div className="text-xs font-semibold text-muted-foreground mb-1 mt-2">{label}</div>
                          {grouped[type].map((link) => (
                            <ActionLink key={link.key} href={link.href} linkKey={link.key}>
                              <AptButton variant={hasAnyLinks ? "outline" : "primary"} className="w-full">
                                {icon}
                                {link.label}
                              </AptButton>
                            </ActionLink>
                          ))}
                        </div>
                      ) : null
                    ).concat(
                      grouped.other?.length
                        ? grouped.other.map((link) => (
                            <ActionLink key={link.key} href={link.href} linkKey={link.key}>
                              <AptButton variant={hasAnyLinks ? "outline" : "primary"} className="w-full">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                {link.label}
                              </AptButton>
                            </ActionLink>
                          ))
                        : null
                    );
                  })()}

                  {shareEnabled ? (
                    <AptButton
                      variant={hasAnyLinks ? "outline" : "primary"}
                      className="w-full"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </AptButton>
                  ) : null}
                </div>
              </AptCard>
            )
          ) : null}

          {/* Concepts */}
          {conceptsForSidebar.length > 0 ? (
            <AptCard>
              <div className="p-6">
                <h3 className="text-sm font-semibold mb-4">Concepts</h3>
                <div className="flex flex-wrap gap-2">
                  {conceptsForSidebar.map((concept: string) => (
                    <AptTag key={concept} variant="muted">
                      {concept}
                    </AptTag>
                  ))}
                </div>
              </div>
            </AptCard>
          ) : null}

          {/* Platforms */}
          {platformsForSidebar.length > 0 ? (
            <AptCard>
              <div className="p-6">
                <h3 className="text-sm font-semibold mb-4">Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {platformsForSidebar.map((platform: string) => (
                    <AptTag key={platform} variant="default">
                      {platform}
                    </AptTag>
                  ))}
                </div>
              </div>
            </AptCard>
          ) : null}

          {/* Technologies */}
          {technologiesForSidebar.length > 0 ? (
            <AptCard>
              <div className="p-6">
                <h3 className="text-sm font-semibold mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {technologiesForSidebar.map((tech: string) => (
                    <AptTag key={tech} variant="muted">
                      {tech}
                    </AptTag>
                  ))}
                </div>
              </div>
            </AptCard>
          ) : null}

          {sidebarBottom ? <div>{sidebarBottom}</div> : null}
        </div>
      </div>
    </div>
  );
}
