import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  Globe2,
  ShieldCheck,
  Layers,
  Target,
  AlertTriangle,
  TrendingDown,
  Users,
  Plane,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VideoSection from "../components/VideoSection";
import heroBg from "../assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kassoubi — Strukturiertes Recruiting-System für Ausbildung in Deutschland" },
      { name: "description", content: "Kein Vermittler. Ein System. Wir bauen für deutsche Unternehmen eine planbare, internationale Pipeline qualifizierter Auszubildender — strukturiert, geprüft, integriert." },
      { property: "og:title", content: "Kassoubi — Recruiting-System für internationale Auszubildende" },
      { property: "og:description", content: "Planbare Ausbildungsbesetzung statt Zufall. Internationale Pipeline. Strukturierter Prozess. Messbare Ergebnisse." },
    ],
  }),
  component: Index,
});

const stats = [
  { v: "+500", l: "Bewerber im Netzwerk" },
  { v: "+50", l: "Partnerunternehmen" },
  { v: "48h", l: "Reaktionszeit" },
  { v: "98%", l: "Vermittlungsquote" },
];

const pillars = [
  { icon: Globe2, title: "Internationales Sourcing", desc: "Direktzugang zu motivierten Auszubildenden im Herkunftsland — nicht limitiert auf den lokalen Markt." },
  { icon: ShieldCheck, title: "Mehrstufiges Screening", desc: "Sprache, Motivation, Eignung — strukturiert geprüft, bevor Sie investieren." },
  { icon: Target, title: "Passgenaues Matching", desc: "Zuordnung nach Profil, Branche und Kultur — keine Zufallstreffer." },
  { icon: Plane, title: "End-to-End Integration", desc: "Visum, Anreise, Onboarding. Ein durchgehender Prozess bis zum ersten Ausbildungstag." },
];

const painPoints = [
  { icon: AlertTriangle, text: "Tausende Ausbildungsplätze bleiben jedes Jahr unbesetzt." },
  { icon: TrendingDown, text: "Der lokale Bewerbermarkt liefert weder die Quantität noch die Qualität." },
  { icon: Users, text: "Operative Engpässe, verlorenes Wachstum, gefährdete Planungssicherheit." },
];

const results = [
  { sector: "Pflegebetrieb", outcome: "6 Auszubildende in 3 Monaten", detail: "Strukturierte Sourcing-Welle aus zwei Herkunftsländern, B2-vorbereitet." },
  { sector: "Handwerk", outcome: "4 Auszubildende in 6 Wochen", detail: "Direkte Zuordnung passender Profile aus laufender Pipeline." },
  { sector: "Gastronomie", outcome: "Volle Ausbildungsklasse besetzt", detail: "Planbare Pipeline statt jährlichem Bewerbungszufall." },
];

function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16 px-4">
      {/* Subtle blurred background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-25"
          style={{ filter: "blur(2px)" }}
          width={1920}
          height={1280}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--background) 70%, transparent) 0%, var(--background) 90%)",
          }}
        />
      </div>
      <div className="glow-blob w-[600px] h-[600px] top-[-150px] left-[-150px]" style={{ background: "var(--blob-primary)" }} />
      <div className="glow-blob w-[500px] h-[500px] bottom-[-100px] right-[-100px]" style={{ background: "var(--blob-accent)" }} />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="h-eyebrow mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Recruiting-System für Ausbildung
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          Ausbildungsplätze besetzen — <br className="hidden sm:block" />
          <span className="gradient-text">planbar, strukturiert, international</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-muted-foreground"
        >
          Kein Vermittler. Ein System. Wir bauen für deutsche Unternehmen eine verlässliche Pipeline qualifizierter Auszubildender aus dem Ausland — geprüft, sprachlich vorbereitet, langfristig orientiert.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/kontakt" className="btn-primary flex items-center gap-2">
            <Building2 size={16} /> Pipeline aufbauen <ArrowRight size={16} />
          </Link>
          <Link to="/bewerber" className="btn-secondary flex items-center gap-2">
            <GraduationCap size={16} /> Für Bewerber
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="px-5 pb-2 -mt-10 relative z-20">
      <div className="mx-auto max-w-6xl glass rounded-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text tracking-tight">{s.v}</div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PainSection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <span className="h-eyebrow mb-5">Marktlage</span>
          <h2 className="h-display mt-5">
            Der Ausbildungsmarkt steht <span className="gradient-text">unter Druck</span>.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-base sm:text-lg">
            Klassische Kanäle liefern nicht mehr. Wer wartet, verliert Zeit, Wachstum und Marktanteile.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {painPoints.map((p, i) => (
            <motion.div
              key={p.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6"
            >
              <div
                className="icon-tile h-11 w-11 mb-4"
                style={{
                  color: "var(--warning, oklch(0.72 0.18 45))",
                  borderColor: "color-mix(in oklab, var(--warning, oklch(0.72 0.18 45)) 25%, transparent)",
                  background: "color-mix(in oklab, var(--warning, oklch(0.72 0.18 45)) 10%, transparent)",
                }}
              >
                <p.icon size={20} />
              </div>
              <p className="text-foreground/85 leading-relaxed text-sm">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemPositioning() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-6 sm:p-8"
          >
            <div className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">KLASSISCHE VERMITTLUNG</div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-4">Zufall.</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>— Reaktiv. Bewerbungen kommen oder bleiben aus.</li>
              <li>— Lokal limitiert. Schmaler Markt, hoher Wettbewerb.</li>
              <li>— Unstrukturiert. Kein definierter Prozess, keine Standards.</li>
              <li>— Keine Vorbereitung. Sprache, Kultur, Erwartung — offen.</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl p-6 sm:p-8"
            style={{ boxShadow: "var(--shadow-elevated)" }}
          >
            <div className="text-xs font-semibold tracking-widest gradient-text mb-3">KASSOUBI</div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-4">
              <span className="gradient-text">Planbare Pipeline.</span>
            </h3>
            <ul className="space-y-2 text-sm text-foreground/90">
              <li>+ Proaktiv. Sourcing direkt im Herkunftsland.</li>
              <li>+ International. Skalierbarer Talentpool jenseits Deutschlands.</li>
              <li>+ Strukturiert. Definierte Stufen, definierte Standards.</li>
              <li>+ Vorbereitet. B1/B2, kulturell gebrieft, ab Tag eins arbeitsfähig.</li>
            </ul>
          </motion.div>
        </div>

        <div className="text-center mt-10">
          <p className="text-base sm:text-lg md:text-xl font-semibold tracking-tight max-w-3xl mx-auto">
            Kein Vermittler. <span className="gradient-text">Ein strukturiertes Recruiting-System.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function InternationalAdvantage() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <span className="h-eyebrow mb-5">Unser Vorsprung</span>
          <h2 className="h-display mt-5">
            Eine <span className="gradient-text">internationale Pipeline</span> — nicht der lokale Markt.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-base sm:text-lg">
            Vier Komponenten machen unsere Vermittlung zu einem System — keine vier Versprechen.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass glass-hover-lift rounded-2xl p-6"
            >
              <div className="icon-tile h-11 w-11 mb-5"><p.icon size={20} /></div>
              <h3 className="font-semibold mb-2 tracking-tight">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <span className="h-eyebrow mb-5">Ergebnisse aus der Praxis</span>
          <h2 className="h-display mt-5">
            Was unsere Pipeline <span className="gradient-text">liefert</span>.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {results.map((r, i) => (
            <motion.div
              key={r.sector}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass glass-hover-lift rounded-2xl p-6 sm:p-7"
            >
              <div className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">{r.sector.toUpperCase()}</div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight gradient-text mb-3">{r.outcome}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.detail}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6">
          Repräsentative Ergebnisse aus laufenden Mandaten. Details auf Anfrage.
        </p>
      </div>
    </section>
  );
}

function ServicesSplit() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <span className="h-eyebrow mb-5">Zwei Wege</span>
          <h2 className="h-display mt-5">Wo möchten Sie <span className="gradient-text">starten?</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/unternehmen"
            className="glass glass-hover-lift rounded-2xl p-6 sm:p-8 md:p-10 group block"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="icon-tile h-14 w-14"><Building2 size={26} /></div>
              <span className="text-xs font-semibold tracking-wide gradient-text">B2B</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 tracking-tight">Für Unternehmen</h3>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              Internationale Auszubildende strukturiert gewinnen. Geprüfte Kandidaten, planbare Zeitfenster, messbare Ergebnisse.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
              Kapazität sichern <ArrowRight size={14} />
            </span>
          </Link>

          <Link
            to="/bewerber"
            className="glass glass-hover-lift rounded-2xl p-6 sm:p-8 md:p-10 group block"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="icon-tile h-14 w-14"><GraduationCap size={26} /></div>
              <span className="text-xs font-semibold tracking-wide gradient-text">Kostenlos</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 tracking-tight">Für Bewerber</h3>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              Starte dein neues Leben in Deutschland — mit einer sicheren Ausbildung, klarem Plan und persönlicher Begleitung.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
              Jetzt bewerben <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProcessPreview() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-3xl text-center">
        <span className="h-eyebrow mb-5">System</span>
        <h2 className="h-display mt-5">
          Fünf Stufen. Ein <span className="gradient-text">verlässliches Ergebnis</span>.
        </h2>
        <p className="text-muted-foreground mt-5 text-base sm:text-lg">
          Vom Sourcing bis zur Integration — jeder Schritt definiert, dokumentiert, wiederholbar.
        </p>
        <div className="mt-8">
          <Link to="/prozess" className="btn-secondary inline-flex items-center gap-2">
            <Layers size={16} /> Prozess im Detail <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="section-padding overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />
      <div className="glow-blob w-[700px] h-[700px] top-[-200px] left-[10%]" style={{ background: "var(--blob-primary)" }} />
      <div className="glow-blob w-[500px] h-[500px] bottom-[-200px] right-[5%]" style={{ background: "var(--blob-accent)" }} />
      <div className="mx-auto max-w-4xl relative z-10 text-center">
        <div
          className="glass rounded-3xl p-6 sm:p-10 md:p-16"
          style={{ boxShadow: "var(--shadow-elevated), var(--shadow-glow)" }}
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
            Bauen Sie Ihre <span className="gradient-text">Pipeline</span> — bevor es Ihre Wettbewerber tun.
          </h2>
          <p className="text-muted-foreground mt-6 text-base sm:text-lg max-w-2xl mx-auto">
            Wir analysieren Ihren Bedarf und liefern innerhalb von 48 Stunden einen strukturierten nächsten Schritt.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/kontakt" className="btn-primary flex items-center gap-2">
              Analyse starten <ArrowRight size={16} />
            </Link>
            <Link to="/prozess" className="btn-secondary flex items-center gap-2">
              System ansehen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <StatsBar />
      <VideoSection />
      <PainSection />
      <SystemPositioning />
      <InternationalAdvantage />
      <ResultsSection />
      <ServicesSplit />
      <ProcessPreview />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
