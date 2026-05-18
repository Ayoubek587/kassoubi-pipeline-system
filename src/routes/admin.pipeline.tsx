import { useEffect, useMemo, useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { RefreshCw } from "lucide-react";

import { AdminAuthLoading } from "@/components/admin/AdminAuthLoading";
import { AdminShell } from "@/components/admin/AdminShell";
import { LeadDetailsDialog } from "@/components/admin/LeadDetailsDialog";
import { LeadActions } from "@/components/admin/LeadActions";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { statusLabels } from "@/components/admin/lead-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getAdminSession,
  leadStatuses,
  listAdminLeads,
  type AdminLead,
  type AdminLeadStatus,
} from "@/lib/admin";

export const Route = createFileRoute("/admin/pipeline")({
  beforeLoad: async () => {
    const session = await getAdminSession({});
    if (!session.authenticated) throw redirect({ to: "/admin/login" });
  },
  head: () => ({
    meta: [{ title: "Pipeline | Kassoubi Admin" }],
  }),
  pendingComponent: AdminAuthLoading,
  component: AdminPipeline,
});

function formatDate(value: string) {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}

function AdminPipeline() {
  const loadLeads = useServerFn(listAdminLeads);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLead, setSelectedLead] = useState<AdminLead | null>(null);

  const groupedLeads = useMemo(() => {
    const groups = leadStatuses.reduce(
      (accumulator, status) => {
        accumulator[status] = [];
        return accumulator;
      },
      {} as Record<AdminLeadStatus, AdminLead[]>,
    );

    leads.forEach((lead) => {
      const status = leadStatuses.includes(lead.status as AdminLeadStatus)
        ? (lead.status as AdminLeadStatus)
        : "new";
      groups[status].push(lead);
    });

    return groups;
  }, [leads]);

  const reload = () => {
    setLoading(true);
    setError("");
    loadLeads({ data: { limit: 300 } })
      .then(setLeads)
      .catch((pipelineError) => {
        setError(
          pipelineError instanceof Error
            ? pipelineError.message
            : "Pipeline konnte nicht geladen werden.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminShell
      title="Pipeline"
      description="Eine einfache Status-Pipeline für alle Leads, ohne Drag-and-drop."
    >
      <div className="grid min-w-0 gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Klicken Sie auf eine Karte, um Details, Status und Notizen zu öffnen.
          </p>
          <Button
            variant="outline"
            className="rounded-lg bg-card/80"
            onClick={reload}
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4" />
            Aktualisieren
          </Button>
        </div>

        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4">
            <p className="text-sm font-medium text-destructive">{error}</p>
          </div>
        )}

        <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {leadStatuses.map((status) => (
            <Card key={status} className="min-w-0 rounded-xl border-border/70 bg-card/95 shadow-sm">
              <CardHeader className="border-b border-border/70 pb-3">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-sm">{statusLabels[status]}</CardTitle>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                    {groupedLeads[status]?.length || 0}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="grid max-h-[68dvh] gap-3 overflow-y-auto p-3">
                {loading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-28 rounded-xl" />
                  ))
                ) : groupedLeads[status]?.length ? (
                  groupedLeads[status].map((lead) => (
                    <div
                      key={lead.id || `${lead.email}-${lead.created_at}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedLead(lead)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setSelectedLead(lead);
                        }
                      }}
                      className="min-w-0 rounded-xl border border-border/70 bg-background/80 p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {lead.name || "Unbenannter Lead"}
                          </p>
                          <p className="mt-1 truncate text-xs text-muted-foreground">
                            {lead.email || lead.phone || "Keine Kontaktdaten"}
                          </p>
                        </div>
                        <LeadStatusBadge status={lead.status} />
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                        <span className="truncate capitalize">{lead.type || "Lead"}</span>
                        <span>{formatDate(lead.created_at)}</span>
                      </div>
                      {(lead.company_name || lead.ausbildungsbereich) && (
                        <p className="mt-2 truncate text-xs text-muted-foreground">
                          {lead.company_name || lead.ausbildungsbereich}
                        </p>
                      )}
                      {(status === "contacted" ||
                        status === "qualified" ||
                        status === "booked" ||
                        status === "proposal") && (
                        <LeadActions
                          lead={lead}
                          compact
                          className="mt-3"
                          onUpdated={(updatedLead) => {
                            setSelectedLead((current) =>
                              current?.id === updatedLead.id ? updatedLead : current,
                            );
                            setLeads((current) =>
                              current.map((item) =>
                                item.id === updatedLead.id ? updatedLead : item,
                              ),
                            );
                          }}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-border bg-background/60 p-5 text-center">
                    <p className="text-sm font-medium text-foreground">Keine Leads</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Neue Einträge erscheinen automatisch in dieser Spalte.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <LeadDetailsDialog
        lead={selectedLead}
        open={Boolean(selectedLead)}
        onOpenChange={(open) => {
          if (!open) setSelectedLead(null);
        }}
        onUpdated={(updatedLead) => {
          setSelectedLead(updatedLead);
          setLeads((current) =>
            current.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)),
          );
        }}
      />
    </AdminShell>
  );
}
