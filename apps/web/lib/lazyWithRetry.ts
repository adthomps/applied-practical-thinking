import { lazy, type ComponentType, type LazyExoticComponent } from "react";

const CHUNK_RELOAD_KEY = "apt:chunk-reload";

function isChunkLoadError(error: unknown) {
  if (!(error instanceof Error)) return false;

  return (
    error.message.includes("Failed to fetch dynamically imported module") ||
    error.message.includes("Importing a module script failed") ||
    error.message.includes("Expected a JavaScript-or-Wasm module script")
  );
}

export function lazyWithRetry<T extends ComponentType<any>>(
  importer: () => Promise<{ default: T }>
): LazyExoticComponent<T> {
  return lazy(async () => {
    try {
      const module = await importer();

      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(CHUNK_RELOAD_KEY);
      }

      return module;
    } catch (error) {
      if (typeof window !== "undefined" && isChunkLoadError(error)) {
        const hasReloaded = window.sessionStorage.getItem(CHUNK_RELOAD_KEY) === "1";

        if (!hasReloaded) {
          window.sessionStorage.setItem(CHUNK_RELOAD_KEY, "1");
          window.location.reload();

          return new Promise<never>(() => {});
        }
      }

      throw error;
    }
  });
}
