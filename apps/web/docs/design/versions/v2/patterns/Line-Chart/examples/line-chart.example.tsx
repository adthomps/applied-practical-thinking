import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { month: "Jan", value: 21 },
  { month: "Feb", value: 26 },
  { month: "Mar", value: 30 },
  { month: "Apr", value: 28 },
  { month: "May", value: 35 },
  { month: "Jun", value: 39 },
];

export function LineChartExample() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Requests",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-64 w-full"
    >
      <LineChart accessibilityLayer data={data} margin={{ left: 8, right: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line dataKey="value" type="monotone" stroke="var(--color-value)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  );
}
