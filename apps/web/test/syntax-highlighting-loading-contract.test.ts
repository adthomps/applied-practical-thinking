import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function readWebSource(relativePath: string) {
  return fs.readFileSync(path.resolve(process.cwd(), relativePath), "utf8");
}

describe("syntax highlighting loading boundary", () => {
  it("loads the highlighter only for a fenced code block", () => {
    const markdownSource = readWebSource("components/apt/MarkdownContent.tsx");
    const codeBlockSource = readWebSource("components/apt/CodeBlock.tsx");
    const viteConfigSource = readWebSource("vite.config.ts");

    expect(markdownSource).toContain('import { CodeBlock } from "./CodeBlock"');
    expect(codeBlockSource).not.toMatch(/import\s+\{?\s*Prism/);
    expect(codeBlockSource).toContain('import("react-syntax-highlighter/dist/esm/prism")');
    expect(codeBlockSource).toContain('import("react-syntax-highlighter/dist/esm/styles/prism/one-dark")');
    expect(codeBlockSource).toContain("<PlainCodeBlock");
    expect(viteConfigSource).not.toContain("vendor-syntax");
    expect(viteConfigSource).not.toContain("id.includes('/react-syntax-highlighter/')");
  });
});
