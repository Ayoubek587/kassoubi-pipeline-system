import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  Activity,
  Building2,
  CalendarClock,
  CalendarPlus,
  CheckCircle2,
  Clock3,
  Inbox,
  Sparkles,
  TrendingUp,
  UsersRound,
} from "lucide-react";

import { AdminAuthLoading } from "@/components/admin/AdminAuthLoading";
import { AdminShell } from "@/components/admin/AdminShell";
import { KpiSparkline, LeadDevelopmentChart, LeadTypeChart } from "@/components/admin/AdminCharts";
import { getLeadTrendData } from "@/components/admin/admin-chart-data";
import { LeadDetailsDialog } from "@/components/admin/LeadDetailsDialog";
import { LeadTable } from "@/components/admin/LeadTable";
import { statusLabels } from "@/components/admin/lead-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getAdminSession,
  getDashboardData,
  leadStatuses,
  type AdminLead,
  type AdminLeadStatus,
  type DashboardData,
} from "@/lib/admin";

export const Route = createFileRoute("/admin/dashboard")({
  beforeLoad: async () => {
    const session = await getAdminSession({});
    if (!session.authenticated) {
      throw redirect({ to: "/admin/login" });
    }
  },
  head: () => ({
    meta: [{ title: "Dashboard | Kassoubi Admin" }],
  }),
  pendingComponent: AdminAuthLoading,
  component: AdminDashboard,
});

const statCards = [
  {
    key: "total",
    chartKey: "total",
    label: "Total Leads",
    subtitle: "Alle gespeicherten Anfragen",
    icon: Inbox,
    tone: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200",
  },
  {
    key: "new",
    chartKey: "new",
    label: "Neue Leads",
    subtitle: "Noch nicht bearbeitet",
    icon: Sparkles,
    tone: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-200",
  },
  {
    key: "bewerber",
    chartKey: "bewerber",
    label: "Bewerber",
    subtitle: "Kandidatenanfragen",
    icon: UsersRound,
    tone: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200",
  },
  {
    key: "unternehmen",
    chartKey: "unternehmen",
    label: "Unternehmen",
    subtitle: "Recruiting-Anfragen",
    icon: Building2,
    tone: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-200",
  },
  {
    key: "active",
    chartKey: "active",
    label: "Aktiv in Arbeit",
    subtitle: "Kontaktiert, qualifiziert oder Angebot",
    icon: Activity,
    tone: "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-200",
  },
] as const;

const pipelineTone: Record<AdminLeadStatus, string> = {
  new: "bg-blue-500",
  contacted: "bg-amber-500",
  qualified: "bg-violet-500",
  booked: "bg-cyan-500",
  proposal: "bg-indigo-500",
  closed: "bg-emerald-500",
  lost: "bg-red-500",
  archived: "bg-slate-500",
};

function AdminDashboard() {
  const loadDashboard = useServerFn(getDashboardData);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLead, setSelectedLead] = useState<AdminLead | null>(null);

  const fetchDashboard = useCallback(() => {
    setLoading(true);
    setError("");
    loadDashboard({})
      .then(setData)
      .catch((dashboardError) => {
        setError(
          dashboardError instanceof Error
            ? dashboardError.message
            : "Dashboard konnte nicht geladen werden.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loadDashboard]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const activeLeads =
    (data?.totals.contacted || 0) + (data?.totals.qualified || 0) + (data?.totals.proposal || 0);
  const trendData = useMemo(() => getLeadTrendData(data?.chartLeads ?? []), [data]);
  const bookedCallLeads = useMemo(
    () => (data?.chartLeads ?? []).filter((lead) => Boolean(lead.calendly_link)).slice(0, 4),
    [data],
  );
  const maxPipelineCount = useMemo(() => {
    if (!data) return 1;
    return Math.max(...leadStatuses.map((status) => data.totals[status] || 0), 1);
  }, [data]);

  return (
    <AdminShell
      title="Dashboard"
      description="Ein ruhiger Überblick über Pipeline, neue Kontakte und die nächsten operativen Schritte."
    >
      <div className="grid min-w-0 gap-7">
        <section className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            const value =
              stat.key === "active"
                ? activeLeads
                : data?.totals[stat.key as keyof DashboardData["totals"]] || 0;

            return (
              <Card
                key={stat.key}
                className="relative overflow-hidden rounded-xl border-border/70 bg-card/95 shadow-[0_14px_40px_color-mix(in_oklab,var(--foreground)_7%,transparent)]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl motion-safe:animate-pulse" />
                <CardHeader className="space-y-0 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-sm font-semibold text-muted-foreground">
                        {stat.label}
                      </CardTitle>
                      <p className="mt-1 text-xs text-muted-foreground">{stat.subtitle}</p>
                    </div>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.tone}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-10 w-24" />
                  ) : (
                    <div className="grid gap-4">
                      <div className="flex items-end justify-between gap-3">
                        <div className="text-4xl font-semibold tracking-tight text-foreground">
                          {value}
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                          <TrendingUp className="h-3.5 w-3.5" />
                          Live
                        </div>
                      </div>
                      <KpiSparkline data={trendData} dataKey={stat.chartKey} />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
          <Card className="rounded-xl border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">Pipeline</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Kompakte Statusverteilung aller Leads.
                  </p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="grid gap-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="h-14 w-full" />
                  ))}
                </div>
              ) : (
                <div className="grid gap-3">
                  {leadStatuses.map((status) => {
                    const count = data?.totals[status] || 0;
                    const width = `${Math.max((count / maxPipelineCount) * 100, count ? 12 : 4)}%`;

                    return (
                      <div
                        key={status}
                        className="rounded-lg border border-border/60 bg-background/70 p-3"
                      >
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="text-sm font-medium text-foreground">
                            {statusLabels[status]}
                          </span>
                          <span className="text-sm font-semibold text-foreground">{count}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full ${pipelineTone[status]}`}
                            style={{ width }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-xl border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">Upcoming Booked Calls</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Leichte Calendly-Übersicht aus CRM-Aktionen.
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarClock className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {bookedCallLeads.length > 0 ? (
                <div className="grid gap-2">
                  {bookedCallLeads.map((lead) => (
                    <a
                      key={lead.id}
                      href={lead.calendly_link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/70 p-3 transition hover:border-primary/30 hover:bg-primary/[0.03]"
                    >
                      <CalendarPlus className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-foreground">
                          {lead.name || "Unbenannter Lead"}
                        </span>
                        <span className="mt-1 block truncate text-xs text-muted-foreground">
                          Calendly-Link geöffnet
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border bg-background/70 p-5">
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        Noch keine gebuchten Calls im CRM
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        Sobald ein Admin „Book Call“ nutzt, erscheint der Lead hier als operative
                        Platzhalter-Übersicht.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
          <Card className="min-w-0 rounded-xl border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Lead Entwicklung</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Leads der letzten 7 Tage, basierend auf verfügbaren Einträgen.
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
              <p className="mt-1 text-sm text-muted-foreground">Verteilung nach Anfrageart.</p>
            </CardHeader>
            <CardContent>
              {loading || !data ? (
                <div className="grid gap-4">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                </div>
              ) : (
                <LeadTypeChart totals={data.totals} />
              )}
            </CardContent>
          </Card>
        </section>

        <Card className="min-w-0 rounded-xl border-border/70 bg-card/95 shadow-sm">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg">Aktuelle Leads</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Die neuesten Einträge aus public.leads.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-lg bg-card/80"
              onClick={fetchDashboard}
              disabled={loading}
            >
              Aktualisieren
            </Button>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4">
                <p className="text-sm font-medium text-destructive">{error}</p>
                <Button className="mt-3 rounded-lg" variant="outline" onClick={fetchDashboard}>
                  Erneut versuchen
                </Button>
              </div>
            ) : loading ? (
              <div className="grid gap-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-14 w-full rounded-lg" />
                ))}
              </div>
            ) : data && data.recentLeads.length > 0 ? (
              <LeadTable
                leads={data.recentLeads}
                compact
                onSelectLead={setSelectedLead}
                onLeadUpdated={(updatedLead) => {
                  setSelectedLead((current) =>
                    current?.id === updatedLead.id ? updatedLead : current,
                  );
                  setData((current) =>
                    current
                      ? {
                          ...current,
                          recentLeads: updatedLead.archived
                            ? current.recentLeads.filter((lead) => lead.id !== updatedLead.id)
                            : current.recentLeads.map((lead) =>
                                lead.id === updatedLead.id ? updatedLead : lead,
                              ),
                          chartLeads: current.chartLeads.map((lead) =>
                            lead.id === updatedLead.id ? updatedLead : lead,
                          ),
                        }
                      : current,
                  );
                }}
              />
            ) : (
              <div className="rounded-xl border border-dashed p-10 text-center">
                <h3 className="text-sm font-semibold text-foreground">Noch keine Leads</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Neue Formularanfragen erscheinen automatisch hier.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <LeadDetailsDialog
        lead={selectedLead}
        open={Boolean(selectedLead)}
        onOpenChange={(open) => {
          if (!open) setSelectedLead(null);
        }}
        onUpdated={(updatedLead) => {
          setSelectedLead(updatedLead);
          setData((current) =>
            current
              ? {
                  ...current,
                  recentLeads: updatedLead.archived
                    ? current.recentLeads.filter((lead) => lead.id !== updatedLead.id)
                    : current.recentLeads.map((lead) =>
                        lead.id === updatedLead.id ? updatedLead : lead,
                      ),
                }
              : current,
          );
        }}
      />
    </AdminShell>
  );
}
