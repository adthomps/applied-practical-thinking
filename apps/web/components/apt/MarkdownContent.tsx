import { useMemo } from "react";

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

function resolveAssetUrl(contentPath: string | undefined, rawUrl: string) {
  if (!rawUrl) return rawUrl;
  if (rawUrl.startsWith("/") || isExternalUrl(rawUrl)) return rawUrl;

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

export function MarkdownContent(props: { markdown: string; contentPath?: string }) {
  const { markdown, contentPath } = props;

  const elements = useMemo(() => {
    const lines = markdown.trim().split("\n");
    const out: React.ReactNode[] = [];

    let inCodeBlock = false;
    let codeContent: string[] = [];

    let inUl = false;
    let ulItems: React.ReactNode[] = [];

    let inOl = false;
    let olItems: React.ReactNode[] = [];

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

    lines.forEach((rawLine, index) => {
      const line = rawLine.replace(/\s+$/, "");

      // Code fences
      if (line.startsWith("```")) {
        flushLists(String(index));

        if (inCodeBlock) {
          out.push(
            <pre
              key={`code-${index}`}
              className="bg-muted/50 rounded-lg p-4 overflow-x-auto my-4 text-sm border border-border/50"
            >
              <code>{codeContent.join("\n")}</code>
            </pre>
          );
          codeContent = [];
        }

        inCodeBlock = !inCodeBlock;
        return;
      }

      if (inCodeBlock) {
        codeContent.push(rawLine);
        return;
      }

      // Horizontal rule
      if (line.trim() === "---") {
        flushLists(String(index));
        out.push(<hr key={`hr-${index}`} className="my-8 border-border/60" />);
        return;
      }

      // Images on their own line
      const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)\s*$/);
      if (imgMatch) {
        flushLists(String(index));
        const alt = imgMatch[1];
        const url = resolveAssetUrl(contentPath, imgMatch[2]);
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
        return;
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
        return;
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
        return;
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
        return;
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
        return;
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
        return;
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
        return;
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
        return;
      }

      // Empty line breaks lists
      if (!line.trim()) {
        flushLists(String(index));
        return;
      }

      // Paragraph
      flushLists(String(index));
      out.push(
        <p key={`p-${index}`} className="text-muted-foreground my-2 leading-relaxed">
          {renderInline(line)}
        </p>
      );
    });

    flushLists("end");

    return out;
  }, [markdown, contentPath]);

  return <>{elements}</>;
}
