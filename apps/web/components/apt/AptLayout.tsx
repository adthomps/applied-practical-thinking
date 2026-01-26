import { Outlet } from "react-router-dom";
import { AptNav } from "./AptNav";
import { AptFooter } from "./AptFooter";

export function AptLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AptNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <AptFooter />
    </div>
  );
}
