import { describe, expect, it } from "vitest";
import { resolveActiveDesignDocMajor } from "@/hooks/useDesignDocVersion";

describe("resolveActiveDesignDocMajor", () => {
  it("prefers selected major when available", () => {
    const result = resolveActiveDesignDocMajor({
      selectedMajorFromUrl: 1,
      availableMajors: [2, 1],
      latestMajor: 2,
    });
    expect(result).toBe(1);
  });

  it("falls back to latest major when selected major is unavailable", () => {
    const result = resolveActiveDesignDocMajor({
      selectedMajorFromUrl: 3,
      availableMajors: [2, 1],
      latestMajor: 2,
    });
    expect(result).toBe(2);
  });

  it("returns null when no major can be resolved", () => {
    const result = resolveActiveDesignDocMajor({
      selectedMajorFromUrl: null,
      availableMajors: [],
      latestMajor: null,
    });
    expect(result).toBeNull();
  });
});

