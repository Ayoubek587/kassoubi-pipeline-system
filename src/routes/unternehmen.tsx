import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, CheckCircle2, Search, ShieldCheck, Handshake, Briefcase, Clock, Users, Layers, Target, Languages, HeartHandshake } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthoritySection from "../components/AuthoritySection";

export const Route = createFileRoute("/unternehmen")({
  head: () => ({
    meta: [
      { title: "Für Unternehmen — Internationale Auszubildende | Kassoubi" },
      { name: "description", content: "Wir liefern vorbereitete, motivierte Azubis aus dem Ausland — strukturiert ausgewählt und passgenau vermittelt. Besetzen Sie Ausbildungsplätze planbar." },
      { property: "og:title", content: "Für Unternehmen — Internationale Auszubildende | Kassoubi" },
      { property: "og:description", content: "Geprüfte internationale Auszubildende für Ihr Unternehmen — sprachlich vorbereitet, kulturell gebrieft, langfristig orientiert." },
    ],
  }),
  component: UnternehmenPage,
});

const pipeline = [
  { icon: Search, title: "Sourcing", desc: "Identifikation motivierter Auszubildender direkt im Herkunftsland." },
  { icon: ShieldCheck, title: "Screening", desc: "Mehrstufige Prüfung von Sprache, Motivation und Eignung." },
  { icon: Handshake, title: "Matching", desc: "Passgenaue Zuordnung zu Ihrem Ausbildungsbetrieb und Ihrer Kultur." },
  { icon: Briefcase, title: "Placement", desc: "Visum, Onboarding und strukturierte Integration in Deutschland." },
];

const benefits = [
  { icon: Clock, title: "Zeitersparnis in der Rekrutierung", desc: "Wir übernehmen Auswahl, Vorbereitung und Koordination — Sie konzentrieren sich auf Ihr Kerngeschäft." },
  { icon: Users, title: "Geprüfte Kandidaten statt Zufall", desc: "Vorqualifiziert, sprachlich auf B1/B2 vorbereitet, kulturell gebrieft." },
  { icon: Layers, title: "Planbare Besetzung offener Ausbildungsstellen", desc: "Strukturierte Pipeline mit definierten Zeitfenstern statt Glückstreffer." },
];

const azubiQualities = [
  { icon: Target, title: "Hohe Motivation und klare Zielorientierung", desc: "Ausgewählte Bewerber mit echtem Interesse an einer langfristigen Perspektive in Deutschland." },
  { icon: Languages, title: "Sprachlich vorbereitet (B1/B2)", desc: "Sprachausbildung erfolgt bereits im Herkunftsland — Ihre Azubis sind ab Tag eins arbeitsfähig." },
  { icon: HeartHandshake, title: "Langfristige Bindung", desc: "Auszubildende mit Migrationsperspektive bleiben statistisch deutlich länger im Betrieb." },
  { icon: ShieldCheck, title: "Kulturell vorbereitet vor Ankunft", desc: "Briefing zu Arbeitskultur, Erwartungen und Alltag in Deutschland — vor dem ersten Arbeitstag." },
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
            Internationale <span className="gradient-text">Auszubildende</span> für Ihr Unternehmen
          </motion.h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Wir liefern vorbereitete, motivierte Azubis — strukturiert ausgewählt und passgenau vermittelt.
          </p>
          <div className="mt-10">
            <Link to="/kontakt" className="btn-primary inline-flex items-center gap-2">Jetzt Kontakt aufnehmen <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="section-padding">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="glass rounded-2xl p-8">
            <div className="icon-tile h-12 w-12 mb-5" style={{ color: "var(--warning)", borderColor: "color-mix(in oklab, var(--warning) 25%, transparent)", background: "color-mix(in oklab, var(--warning) 10%, transparent)" }}>
              <AlertTriangle size={22} />
            </div>
            <h3 className="text-2xl font-semibold mb-3 tracking-tight">Das Problem</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Viele Ausbildungsplätze bleiben unbesetzt — trotz hoher Nachfrage und steigendem Personalbedarf.
            </p>
            <ul className="space-y-2 text-sm text-foreground/85">
              <li className="flex gap-2"><span className="text-warning">•</span> Operative Engpässe in Schlüsselbereichen</li>
              <li className="flex gap-2"><span className="text-warning">•</span> Druck auf bestehende Teams und Ausbilder</li>
              <li className="flex gap-2"><span className="text-warning">•</span> Wachstumsverluste und gefährdete Planungssicherheit</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="glass rounded-2xl p-8">
            <div className="icon-tile h-12 w-12 mb-5"><CheckCircle2 size={22} /></div>
            <h3 className="text-2xl font-semibold mb-3 tracking-tight">Unsere Lösung</h3>
            <p className="text-muted-foreground leading-relaxed">
              Kassoubi bietet eine strukturierte Lösung: eine internationale Pipeline qualifizierter Auszubildender, die gezielt auf den deutschen Arbeitsmarkt vorbereitet werden.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why international Azubis */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="h-eyebrow mb-5">Warum internationale Azubis</span>
            <h2 className="h-display mt-5">Vier Gründe für eine <span className="gradient-text">internationale Pipeline</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {azubiQualities.map((q, i) => (
              <motion.div
                key={q.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass glass-hover-lift rounded-2xl p-7"
              >
                <div className="icon-tile h-12 w-12 mb-5"><q.icon size={22} /></div>
                <h3 className="font-semibold text-lg mb-2 tracking-tight">{q.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{q.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
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

      {/* Benefits */}
      <section className="section-padding">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="h-eyebrow mb-5">Ihre Vorteile</span>
            <h2 className="h-display mt-5">Was Sie <span className="gradient-text">davon haben</span></h2>
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              Besetzen Sie Ihre Ausbildungsplätze <span className="gradient-text">planbar und strukturiert</span>
            </h2>
            <p className="text-muted-foreground mt-4">Antwort innerhalb von 48 Stunden.</p>
            <div className="mt-8">
              <Link to="/kontakt" className="btn-primary inline-flex items-center gap-2">Termin buchen <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
