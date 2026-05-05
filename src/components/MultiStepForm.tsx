import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Building2,
  Check,
  GraduationCap,
  Hash,
  Languages,
  Mail,
  MessageSquareText,
  Phone,
  User,
  Globe2,
} from "lucide-react";

type Audience = "unternehmen" | "bewerber";

type FormData = {
  type: Audience;
  name: string;
  email: string;
  phone: string;
  company: string;
  trainingSlots: string;
  industry: string;
  country: string;
  desiredTraining: string;
  germanLevel: string;
  message: string;
};

const createInitialData = (type: Audience): FormData => ({
  type,
  name: "",
  email: "",
  phone: "",
  company: "",
  trainingSlots: "",
  industry: "",
  country: "",
  desiredTraining: "",
  germanLevel: "",
  message: "",
});

function Field({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      <Icon size={16} className="absolute left-3 top-[2.7rem] text-muted-foreground" aria-hidden="true" />
      <input
        id={id}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-sm text-foreground transition placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-white/[0.04]"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative md:col-span-2">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      <MessageSquareText size={16} className="absolute left-3 top-[2.7rem] text-muted-foreground" aria-hidden="true" />
      <textarea
        id={id}
        className="min-h-[140px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-sm text-foreground transition placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-white/[0.04]"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default function MultiStepForm({ selectedType }: { selectedType: Audience }) {
  const [data, setData] = useState<FormData>(() => createInitialData(selectedType));
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
    setData(createInitialData(selectedType));
  }, [selectedType]);

  const update = (field: keyof FormData, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
  };

  const confirmationText =
    selectedType === "bewerber"
      ? "Wir prüfen Ihr Profil und melden uns mit der kostenfreien Ersteinschätzung."
      : "Wir melden uns innerhalb von 48 Stunden mit dem passenden nächsten Schritt.";

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-accent/20 bg-accent/10 p-8 text-center">
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
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      {selectedType === "unternehmen" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Field id="company-name" label="Name" icon={User} placeholder="Ihr Name" value={data.name} onChange={(value) => update("name", value)} />
          <Field id="company-company" label="Unternehmen" icon={Building2} placeholder="Name des Unternehmens" value={data.company} onChange={(value) => update("company", value)} />
          <Field id="company-email" label="E-Mail" icon={Mail} placeholder="name@unternehmen.de" type="email" value={data.email} onChange={(value) => update("email", value)} />
          <Field id="company-phone" label="Telefon" icon={Phone} placeholder="+49 ..." value={data.phone} onChange={(value) => update("phone", value)} />
          <Field id="company-slots" label="Anzahl Ausbildungsplätze" icon={Hash} placeholder="z. B. 3" type="number" value={data.trainingSlots} onChange={(value) => update("trainingSlots", value)} />
          <Field id="company-industry" label="Branche" icon={BriefcaseBusiness} placeholder="z. B. Pflege, Handwerk, Industrie" value={data.industry} onChange={(value) => update("industry", value)} />
          <TextArea id="company-message" label="Nachricht" placeholder="Was sollen wir zu Ihrem Bedarf wissen?" value={data.message} onChange={(value) => update("message", value)} />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Field id="applicant-name" label="Name" icon={User} placeholder="Ihr Name" value={data.name} onChange={(value) => update("name", value)} />
          <Field id="applicant-email" label="E-Mail" icon={Mail} placeholder="name@email.com" type="email" value={data.email} onChange={(value) => update("email", value)} />
          <Field id="applicant-country" label="Herkunftsland" icon={Globe2} placeholder="z. B. Marokko" value={data.country} onChange={(value) => update("country", value)} />
          <Field id="applicant-training" label="Gewünschter Ausbildungsbereich" icon={GraduationCap} placeholder="z. B. Pflege, IT, Handwerk" value={data.desiredTraining} onChange={(value) => update("desiredTraining", value)} />
          <Field id="applicant-german-level" label="Deutschlevel" icon={Languages} placeholder="z. B. A2, B1, B2" value={data.germanLevel} onChange={(value) => update("germanLevel", value)} />
          <TextArea id="applicant-message" label="Nachricht" placeholder="Was möchten Sie uns zu Ihrem Profil mitteilen?" value={data.message} onChange={(value) => update("message", value)} />
        </div>
      )}

      <div className="mt-7 flex justify-end">
        <button type="submit" className="btn-primary w-full gap-2 sm:w-auto">
          {selectedType === "unternehmen" ? "Anfrage für Unternehmen senden" : "Profilprüfung anfragen"}
          <Check size={15} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
