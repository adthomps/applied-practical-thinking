import React, { useEffect, useState } from "react";

type SyntaxTheme = Record<string, React.CSSProperties>;
type SyntaxHighlighterComponent = React.ComponentType<{
  children: string;
  language?: string;
  style?: SyntaxTheme;
  customStyle?: React.CSSProperties;
}>;

type SyntaxResources = {
  SyntaxHighlighter: SyntaxHighlighterComponent;
  theme: SyntaxTheme;
};

let syntaxResources: SyntaxResources | undefined;
let syntaxResourcesPromise: Promise<SyntaxResources> | undefined;

function loadSyntaxResources() {
  syntaxResourcesPromise ??= Promise.all([
    import("react-syntax-highlighter/dist/esm/prism"),
    import("react-syntax-highlighter/dist/esm/styles/prism/one-dark"),
  ]).then(([highlighterModule, themeModule]) => {
    syntaxResources = {
      SyntaxHighlighter: highlighterModule.default as unknown as SyntaxHighlighterComponent,
      theme: themeModule.default as SyntaxTheme,
    };
    return syntaxResources;
  });

  return syntaxResourcesPromise;
}

function PlainCodeBlock({ code }: { code: string }) {
  return (
    <pre className="my-4 overflow-x-auto rounded-lg bg-[#282c34] p-4 text-sm text-[#abb2bf]">
      <code>{code}</code>
    </pre>
  );
}

export function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [resources, setResources] = useState<SyntaxResources | null>(() => syntaxResources ?? null);

  useEffect(() => {
    let cancelled = false;

    loadSyntaxResources()
      .then((loadedResources) => {
        if (!cancelled) {
          setResources(loadedResources);
        }
      })
      .catch(() => {
        // The plain code block remains usable if the optional highlighter chunk fails to load.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!resources) {
    return <PlainCodeBlock code={code} />;
  }

  const { SyntaxHighlighter, theme } = resources;

  return (
    <div className="my-4">
      <SyntaxHighlighter language={language} style={theme} customStyle={{ borderRadius: 8, fontSize: 14 }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
