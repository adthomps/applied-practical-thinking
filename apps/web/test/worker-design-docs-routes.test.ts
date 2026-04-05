import { afterEach, describe, expect, it, vi } from "vitest";
import { publicContentRoute } from "../../worker/src/routes/publicContent";

describe("public content design docs version routes", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns available versions for a design doc", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL) => {
        const url = String(input);

        if (url.endsWith("/docs/design/APT-DESIGN-DOCS-MANIFEST.json")) {
          return new Response(
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
        }

        return new Response("not found", { status: 404 });
      })
    );

    const response = await publicContentRoute.request(
      "http://127.0.0.1:8787/api/design/docs/overview/versions",
      { headers: { origin: "http://127.0.0.1:8080" } }
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.slug).toBe("overview");
    expect(body.latestMajor).toBe(2);
    expect(body.versions).toHaveLength(2);
    expect(body.versions[0].major).toBe(2);
  });

  it("returns the requested version markdown for /:slug/:major", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL) => {
        const url = String(input);

        if (url.endsWith("/docs/design/APT-DESIGN-DOCS-MANIFEST.json")) {
          return new Response(
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
        }

        if (url.endsWith("/docs/design/v1/APT-DESIGN-OVERVIEW.md")) {
          return new Response("---\ndocId: design-overview\n---\n\n# Overview v1", {
            headers: { "content-type": "text/markdown" },
          });
        }

        return new Response("not found", { status: 404 });
      })
    );

    const response = await publicContentRoute.request(
      "http://127.0.0.1:8787/api/design/docs/overview/1",
      { headers: { origin: "http://127.0.0.1:8080" } }
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.item.slug).toBe("overview");
    expect(body.item.major).toBe(1);
    expect(body.item.canonicalPath).toBe("/docs/design/v1/APT-DESIGN-OVERVIEW.md");
    expect(body.markdown).toContain("Overview v1");
  });

  it("returns 404 when a requested version does not exist", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL) => {
        const url = String(input);
        if (url.endsWith("/docs/design/APT-DESIGN-DOCS-MANIFEST.json")) {
          return new Response(
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
        }
        return new Response("not found", { status: 404 });
      })
    );

    const response = await publicContentRoute.request(
      "http://127.0.0.1:8787/api/design/docs/overview/9",
      { headers: { origin: "http://127.0.0.1:8080" } }
    );

    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body.item).toBeNull();
  });
});
