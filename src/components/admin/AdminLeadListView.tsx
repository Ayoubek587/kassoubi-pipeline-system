import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Archive, CheckCircle2, Filter, Plus, Search, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { LeadDetailsDialog } from "@/components/admin/LeadDetailsDialog";
import { LeadTable } from "@/components/admin/LeadTable";
import { statusLabels } from "@/components/admin/lead-status";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  bulkUpdateAdminLeads,
  leadStatuses,
  leadTypes,
  leadActionStatuses,
  leadPriorities,
  listAdminLeads,
  permanentlyDeleteAdminLeads,
  type AdminLead,
  type AdminLeadActionStatus,
  type AdminLeadPriority,
  type AdminLeadStatus,
  type AdminLeadType,
} from "@/lib/admin";

const priorityLabels: Record<AdminLeadPriority, string> = {
  low: "Niedrig",
  normal: "Normal",
  high: "Hoch",
  urgent: "Dringend",
};

const actionStatusLabels: Record<AdminLeadActionStatus, string> = {
  contacted: "Kontaktiert",
  called: "Angerufen",
  emailed: "E-Mail gesendet",
  whatsapp_sent: "WhatsApp gesendet",
  follow_up_needed: "Follow-up nötig",
};

export function AdminLeadListView({
  title = "Lead Liste",
  description = "Öffnen Sie eine Zeile, um Details, Status und interne Notizen zu bearbeiten.",
  fixedLeadType,
  messagesOnly = false,
  emptyTitle = "Keine Leads gefunden",
  emptyDescription = "Passen Sie Suche oder Filter an, um weitere Ergebnisse zu sehen.",
}: {
  title?: string;
  description?: string;
  fixedLeadType?: AdminLeadType;
  messagesOnly?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  const loadLeads = useServerFn(listAdminLeads);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [search, setSearch] = useState("");
  const [leadType, setLeadType] = useState<AdminLeadType | "all">(fixedLeadType || "all");
  const [status, setStatus] = useState<AdminLeadStatus | "all">("all");
  const [priority, setPriority] = useState<AdminLeadPriority | "all">("all");
  const [actionStatus, setActionStatus] = useState<AdminLeadActionStatus | "all">("all");
  const [archived, setArchived] = useState<"active" | "archived" | "all">("active");
  const [deleted, setDeleted] = useState<"active" | "deleted" | "all">("active");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLead, setSelectedLead] = useState<AdminLead | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [bulkProcessing, setBulkProcessing] = useState(false);
  const [trashDialogOpen, setTrashDialogOpen] = useState(false);
  const [permanentDeleteOpen, setPermanentDeleteOpen] = useState(false);
  const bulkUpdateLeads = useServerFn(bulkUpdateAdminLeads);
  const permanentlyDeleteLeads = useServerFn(permanentlyDeleteAdminLeads);

  const filters = useMemo(
    () => ({
      search,
      leadType: fixedLeadType || leadType,
      status,
      priority,
      actionStatus,
      archived,
      deleted,
      limit: 250,
    }),
    [actionStatus, archived, deleted, fixedLeadType, leadType, priority, search, status],
  );

  const visibleLeads = useMemo(() => {
    if (!messagesOnly) return leads;
    return leads.filter((lead) => lead.type === "kontakt" || Boolean(lead.message?.trim()));
  }, [leads, messagesOnly]);
  const visibleLeadIds = useMemo(
    () => visibleLeads.map((lead) => lead.id).filter(Boolean),
    [visibleLeads],
  );
  const selectedLeads = useMemo(
    () => visibleLeads.filter((lead) => selectedIds.has(lead.id)),
    [selectedIds, visibleLeads],
  );

  useEffect(() => {
    if (fixedLeadType) setLeadType(fixedLeadType);
  }, [fixedLeadType]);

  useEffect(() => {
    setSelectedIds((current) => {
      const visible = new Set(visibleLeadIds);
      const next = new Set(Array.from(current).filter((id) => visible.has(id)));
      return next.size === current.size ? current : next;
    });
  }, [visibleLeadIds]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setLoading(true);
      setError("");
      loadLeads({ data: filters })
        .then(setLeads)
        .catch((leadsError) => {
          setError(
            leadsError instanceof Error
              ? leadsError.message
              : "Leads konnten nicht geladen werden.",
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [filters, loadLeads]);

  const reload = () => {
    setLoading(true);
    setError("");
    loadLeads({ data: filters })
      .then(setLeads)
      .catch((leadsError) => {
        setError(
          leadsError instanceof Error ? leadsError.message : "Leads konnten nicht geladen werden.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const applyUpdatedLead = (updatedLead: AdminLead) => {
    setSelectedLead((current) => (current?.id === updatedLead.id ? updatedLead : current));
    setLeads((current) => {
      const shouldHideArchived = archived === "active" && updatedLead.archived;
      const shouldHideActive = archived === "archived" && !updatedLead.archived;
      const shouldHideDeleted = deleted === "active" && Boolean(updatedLead.deleted_at);
      const shouldHideNotDeleted = deleted === "deleted" && !updatedLead.deleted_at;

      if (shouldHideArchived || shouldHideActive || shouldHideDeleted || shouldHideNotDeleted) {
        return current.filter((lead) => lead.id !== updatedLead.id);
      }

      return current.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead));
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  const toggleLeadSelection = (leadId: string, selected: boolean) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (selected) {
        next.add(leadId);
      } else {
        next.delete(leadId);
      }
      return next;
    });
  };

  const toggleAllVisible = (selected: boolean) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      visibleLeadIds.forEach((id) => {
        if (selected) {
          next.add(id);
        } else {
          next.delete(id);
        }
      });
      return next;
    });
  };

  const runBulkUpdate = (action: "contacted" | "archive" | "trash") => {
    const ids = selectedLeads.map((lead) => lead.id);
    if (ids.length === 0) return;

    setBulkProcessing(true);
    bulkUpdateLeads({ data: { ids, action } })
      .then((result) => {
        setLeads((current) => {
          const updatedById = new Map(result.leads.map((lead) => [lead.id, lead]));

          if (action === "contacted") {
            return current.map((lead) => updatedById.get(lead.id) || lead);
          }

          return current.filter((lead) => !updatedById.has(lead.id));
        });
        clearSelection();
        toast.success(
          action === "contacted"
            ? "Ausgewählte Leads wurden als kontaktiert markiert."
            : action === "archive"
              ? "Ausgewählte Leads wurden archiviert."
              : "Ausgewählte Leads wurden in den Papierkorb verschoben.",
        );
      })
      .catch((bulkError) => {
        toast.error(
          bulkError instanceof Error ? bulkError.message : "Sammelaktion fehlgeschlagen.",
        );
      })
      .finally(() => {
        setBulkProcessing(false);
        setTrashDialogOpen(false);
      });
  };

  const runPermanentDelete = () => {
    const ids = selectedLeads.map((lead) => lead.id);
    if (ids.length === 0) return;

    setBulkProcessing(true);
    permanentlyDeleteLeads({ data: { ids } })
      .then((result) => {
        const deletedIds = new Set(result.deletedIds);
        setLeads((current) => current.filter((lead) => !deletedIds.has(lead.id)));
        clearSelection();
        if (result.warning) {
          toast.warning(result.warning);
        } else {
          toast.success("Ausgewählte Leads wurden endgültig gelöscht.");
        }
      })
      .catch((deleteError) => {
        toast.error(
          deleteError instanceof Error
            ? deleteError.message
            : "Leads konnten nicht endgültig gelöscht werden.",
        );
      })
      .finally(() => {
        setBulkProcessing(false);
        setPermanentDeleteOpen(false);
      });
  };

  return (
    <>
      <Card className="rounded-xl border-border/70 bg-card/95 shadow-sm">
        <CardHeader className="gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild className="rounded-lg">
                <Link to="/admin/leads/new">
                  <Plus className="h-4 w-4" />
                  Neuer Lead
                </Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-lg bg-card/80"
                onClick={reload}
                disabled={loading}
              >
                Aktualisieren
              </Button>
            </div>
          </div>
          <div className="grid gap-3 rounded-xl border border-border/70 bg-background/70 p-3 md:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_160px_160px_160px_190px_170px_190px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Name, E-Mail, Unternehmen oder Nachricht suchen"
                className="h-11 rounded-lg bg-card pl-9"
              />
            </div>
            <Select
              value={leadType}
              onValueChange={(value) => setLeadType(value as AdminLeadType | "all")}
              disabled={Boolean(fixedLeadType)}
            >
              <SelectTrigger className="h-11 rounded-lg bg-card">
                <SelectValue placeholder="Lead-Typ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Typen</SelectItem>
                {leadTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as AdminLeadStatus | "all")}
            >
              <SelectTrigger className="h-11 rounded-lg bg-card">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Status</SelectItem>
                {leadStatuses.map((option) => (
                  <SelectItem key={option} value={option}>
                    {statusLabels[option]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={priority}
              onValueChange={(value) => setPriority(value as AdminLeadPriority | "all")}
            >
              <SelectTrigger className="h-11 rounded-lg bg-card">
                <SelectValue placeholder="Priorität" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Prioritäten</SelectItem>
                {leadPriorities.map((option) => (
                  <SelectItem key={option} value={option}>
                    {priorityLabels[option]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={actionStatus}
              onValueChange={(value) => setActionStatus(value as AdminLeadActionStatus | "all")}
            >
              <SelectTrigger className="h-11 rounded-lg bg-card">
                <SelectValue placeholder="Aktion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Aktionen</SelectItem>
                {leadActionStatuses.map((option) => (
                  <SelectItem key={option} value={option}>
                    {actionStatusLabels[option]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={archived}
              onValueChange={(value) => setArchived(value as "active" | "archived" | "all")}
            >
              <SelectTrigger className="h-11 rounded-lg bg-card">
                <SelectValue placeholder="Archiv" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Aktive Leads</SelectItem>
                <SelectItem value="archived">Archiviert</SelectItem>
                <SelectItem value="all">Alle Leads</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={deleted}
              onValueChange={(value) => setDeleted(value as "active" | "deleted" | "all")}
            >
              <SelectTrigger className="h-11 rounded-lg bg-card">
                <SelectValue placeholder="Papierkorb" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ohne Papierkorb</SelectItem>
                <SelectItem value="deleted">Gelöschte Leads</SelectItem>
                <SelectItem value="all">Alle inkl. Papierkorb</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Filter className="h-3.5 w-3.5" />
            <span>{visibleLeads.length} Treffer</span>
            {search && <span className="rounded-full bg-muted px-2 py-1">Suche: {search}</span>}
            {(fixedLeadType || leadType !== "all") && (
              <span className="rounded-full bg-muted px-2 py-1">
                Typ: {fixedLeadType || leadType}
              </span>
            )}
            {messagesOnly && <span className="rounded-full bg-muted px-2 py-1">Mit Nachricht</span>}
            {status !== "all" && (
              <span className="rounded-full bg-muted px-2 py-1">
                Status: {statusLabels[status]}
              </span>
            )}
            {priority !== "all" && (
              <span className="rounded-full bg-muted px-2 py-1">
                Priorität: {priorityLabels[priority]}
              </span>
            )}
            {actionStatus !== "all" && (
              <span className="rounded-full bg-muted px-2 py-1">
                Aktion: {actionStatusLabels[actionStatus]}
              </span>
            )}
            <span className="rounded-full bg-muted px-2 py-1">
              {archived === "active"
                ? "Aktive Leads"
                : archived === "archived"
                  ? "Archiviert"
                  : "Alle Leads"}
            </span>
            <span className="rounded-full bg-muted px-2 py-1">
              {deleted === "active"
                ? "Ohne Papierkorb"
                : deleted === "deleted"
                  ? "Gelöschte Leads"
                  : "Alle inkl. Papierkorb"}
            </span>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          {selectedLeads.length > 0 && (
            <div className="sticky top-3 z-20 flex flex-col gap-3 rounded-xl border border-primary/20 bg-background/95 p-3 shadow-[0_18px_50px_color-mix(in_oklab,var(--foreground)_12%,transparent)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-semibold text-foreground">
                {selectedLeads.length} Leads ausgewählt
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  className="rounded-lg"
                  disabled={bulkProcessing}
                  onClick={() => runBulkUpdate("contacted")}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Als kontaktiert markieren
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-lg bg-card/80"
                  disabled={bulkProcessing}
                  onClick={() => runBulkUpdate("archive")}
                >
                  <Archive className="h-4 w-4" />
                  Archivieren
                </Button>
                {deleted === "deleted" ? (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="rounded-lg"
                    disabled={bulkProcessing}
                    onClick={() => setPermanentDeleteOpen(true)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Endgültig löschen
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-lg bg-card/80 text-muted-foreground hover:text-destructive"
                    disabled={bulkProcessing}
                    onClick={() => setTrashDialogOpen(true)}
                  >
                    <Trash2 className="h-4 w-4" />
                    In Papierkorb verschieben
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-lg"
                  disabled={bulkProcessing}
                  onClick={clearSelection}
                >
                  <X className="h-4 w-4" />
                  Auswahl aufheben
                </Button>
              </div>
            </div>
          )}
          {error ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4">
              <p className="text-sm font-medium text-destructive">{error}</p>
              <Button className="mt-3 rounded-lg" variant="outline" onClick={reload}>
                Erneut versuchen
              </Button>
            </div>
          ) : loading ? (
            <div className="grid gap-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="h-14 w-full rounded-lg" />
              ))}
            </div>
          ) : visibleLeads.length > 0 ? (
            <LeadTable
              leads={visibleLeads}
              onSelectLead={setSelectedLead}
              onLeadUpdated={applyUpdatedLead}
              selectedIds={selectedIds}
              onToggleLead={toggleLeadSelection}
              onToggleAllVisible={toggleAllVisible}
            />
          ) : (
            <div className="rounded-xl border border-dashed p-10 text-center">
              <h3 className="text-sm font-semibold text-foreground">{emptyTitle}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{emptyDescription}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={trashDialogOpen} onOpenChange={setTrashDialogOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Leads in den Papierkorb verschieben?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedLeads.length} ausgewählte Leads werden nicht endgültig gelöscht. Sie werden
              aus den Standardansichten ausgeblendet und können über „Gelöschte Leads“ geprüft
              werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={bulkProcessing}>Abbrechen</AlertDialogCancel>
            <AlertDialogAction
              disabled={bulkProcessing}
              onClick={(event) => {
                event.preventDefault();
                runBulkUpdate("trash");
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              In Papierkorb verschieben
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={permanentDeleteOpen} onOpenChange={setPermanentDeleteOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Diese Leads endgültig löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Leads endgültig löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={bulkProcessing}>Abbrechen</AlertDialogCancel>
            <AlertDialogAction
              disabled={bulkProcessing}
              onClick={(event) => {
                event.preventDefault();
                runPermanentDelete();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Endgültig löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <LeadDetailsDialog
        lead={selectedLead}
        open={Boolean(selectedLead)}
        onOpenChange={(open) => {
          if (!open) setSelectedLead(null);
        }}
        onUpdated={(updatedLead) => {
          applyUpdatedLead(updatedLead);
        }}
      />
    </>
  );
}
