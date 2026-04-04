import { Hono } from "hono";
import {
  contentIndexTypes,
  type ContentDetailResponse,
  type ContentIndexItem,
  type ContentIndexType,
  type PublicDesignDocDetailResponse,
  type PublicDesignDocItem,
} from "@apt/knowledge";

type PublicContentBindings = {
  PUBLIC_SITE_ORIGIN?: string;
};

const DEV_WEB_ORIGIN = "http://127.0.0.1:5173";

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
    path: "design-core.md",
    description: "Foundational design principles and system intent.",
  },
  {
    slug: "site",
    title: "Design Site",
    path: "design-site.md",
    description: "Site-specific design patterns and application details.",
  },
  {
    slug: "demos",
    title: "Design Demos",
    path: "design-demos.md",
    description: "Patterns and examples for demo-oriented pages and prototypes.",
  },
  {
    slug: "vpds-alignment",
    title: "VPDS Alignment",
    path: "vpds-alignment.md",
    description: "Visual and product design alignment guidance.",
  },
];

function normalizeOrigin(value: string) {
  return value.trim().replace(/\/+$/, "");
}

function getStaticOrigin(requestUrl: string, configuredOrigin?: string) {
  if (configuredOrigin?.trim()) {
    return normalizeOrigin(configuredOrigin);
  }

  const current = new URL(requestUrl);
  if ((current.hostname === "127.0.0.1" || current.hostname === "localhost") && current.port === "8787") {
    return DEV_WEB_ORIGIN;
  }

  throw new Error(
    "Worker runtime configuration is incomplete. Set PUBLIC_SITE_ORIGIN on the Cloudflare Worker to https://applied-practical-thinking.pages.dev."
  );
}

async function fetchStaticText(requestUrl: string, pathname: string, configuredOrigin?: string) {
  const origin = getStaticOrigin(requestUrl, configuredOrigin);
  const res = await fetch(`${origin}${pathname}`);
  if (!res.ok) {
    throw new Error(`Failed to load static asset: ${pathname}`);
  }

  return res.text();
}

async function fetchStaticJson<T>(requestUrl: string, pathname: string, configuredOrigin?: string): Promise<T> {
  const origin = getStaticOrigin(requestUrl, configuredOrigin);
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

function normalizeItem(type: ContentIndexType, item: ContentIndexItem): ContentIndexItem {
  const assetDir = item.contentPath.split("/").slice(0, -1).join("/");
  return {
    ...item,
    indexType: type,
    assetBasePath: assetDir ? `/content/${assetDir}/` : "/content/",
  };
}

export const publicContentRoute = new Hono<{ Bindings: PublicContentBindings }>()
  .get("/api/content/:type", async (c) => {
    const type = c.req.param("type") as ContentIndexType;
    if (!contentIndexTypes.includes(type)) {
      return c.json({ error: `Unsupported content type: ${type}` }, 404);
    }

    try {
      const items = await fetchStaticJson<ContentIndexItem[]>(
        c.req.url,
        `/data/${type}-index.json`,
        c.env.PUBLIC_SITE_ORIGIN
      );
      return c.json(items.map((item) => normalizeItem(type, item)));
    } catch (error: any) {
      return c.json(
        {
          error: error?.message || "Failed to load content index",
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

    if (!contentIndexTypes.includes(type)) {
      return c.json({ error: `Unsupported content type: ${type}` }, 404);
    }

    try {
      const items = await fetchStaticJson<ContentIndexItem[]>(
        c.req.url,
        `/data/${type}-index.json`,
        c.env.PUBLIC_SITE_ORIGIN
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
        c.env.PUBLIC_SITE_ORIGIN
      );
      const response: ContentDetailResponse = {
        item,
        markdown: stripFrontmatter(rawMarkdown),
      };
      return c.json(response);
    } catch (error: any) {
      return c.json(
        {
          error: error?.message || "Failed to load content detail",
          envVar: "PUBLIC_SITE_ORIGIN",
          expectedProductionValue: "https://applied-practical-thinking.pages.dev",
        },
        500
      );
    }
  })
  .get("/api/design/docs", (c) => c.json(publicDesignDocs))
  .get("/api/design/docs/:slug", async (c) => {
    const slug = c.req.param("slug");
    const item = publicDesignDocs.find((entry) => entry.slug === slug) || null;

    if (!item) {
      const response: PublicDesignDocDetailResponse = { item: null, markdown: "" };
      return c.json(response, 404);
    }

    try {
      const markdown = await fetchStaticText(
        c.req.url,
        `/docs/design/${item.path}`,
        c.env.PUBLIC_SITE_ORIGIN
      );
      const response: PublicDesignDocDetailResponse = { item, markdown };
      return c.json(response);
    } catch (error: any) {
      return c.json(
        {
          error: error?.message || "Failed to load design doc",
          envVar: "PUBLIC_SITE_ORIGIN",
          expectedProductionValue: "https://applied-practical-thinking.pages.dev",
        },
        500
      );
    }
  });
