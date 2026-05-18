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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kassoubi — Auszubildende & Fachkräfte aus Marokko für Deutschland" },
      {
        name: "description",
        content:
          "Vermittlung für Unternehmen in Deutschland: motivierte Auszubildende und Fachkräfte aus Marokko gewinnen — strukturiert vorausgewählt, sprachlich vorbereitet und begleitet.",
      },
      {
        property: "og:title",
        content: "Kassoubi — Auszubildende und Fachkräfte aus Marokko",
      },
      {
        property: "og:description",
        content:
          "Strukturierte Vermittlung von Auszubildenden und Fachkräften aus Marokko für Unternehmen in Deutschland.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { v: "Marokko", l: "Sourcing direkt im Kandidatenmarkt" },
  { v: "Profile", l: "Auszubildende & Fachkräfte" },
  { v: "48h", l: "Strukturierte Rückmeldung" },
  { v: "Qualität", l: "Prozessqualität im Fokus" },
];

const pillars = [
  {
    icon: Globe2,
    title: "Sourcing in Marokko",
    desc: "Direktzugang zu motivierten Auszubildenden und Fachkräften aus Marokko — nicht limitiert auf den lokalen deutschen Markt.",
  },
  {
    icon: ShieldCheck,
    title: "Mehrstufiges Screening",
    desc: "Sprache, Motivation, Eignung und Dokumentenstand — strukturiert geprüft, bevor Sie Zeit investieren.",
  },
  {
    icon: Target,
    title: "Passgenaues Matching",
    desc: "Zuordnung nach Profil, Branche, Standort und Unternehmenskultur — keine Zufallstreffer.",
  },
  {
    icon: Plane,
    title: "End-to-End Integration",
    desc: "Kommunikation, Unterlagen, Anreise und Onboarding. Ein durchgehender Prozess bis zum Ausbildungs- oder Arbeitsbeginn.",
  },
];

const painPoints = [
  {
    icon: AlertTriangle,
    text: "Ausbildungsplätze und Fachkräftepositionen bleiben in vielen deutschen Betrieben unbesetzt.",
  },
  {
    icon: TrendingDown,
    text: "Der lokale Kandidatenmarkt liefert oft weder ausreichend Bewerbungen noch verlässlich passende Profile.",
  },
  { icon: Users, text: "Operative Engpässe, verlorenes Wachstum, gefährdete Planungssicherheit." },
];

const results = [
  {
    sector: "Pflegebetrieb",
    outcome: "6 Kandidaten in 3 Monaten",
    detail:
      "Strukturierte Vorauswahl marokkanischer Profile mit sprachlicher und kultureller Vorbereitung.",
  },
  {
    sector: "Handwerk",
    outcome: "4 passende Profile in 6 Wochen",
    detail: "Direkte Zuordnung geprüfter Profile aus Marokko zu konkreten Anforderungen.",
  },
  {
    sector: "Gastronomie",
    outcome: "Ausbildungs- und Arbeitsbedarf gedeckt",
    detail: "Planbarer Vermittlungsprozess statt jährlichem Bewerbungszufall.",
  },
];

const authorityItems = [
  {
    icon: Globe2,
    title: "Vorauswahl in Marokko",
    desc: "Profile werden früh nach Motivation, Zielrolle, Sprache, Dokumentenstand und grundsätzlicher Passung eingeordnet.",
  },
  {
    icon: Layers,
    title: "Strukturierter Dokumentenprozess",
    desc: "Unterlagen, Status und nächste Schritte werden nachvollziehbar geführt, bevor Unternehmen Zeit investieren.",
  },
  {
    icon: Users,
    title: "Klare Kommunikation",
    desc: "Kandidaten aus Marokko erhalten Orientierung zum Ablauf, zu Erwartungen und zur Vorbereitung auf Gespräche mit deutschen Unternehmen.",
  },
  {
    icon: GraduationCap,
    title: "Fokus auf Ausbildung & Arbeit",
    desc: "Der Prozess ist auf Ausbildungsplätze und Fachkräftebedarf in deutschen Unternehmen ausgerichtet.",
  },
  {
    icon: Plane,
    title: "Begleitung bis zum Start",
    desc: "Der Prozess bleibt nicht beim Matching stehen, sondern begleitet die kritische Phase bis zum Ausbildungs- oder Arbeitsbeginn.",
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
      "Auszubildende und Fachkräfte aus Marokko strukturiert gewinnen. Vorausgewählte Profile, klare Kommunikation und weniger interner Rekrutierungsaufwand.",
    cta: "Personal aus Marokko anfragen",
  },
  {
    id: "bewerber",
    label: "Für Kandidaten",
    to: "/bewerber" as const,
    icon: GraduationCap,
    badge: "Kostenlos",
    title: "Für Kandidaten",
    description:
      "Du kommst aus Marokko und möchtest dich für Ausbildung oder Arbeit in Deutschland bewerben? Wir prüfen Profil, Sprache, Unterlagen und passende Anforderungen.",
    cta: "Kandidatenprofil einreichen",
  },
] as const;

const pipelineStages = [
  { label: "Vorauswahl", detail: "Profil geprüft", icon: ShieldCheck },
  { label: "Dokumente", detail: "Unterlagen klar", icon: Layers },
  { label: "Interview", detail: "Termin geplant", icon: Users },
  { label: "Start", detail: "Einsatz bereit", icon: Plane },
];

const candidateCards = [
  { name: "Amina K.", role: "Pflege", language: "B2 Deutsch", status: "Interview" },
  { name: "Yassine M.", role: "Hotellerie", language: "B1 Deutsch", status: "Dokumente" },
  { name: "Nour E.", role: "Handwerk", language: "B2 Deutsch", status: "Vorauswahl" },
];

function RecruitingDashboardVisual() {
  return (
    <div className="hero-visual-frame">
      <div className="hero-map-grid" />

      <div className="hero-dashboard-header">
        <div>
          <div className="hero-dashboard-kicker">Marokko → Deutschland</div>
          <div className="hero-dashboard-title">Vermittlung für deutsche Unternehmen</div>
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
    <section className="relative overflow-hidden border-b border-slate-900/10 bg-gradient-to-b from-white to-slate-50 dark:border-white/10 dark:from-[#080D1A] dark:to-[#0B1020]">
      <div className="hero-bg-layer absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.06),transparent_38%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.15),transparent_42%)]" />
      <div
        className="hero-glow glow-blob right-[6%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 bg-blue-500/10 dark:bg-blue-500/18"
        aria-hidden="true"
      />
      <div
        className="hero-glow glow-blob w-[600px] h-[600px] top-[-150px] left-[-150px]"
        style={{ background: "var(--blob-primary)" }}
      />
      <div
        className="hero-glow glow-blob w-[500px] h-[500px] bottom-[-100px] right-[-100px]"
        style={{ background: "var(--blob-accent)" }}
      />

      <div className="relative z-10 mx-auto grid min-w-0 max-w-7xl grid-cols-1 items-center gap-8 px-5 pb-12 pt-24 sm:gap-12 sm:px-6 sm:py-14 md:py-20 lg:grid-cols-2 lg:py-24">
        <div className="hero-copy min-w-0 max-w-2xl text-left">
          <div>
            <span className="h-eyebrow mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Auszubildende & Fachkräfte aus Marokko
            </span>
          </div>

          <h1 className="mt-5 max-w-[900px] text-[2rem] font-bold leading-[1.08] tracking-tight [overflow-wrap:anywhere] [text-wrap:balance] sm:mt-6 sm:text-4xl md:text-6xl">
            Auszubildende & Fachkräfte aus Marokko gewinnen — <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              planbar
            </span>
            , <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              strukturiert
            </span>
            , <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              vorbereitet
            </span>
            .
          </h1>

          <p className="mt-5 max-w-[520px] text-base leading-relaxed text-muted-foreground [text-wrap:balance] sm:mt-6 sm:text-lg">
            Kassoubi Vermittlung unterstützt Unternehmen in Deutschland dabei, motivierte
            Auszubildende und Fachkräfte aus Marokko zu finden, vorauszuwählen und durch einen
            klaren Vermittlungsprozess bis zum Start zu begleiten.
          </p>

          <div className="mt-7 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:items-start sm:gap-4">
            <Link
              to="/kontakt"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(37,99,235,0.28)] transition hover:brightness-110 sm:min-w-0"
            >
              <Building2 size={16} /> Personal aus Marokko anfragen{" "}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/bewerber"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 text-sm font-semibold text-foreground transition hover:border-slate-400 hover:bg-white dark:border-white/15 dark:bg-white/[0.04] dark:hover:border-white/25 dark:hover:bg-white/[0.07]"
            >
              <GraduationCap size={16} /> Für Kandidaten
            </Link>
          </div>
        </div>

        <div className="hero-visual-shell relative mx-auto min-w-0 w-full max-w-[540px] rounded-2xl shadow-xl dark:shadow-[0_20px_80px_rgba(37,99,235,0.25)] lg:mx-0 lg:justify-self-end">
          <RecruitingDashboardVisual />
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="relative z-20 -mt-6 px-4 pb-6 sm:-mt-10 sm:px-5 sm:pb-8 md:pb-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 rounded-2xl p-4 sm:p-6 md:grid-cols-4 md:gap-6 md:p-8 glass">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="text-xl font-bold tracking-tight gradient-text sm:text-2xl md:text-3xl">
              {s.v}
            </div>
            <div className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs md:text-sm">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PainSection() {
  return (
    <section className="section-padding homepage-first-section">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <span className="h-eyebrow mb-5">Marktlage</span>
          <h2 className="h-display mt-5">
            Deutsche Unternehmen brauchen{" "}
            <span className="gradient-text">verlässliche Profile</span>.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-base sm:text-lg">
            Wenn lokale Bewerbungen ausbleiben, braucht Recruiting einen klaren Zugang zu passenden
            Kandidaten aus Marokko.
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
                  borderColor: "color-mix(in oklab, var(--accent) 25%, transparent)",
                  background: "color-mix(in oklab, var(--accent) 10%, transparent)",
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
            Warum deutsche Unternehmen <span className="gradient-text">Kassoubi vertrauen</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Die Vermittlung aus Marokko funktioniert nur, wenn Auswahl, Dokumente, Sprache und
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
              <span className="gradient-text">Strukturierte Vermittlung aus Marokko.</span>
            </h3>
            <ul className="space-y-2 text-sm text-foreground/90">
              <li>+ Proaktiv. Sourcing direkt in Marokko.</li>
              <li>+ Fokussiert. Kandidatenpool für Ausbildung und Fachkräftebedarf.</li>
              <li>+ Strukturiert. Definierte Stufen, definierte Standards.</li>
              <li>+ Vorbereitet. B1/B2, kulturell gebrieft, ab Tag eins arbeitsfähig.</li>
            </ul>
          </motion.div>
        </div>

        <div className="text-center mt-10">
          <p className="text-base sm:text-lg md:text-xl font-semibold tracking-tight max-w-3xl mx-auto">
            Kein reiner Anzeigenkanal.{" "}
            <span className="gradient-text">Ein strukturierter Recruiting-Prozess.</span>
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
            Kandidaten aus <span className="gradient-text">Marokko</span> — nicht nur der lokale
            Markt.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-base sm:text-lg">
            Vier Komponenten machen die Vermittlung nach Deutschland belastbar — keine vier
            Versprechen.
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
            Was die Vermittlung aus <span className="gradient-text">Marokko</span> liefert.
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
          Vom Sourcing in Marokko bis zum Start in Deutschland — jeder Schritt definiert,
          dokumentiert, wiederholbar.
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
            Sichern Sie Auszubildende und{" "}
            <span className="gradient-text">Fachkräfte aus Marokko</span>.
          </h2>
          <p className="text-muted-foreground mt-6 text-base sm:text-lg max-w-2xl mx-auto">
            Wir analysieren Ihren Bedarf und zeigen Ihnen, welche Profile aus Marokko realistisch zu
            Ihrem Unternehmen passen.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/kontakt" className="btn-primary flex items-center gap-2">
              Personal aus Marokko anfragen <ArrowRight size={16} />
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
