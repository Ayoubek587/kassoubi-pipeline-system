import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Calendar } from "lucide-react";

const trustItems = [
  "100+ Vermittlungen",
  "B1–B2 geprüfte Kandidaten",
  "48h Reaktionszeit",
  "Internationale Rekrutierung",
];

const pipelineSteps = ["Herkunftsland", "Vorbereitung", "Matching", "Deutschland"];

// Replace with real Calendly URL when ready
const BOOKING_URL = "#";

function PipelineVisualization() {
  return (
    <div className="relative mt-12 max-w-xl mx-auto px-4">
      <div
        className="absolute top-[11px] left-[12%] right-[12%] h-[1.5px]"
        style={{ background: "color-mix(in oklab, var(--glow) 25%, transparent)" }}
      />
      <div className="absolute top-[10px] left-[12%] right-[12%] h-[3px] overflow-hidden">
        <motion.div
          className="absolute h-full w-[30%] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--glow) 70%, transparent), transparent)",
          }}
          animate={{ left: ["-30%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        />
      </div>
      <div className="relative flex items-start justify-between">
        {pipelineSteps.map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
            className="flex flex-col items-center gap-2.5 w-[80px]"
          >
            <div className="relative">
              <div
                className="w-[9px] h-[9px] rounded-full"
                style={{
                  background: "var(--glow)",
                  boxShadow: "0 0 8px color-mix(in oklab, var(--glow) 50%, transparent)",
                }}
              />
            </div>
            <span className="text-[11px] font-medium text-muted-foreground text-center">{label}</span>
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
        className="absolute inset-0"
        style={{
          opacity: 0.05,
          backgroundImage: `linear-gradient(var(--color-foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px]"
        style={{ background: "var(--gradient-glow)" }}
      />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="section-dark relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <GridBackground />

      <div className="glow-blob w-[600px] h-[600px] top-[-150px] left-[-150px]" style={{ background: "var(--blob-primary)" }} />
      <div className="glow-blob w-[500px] h-[500px] bottom-[-100px] right-[-100px]" style={{ background: "var(--blob-accent)" }} />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-medium"
            style={{
              background: "color-mix(in oklab, var(--glow) 10%, transparent)",
              border: "1px solid color-mix(in oklab, var(--glow) 22%, transparent)",
              color: "var(--glow)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Internationale Fachkräfte-Pipeline für Deutschland
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          Wir bauen Ihre{" "}
          <span className="gradient-text">internationale Fachkräfte-Pipeline</span>
          <br className="hidden sm:block" />
          {" "}für Deutschland
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-muted-foreground"
        >
          Wir gewinnen qualifizierte Talente aus dem Ausland, bereiten sie gezielt vor und integrieren sie erfolgreich in deutsche Unternehmen.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-4 text-base md:text-lg max-w-2xl mx-auto text-muted-foreground/80"
        >
          Von der Auswahl im Herkunftsland bis zur erfolgreichen Integration — alles aus einer Hand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={BOOKING_URL}
            target={BOOKING_URL.startsWith("http") ? "_blank" : undefined}
            rel={BOOKING_URL.startsWith("http") ? "noopener noreferrer" : undefined}
            className="btn-primary group flex items-center gap-2 text-base"
          >
            <Calendar size={16} /> Fachkräfte anfragen <ArrowRight size={16} />
          </a>
          <a href="#bewerber" className="btn-secondary">
            Ausbildung starten
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {trustItems.map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CheckCircle2 size={13} className="text-accent" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}>
          <PipelineVisualization />
        </motion.div>
      </div>
    </section>
  );
}
