const LOCAL_WORKER_API_BASE = "http://127.0.0.1:8787";
const EXPECTED_PRODUCTION_WORKER_API_BASE =
  "https://applied-practical-thinking.apt-account.workers.dev";
const OFFICIAL_PAGES_HOST = "applied-practical-thinking.pages.dev";

type RuntimeWorkerConfig = {
  workerApiBase?: string;
};

export type WorkerApiConfigResolution =
  | {
      ok: true;
      baseUrl: string;
      source: "runtime" | "env" | "local-dev" | "known-pages-host" | "production-default";
    }
  | {
      ok: false;
      envVar: "VITE_API_BASE";
      expectedProductionValue: string;
      message: string;
    };

function normalizeBaseUrl(value: string) {
  return value.trim().replace(/\/+$/, "");
}

function isLocalHostname(hostname: string) {
  return hostname === "127.0.0.1" || hostname === "localhost";
}

function isKnownPagesHostname(hostname: string) {
  return hostname === OFFICIAL_PAGES_HOST || hostname.endsWith(`.${OFFICIAL_PAGES_HOST}`);
}

function getRuntimeConfiguredWorkerApiBase() {
  if (typeof window === "undefined") return null;

  const runtimeConfig = (window as Window & {
    __APT_RUNTIME_CONFIG__?: RuntimeWorkerConfig;
  }).__APT_RUNTIME_CONFIG__;

  return runtimeConfig?.workerApiBase?.trim() ? normalizeBaseUrl(runtimeConfig.workerApiBase) : null;
}

export function getWorkerApiBase() {
  const resolution = resolveWorkerApiBase();
  if (!resolution.ok) {
    throw new Error(resolution.message);
  }

  return resolution.baseUrl;
}

export function resolveWorkerApiBase(): WorkerApiConfigResolution {
  const runtimeConfigured = getRuntimeConfiguredWorkerApiBase();
  if (runtimeConfigured) {
    return {
      ok: true,
      baseUrl: runtimeConfigured,
      source: "runtime",
    };
  }

  const configured = import.meta.env.VITE_API_BASE;
  if (configured) {
    return {
      ok: true,
      baseUrl: normalizeBaseUrl(configured),
      source: "env",
    };
  }

  if (typeof window !== "undefined" && isLocalHostname(window.location.hostname)) {
    return {
      ok: true,
      baseUrl: LOCAL_WORKER_API_BASE,
      source: "local-dev",
    };
  }

  if (typeof window !== "undefined" && isKnownPagesHostname(window.location.hostname)) {
    return {
      ok: true,
      baseUrl: EXPECTED_PRODUCTION_WORKER_API_BASE,
      source: "known-pages-host",
    };
  }

  if (typeof window !== "undefined") {
    return {
      ok: true,
      baseUrl: EXPECTED_PRODUCTION_WORKER_API_BASE,
      source: "production-default",
    };
  }

  return {
    ok: false,
    envVar: "VITE_API_BASE",
    expectedProductionValue: EXPECTED_PRODUCTION_WORKER_API_BASE,
    message:
      "Worker API base is not configured. Set VITE_API_BASE in the environment that builds the Pages frontend, or provide window.__APT_RUNTIME_CONFIG__.workerApiBase.",
  };
}

export function tryGetWorkerApiBase() {
  const resolution = resolveWorkerApiBase();
  return resolution.ok ? resolution.baseUrl : null;
}

export function getWorkerApiUrl(pathname: string) {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${getWorkerApiBase()}${path}`;
}

export function tryGetWorkerApiUrl(pathname: string) {
  const base = tryGetWorkerApiBase();
  if (!base) return null;

  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export function getWorkerApiConfigError() {
  const resolution = resolveWorkerApiBase();
  return resolution.ok ? null : resolution;
}

async function readErrorBody(response: Response) {
  const contentType = response.headers.get("content-type") || "unknown";
  const body = await response.text();
  const preview = body.trim().slice(0, 160);
  return `${response.status} ${response.statusText} (${contentType})${preview ? `: ${preview}` : ""}`;
}

export async function fetchWorkerJson<T>(pathname: string, init?: RequestInit): Promise<T> {
  const url = getWorkerApiUrl(pathname);
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`Worker API request failed for ${url}: ${await readErrorBody(response)}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    const body = await response.text();
    const preview = body.trim().slice(0, 160);
    throw new Error(
      `Expected JSON from Worker API at ${url}, received ${contentType || "unknown"}${preview ? `: ${preview}` : ""}`
    );
  }

  return (await response.json()) as T;
}
