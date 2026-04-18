import { afterEach, describe, expect, it, vi } from "vitest";
import { publicContentRoute } from "../../worker/src/routes/publicContent";

function toUrl(input: unknown) {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.toString();
  if (input && typeof input === "object" && "url" in input) {
    return String((input as { url?: unknown }).url || "");
  }
  return String(input ?? "");
}

describe("public content design docs version routes", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns available versions for a design doc", async () => {
    const manifestResponse = new Response(
      JSON.stringify({
        documents: [
          {
            docId: "design-overview",
            slug: "overview",
            title: "APT Design Overview",
            latestMajor: 2,
            aliasPath: "/docs/design/APT-DESIGN-OVERVIEW.md",
            versions: [
              {
                major: 1,
                semanticVersion: "1.0.0",
                status: "stable",
                canonicalPath: "/docs/design/v1/APT-DESIGN-OVERVIEW.md",
                publishedAt: "2026-04-05",
              },
              {
                major: 2,
                semanticVersion: "2.0.0",
                status: "candidate",
                canonicalPath: "/docs/design/v2/APT-DESIGN-OVERVIEW.md",
                publishedAt: "2026-04-05",
              },
            ],
          },
        ],
      }),
      { headers: { "content-type": "application/json" } }
    );

    vi.stubGlobal(
      "fetch",
      vi.fn(async () => manifestResponse.clone())
    );

    const response = await publicContentRoute.request(
      "http://127.0.0.1:8787/api/design/docs/overview/versions",
      { headers: { origin: "http://127.0.0.1:8080" } },
      { PUBLIC_SITE_ORIGIN: "http://127.0.0.1:8080" }
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.slug).toBe("overview");
    expect(body.latestMajor).toBe(2);
    expect(body.versions).toHaveLength(2);
    expect(body.versions[0].major).toBe(2);
  });

  it("returns the requested version markdown for /:slug/:major", async () => {
    const manifestResponse = new Response(
      JSON.stringify({
        documents: [
          {
            docId: "design-overview",
            slug: "overview",
            title: "APT Design Overview",
            latestMajor: 2,
            aliasPath: "/docs/design/APT-DESIGN-OVERVIEW.md",
            versions: [
              {
                major: 1,
                semanticVersion: "1.0.0",
                status: "stable",
                canonicalPath: "/docs/design/v1/APT-DESIGN-OVERVIEW.md",
              },
              {
                major: 2,
                semanticVersion: "2.0.0",
                status: "candidate",
                canonicalPath: "/docs/design/v2/APT-DESIGN-OVERVIEW.md",
              },
            ],
          },
        ],
      }),
      { headers: { "content-type": "application/json" } }
    );

    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL | Request) => {
        const url = toUrl(input);

        if (url.includes("/docs/design/v1/APT-DESIGN-OVERVIEW.md")) {
          return new Response("---\ndocId: design-overview\n---\n\n# Overview v1", {
            headers: { "content-type": "text/markdown" },
          });
        }

        return manifestResponse.clone();
      })
    );

    const response = await publicContentRoute.request(
      "http://127.0.0.1:8787/api/design/docs/overview/1",
      { headers: { origin: "http://127.0.0.1:8080" } },
      { PUBLIC_SITE_ORIGIN: "http://127.0.0.1:8080" }
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.item.slug).toBe("overview");
    expect(body.item.major).toBe(1);
    expect(body.item.canonicalPath).toBe("/docs/design/v1/APT-DESIGN-OVERVIEW.md");
    expect(body.markdown).toContain("Overview v1");
  });

  it("returns raw markdown when format=markdown is requested", async () => {
    const manifestResponse = new Response(
      JSON.stringify({
        documents: [
          {
            docId: "design-overview",
            slug: "overview",
            title: "APT Design Overview",
            latestMajor: 2,
            aliasPath: "/docs/design/APT-DESIGN-OVERVIEW.md",
            versions: [
              {
                major: 1,
                semanticVersion: "1.0.0",
                status: "stable",
                canonicalPath: "/docs/design/v1/APT-DESIGN-OVERVIEW.md",
              },
            ],
          },
        ],
      }),
      { headers: { "content-type": "application/json" } }
    );

    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL | Request) => {
        const url = toUrl(input);

        if (url.includes("/docs/design/v1/APT-DESIGN-OVERVIEW.md")) {
          return new Response("---\ndocId: design-overview\n---\n\n# Overview v1", {
            headers: { "content-type": "text/markdown" },
          });
        }

        return manifestResponse.clone();
      })
    );

    const response = await publicContentRoute.request(
      "http://127.0.0.1:8787/api/design/docs/overview/1?format=markdown",
      { headers: { origin: "http://127.0.0.1:8080" } },
      { PUBLIC_SITE_ORIGIN: "http://127.0.0.1:8080" }
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/markdown");
    const body = await response.text();
    expect(body).toContain("# Overview v1");
    expect(body).not.toContain("\"item\"");
  });

  it("returns 404 when a requested version does not exist", async () => {
    const manifestResponse = new Response(
      JSON.stringify({
        documents: [
          {
            docId: "design-overview",
            slug: "overview",
            title: "APT Design Overview",
            latestMajor: 2,
            versions: [
              { major: 1, canonicalPath: "/docs/design/v1/APT-DESIGN-OVERVIEW.md" },
              { major: 2, canonicalPath: "/docs/design/v2/APT-DESIGN-OVERVIEW.md" },
            ],
          },
        ],
      }),
      { headers: { "content-type": "application/json" } }
    );

    vi.stubGlobal(
      "fetch",
      vi.fn(async () => manifestResponse.clone())
    );

    const response = await publicContentRoute.request(
      "http://127.0.0.1:8787/api/design/docs/overview/9",
      { headers: { origin: "http://127.0.0.1:8080" } },
      { PUBLIC_SITE_ORIGIN: "http://127.0.0.1:8080" }
    );

    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body.item).toBeNull();
  });
});
