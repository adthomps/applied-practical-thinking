import { Outlet } from "react-router-dom";
import { AptNav } from "./AptNav";
import { AptFooter } from "./AptFooter";

// APT layout scaffold baseline.
// Keep this shell structure stable unless a Design Architecture decision explicitly changes it.
export function AptLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Global navigation shell */}
      <AptNav />
      {/* Route outlet content region */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Global footer shell */}
      <AptFooter />
    </div>
  );
}
