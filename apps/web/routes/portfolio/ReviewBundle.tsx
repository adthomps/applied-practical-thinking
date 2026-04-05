import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Download,
  FileText,
  HardDriveDownload,
  Network,
  Palette,
  Route,
  Sparkles,
} from "lucide-react";
import {
  AptButton,
  AptCard,
  AptCardContent,
  AptCardDescription,
  AptCardFooter,
  AptCardHeader,
  AptCardTitle,
  AptTag,
  SectionIntro,
} from "@/components/apt";
import { useReviewBundleManifest } from "@/hooks/useReviewBundleManifest";

const routeCompanions = [
  {
    title: "Design",
    path: "/design",
    description: "The public doctrine index and the main entry point for design standards.",
  },
  {
    title: "Design Thinking",
    path: "/design/thinking",
    description: "Use when the review is about framing, alternatives, and decision-making quality.",
  },
  {
    title: "Design System",
    path: "/design/system",
    description: "Use when the review is about the shared component contract and visual language.",
  },
  {
    title: "Design Architecture",
    path: "/design/architecture",
    description: "Use when the review is about structure, boundaries, or deployment concerns.",
  },
  {
    title: "Content Strategy",
    path: "/design/content-strategy",
    description: "Use when the review is about IA, section roles, and public navigation.",
  },
  {
    title: "Systems",
    path: "/design/systems",
    description: "Use when the review depends on stable reference models and system relationships.",
  },
];

type BundleCard = {
  id: string;
  title: string;
  path: string;
  filename: string;
  description: string;
  tag: string;
  tagVariant: "default" | "accent" | "muted" | "primary" | "secondary" | "outline" | "ghost";
  icon: typeof Bot;
  order: number;
};

type BundleCta = {
  id: string;
  label: string;
  url: string;
  variant: "primary" | "secondary" | "ghost" | "outline" | "link" | "accent";
  icon: typeof Bot;
  order: number;
};

function filenameFromUrl(url: string) {
  const [withoutQuery] = url.split("?");
  const segments = withoutQuery.split("/").filter(Boolean);
  return segments[segments.length - 1] || withoutQuery;
}

const bundleIconMap: Record<string, typeof Bot> = {
  bot: Bot,
  download: Download,
  "file-text": FileText,
  "hard-drive-download": HardDriveDownload,
  network: Network,
  palette: Palette,
  route: Route,
  sparkles: Sparkles,
};

function getIconFromManifest(iconName: string | undefined) {
  if (!iconName) return FileText;
  return bundleIconMap[iconName] || FileText;
}

export default function PortfolioReviewBundle() {
  const { manifest, loading, error } = useReviewBundleManifest();
  const docsMajors = useMemo(() => {
    if (Array.isArray(manifest?.docsMajors) && manifest?.docsMajors.length > 0) {
      return [...manifest.docsMajors].sort((a, b) => b - a);
    }
    return typeof manifest?.docsMajor === "number" ? [manifest.docsMajor] : [];
  }, [manifest]);

  const actionButtons = useMemo(() => {
    const files = manifest?.bundleFiles || [];
    const ctas: BundleCta[] = files
      .filter((file) => typeof file.ui?.ctaOrder === "number" && Boolean(file.ui?.ctaLabel) && Boolean(file.ui?.ctaVariant))
      .map((file) => ({
        id: file.id,
        label: file.ui?.ctaLabel || file.title,
        url: file.url,
        variant: (file.ui?.ctaVariant || "primary") as BundleCta["variant"],
        icon: getIconFromManifest(file.ui?.icon),
        order: file.ui?.ctaOrder || 0,
      }))
      .sort((left, right) => left.order - right.order);

    return ctas;
  }, [manifest]);

  const bundleCards = useMemo(() => {
    const files = manifest?.bundleFiles || [];
    const cards = files
      .filter((file) => typeof file.ui?.cardOrder === "number" && Boolean(file.ui?.tagLabel) && Boolean(file.ui?.tagVariant))
      .map((file): BundleCard => {
        const ui = file.ui!;

        return {
          id: file.id,
          title: file.title,
          path: file.url,
          filename: filenameFromUrl(file.url),
          description: ui.description || `Portable review asset (${file.contentType || "file"}).`,
          tag: ui.tagLabel,
          tagVariant: ui.tagVariant,
          icon: getIconFromManifest(ui.icon),
          order: ui.cardOrder,
        };
      })
      .sort((left, right) => left.order - right.order);

    return cards;
  }, [manifest]);

  const handoffBundles = useMemo(() => {
    const handoffs = manifest?.recommendedHandoffs || [];
    const docsById = new Map((manifest?.documents || []).map((doc) => [doc.id, doc.title]));

    return handoffs
      .filter((handoff) => typeof handoff.ui?.order === "number" && Boolean(handoff.ui?.title))
      .map((handoff) => {
        const items = handoff.documents.map((id) => docsById.get(id) || id);
        if (handoff.requiresTargetArtifact) {
          items.push(handoff.ui?.targetArtifactLabel || "Target artifact");
        }

        return {
          title: handoff.ui?.title || handoff.name,
          items,
          order: handoff.ui?.order || 0,
        };
      })
      .sort((left, right) => left.order - right.order);
  }, [manifest]);

  return (
    <div className="container py-12 md:py-16 space-y-16">
      <section>
        <SectionIntro
          title="AI Review Bundle"
          description="A single public handoff for standards-based review. Use this page when you want to point an external AI or collaborator to the review standard and the core doctrine docs without sending them through the full repo first."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
          eyebrow={<AptTag variant="accent">AI Review Bundle</AptTag>}
        >
          <div className="flex flex-wrap gap-3">
            {actionButtons.map((file) => {
              const Icon = file.icon;

              return (
              <AptButton key={file.id} variant={file.variant} asChild>
                <a href={file.url} download>
                  <Icon className="h-4 w-4" />
                  {file.label}
                </a>
              </AptButton>
            );
          })}
          </div>
          <div className="flex flex-wrap gap-2">
            {manifest?.version ? <AptTag variant="outline">Bundle v{manifest.version}</AptTag> : null}
            {docsMajors.map((major) => (
              <AptTag key={major} variant="muted">Docs v{major}</AptTag>
            ))}
            {manifest?.updatedAt ? <AptTag variant="ghost">Updated {manifest.updatedAt}</AptTag> : null}
          </div>
          {loading && <p className="text-sm text-muted-foreground">Loading review bundle metadata…</p>}
          {error && !loading && (
            <p className="text-sm text-muted-foreground">Review bundle metadata could not be loaded right now.</p>
          )}
        </SectionIntro>
      </section>

      <section>
        <SectionIntro
          title="Core bundle files"
          description="These are the public markdown assets that make the review bundle portable. Start with the review standard, then pair it with the doctrine docs that match the work under review."
          className="mb-6"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bundleCards.map((doc) => {
            const Icon = doc.icon;
            const preferredMajor = docsMajors[0];
            const canonicalPath =
              preferredMajor && doc.path.startsWith("/docs/design/") && !/\/docs\/design\/v\d+\//.test(doc.path)
                ? doc.path.replace("/docs/design/", `/docs/design/v${preferredMajor}/`)
                : null;
            return (
              <AptCard key={doc.id} variant="interactive" padding="large" className="h-full flex flex-col">
                <AptCardHeader className="p-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <AptTag variant={doc.tagVariant}>{doc.tag}</AptTag>
                    </div>
                  </div>
                  <AptCardTitle className="text-lg">{doc.title}</AptCardTitle>
                  <AptCardDescription>{doc.description}</AptCardDescription>
                </AptCardHeader>
                <AptCardContent className="mt-5">
                  <p className="text-xs text-muted-foreground">{doc.filename}</p>
                </AptCardContent>
                <AptCardFooter className="mt-auto flex-wrap px-0 pb-0">
                  <AptButton variant="outline" size="sm" asChild>
                    <a href={doc.path} target="_blank" rel="noreferrer">
                      Open
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </AptButton>
                  <AptButton variant="ghost" size="sm" asChild>
                    <a href={doc.path} download>
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  </AptButton>
                  {canonicalPath ? (
                    <AptButton variant="ghost" size="sm" asChild>
                      <a href={canonicalPath} target="_blank" rel="noreferrer">
                        Canonical
                      </a>
                    </AptButton>
                  ) : null}
                </AptCardFooter>
              </AptCard>
            );
          })}
          {!loading && !error && bundleCards.length === 0 && (
            <AptCard variant="subtle" padding="large" className="md:col-span-2 xl:col-span-3">
              <AptCardHeader className="p-0">
                <AptCardTitle className="text-lg">No bundle files available</AptCardTitle>
                <AptCardDescription>
                  The review bundle manifest did not return any portable bundle files.
                </AptCardDescription>
              </AptCardHeader>
            </AptCard>
          )}
        </div>
      </section>

      <section>
        <SectionIntro
          title="Use with the Design area"
          description="The markdown files are the portable handoff, but the route pages remain the clearest public reading experience when a reviewer needs more context."
          className="mb-6"
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {routeCompanions.map((item) => (
            <Link key={item.path} to={item.path} className="block group">
              <AptCard variant="subtle" padding="large" className="h-full">
                <AptCardHeader className="p-0">
                  <AptCardTitle className="text-lg">{item.title}</AptCardTitle>
                  <AptCardDescription>{item.description}</AptCardDescription>
                </AptCardHeader>
                <AptCardFooter className="px-0 pb-0 border-0">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Open route
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </AptCardFooter>
              </AptCard>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionIntro
          title="Recommended handoff sets"
          description="Use the smallest bundle that still gives the reviewer the governing standards and the target artifact."
          className="mb-6"
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {handoffBundles.map((bundle) => (
            <AptCard key={bundle.title} variant="default" padding="large" className="h-full">
              <AptCardHeader className="p-0">
                <AptCardTitle className="text-lg">{bundle.title}</AptCardTitle>
              </AptCardHeader>
              <AptCardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {bundle.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </AptCardContent>
            </AptCard>
          ))}
          {!loading && !error && handoffBundles.length === 0 && (
            <AptCard variant="subtle" padding="large" className="md:col-span-2 xl:col-span-4">
              <AptCardHeader className="p-0">
                <AptCardTitle className="text-lg">No handoff sets available</AptCardTitle>
                <AptCardDescription>
                  The review bundle manifest did not include recommended handoff sets.
                </AptCardDescription>
              </AptCardHeader>
            </AptCard>
          )}
        </div>
      </section>
    </div>
  );
}
