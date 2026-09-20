import { createRequire } from "module";
import { describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const { WAVE_RULES } = require("../scripts/frontmatter-report.cjs");

describe("frontmatter-report scope", () => {
  const wave3 = WAVE_RULES.find((wave: { id: string }) => wave.id === "wave3");

  it("governs worker AI docs and root-level GitHub operational documents", () => {
    expect(wave3.matches("apps/worker/src/ai/docs/overview.md")).toBe(true);
    expect(wave3.matches(".github/SECURITY.md")).toBe(true);
    expect(wave3.matches(".github/copilot-instructions.md")).toBe(true);
  });

  it("leaves nested GitHub prompts and skills to their tool-native contracts", () => {
    expect(wave3.matches(".github/prompts/review-api.md")).toBe(false);
    expect(wave3.matches(".github/skills/api-review/SKILL.md")).toBe(false);
  });
});
