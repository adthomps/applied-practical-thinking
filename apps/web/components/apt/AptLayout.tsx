import { Outlet } from "react-router-dom";
import { AptNav } from "./AptNav";
import { AptFooter } from "./AptFooter";
import { useRouteMetadataDefaults } from "@/hooks/usePageMetadata";

// APT layout scaffold baseline.
// Keep this shell structure stable unless a Design Architecture decision explicitly changes it.
export function AptLayout() {
  useRouteMetadataDefaults();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      {/* Global navigation shell */}
      <AptNav />
      {/* Route outlet content region */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      {/* Global footer shell */}
      <AptFooter />
    </div>
  );
}
