import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Globe2, ClipboardCheck, Handshake, MessageSquare, FileSignature } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Route = createFileRoute("/prozess")({
  head: () => ({
    meta: [
      { title: "Prozess — Unser strukturierter Vermittlungsprozess | Kassoubi" },
      { name: "description", content: "Vom Talent Sourcing über Screening und Matching bis zum Vertragsabschluss — ein strukturierter Vermittlungsprozess in fünf Stufen." },
      { property: "og:title", content: "Prozess — Strukturierter Vermittlungsprozess | Kassoubi" },
      { property: "og:description", content: "Vom Talent Sourcing bis zum Vertragsabschluss — strukturiert in fünf Stufen." },
    ],
  }),
  component: ProzessPage,
});

const steps = [
  { icon: Globe2, num: "01", title: "Talent Sourcing", desc: "Identifizierung qualifizierter Kandidaten direkt im Herkunftsland — über lokale Partner und unser internationales Netzwerk." },
  { icon: ClipboardCheck, num: "02", title: "Qualifikation & Screening", desc: "Mehrstufige Prüfung: Qualifikation, Sprache (B1/B2), Motivation, kulturelle Passung. Nur geprüfte Profile gehen weiter." },
  { icon: Handshake, num: "03", title: "Matching mit Unternehmen", desc: "Passgenaue Zuordnung zu Anforderungen, Standort und Unternehmenskultur — basierend auf einem strukturierten Matching-Modell." },
  { icon: MessageSquare, num: "04", title: "Interviews", desc: "Begleitete Vorstellungsgespräche, kulturelle Vorbereitung beider Seiten und transparente Rückmeldung." },
  { icon: FileSignature, num: "05", title: "Vertragsabschluss", desc: "Vertragsverhandlung, Visumsabwicklung, Anreise, Wohnung, Behördengänge — strukturierte Begleitung bis zum Arbeitsantritt." },
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
            Fünf klar definierte Stufen — vom Herkunftsland bis zum Vertragsabschluss in Deutschland.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            <div className="absolute left-[35px] top-4 bottom-4 w-[2px] hidden md:block"
              style={{ background: "linear-gradient(180deg, color-mix(in oklab, var(--glow) 35%, transparent), color-mix(in oklab, var(--glow-secondary) 25%, transparent), transparent)" }} />
            <div className="space-y-6">
              {steps.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative flex gap-6 items-start"
                >
                  <div className="icon-tile shrink-0 relative z-10 h-[72px] w-[72px]" style={{ background: "var(--gradient-primary)", borderColor: "color-mix(in oklab, var(--glow) 30%, transparent)" }}>
                    <s.icon size={28} className="text-primary-foreground" />
                  </div>
                  <div className="glass rounded-2xl p-6 flex-1">
                    <div className="text-xs font-semibold tracking-widest text-primary mb-2">STUFE {s.num}</div>
                    <h3 className="text-xl font-semibold mb-2 tracking-tight">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link to="/kontakt" className="btn-primary inline-flex items-center gap-2">Prozess starten <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
