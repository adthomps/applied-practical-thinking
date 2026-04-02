import { useEffect, useState } from "react";
import { fetchContentIndex, ContentIndexItem } from "@/src/services/contentIndex";
import { SystemCard } from "@/components/apt/SystemCard";

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
  if (error) return <div className="container py-12 text-center text-destructive">{error}</div>;

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Systems</h1>
        <p className="text-muted-foreground max-w-2xl">
          Complete systems with documented architecture, key decisions, and
          known tradeoffs. Each system is designed to solve a real problem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systems.map((system) => (
          <SystemCard key={system.id} system={system} to={`/systems/${system.id}`} />
        ))}
      </div>
    </div>
  );
}
