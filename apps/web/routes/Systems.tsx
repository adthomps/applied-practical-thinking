import { useEffect, useState } from "react";
import { fetchContentIndex, ContentIndexItem } from "@/src/services/contentIndex";
import { AptCard, RuntimeConfigNotice } from "@/components/apt";
import { SystemCard } from "@/components/apt/SystemCard";
import { getWorkerApiConfigError } from "@/src/services/api";

export default function Systems() {
  const [systems, setSystems] = useState<ContentIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchContentIndex("systems")
      .then((items) => {
        setSystems(items);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container py-12 text-center">Loading systems…</div>;
  if (error) {
    const configError = getWorkerApiConfigError();
    return (
      <div className="container py-12">
        {configError ? (
          <RuntimeConfigNotice
            message={configError.message}
            envVar={configError.envVar}
            expectedValue={configError.expectedProductionValue}
          />
        ) : (
          <div className="text-center text-destructive">{error}</div>
        )}
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Systems</h1>
        <p className="text-muted-foreground max-w-2xl">
          System references with documented architecture, key decisions, tradeoffs,
          and reusable patterns. Inside Design, Systems is the stable reference layer
          where exploratory work becomes a reusable model.
        </p>
      </div>

      <AptCard variant="subtle" className="mb-8">
        <div className="p-6 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Systems</span> capture coherent models and reusable patterns inside the APT design doctrine.
          If you want concepts, mocks, or interactive proof, start in <span className="font-semibold text-foreground">Experiments</span>.
        </div>
      </AptCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systems.map((system) => (
          <SystemCard key={system.id} system={system} to={`/design/systems/${system.id}`} />
        ))}
      </div>
    </div>
  );
}
