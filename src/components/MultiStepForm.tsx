import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Briefcase, Building2, Check, Mail, MapPin, Phone, User } from "lucide-react";

type FormData = {
  type: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  location: string;
  message: string;
};

const initialData: FormData = {
  type: "",
  name: "",
  email: "",
  phone: "",
  company: "",
  position: "",
  location: "",
  message: "",
};

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
  icon: typeof User;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Icon size={16} className="absolute left-3 top-3.5 text-muted-foreground" aria-hidden="true" />
      <input
        id={id}
        className="w-full rounded-xl border border-border bg-secondary px-4 py-3 pl-10 text-sm text-foreground transition placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
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
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <textarea
        id={id}
        className="min-h-[120px] w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground transition placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = data.type === "unternehmen" ? 4 : 3;
  const update = (field: keyof FormData, value: string) => setData((current) => ({ ...current, [field]: value }));
  const selectType = (type: "unternehmen" | "bewerber") => {
    setData((current) => ({ ...current, type }));
    setStep(1);
  };
  const next = () => step < totalSteps - 1 && setStep(step + 1);
  const prev = () => step > 0 && setStep(step - 1);

  const steps: Record<string, ReactNode[]> = {
    unternehmen: [
      null,
      <div key="contact" className="space-y-4">
        <Field id="company-name" label="Ihr Name" icon={User} placeholder="Ihr Name" value={data.name} onChange={(value) => update("name", value)} />
        <Field id="company-email" label="E-Mail" icon={Mail} placeholder="E-Mail" type="email" value={data.email} onChange={(value) => update("email", value)} />
        <Field id="company-phone" label="Telefon" icon={Phone} placeholder="Telefon" value={data.phone} onChange={(value) => update("phone", value)} />
      </div>,
      <div key="company" className="space-y-4">
        <Field id="company-company" label="Unternehmen" icon={Building2} placeholder="Unternehmen" value={data.company} onChange={(value) => update("company", value)} />
        <Field id="company-position" label="Gesuchter Ausbildungsberuf" icon={Briefcase} placeholder="Gesuchter Ausbildungsberuf" value={data.position} onChange={(value) => update("position", value)} />
        <Field id="company-location" label="Standort" icon={MapPin} placeholder="Standort" value={data.location} onChange={(value) => update("location", value)} />
      </div>,
      <TextArea
        key="message"
        id="company-message"
        label="Ihre Nachricht"
        placeholder="Ihre Nachricht (optional)"
        value={data.message}
        onChange={(value) => update("message", value)}
      />,
    ],
    bewerber: [
      null,
      <div key="contact" className="space-y-4">
        <Field id="applicant-name" label="Dein Name" icon={User} placeholder="Dein Name" value={data.name} onChange={(value) => update("name", value)} />
        <Field id="applicant-email" label="E-Mail" icon={Mail} placeholder="E-Mail" type="email" value={data.email} onChange={(value) => update("email", value)} />
        <Field id="applicant-phone" label="Telefon / WhatsApp" icon={Phone} placeholder="Telefon / WhatsApp" value={data.phone} onChange={(value) => update("phone", value)} />
      </div>,
      <TextArea
        key="message"
        id="applicant-message"
        label="Ausbildungswunsch, Sprachniveau und Herkunftsland"
        placeholder="Erzähle uns von dir — Ausbildungswunsch, Sprachniveau, Herkunftsland."
        value={data.message}
        onChange={(value) => update("message", value)}
      />,
    ],
  };

  if (submitted) {
    return (
      <section id="kontakt" className="section-padding">
        <div className="mx-auto max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-10 text-center"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15">
              <Check size={28} className="text-accent" aria-hidden="true" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Vielen Dank!</h3>
            <p className="text-sm text-muted-foreground">Wir melden uns innerhalb von 48 Stunden bei Ihnen.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="section-padding relative">
      <div className="glow-blob bottom-0 left-[20%] h-[400px] w-[400px] bg-[var(--blob-primary)]" />
      <div className="relative z-10 mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Jetzt <span className="gradient-text">starten</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">Füllen Sie das Formular aus — wir melden uns innerhalb von 48 Stunden.</p>
        </motion.div>

        <div className="glass rounded-2xl p-6 md:p-8">
          {data.type && (
            <div className="mb-8 flex gap-1.5" aria-hidden="true">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={index <= step ? "h-1 flex-1 rounded-full bg-[var(--gradient-primary)] transition-all duration-300" : "h-1 flex-1 rounded-full bg-[var(--overlay-medium)] transition-all duration-300"}
                />
              ))}
            </div>
          )}

          {step === 0 ? (
            <div>
              <p className="mb-4 text-sm font-medium text-muted-foreground">Ich bin...</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "unternehmen", label: "Unternehmen", icon: Building2 },
                  { key: "bewerber", label: "Bewerber/in", icon: User },
                ].map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => {
                      selectType(option.key as "unternehmen" | "bewerber");
                    }}
                    className="glass rounded-xl p-5 text-center transition-all hover:border-primary/30"
                  >
                    <option.icon size={24} className="mx-auto mb-2 text-primary transition-transform" aria-hidden="true" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>{steps[data.type]?.[step]}</div>
          )}

          {step > 0 && (
            <div className="mt-6 flex justify-between gap-3">
              <button type="button" onClick={prev} className="btn-secondary flex items-center gap-2 !px-4 !py-2 text-sm">
                <ArrowLeft size={14} aria-hidden="true" /> Zurück
              </button>
              {step < totalSteps - 1 ? (
                <button type="button" onClick={next} className="btn-primary flex items-center gap-2 !px-4 !py-2 text-sm">
                  Weiter <ArrowRight size={14} aria-hidden="true" />
                </button>
              ) : (
                <button type="button" onClick={() => setSubmitted(true)} className="btn-primary flex items-center gap-2 !px-4 !py-2 text-sm">
                  Absenden <Check size={14} aria-hidden="true" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
