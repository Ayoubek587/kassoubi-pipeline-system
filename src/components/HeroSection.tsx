import { motion } from "framer-motion";
import { ArrowRight, Users, Award, Globe, CheckCircle } from "lucide-react";

const stats = [
  { value: "200+", label: "Vermittelte Fachkräfte" },
  { value: "98%", label: "Erfolgsquote" },
  { value: "B1/B2", label: "Deutschniveau" },
  { value: "12", label: "Partnerländer" },
];

function PipelineAnimation() {
  const steps = [
    { icon: Users, label: "Auswahl" },
    { icon: Globe, label: "Sprache" },
    { icon: Award, label: "Matching" },
    { icon: CheckCircle, label: "Integration" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 mt-12">
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
          className="flex items-center gap-2 md:gap-4"
        >
          <div className="glass rounded-xl p-3 md:p-4 flex flex-col items-center gap-2 min-w-[70px] md:min-w-[90px]">
            <step.icon size={20} className="text-accent" />
            <span className="text-xs text-muted-foreground font-medium">{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1 + i * 0.15, duration: 0.4 }}
              className="hidden sm:block"
            >
              <ArrowRight size={16} className="text-muted-foreground" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ background: "var(--gradient-hero)" }}>
      {/* Glow blobs */}
      <div className="glow-blob w-[500px] h-[500px] top-[-100px] left-[-100px]" style={{ background: "oklch(0.65 0.2 250 / 20%)" }} />
      <div className="glow-blob w-[400px] h-[400px] bottom-[-50px] right-[-50px]" style={{ background: "oklch(0.7 0.15 195 / 15%)" }} />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-medium" style={{ background: "oklch(0.65 0.2 250 / 12%)", border: "1px solid oklch(0.65 0.2 250 / 20%)", color: "oklch(0.75 0.15 250)" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Predictable Talent Pipeline System
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          Wir bauen Ihre{" "}
          <span className="gradient-text">Fachkräfte-Pipeline</span>{" "}
          für Deutschland
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Internationale Azubis. Vollständige Betreuung. Planbare Ergebnisse.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#kontakt" className="btn-primary flex items-center gap-2 text-base">
            Jetzt Fachkräfte sichern <ArrowRight size={16} />
          </a>
          <a href="#bewerber" className="btn-secondary flex items-center gap-2 text-base">
            Ausbildung starten
          </a>
        </motion.div>

        <PipelineAnimation />

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
