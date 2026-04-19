import { motion } from "framer-motion";
import { Search, BookOpen, Handshake, Plane } from "lucide-react";

const steps = [
  {
    icon: Search,
    num: "01",
    title: "Auswahl im Herkunftsland",
    desc: "Identifizierung und Vorqualifizierung geeigneter Talente direkt vor Ort — fachlich, sprachlich und in der Motivation geprüft.",
  },
  {
    icon: BookOpen,
    num: "02",
    title: "Vorbereitung & Qualifizierung",
    desc: "Systematische Sprachausbildung bis B1/B2 sowie kulturelle und fachliche Vorbereitung auf den deutschen Arbeitsmarkt.",
  },
  {
    icon: Handshake,
    num: "03",
    title: "Matching mit Unternehmen",
    desc: "Passgenaue Zuordnung von internationalen Kandidaten zu deutschen Unternehmen — basierend auf Profil, Standort und Kultur.",
  },
  {
    icon: Plane,
    num: "04",
    title: "Integration in Deutschland",
    desc: "Visumsabwicklung, Anreise, Wohnung, Behördengänge und Onboarding — strukturierte Begleitung bis zur erfolgreichen Eingliederung.",
  },
];

export default function PipelineSection() {
  return (
    <section id="system" className="section-padding overflow-hidden">
      <div className="noise-overlay" />
      <div className="glow-blob w-[600px] h-[600px] top-[20%] left-[-200px]" style={{ background: "var(--blob-primary)" }} />
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="h-eyebrow mb-5">Der Prozess</span>
          <h2 className="h-display mt-5">
            Unser strukturierter Prozess für <span className="gradient-text">internationale Fachkräfte</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-lg">
            Vom Herkunftsland bis nach Deutschland — ein durchdachter 4-Stufen-Prozess für planbare Ergebnisse.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          <div
            className="hidden md:block absolute top-[36px] left-[12.5%] right-[12.5%] h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in oklab, var(--glow) 0%, transparent), color-mix(in oklab, var(--glow) 35%, transparent) 30%, color-mix(in oklab, var(--glow-secondary) 35%, transparent) 70%, color-mix(in oklab, var(--glow-secondary) 0%, transparent))",
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass glass-hover-lift rounded-2xl p-6 text-center"
            >
              <div
                className="icon-tile relative z-10 mx-auto h-[72px] w-[72px] -mt-12 mb-5"
                style={{ background: "var(--gradient-primary)", borderColor: "color-mix(in oklab, var(--glow) 30%, transparent)" }}
              >
                <step.icon size={26} className="text-primary-foreground" />
              </div>
              <div className="text-xs font-semibold tracking-widest text-primary mb-2">{step.num}</div>
              <h3 className="font-semibold mb-2 tracking-tight leading-snug">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
