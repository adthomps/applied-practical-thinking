
import React, { useEffect, useMemo, useRef, useState } from "react";
import mermaid from "mermaid";

let mermaidInitialized = false;
export function MermaidRenderer({ code }: { code: string }) {
  const [error, setError] = useState<string | null>(null);
  const hasCode = code.trim().length > 0;
  // Use the real diagram code from markdown
  const renderCode = code;
  const containerRef = useRef<HTMLDivElement>(null);

  const themeVars = useMemo(() => {
    // Pull APT tokens from CSS variables so mermaid matches the design system.
    const root = getComputedStyle(document.documentElement);
    const hslVar = (name: string) => `hsl(${root.getPropertyValue(name).trim()})`;

    return {
      background: "transparent",
      primaryColor: hslVar("--card"),
      primaryTextColor: hslVar("--foreground"),
      primaryBorderColor: hslVar("--border"),

      secondaryColor: hslVar("--muted"),
      secondaryTextColor: hslVar("--foreground"),
      secondaryBorderColor: hslVar("--border"),

      tertiaryColor: hslVar("--secondary"),
      tertiaryTextColor: hslVar("--foreground"),

      lineColor: hslVar("--border"),
      textColor: hslVar("--foreground"),

      fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      fontSize: "14px",
    };
  }, []);
  useEffect(() => {
    if (!hasCode) {
      return;
    }

    const styleId = "apt-mermaid-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        .apt-mermaid svg { max-width: 100%; height: auto; }

        /* SVG text */
        .apt-mermaid svg text,
        .apt-mermaid svg tspan {
          fill: hsl(var(--foreground)) !important;
          font-weight: 500;
        }

        /* htmlLabels (foreignObject) */
        .apt-mermaid svg foreignObject,
        .apt-mermaid svg foreignObject * {
          color: hsl(var(--foreground)) !important;
        }

        /* Nodes */
        .apt-mermaid svg .node rect,
        .apt-mermaid svg .node polygon {
          fill: hsl(var(--card)) !important;
          stroke: hsl(var(--border)) !important;
        }

        /* Edge labels + arrows */
        .apt-mermaid svg .edgeLabel,
        .apt-mermaid svg .edgeLabel * {
          color: hsl(var(--muted-foreground)) !important;
          fill: hsl(var(--muted-foreground)) !important;
        }
        .apt-mermaid svg .edgePath path,
        .apt-mermaid svg .arrowheadPath {
          stroke: hsl(var(--border)) !important;
          fill: hsl(var(--border)) !important;
        }
      `;
      document.head.appendChild(style);
    }
    if (!containerRef.current) {
      return;
    }

    Promise.resolve()
      .then(() => {
        // One-time init so HTML labels (br/span) work, and we align to APT tokens.
        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: "loose",
            theme: "base",
            themeVariables: themeVars as any,
            flowchart: {
              htmlLabels: true,
              curve: "linear",
            },
          } as any);
          mermaidInitialized = true;
        }

        const id = `mermaid-diagram-${Math.random().toString(36).slice(2)}`;
        return (mermaid as any).render(id, renderCode);
      })
      .then((result: any) => {
        if (!containerRef.current) return;
        containerRef.current.innerHTML = result?.svg || "";
        if (typeof result?.bindFunctions === "function") {
          result.bindFunctions(containerRef.current);
        }
        setError(null);
      })
      .catch((e: any) => {
        setError(e?.message || "Mermaid rendering failed");
      });
  }, [hasCode, renderCode, themeVars]);

  if (!hasCode) {
    return null;
  }

  if (error) {
    return (
      <div className="my-6 rounded-lg border border-border bg-card p-4">
        <div className="text-sm font-semibold text-foreground">Diagram failed to render</div>
        <div className="mt-2 text-xs text-muted-foreground whitespace-pre-wrap">{error}</div>
      </div>
    );
  }

  return (
    <div className="my-6 overflow-x-auto">
      <div ref={containerRef} className="apt-mermaid rounded-lg border border-border bg-card/20 p-4" />
    </div>
  );
}
