import { motion } from "framer-motion";
import { Search, BookOpen, Handshake, Plane } from "lucide-react";

const steps = [
  {
    icon: Search,
    num: "01",
    title: "Auswahl & Qualifizierung",
    desc: "Wir identifizieren die besten Kandidaten aus unserem internationalen Netzwerk und prüfen fachliche Eignung.",
  },
  {
    icon: BookOpen,
    num: "02",
    title: "Sprachtraining",
    desc: "Intensive Deutschkurse bis B1/B2-Niveau mit zertifizierten Lehrkräften und Prüfungsgarantie.",
  },
  {
    icon: Handshake,
    num: "03",
    title: "Matching",
    desc: "Passgenaue Zuordnung von Kandidaten zu Unternehmen basierend auf Qualifikation, Standort und Kultur.",
  },
  {
    icon: Plane,
    num: "04",
    title: "Visa & Integration",
    desc: "Komplette Abwicklung: Visumsantrag, Anreise, Wohnungssuche, Behördengänge und Onboarding.",
  },
];

export default function PipelineSection() {
  return (
    <section id="system" className="section-padding overflow-hidden">
      <div className="noise-overlay" />
      <div className="glow-blob w-[600px] h-[600px] top-[20%] left-[-200px]" style={{ background: "oklch(0.65 0.2 250 / 10%)" }} />
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
            So funktioniert unser <span className="gradient-text">System</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto text-lg">
            Ein durchdachter 4-Stufen-Prozess für planbare Ergebnisse.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-[36px] left-[12.5%] right-[12.5%] h-[2px]" style={{ background: "linear-gradient(90deg, oklch(0.65 0.2 250 / 0%), oklch(0.65 0.2 250 / 35%) 30%, oklch(0.7 0.15 195 / 35%) 70%, oklch(0.7 0.15 195 / 0%))" }} />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass glass-hover-lift rounded-2xl p-6 text-center"
            >
              <div className="icon-tile relative z-10 mx-auto h-[72px] w-[72px] -mt-12 mb-5" style={{ background: "var(--gradient-primary)", borderColor: "oklch(1 0 0 / 18%)" }}>
                <step.icon size={26} className="text-primary-foreground" />
              </div>
              <div className="text-xs font-semibold tracking-widest text-primary mb-2">{step.num}</div>
              <h3 className="font-semibold mb-2 tracking-tight">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
