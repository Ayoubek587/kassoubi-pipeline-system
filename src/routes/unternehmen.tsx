import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, CheckCircle2, Search, ShieldCheck, Handshake, Briefcase, Clock, Users, Layers } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthoritySection from "../components/AuthoritySection";

export const Route = createFileRoute("/unternehmen")({
  head: () => ({
    meta: [
      { title: "Für Unternehmen — Internationale Fachkräfte | Kassoubi" },
      { name: "description", content: "Geprüfte internationale Talente für Ihr Unternehmen. Sourcing, Screening, Matching, Placement — strukturiert aus einer Hand." },
      { property: "og:title", content: "Für Unternehmen — Internationale Fachkräfte | Kassoubi" },
      { property: "og:description", content: "Geprüfte internationale Talente. Sourcing, Screening, Matching, Placement aus einer Hand." },
    ],
  }),
  component: UnternehmenPage,
});

const pipeline = [
  { icon: Search, title: "Sourcing", desc: "Identifizierung qualifizierter Talente direkt im Herkunftsland." },
  { icon: ShieldCheck, title: "Screening", desc: "Mehrstufige Prüfung von Qualifikation, Sprache und Motivation." },
  { icon: Handshake, title: "Matching", desc: "Passgenaue Zuordnung zu Anforderungen und Unternehmenskultur." },
  { icon: Briefcase, title: "Placement", desc: "Visum, Onboarding und strukturierte Integration in Deutschland." },
];

const benefits = [
  { icon: Clock, title: "Zeit sparen", desc: "Wir übernehmen Auswahl, Vorbereitung und Koordination." },
  { icon: Users, title: "Qualifizierte Kandidaten", desc: "Vorgeprüft, sprachlich auf B1/B2 vorbereitet, kulturell gebrieft." },
  { icon: Layers, title: "Strukturierter Prozess", desc: "Definierte Schritte mit klaren Zeitfenstern statt Glückstreffer." },
];

function UnternehmenPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="glow-blob w-[600px] h-[600px] top-[-200px] left-[-150px]" style={{ background: "var(--blob-accent)" }} />
        <div className="mx-auto max-w-4xl px-5 text-center relative z-10">
          <span className="h-eyebrow mb-6">Für Unternehmen</span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Internationale <span className="gradient-text">Fachkräfte</span> für Ihr Unternehmen
          </motion.h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Wir liefern geprüfte Talente aus dem Ausland — strukturiert, vorbereitet und passgenau für Ihren Bedarf.
          </p>
          <div className="mt-10">
            <Link to="/kontakt" className="btn-primary inline-flex items-center gap-2">Jetzt Kontakt aufnehmen <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="glass rounded-2xl p-8">
            <div className="icon-tile h-12 w-12 mb-5" style={{ color: "var(--warning)", borderColor: "color-mix(in oklab, var(--warning) 25%, transparent)", background: "color-mix(in oklab, var(--warning) 10%, transparent)" }}>
              <AlertTriangle size={22} />
            </div>
            <h3 className="text-2xl font-semibold mb-3 tracking-tight">Problem</h3>
            <p className="text-muted-foreground leading-relaxed">
              Fachkräftemangel in Deutschland. Offene Stellen bleiben monatelang unbesetzt — Ausbildungsplätze finden keine Bewerber. Klassische Kanäle reichen nicht mehr aus.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="glass rounded-2xl p-8">
            <div className="icon-tile h-12 w-12 mb-5"><CheckCircle2 size={22} /></div>
            <h3 className="text-2xl font-semibold mb-3 tracking-tight">Lösung</h3>
            <p className="text-muted-foreground leading-relaxed">
              Wir liefern geprüfte internationale Talente — sprachlich auf B1/B2 vorbereitet, fachlich qualifiziert und kulturell gebrieft. Strukturierte Pipeline statt Zufall.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="h-eyebrow mb-5">Pipeline</span>
            <h2 className="h-display mt-5">Vier Stufen, ein <span className="gradient-text">klarer Prozess</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {pipeline.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="glass glass-hover-lift rounded-2xl p-6">
                <div className="icon-tile h-12 w-12 mb-4"><p.icon size={22} /></div>
                <div className="text-xs font-semibold text-primary tracking-widest mb-2">0{i + 1}</div>
                <h3 className="font-semibold mb-2 tracking-tight">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="h-display">Ihre <span className="gradient-text">Vorteile</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="glass glass-hover-lift rounded-2xl p-7">
                <div className="icon-tile h-12 w-12 mb-5"><b.icon size={22} /></div>
                <h3 className="font-semibold text-lg mb-2 tracking-tight">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AuthoritySection />

      <section className="section-padding">
        <div className="mx-auto max-w-3xl text-center">
          <div className="glass rounded-3xl p-10 md:p-14" style={{ boxShadow: "var(--shadow-elevated)" }}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Bereit für den nächsten Schritt?</h2>
            <p className="text-muted-foreground mt-4">Antwort innerhalb von 48 Stunden.</p>
            <div className="mt-8">
              <Link to="/kontakt" className="btn-primary inline-flex items-center gap-2">Jetzt Kontakt aufnehmen <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
