import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  BookOpen,
  Download,
  FileText,
  HardDriveDownload,
  Network,
  Palette,
  Route,
  ShieldCheck,
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
  ValidationStatusCallout,
} from "@/components/apt";
import { useReviewBundleManifest } from "@/hooks/useReviewBundleManifest";

const routeCompanions = [
  {
    title: "Design",
    path: "/design",
    description: "The public doctrine index and the main entry point for design standards.",
  },
  {
    title: "Principles",
    path: "/design/principles",
    description: "Canonical APT principles framework across all build and operations layers.",
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
];

const PRIMARY_CTA_IDS = ["review-standard-markdown", "principles-framework-markdown", "bundle-manifest-json"] as const;

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

type HandoffDocument = {
  id: string;
  title: string;
  path: string;
};

type StarterPack = {
  id: string;
  title: string;
  description: string;
  order: number;
  targetArtifactLabel: string;
  documents: HandoffDocument[];
};

function filenameFromUrl(url: string) {
  const [withoutQuery] = url.split("?");
  const segments = withoutQuery.split("/").filter(Boolean);
  return segments[segments.length - 1] || withoutQuery;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function downloadTextFile(filename: string, contents: string) {
  const blob = new Blob([contents], { type: "text/markdown;charset=utf-8" });
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(objectUrl);
}

const bundleIconMap: Record<string, typeof Bot> = {
  bot: Bot,
  "book-open": BookOpen,
  download: Download,
  "file-text": FileText,
  "hard-drive-download": HardDriveDownload,
  network: Network,
  palette: Palette,
  route: Route,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
};

function getIconFromManifest(iconName: string | undefined) {
  if (!iconName) return FileText;
  return bundleIconMap[iconName] || FileText;
}

export default function PortfolioReviewBundle() {
  const { manifest, loading, error } = useReviewBundleManifest();

  const docsMajors = useMemo(() => {
    if (Array.isArray(manifest?.docsMajors) && manifest.docsMajors.length > 0) {
      return [...manifest.docsMajors].sort((a, b) => b - a);
    }
    return typeof manifest?.docsMajor === "number" ? [manifest.docsMajor] : [];
  }, [manifest]);

  const actionButtons = useMemo(() => {
    const files = manifest?.bundleFiles || [];
    return files
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
  }, [manifest]);

  const primaryActionButtons = useMemo(() => {
    const byId = new Map(actionButtons.map((button) => [button.id, button]));
    return PRIMARY_CTA_IDS.map((id) => byId.get(id)).filter((item): item is BundleCta => Boolean(item));
  }, [actionButtons]);

  const secondaryActionButtons = useMemo(() => {
    const primary = new Set(PRIMARY_CTA_IDS);
    return actionButtons.filter((button) => !primary.has(button.id as (typeof PRIMARY_CTA_IDS)[number]));
  }, [actionButtons]);

  const bundleCards = useMemo(() => {
    const files = manifest?.bundleFiles || [];
    return files
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
  }, [manifest]);

  const starterPacks = useMemo(() => {
    const docsById = new Map((manifest?.documents || []).map((doc) => [doc.id, doc]));

    if (Array.isArray(manifest?.starterPacks) && manifest.starterPacks.length > 0) {
      return manifest.starterPacks
        .map((pack) => {
          const documents = (pack.documents || [])
            .map((id) => {
              const doc = docsById.get(id);
              if (!doc) return null;
              return { id, title: doc.title || id, path: doc.path || "" };
            })
            .filter((doc): doc is HandoffDocument => Boolean(doc && doc.path));

          return {
            id: pack.id,
            title: pack.title,
            description: pack.description || "Curated starter pack for standards-based review.",
            order: pack.order,
            targetArtifactLabel: pack.targetArtifactLabel || "Target artifact",
            documents,
          };
        })
        .sort((left, right) => left.order - right.order);
    }

    const handoffs = manifest?.recommendedHandoffs || [];
    return handoffs
      .filter((handoff) => typeof handoff.ui?.order === "number" && Boolean(handoff.ui?.title))
      .map((handoff) => {
        const documents = handoff.documents
          .map((id) => {
            const doc = docsById.get(id);
            if (!doc) return null;
            return {
              id,
              title: doc.title || id,
              path: doc.path || "",
            };
          })
          .filter((doc): doc is HandoffDocument => Boolean(doc && doc.path));

        return {
          id: handoff.name,
          title: handoff.ui?.title || handoff.name,
          description: "Curated starter pack for standards-based review.",
          targetArtifactLabel: handoff.ui?.targetArtifactLabel || "Target artifact",
          documents,
          order: handoff.ui?.order || 0,
        };
      })
      .sort((left, right) => left.order - right.order);
  }, [manifest]);

  function buildStarterPackMarkdown(pack: StarterPack) {
    const docsMajorsLabel = docsMajors.length > 0 ? docsMajors.join(", ") : "unknown";
    const now = new Date().toISOString();
    const lines: string[] = [
      "# APT AI Review Starter Pack",
      "",
      `- Pack: ${pack.title}`,
      `- Generated: ${now}`,
      `- Bundle manifest version: ${manifest?.version || "unknown"}`,
      `- Design docs majors: ${docsMajorsLabel}`,
      "",
      "## Review Instructions",
      "",
      "1. Read `APT-REVIEW-STANDARD.md` first if included below.",
      "2. Open the target artifact and compare against each governing document.",
      `3. Include target artifact context: ${pack.targetArtifactLabel}.`,
      "4. Output findings first with violated standard and smallest corrective action.",
      "",
      "## Included Files",
      "",
    ];

    for (const doc of pack.documents) {
      lines.push(`- ${doc.title}`);
      lines.push(`  - URL: ${doc.path}`);
    }

    lines.push("");
    lines.push("## Validation Snapshot");
    lines.push("");
    lines.push("- Markdown: /docs/design/validation/LATEST.md");
    lines.push("- JSON: /docs/design/validation/LATEST.json");
    lines.push("");

    return `${lines.join("\n")}\n`;
  }

  function downloadStarterPack(pack: StarterPack) {
    const filename = `apt-review-handoff-${slugify(pack.id || pack.title)}.md`;
    downloadTextFile(filename, buildStarterPackMarkdown(pack));
  }

  return (
    <div className="container py-12 md:py-16 space-y-16">
      <section>
        <SectionIntro
          title="AI Review Bundle"
          description="A single public handoff for standards-based review. Starter packs are primary, and the full bundle index remains available when deeper reference is needed."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
          eyebrow={<AptTag variant="accent">AI Review Bundle</AptTag>}
        >
          <div className="flex flex-wrap gap-3">
            {primaryActionButtons.map((file) => {
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
          {secondaryActionButtons.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {secondaryActionButtons.map((file) => (
                <AptButton key={file.id} variant="ghost" size="sm" asChild>
                  <a href={file.url} download>
                    {file.label}
                  </a>
                </AptButton>
              ))}
            </div>
          ) : null}
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
        <ValidationStatusCallout
          title="Validation Snapshot"
          description="Use validation for current conformance status, and the bundle for governing doctrine and review packs."
          showReviewBundleLink={false}
        />
      </section>

      <section>
        <SectionIntro
          title="Starter Packs"
          description="Use the smallest pack that still includes governing standards plus the target artifact."
          className="mb-6"
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {starterPacks.map((pack) => (
            <AptCard key={pack.id} variant="default" padding="large" className="h-full flex flex-col">
              <AptCardHeader className="p-0">
                <AptCardTitle className="text-lg">{pack.title}</AptCardTitle>
                <AptCardDescription>{pack.description}</AptCardDescription>
              </AptCardHeader>
              <AptCardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {pack.documents.map((item) => (
                    <li key={item.id} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item.title}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{pack.targetArtifactLabel}</span>
                  </li>
                </ul>
              </AptCardContent>
              <AptCardFooter className="mt-auto flex-wrap px-0 pb-0 border-0">
                <AptButton variant="outline" size="sm" type="button" onClick={() => downloadStarterPack(pack)}>
                  <Download className="h-4 w-4" />
                  Download Starter Pack
                </AptButton>
              </AptCardFooter>
            </AptCard>
          ))}
          {!loading && !error && starterPacks.length === 0 && (
            <AptCard variant="subtle" padding="large" className="md:col-span-2 xl:col-span-3">
              <AptCardHeader className="p-0">
                <AptCardTitle className="text-lg">No starter packs available</AptCardTitle>
                <AptCardDescription>
                  The review bundle manifest did not include starter-pack metadata.
                </AptCardDescription>
              </AptCardHeader>
            </AptCard>
          )}
        </div>
      </section>

      <section>
        <SectionIntro
          title="Full Bundle Index"
          description="Long-tail documentation, references, and machine-readable artifacts for deeper review passes."
          className="mb-6"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bundleCards.map((doc) => {
            const Icon = doc.icon;
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
          title="Use with the Design Area"
          description="Route pages remain the clearest reading experience when a reviewer needs context beyond the markdown artifacts."
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
    </div>
  );
}
