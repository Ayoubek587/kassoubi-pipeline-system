import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Sparkles, HeartHandshake, FileCheck, Search, Handshake, FileSignature } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Route = createFileRoute("/bewerber")({
  head: () => ({
    meta: [
      { title: "Für Bewerber — Dein Weg nach Deutschland | Kassoubi" },
      { name: "description", content: "Ausbildung und Jobs in Deutschland. Kostenlose Begleitung von der Bewerbung bis zum Vertragsabschluss." },
      { property: "og:title", content: "Für Bewerber — Dein Weg nach Deutschland | Kassoubi" },
      { property: "og:description", content: "Kostenlose Begleitung für internationale Bewerber — Ausbildung und Jobs in Deutschland." },
    ],
  }),
  component: BewerberPage,
});

const benefits = [
  { icon: Sparkles, title: "Kostenlos für Bewerber", desc: "Unser Service ist für Bewerber komplett kostenfrei — keine versteckten Gebühren." },
  { icon: GraduationCap, title: "Ausbildung & Jobs", desc: "Wir vermitteln Ausbildungs- und Arbeitsplätze in geprüften deutschen Unternehmen." },
  { icon: HeartHandshake, title: "Volle Begleitung", desc: "Von der Bewerbung über das Visum bis zur Integration — ein fester Ansprechpartner." },
];

const steps = [
  { icon: FileCheck, num: "01", title: "Bewerbung", desc: "Sende uns deine Unterlagen — wir prüfen Profil und Qualifikation." },
  { icon: Search, num: "02", title: "Vorauswahl", desc: "Sprachliches Coaching, fachliche und kulturelle Vorbereitung im Heimatland." },
  { icon: Handshake, num: "03", title: "Matching mit Unternehmen", desc: "Passgenaue Zuordnung zu einem deutschen Partnerunternehmen." },
  { icon: FileSignature, num: "04", title: "Vertragsabschluss", desc: "Visum, Anreise, Wohnung — strukturierte Begleitung bis zum Arbeitsantritt." },
];

function BewerberPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="glow-blob w-[600px] h-[600px] top-[-200px] right-[-150px]" style={{ background: "var(--blob-primary)" }} />
        <div className="mx-auto max-w-4xl px-5 text-center relative z-10">
          <span className="h-eyebrow mb-6">Für Bewerber</span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Dein Weg nach <span className="gradient-text">Deutschland</span> beginnt hier
          </motion.h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Kostenlose Begleitung für internationale Bewerber — Ausbildung, Sprache, Visum, Integration. Alles aus einer Hand.
          </p>
          <div className="mt-10">
            <Link to="/kontakt" className="btn-primary inline-flex items-center gap-2">
              Jetzt bewerben <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="h-display">Was wir <span className="gradient-text">für dich tun</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass glass-hover-lift rounded-2xl p-7"
              >
                <div className="icon-tile h-12 w-12 mb-5"><b.icon size={22} /></div>
                <h3 className="font-semibold text-lg mb-2 tracking-tight">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="h-eyebrow mb-5">Dein Prozess</span>
            <h2 className="h-display mt-5">In <span className="gradient-text">vier Schritten</span> nach Deutschland</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-[36px] left-[12.5%] right-[12.5%] h-[2px]"
              style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--glow) 35%, transparent), color-mix(in oklab, var(--glow-secondary) 35%, transparent), transparent)" }} />
            {steps.map((s, i) => (
              <motion.div key={s.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }} className="glass glass-hover-lift rounded-2xl p-6 text-center">
                <div className="icon-tile relative z-10 mx-auto h-[72px] w-[72px] -mt-12 mb-5" style={{ background: "var(--gradient-primary)", borderColor: "color-mix(in oklab, var(--glow) 30%, transparent)" }}>
                  <s.icon size={26} className="text-primary-foreground" />
                </div>
                <div className="text-xs font-semibold tracking-widest text-primary mb-2">{s.num}</div>
                <h3 className="font-semibold mb-2 tracking-tight">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link to="/kontakt" className="btn-primary inline-flex items-center gap-2">Jetzt bewerben <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
