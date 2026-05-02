import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  AlertTriangle,
  TrendingDown,
  Users,
  Wallet,
  Globe2,
  Search,
  ShieldCheck,
  Handshake,
  Briefcase,
  Layers,
  Target,
  CheckCircle2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Route = createFileRoute("/unternehmen")({
  head: () => ({
    meta: [
      { title: "Für Unternehmen — Internationale Pipeline für Auszubildende | Kassoubi" },
      { name: "description", content: "Besetzen Sie Ausbildungsplätze planbar. Kein Vermittler — ein strukturiertes Recruiting-System mit internationaler Pipeline und messbaren Ergebnissen." },
      { property: "og:title", content: "Für Unternehmen — Recruiting-System für Ausbildung | Kassoubi" },
      { property: "og:description", content: "Geprüfte internationale Auszubildende, planbar, vorbereitet, langfristig orientiert." },
    ],
  }),
  component: UnternehmenPage,
});

const truePrice = [
  { icon: AlertTriangle, title: "Produktionsausfälle", desc: "Unbesetzte Ausbildungsplätze blockieren Kapazität, verzögern Aufträge und gefährden Liefertermine." },
  { icon: Users, title: "Überlastete Teams", desc: "Stammbelegschaft kompensiert dauerhaft. Folge: Fluktuation, Krankenstand, sinkende Qualität." },
  { icon: TrendingDown, title: "Wachstumsverlust", desc: "Ohne Nachwuchs kein Ausbau. Marktanteile gehen an Wettbewerber mit funktionierender Pipeline." },
  { icon: Wallet, title: "Steigende Rekrutierungskosten", desc: "Stellenanzeigen, Personalmarketing, externe Vermittler — ohne planbares Ergebnis." },
];

const pipeline = [
  { icon: Search, title: "Sourcing", desc: "Identifikation motivierter Auszubildender direkt im Herkunftsland." },
  { icon: ShieldCheck, title: "Screening", desc: "Mehrstufige Prüfung von Sprache, Motivation und Eignung." },
  { icon: Handshake, title: "Matching", desc: "Passgenaue Zuordnung zu Ihrem Ausbildungsbetrieb und Ihrer Kultur." },
  { icon: Briefcase, title: "Placement", desc: "Visum, Onboarding und strukturierte Integration in Deutschland." },
];

const advantages = [
  { icon: Globe2, title: "Zugang zu internationalen Talenten", desc: "Nicht auf den lokalen Markt limitiert. Strukturierte Pipeline aus dem Ausland." },
  { icon: Target, title: "Geprüfte Profile statt Bewerbungsglück", desc: "B1/B2-Sprachniveau, kulturell vorbereitet, motiviert. Standards statt Zufall." },
  { icon: Layers, title: "Planbare Zeitfenster", desc: "Definierte Stufen, klare Meilensteine, verlässliche Termine. Kein Wartespiel." },
  { icon: ShieldCheck, title: "Langfristige Bindung", desc: "Auszubildende mit Migrationsperspektive bleiben statistisch deutlich länger." },
];

function UnternehmenPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-20 overflow-hidden">
        <div className="glow-blob w-[600px] h-[600px] top-[-200px] left-[-150px]" style={{ background: "var(--blob-accent)" }} />
        <div className="mx-auto max-w-4xl px-5 text-center relative z-10">
          <span className="h-eyebrow mb-6">Für Unternehmen</span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
          >
            Unbesetzte Ausbildungsplätze kosten Wachstum. <span className="gradient-text">Wir liefern Kapazität.</span>
          </motion.h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Eine strukturierte, internationale Pipeline qualifizierter Auszubildender — vorbereitet, vermittelt, integriert.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/kontakt" className="btn-primary inline-flex items-center gap-2">Analyse starten <ArrowRight size={16} /></Link>
            <Link to="/prozess" className="btn-secondary inline-flex items-center gap-2">Prozess ansehen</Link>
          </div>
        </div>
      </section>

      {/* True price of unfilled */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="h-eyebrow mb-5">Der wahre Preis</span>
            <h2 className="h-display mt-5">
              Der wahre Preis <span className="gradient-text">unbesetzter Ausbildungsplätze</span>.
            </h2>
            <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-base sm:text-lg">
              Was Sie nicht in der Bilanz sehen — und trotzdem jeden Monat zahlen.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {truePrice.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass rounded-2xl p-6"
              >
                <div
                  className="icon-tile h-11 w-11 mb-4"
                  style={{
                    color: "var(--accent)",
                    borderColor: "color-mix(in oklab, var(--accent) 25%, transparent)",
                    background: "color-mix(in oklab, var(--accent) 10%, transparent)",
                  }}
                >
                  <p.icon size={20} />
                </div>
                <h3 className="font-semibold tracking-tight mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 glass rounded-2xl p-6 sm:p-8 text-center">
            <p className="text-base sm:text-lg md:text-xl font-semibold tracking-tight">
              Und jedes Jahr wird es schwieriger, <span className="gradient-text">passende Auszubildende zu finden</span>.
            </p>
          </div>
        </div>
      </section>

      {/* System positioning */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <span className="h-eyebrow mb-5">Positionierung</span>
          <h2 className="h-display mt-5">
            Kein Vermittler. <span className="gradient-text">Ein strukturiertes Recruiting-System.</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-base sm:text-lg">
            Klassische Vermittlung ist Zufall. Wir bauen Infrastruktur — eine internationale Pipeline mit definierten Standards, klaren Meilensteinen und messbaren Ergebnissen.
          </p>
        </div>
      </section>

      {/* International advantage */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="h-eyebrow mb-5">Internationaler Vorsprung</span>
            <h2 className="h-display mt-5">
              Nicht auf den lokalen Markt <span className="gradient-text">limitiert</span>.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {advantages.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass glass-hover-lift rounded-2xl p-6 sm:p-7"
              >
                <div className="icon-tile h-12 w-12 mb-5"><a.icon size={22} /></div>
                <h3 className="font-semibold text-lg mb-2 tracking-tight">{a.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="h-eyebrow mb-5">Pipeline</span>
            <h2 className="h-display mt-5">Vier Stufen. <span className="gradient-text">Ein klarer Prozess.</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {pipeline.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass glass-hover-lift rounded-2xl p-6"
              >
                <div className="icon-tile h-12 w-12 mb-4"><p.icon size={22} /></div>
                <div className="text-xs font-semibold text-primary tracking-widest mb-2">0{i + 1}</div>
                <h3 className="font-semibold mb-2 tracking-tight">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section-padding">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="h-eyebrow mb-5">Was Sie davon haben</span>
            <h2 className="h-display mt-5">Konkrete <span className="gradient-text">Geschäftsergebnisse</span>.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Planbare Besetzung", d: "Ausbildungsstellen werden in definierten Zeitfenstern besetzt — nicht im Bewerbungslotto." },
              { t: "Operative Stabilität", d: "Frühzeitige Pipeline reduziert Engpässe und entlastet Stammteams." },
              { t: "Niedrigere Gesamtkosten", d: "Ein strukturierter Prozess kostet weniger als wiederholt unbesetzte Stellen." },
            ].map((b, i) => (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass glass-hover-lift rounded-2xl p-7"
              >
                <div className="icon-tile h-12 w-12 mb-5"><CheckCircle2 size={22} /></div>
                <h3 className="font-semibold text-lg mb-2 tracking-tight">{b.t}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />
        <div className="mx-auto max-w-3xl text-center relative z-10">
          <div className="glass rounded-3xl p-6 sm:p-10 md:p-14" style={{ boxShadow: "var(--shadow-elevated), var(--shadow-glow)" }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              Sichern Sie Ihre <span className="gradient-text">Ausbildungskapazität</span>.
            </h2>
            <p className="text-muted-foreground mt-4 text-base sm:text-lg">
              Antwort innerhalb von 48 Stunden — mit konkretem nächsten Schritt.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/kontakt" className="btn-primary inline-flex items-center gap-2">Analyse starten <ArrowRight size={16} /></Link>
              <Link to="/prozess" className="btn-secondary inline-flex items-center gap-2">Prozess ansehen</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
