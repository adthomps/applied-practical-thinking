import { CartesianGrid, ComposedChart, Line, Scatter, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { category: "Team A", before: 42, after: 57 },
  { category: "Team B", before: 61, after: 67 },
  { category: "Team C", before: 33, after: 49 },
];

export function DumbbellPlotExample() {
  return (
    <ChartContainer
      config={{
        before: { label: "Before", color: "hsl(var(--chart-4))" },
        after: { label: "After", color: "hsl(var(--chart-1))" },
      }}
      className="h-64 w-full"
    >
      <ComposedChart accessibilityLayer data={data} margin={{ left: 8, right: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="category" tickLine={false} axisLine={false} />
        <YAxis domain={[0, 100]} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line dataKey="before" stroke="hsl(var(--muted-foreground))" dot={false} isAnimationActive={false} />
        <Line dataKey="after" stroke="hsl(var(--muted-foreground))" dot={false} isAnimationActive={false} />
        <Scatter dataKey="before" fill="var(--color-before)" />
        <Scatter dataKey="after" fill="var(--color-after)" />
      </ComposedChart>
    </ChartContainer>
  );
}
