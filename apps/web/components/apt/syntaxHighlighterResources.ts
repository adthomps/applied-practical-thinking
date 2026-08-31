import type React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism-light";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import toml from "react-syntax-highlighter/dist/esm/languages/prism/toml";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";

type RegisteredSyntaxHighlighter = React.ComponentType<{
  children: string;
  language?: string;
  style?: Record<string, React.CSSProperties>;
  customStyle?: React.CSSProperties;
}> & {
  registerLanguage: (name: string, language: unknown) => void;
};

const registeredHighlighter = SyntaxHighlighter as unknown as RegisteredSyntaxHighlighter;

[
  ["bash", bash],
  ["css", css],
  ["markup", markup],
  ["json", json],
  ["markdown", markdown],
  ["python", python],
  ["toml", toml],
  ["typescript", typescript],
  ["tsx", tsx],
  ["yaml", yaml],
].forEach(([name, language]) => {
  registeredHighlighter.registerLanguage(name as string, language);
});

export default {
  SyntaxHighlighter: registeredHighlighter,
  theme: oneDark as Record<string, React.CSSProperties>,
};
