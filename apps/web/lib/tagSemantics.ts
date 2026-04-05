import type { AptTagProps } from "@apt/ui";

type TagVariant = NonNullable<AptTagProps["variant"]>;

type StatusTagDefinition = {
  label: string;
  variant: TagVariant;
};

const ACTIVE_STATUSES = new Set([
  "active",
  "current",
  "live",
  "stable",
  "available",
  "ready",
]);

const PLANNED_STATUSES = new Set([
  "coming soon",
  "coming-soon",
  "planned",
  "preview",
  "beta",
  "in progress",
  "in-progress",
  "draft",
]);

const INACTIVE_STATUSES = new Set([
  "archived",
  "inactive",
  "deprecated",
  "retired",
  "paused",
]);

function toTitleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getStatusTagDefinition(status?: string | null): StatusTagDefinition | null {
  if (!status) return null;

  const normalized = status.trim().toLowerCase().replace(/[_-]+/g, " ");
  if (!normalized) return null;

  if (ACTIVE_STATUSES.has(normalized)) {
    return { label: toTitleCase(normalized), variant: "secondary" };
  }

  if (PLANNED_STATUSES.has(normalized)) {
    return { label: toTitleCase(normalized), variant: "outline" };
  }

  if (INACTIVE_STATUSES.has(normalized)) {
    return { label: toTitleCase(normalized), variant: "muted" };
  }

  return { label: toTitleCase(normalized), variant: "default" };
}