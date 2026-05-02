import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Building2, User, Mail, Phone, Briefcase, MapPin } from "lucide-react";

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

const initialData: FormData = { type: "", name: "", email: "", phone: "", company: "", position: "", location: "", message: "" };

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = data.type === "unternehmen" ? 4 : 3;

  const update = (field: keyof FormData, value: string) => setData((d) => ({ ...d, [field]: value }));

  const next = () => step < totalSteps - 1 && setStep(step + 1);
  const prev = () => step > 0 && setStep(step - 1);

  const inputClass = "w-full rounded-xl px-4 py-3 text-sm font-body bg-secondary text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 transition placeholder:text-muted-foreground";

  const steps: Record<string, React.ReactNode[]> = {
    unternehmen: [
      // Step 0: Type (handled outside)
      null,
      // Step 1: Contact
      <div key="c" className="space-y-4">
        <div className="relative">
          <User size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
          <input className={inputClass} style={{ paddingLeft: "2.5rem" }} placeholder="Ihr Name" value={data.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
          <input className={inputClass} style={{ paddingLeft: "2.5rem" }} placeholder="E-Mail" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div className="relative">
          <Phone size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
          <input className={inputClass} style={{ paddingLeft: "2.5rem" }} placeholder="Telefon" value={data.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
      </div>,
      // Step 2: Company
      <div key="co" className="space-y-4">
        <div className="relative">
          <Building2 size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
          <input className={inputClass} style={{ paddingLeft: "2.5rem" }} placeholder="Unternehmen" value={data.company} onChange={(e) => update("company", e.target.value)} />
        </div>
        <div className="relative">
          <Briefcase size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
          <input className={inputClass} style={{ paddingLeft: "2.5rem" }} placeholder="Gesuchter Ausbildungsberuf" value={data.position} onChange={(e) => update("position", e.target.value)} />
        </div>
        <div className="relative">
          <MapPin size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
          <input className={inputClass} style={{ paddingLeft: "2.5rem" }} placeholder="Standort" value={data.location} onChange={(e) => update("location", e.target.value)} />
        </div>
      </div>,
      // Step 3: Message
      <div key="m">
        <textarea className={inputClass + " min-h-[120px]"} placeholder="Ihre Nachricht (optional)" value={data.message} onChange={(e) => update("message", e.target.value)} />
      </div>,
    ],
    bewerber: [
      null,
      <div key="c" className="space-y-4">
        <div className="relative">
          <User size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
          <input className={inputClass} style={{ paddingLeft: "2.5rem" }} placeholder="Dein Name" value={data.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
          <input className={inputClass} style={{ paddingLeft: "2.5rem" }} placeholder="E-Mail" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div className="relative">
          <Phone size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
          <input className={inputClass} style={{ paddingLeft: "2.5rem" }} placeholder="Telefon / WhatsApp" value={data.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
      </div>,
      <div key="m">
        <textarea className={inputClass + " min-h-[120px]"} placeholder="Erzähle uns von dir — Ausbildungswunsch, Sprachniveau, Herkunftsland." value={data.message} onChange={(e) => update("message", e.target.value)} />
      </div>,
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
            <div className="h-16 w-16 rounded-full mx-auto flex items-center justify-center mb-5" style={{ background: "color-mix(in oklab, var(--accent) 14%, transparent)" }}>
              <Check size={28} className="text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">Vielen Dank!</h3>
            <p className="text-muted-foreground text-sm">Wir melden uns innerhalb von 48 Stunden bei Ihnen.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="section-padding relative">
      <div className="glow-blob w-[400px] h-[400px] bottom-0 left-[20%]" style={{ background: "var(--blob-primary)" }} />
      <div className="mx-auto max-w-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Jetzt <span className="gradient-text">starten</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm">Füllen Sie das Formular aus — wir melden uns innerhalb von 48 Stunden.</p>
        </motion.div>

        <div className="glass rounded-2xl p-6 md:p-8">
          {/* Progress */}
          {data.type && (
            <div className="flex gap-1.5 mb-8">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full flex-1 transition-all duration-300"
                  style={{ background: i <= step ? "var(--gradient-primary)" : "var(--overlay-medium)" }}
                />
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div key="type" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <p className="text-sm font-medium mb-4 text-muted-foreground">Ich bin...</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "unternehmen", label: "Unternehmen", icon: Building2 },
                    { key: "bewerber", label: "Bewerber/in", icon: User },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => { update("type", opt.key); setStep(1); }}
                      className="glass rounded-xl p-5 text-center hover:border-primary/30 transition-all group cursor-pointer"
                    >
                      <opt.icon size={24} className="mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {steps[data.type]?.[step]}
              </motion.div>
            )}
          </AnimatePresence>

          {step > 0 && (
            <div className="flex justify-between mt-6">
              <button onClick={prev} className="btn-secondary flex items-center gap-2 !py-2 !px-4 text-sm">
                <ArrowLeft size={14} /> Zurück
              </button>
              {step < totalSteps - 1 ? (
                <button onClick={next} className="btn-primary flex items-center gap-2 !py-2 !px-4 text-sm">
                  Weiter <ArrowRight size={14} />
                </button>
              ) : (
                <button onClick={() => setSubmitted(true)} className="btn-primary flex items-center gap-2 !py-2 !px-4 text-sm">
                  Absenden <Check size={14} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
