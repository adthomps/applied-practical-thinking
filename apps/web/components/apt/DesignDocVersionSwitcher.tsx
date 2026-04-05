import { AptButton, AptTag } from "@apt/ui";
import type { DesignDocVersionState } from "@/hooks/useDesignDocVersion";

type DesignDocVersionSwitcherProps = {
  versionState: DesignDocVersionState;
  className?: string;
};

export function DesignDocVersionSwitcher({ versionState, className }: DesignDocVersionSwitcherProps) {
  const {
    loading,
    error,
    availableMajors,
    latestMajor,
    activeMajor,
    activeVersion,
    showSwitcher,
    setMajor,
  } = versionState;

  if (loading) {
    return <p className={`text-sm text-muted-foreground ${className || ""}`.trim()}>Loading version metadata…</p>;
  }

  if (error) {
    return <p className={`text-sm text-muted-foreground ${className || ""}`.trim()}>Version metadata unavailable.</p>;
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className || ""}`.trim()}>
      {activeMajor ? <AptTag variant="outline">v{activeMajor}</AptTag> : null}
      {activeVersion?.status ? <AptTag variant="muted">{activeVersion.status}</AptTag> : null}
      {activeVersion?.publishedAt ? <AptTag variant="ghost">Updated {activeVersion.publishedAt}</AptTag> : null}
      {showSwitcher ? (
        <div className="flex flex-wrap items-center gap-2">
          {availableMajors.map((major) => (
            <AptButton
              key={major}
              size="sm"
              variant={major === activeMajor ? "primary" : "ghost"}
              onClick={() => setMajor(major)}
            >
              v{major}
              {latestMajor === major ? " (latest)" : ""}
            </AptButton>
          ))}
        </div>
      ) : null}
    </div>
  );
}
