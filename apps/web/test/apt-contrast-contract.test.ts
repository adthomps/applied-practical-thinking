import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { aptColorPairs, getContrastRatioFromHSL } from "../lib/contrast";

// Every catalogued APT color pair must meet WCAG AA for normal-size text (4.5:1).
// Before APT-017/APT-018 the catalogue was only displayed, so failing pairs went unnoticed.
describe("apt contrast contract", () => {
  it.each(aptColorPairs.map((pair) => [pair.name, pair] as const))("%s meets WCAG AA", (_name, pair) => {
    const ratio = getContrastRatioFromHSL(pair.foreground, pair.background);
    expect(ratio).not.toBeNull();
    expect(ratio!).toBeGreaterThanOrEqual(4.5);
  });
});

// The catalogue is hand-written for the contrast page, so pin it to the generated canonical
// tokens (APT-019): each pair's values must equal the dark-theme token its classes name.
describe("apt contrast catalogue matches generated tokens", () => {
  const css = readFileSync(path.resolve(__dirname, "../../../.apt/design/generated/apt-tokens.css"), "utf8");
  const darkBlock = css.match(/\.dark\s*\{([\s\S]*?)\}/)?.[1] ?? "";
  const dark = Object.fromEntries([...darkBlock.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((match) => [match[1], match[2].trim()]));
  const token = (utility: string) => utility.replace(/^(?:bg|text)-/, "").split("/")[0];

  it.each(aptColorPairs.map((pair) => [pair.name, pair] as const))("%s uses canonical values", (_name, pair) => {
    expect(pair.background).toBe(dark[token(pair.bgClass)]);
    expect(pair.foreground).toBe(dark[token(pair.fgClass)]);
  });
});
