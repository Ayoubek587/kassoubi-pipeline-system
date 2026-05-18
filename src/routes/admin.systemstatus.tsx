import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Database,
  FileArchive,
  Files,
  Gauge,
  HardDrive,
  RefreshCcw,
  Server,
  Sparkles,
  TrendingUp,
  TriangleAlert,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { AdminAuthLoading } from "@/components/admin/AdminAuthLoading";
import { AdminShell } from "@/components/admin/AdminShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getAdminSession, getSystemStatusData, type SystemStatusData } from "@/lib/admin";

export const Route = createFileRoute("/admin/systemstatus")({
  beforeLoad: async () => {
    const session = await getAdminSession({});
    if (!session.authenticated) throw redirect({ to: "/admin/login" });
  },
  head: () => ({
    meta: [{ title: "Systemstatus | Kassoubi Admin" }],
  }),
  pendingComponent: AdminAuthLoading,
  component: AdminSystemstatus,
});

const DATABASE_LIMIT_BYTES = 500 * 1024 * 1024;
const STORAGE_LIMIT_BYTES = 1024 * 1024 * 1024;
const AVG_LEAD_DB_BYTES = 8 * 1024;
const AVG_FILE_BYTES = 2 * 1024 * 1024;

type StatusVariant = "stable" | "warning" | "critical";
type HealthVariant = "excellent" | "stable" | "watch" | "critical";

type UsageMetric = {
  title: string;
  description: string;
  usedBytes: number;
  limitBytes: number;
  limitLabel: string;
  icon: LucideIcon;
};

type OperationalMetric = {
  label: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
};

const statusBadgeClasses: Record<StatusVariant, string> = {
  stable:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/45 dark:text-emerald-200",
  warning:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/45 dark:text-amber-200",
  critical:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/45 dark:text-red-200",
};

const healthBadgeClasses: Record<HealthVariant, string> = {
  excellent:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/45 dark:text-emerald-200",
  stable:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/45 dark:text-blue-200",
  watch:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/45 dark:text-amber-200",
  critical:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/45 dark:text-red-200",
};

const progressClasses: Record<StatusVariant, string> = {
  stable: "[&>div]:bg-emerald-500",
  warning: "[&>div]:bg-amber-500",
  critical: "[&>div]:bg-red-500",
};

const healthProgressClasses: Record<HealthVariant, string> = {
  excellent: "[&>div]:bg-emerald-500",
  stable: "[&>div]:bg-blue-500",
  watch: "[&>div]:bg-amber-500",
  critical: "[&>div]:bg-red-500",
};

function formatBytes(bytes: number) {
  const safeBytes = Number.isFinite(bytes) && bytes > 0 ? bytes : 0;
  const megabytes = safeBytes / 1024 / 1024;

  if (megabytes >= 1024) {
    return `${(megabytes / 1024).toLocaleString("de-DE", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    })} GB`;
  }

  return `${megabytes.toLocaleString("de-DE", {
    maximumFractionDigits: 1,
    minimumFractionDigits: megabytes > 0 && megabytes < 10 ? 1 : 0,
  })} MB`;
}

function formatNumber(value: number) {
  return Math.max(0, Math.floor(value)).toLocaleString("de-DE");
}

function formatDate(value: string) {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function getReadableFileName(fileName: string) {
  const cleanName = fileName.trim();
  const cvIndex = cleanName.indexOf("CV_");

  if (cvIndex >= 0) return cleanName.slice(cvIndex);

  const lastSegment = cleanName.split(/[\\/]/).filter(Boolean).pop() || cleanName;

  return lastSegment
    .replace(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}[-_]+/i, "")
    .replace(/^[0-9a-f]{24,}[-_]+/i, "")
    .replace(/^\d{4}-\d{2}-\d{2}[-_]+/i, "");
}

function getUsagePercentage(usedBytes: number, limitBytes: number) {
  if (!Number.isFinite(usedBytes) || !Number.isFinite(limitBytes) || limitBytes <= 0) return 0;
  return Math.max(0, Math.round((usedBytes / limitBytes) * 1000) / 10);
}

function getStatusLabel(percentage: number) {
  if (percentage >= 90) return "Kritisch";
  if (percentage >= 70) return "Warnung";
  return "Stabil";
}

function getStatusVariant(percentage: number): StatusVariant {
  if (percentage >= 90) return "critical";
  if (percentage >= 70) return "warning";
  return "stable";
}

function getHealthStatus(score: number): { label: string; variant: HealthVariant } {
  if (score >= 90) return { label: "Exzellent", variant: "excellent" };
  if (score >= 70) return { label: "Stabil", variant: "stable" };
  if (score >= 50) return { label: "Beobachten", variant: "watch" };
  return { label: "Kritisch", variant: "critical" };
}

function getSystemHealthScore(data: SystemStatusData | null) {
  const baseScore = 96;
  if (!data) return baseScore;

  const dbUsage = getUsagePercentage(data.databaseSizeBytes, DATABASE_LIMIT_BYTES);
  const storageUsage = getUsagePercentage(data.storageUsageBytes, STORAGE_LIMIT_BYTES);
  let score = baseScore;

  score -= dbUsage > 90 ? 35 : dbUsage > 70 ? 20 : 0;
  score -= storageUsage > 90 ? 35 : storageUsage > 70 ? 20 : 0;
  score -= data.rpcErrors.length > 0 ? 15 : 0;

  return Math.min(baseScore, Math.max(0, score));
}

function getHealthExplanation(score: number, hasRpcErrors: boolean) {
  if (hasRpcErrors) {
    return (
      "Mindestens eine Monitoring-Abfrage ist fehlgeschlagen. " +
      "Die Kernwerte werden weiterhin angezeigt, soweit verfügbar."
    );
  }

  if (score >= 90) {
    return "Alle überwachten Kennzahlen liegen komfortabel innerhalb der Free-Quota.";
  }
  if (score >= 70) {
    return "Die Plattform läuft stabil, einzelne Kapazitätswerte sollten im Blick bleiben.";
  }
  if (score >= 50) {
    return "Die Nutzung nähert sich relevanten Schwellen. Regelmäßige Prüfung wird empfohlen.";
  }
  return "Kritische Auslastung erkannt. Bereinigung oder Plan-Upgrade sollte eingeplant werden.";
}

function getRecommendations(dbUsage: number, storageUsage: number) {
  const recommendations: string[] = [];

  if (dbUsage < 70 && storageUsage < 70) {
    recommendations.push("Alles im grünen Bereich. Aktuell ist keine Aktion notwendig.");
  }

  if (storageUsage > 70) {
    recommendations.push("Große Dateien prüfen und unnötige Uploads archivieren oder löschen.");
  }

  if (dbUsage > 70) {
    recommendations.push("Datenbankwachstum beobachten und alte Datensätze prüfen.");
  }

  if (dbUsage > 90 || storageUsage > 90) {
    recommendations.push(
      "Kritischer Bereich. Bitte Bereinigung oder Upgrade des Supabase-Plans einplanen.",
    );
  }

  return recommendations;
}

function getQuotaForecast(dbUsage: number, storageUsage: number) {
  const highestUsage = Math.max(dbUsage, storageUsage);

  if (highestUsage > 90) {
    return "Kritischer Bereich. Bitte Bereinigung oder Supabase-Upgrade einplanen.";
  }

  if (highestUsage > 70) {
    return "Die Nutzung steigt. Bitte Entwicklung der nächsten Wochen beobachten.";
  }

  return "Die aktuelle Nutzung liegt deutlich unter der Free-Quota. Eine belastbare Prognose wird nach mehr Aktivität verfügbar.";
}

function getAverageLeadMetric(data: SystemStatusData | null) {
  const totalLeads = data?.operationalCounts.totalLeads ?? 0;
  const averageLeadsPerDay = data?.operationalCounts.averageLeadsPerDay ?? null;

  if (totalLeads === 0) {
    return {
      value: "Noch nicht genug Daten",
      subtitle: "Die Berechnung startet, sobald erste Leads gespeichert wurden.",
    };
  }

  if (averageLeadsPerDay === null) {
    return {
      value: "In Vorbereitung",
      subtitle: "Für eine belastbare Tagesrate wird mehr Zeitraum benötigt.",
    };
  }

  return {
    value: averageLeadsPerDay.toLocaleString("de-DE", {
      maximumFractionDigits: 1,
    }),
    subtitle: "Aus operativen Monitoring-Daten",
  };
}

function HealthScoreCard({ data, loading }: { data: SystemStatusData | null; loading: boolean }) {
  const score = getSystemHealthScore(data);
  const health = getHealthStatus(score);
  const hasRpcErrors = Boolean(data?.rpcErrors.length);
  const ringStyle = {
    background: `conic-gradient(var(--primary) ${score * 3.6}deg, color-mix(in_oklab,var(--muted)_80%,transparent) 0deg)`,
  };

  return (
    <Card className="relative min-w-0 overflow-hidden rounded-xl border-border/70 bg-card/95 shadow-[0_18px_60px_color-mix(in_oklab,var(--foreground)_8%,transparent)]">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl motion-safe:animate-pulse" />
      <CardContent className="relative grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Gauge className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">System Health Score</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Kompakte Bewertung aus Infrastruktur, Monitoring und Kapazität.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="mt-6 grid gap-3">
              <Skeleton className="h-11 w-32" />
              <Skeleton className="h-4 w-full max-w-xl" />
              <Skeleton className="h-3 w-full max-w-lg" />
            </div>
          ) : (
            <div className="mt-6 grid gap-4">
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-5xl font-semibold tracking-tight text-foreground">
                  {score}
                </span>
                <span className="pb-2 text-sm font-medium text-muted-foreground">/ 100</span>
                <Badge
                  variant="outline"
                  className={cn("mb-1 rounded-full px-3 py-1", healthBadgeClasses[health.variant])}
                >
                  {health.label}
                </Badge>
                <span className="mb-1 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-semibold text-muted-foreground">
                  Basis-Monitoring aktiv
                </span>
              </div>
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                {getHealthExplanation(score, hasRpcErrors)}
              </p>
              <Progress
                value={score}
                className={cn("h-2.5 max-w-3xl bg-muted", healthProgressClasses[health.variant])}
              />
            </div>
          )}
        </div>

        <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full p-2 shadow-inner shadow-primary/10">
          {loading ? (
            <Skeleton className="h-full w-full rounded-full" />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center rounded-full p-2 motion-safe:animate-pulse"
              style={ringStyle}
            >
              <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-card text-center">
                <span className="text-4xl font-semibold text-foreground">{score}</span>
                <span className="text-xs font-semibold uppercase text-muted-foreground">
                  Basis-Score
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function UsageCard({ metric, loading }: { metric: UsageMetric; loading: boolean }) {
  const Icon = metric.icon;
  const percentage = getUsagePercentage(metric.usedBytes, metric.limitBytes);
  const statusVariant = getStatusVariant(percentage);
  const remainingBytes = Math.max(metric.limitBytes - metric.usedBytes, 0);
  const progressValue = Math.min(percentage, 100);

  return (
    <Card className="min-w-0 overflow-hidden rounded-xl border-border/70 bg-card/95 shadow-[0_14px_40px_color-mix(in_oklab,var(--foreground)_7%,transparent)]">
      <CardHeader className="space-y-0 pb-4">
        <div className="flex min-w-0 items-start justify-between gap-4">
          <div className="min-w-0">
            <CardTitle className="text-lg">{metric.title}</CardTitle>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{metric.description}</p>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="grid gap-4">
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-3 w-full rounded-full" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
        ) : (
          <div className="grid gap-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Genutzt</p>
                <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
                  {formatBytes(metric.usedBytes)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatBytes(remainingBytes)} verbleibend von {metric.limitLabel}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn("w-fit rounded-full px-3 py-1", statusBadgeClasses[statusVariant])}
                >
                  {getStatusLabel(percentage)}
                </Badge>
                <span className="text-sm font-semibold text-foreground">
                  {percentage.toLocaleString("de-DE", { maximumFractionDigits: 1 })}%
                </span>
              </div>
            </div>
            <Progress
              value={progressValue}
              className={cn("h-3 bg-muted", progressClasses[statusVariant])}
            />
            <div className="grid gap-2 rounded-xl border border-border/70 bg-background/60 p-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Grenze Free Plan</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{metric.limitLabel}</p>
              </div>
              <div className="flex items-center gap-2 sm:justify-end">
                <ArrowUpRight className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Live gemessen</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MetricCard({ metric, loading }: { metric: OperationalMetric; loading: boolean }) {
  const Icon = metric.icon;

  return (
    <Card className="rounded-xl border-border/70 bg-card/95 shadow-sm">
      <CardContent className="flex items-center justify-between gap-4 p-5">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
          {loading ? (
            <Skeleton className="mt-3 h-9 w-28" />
          ) : (
            <p className="mt-2 break-words text-2xl font-semibold tracking-tight text-foreground">
              {metric.value}
            </p>
          )}
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{metric.subtitle}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}

function LargestFilesTable({ data, loading }: { data: SystemStatusData | null; loading: boolean }) {
  const files = data?.largestStorageFiles ?? [];

  return (
    <Card className="min-w-0 rounded-xl border-border/70 bg-card/95 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg">Größte Dateien</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Die größten Objekte im Supabase Storage nach Dateigröße.
            </p>
          </div>
          <Files className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="grid gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : files.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-border/70">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="min-w-52 px-4">Datei</TableHead>
                  <TableHead className="px-4">Bucket</TableHead>
                  <TableHead className="px-4">Größe</TableHead>
                  <TableHead className="px-4">Hochgeladen am</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((file, index) => {
                  const readableFileName = getReadableFileName(file.fileName);

                  return (
                    <TableRow key={`${file.bucketName}-${file.fileName}-${index}`}>
                      <TableCell className="max-w-[320px] px-4">
                        <span
                          className="block truncate font-medium text-foreground"
                          title={file.fileName || "Unbenannte Datei"}
                        >
                          {readableFileName || "Unbenannte Datei"}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 text-muted-foreground">
                        {file.bucketName || "-"}
                      </TableCell>
                      <TableCell className="px-4 font-medium">
                        {formatBytes(file.sizeBytes)}
                      </TableCell>
                      <TableCell className="px-4 text-muted-foreground">
                        {formatDate(file.uploadedAt)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-background/60 p-8 text-center">
            <p className="text-sm font-semibold text-foreground">Noch keine Dateien hochgeladen.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AdminSystemstatus() {
  const loadSystemStatus = useServerFn(getSystemStatusData);
  const [data, setData] = useState<SystemStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSystemStatus = useCallback(() => {
    setLoading(true);
    setError("");
    loadSystemStatus({})
      .then(setData)
      .catch((systemStatusError) => {
        setError(
          systemStatusError instanceof Error
            ? systemStatusError.message
            : "Der Systemstatus konnte nicht geladen werden.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loadSystemStatus]);

  useEffect(() => {
    fetchSystemStatus();
  }, [fetchSystemStatus]);

  const databaseUsage = getUsagePercentage(data?.databaseSizeBytes ?? 0, DATABASE_LIMIT_BYTES);
  const storageUsage = getUsagePercentage(data?.storageUsageBytes ?? 0, STORAGE_LIMIT_BYTES);
  const remainingDbBytes = Math.max(DATABASE_LIMIT_BYTES - (data?.databaseSizeBytes ?? 0), 0);
  const remainingStorageBytes = Math.max(STORAGE_LIMIT_BYTES - (data?.storageUsageBytes ?? 0), 0);
  const remainingLeads = Math.floor(remainingDbBytes / AVG_LEAD_DB_BYTES);
  const remainingFiles = Math.floor(remainingStorageBytes / AVG_FILE_BYTES);
  const averageLeadMetric = useMemo(() => getAverageLeadMetric(data), [data]);

  const metrics = useMemo<UsageMetric[]>(
    () => [
      {
        title: "Datenbankauslastung",
        description: "Speicherplatz, der aktuell von der Supabase-Datenbank belegt wird.",
        usedBytes: data?.databaseSizeBytes ?? 0,
        limitBytes: DATABASE_LIMIT_BYTES,
        limitLabel: "500 MB",
        icon: Database,
      },
      {
        title: "Dateispeicher",
        description: "Belegter Storage für hochgeladene Dateien und Dokumente.",
        usedBytes: data?.storageUsageBytes ?? 0,
        limitBytes: STORAGE_LIMIT_BYTES,
        limitLabel: "1 GB",
        icon: HardDrive,
      },
    ],
    [data],
  );

  const operationalMetrics = useMemo<OperationalMetric[]>(
    () => [
      {
        label: "Leads gesamt",
        value: formatNumber(data?.operationalCounts.totalLeads ?? 0),
        subtitle: "Alle aktuell gespeicherten Lead-Einträge",
        icon: UsersRound,
      },
      {
        label: "Dateien gesamt",
        value: formatNumber(data?.storageFileCount ?? 0),
        subtitle: "Objekte im Supabase Storage",
        icon: Files,
      },
      {
        label: "Neue Leads heute",
        value:
          data?.operationalCounts.leadsToday === null
            ? "Tracking wird vorbereitet"
            : formatNumber(data?.operationalCounts.leadsToday ?? 0),
        subtitle: "Basierend auf created_at, falls verfügbar",
        icon: Sparkles,
      },
      {
        label: "Durchschnittliche Leads pro Tag",
        value: averageLeadMetric.value,
        subtitle: averageLeadMetric.subtitle,
        icon: TrendingUp,
      },
    ],
    [averageLeadMetric, data],
  );

  const recommendations = getRecommendations(databaseUsage, storageUsage);
  const recommendationVariant = getStatusVariant(Math.max(databaseUsage, storageUsage));
  const RecommendationIcon =
    recommendationVariant === "critical"
      ? AlertCircle
      : recommendationVariant === "warning"
        ? TriangleAlert
        : CheckCircle2;

  return (
    <AdminShell
      title="Systemstatus"
      description="Live-Einblicke in Plattformstatus, Speichernutzung und operative Aktivität."
    >
      <div className="grid min-w-0 gap-5">
        <Card className="rounded-xl border-border/70 bg-card/95 shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Server className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-foreground">
                  Operatives Kontrollzentrum
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Live-Überblick über Quota, Speicher, Plattformaktivität und technische Stabilität.
                  Service-Role-Schlüssel bleiben auf dem Server.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full rounded-lg bg-card/80 sm:w-auto"
              onClick={fetchSystemStatus}
              disabled={loading}
            >
              <RefreshCcw className={cn("h-4 w-4", loading && "animate-spin")} />
              Aktualisieren
            </Button>
          </CardContent>
        </Card>

        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4">
            <p className="text-sm font-medium text-destructive">
              Der Systemstatus konnte gerade nicht geladen werden. Bitte später erneut versuchen.
            </p>
            <p className="mt-1 text-xs text-destructive/80">{error}</p>
          </div>
        )}

        {data && data.rpcErrors.length > 0 && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-200">
            <p className="text-sm font-semibold">
              Einige Monitoring-Werte konnten nicht vollständig geladen werden.
            </p>
            <p className="mt-1 text-xs leading-5 opacity-85">{data.rpcErrors[0]}</p>
          </div>
        )}

        <HealthScoreCard data={data} loading={loading} />

        <section className="grid min-w-0 gap-5 xl:grid-cols-2">
          {metrics.map((metric) => (
            <UsageCard key={metric.title} metric={metric} loading={loading} />
          ))}
        </section>

        <section className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {operationalMetrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} loading={loading} />
          ))}
        </section>

        <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <Card className="rounded-xl border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">Geschätzte Restkapazität</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Näherungswerte auf Basis typischer Lead- und Dateigrößen.
                  </p>
                </div>
                <FileArchive className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="grid gap-3">
                  <Skeleton className="h-16 rounded-xl" />
                  <Skeleton className="h-16 rounded-xl" />
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                  <div className="rounded-xl border border-border/70 bg-background/60 p-4">
                    <p className="text-sm font-medium text-muted-foreground">Datenbank</p>
                    <p className="mt-2 text-2xl font-semibold text-foreground">
                      ca. {formatNumber(remainingLeads)} weitere Leads
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-background/60 p-4">
                    <p className="text-sm font-medium text-muted-foreground">Dateispeicher</p>
                    <p className="mt-2 text-2xl font-semibold text-foreground">
                      ca. {formatNumber(remainingFiles)} weitere Datei-Uploads
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-xl border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">Quota-Prognose</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Einordnung der aktuellen Nutzung gegenüber der Free-Quota.
                  </p>
                </div>
                <Clock3 className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-24 rounded-xl" />
              ) : (
                <div className="rounded-xl border border-primary/20 bg-primary/10 p-4">
                  <div className="mb-2 flex items-center gap-2 text-primary">
                    <Activity className="h-4 w-4" />
                    <span className="text-sm font-semibold">Prognose</span>
                  </div>
                  <p className="text-sm leading-6 text-foreground">
                    {getQuotaForecast(databaseUsage, storageUsage)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <LargestFilesTable data={data} loading={loading} />

        <Card className="rounded-xl border-border/70 bg-card/95 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Systemempfehlungen</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Priorisierte Hinweise für Betrieb, Bereinigung und Kapazitätsplanung.
                </p>
              </div>
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
                  statusBadgeClasses[recommendationVariant],
                )}
              >
                <RecommendationIcon className="h-5 w-5" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid gap-3">
                <Skeleton className="h-12 rounded-xl" />
                <Skeleton className="h-12 rounded-xl" />
              </div>
            ) : (
              <div className="grid gap-3">
                {recommendations.map((recommendation) => (
                  <div
                    key={recommendation}
                    className={cn(
                      "rounded-xl border p-4 text-sm font-medium leading-6",
                      statusBadgeClasses[recommendationVariant],
                    )}
                  >
                    {recommendation}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
