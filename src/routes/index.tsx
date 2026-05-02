import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      {
        name: "description",
        content:
          "Kein Vermittler. Ein System. Wir bauen für deutsche Unternehmen eine planbare, internationale Pipeline qualifizierter Auszubildender — strukturiert, geprüft, integriert.",
      },
      {
        property: "og:title",
        content: "Kassoubi — Recruiting-System für internationale Auszubildende",
      },
      {
        property: "og:description",
        content:
          "Planbare Ausbildungsbesetzung statt Zufall. Internationale Pipeline. Strukturierter Prozess. Messbare Ergebnisse.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { v: "Pool", l: "Kandidatenpool im Aufbau" },
  { v: "Mehrere", l: "Zielländer" },
  { v: "48h", l: "Strukturierte Rückmeldung" },
  { v: "Qualität", l: "Prozessqualität im Fokus" },
];

const pillars = [
  {
    icon: Globe2,
    title: "Internationales Sourcing",
    desc: "Direktzugang zu motivierten Auszubildenden im Herkunftsland — nicht limitiert auf den lokalen Markt.",
  },
  {
    icon: ShieldCheck,
    title: "Mehrstufiges Screening",
    desc: "Sprache, Motivation, Eignung — strukturiert geprüft, bevor Sie investieren.",
  },
  {
    icon: Target,
    title: "Passgenaues Matching",
    desc: "Zuordnung nach Profil, Branche und Kultur — keine Zufallstreffer.",
  },
  {
    icon: Plane,
    title: "End-to-End Integration",
    desc: "Visum, Anreise, Onboarding. Ein durchgehender Prozess bis zum ersten Ausbildungstag.",
  },
];

const painPoints = [
  { icon: AlertTriangle, text: "Tausende Ausbildungsplätze bleiben jedes Jahr unbesetzt." },
  {
    icon: TrendingDown,
    text: "Der lokale Bewerbermarkt liefert weder die Quantität noch die Qualität.",
  },
  { icon: Users, text: "Operative Engpässe, verlorenes Wachstum, gefährdete Planungssicherheit." },
];

const results = [
  {
    sector: "Pflegebetrieb",
    outcome: "6 Auszubildende in 3 Monaten",
    detail: "Strukturierte Sourcing-Welle aus zwei Herkunftsländern, B2-vorbereitet.",
  },
  {
    sector: "Handwerk",
    outcome: "4 Auszubildende in 6 Wochen",
    detail: "Direkte Zuordnung passender Profile aus laufender Pipeline.",
  },
  {
    sector: "Gastronomie",
    outcome: "Volle Ausbildungsklasse besetzt",
    detail: "Planbare Pipeline statt jährlichem Bewerbungszufall.",
  },
];

const authorityItems = [
  {
    icon: Globe2,
    title: "Internationale Vorauswahl",
    desc: "Profile werden früh nach Motivation, Ausbildungswunsch, Sprache und grundsätzlicher Passung eingeordnet.",
  },
  {
    icon: Layers,
    title: "Strukturierter Dokumentenprozess",
    desc: "Unterlagen, Status und nächste Schritte werden nachvollziehbar geführt, bevor Unternehmen Zeit investieren.",
  },
  {
    icon: Users,
    title: "Klare Kommunikation",
    desc: "Bewerber erhalten Orientierung zum Ablauf, zu Erwartungen und zur Vorbereitung auf Gespräche.",
  },
  {
    icon: GraduationCap,
    title: "Fokus auf Ausbildung",
    desc: "Der Prozess ist auf Ausbildungsplätze ausgerichtet, nicht auf allgemeine kurzfristige Jobvermittlung.",
  },
  {
    icon: Plane,
    title: "Begleitung bis zum Start",
    desc: "Der Prozess bleibt nicht beim Matching stehen, sondern begleitet die kritische Phase bis zum Ausbildungsbeginn.",
  },
];

const entryOptions = [
  {
    id: "unternehmen",
    label: "Für Unternehmen",
    to: "/unternehmen" as const,
    icon: Building2,
    badge: "B2B",
    title: "Für Unternehmen",
    description:
      "Internationale Auszubildende strukturiert gewinnen. Geprüfte Kandidaten, planbare Zeitfenster, messbare Ergebnisse.",
    cta: "Analyse starten",
  },
  {
    id: "bewerber",
    label: "Für Bewerber",
    to: "/bewerber" as const,
    icon: GraduationCap,
    badge: "Kostenlos",
    title: "Für Bewerber",
    description:
      "Starte dein neues Leben in Deutschland — mit einer sicheren Ausbildung, klarem Plan und persönlicher Begleitung.",
    cta: "Jetzt bewerben",
  },
] as const;

const pipelineStages = [
  { label: "Vorauswahl", detail: "Profil geprüft", icon: ShieldCheck },
  { label: "Dokumente", detail: "Unterlagen klar", icon: Layers },
  { label: "Interview", detail: "Termin geplant", icon: Users },
  { label: "Ausbildung", detail: "Start bereit", icon: Plane },
];

const candidateCards = [
  { name: "Amina K.", role: "Pflege", language: "B2 Deutsch", status: "Interview" },
  { name: "Yassine M.", role: "Hotellerie", language: "B1 Deutsch", status: "Dokumente" },
  { name: "Nour E.", role: "Handwerk", language: "B2 Deutsch", status: "Vorauswahl" },
];

function PipelineDashboardVisual() {
  return (
    <div className="hero-visual-frame">
      <div className="hero-map-grid" />

      <div className="hero-dashboard-header">
        <div>
          <div className="hero-dashboard-kicker">Kassoubi Pipeline OS</div>
          <div className="hero-dashboard-title">Internationaler Talentfluss</div>
        </div>
        <div className="hero-dashboard-signal">
          <span />
          Live
        </div>
      </div>

      <div className="hero-pipeline-flow" aria-hidden="true">
        {pipelineStages.map((stage) => {
          const StageIcon = stage.icon;
          return (
            <div key={stage.label} className="hero-stage-card">
              <div className="hero-stage-icon">
                <StageIcon size={15} />
              </div>
              <div>
                <div className="hero-stage-label">{stage.label}</div>
                <div className="hero-stage-detail">{stage.detail}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hero-candidate-stack">
        {candidateCards.map((candidate, index) => (
          <div key={candidate.name} className="hero-candidate-card">
            <div className="hero-candidate-avatar">{candidate.name.slice(0, 1)}</div>
            <div className="min-w-0 flex-1">
              <div className="hero-candidate-name">{candidate.name}</div>
              <div className="hero-candidate-meta">
                {candidate.role} · {candidate.language}
              </div>
            </div>
            <span className={`hero-status-pill hero-status-${index}`}>{candidate.status}</span>
          </div>
        ))}
      </div>

      <div className="hero-dashboard-footer">
        <div>
          <span className="hero-footer-value">48h</span>
          <span className="hero-footer-label">Reaktionszeit</span>
        </div>
        <div>
          <span className="hero-footer-value">4</span>
          <span className="hero-footer-label">Prozessstufen</span>
        </div>
        <div>
          <span className="hero-footer-value">B1/B2</span>
          <span className="hero-footer-label">Sprachfilter</span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden px-4 pb-14 pt-24 sm:pb-16 lg:flex lg:min-h-[88vh] lg:items-center lg:pt-28">
      {/* Subtle blurred background image */}
      <div className="hero-bg-layer absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-15"
          style={{ filter: "blur(12px)", transform: "scale(1.04)" }}
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
      <div
        className="hero-glow glow-blob w-[600px] h-[600px] top-[-150px] left-[-150px]"
        style={{ background: "var(--blob-primary)" }}
      />
      <div
        className="hero-glow glow-blob w-[500px] h-[500px] bottom-[-100px] right-[-100px]"
        style={{ background: "var(--blob-accent)" }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.92fr)] md:gap-12 lg:gap-16">
        <div className="max-w-2xl text-left">
          <div>
            <span className="h-eyebrow mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Internationale Ausbildungspipeline für Unternehmen
            </span>
          </div>

          <h1
            className="mt-5 text-3xl font-bold leading-[1.05] tracking-tight [text-wrap:balance] sm:mt-6 sm:text-5xl lg:text-6xl"
          >
            Ausbildungsplätze besetzen — <br className="hidden sm:block" />
            <span className="gradient-text">planbar, strukturiert, international</span>.
          </h1>

          <p
            className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground [text-wrap:balance] sm:text-lg md:text-xl"
          >
            Kassoubi Vermittlung unterstützt Unternehmen dabei, passende Auszubildende aus
            internationalen Märkten zu gewinnen — mit klarer Vorauswahl, strukturierter
            Kommunikation und einem verlässlichen Prozess bis zum Start.
          </p>

          <div
            className="mt-10 flex flex-col items-start gap-3 sm:mt-11 sm:flex-row sm:gap-4"
          >
            <Link
              to="/kontakt"
              className="btn-primary group flex min-w-[220px] items-center gap-2 sm:min-w-0 sm:!px-8"
            >
              <Building2 size={16} /> Analyse starten{" "}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/bewerber"
              className="btn-secondary group flex min-w-[180px] items-center gap-2 opacity-90 hover:opacity-100"
            >
              <GraduationCap size={16} /> Für Bewerber
            </Link>
          </div>
        </div>

        <div
          className="hero-visual-shell relative mx-auto w-full max-w-[540px] md:mx-0 md:justify-self-end"
        >
          <PipelineDashboardVisual />
        </div>
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
            <div className="text-2xl md:text-3xl font-bold gradient-text tracking-tight">{s.v}</div>
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
            Klassische Kanäle liefern nicht mehr. Wer wartet, verliert Zeit, Wachstum und
            Marktanteile.
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
                  color: "var(--accent)",
                  borderColor:
                    "color-mix(in oklab, var(--accent) 25%, transparent)",
                  background:
                    "color-mix(in oklab, var(--accent) 10%, transparent)",
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

function AuthoritySection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="h-eyebrow mb-5">Vertrauen</span>
          <h2 className="h-display mt-5">
            Warum Unternehmen <span className="gradient-text">Kassoubi vertrauen</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Eine internationale Ausbildungspipeline funktioniert nur, wenn Auswahl, Dokumente und
            Kommunikation sauber geführt werden. Genau darauf ist unser Prozess ausgelegt.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {authorityItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              className="glass glass-hover-lift rounded-2xl p-5 sm:p-6"
            >
              <div className="icon-tile h-11 w-11 mb-5">
                <item.icon size={20} />
              </div>
              <h3 className="font-semibold tracking-tight mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
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
            <div className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">
              KLASSISCHE VERMITTLUNG
            </div>
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
            Kein Vermittler.{" "}
            <span className="gradient-text">Ein strukturiertes Recruiting-System.</span>
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
            Eine <span className="gradient-text">internationale Pipeline</span> — nicht der lokale
            Markt.
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
              <div className="icon-tile h-11 w-11 mb-5">
                <p.icon size={20} />
              </div>
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
              <div className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">
                {r.sector.toUpperCase()}
              </div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight gradient-text mb-3">
                {r.outcome}
              </div>
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
  const [activeEntry, setActiveEntry] = useState<(typeof entryOptions)[number]["id"]>(
    entryOptions[0].id,
  );
  const activeOption = entryOptions.find((option) => option.id === activeEntry) ?? entryOptions[0];
  const ActiveIcon = activeOption.icon;

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <span className="h-eyebrow mb-5">Zwei Wege</span>
          <h2 className="h-display mt-5">
            Wo möchten Sie <span className="gradient-text">starten?</span>
          </h2>
        </div>

        <div className="mx-auto mb-8 flex w-full max-w-md rounded-full border border-border bg-secondary/30 p-1 backdrop-blur-md">
          {entryOptions.map((option) => {
            const isActive = option.id === activeEntry;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveEntry(option.id)}
                className="relative flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300"
                style={
                  isActive
                    ? {
                        background: "var(--gradient-primary)",
                        color: "var(--color-primary-foreground)",
                        boxShadow: "var(--shadow-glow)",
                      }
                    : {
                        color: "var(--color-muted-foreground)",
                      }
                }
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOption.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <Link
                to={activeOption.to}
                className="glass glass-hover-lift rounded-2xl p-6 sm:p-8 md:p-10 group block"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="icon-tile h-14 w-14">
                    <ActiveIcon size={26} />
                  </div>
                  <span className="text-xs font-semibold tracking-wide gradient-text">
                    {activeOption.badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 tracking-tight">
                  {activeOption.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  {activeOption.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                  {activeOption.cta} <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
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
            <Layers size={16} /> Prozess ansehen <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="section-padding overflow-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div
        className="glow-blob w-[700px] h-[700px] top-[-200px] left-[10%]"
        style={{ background: "var(--blob-primary)" }}
      />
      <div
        className="glow-blob w-[500px] h-[500px] bottom-[-200px] right-[5%]"
        style={{ background: "var(--blob-accent)" }}
      />
      <div className="mx-auto max-w-4xl relative z-10 text-center">
        <div
          className="glass rounded-3xl p-6 sm:p-10 md:p-16"
          style={{ boxShadow: "var(--shadow-elevated), var(--shadow-glow)" }}
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
            Bauen Sie Ihre <span className="gradient-text">Pipeline</span> — bevor es Ihre
            Wettbewerber tun.
          </h2>
          <p className="text-muted-foreground mt-6 text-base sm:text-lg max-w-2xl mx-auto">
            Wir analysieren Ihren Bedarf und liefern innerhalb von 48 Stunden einen strukturierten
            nächsten Schritt.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/kontakt" className="btn-primary flex items-center gap-2">
              Analyse starten <ArrowRight size={16} />
            </Link>
            <Link to="/prozess" className="btn-secondary flex items-center gap-2">
              Prozess ansehen
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
      <AuthoritySection />
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
