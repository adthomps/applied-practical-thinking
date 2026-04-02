import { Hono } from "hono";
import {
  contentIndexTypes,
  type ContentDetailResponse,
  type ContentIndexItem,
  type ContentIndexType,
  type PublicDesignDocDetailResponse,
  type PublicDesignDocItem,
} from "@apt/knowledge";

const DEV_WEB_ORIGIN = "http://127.0.0.1:8080";

const publicDesignDocs: PublicDesignDocItem[] = [
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

function getStaticOrigin(url: string) {
  const current = new URL(url);
  if ((current.hostname === "127.0.0.1" || current.hostname === "localhost") && current.port === "8787") {
    return DEV_WEB_ORIGIN;
  }
  return current.origin;
}

async function fetchStaticText(requestUrl: string, pathname: string) {
  const origin = getStaticOrigin(requestUrl);
  const res = await fetch(`${origin}${pathname}`);
  if (!res.ok) {
    throw new Error(`Failed to load static asset: ${pathname}`);
  }
  return res.text();
}

async function fetchStaticJson<T>(requestUrl: string, pathname: string): Promise<T> {
  const origin = getStaticOrigin(requestUrl);
  const res = await fetch(`${origin}${pathname}`);
  if (!res.ok) {
    throw new Error(`Failed to load static asset: ${pathname}`);
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

export const publicContentRoute = new Hono()
  .get("/api/content/:type", async (c) => {
    const type = c.req.param("type") as ContentIndexType;
    if (!contentIndexTypes.includes(type)) {
      return c.json({ error: `Unsupported content type: ${type}` }, 404);
    }

    try {
      const items = await fetchStaticJson<ContentIndexItem[]>(c.req.url, `/data/${type}-index.json`);
      return c.json(items.map((item) => normalizeItem(type, item)));
    } catch (error: any) {
      return c.json({ error: error?.message || "Failed to load content index" }, 500);
    }
  })
  .get("/api/content/:type/:idOrSlug", async (c) => {
    const type = c.req.param("type") as ContentIndexType;
    const idOrSlug = c.req.param("idOrSlug");

    if (!contentIndexTypes.includes(type)) {
      return c.json({ error: `Unsupported content type: ${type}` }, 404);
    }

    try {
      const items = await fetchStaticJson<ContentIndexItem[]>(c.req.url, `/data/${type}-index.json`);
      const normalizedItems = items.map((item) => normalizeItem(type, item));
      const item =
        normalizedItems.find((entry) => entry.id === idOrSlug || entry.slug === idOrSlug) || null;

      if (!item?.contentPath) {
        const response: ContentDetailResponse = { item: null, markdown: "" };
        return c.json(response, 404);
      }

      const rawMarkdown = await fetchStaticText(c.req.url, `/content/${item.contentPath}`);
      const response: ContentDetailResponse = {
        item,
        markdown: stripFrontmatter(rawMarkdown),
      };
      return c.json(response);
    } catch (error: any) {
      return c.json({ error: error?.message || "Failed to load content detail" }, 500);
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
      const markdown = await fetchStaticText(c.req.url, `/docs/design/${item.path}`);
      const response: PublicDesignDocDetailResponse = { item, markdown };
      return c.json(response);
    } catch (error: any) {
      return c.json({ error: error?.message || "Failed to load design doc" }, 500);
    }
  });
