import type { ReactNode } from "react";
import { RuntimeConfigNotice } from "./RuntimeConfigNotice";

type RuntimeConfigError = {
  message: string;
  envVar: string;
  expectedProductionValue?: string;
};

type ContentStateGateProps = {
  loading: boolean;
  isError: boolean;
  errorMessage?: string | null;
  configError?: RuntimeConfigError | null;
  empty?: boolean;
  loadingLabel?: string;
  emptyLabel?: string;
  children: ReactNode;
};

export function ContentStateGate({
  loading,
  isError,
  errorMessage,
  configError,
  empty = false,
  loadingLabel = "Loading content…",
  emptyLabel = "No content found.",
  children,
}: ContentStateGateProps) {
  if (loading) {
    return <div className="py-12 text-center text-muted-foreground">{loadingLabel}</div>;
  }

  if (isError) {
    return (
      <div className="py-2">
        {configError ? (
          <RuntimeConfigNotice
            message={configError.message}
            envVar={configError.envVar}
            expectedValue={configError.expectedProductionValue}
          />
        ) : (
          <div className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {errorMessage || "Unable to load content."}
          </div>
        )}
      </div>
    );
  }

  if (empty) {
    return <div className="py-12 text-center text-muted-foreground">{emptyLabel}</div>;
  }

  return <>{children}</>;
}
