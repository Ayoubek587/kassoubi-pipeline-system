import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe2,
  ClipboardCheck,
  Handshake,
  MessageSquare,
  FileSignature,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Route = createFileRoute("/prozess")({
  head: () => ({
    meta: [
      {
        title: "Das System — Vermittlungsprozess für Kandidaten aus Marokko | Kassoubi",
      },
      {
        name: "description",
        content:
          "Fünf definierte Stufen für die Vermittlung von Auszubildenden und Fachkräften aus Marokko an Unternehmen in Deutschland.",
      },
      {
        property: "og:title",
        content: "Strukturierter Prozess — Auszubildende & Fachkräfte aus Marokko",
      },
      {
        property: "og:description",
        content:
          "Sourcing in Marokko, Screening, Matching, Interviews und Prozessbegleitung bis zum Start in Deutschland.",
      },
    ],
  }),
  component: ProzessPage,
});

const steps = [
  {
    icon: Globe2,
    num: "01",
    title: "Sourcing in Marokko",
    desc: "Identifikation motivierter Auszubildender und Fachkräfte direkt in Marokko — über lokale Kontakte, klare Anforderungen und strukturierte Ansprache.",
  },
  {
    icon: ClipboardCheck,
    num: "02",
    title: "Screening",
    desc: "Mehrstufige Prüfung: Sprache, Motivation, fachliche Eignung, Dokumentenstand und grundsätzliche Passung zum Bedarf.",
  },
  {
    icon: Handshake,
    num: "03",
    title: "Matching",
    desc: "Passgenaue Zuordnung zu deutschen Unternehmen — basierend auf Anforderungsprofil, Branche, Standort und Unternehmenskultur.",
  },
  {
    icon: MessageSquare,
    num: "04",
    title: "Interviews",
    desc: "Begleitete Kommunikation, Gesprächsvorbereitung und transparente Rückmeldung zwischen Unternehmen und Kandidaten.",
  },
  {
    icon: FileSignature,
    num: "05",
    title: "Prozessbegleitung",
    desc: "Unterlagen, Anreise und Onboarding werden strukturiert begleitet. Rechtliche und behördliche Schritte hängen vom Einzelfall ab.",
  },
];

function ProzessPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <div
          className="glow-blob w-[600px] h-[600px] top-[-200px] left-[40%]"
          style={{ background: "var(--blob-primary)" }}
        />
        <div className="mx-auto max-w-4xl px-5 text-center relative z-10">
          <span className="h-eyebrow mb-6">Das System</span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
          >
            Von Marokko nach Deutschland.{" "}
            <span className="gradient-text">Ein klarer Vermittlungsprozess.</span>
          </motion.h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Die Vermittlung von Auszubildenden und Fachkräften aus Marokko braucht Standards:
            definiert, dokumentiert und nachvollziehbar.
          </p>
        </div>
      </section>

      <section className="section-padding pt-4">
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            <div
              className="absolute left-7 sm:left-[35px] top-4 bottom-4 w-[2px] hidden sm:block"
              style={{
                background:
                  "linear-gradient(180deg, color-mix(in oklab, var(--glow) 35%, transparent), color-mix(in oklab, var(--glow-secondary) 25%, transparent), transparent)",
              }}
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
                    style={{
                      background: "var(--gradient-primary)",
                      borderColor: "color-mix(in oklab, var(--glow) 30%, transparent)",
                    }}
                  >
                    <s.icon size={24} className="text-primary-foreground" />
                  </div>
                  <div className="glass rounded-2xl p-5 sm:p-6 flex-1 min-w-0">
                    <div className="text-xs font-semibold tracking-widest text-primary mb-2">
                      STUFE {s.num}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 tracking-tight">
                      {s.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {s.desc}
                    </p>
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
                Ein klar definierter Prozess{" "}
                <span className="gradient-text">reduziert Rekrutierungsaufwand</span>.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/kontakt" className="btn-primary inline-flex items-center gap-2">
                  Personal aus Marokko anfragen <ArrowRight size={16} />
                </Link>
                <Link to="/unternehmen" className="btn-secondary inline-flex items-center gap-2">
                  Für Unternehmen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
