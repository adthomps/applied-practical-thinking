const LOCAL_WORKER_API_BASE = "http://127.0.0.1:8787";

function normalizeBaseUrl(value: string) {
  return value.trim().replace(/\/+$/, "");
}

function isLocalHostname(hostname: string) {
  return hostname === "127.0.0.1" || hostname === "localhost";
}

export function getWorkerApiBase() {
  const configured = import.meta.env.VITE_API_BASE;
  if (configured) {
    return normalizeBaseUrl(configured);
  }

  if (typeof window !== "undefined" && isLocalHostname(window.location.hostname)) {
    return LOCAL_WORKER_API_BASE;
  }

  throw new Error(
    "Missing VITE_API_BASE for the standalone Worker API. Set it in the Pages environment or apps/web/.env."
  );
}

export function tryGetWorkerApiBase() {
  try {
    return getWorkerApiBase();
  } catch {
    return null;
  }
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
