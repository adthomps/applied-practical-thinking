import { useEffect } from "react";

import { authorConfig, siteConfig } from "@/data/site";

type PageMetadata = {
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

export function usePageMetadata(metadata: PageMetadata) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;

    const title = metadata.title || siteConfig.fullName;
    const description = metadata.description || DEFAULT_DESCRIPTION;
    const socialImages = resolveSocialImages(metadata.image);
    const fallbackImage = toAbsoluteUrl(socialImages.fallback);
    const imageAlt = metadata.imageAlt || title;
    const pageUrl = window.location.href;
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
  }, [metadata.description, metadata.image, metadata.imageAlt, metadata.noIndex, metadata.title, metadata.type]);
}