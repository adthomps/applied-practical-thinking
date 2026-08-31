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

const languageAliases: Record<string, string> = {
  bash: "bash",
  sh: "bash",
  shell: "bash",
  css: "css",
  html: "markup",
  markup: "markup",
  xml: "markup",
  json: "json",
  markdown: "markdown",
  md: "markdown",
  python: "python",
  py: "python",
  toml: "toml",
  typescript: "typescript",
  ts: "typescript",
  tsx: "tsx",
  yaml: "yaml",
  yml: "yaml",
};

function normalizeLanguage(language?: string) {
  return language ? languageAliases[language.toLowerCase()] : undefined;
}

function loadSyntaxResources() {
  syntaxResourcesPromise ??= import("./syntaxHighlighterResources").then((resourceModule) => {
    syntaxResources = resourceModule.default as SyntaxResources;
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
  const normalizedLanguage = normalizeLanguage(language);
  const [resources, setResources] = useState<SyntaxResources | null>(() => syntaxResources ?? null);

  useEffect(() => {
    if (!normalizedLanguage) {
      return;
    }

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
  }, [normalizedLanguage]);

  if (!normalizedLanguage || !resources) {
    return <PlainCodeBlock code={code} />;
  }

  const { SyntaxHighlighter, theme } = resources;

  return (
    <div className="my-4">
      <SyntaxHighlighter language={normalizedLanguage} style={theme} customStyle={{ borderRadius: 8, fontSize: 14 }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
