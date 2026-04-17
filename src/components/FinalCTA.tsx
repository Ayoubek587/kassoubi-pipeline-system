import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Zap } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="section-padding overflow-hidden">
      <div className="noise-overlay" />
      {/* Strong glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.65 0.2 250 / 22%) 0%, transparent 60%)",
        }}
      />
      <div className="glow-blob w-[800px] h-[800px] top-[-200px] left-[10%]" style={{ background: "oklch(0.65 0.2 250 / 18%)" }} />
      <div className="glow-blob w-[600px] h-[600px] bottom-[-200px] right-[5%]" style={{ background: "oklch(0.7 0.15 195 / 14%)" }} />

      <div className="mx-auto max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass rounded-3xl p-10 md:p-16"
          style={{ boxShadow: "0 20px 80px oklch(0.65 0.2 250 / 25%), inset 0 1px 0 0 oklch(1 0 0 / 10%)" }}
        >
          <span className="h-eyebrow mb-6">Let's talk</span>
          <h2 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Bereit, Ihre{" "}
            <span className="gradient-text">Fachkräfte-Pipeline</span>{" "}
            aufzubauen?
          </h2>
          <p className="text-muted-foreground mt-6 text-lg md:text-xl max-w-2xl mx-auto">
            Sprechen Sie mit unserem Team und erfahren Sie, wie wir Ihren Fachkräftebedarf planbar decken.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#kontakt"
              className="btn-primary flex items-center gap-2 text-base md:text-lg"
              style={{ padding: "1.1rem 2.4rem", fontSize: "1.05rem" }}
            >
              <Calendar size={18} /> Termin buchen
            </a>
            <a
              href="#kontakt"
              className="btn-secondary flex items-center gap-2 text-base md:text-lg"
              style={{ padding: "1.1rem 2.4rem", fontSize: "1.05rem" }}
            >
              Pipeline starten <ArrowRight size={18} />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-accent" /> Antwort in 48h
            </div>
            <div className="flex items-center gap-1.5">
              <Zap size={14} className="text-accent" /> Nur begrenzte Plätze pro Monat
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
