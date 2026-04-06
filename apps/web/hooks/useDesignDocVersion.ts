import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { PublicDesignDocVersionItem } from "@apt/knowledge";
import { fetchDesignDocVersions } from "@/src/services/contentIndex";

const EMPTY_VERSIONS: PublicDesignDocVersionItem[] = [];

export type DesignDocVersionState = {
  loading: boolean;
  error: string | null;
  availableMajors: number[];
  latestMajor: number | null;
  activeMajor: number | null;
  activeVersion: PublicDesignDocVersionItem | null;
  showSwitcher: boolean;
  canonicalPath: string | null;
  downloadApiPath: string;
  setMajor: (major: number | null) => void;
};

function parseMajor(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export function resolveActiveDesignDocMajor(params: {
  selectedMajorFromUrl: number | null;
  availableMajors: number[];
  latestMajor: number | null;
}): number | null {
  const { selectedMajorFromUrl, availableMajors, latestMajor } = params;
  if (selectedMajorFromUrl && availableMajors.includes(selectedMajorFromUrl)) {
    return selectedMajorFromUrl;
  }
  return latestMajor;
}

export function useDesignDocVersion(slug: string): DesignDocVersionState {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resolvedSlug, setResolvedSlug] = useState<string | null>(null);
  const [resolvedError, setResolvedError] = useState<string | null>(null);
  const [resolvedVersions, setResolvedVersions] = useState<PublicDesignDocVersionItem[]>([]);
  const [resolvedLatestMajor, setResolvedLatestMajor] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchDesignDocVersions(slug)
      .then((response) => {
        if (cancelled) return;
        setResolvedVersions(response.versions || []);
        setResolvedLatestMajor(response.latestMajor ?? null);
        setResolvedError(null);
        setResolvedSlug(slug);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setResolvedVersions([]);
        setResolvedLatestMajor(null);
        setResolvedError(err instanceof Error ? err.message : "Failed to load design doc versions.");
        setResolvedSlug(slug);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const loading = resolvedSlug !== slug;
  const error = resolvedSlug === slug ? resolvedError : null;
  const versions = resolvedSlug === slug ? resolvedVersions : EMPTY_VERSIONS;
  const latestMajor = resolvedSlug === slug ? resolvedLatestMajor : null;

  const selectedMajorFromUrl = parseMajor(searchParams.get("v"));

  const availableMajors = useMemo(
    () => versions.map((version) => version.major).filter((major) => Number.isInteger(major)).sort((a, b) => b - a),
    [versions]
  );

  const activeMajor = useMemo(() => {
    return resolveActiveDesignDocMajor({ selectedMajorFromUrl, availableMajors, latestMajor });
  }, [availableMajors, latestMajor, selectedMajorFromUrl]);

  const activeVersion = useMemo(
    () => versions.find((version) => version.major === activeMajor) || null,
    [activeMajor, versions]
  );

  const canonicalPath = activeVersion?.canonicalPath || null;
  const downloadApiPath = activeMajor ? `/api/design/docs/${slug}/${activeMajor}` : `/api/design/docs/${slug}`;

  function setMajor(major: number | null) {
    const next = new URLSearchParams(searchParams);

    if (!major || (latestMajor && major === latestMajor)) {
      next.delete("v");
    } else {
      next.set("v", String(major));
    }

    setSearchParams(next, { replace: true });
  }

  return {
    loading,
    error,
    availableMajors,
    latestMajor,
    activeMajor,
    activeVersion,
    showSwitcher: availableMajors.length > 1,
    canonicalPath,
    downloadApiPath,
    setMajor,
  };
}
