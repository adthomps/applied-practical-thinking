type HeatCell = {
  row: string;
  col: string;
  value: number;
};

const rows = ["Onboarding", "Checkout", "Support"];
const cols = ["Mobile", "Desktop", "Tablet"];

const cells: HeatCell[] = [
  { row: "Onboarding", col: "Mobile", value: 48 },
  { row: "Onboarding", col: "Desktop", value: 22 },
  { row: "Onboarding", col: "Tablet", value: 12 },
  { row: "Checkout", col: "Mobile", value: 39 },
  { row: "Checkout", col: "Desktop", value: 51 },
  { row: "Checkout", col: "Tablet", value: 9 },
  { row: "Support", col: "Mobile", value: 17 },
  { row: "Support", col: "Desktop", value: 28 },
  { row: "Support", col: "Tablet", value: 11 },
];

function opacityFor(value: number) {
  return Math.max(0.15, Math.min(1, value / 60));
}

export function HeatmapExample() {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
        <div />
        {cols.map((col) => (
          <div key={col} className="text-center">
            {col}
          </div>
        ))}
      </div>

      {rows.map((row) => (
        <div key={row} className="grid grid-cols-4 gap-2">
          <div className="text-xs text-muted-foreground">{row}</div>
          {cols.map((col) => {
            const cell = cells.find((item) => item.row === row && item.col === col);
            const value = cell?.value ?? 0;
            return (
              <div
                key={`${row}-${col}`}
                className="flex h-12 items-center justify-center rounded-md border border-border text-xs"
                style={{ backgroundColor: `hsl(var(--chart-3) / ${opacityFor(value)})` }}
                aria-label={`${row} ${col} ${value}`}
              >
                {value}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
