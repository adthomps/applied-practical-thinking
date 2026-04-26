import { stripFrontmatter } from "@/src/services/contentDetail";

export type AptPublicDocContent = {
  readonly publicPath: string;
  readonly markdown: string;
};

function toPublicPath(pathname: string): string {
  if (!pathname) return "";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function getAptPublicDocAssetBasePath(publicPath: string | null | undefined): string {
  if (!publicPath) return "/docs/apt/";
  return publicPath.replace(/[^/]*$/, "");
}

export async function fetchAptPublicDocMarkdown(publicPath: string): Promise<AptPublicDocContent> {
  const normalizedPath = toPublicPath(publicPath);
  if (!normalizedPath) {
    throw new Error("Missing canonical public doc path.");
  }

  const response = await fetch(normalizedPath, {
    headers: {
      Accept: "text/markdown, text/plain;q=0.9, */*;q=0.1",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load canonical markdown (${response.status}): ${normalizedPath}`);
  }

  const rawMarkdown = await response.text();
  return {
    publicPath: normalizedPath,
    markdown: stripFrontmatter(rawMarkdown),
  };
}
