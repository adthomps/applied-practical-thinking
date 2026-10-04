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
