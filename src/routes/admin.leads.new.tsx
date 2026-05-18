import { useState, type FormEvent, type ReactNode } from "react";
import { Link, createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Save, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { AdminAuthLoading } from "@/components/admin/AdminAuthLoading";
import { AdminShell } from "@/components/admin/AdminShell";
import { statusLabels } from "@/components/admin/lead-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  adminLeadFormTypes,
  createAdminLead,
  getAdminSession,
  leadOrigins,
  leadPriorities,
  leadStatuses,
  type AdminLeadFormType,
  type AdminLeadOrigin,
  type AdminLeadPriority,
  type AdminLeadStatus,
  type CreateAdminLeadInput,
} from "@/lib/admin";

export const Route = createFileRoute("/admin/leads/new")({
  beforeLoad: async () => {
    const session = await getAdminSession({});
    if (!session.authenticated) throw redirect({ to: "/admin/login" });
  },
  head: () => ({
    meta: [{ title: "Neuen Lead erfassen | Kassoubi Admin" }],
  }),
  pendingComponent: AdminAuthLoading,
  component: AdminLeadCreatePage,
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

const initialForm: CreateAdminLeadInput = {
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
};

function Field({
  label,
  htmlFor,
  children,
  hint,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor} className="text-sm font-semibold text-foreground">
        {label}
      </Label>
      {children}
      {hint && <p className="text-xs leading-5 text-muted-foreground">{hint}</p>}
    </div>
  );
}

function AdminLeadCreatePage() {
  const navigate = useNavigate();
  const createLead = useServerFn(createAdminLead);
  const [form, setForm] = useState<CreateAdminLeadInput>(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const update = <Key extends keyof CreateAdminLeadInput>(
    key: Key,
    value: CreateAdminLeadInput[Key],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
      ...(key === "lead_type" && value === "bewerber" ? { company_name: "" } : {}),
    }));
  };

  const validate = () => {
    if (!form.lead_type) return "Bitte wählen Sie einen Lead-Typ aus.";
    if (!form.full_name?.trim()) return "Bitte geben Sie einen Namen oder Ansprechpartner ein.";
    if (form.lead_type === "unternehmen" && !form.company_name?.trim()) {
      return "Bitte geben Sie den Unternehmensnamen ein.";
    }
    if (!form.email?.trim() && !form.phone?.trim() && !form.whatsapp_number?.trim()) {
      return "Bitte geben Sie mindestens E-Mail, Telefon oder WhatsApp an.";
    }
    return "";
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError("");
    createLead({
      data: {
        ...form,
        company_name: form.lead_type === "unternehmen" ? form.company_name : "",
      },
    })
      .then(() => {
        toast.success("Lead wurde gespeichert.");
        navigate({ to: "/admin/leads" });
      })
      .catch((createError) => {
        setError(
          createError instanceof Error
            ? createError.message
            : "Lead konnte nicht gespeichert werden.",
        );
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <AdminShell
      title="Neuen Lead erfassen"
      description="Manuelle Erfassung für Telefonate, WhatsApp, Empfehlungen und direkte Kontakte."
    >
      <form className="grid min-w-0 gap-5" onSubmit={handleSubmit}>
        <Card className="overflow-hidden rounded-xl border-border/70 bg-card/95 shadow-[0_14px_40px_color-mix(in_oklab,var(--foreground)_7%,transparent)]">
          <CardHeader className="border-b border-border/70">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Lead-Daten</CardTitle>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Interne CRM-Erfassung ohne Umweg über das öffentliche Kontaktformular.
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

            <section className="grid gap-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Basisinformationen</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Kontaktdaten und Herkunft des Leads für die operative Bearbeitung.
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
                </Field>

                <Field label="Telefon" htmlFor="phone">
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    className="h-11 rounded-lg bg-background"
                    disabled={saving}
                  />
                </Field>

                <Field label="WhatsApp" htmlFor="whatsapp">
                  <Input
                    id="whatsapp"
                    value={form.whatsapp_number}
                    onChange={(event) => update("whatsapp_number", event.target.value)}
                    className="h-11 rounded-lg bg-background"
                    disabled={saving}
                  />
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
                    placeholder="z. B. Empfehlung, Kampagne, Gespräch"
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

              <Field label="Interne Notizen" htmlFor="notes">
                <Textarea
                  id="notes"
                  value={form.notes}
                  onChange={(event) => update("notes", event.target.value)}
                  placeholder="Gesprächsnotizen, Kontext, nächste Schritte..."
                  className="min-h-36 rounded-lg bg-background"
                  disabled={saving}
                />
              </Field>
            </section>
          </CardContent>
        </Card>
      </form>
    </AdminShell>
  );
}
