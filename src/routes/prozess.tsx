import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Globe2, ClipboardCheck, Handshake, MessageSquare, FileSignature } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Route = createFileRoute("/prozess")({
  head: () => ({
    meta: [
      { title: "Das System — Strukturierter Recruiting-Prozess für Ausbildung | Kassoubi" },
      { name: "description", content: "Fünf definierte Stufen. Klare Standards. Messbare Ergebnisse. Unser Recruiting-System für internationale Auszubildende." },
      { property: "og:title", content: "Das System — Strukturierter Recruiting-Prozess | Kassoubi" },
      { property: "og:description", content: "Sourcing, Screening, Matching, Interviews, Integration. Definiert. Wiederholbar. Belastbar." },
    ],
  }),
  component: ProzessPage,
});

const steps = [
  { icon: Globe2, num: "01", title: "Sourcing", desc: "Identifikation motivierter Auszubildender direkt im Herkunftsland — über lokale Partner und unser internationales Netzwerk. Skalierbar, nicht zufällig." },
  { icon: ClipboardCheck, num: "02", title: "Screening", desc: "Mehrstufige Prüfung: Sprache (B1/B2), Motivation, fachliche Eignung. Nur geprüfte Profile gehen weiter." },
  { icon: Handshake, num: "03", title: "Matching", desc: "Passgenaue Zuordnung — basierend auf Anforderungsprofil, Branche, Standort und Unternehmenskultur." },
  { icon: MessageSquare, num: "04", title: "Interviews", desc: "Begleitete Gespräche, kulturelle Vorbereitung beider Seiten, transparente Rückmeldung in 48 Stunden." },
  { icon: FileSignature, num: "05", title: "Integration", desc: "Visum, Anreise, Wohnung, Onboarding. Strukturierte Begleitung bis zum ersten Ausbildungstag." },
];

function ProzessPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <div className="glow-blob w-[600px] h-[600px] top-[-200px] left-[40%]" style={{ background: "var(--blob-primary)" }} />
        <div className="mx-auto max-w-4xl px-5 text-center relative z-10">
          <span className="h-eyebrow mb-6">Das System</span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
          >
            Ein Prozess. Fünf Stufen. <span className="gradient-text">Verlässliche Ergebnisse.</span>
          </motion.h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Klassische Vermittlung ist Zufall. Unser System ist Infrastruktur — definiert, dokumentiert, wiederholbar.
          </p>
        </div>
      </section>

      <section className="section-padding pt-4">
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            <div
              className="absolute left-7 sm:left-[35px] top-4 bottom-4 w-[2px] hidden sm:block"
              style={{ background: "linear-gradient(180deg, color-mix(in oklab, var(--glow) 35%, transparent), color-mix(in oklab, var(--glow-secondary) 25%, transparent), transparent)" }}
            />
            <div className="space-y-6">
              {steps.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative flex gap-4 sm:gap-6 items-start"
                >
                  <div
                    className="icon-tile shrink-0 relative z-10 h-14 w-14 sm:h-[72px] sm:w-[72px]"
                    style={{ background: "var(--gradient-primary)", borderColor: "color-mix(in oklab, var(--glow) 30%, transparent)" }}
                  >
                    <s.icon size={24} className="text-primary-foreground" />
                  </div>
                  <div className="glass rounded-2xl p-5 sm:p-6 flex-1 min-w-0">
                    <div className="text-xs font-semibold tracking-widest text-primary mb-2">STUFE {s.num}</div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 tracking-tight">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12 sm:mt-16">
            <div
              className="glass rounded-3xl p-6 sm:p-10 md:p-12 text-center"
              style={{ boxShadow: "var(--shadow-elevated)" }}
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                Ein klar definierter Prozess <span className="gradient-text">schafft planbare Ergebnisse</span>.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/kontakt" className="btn-primary inline-flex items-center gap-2">Pipeline aufbauen <ArrowRight size={16} /></Link>
                <Link to="/unternehmen" className="btn-secondary inline-flex items-center gap-2">Für Unternehmen</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
