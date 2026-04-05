import { useMemo } from "react";
import { MermaidRenderer } from "./MermaidRenderer";
import { CodeBlock } from "./CodeBlock";

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

function resolveAssetUrl(contentPath: string | undefined, rawUrl: string, assetBasePath?: string) {
  if (!rawUrl) return rawUrl;
  if (rawUrl.startsWith("/") || isExternalUrl(rawUrl)) return rawUrl;

  if (assetBasePath) {
    const base = new URL(assetBasePath, window.location.origin);
    const resolved = new URL(rawUrl, base);
    return `${resolved.pathname}${resolved.search}${resolved.hash}`;
  }

  const dir = contentPath ? contentPath.split("/").slice(0, -1).join("/") : "";
  const base = new URL(`/content/${dir ? `${dir}/` : ""}`, window.location.origin);
  const resolved = new URL(rawUrl, base);

  // Return a site-relative URL
  return `${resolved.pathname}${resolved.search}${resolved.hash}`;
}

function renderInline(text: string) {
  // Supports: [label](url) links and `inline code`
  const nodes: React.ReactNode[] = [];

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    const [full, label, url] = match;
    const start = match.index;
    const end = start + full.length;

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    nodes.push(
      <a
        key={`${start}-${end}`}
        href={url}
        target={isExternalUrl(url) ? "_blank" : undefined}
        rel={isExternalUrl(url) ? "noopener noreferrer" : undefined}
        className="underline underline-offset-4 hover:text-foreground"
      >
        {label}
      </a>
    );

    lastIndex = end;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  // Inline code pass
  const final: React.ReactNode[] = [];
  nodes.forEach((node, i) => {
    if (typeof node !== "string") {
      final.push(node);
      return;
    }

    const parts = node.split(/`([^`]+)`/g);
    parts.forEach((part, idx) => {
      if (idx % 2 === 1) {
        final.push(
          <code
            key={`code-${i}-${idx}`}
            className="px-1.5 py-0.5 rounded bg-muted/60 text-foreground text-[0.95em]"
          >
            {part}
          </code>
        );
      } else if (part) {
        final.push(part);
      }
    });
  });

  return final;
}

export function MarkdownContent(props: { markdown: string; contentPath?: string; assetBasePath?: string }) {
  const { markdown, contentPath, assetBasePath } = props;

  const elements = useMemo(() => {
    const lines = markdown.trim().split("\n");
    const out: React.ReactNode[] = [];

    let inCodeBlock = false;
    let codeContent: string[] = [];
    let codeLang: string | undefined = undefined;

    let inUl = false;
    let ulItems: React.ReactNode[] = [];

    let inOl = false;
    let olItems: React.ReactNode[] = [];

    const parseTableCells = (value: string) =>
      value
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim());

    const renderTable = (header: string[], rows: string[][], key: string) => {
      out.push(
        <div key={`table-wrap-${key}`} className="my-6 overflow-x-auto rounded-lg border border-border/50">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-muted/40">
              <tr>
                {header.map((cell, index) => (
                  <th key={`th-${key}-${index}`} className="px-4 py-3 text-left font-semibold text-foreground">
                    {renderInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`tr-${key}-${rowIndex}`} className="border-t border-border/50">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`td-${key}-${rowIndex}-${cellIndex}`}
                      className="px-4 py-3 align-top text-muted-foreground"
                    >
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    const flushLists = (key: string) => {
      if (inUl && ulItems.length) {
        out.push(
          <ul key={`ul-${key}`} className="my-3 ml-6 list-disc space-y-1 text-muted-foreground">
            {ulItems}
          </ul>
        );
      }
      if (inOl && olItems.length) {
        out.push(
          <ol key={`ol-${key}`} className="my-3 ml-6 list-decimal space-y-1 text-muted-foreground">
            {olItems}
          </ol>
        );
      }
      inUl = false;
      ulItems = [];
      inOl = false;
      olItems = [];
    };

    for (let index = 0; index < lines.length; index += 1) {
      const rawLine = lines[index];
      const line = rawLine.replace(/\s+$/, "");
      const nextLine = lines[index + 1]?.replace(/\s+$/, "") || "";

      if (/^\|.*\|\s*$/.test(line) && /^\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?\s*$/.test(nextLine)) {
        flushLists(String(index));

        const header = parseTableCells(line);
        const rows: string[][] = [];
        index += 2;

        while (index < lines.length) {
          const tableLine = lines[index].replace(/\s+$/, "");
          if (!/^\|.*\|\s*$/.test(tableLine)) {
            index -= 1;
            break;
          }
          rows.push(parseTableCells(tableLine));
          index += 1;
        }

        renderTable(header, rows, String(index));
        continue;
      }

      // Code fences with language
      if (line.startsWith("```")) {
        flushLists(String(index));
        if (!inCodeBlock) {
          // Opening code block
          const langMatch = line.match(/^```([a-zA-Z0-9_-]*)/);
          codeLang = langMatch && langMatch[1] ? langMatch[1].toLowerCase() : undefined;
          inCodeBlock = true;
          continue;
        } else {
          // Closing code block
          const code = codeContent.join("\n");
          if (codeLang === "mermaid") {
            // Remove multi-line %%{init:...}%% blocks and all %% comment lines
            const lines = code.split('\n');
            let inInitBlock = false;
            const filtered: string[] = [];
            for (const line of lines) {
              if (line.includes('%%{init:')) {
                inInitBlock = true;
                continue;
              }
              if (inInitBlock) {
                if (line.includes('}%%')) {
                  inInitBlock = false;
                }
                continue;
              }
              if (line.trim().startsWith('%%')) continue;
              filtered.push(line);
            }
            let diagramCode = filtered.join('\n').trim();
            out.push(<MermaidRenderer key={`mermaid-${index}`} code={diagramCode} />);
          } else {
            out.push(
              <CodeBlock key={`code-${index}`} code={code} language={codeLang} />
            );
          }
          codeContent = [];
          codeLang = undefined;
          inCodeBlock = false;
          continue;
        }
      }
      if (inCodeBlock) {
        codeContent.push(rawLine);
        continue;
      }

      // Horizontal rule
      if (line.trim() === "---") {
        flushLists(String(index));
        out.push(<hr key={`hr-${index}`} className="my-8 border-border/60" />);
        continue;
      }

      // Images on their own line
      const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)\s*$/);
      if (imgMatch) {
        flushLists(String(index));
        const alt = imgMatch[1];
        const url = resolveAssetUrl(contentPath, imgMatch[2], assetBasePath);
        out.push(
          <figure key={`img-${index}`} className="my-6">
            <img
              src={url}
              alt={alt}
              className="w-full rounded-lg border border-border/50"
              loading="lazy"
            />
            {alt ? (
              <figcaption className="mt-2 text-xs text-muted-foreground">{alt}</figcaption>
            ) : null}
          </figure>
        );
        continue;
      }

      // Headings
      if (line.startsWith("# ")) {
        flushLists(String(index));
        out.push(
          <h1
            key={`h1-${index}`}
            className="text-3xl font-bold tracking-tight mt-8 mb-4 text-foreground"
          >
            {line.replace(/^#\s+/, "")}
          </h1>
        );
        continue;
      }

      if (line.startsWith("## ")) {
        flushLists(String(index));
        out.push(
          <h2
            key={`h2-${index}`}
            className="text-2xl font-semibold mt-8 mb-4 text-foreground"
          >
            {line.replace(/^##\s+/, "")}
          </h2>
        );
        continue;
      }

      if (line.startsWith("### ")) {
        flushLists(String(index));
        out.push(
          <h3
            key={`h3-${index}`}
            className="text-xl font-semibold mt-6 mb-3 text-foreground"
          >
            {line.replace(/^###\s+/, "")}
          </h3>
        );
        continue;
      }

      // Blockquotes
      if (line.startsWith("> ")) {
        flushLists(String(index));
        out.push(
          <blockquote
            key={`bq-${index}`}
            className="border-l-4 border-primary/60 pl-4 my-4 italic text-muted-foreground"
          >
            {renderInline(line.replace(/^>\s+/, ""))}
          </blockquote>
        );
        continue;
      }

      // Unordered list items
      if (line.startsWith("- ") || line.startsWith("* ")) {
        if (!inUl) {
          flushLists(String(index));
          inUl = true;
        }
        ulItems.push(
          <li key={`uli-${index}`}>{renderInline(line.replace(/^[-*]\s+/, ""))}</li>
        );
        continue;
      }

      // Ordered list items
      if (/^\d+\.\s+/.test(line)) {
        if (!inOl) {
          flushLists(String(index));
          inOl = true;
        }
        olItems.push(
          <li key={`oli-${index}`}>{renderInline(line.replace(/^\d+\.\s+/, ""))}</li>
        );
        continue;
      }

      // Bold-only pass: **bold** segments (keeps it simple)
      if (line.includes("**")) {
        flushLists(String(index));
        const parts = line.split(/\*\*(.*?)\*\*/g);
        out.push(
          <p key={`p-${index}`} className="text-muted-foreground my-2 leading-relaxed">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={`b-${index}-${i}`} className="font-semibold text-foreground">
                  {renderInline(part)}
                </strong>
              ) : (
                <span key={`t-${index}-${i}`}>{renderInline(part)}</span>
              )
            )}
          </p>
        );
        continue;
      }

      // Empty line breaks lists
      if (!line.trim()) {
        flushLists(String(index));
        continue;
      }

      // Paragraph
      flushLists(String(index));
      out.push(
        <p key={`p-${index}`} className="text-muted-foreground my-2 leading-relaxed">
          {renderInline(line)}
        </p>
      );
    }

    flushLists("end");

    return out;
  }, [markdown, contentPath, assetBasePath]);

  return <>{elements}</>;
}
