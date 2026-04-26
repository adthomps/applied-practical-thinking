#!/usr/bin/env node

/**
 * Fail fast in CI/Cloudflare Pages when worker API base is missing.
 *
 * Why:
 * The web app now uses worker-first feed endpoints for Labs/Proof/Insights.
 * If VITE_API_BASE is missing at build time, runtime pages render config errors.
 */

function isCiLikeBuild() {
  return process.env.CF_PAGES === "1" || process.env.CI === "true";
}

function normalize(value) {
  return String(value || "").trim();
}

function isValidHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function main() {
  if (!isCiLikeBuild()) {
    console.log("[verify-worker-api-config] Skipping strict check outside CI/Pages.");
    return;
  }

  const apiBase = normalize(process.env.VITE_API_BASE);
  if (!apiBase) {
    const viteKeys = Object.keys(process.env)
      .filter((key) => key.startsWith("VITE"))
      .sort();
    const typoHint = normalize(process.env.VITE__APT_BASE)
      ? "Detected VITE__APT_BASE (typo). Use VITE_API_BASE."
      : null;

    console.warn(
      [
        "[verify-worker-api-config] Missing VITE_API_BASE for CI/Pages build.",
        "Set VITE_API_BASE in Cloudflare Pages environment variables",
        "(Production and Preview) and redeploy.",
        "Expected example: https://applied-practical-thinking.apt-account.workers.dev",
        typoHint || "",
        viteKeys.length ? `Available VITE* keys at build time: ${viteKeys.join(", ")}` : "No VITE* keys detected at build time.",
        "Build will continue using default production worker fallback.",
      ].join(" ")
    );
    return;
  }

  if (!isValidHttpUrl(apiBase)) {
    console.error(
      `[verify-worker-api-config] VITE_API_BASE must be a valid http(s) URL. Received: ${apiBase}`
    );
    process.exit(1);
  }

  console.log(`[verify-worker-api-config] OK: using VITE_API_BASE=${apiBase}`);
}

main();
