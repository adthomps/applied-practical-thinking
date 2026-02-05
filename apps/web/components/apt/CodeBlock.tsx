import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function CodeBlock({ code, language }: { code: string; language?: string }) {
  return (
    <div className="my-4">
      <SyntaxHighlighter language={language} style={oneDark} customStyle={{ borderRadius: 8, fontSize: 14 }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
