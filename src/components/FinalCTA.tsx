import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="glow-blob w-[600px] h-[600px] top-[-100px] left-[30%]" style={{ background: "oklch(0.65 0.2 250 / 15%)" }} />
      <div className="mx-auto max-w-3xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Bereit, Ihre{" "}
            <span className="gradient-text">Fachkräfte-Pipeline</span>{" "}
            aufzubauen?
          </h2>
          <p className="text-muted-foreground mt-5 text-lg max-w-xl mx-auto">
            Sprechen Sie mit unserem Team und erfahren Sie, wie wir Ihren Fachkräftebedarf planbar decken.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#kontakt" className="btn-primary flex items-center gap-2 text-base">
              <Calendar size={16} /> Termin buchen
            </a>
            <a href="#kontakt" className="btn-secondary flex items-center gap-2 text-base">
              Bewerbung starten <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
