import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Globe2 } from "lucide-react";

// Replace with real Calendly URL
const BOOKING_URL = "/kontakt";

export default function FinalCTA() {
  return (
    <section className="section-padding overflow-hidden">
      <div className="noise-overlay" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="glow-blob w-[800px] h-[800px] top-[-200px] left-[10%]" style={{ background: "var(--blob-primary)" }} />
      <div className="glow-blob w-[600px] h-[600px] bottom-[-200px] right-[5%]" style={{ background: "var(--blob-accent)" }} />

      <div className="mx-auto max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass rounded-3xl p-10 md:p-16"
          style={{ boxShadow: "var(--shadow-elevated), var(--shadow-glow)" }}
        >
          <span className="h-eyebrow mb-6">Let's talk</span>
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Bereit, internationale{" "}
            <span className="gradient-text">Fachkräfte</span>{" "}
            in Ihr Unternehmen zu integrieren?
          </h2>
          <p className="text-muted-foreground mt-6 text-lg md:text-xl max-w-2xl mx-auto">
            Sprechen Sie mit uns und erfahren Sie, wie wir Ihren Bedarf strukturiert und planbar decken.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={BOOKING_URL}
              target={BOOKING_URL.startsWith("http") ? "_blank" : undefined}
              rel={BOOKING_URL.startsWith("http") ? "noopener noreferrer" : undefined}
              className="btn-primary flex items-center gap-2 text-base md:text-lg"
              style={{ padding: "1.1rem 2.4rem", fontSize: "1.05rem" }}
            >
              <Calendar size={18} /> Termin vereinbaren
            </a>
            <a
              href="/kontakt"
              className="btn-secondary flex items-center gap-2 text-base md:text-lg"
              style={{ padding: "1.1rem 2.4rem", fontSize: "1.05rem" }}
            >
              Anfrage senden <ArrowRight size={18} />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-accent" /> Antwort in 48h
            </div>
            <div className="flex items-center gap-1.5">
              <Globe2 size={14} className="text-accent" /> Internationale Rekrutierung
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
