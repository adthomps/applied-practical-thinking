import { getWorkerApiUrl } from "@/src/services/api";

type MarkdownEnvelope = {
  markdown?: unknown;
};

function triggerBlobDownload(blob: Blob, filename: string) {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(objectUrl);
}

function withMarkdownFormat(pathname: string) {
  const [rawPath, rawQuery = ""] = pathname.split("?");
  const path = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  const params = new URLSearchParams(rawQuery);
  if (!params.has("format")) {
    params.set("format", "markdown");
  }
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

function tryExtractMarkdownFromJson(body: string): string | null {
  try {
    const parsed = JSON.parse(body) as MarkdownEnvelope;
    if (typeof parsed.markdown === "string") {
      return parsed.markdown;
    }
    return null;
  } catch {
    return null;
  }
}

export async function downloadWorkerMarkdown(pathname: string, filename: string) {
  const markdownPathname = withMarkdownFormat(pathname);
  const response = await fetch(getWorkerApiUrl(markdownPathname), {
    headers: {
      Accept: "text/markdown, text/plain;q=0.9, */*;q=0.1",
    },
  });

  if (!response.ok) {
    const body = (await response.text()).trim().slice(0, 160);
    throw new Error(
      `Markdown download failed for ${pathname}: ${response.status} ${response.statusText}${body ? `: ${body}` : ""}`
    );
  }

  const contentType = (response.headers.get("content-type") || "").toLowerCase();
  const body = await response.text();
  const markdown = contentType.includes("application/json")
    ? (tryExtractMarkdownFromJson(body) || body)
    : body;

  triggerBlobDownload(
    new Blob([markdown], { type: "text/markdown;charset=utf-8" }),
    filename
  );
}
