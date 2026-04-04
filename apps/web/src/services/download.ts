import { getWorkerApiUrl } from "@/src/services/api";

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

export async function downloadWorkerMarkdown(pathname: string, filename: string) {
  const response = await fetch(getWorkerApiUrl(pathname), {
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

  const contentType = response.headers.get("content-type") || "text/markdown";
  const markdown = await response.text();
  triggerBlobDownload(
    new Blob([markdown], { type: contentType.includes("text") ? `${contentType};charset=utf-8` : "text/markdown;charset=utf-8" }),
    filename
  );
}
