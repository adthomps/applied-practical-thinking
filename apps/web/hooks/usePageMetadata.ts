import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import { authorConfig, siteConfig, type NavItem } from "@/data/site";

export type PageMetadata = {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

const DEFAULT_DESCRIPTION = siteConfig.description;
const DEFAULT_IMAGE = authorConfig.profileImage;
let webpSupportPromise: Promise<boolean> | null = null;

function buildDocumentTitle(title: string) {
  if (!title || title === siteConfig.fullName) {
    return siteConfig.fullName;
  }

  return `${title} | ${siteConfig.fullName}`;
}

function toAbsoluteUrl(value?: string) {
  if (!value || typeof window === "undefined") return undefined;
  if (/^https?:\/\//i.test(value)) return value;

  return new URL(value, window.location.origin).toString();
}

function withExtension(value: string, extension: ".png" | ".webp") {
  return value.replace(/\.(svg|png|webp)$/i, extension);
}

function resolveSocialImages(image?: string) {
  const candidate = image || DEFAULT_IMAGE;

  if (!candidate) return { preferred: undefined, fallback: undefined };

  if (/\.(svg|png|webp)$/i.test(candidate)) {
    return {
      preferred: withExtension(candidate, ".webp"),
      fallback: withExtension(candidate, ".png"),
    };
  }

  return { preferred: candidate, fallback: candidate };
}

function detectWebpSupport() {
  if (typeof document === "undefined") return Promise.resolve(false);
  if (webpSupportPromise) return webpSupportPromise;

  webpSupportPromise = Promise.resolve().then(() => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL("image/webp").startsWith("data:image/webp");
    } catch {
      return false;
    }
  });

  return webpSupportPromise;
}

function upsertMeta(attribute: "name" | "property", key: string, content?: string) {
  if (typeof document === "undefined") return;

  const selector = `meta[${attribute}="${key}"]`;
  const existing = document.head.querySelector<HTMLMetaElement>(selector);

  if (!content) {
    existing?.remove();
    return;
  }

  const meta = existing || document.createElement("meta");
  meta.setAttribute(attribute, key);
  meta.setAttribute("content", content);

  if (!existing) {
    document.head.appendChild(meta);
  }
}

function upsertMetaGroup(attribute: "name" | "property", key: string, contents: string[]) {
  if (typeof document === "undefined") return;

  const selector = `meta[${attribute}="${key}"]`;
  const existing = Array.from(document.head.querySelectorAll<HTMLMetaElement>(selector));

  existing.slice(contents.length).forEach((meta) => meta.remove());

  contents.forEach((content, index) => {
    const meta = existing[index] || document.createElement("meta");
    meta.setAttribute(attribute, key);
    meta.setAttribute("content", content);

    if (!existing[index]) {
      document.head.appendChild(meta);
    }
  });
}

function upsertCanonical(href: string) {
  if (typeof document === "undefined") return;

  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const link = existing || document.createElement("link");
  link.setAttribute("rel", "canonical");
  link.setAttribute("href", href);

  if (!existing) {
    document.head.appendChild(link);
  }
}

// Defaults for routes that do not set their own metadata. Matched by the
// longest path prefix so detail and section routes inherit their parent.
const EXTRA_ROUTE_METADATA: Record<string, PageMetadata> = {
  "/design": {
    title: "Design",
    description: "The design system, thinking frameworks, and architecture patterns behind APT.",
  },
  "/about/visual-gallery": {
    title: "Visual Gallery",
    description: "Photography, drone, and mapping work by Adam Thompson.",
  },
  "/assistant": { title: "Assistant", noIndex: true },
  "/design-playground": { title: "Design Playground", noIndex: true },
};

function buildRouteMetadataMap() {
  const map: Record<string, PageMetadata> = {};
  for (const item of siteConfig.nav as readonly NavItem[]) {
    map[item.path] = { title: item.label, description: item.description };
    for (const child of item.children ?? []) {
      if (!map[child.path]) {
        map[child.path] = { title: child.label, description: child.description };
      }
    }
  }
  map["/"] = { title: siteConfig.fullName, description: DEFAULT_DESCRIPTION };
  return { ...map, ...EXTRA_ROUTE_METADATA };
}

const ROUTE_METADATA = buildRouteMetadataMap();

export function resolveRouteMetadata(pathname: string): PageMetadata {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  let candidate = normalized;

  while (candidate) {
    const match = ROUTE_METADATA[candidate];
    if (match) return match;
    if (candidate === "/") break;
    candidate = candidate.slice(0, candidate.lastIndexOf("/")) || "/";
  }

  return { title: siteConfig.fullName, description: DEFAULT_DESCRIPTION };
}

export function buildCanonicalUrl(origin: string, pathname: string) {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return `${origin}${normalized}`;
}

function applyPageMetadata(metadata: PageMetadata, pathname: string) {
  let cancelled = false;

  const title = metadata.title || siteConfig.fullName;
  const description = metadata.description || DEFAULT_DESCRIPTION;
  const socialImages = resolveSocialImages(metadata.image);
  const fallbackImage = toAbsoluteUrl(socialImages.fallback);
  const imageAlt = metadata.imageAlt || title;
  const pageUrl = buildCanonicalUrl(window.location.origin, pathname);
  const pageType = metadata.type || "website";

  document.title = buildDocumentTitle(title);

  upsertMeta("name", "description", description);
  upsertMeta("name", "robots", metadata.noIndex ? "noindex,nofollow" : "index,follow");
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:type", pageType);
  upsertMeta("property", "og:url", pageUrl);
  upsertMeta("property", "og:site_name", siteConfig.fullName);
  upsertMeta("property", "og:image:alt", fallbackImage ? imageAlt : undefined);
  upsertMeta("property", "og:image:width", fallbackImage ? "1200" : undefined);
  upsertMeta("property", "og:image:height", fallbackImage ? "630" : undefined);
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image:alt", fallbackImage ? imageAlt : undefined);
  upsertCanonical(pageUrl);

  detectWebpSupport().then((supportsWebp) => {
    if (cancelled) return;

    const preferredImage = toAbsoluteUrl(supportsWebp ? socialImages.preferred : socialImages.fallback);
    const ogImages = preferredImage && fallbackImage && preferredImage !== fallbackImage
      ? [preferredImage, fallbackImage]
      : preferredImage
        ? [preferredImage]
        : fallbackImage
          ? [fallbackImage]
          : [];

    upsertMetaGroup("property", "og:image", ogImages);
    upsertMeta("name", "twitter:card", ogImages.length > 0 ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:image", preferredImage || fallbackImage);
  });

  return () => {
    cancelled = true;
  };
}

// Applies route defaults on every navigation. Layout effects run before the
// page's passive effects, so a page calling usePageMetadata still wins.
export function useRouteMetadataDefaults() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    return applyPageMetadata(resolveRouteMetadata(pathname), pathname);
  }, [pathname]);
}

export function usePageMetadata(metadata: PageMetadata) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    return applyPageMetadata(metadata, pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadata.description, metadata.image, metadata.imageAlt, metadata.noIndex, metadata.title, metadata.type, pathname]);
}
