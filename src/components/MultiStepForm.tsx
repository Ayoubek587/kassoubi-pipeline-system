import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  FileText,
  GraduationCap,
  Hash,
  Mail,
  MessageSquareText,
  Phone,
  Upload,
  User,
  Globe2,
  X,
} from "lucide-react";
import { submitLead } from "@/lib/submit-lead";

type Audience = "unternehmen" | "bewerber";
type NeedType = "ausbildung" | "arbeit";

type FormData = {
  type: Audience;
  needType: NeedType;
  name: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  company: string;
  positions: string;
  industry: string;
  customArea: string;
  country: string;
  city: string;
  startDate: string;
  germanLevel: string;
  message: string;
  privacyConsent: boolean;
  cvFile: File | null;
};

type TextFormField = Exclude<keyof FormData, "cvFile" | "privacyConsent">;

const trainingOptions = ["Pflege", "IT", "Gastronomie", "Handwerk", "Hotellerie", "Industrie"];
const applicantWorkOptions = [
  "Pflegefachkraft",
  "Lager",
  "Fahrer",
  "IT",
  "Bau",
  "Gastronomie",
  "Reinigung",
  "Produktion",
];
const companyWorkOptions = [
  "Pflege",
  "Lager",
  "IT",
  "Bau",
  "Gastronomie",
  "Reinigung",
  "Produktion",
];
const otherOption = "Sonstiges";
const germanLevelOptions = ["A1", "A2", "B1", "B2", "C1"];
const maxCvSizeBytes = 5 * 1024 * 1024;
const allowedCvMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const allowedCvExtensions = [".pdf", ".doc", ".docx"];

const createInitialData = (type: Audience): FormData => ({
  type,
  needType: "ausbildung",
  name: "",
  email: "",
  phone: "",
  whatsappNumber: "",
  company: "",
  positions: "",
  industry: "",
  customArea: "",
  country: "",
  city: "",
  startDate: "",
  germanLevel: "",
  message: "",
  privacyConsent: false,
  cvFile: null,
});

function validateCvFile(file: File) {
  const lowerName = file.name.toLowerCase();
  const hasAllowedExtension = allowedCvExtensions.some((extension) =>
    lowerName.endsWith(extension),
  );

  if (!hasAllowedExtension || (file.type && !allowedCvMimeTypes.includes(file.type))) {
    return "Bitte laden Sie Ihren Lebenslauf als PDF, DOC oder DOCX hoch.";
  }

  if (file.size > maxCvSizeBytes) {
    return "Der Lebenslauf darf maximal 5 MB groß sein.";
  }

  return "";
}

function getCvMimeType(fileName: string, mimeType: string) {
  if (mimeType) return mimeType;
  const lowerName = fileName.toLowerCase();

  if (lowerName.endsWith(".doc")) return "application/msword";
  if (lowerName.endsWith(".docx")) {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  return "application/pdf";
}

function formatFileSize(size: number) {
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    reader.onerror = () => reject(new Error("Der Lebenslauf konnte nicht gelesen werden."));
    reader.readAsDataURL(file);
  });
}

function Field({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  disabled = false,
}: {
  id: string;
  label: string;
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      <Icon
        size={16}
        className="absolute left-3 top-[2.8rem] text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id={id}
        className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-base text-foreground transition placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-white/[0.04] sm:text-sm"
        placeholder={placeholder}
        type={type}
        value={value}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function NeedSelector({
  value,
  onChange,
  disabled = false,
}: {
  value: NeedType;
  onChange: (value: NeedType) => void;
  disabled?: boolean;
}) {
  const options: { value: NeedType; label: string; icon: LucideIcon }[] = [
    { value: "ausbildung", label: "Ausbildung", icon: GraduationCap },
    { value: "arbeit", label: "Arbeit / Fachkräfte", icon: BriefcaseBusiness },
  ];

  return (
    <div className="md:col-span-2">
      <span className="mb-2 block text-sm font-medium text-foreground">Was suchen Sie?</span>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const Icon = option.icon;
          const active = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              disabled={disabled}
              onClick={() => onChange(option.value)}
              className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${
                active
                  ? "border-primary/45 bg-primary/10 text-primary ring-1 ring-primary/20"
                  : "border-slate-200 bg-slate-50 text-foreground hover:border-primary/25 hover:bg-primary/[0.04] dark:border-white/10 dark:bg-white/[0.04]"
              }`}
            >
              <Icon size={17} aria-hidden="true" />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChipChoiceGroup({
  label,
  options,
  value,
  onSelect,
  error,
  disabled = false,
}: {
  label: string;
  options: string[];
  value: string;
  onSelect: (value: string) => void;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-foreground">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option;

          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              disabled={disabled}
              onClick={() => onSelect(option)}
              className={`min-h-11 rounded-full border px-3.5 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${
                active
                  ? "border-primary/45 bg-primary/10 text-primary ring-1 ring-primary/20"
                  : "border-slate-200 bg-slate-50 text-muted-foreground hover:border-primary/30 hover:text-primary dark:border-white/10 dark:bg-white/[0.04]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}

function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div className="relative md:col-span-2">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      <MessageSquareText
        size={16}
        className="absolute left-3 top-[2.8rem] text-muted-foreground"
        aria-hidden="true"
      />
      <textarea
        id={id}
        className="min-h-[132px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-base text-foreground transition placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-white/[0.04] sm:min-h-[140px] sm:text-sm"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function CvUploadField({
  file,
  error,
  disabled = false,
  onChange,
  onRemove,
}: {
  file: File | null;
  error?: string;
  disabled?: boolean;
  onChange: (file: File | null, error: string) => void;
  onRemove: () => void;
}) {
  return (
    <div className="md:col-span-2">
      <label htmlFor="applicant-cv" className="mb-2 block text-sm font-medium text-foreground">
        Lebenslauf hochladen <span className="text-muted-foreground">(optional)</span>
      </label>
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 transition hover:border-primary/35 hover:bg-primary/[0.03] dark:border-white/10 dark:bg-white/[0.04]">
        {file ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText size={18} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <button
              type="button"
              disabled={disabled}
              onClick={onRemove}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 text-sm font-semibold text-muted-foreground transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-70"
            >
              <X size={15} aria-hidden="true" />
              Entfernen
            </button>
          </div>
        ) : (
          <label
            htmlFor="applicant-cv"
            className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl px-4 py-6 text-center"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Upload size={18} aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-foreground">
              PDF, DOC oder DOCX auswählen
            </span>
            <span className="text-xs text-muted-foreground">Maximal 5 MB</span>
          </label>
        )}
        <input
          id="applicant-cv"
          type="file"
          className="sr-only"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          disabled={disabled}
          onChange={(event) => {
            const selectedFile = event.target.files?.[0] || null;
            if (!selectedFile) {
              onChange(null, "");
              return;
            }
            onChange(selectedFile, validateCvFile(selectedFile));
            event.target.value = "";
          }}
        />
      </div>
      {error && <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}

function ConsentBox({
  checked,
  error,
  disabled = false,
  onChange,
}: {
  checked: boolean;
  error?: string;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="md:col-span-2">
      <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-muted-foreground transition dark:border-white/10 dark:bg-white/[0.04]">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-70"
        />
        <span>
          Ich stimme der Verarbeitung meiner Angaben gemäß der{" "}
          <a href="/datenschutz" className="font-semibold text-primary hover:underline">
            Datenschutzerklärung
          </a>{" "}
          zu.
        </span>
      </label>
      {error && <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}

export default function MultiStepForm({
  selectedType,
  redirectToBooking = false,
  sourceRoute,
}: {
  selectedType: Audience;
  redirectToBooking?: boolean;
  sourceRoute?: string;
}) {
  const navigate = useNavigate();
  const submitLeadServer = useServerFn(submitLead);
  const [data, setData] = useState<FormData>(() => createInitialData(selectedType));
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [cvError, setCvError] = useState("");
  const workOptions = selectedType === "unternehmen" ? companyWorkOptions : applicantWorkOptions;
  const areaOptions = data.needType === "ausbildung" ? trainingOptions : workOptions;
  const selectableAreaOptions = [...areaOptions, otherOption];
  const needLabel = data.needType === "ausbildung" ? "Ausbildungsbereich" : "Arbeitsbereich";
  const customAreaLabel =
    data.needType === "ausbildung" ? "Eigener Ausbildungsbereich" : "Eigener Arbeitsbereich";
  const customAreaPlaceholder = "Bitte gewünschten Bereich eingeben";

  useEffect(() => {
    setSubmitted(false);
    setSubmitting(false);
    setSubmitError("");
    setSuccessMessage("");
    setFieldErrors({});
    setCvError("");
    setData(createInitialData(selectedType));
  }, [selectedType]);

  const update = (field: TextFormField, value: string) => {
    setSubmitError("");
    setFieldErrors((current) => ({
      ...current,
      [field]: "",
      ...(field === "phone" || field === "whatsappNumber" ? { phone: "" } : {}),
    }));
    setData((current) => ({ ...current, [field]: value }));
  };

  const updateConsent = (checked: boolean) => {
    setSubmitError("");
    setFieldErrors((current) => ({ ...current, privacyConsent: "" }));
    setData((current) => ({ ...current, privacyConsent: checked }));
  };

  const updateCvFile = (file: File | null, error: string) => {
    setSubmitError("");
    setCvError(error);
    setData((current) => ({ ...current, cvFile: file }));
  };

  const updateNeed = (needType: NeedType) => {
    setSubmitError("");
    setFieldErrors((current) => ({ ...current, needType: "", industry: "" }));
    setData((current) => ({ ...current, needType, industry: "", customArea: "" }));
  };

  const confirmationText =
    successMessage ||
    (selectedType === "bewerber"
      ? "Wir prüfen Ihr Profil, Ihr Deutschlevel und Ihre Unterlagen und melden uns mit einer realistischen Ersteinschätzung."
      : "Wir melden uns mit dem passenden nächsten Schritt für Ihre Anfrage zu Kandidaten aus Marokko.");

  const buildMessage = () => {
    const details = [
      `Bedarf: ${data.needType === "ausbildung" ? "Ausbildung" : "Arbeit / Fachkräfte"}`,
      data.positions ? `Anzahl: ${data.positions}` : "",
      data.country
        ? `Land: ${data.country}`
        : selectedType === "unternehmen"
          ? "Gesuchter Kandidatenmarkt: Marokko"
          : "",
      data.city ? `Standort / Stadt: ${data.city}` : "",
      data.startDate ? `Gewünschter Starttermin: ${data.startDate}` : "",
    ].filter(Boolean);

    return [data.message.trim(), ...details].filter(Boolean).join("\n\n");
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-accent/20 bg-accent/10 p-8 text-center"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
          <Check size={26} className="text-accent" aria-hidden="true" />
        </div>
        <h3 className="mb-2 text-xl font-bold">Vielen Dank!</h3>
        <p className="text-sm text-muted-foreground">{confirmationText}</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        if (submitting) return;
        const nextErrors: Record<string, string> = {};
        const selectedArea = data.customArea || data.industry;

        if (!data.name.trim()) {
          nextErrors.name =
            selectedType === "unternehmen"
              ? "Bitte geben Sie eine Kontaktperson ein."
              : "Bitte geben Sie Ihren Namen ein.";
        }

        if (!data.email.trim()) {
          nextErrors.email = "Bitte geben Sie eine E-Mail-Adresse ein.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
          nextErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
        }

        if (selectedType === "bewerber") {
          if (!data.phone.trim() && !data.whatsappNumber.trim()) {
            nextErrors.phone = "Bitte geben Sie Telefon oder WhatsApp an.";
          }
          if (!data.country.trim()) {
            nextErrors.country = "Bitte geben Sie Ihr Land an.";
          }
          if (!data.germanLevel) {
            nextErrors.germanLevel = "Bitte wählen Sie ein Deutschlevel aus.";
          }
          if (!selectedArea) {
            nextErrors.industry = "Bitte wählen Sie einen Ausbildungs- oder Arbeitsbereich aus.";
          }
        } else {
          if (!data.company.trim()) {
            nextErrors.company = "Bitte geben Sie den Unternehmensnamen ein.";
          }
          if (!data.phone.trim()) {
            nextErrors.phone = "Bitte geben Sie eine Telefonnummer ein.";
          }
          if (!data.city.trim()) {
            nextErrors.city = "Bitte geben Sie Stadt oder Unternehmensstandort ein.";
          }
        }

        if (!data.privacyConsent) {
          nextErrors.privacyConsent = "Bitte bestätigen Sie die Datenschutzhinweise.";
        }

        if (Object.values(nextErrors).some(Boolean)) {
          setFieldErrors(nextErrors);
          setSubmitError("Bitte prüfen Sie die markierten Felder.");
          return;
        }
        if (data.cvFile) {
          const currentCvError = validateCvFile(data.cvFile);
          if (currentCvError) {
            setCvError(currentCvError);
            return;
          }
        }
        setSubmitting(true);
        setSubmitError("");
        setCvError("");

        try {
          const cv = data.cvFile
            ? {
                fileName: data.cvFile.name,
                mimeType: getCvMimeType(data.cvFile.name, data.cvFile.type),
                size: data.cvFile.size,
                base64: await fileToBase64(data.cvFile),
              }
            : undefined;
          const result = await submitLeadServer({
            data: {
              lead_type: selectedType,
              full_name: data.name,
              email: data.email,
              phone: data.phone,
              whatsapp_number: data.whatsappNumber || undefined,
              german_level: data.germanLevel,
              ausbildungsbereich: data.customArea || data.industry,
              company_name: data.company,
              country: data.country,
              city: data.city,
              source_route: sourceRoute,
              need_type: data.needType,
              privacy_consent: data.privacyConsent,
              message: buildMessage(),
              cv,
            },
          });
          setSuccessMessage(
            result.warning ? `${result.message} ${result.warning}` : result.message,
          );
          if (redirectToBooking) {
            navigate({
              to: "/analyse-termin",
              search: result.leadId ? { lead_id: result.leadId } : {},
            });
            return;
          }
          setSubmitted(true);
        } catch (error) {
          setSubmitError(
            error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.",
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {selectedType === "unternehmen" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            id="company-name"
            label="Name"
            icon={User}
            placeholder="Ihr Name"
            value={data.name}
            disabled={submitting}
            error={fieldErrors.name}
            onChange={(value) => update("name", value)}
          />
          <Field
            id="company-company"
            label="Unternehmen"
            icon={Building2}
            placeholder="Name des Unternehmens"
            value={data.company}
            disabled={submitting}
            error={fieldErrors.company}
            onChange={(value) => update("company", value)}
          />
          <Field
            id="company-email"
            label="E-Mail"
            icon={Mail}
            placeholder="name@unternehmen.de"
            type="email"
            value={data.email}
            disabled={submitting}
            error={fieldErrors.email}
            onChange={(value) => update("email", value)}
          />
          <Field
            id="company-phone"
            label="Telefon"
            icon={Phone}
            placeholder="+49 ..."
            value={data.phone}
            disabled={submitting}
            error={fieldErrors.phone}
            onChange={(value) => update("phone", value)}
          />
          <Field
            id="company-whatsapp"
            label="WhatsApp-Nummer (optional)"
            icon={Phone}
            placeholder="+49 ..."
            value={data.whatsappNumber}
            disabled={submitting}
            onChange={(value) => update("whatsappNumber", value)}
          />
          <Field
            id="company-city"
            label="Stadt / Standort"
            icon={Globe2}
            placeholder="z. B. Berlin"
            value={data.city}
            disabled={submitting}
            error={fieldErrors.city}
            onChange={(value) => update("city", value)}
          />
          <NeedSelector value={data.needType} disabled={submitting} onChange={updateNeed} />
          <Field
            id="company-positions"
            label={
              data.needType === "ausbildung" ? "Anzahl Ausbildungsplätze" : "Anzahl Positionen"
            }
            icon={Hash}
            placeholder="z. B. 3"
            type="number"
            value={data.positions}
            disabled={submitting}
            onChange={(value) => update("positions", value)}
          />
          <div className="md:col-span-2">
            <ChipChoiceGroup
              label={needLabel}
              options={selectableAreaOptions}
              value={data.industry}
              disabled={submitting}
              error={fieldErrors.industry}
              onSelect={(value) => update("industry", value)}
            />
          </div>
          {data.industry === otherOption && (
            <Field
              id="company-custom-area"
              label={customAreaLabel}
              icon={BriefcaseBusiness}
              placeholder={customAreaPlaceholder}
              value={data.customArea}
              disabled={submitting}
              error={fieldErrors.industry}
              onChange={(value) => update("customArea", value)}
            />
          )}
          <Field
            id="company-start-date"
            label="Gewünschter Starttermin"
            icon={CalendarDays}
            placeholder="z. B. August 2026"
            value={data.startDate}
            disabled={submitting}
            onChange={(value) => update("startDate", value)}
          />
          <div>
            <ChipChoiceGroup
              label="Deutschlevel (optional)"
              options={germanLevelOptions}
              value={data.germanLevel}
              disabled={submitting}
              onSelect={(value) => update("germanLevel", value)}
              error={fieldErrors.germanLevel}
            />
          </div>
          <TextArea
            id="company-message"
            label="Nachricht"
            placeholder="Welche Azubis oder Fachkräfte aus Marokko suchen Sie?"
            value={data.message}
            disabled={submitting}
            onChange={(value) => update("message", value)}
          />
          <ConsentBox
            checked={data.privacyConsent}
            disabled={submitting}
            error={fieldErrors.privacyConsent}
            onChange={updateConsent}
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            id="applicant-name"
            label="Name"
            icon={User}
            placeholder="Ihr Name"
            value={data.name}
            disabled={submitting}
            error={fieldErrors.name}
            onChange={(value) => update("name", value)}
          />
          <Field
            id="applicant-email"
            label="E-Mail"
            icon={Mail}
            placeholder="name@email.com"
            type="email"
            value={data.email}
            disabled={submitting}
            error={fieldErrors.email}
            onChange={(value) => update("email", value)}
          />
          <Field
            id="applicant-phone"
            label="Telefonnummer / WhatsApp-Nummer"
            icon={Phone}
            placeholder="+212 ... oder 06 ..."
            value={data.phone}
            disabled={submitting}
            error={fieldErrors.phone}
            onChange={(value) => update("phone", value)}
          />
          <Field
            id="applicant-whatsapp"
            label="WhatsApp-Nummer (optional)"
            icon={Phone}
            placeholder="+212 ... oder 06 ..."
            value={data.whatsappNumber}
            disabled={submitting}
            onChange={(value) => update("whatsappNumber", value)}
          />
          <Field
            id="applicant-country"
            label="Land"
            icon={Globe2}
            placeholder="z. B. Marokko"
            value={data.country}
            disabled={submitting}
            error={fieldErrors.country}
            onChange={(value) => update("country", value)}
          />
          <NeedSelector value={data.needType} disabled={submitting} onChange={updateNeed} />
          <div className="md:col-span-2">
            <ChipChoiceGroup
              label={needLabel}
              options={selectableAreaOptions}
              value={data.industry}
              disabled={submitting}
              error={fieldErrors.industry}
              onSelect={(value) => update("industry", value)}
            />
          </div>
          {data.industry === otherOption && (
            <Field
              id="applicant-custom-area"
              label={customAreaLabel}
              icon={BriefcaseBusiness}
              placeholder={customAreaPlaceholder}
              value={data.customArea}
              disabled={submitting}
              error={fieldErrors.industry}
              onChange={(value) => update("customArea", value)}
            />
          )}
          <Field
            id="applicant-start-date"
            label="Gewünschter Starttermin"
            icon={CalendarDays}
            placeholder="z. B. August 2026"
            value={data.startDate}
            disabled={submitting}
            onChange={(value) => update("startDate", value)}
          />
          <div>
            <ChipChoiceGroup
              label="Deutschlevel"
              options={germanLevelOptions}
              value={data.germanLevel}
              disabled={submitting}
              onSelect={(value) => update("germanLevel", value)}
              error={fieldErrors.germanLevel}
            />
          </div>
          <CvUploadField
            file={data.cvFile}
            error={cvError}
            disabled={submitting}
            onChange={updateCvFile}
            onRemove={() => updateCvFile(null, "")}
          />
          <TextArea
            id="applicant-message"
            label="Nachricht"
            placeholder="Was möchten Sie uns zu Ihrem Profil, Deutschlevel oder Ziel in Deutschland mitteilen?"
            value={data.message}
            disabled={submitting}
            onChange={(value) => update("message", value)}
          />
          <ConsentBox
            checked={data.privacyConsent}
            disabled={submitting}
            error={fieldErrors.privacyConsent}
            onChange={updateConsent}
          />
        </div>
      )}

      {submitError && (
        <p
          className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300"
          role="alert"
        >
          {submitError}
        </p>
      )}

      <div className="mt-7 flex justify-end">
        <button
          type="submit"
          className="btn-primary w-full gap-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          disabled={submitting}
        >
          {submitting
            ? "Wird gesendet..."
            : selectedType === "unternehmen"
              ? "Personal aus Marokko anfragen"
              : "Profil einreichen"}
          <Check size={15} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
