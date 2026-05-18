import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link, createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AlertTriangle, ArrowLeft, Save, UserPen } from "lucide-react";
import { toast } from "sonner";

import { AdminAuthLoading } from "@/components/admin/AdminAuthLoading";
import { AdminShell } from "@/components/admin/AdminShell";
import { statusLabels } from "@/components/admin/lead-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  adminLeadFormTypes,
  getAdminLeadById,
  getAdminSession,
  leadOrigins,
  leadPriorities,
  leadStatuses,
  updateAdminLeadDetails,
  type AdminLead,
  type AdminLeadFormType,
  type AdminLeadOrigin,
  type AdminLeadPriority,
  type AdminLeadStatus,
  type EditAdminLeadInput,
} from "@/lib/admin";
import { getMissingContactFields, getMissingContactMessage } from "@/lib/lead-contact-quality";

export const Route = createFileRoute("/admin/leads/$id/edit")({
  beforeLoad: async () => {
    const session = await getAdminSession({});
    if (!session.authenticated) {
      throw redirect({ to: "/admin/login" });
    }
  },
  head: () => ({
    meta: [{ title: "Lead bearbeiten | Kassoubi Admin" }],
  }),
  pendingComponent: AdminAuthLoading,
  component: AdminLeadEditPage,
});

const leadTypeLabels: Record<AdminLeadFormType, string> = {
  bewerber: "Bewerber",
  unternehmen: "Unternehmen",
};

const priorityLabels: Record<AdminLeadPriority, string> = {
  low: "Niedrig",
  normal: "Normal",
  high: "Hoch",
  urgent: "Dringend",
};

const originLabels: Record<AdminLeadOrigin, string> = {
  website: "Website",
  dashboard: "Dashboard",
  whatsapp: "WhatsApp",
  phone: "Telefon",
  email: "E-Mail",
  referral: "Empfehlung",
  linkedin: "LinkedIn",
  other: "Sonstiges",
};

type LeadEditForm = EditAdminLeadInput;

const emptyForm: LeadEditForm = {
  id: "",
  lead_type: "bewerber",
  full_name: "",
  company_name: "",
  email: "",
  phone: "",
  whatsapp_number: "",
  country: "",
  city: "",
  lead_origin: "dashboard",
  source_detail: "",
  status: "new",
  priority: "normal",
  assigned_to: "",
  follow_up_date: "",
  notes: "",
  phone_missing: false,
  whatsapp_missing: false,
  email_missing: false,
  data_quality_notes: "",
};

function formatDateTimeInput(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 16);

  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

function mapLeadToForm(lead: AdminLead): LeadEditForm {
  const leadType = adminLeadFormTypes.includes(lead.type as AdminLeadFormType)
    ? (lead.type as AdminLeadFormType)
    : "bewerber";
  const status = leadStatuses.includes(lead.status as AdminLeadStatus)
    ? (lead.status as AdminLeadStatus)
    : "new";
  const priority = leadPriorities.includes(lead.priority as AdminLeadPriority)
    ? (lead.priority as AdminLeadPriority)
    : "normal";
  const leadOrigin = leadOrigins.includes(lead.lead_origin as AdminLeadOrigin)
    ? (lead.lead_origin as AdminLeadOrigin)
    : "dashboard";
  const missingContactFields = getMissingContactFields(lead);

  return {
    id: lead.id,
    lead_type: leadType,
    full_name: lead.name,
    company_name: lead.company_name,
    email: lead.email,
    phone: lead.phone,
    whatsapp_number: lead.whatsapp_number,
    country: lead.country,
    city: lead.city,
    lead_origin: leadOrigin,
    source_detail: lead.source_detail,
    status,
    priority,
    assigned_to: lead.assigned_to,
    follow_up_date: formatDateTimeInput(lead.follow_up_date),
    notes: lead.notes,
    phone_missing: missingContactFields.includes("phone"),
    whatsapp_missing: missingContactFields.includes("whatsapp"),
    email_missing: missingContactFields.includes("email"),
    data_quality_notes: lead.data_quality_notes,
  };
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && <p className="text-xs leading-5 text-muted-foreground">{hint}</p>}
    </div>
  );
}

function MissingCheckbox({
  id,
  label,
  checked,
  disabled,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  disabled: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border/70 bg-muted/35 px-3 py-2">
      <Checkbox
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={(value) => onCheckedChange(value === true)}
      />
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
    </div>
  );
}

export default function AdminLeadEditPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const loadLead = useServerFn(getAdminLeadById);
  const updateLead = useServerFn(updateAdminLeadDetails);
  const [form, setForm] = useState<LeadEditForm>(() => ({ ...emptyForm, id }));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    setLoading(true);
    setLoadError("");
    loadLead({ data: { id } })
      .then((lead) => {
        setForm(mapLeadToForm(lead));
      })
      .catch((leadError) => {
        setLoadError(
          leadError instanceof Error ? leadError.message : "Lead konnte nicht geladen werden.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, loadLead]);

  const update = <Key extends keyof LeadEditForm>(field: Key, value: LeadEditForm[Key]) => {
    setError("");
    setForm((current) => {
      const next = { ...current, [field]: value };

      if (field === "lead_type" && value === "bewerber") {
        next.company_name = "";
      }
      if (field === "phone" && typeof value === "string") {
        next.phone_missing = !value.trim();
      }
      if (field === "whatsapp_number" && typeof value === "string") {
        next.whatsapp_missing = !value.trim();
      }
      if (field === "email" && typeof value === "string") {
        next.email_missing = !value.trim();
      }

      return next;
    });
  };

  const validate = () => {
    if (!form.lead_type) return "Bitte wählen Sie einen Lead-Typ aus.";
    if (!form.full_name.trim()) return "Bitte geben Sie einen Namen oder Ansprechpartner ein.";
    if (form.lead_type === "unternehmen" && !form.company_name?.trim()) {
      return "Bitte geben Sie den Unternehmensnamen ein.";
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }
    return "";
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving) return;

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError("");
    updateLead({
      data: {
        ...form,
        company_name: form.lead_type === "unternehmen" ? form.company_name : "",
        email_missing: !(form.email || "").trim(),
        phone_missing: !(form.phone || "").trim(),
        whatsapp_missing: !(form.whatsapp_number || "").trim(),
      },
    })
      .then(() => {
        toast.success("Lead wurde aktualisiert.");
        navigate({ to: "/admin/leads" });
      })
      .catch((saveError) => {
        setError(
          saveError instanceof Error ? saveError.message : "Lead konnte nicht gespeichert werden.",
        );
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const missingContactFields = getMissingContactFields(form);
  const missingContactMessage = getMissingContactMessage(missingContactFields);

  return (
    <AdminShell
      title="Lead bearbeiten"
      description="Kontaktdaten, Status, Follow-up und Datenqualität intern pflegen."
    >
      {loading ? (
        <Card className="rounded-xl border-border/70 bg-card/95">
          <CardContent className="grid gap-4 p-6">
            <Skeleton className="h-12 w-64 rounded-lg" />
            <Skeleton className="h-80 w-full rounded-xl" />
          </CardContent>
        </Card>
      ) : loadError ? (
        <Card className="rounded-xl border-border/70 bg-card/95">
          <CardContent className="p-6">
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4">
              <p className="text-sm font-medium text-destructive">{loadError}</p>
            </div>
            <Button asChild className="mt-4 rounded-lg" variant="outline">
              <Link to="/admin/leads">
                <ArrowLeft className="h-4 w-4" />
                Zurück zur Lead-Liste
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <form className="grid min-w-0 gap-5" onSubmit={handleSubmit}>
          <Card className="overflow-hidden rounded-xl border-border/70 bg-card/95 shadow-[0_14px_40px_color-mix(in_oklab,var(--foreground)_7%,transparent)]">
            <CardHeader className="border-b border-border/70">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <UserPen className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{form.full_name || "Lead"}</CardTitle>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Änderungen werden privat im Adminbereich gespeichert.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button asChild type="button" variant="outline" className="rounded-lg bg-card/80">
                    <Link to="/admin/leads">
                      <ArrowLeft className="h-4 w-4" />
                      Abbrechen
                    </Link>
                  </Button>
                  <Button type="submit" className="rounded-lg" disabled={saving}>
                    <Save className="h-4 w-4" />
                    {saving ? "Speichert..." : "Lead speichern"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 p-5 sm:p-6">
              {error && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4">
                  <p className="text-sm font-medium text-destructive">{error}</p>
                </div>
              )}

              {missingContactFields.length > 0 && (
                <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-200">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p className="text-sm font-medium">{missingContactMessage}</p>
                </div>
              )}

              <section className="grid gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Basisinformationen</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Kontaktdaten und Lead-Typ für die operative Bearbeitung.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <Field label="Lead-Typ" htmlFor="lead-type">
                    <Select
                      value={form.lead_type}
                      onValueChange={(value) => update("lead_type", value as AdminLeadFormType)}
                      disabled={saving}
                    >
                      <SelectTrigger id="lead-type" className="h-11 rounded-lg bg-background">
                        <SelectValue placeholder="Lead-Typ wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {adminLeadFormTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {leadTypeLabels[type]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field
                    label={
                      form.lead_type === "unternehmen" ? "Ansprechpartner" : "Vollständiger Name"
                    }
                    htmlFor="full-name"
                  >
                    <Input
                      id="full-name"
                      value={form.full_name}
                      onChange={(event) => update("full_name", event.target.value)}
                      className="h-11 rounded-lg bg-background"
                      disabled={saving}
                    />
                  </Field>

                  {form.lead_type === "unternehmen" && (
                    <Field label="Unternehmen" htmlFor="company-name">
                      <Input
                        id="company-name"
                        value={form.company_name}
                        onChange={(event) => update("company_name", event.target.value)}
                        className="h-11 rounded-lg bg-background"
                        disabled={saving}
                      />
                    </Field>
                  )}

                  <Field label="E-Mail" htmlFor="email">
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(event) => update("email", event.target.value)}
                      className="h-11 rounded-lg bg-background"
                      disabled={saving}
                    />
                    {!form.email && (
                      <MissingCheckbox
                        id="email-missing"
                        label="E-Mail fehlt"
                        checked={Boolean(form.email_missing)}
                        disabled={saving}
                        onCheckedChange={(checked) => update("email_missing", checked)}
                      />
                    )}
                  </Field>

                  <Field label="Telefon" htmlFor="phone">
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      className="h-11 rounded-lg bg-background"
                      disabled={saving}
                    />
                    {!form.phone && (
                      <MissingCheckbox
                        id="phone-missing"
                        label="Telefon fehlt"
                        checked={Boolean(form.phone_missing)}
                        disabled={saving}
                        onCheckedChange={(checked) => update("phone_missing", checked)}
                      />
                    )}
                  </Field>

                  <Field label="WhatsApp" htmlFor="whatsapp">
                    <Input
                      id="whatsapp"
                      value={form.whatsapp_number}
                      onChange={(event) => update("whatsapp_number", event.target.value)}
                      className="h-11 rounded-lg bg-background"
                      disabled={saving}
                    />
                    {!form.whatsapp_number && (
                      <MissingCheckbox
                        id="whatsapp-missing"
                        label="WhatsApp fehlt"
                        checked={Boolean(form.whatsapp_missing)}
                        disabled={saving}
                        onCheckedChange={(checked) => update("whatsapp_missing", checked)}
                      />
                    )}
                  </Field>

                  <Field label="Land" htmlFor="country">
                    <Input
                      id="country"
                      value={form.country}
                      onChange={(event) => update("country", event.target.value)}
                      className="h-11 rounded-lg bg-background"
                      disabled={saving}
                    />
                  </Field>

                  <Field label="Stadt" htmlFor="city">
                    <Input
                      id="city"
                      value={form.city}
                      onChange={(event) => update("city", event.target.value)}
                      className="h-11 rounded-lg bg-background"
                      disabled={saving}
                    />
                  </Field>
                </div>
              </section>

              <section className="grid gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Lead Management</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Interne Steuerung für Status, Priorität, Follow-up und Verantwortlichkeit.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <Field label="Lead-Quelle" htmlFor="lead-origin">
                    <Select
                      value={form.lead_origin}
                      onValueChange={(value) => update("lead_origin", value as AdminLeadOrigin)}
                      disabled={saving}
                    >
                      <SelectTrigger id="lead-origin" className="h-11 rounded-lg bg-background">
                        <SelectValue placeholder="Quelle wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {leadOrigins.map((origin) => (
                          <SelectItem key={origin} value={origin}>
                            {originLabels[origin]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label="Status" htmlFor="status">
                    <Select
                      value={form.status}
                      onValueChange={(value) => update("status", value as AdminLeadStatus)}
                      disabled={saving}
                    >
                      <SelectTrigger id="status" className="h-11 rounded-lg bg-background">
                        <SelectValue placeholder="Status wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {leadStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {statusLabels[status]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label="Priorität" htmlFor="priority">
                    <Select
                      value={form.priority}
                      onValueChange={(value) => update("priority", value as AdminLeadPriority)}
                      disabled={saving}
                    >
                      <SelectTrigger id="priority" className="h-11 rounded-lg bg-background">
                        <SelectValue placeholder="Priorität wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {leadPriorities.map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priorityLabels[priority]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label="Quell-Detail" htmlFor="source-detail">
                    <Input
                      id="source-detail"
                      value={form.source_detail}
                      onChange={(event) => update("source_detail", event.target.value)}
                      className="h-11 rounded-lg bg-background"
                      disabled={saving}
                    />
                  </Field>

                  <Field label="Zugewiesen an" htmlFor="assigned-to">
                    <Input
                      id="assigned-to"
                      value={form.assigned_to}
                      onChange={(event) => update("assigned_to", event.target.value)}
                      className="h-11 rounded-lg bg-background"
                      disabled={saving}
                    />
                  </Field>

                  <Field
                    label="Follow-up"
                    htmlFor="follow-up"
                    hint="Datum und Uhrzeit für die nächste Aktion."
                  >
                    <Input
                      id="follow-up"
                      type="datetime-local"
                      value={form.follow_up_date}
                      onChange={(event) => update("follow_up_date", event.target.value)}
                      className="h-11 rounded-lg bg-background"
                      disabled={saving}
                    />
                  </Field>
                </div>
              </section>

              <section className="grid gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Interne Notizen</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Kontext für Bearbeitung, Qualität und nächste Schritte.
                  </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <Field label="Interne Notizen" htmlFor="notes">
                    <Textarea
                      id="notes"
                      value={form.notes}
                      onChange={(event) => update("notes", event.target.value)}
                      className="min-h-40 rounded-lg bg-background"
                      disabled={saving}
                    />
                  </Field>
                  <Field label="Data Quality Notes" htmlFor="data-quality-notes">
                    <Textarea
                      id="data-quality-notes"
                      value={form.data_quality_notes}
                      onChange={(event) => update("data_quality_notes", event.target.value)}
                      placeholder="z. B. Nummer fehlt, E-Mail unklar, Quelle noch prüfen..."
                      className="min-h-40 rounded-lg bg-background"
                      disabled={saving}
                    />
                  </Field>
                </div>
              </section>
            </CardContent>
          </Card>
        </form>
      )}
    </AdminShell>
  );
}
