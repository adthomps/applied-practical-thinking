import { Hono } from "hono";
import {
  contentIndexTypes,
  type ContentDetailResponse,
  type ContentIndexItem,
  type ContentIndexType,
  type PublicDesignDocDetailResponse,
  type PublicDesignDocItem,
  type PublicDesignDocVersionItem,
  type PublicDesignDocVersionsResponse,
  type PublicReviewBundleManifest,
} from "@apt/knowledge";
import type { WorkerBindings } from "../workerTypes";

const DESIGN_DOCS_MANIFEST_PATH = "/docs/design/APT-DESIGN-DOCS-MANIFEST.json";
const REVIEW_BUNDLE_MANIFEST_PATH = "/docs/design/APT-AI-REVIEW-BUNDLE.json";

type DesignDocsManifestVersion = {
  major: number;
  semanticVersion?: string;
  status?: string;
  sourcePath?: string;
  canonicalPath?: string;
  publishedAt?: string;
  changelog?: string;
};

type DesignDocsManifestDocument = {
  docId?: string;
  slug: string;
  title: string;
  description?: string;
  latestMajor?: number;
  aliasPath?: string;
  versions?: DesignDocsManifestVersion[];
  sourceFile?: string;
  canonicalPath?: string;
  semanticVersion?: string;
  major?: number;
  status?: string;
};

type DesignDocsManifest = {
  currentStableMajor?: number;
  documents?: DesignDocsManifestDocument[];
};

const publicDesignDocs: PublicDesignDocItem[] = [
  {
    slug: "overview",
    title: "APT Design Overview",
    path: "APT-DESIGN-OVERVIEW.md",
    description: "The public operating model for how APT organizes design doctrine, standards, and reference layers.",
  },
  {
    slug: "thinking",
    title: "APT Design Thinking",
    path: "APT-DESIGN-THINKING.md",
    description: "Problem framing, assumptions, constraints, and decision-making in practice.",
  },
  {
    slug: "system",
    title: "APT Design System",
    path: "APT-DESIGN-SYSTEM.md",
    description: "APT's visual language, semantic tokens, components, and usage rules.",
  },
  {
    slug: "architecture",
    title: "APT Design Architecture",
    path: "APT-DESIGN-ARCHITECTURE.md",
    description: "Repo layout, deployment flows, API contracts, and enforcement rules.",
  },
  {
    slug: "content-strategy",
    title: "APT Content Strategy",
    path: "APT-CONTENT-STRATEGY.md",
    description: "How APT organizes information architecture, visitor paths, and content maturity.",
  },
  {
    slug: "systems",
    title: "APT Systems Reference Models",
    path: "APT-DESIGN-SYSTEMS.md",
    description: "How APT defines stable reference models and what belongs in the Systems layer.",
  },
  {
    slug: "core",
    title: "Design Core",
    path: "APT-DESIGN-CORE.md",
    description: "Foundational design principles and system intent.",
  },
  {
    slug: "site",
    title: "Design Site",
    path: "APT-DESIGN-SITE.md",
    description: "Site-specific design patterns and application details.",
  },
  {
    slug: "demos",
    title: "Design Demos",
    path: "APT-DESIGN-DEMOS.md",
    description: "Patterns and examples for demo-oriented pages and prototypes.",
  },
  {
    slug: "vpds-alignment",
    title: "VPDS Alignment",
    path: "APT-VPDS-ALIGNMENT.md",
    description: "Visual and product design alignment guidance.",
  },
];

function pathFromAlias(aliasPath: string) {
  if (!aliasPath) return "";
  const parts = aliasPath.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
}

function normalizeManifestDoc(doc: DesignDocsManifestDocument, fallbackMajor?: number): DesignDocsManifestDocument {
  const hasVersions = Array.isArray(doc.versions) && doc.versions.length > 0;
  if (hasVersions) return doc;

  const legacyMajor = doc.major ?? fallbackMajor;
  const legacyCanonicalPath = doc.canonicalPath;

  if (!legacyMajor || !legacyCanonicalPath) return doc;

  const sourceFile = doc.sourceFile || pathFromAlias(doc.aliasPath || legacyCanonicalPath);
  const legacySourcePath = sourceFile ? `versions/v${legacyMajor}/${sourceFile}` : undefined;

  return {
    ...doc,
    latestMajor: doc.latestMajor ?? legacyMajor,
    versions: [
      {
        major: legacyMajor,
        semanticVersion: doc.semanticVersion,
        status: doc.status,
        sourcePath: legacySourcePath,
        canonicalPath: legacyCanonicalPath,
      },
    ],
  };
}

function getLatestVersion(doc: DesignDocsManifestDocument): DesignDocsManifestVersion | null {
  const versions = Array.isArray(doc.versions) ? [...doc.versions] : [];
  if (versions.length === 0) return null;

  if (Number.isInteger(doc.latestMajor)) {
    const explicit = versions.find((version) => Number(version.major) === Number(doc.latestMajor));
    if (explicit) return explicit;
  }

  versions.sort((left, right) => Number(right.major) - Number(left.major));
  return versions[0] || null;
}

function toPublicDesignDocItem(document: DesignDocsManifestDocument): PublicDesignDocItem | null {
  const latestVersion = getLatestVersion(document);
  const aliasPath = document.aliasPath || "";
  const fallbackPath = document.sourceFile || pathFromAlias(aliasPath);

  if (!document.slug || !document.title) return null;

  return {
    docId: document.docId,
    slug: document.slug,
    title: document.title,
    description: document.description,
    path: fallbackPath,
    latestMajor: document.latestMajor,
    major: latestVersion?.major,
    semanticVersion: latestVersion?.semanticVersion || document.semanticVersion,
    status: latestVersion?.status || document.status,
    publishedAt: latestVersion?.publishedAt,
    changelog: latestVersion?.changelog,
    aliasPath: document.aliasPath,
    canonicalPath: latestVersion?.canonicalPath || document.canonicalPath,
  };
}

function toPublicDesignDocVersionsResponse(
  document: DesignDocsManifestDocument
): PublicDesignDocVersionsResponse {
  const versions: PublicDesignDocVersionItem[] = (document.versions || [])
    .map((version) => ({
      major: Number(version.major),
      semanticVersion: version.semanticVersion,
      status: version.status,
      publishedAt: version.publishedAt,
      changelog: version.changelog,
      canonicalPath: version.canonicalPath,
    }))
    .filter((version) => Number.isInteger(version.major))
    .sort((left, right) => right.major - left.major);

  return {
    slug: document.slug,
    title: document.title,
    latestMajor: document.latestMajor,
    versions,
  };
}

async function getDesignDocsManifest(
  requestUrl: string,
  configuredOrigin?: string,
  requestOrigin?: string
): Promise<DesignDocsManifest> {
  return fetchStaticJson<DesignDocsManifest>(
    requestUrl,
    DESIGN_DOCS_MANIFEST_PATH,
    configuredOrigin,
    requestOrigin
  );
}

async function getPublicDesignDocsFromManifest(
  requestUrl: string,
  configuredOrigin?: string,
  requestOrigin?: string
): Promise<PublicDesignDocItem[]> {
  const manifest = await getDesignDocsManifest(requestUrl, configuredOrigin, requestOrigin);

  const documents = Array.isArray(manifest.documents) ? manifest.documents : [];
  const normalizedDocs = documents
    .map((doc) => normalizeManifestDoc(doc, manifest.currentStableMajor))
    .filter((doc) => Boolean(doc.slug && doc.title));

  return normalizedDocs
    .map((doc) => toPublicDesignDocItem(doc))
    .filter((doc): doc is PublicDesignDocItem => Boolean(doc));
}

async function getVersionedDesignDocsFromManifest(
  requestUrl: string,
  configuredOrigin?: string,
  requestOrigin?: string
): Promise<DesignDocsManifestDocument[]> {
  const manifest = await getDesignDocsManifest(requestUrl, configuredOrigin, requestOrigin);
  const documents = Array.isArray(manifest.documents) ? manifest.documents : [];
  return documents
    .map((doc) => normalizeManifestDoc(doc, manifest.currentStableMajor))
    .filter((doc) => Boolean(doc.slug && doc.title));
}

function normalizeOrigin(value: string) {
  return value.trim().replace(/\/+$/, "");
}

function isLocalDevOrigin(value: string) {
  try {
    const url = new URL(value);
    return (
      (url.hostname === "127.0.0.1" || url.hostname === "localhost") &&
      url.port !== "8787"
    );
  } catch {
    return false;
  }
}

function getStaticOrigin(requestUrl: string, configuredOrigin?: string, requestOrigin?: string) {
  const current = new URL(requestUrl);
  if ((current.hostname === "127.0.0.1" || current.hostname === "localhost") && current.port === "8787") {
    if (requestOrigin && isLocalDevOrigin(requestOrigin)) {
      return normalizeOrigin(requestOrigin);
    }

    return "http://127.0.0.1:8080";
  }

  if (configuredOrigin?.trim()) {
    return normalizeOrigin(configuredOrigin);
  }

  throw new Error(
    "Worker runtime configuration is incomplete. Set PUBLIC_SITE_ORIGIN on the Cloudflare Worker to https://applied-practical-thinking.pages.dev."
  );
}

async function fetchStaticText(
  requestUrl: string,
  pathname: string,
  configuredOrigin?: string,
  requestOrigin?: string
) {
  const origin = getStaticOrigin(requestUrl, configuredOrigin, requestOrigin);
  const res = await fetch(`${origin}${pathname}`);
  if (!res.ok) {
    throw new Error(`Failed to load static asset: ${pathname}`);
  }

  return res.text();
}

async function fetchStaticJson<T>(
  requestUrl: string,
  pathname: string,
  configuredOrigin?: string,
  requestOrigin?: string
): Promise<T> {
  const origin = getStaticOrigin(requestUrl, configuredOrigin, requestOrigin);
  const res = await fetch(`${origin}${pathname}`);
  if (!res.ok) {
    throw new Error(`Failed to load static asset: ${pathname}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    const body = await res.text();
    const preview = body.trim().slice(0, 160);
    throw new Error(
      `Expected JSON from ${origin}${pathname}, received ${contentType || "unknown"}${preview ? `: ${preview}` : ""}`
    );
  }

  return (await res.json()) as T;
}

function stripFrontmatter(markdown: string) {
  return markdown.replace(/^---[\s\S]*?---\s*/, "").trim();
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error.trim()) return error;
  return fallback;
}

function normalizeItem(type: ContentIndexType, item: ContentIndexItem): ContentIndexItem {
  const assetDir = item.contentPath.split("/").slice(0, -1).join("/");
  return {
    ...item,
    indexType: type,
    assetBasePath: assetDir ? `/content/${assetDir}/` : "/content/",
  };
}

export const publicContentRoute = new Hono<{ Bindings: WorkerBindings }>()
  .get("/api/content/:type", async (c) => {
    const type = c.req.param("type") as ContentIndexType;
    const requestOrigin = c.req.header("origin");
    if (!contentIndexTypes.includes(type)) {
      return c.json({ error: `Unsupported content type: ${type}` }, 404);
    }

    try {
      const items = await fetchStaticJson<ContentIndexItem[]>(
        c.req.url,
        `/data/${type}-index.json`,
        c.env.PUBLIC_SITE_ORIGIN,
        requestOrigin
      );
      return c.json(items.map((item) => normalizeItem(type, item)));
    } catch (error: unknown) {
      return c.json(
        {
          error: getErrorMessage(error, "Failed to load content index"),
          envVar: "PUBLIC_SITE_ORIGIN",
          expectedProductionValue: "https://applied-practical-thinking.pages.dev",
        },
        500
      );
    }
  })
  .get("/api/content/:type/:idOrSlug", async (c) => {
    const type = c.req.param("type") as ContentIndexType;
    const idOrSlug = c.req.param("idOrSlug");
    const requestOrigin = c.req.header("origin");

    if (!contentIndexTypes.includes(type)) {
      return c.json({ error: `Unsupported content type: ${type}` }, 404);
    }

    try {
      const items = await fetchStaticJson<ContentIndexItem[]>(
        c.req.url,
        `/data/${type}-index.json`,
        c.env.PUBLIC_SITE_ORIGIN,
        requestOrigin
      );
      const normalizedItems = items.map((item) => normalizeItem(type, item));
      const item =
        normalizedItems.find((entry) => entry.id === idOrSlug || entry.slug === idOrSlug) || null;

      if (!item?.contentPath) {
        const response: ContentDetailResponse = { item: null, markdown: "" };
        return c.json(response, 404);
      }

      const rawMarkdown = await fetchStaticText(
        c.req.url,
        `/content/${item.contentPath}`,
        c.env.PUBLIC_SITE_ORIGIN,
        requestOrigin
      );
      const response: ContentDetailResponse = {
        item,
        markdown: stripFrontmatter(rawMarkdown),
      };
      return c.json(response);
    } catch (error: unknown) {
      return c.json(
        {
          error: getErrorMessage(error, "Failed to load content detail"),
          envVar: "PUBLIC_SITE_ORIGIN",
          expectedProductionValue: "https://applied-practical-thinking.pages.dev",
        },
        500
      );
    }
  })
  .get("/api/design/docs", async (c) => {
    try {
      const docs = await getPublicDesignDocsFromManifest(
        c.req.url,
        c.env.PUBLIC_SITE_ORIGIN,
        c.req.header("origin")
      );
      if (docs.length > 0) return c.json(docs);
      return c.json(publicDesignDocs);
    } catch {
      return c.json(publicDesignDocs);
    }
  })
  .get("/api/design/docs/:slug/versions", async (c) => {
    const slug = c.req.param("slug");

    try {
      const docs = await getVersionedDesignDocsFromManifest(
        c.req.url,
        c.env.PUBLIC_SITE_ORIGIN,
        c.req.header("origin")
      );
      const doc = docs.find((entry) => entry.slug === slug) || null;
      if (!doc) {
        return c.json({ error: `Design doc not found: ${slug}` }, 404);
      }

      return c.json(toPublicDesignDocVersionsResponse(doc));
    } catch (error: unknown) {
      return c.json(
        {
          error: getErrorMessage(error, "Failed to load design doc versions"),
          envVar: "PUBLIC_SITE_ORIGIN",
          expectedProductionValue: "https://applied-practical-thinking.pages.dev",
        },
        500
      );
    }
  })
  .get("/api/design/docs/:slug/:major", async (c) => {
    const slug = c.req.param("slug");
    const major = Number(c.req.param("major"));
    if (!Number.isInteger(major) || major <= 0) {
      return c.json({ error: `Invalid major version: ${c.req.param("major")}` }, 400);
    }

    try {
      const docs = await getVersionedDesignDocsFromManifest(
        c.req.url,
        c.env.PUBLIC_SITE_ORIGIN,
        c.req.header("origin")
      );
      const doc = docs.find((entry) => entry.slug === slug) || null;
      if (!doc) {
        const response: PublicDesignDocDetailResponse = { item: null, markdown: "" };
        return c.json(response, 404);
      }

      const version = (doc.versions || []).find((entry) => Number(entry.major) === major);
      if (!version?.canonicalPath) {
        const response: PublicDesignDocDetailResponse = { item: null, markdown: "" };
        return c.json(response, 404);
      }

      const markdown = await fetchStaticText(
        c.req.url,
        version.canonicalPath,
        c.env.PUBLIC_SITE_ORIGIN,
        c.req.header("origin")
      );

      const item = toPublicDesignDocItem({ ...doc, latestMajor: major, versions: [version] });
      const response: PublicDesignDocDetailResponse = { item, markdown };
      return c.json(response);
    } catch (error: unknown) {
      return c.json(
        {
          error: getErrorMessage(error, "Failed to load versioned design doc"),
          envVar: "PUBLIC_SITE_ORIGIN",
          expectedProductionValue: "https://applied-practical-thinking.pages.dev",
        },
        500
      );
    }
  })
  .get("/api/design/docs/:slug", async (c) => {
    const slug = c.req.param("slug");
    let docs = publicDesignDocs;

    try {
      const manifestDocs = await getPublicDesignDocsFromManifest(
        c.req.url,
        c.env.PUBLIC_SITE_ORIGIN,
        c.req.header("origin")
      );
      if (manifestDocs.length > 0) docs = manifestDocs;
    } catch {
      // Fall back to the in-code docs map if manifest fetch fails.
    }

    const item = docs.find((entry) => entry.slug === slug) || null;

    if (!item) {
      const response: PublicDesignDocDetailResponse = { item: null, markdown: "" };
      return c.json(response, 404);
    }

    try {
      const markdownPath = item.aliasPath || item.canonicalPath || `/docs/design/${item.path}`;
      const markdown = await fetchStaticText(
        c.req.url,
        markdownPath,
        c.env.PUBLIC_SITE_ORIGIN,
        c.req.header("origin")
      );
      const response: PublicDesignDocDetailResponse = { item, markdown };
      return c.json(response);
    } catch (error: unknown) {
      return c.json(
        {
          error: getErrorMessage(error, "Failed to load design doc"),
          envVar: "PUBLIC_SITE_ORIGIN",
          expectedProductionValue: "https://applied-practical-thinking.pages.dev",
        },
        500
      );
    }
  })
  .get("/api/design/review-bundle", async (c) => {
    try {
      const manifest = await fetchStaticJson<PublicReviewBundleManifest>(
        c.req.url,
        REVIEW_BUNDLE_MANIFEST_PATH,
        c.env.PUBLIC_SITE_ORIGIN,
        c.req.header("origin")
      );
      return c.json(manifest);
    } catch (error: unknown) {
      return c.json(
        {
          error: getErrorMessage(error, "Failed to load review bundle manifest"),
          envVar: "PUBLIC_SITE_ORIGIN",
          expectedProductionValue: "https://applied-practical-thinking.pages.dev",
        },
        500
      );
    }
  });
