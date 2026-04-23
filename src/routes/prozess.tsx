import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Globe2, ClipboardCheck, Handshake, MessageSquare, FileSignature } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Route = createFileRoute("/prozess")({
  head: () => ({
    meta: [
      { title: "Prozess — Strukturierter Vermittlungsprozess für Ausbildung | Kassoubi" },
      { name: "description", content: "Von der Identifikation bis zur Integration — fünf klar definierte Stufen für die Vermittlung internationaler Auszubildender." },
      { property: "og:title", content: "Unser strukturierter Vermittlungsprozess | Kassoubi" },
      { property: "og:description", content: "Fünf Stufen: Sourcing, Screening, Matching, Interviews, Vertrag & Integration." },
    ],
  }),
  component: ProzessPage,
});

const steps = [
  { icon: Globe2, num: "01", title: "Talent Sourcing", desc: "Identifikation geeigneter Auszubildender im Herkunftsland — über lokale Partner und unser internationales Netzwerk." },
  { icon: ClipboardCheck, num: "02", title: "Qualifikation & Screening", desc: "Mehrstufige Prüfung: Sprache (B1/B2), Motivation und kulturelle Eignung. Nur geprüfte Profile gehen in das Matching." },
  { icon: Handshake, num: "03", title: "Matching", desc: "Passgenaue Zuordnung zu Unternehmen — basierend auf Anforderungsprofil, Standort und Unternehmenskultur." },
  { icon: MessageSquare, num: "04", title: "Interviews", desc: "Begleitete Vorstellungsgespräche, kulturelle Vorbereitung beider Seiten und transparente Rückmeldung." },
  { icon: FileSignature, num: "05", title: "Vertragsabschluss & Integration", desc: "Visum, Anreise und Begleitung bis zum Arbeitsbeginn — strukturierte Integration in Betrieb und Alltag." },
];

function ProzessPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="glow-blob w-[600px] h-[600px] top-[-200px] left-[40%]" style={{ background: "var(--blob-primary)" }} />
        <div className="mx-auto max-w-4xl px-5 text-center relative z-10">
          <span className="h-eyebrow mb-6">Unser System</span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Unser strukturierter <span className="gradient-text">Vermittlungsprozess</span>
          </motion.h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Von der Identifikation bis zur Integration — klar definiert und effizient umgesetzt.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            <div className="absolute left-7 sm:left-[35px] top-4 bottom-4 w-[2px] hidden sm:block"
              style={{ background: "linear-gradient(180deg, color-mix(in oklab, var(--glow) 35%, transparent), color-mix(in oklab, var(--glow-secondary) 25%, transparent), transparent)" }} />
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
                  <div className="icon-tile shrink-0 relative z-10 h-14 w-14 sm:h-[72px] sm:w-[72px]" style={{ background: "var(--gradient-primary)", borderColor: "color-mix(in oklab, var(--glow) 30%, transparent)" }}>
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

          <div className="mt-16">
            <div className="glass rounded-3xl p-10 md:p-12 text-center" style={{ boxShadow: "var(--shadow-elevated)" }}>
              <p className="text-2xl md:text-3xl font-bold tracking-tight">
                Ein klarer Prozess schafft <span className="gradient-text">planbare Ergebnisse</span>.
              </p>
              <div className="mt-8">
                <Link to="/kontakt" className="btn-primary inline-flex items-center gap-2">Prozess starten <ArrowRight size={16} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
