import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const trustItems = [
  "100+ Vermittlungen",
  "B1–B2 geprüfte Kandidaten",
  "48h Reaktionszeit",
  "Deutschlandweite Partner",
];

const pipelineSteps = ["Kandidat", "Training", "Matching", "Unternehmen"];

function PipelineVisualization() {
  return (
    <div className="relative mt-12 max-w-xl mx-auto px-4">
      {/* The connecting line */}
      <div className="absolute top-[11px] left-[12%] right-[12%] h-[1.5px]" style={{ background: "oklch(0.65 0.18 240 / 20%)" }} />

      {/* Traveling pulse */}
      <div className="absolute top-[10px] left-[12%] right-[12%] h-[3px] overflow-hidden">
        <motion.div
          className="absolute h-full w-[30%] rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, oklch(0.7 0.18 240 / 60%), transparent)" }}
          animate={{ left: ["-30%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        />
      </div>

      {/* Nodes */}
      <div className="relative flex items-start justify-between">
        {pipelineSteps.map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
            className="flex flex-col items-center gap-2.5 w-[70px]"
          >
            {/* Node dot */}
            <div className="relative">
              <div
                className="w-[9px] h-[9px] rounded-full"
                style={{ background: "oklch(0.7 0.18 240)", boxShadow: "0 0 8px oklch(0.7 0.18 240 / 40%)" }}
              />
            </div>
            <span className="text-[11px] font-medium" style={{ color: "oklch(0.55 0.04 250)" }}>
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(oklch(1 0 0 / 30%) 1px, transparent 1px),
            linear-gradient(90deg, oklch(1 0 0 / 30%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px]"
        style={{ background: "radial-gradient(ellipse at center, oklch(0.65 0.2 250 / 10%) 0%, transparent 65%)" }}
      />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ background: "linear-gradient(180deg, oklch(0.13 0.04 260) 0%, oklch(0.08 0.03 265) 60%, oklch(0.06 0.02 270) 100%)" }}
    >
      <GridBackground />

      <div className="glow-blob w-[600px] h-[600px] top-[-150px] left-[-150px]" style={{ background: "oklch(0.65 0.2 250 / 12%)" }} />
      <div className="glow-blob w-[500px] h-[500px] bottom-[-100px] right-[-100px]" style={{ background: "oklch(0.65 0.18 240 / 8%)" }} />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-medium"
            style={{ background: "oklch(0.65 0.2 250 / 8%)", border: "1px solid oklch(0.65 0.2 250 / 15%)", color: "oklch(0.75 0.15 250)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Predictable Talent Pipeline System
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08]"
        >
          Wir bauen Ihre{" "}
          <span className="gradient-text">Fachkräfte-Pipeline</span>
          <br className="hidden sm:block" />
          {" "}für Deutschland
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ color: "oklch(0.65 0.03 255)" }}
        >
          Internationale Azubis. Vollständige Betreuung. Planbare Ergebnisse.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#kontakt"
            className="group relative inline-flex items-center gap-2 text-base font-semibold px-7 py-3.5 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.03]"
            style={{ background: "var(--gradient-primary)", color: "var(--color-primary-foreground)", boxShadow: "0 0 30px oklch(0.65 0.2 250 / 25%), 0 0 60px oklch(0.65 0.2 250 / 10%)" }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, oklch(0.7 0.22 250), oklch(0.75 0.17 195))", boxShadow: "0 0 50px oklch(0.65 0.2 250 / 40%)" }} />
            <span className="relative z-10 flex items-center gap-2">Jetzt Fachkräfte sichern <ArrowRight size={16} /></span>
          </a>
          <a
            href="#bewerber"
            className="inline-flex items-center gap-2 text-base font-medium px-7 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.03]"
            style={{ background: "oklch(1 0 0 / 4%)", color: "var(--color-foreground)", border: "1px solid oklch(1 0 0 / 10%)", backdropFilter: "blur(10px)" }}
          >
            Ausbildung starten
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {trustItems.map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "oklch(0.5 0.03 255)" }}>
              <CheckCircle2 size={13} style={{ color: "oklch(0.65 0.15 240)" }} />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>

        {/* Pipeline */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}>
          <PipelineVisualization />
        </motion.div>
      </div>
    </section>
  );
}
