import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { category: "Thinking", value: 72 },
  { category: "Support", value: 54 },
  { category: "Architecture", value: 63 },
  { category: "System", value: 81 },
];

export function BarChartExample() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Score",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-64 w-full"
    >
      <BarChart accessibilityLayer data={data} margin={{ left: 8, right: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="category" tickLine={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={6} />
      </BarChart>
    </ChartContainer>
  );
}
