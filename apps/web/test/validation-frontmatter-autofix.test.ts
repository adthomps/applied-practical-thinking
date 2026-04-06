import fs from "fs";
import os from "os";
import path from "path";
import { createRequire } from "module";
import { describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const { run } = require("../scripts/validation-frontmatter-autofix.cjs");

function writeFile(filePath: string, contents: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents, "utf8");
}

describe("validation-frontmatter-autofix", () => {
  it("returns preview patches without mutating files", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "apt-frontmatter-preview-"));
    const promptPath = "apps/web/ai/prompts/sample.md";
    const absolute = path.join(root, promptPath);
    writeFile(absolute, "# Sample Prompt\n\nBody\n");

    const report = {
      entries: [
        {
          relativePath: promptPath,
          waveId: "wave1",
          exceptionReason: null,
          missingKeys: ["title", "version", "status", "audience", "visibility", "source"],
        },
      ],
    };

    const result = run({
      wave: "wave1",
      preview: true,
      apply: false,
      rootDir: root,
      reportOverride: report,
    });

    expect(result.mode).toBe("preview");
    expect(result.patches).toHaveLength(1);
    expect(fs.readFileSync(absolute, "utf8")).toContain("# Sample Prompt");
    expect(fs.readFileSync(absolute, "utf8")).not.toContain("title:");
  });

  it("applies missing frontmatter keys and skips out-of-scope/exception entries", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "apt-frontmatter-apply-"));
    const staticPath = "apps/web/docs/design/static/sample.md";
    const exceptionPath = "apps/web/docs/design/static/exception.md";
    const wave2Path = "docs/skip-wave2.md";
    const staticAbs = path.join(root, staticPath);
    const exceptionAbs = path.join(root, exceptionPath);
    const wave2Abs = path.join(root, wave2Path);

    writeFile(staticAbs, "# Static Sample\n\nBody\n");
    writeFile(exceptionAbs, "# Exception\n\nBody\n");
    writeFile(wave2Abs, "# Wave 2 Doc\n\nBody\n");

    const report = {
      entries: [
        {
          relativePath: staticPath,
          waveId: "wave1",
          exceptionReason: null,
          missingKeys: ["title", "version", "status", "audience", "visibility", "source"],
        },
        {
          relativePath: exceptionPath,
          waveId: "wave1",
          exceptionReason: "do not touch",
          missingKeys: ["title"],
        },
        {
          relativePath: wave2Path,
          waveId: "wave2",
          exceptionReason: null,
          missingKeys: ["title"],
        },
      ],
    };

    const result = run({
      wave: "wave1",
      preview: false,
      apply: true,
      rootDir: root,
      reportOverride: report,
    });

    expect(result.mode).toBe("apply");
    expect(result.updated).toBe(1);

    const updated = fs.readFileSync(staticAbs, "utf8");
    expect(updated).toContain("title: Static Sample");
    expect(updated).toContain("audience: developer");
    expect(updated).toContain("visibility: public");
    expect(updated).toContain("source: manual");

    const untouchedException = fs.readFileSync(exceptionAbs, "utf8");
    expect(untouchedException).not.toContain("title:");

    const untouchedWave2 = fs.readFileSync(wave2Abs, "utf8");
    expect(untouchedWave2).not.toContain("title:");
  });
});
