import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Activity, CheckCircle2, Inbox, Sparkles } from "lucide-react";

import { AdminAuthLoading } from "@/components/admin/AdminAuthLoading";
import { AdminShell } from "@/components/admin/AdminShell";
import { LeadDevelopmentChart, LeadTypeChart } from "@/components/admin/AdminCharts";
import { getLeadTrendData } from "@/components/admin/admin-chart-data";
import { statusLabels } from "@/components/admin/lead-status";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getAdminSession,
  getDashboardData,
  leadStatuses,
  type AdminLeadStatus,
  type DashboardData,
} from "@/lib/admin";

export const Route = createFileRoute("/admin/analytics")({
  beforeLoad: async () => {
    const session = await getAdminSession({});
    if (!session.authenticated) throw redirect({ to: "/admin/login" });
  },
  head: () => ({
    meta: [{ title: "Analytics | Kassoubi Admin" }],
  }),
  pendingComponent: AdminAuthLoading,
  component: AdminAnalytics,
});

const statusTone: Record<AdminLeadStatus, string> = {
  new: "bg-blue-500",
  contacted: "bg-amber-500",
  qualified: "bg-violet-500",
  booked: "bg-cyan-500",
  proposal: "bg-indigo-500",
  closed: "bg-emerald-500",
  lost: "bg-red-500",
  archived: "bg-slate-500",
};

function AdminAnalytics() {
  const loadDashboard = useServerFn(getDashboardData);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(() => {
    setLoading(true);
    setError("");
    loadDashboard({})
      .then(setData)
      .catch((analyticsError) => {
        setError(
          analyticsError instanceof Error
            ? analyticsError.message
            : "Analytics konnten nicht geladen werden.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loadDashboard]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const trendData = useMemo(() => getLeadTrendData(data?.chartLeads ?? []), [data]);
  const weeklyTotal = trendData.reduce((sum, point) => sum + point.total, 0);
  const weeklyNew = trendData.reduce((sum, point) => sum + point.new, 0);
  const active =
    (data?.totals.contacted || 0) + (data?.totals.qualified || 0) + (data?.totals.proposal || 0);
  const maxStatusCount = Math.max(...leadStatuses.map((status) => data?.totals[status] || 0), 1);

  return (
    <AdminShell
      title="Analytics"
      description="Kompakte Auswertung der Lead-Entwicklung, Typen und Statusverteilung."
    >
      <div className="grid min-w-0 gap-5">
        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4">
            <p className="text-sm font-medium text-destructive">{error}</p>
          </div>
        )}

        <section className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Leads diese Woche",
              value: weeklyTotal,
              icon: Inbox,
              subtitle: "Letzte 7 Tage",
            },
            {
              label: "Neue Leads",
              value: weeklyNew,
              icon: Sparkles,
              subtitle: "Neu in der Wochenansicht",
            },
            {
              label: "Aktiv in Arbeit",
              value: active,
              icon: Activity,
              subtitle: "Kontaktiert, qualifiziert oder Angebot",
            },
            {
              label: "Abgeschlossen",
              value: data?.totals.closed || 0,
              icon: CheckCircle2,
              subtitle: "Status Abgeschlossen",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="rounded-xl border-border/70 bg-card/95 shadow-sm">
                <CardContent className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                    {loading ? (
                      <Skeleton className="mt-3 h-9 w-20" />
                    ) : (
                      <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                        {item.value}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">{item.subtitle}</p>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)]">
          <Card className="min-w-0 rounded-xl border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Lead Entwicklung</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Verlauf der letzten 7 Tage auf Basis der verfügbaren Leads.
              </p>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-72 w-full rounded-xl" />
              ) : (
                <LeadDevelopmentChart data={trendData} />
              )}
            </CardContent>
          </Card>

          <Card className="min-w-0 rounded-xl border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Lead Typen</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Bewerber, Unternehmen, Kontakt.</p>
            </CardHeader>
            <CardContent>
              {loading || !data ? (
                <Skeleton className="h-72 w-full rounded-xl" />
              ) : (
                <LeadTypeChart totals={data.totals} />
              )}
            </CardContent>
          </Card>
        </section>

        <Card className="rounded-xl border-border/70 bg-card/95 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Statusverteilung</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Überblick über den aktuellen Bearbeitungsstand.
            </p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid gap-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-12 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid gap-3">
                {leadStatuses.map((status) => {
                  const count = data?.totals[status] || 0;
                  return (
                    <div key={status} className="rounded-xl border border-border/70 p-4">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-foreground">
                          {statusLabels[status]}
                        </span>
                        <span className="text-sm font-semibold text-foreground">{count}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${statusTone[status]}`}
                          style={{
                            width: `${Math.max((count / maxStatusCount) * 100, count ? 10 : 3)}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
