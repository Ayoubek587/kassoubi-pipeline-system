import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  AlertTriangle,
  BriefcaseBusiness,
  BellPlus,
  Download,
  FileText,
  MessageSquareText,
  Pencil,
  Save,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  getLeadCvDownloadUrl,
  leadPriorities,
  leadStatuses,
  type AdminLead,
  type AdminLeadPriority,
  type AdminLeadStatus,
  updateAdminLead,
} from "@/lib/admin";
import { getMissingContactFields, getMissingContactMessage } from "@/lib/lead-contact-quality";
import { LeadActions } from "./LeadActions";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { statusLabels } from "./lead-status";

const knownFields = new Set([
  "id",
  "full_name",
  "name",
  "lead_type",
  "type",
  "email",
  "phone",
  "whatsapp_number",
  "german_level",
  "ausbildungsbereich",
  "company_name",
  "status",
  "priority",
  "action_status",
  "last_contacted_at",
  "follow_up_date",
  "archived",
  "deleted_at",
  "message",
  "notes",
  "internal_notes",
  "cv_file_path",
  "country",
  "city",
  "lead_origin",
  "source_detail",
  "assigned_to",
  "calendly_link",
  "created_by_admin",
  "created_by",
  "created_at",
  "updated_at",
  "updated_by",
  "phone_missing",
  "whatsapp_missing",
  "email_missing",
  "data_quality_notes",
]);

function formatDate(value: string) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("de-DE");
}

function formatDateInput(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);
  return date.toISOString().slice(0, 10);
}

const priorityLabels: Record<AdminLeadPriority, string> = {
  low: "Niedrig",
  normal: "Normal",
  high: "Hoch",
  urgent: "Dringend",
};

const actionStatusLabels: Record<string, string> = {
  contacted: "Kontaktiert",
  called: "Angerufen",
  emailed: "E-Mail gesendet",
  whatsapp_sent: "WhatsApp gesendet",
  follow_up_needed: "Follow-up nötig",
};

function formatCvFileName(path: string) {
  if (!path) return "Lebenslauf";

  const segment = path.split("/").pop() || path;
  const decoded = decodeURIComponent(segment);

  return decoded.replace(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-/i, "");
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/70 bg-background/70 p-3">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1.5 break-words text-sm font-medium text-foreground">{value || "-"}</dd>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border/70 bg-card/90 shadow-sm">
      <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

export function LeadDetailsDialog({
  lead,
  open,
  onOpenChange,
  onUpdated,
}: {
  lead: AdminLead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: (lead: AdminLead) => void;
}) {
  const updateLead = useServerFn(updateAdminLead);
  const getCvDownloadUrl = useServerFn(getLeadCvDownloadUrl);
  const [status, setStatus] = useState<AdminLeadStatus>("new");
  const [priority, setPriority] = useState<AdminLeadPriority>("normal");
  const [followUpDate, setFollowUpDate] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [cvLoading, setCvLoading] = useState(false);
  const [cvError, setCvError] = useState("");

  useEffect(() => {
    if (!lead) return;
    setStatus(
      leadStatuses.includes(lead.status as AdminLeadStatus)
        ? (lead.status as AdminLeadStatus)
        : "new",
    );
    setNotes(lead.notes || "");
    setPriority(
      leadPriorities.includes(lead.priority as AdminLeadPriority)
        ? (lead.priority as AdminLeadPriority)
        : "normal",
    );
    setFollowUpDate(formatDateInput(lead.follow_up_date));
    setError("");
    setCvError("");
    setCvLoading(false);
  }, [lead]);

  const extraFields = useMemo(() => {
    if (!lead) return [];

    return Object.entries(lead.raw).filter(
      ([key, value]) => !knownFields.has(key) && value !== null && value !== "",
    );
  }, [lead]);

  if (!lead) return null;

  const hasCv = Boolean(lead.cv_file_path);
  const missingContactFields = getMissingContactFields(lead);
  const missingContactMessage = getMissingContactMessage(missingContactFields);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90dvh] w-[min(calc(100vw-2rem),960px)] max-w-[960px] flex-col gap-0 overflow-hidden rounded-2xl p-0 shadow-[0_30px_100px_color-mix(in_oklab,var(--foreground)_18%,transparent)] sm:w-[min(calc(100vw-3rem),960px)]">
        <DialogHeader className="border-b border-border/70 bg-muted/35 px-5 py-5 sm:px-6">
          <div className="flex min-w-0 flex-col gap-4 pr-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <LeadStatusBadge status={status} />
                <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium capitalize text-muted-foreground">
                  {lead.type || "Lead"}
                </span>
              </div>
              <DialogTitle className="break-words text-2xl tracking-tight">
                {lead.name || "Lead Details"}
              </DialogTitle>
              <DialogDescription className="mt-1.5">
                Erstellt am {formatDate(lead.created_at)}
              </DialogDescription>
            </div>
            <Button asChild variant="outline" className="w-fit rounded-lg bg-card/80">
              <Link
                to="/admin/leads/$id/edit"
                params={{ id: lead.id }}
                onClick={() => onOpenChange(false)}
              >
                <Pencil className="h-4 w-4" />
                Bearbeiten
              </Link>
            </Button>
          </div>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto bg-surface/70 px-4 py-5 sm:px-6">
          <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="grid min-w-0 gap-5">
              {missingContactFields.length > 0 && (
                <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-200">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p className="text-sm font-medium">{missingContactMessage}</p>
                </div>
              )}

              <Section title="Kontakt" icon={UserRound}>
                <dl className="grid gap-3 sm:grid-cols-2">
                  <DetailItem label="Name" value={lead.name} />
                  <DetailItem label="Lead-Typ" value={lead.type} />
                  <DetailItem label="E-Mail" value={lead.email} />
                  <DetailItem
                    label="Telefon"
                    value={lead.phone || "Keine Telefonnummer vorhanden"}
                  />
                  <DetailItem
                    label="WhatsApp"
                    value={lead.whatsapp_number || "Keine WhatsApp-Nummer vorhanden"}
                  />
                </dl>
              </Section>

              <Section title="Bewerbungs-/Unternehmensdaten" icon={BriefcaseBusiness}>
                <dl className="grid gap-3 sm:grid-cols-2">
                  <DetailItem label="Deutschlevel" value={lead.german_level} />
                  <DetailItem label="Bereich" value={lead.ausbildungsbereich} />
                  <DetailItem label="Unternehmen" value={lead.company_name} />
                  <DetailItem label="Land" value={lead.country} />
                  <DetailItem label="Stadt" value={lead.city} />
                  <DetailItem label="Erstellt" value={formatDate(lead.created_at)} />
                  <DetailItem label="Aktualisiert" value={formatDate(lead.updated_at)} />
                  {extraFields.map(([key, value]) => (
                    <DetailItem key={key} label={key} value={String(value)} />
                  ))}
                </dl>
              </Section>

              <Section title="Nachricht" icon={MessageSquareText}>
                <div className="min-h-36 whitespace-pre-wrap rounded-lg border border-border/70 bg-background p-4 text-sm leading-6 text-foreground">
                  {lead.message || "Keine Nachricht hinterlegt."}
                </div>
              </Section>

              {lead.data_quality_notes && (
                <Section title="Data Quality Notes" icon={AlertTriangle}>
                  <div className="min-h-24 whitespace-pre-wrap rounded-lg border border-border/70 bg-background p-4 text-sm leading-6 text-foreground">
                    {lead.data_quality_notes}
                  </div>
                </Section>
              )}

              {lead.type === "bewerber" && (
                <Section title="Lebenslauf" icon={FileText}>
                  {hasCv ? (
                    <div className="rounded-lg border border-border/70 bg-background/80 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <p className="break-words text-sm font-semibold text-foreground">
                            {formatCvFileName(lead.cv_file_path)}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Privater Download-Link wird beim Öffnen für 60 Sekunden erstellt.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="rounded-lg bg-card/80"
                          disabled={cvLoading}
                          onClick={() => {
                            setCvLoading(true);
                            setCvError("");
                            getCvDownloadUrl({ data: { path: lead.cv_file_path } })
                              .then((result) => {
                                window.open(result.url, "_blank", "noopener,noreferrer");
                              })
                              .catch((downloadError) => {
                                setCvError(
                                  downloadError instanceof Error
                                    ? downloadError.message
                                    : "Der signierte Download-Link konnte nicht erstellt werden.",
                                );
                              })
                              .finally(() => {
                                setCvLoading(false);
                              });
                          }}
                        >
                          <Download className="h-4 w-4" />
                          {cvLoading ? "Öffnet..." : "Öffnen"}
                        </Button>
                      </div>
                      {cvError && (
                        <p className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                          {cvError}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-border bg-background/70 p-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        Kein Lebenslauf hochgeladen.
                      </p>
                    </div>
                  )}
                </Section>
              )}
            </div>

            <div className="grid gap-5">
              <Section title="Aktionen" icon={BellPlus}>
                <LeadActions
                  lead={lead}
                  followUpDate={followUpDate}
                  onUpdated={onUpdated}
                  onArchived={(updatedLead) => {
                    onUpdated(updatedLead);
                    onOpenChange(false);
                  }}
                />
              </Section>

              <Section title="Management" icon={Save}>
                <div className="grid gap-4">
                  <div className="rounded-lg border border-border/70 bg-background/70 p-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <BellPlus className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">
                          {actionStatusLabels[lead.action_status] || "Noch keine Aktion erfasst"}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Letzter Kontakt: {formatDate(lead.last_contacted_at)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Status</label>
                    <Select
                      value={status}
                      onValueChange={(value) => setStatus(value as AdminLeadStatus)}
                      disabled={saving}
                    >
                      <SelectTrigger className="h-11 rounded-lg bg-background">
                        <SelectValue placeholder="Status wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {leadStatuses.map((option) => (
                          <SelectItem key={option} value={option}>
                            {statusLabels[option]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Priorität
                    </label>
                    <Select
                      value={priority}
                      onValueChange={(value) => setPriority(value as AdminLeadPriority)}
                      disabled={saving}
                    >
                      <SelectTrigger className="h-11 rounded-lg bg-background">
                        <SelectValue placeholder="Priorität wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {leadPriorities.map((option) => (
                          <SelectItem key={option} value={option}>
                            {priorityLabels[option]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label
                      htmlFor="lead-follow-up-date"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Follow-up Datum
                    </label>
                    <Input
                      id="lead-follow-up-date"
                      type="date"
                      value={followUpDate}
                      disabled={saving}
                      onChange={(event) => setFollowUpDate(event.target.value)}
                      className="h-11 rounded-lg bg-background"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lead-notes"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Interne Notizen
                    </label>
                    <Textarea
                      id="lead-notes"
                      value={notes}
                      disabled={saving}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="Notizen für das interne Team..."
                      className="min-h-56 rounded-lg bg-background"
                    />
                  </div>

                  {error && (
                    <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                      {error}
                    </p>
                  )}
                </div>
              </Section>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 flex flex-col gap-3 border-t border-border/70 bg-background/95 px-5 py-3.5 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs text-muted-foreground">
            Änderungen werden direkt in Supabase gespeichert.
          </p>
          <Button
            className="rounded-lg"
            disabled={saving}
            onClick={() => {
              setSaving(true);
              setError("");
              updateLead({
                data: { id: lead.id, status, notes, priority, follow_up_date: followUpDate },
              })
                .then((updatedLead) => {
                  onUpdated(updatedLead);
                })
                .catch((saveError) => {
                  setError(
                    saveError instanceof Error
                      ? saveError.message
                      : "Lead konnte nicht gespeichert werden.",
                  );
                })
                .finally(() => {
                  setSaving(false);
                });
            }}
          >
            <Save className="h-4 w-4" />
            {saving ? "Speichert..." : "Status & Notizen speichern"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
