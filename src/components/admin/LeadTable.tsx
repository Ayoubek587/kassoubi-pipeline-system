import { Link } from "@tanstack/react-router";
import { AlertTriangle, Eye, FileText, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { AdminLead } from "@/lib/admin";
import { getMissingContactFields } from "@/lib/lead-contact-quality";
import { LeadActions } from "./LeadActions";
import { LeadStatusBadge } from "./LeadStatusBadge";

function formatDate(value: string) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function fallback(value: string) {
  return value || "-";
}

const priorityLabels: Record<string, string> = {
  low: "Niedrig",
  normal: "Normal",
  high: "Hoch",
  urgent: "Dringend",
};

const priorityClasses: Record<string, string> = {
  low: "border-border bg-muted/70 text-muted-foreground",
  normal: "border-border bg-background text-foreground",
  high: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-300",
  urgent:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300",
};

function PriorityBadge({ priority }: { priority: string }) {
  const value = priority || "normal";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityClasses[value] || priorityClasses.normal}`}
    >
      {priorityLabels[value] || value}
    </span>
  );
}

export function LeadTable({
  leads,
  compact = false,
  onSelectLead,
  onLeadUpdated,
  selectedIds,
  onToggleLead,
  onToggleAllVisible,
}: {
  leads: AdminLead[];
  compact?: boolean;
  onSelectLead: (lead: AdminLead) => void;
  onLeadUpdated?: (lead: AdminLead) => void;
  selectedIds?: Set<string>;
  onToggleLead?: (leadId: string, selected: boolean) => void;
  onToggleAllVisible?: (selected: boolean) => void;
}) {
  const selectable = Boolean(selectedIds && onToggleLead && onToggleAllVisible);
  const visibleIds = leads.map((lead) => lead.id).filter(Boolean);
  const selectedVisibleCount = visibleIds.filter((id) => selectedIds?.has(id)).length;
  const allVisibleSelected = visibleIds.length > 0 && selectedVisibleCount === visibleIds.length;
  const someVisibleSelected = selectedVisibleCount > 0 && !allVisibleSelected;

  return (
    <div className="max-w-full overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
      <Table className={compact ? "min-w-[900px] table-fixed" : "min-w-[1170px] table-fixed"}>
        <TableHeader className="bg-muted/45">
          <TableRow className="hover:bg-transparent">
            {selectable && (
              <TableHead className="h-12 w-12 px-4">
                <Checkbox
                  checked={
                    allVisibleSelected ? true : someVisibleSelected ? "indeterminate" : false
                  }
                  onCheckedChange={(checked) => onToggleAllVisible?.(checked === true)}
                  onClick={(event) => event.stopPropagation()}
                  aria-label="Alle sichtbaren Leads auswählen"
                />
              </TableHead>
            )}
            <TableHead className="h-12 w-[180px] px-4 text-xs font-semibold uppercase tracking-wide">
              Name
            </TableHead>
            <TableHead className="w-[110px] px-4 text-xs font-semibold uppercase tracking-wide">
              Typ
            </TableHead>
            <TableHead className="w-[220px] px-4 text-xs font-semibold uppercase tracking-wide">
              E-Mail
            </TableHead>
            {!compact && (
              <TableHead className="w-[145px] px-4 text-xs font-semibold uppercase tracking-wide">
                Telefon
              </TableHead>
            )}
            {!compact && (
              <TableHead className="w-[90px] px-4 text-xs font-semibold uppercase tracking-wide">
                Deutsch
              </TableHead>
            )}
            {!compact && (
              <TableHead className="w-[150px] px-4 text-xs font-semibold uppercase tracking-wide">
                Bereich
              </TableHead>
            )}
            <TableHead className="w-[170px] px-4 text-xs font-semibold uppercase tracking-wide">
              Unternehmen
            </TableHead>
            <TableHead className="w-[140px] px-4 text-xs font-semibold uppercase tracking-wide">
              Status
            </TableHead>
            {!compact && (
              <TableHead className="w-[115px] px-4 text-xs font-semibold uppercase tracking-wide">
                Priorität
              </TableHead>
            )}
            <TableHead className="w-[145px] px-4 text-xs font-semibold uppercase tracking-wide">
              Erstellt
            </TableHead>
            <TableHead className="w-[230px] px-4 text-xs font-semibold uppercase tracking-wide">
              Aktionen
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const missingContactFields = getMissingContactFields(lead);

            return (
              <TableRow
                key={lead.id || `${lead.email}-${lead.created_at}`}
                tabIndex={0}
                role="button"
                onClick={() => onSelectLead(lead)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelectLead(lead);
                  }
                }}
                className="cursor-pointer border-border/60 hover:bg-primary/[0.035] focus-visible:bg-primary/[0.05] focus-visible:outline-none"
              >
                {selectable && (
                  <TableCell className="px-4 py-4">
                    <Checkbox
                      checked={selectedIds?.has(lead.id) || false}
                      onCheckedChange={(checked) => onToggleLead?.(lead.id, checked === true)}
                      onClick={(event) => event.stopPropagation()}
                      aria-label={`${lead.name || "Lead"} auswählen`}
                    />
                  </TableCell>
                )}
                <TableCell className="px-4 py-4">
                  <div className="truncate font-semibold text-foreground" title={lead.name}>
                    {fallback(lead.name)}
                  </div>
                  {lead.cv_file_path && (
                    <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                      <FileText className="h-3 w-3" />
                      CV
                    </div>
                  )}
                  {missingContactFields.length > 0 && (
                    <div className="mt-1 inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-300">
                      <AlertTriangle className="h-3 w-3" />
                      Kontaktdaten fehlen
                    </div>
                  )}
                  {compact && (
                    <div className="mt-1 truncate text-xs text-muted-foreground" title={lead.email}>
                      {lead.email}
                    </div>
                  )}
                </TableCell>
                <TableCell className="px-4 py-4">
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium capitalize text-muted-foreground">
                    {fallback(lead.type)}
                  </span>
                </TableCell>
                <TableCell
                  className="truncate px-4 py-4 text-sm text-muted-foreground"
                  title={lead.email}
                >
                  {fallback(lead.email)}
                </TableCell>
                {!compact && (
                  <TableCell
                    className="truncate px-4 py-4 text-sm text-muted-foreground"
                    title={lead.phone}
                  >
                    {fallback(lead.phone)}
                  </TableCell>
                )}
                {!compact && (
                  <TableCell className="px-4 py-4 text-sm text-muted-foreground">
                    {fallback(lead.german_level)}
                  </TableCell>
                )}
                {!compact && (
                  <TableCell
                    className="truncate px-4 py-4 text-sm text-muted-foreground"
                    title={lead.ausbildungsbereich}
                  >
                    {fallback(lead.ausbildungsbereich)}
                  </TableCell>
                )}
                <TableCell
                  className="truncate px-4 py-4 text-sm text-muted-foreground"
                  title={lead.company_name}
                >
                  {fallback(lead.company_name)}
                </TableCell>
                <TableCell className="px-4 py-4">
                  <LeadStatusBadge status={lead.status} />
                </TableCell>
                {!compact && (
                  <TableCell className="px-4 py-4">
                    <PriorityBadge priority={lead.priority} />
                  </TableCell>
                )}
                <TableCell className="px-4 py-4 text-sm text-muted-foreground">
                  {formatDate(lead.created_at)}
                </TableCell>
                <TableCell className="px-4 py-4">
                  <div className="flex items-center gap-1.5">
                    <TooltipProvider delayDuration={150}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            asChild
                            variant="outline"
                            size="icon"
                            className="rounded-lg bg-card/80"
                            onClick={(event) => event.stopPropagation()}
                            aria-label="Lead bearbeiten"
                          >
                            <Link to="/admin/leads/$id/edit" params={{ id: lead.id }}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Lead bearbeiten</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-lg bg-card/80"
                            onClick={(event) => {
                              event.stopPropagation();
                              onSelectLead(lead);
                            }}
                            aria-label="Lead Details öffnen"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Lead ansehen</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <LeadActions lead={lead} compact onUpdated={onLeadUpdated} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
