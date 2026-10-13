import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function readWebSource(relativePath: string) {
  return fs.readFileSync(path.resolve(process.cwd(), relativePath), "utf8");
}

describe("Mermaid loading boundary", () => {
  it("loads Mermaid dynamically only from the diagram renderer", () => {
    const rendererSource = readWebSource("components/apt/MermaidRenderer.tsx");
    const markdownSource = readWebSource("components/apt/MarkdownContent.tsx");
    const viteConfigSource = readWebSource("vite.config.ts");

    expect(rendererSource).not.toMatch(/import\s+mermaid\s+from\s+["']mermaid["']/);
    expect(rendererSource).toContain('import("mermaid")');
    expect(rendererSource.indexOf("if (!hasCode)")).toBeLessThan(rendererSource.lastIndexOf("loadMermaid()"));
    expect(markdownSource).toContain('if (codeLang === "mermaid")');
    expect(markdownSource).toContain("<MermaidRenderer");
    expect(viteConfigSource).not.toContain("vendor-mermaid");
    expect(viteConfigSource).not.toContain("id.includes('/mermaid/')");
  });
});
