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
    <section id="system" className="section-padding relative overflow-hidden">
      <div className="glow-blob w-[600px] h-[600px] top-[20%] left-[-200px]" style={{ background: "oklch(0.65 0.2 250 / 10%)" }} />
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            So funktioniert unser <span className="gradient-text">System</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Ein durchdachter 4-Stufen-Prozess für planbare Ergebnisse.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[12.5%] right-[12.5%] h-[2px]" style={{ background: "linear-gradient(90deg, oklch(0.65 0.2 250 / 30%), oklch(0.7 0.15 195 / 30%))" }} />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative text-center"
            >
              <div className="relative z-10 mx-auto h-14 w-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
                <step.icon size={22} className="text-primary-foreground" />
              </div>
              <div className="text-xs font-semibold text-primary mb-2">{step.num}</div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
