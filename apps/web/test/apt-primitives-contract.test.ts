import { describe, expect, it } from "vitest";
import {
  aptButtonVariants,
  aptCardVariants,
  aptSectionContentVariants,
  aptSectionVariants,
} from "@apt/ui";

describe("apt primitives contract", () => {
  it("keeps AptButton API variants and sizes stable", () => {
    expect(aptButtonVariants({ variant: "primary", size: "default" })).toContain("shadow-elevation-1");
    expect(aptButtonVariants({ variant: "accent", size: "sm" })).toContain("bg-accent");
    expect(aptButtonVariants({ variant: "link", size: "lg" })).toContain("hover:underline");
    expect(aptButtonVariants({ variant: "ghost", size: "icon" })).toContain("w-10");
  });

  it("keeps AptCard six-variant surface stable", () => {
    expect(aptCardVariants({ variant: "default" })).toContain("bg-card");
    expect(aptCardVariants({ variant: "elevated" })).toContain("shadow-elevation-3");
    expect(aptCardVariants({ variant: "interactive" })).toContain("cursor-pointer");
    expect(aptCardVariants({ variant: "hero" })).toContain("shadow-elevation-4");
    expect(aptCardVariants({ variant: "subtle" })).toContain("bg-muted/50");
    expect(aptCardVariants({ variant: "feature" })).toContain("bg-card/80");
  });

  it("renders AptSection class composition for spacing/width/tone", () => {
    expect(aptSectionVariants({ spacing: "default", tone: "default" })).toContain("py-12");
    expect(aptSectionVariants({ spacing: "compact", tone: "subtle" })).toContain("bg-muted/30");
    expect(aptSectionVariants({ spacing: "none", tone: "elevated" })).toContain("border-y");
    expect(aptSectionContentVariants({ width: "prose" })).toContain("max-w-[65ch]");
    expect(aptSectionContentVariants({ width: "wide" })).toContain("max-w-6xl");
  });
});
