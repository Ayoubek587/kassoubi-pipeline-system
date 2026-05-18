import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DashboardData } from "@/lib/admin";
import type { TrendPoint } from "@/components/admin/admin-chart-data";

const typeColors = {
  Bewerber: "var(--color-chart-1)",
  Unternehmen: "var(--color-chart-2)",
  Kontakt: "var(--color-chart-4)",
};

function emptyState(message: string) {
  return (
    <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-border bg-background/60 p-6 text-center">
      <p className="max-w-sm text-sm leading-6 text-muted-foreground">{message}</p>
    </div>
  );
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ color?: string; name?: string; value?: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-border bg-popover px-3 py-2 shadow-lg">
      <p className="mb-1 text-xs font-semibold text-muted-foreground">{label}</p>
      <div className="grid gap-1">
        {payload.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-5 text-sm">
            <span className="flex items-center gap-2 text-popover-foreground">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
              {item.name}
            </span>
            <span className="font-semibold text-popover-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function KpiSparkline({
  data,
  dataKey,
}: {
  data: TrendPoint[];
  dataKey: keyof Pick<TrendPoint, "total" | "new" | "bewerber" | "unternehmen" | "active">;
}) {
  const hasData = data.some((point) => point[dataKey] > 0);

  if (!hasData) {
    return <div className="h-10 rounded-lg border border-dashed border-border bg-background/50" />;
  }

  return (
    <div className="h-12 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 2 }}>
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="var(--color-primary)"
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LeadDevelopmentChart({ data }: { data: TrendPoint[] }) {
  const total = data.reduce((sum, point) => sum + point.total, 0);

  if (total === 0) {
    return emptyState(
      "Noch nicht genug Daten für eine Entwicklungskurve. Neue Leads erscheinen hier automatisch.",
    );
  }

  return (
    <div className="h-72 min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 12, right: 16, bottom: 4, left: -18 }}>
          <defs>
            <linearGradient id="leadDevelopmentFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.32} />
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="4 8" vertical={false} />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--color-border)" }} />
          <Area
            name="Leads"
            type="monotone"
            dataKey="total"
            stroke="var(--color-primary)"
            strokeWidth={3}
            fill="url(#leadDevelopmentFill)"
            activeDot={{ r: 5, stroke: "var(--color-card)", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LeadTypeChart({ totals }: { totals: DashboardData["totals"] }) {
  const kontakt = Math.max(totals.total - totals.bewerber - totals.unternehmen, 0);
  const data = [
    { name: "Bewerber", value: totals.bewerber, fill: typeColors.Bewerber },
    { name: "Unternehmen", value: totals.unternehmen, fill: typeColors.Unternehmen },
    { name: "Kontakt", value: kontakt, fill: typeColors.Kontakt },
  ];
  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return emptyState(
      "Noch keine Lead-Typen vorhanden. Sobald Anfragen eingehen, wird die Verteilung angezeigt.",
    );
  }

  return (
    <div className="grid gap-4">
      <div className="h-56 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<ChartTooltip />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="58%"
              outerRadius="82%"
              paddingAngle={4}
              stroke="var(--color-card)"
              strokeWidth={3}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: item.fill }}
              />
              {item.name}
            </span>
            <span className="font-semibold text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
