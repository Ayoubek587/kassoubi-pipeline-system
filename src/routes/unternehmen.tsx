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
      {
        title: "Für Unternehmen — Auszubildende & Fachkräfte aus Marokko gewinnen | Kassoubi",
      },
      {
        name: "description",
        content:
          "Wir unterstützen Unternehmen in Deutschland dabei, passende Auszubildende und Fachkräfte aus Marokko zu gewinnen: Vorauswahl, Screening, Kommunikation und Prozessbegleitung.",
      },
      {
        property: "og:title",
        content: "Für Unternehmen — Personal aus Marokko für Deutschland | Kassoubi",
      },
      {
        property: "og:description",
        content:
          "Strukturierte Vermittlung von Auszubildenden und Fachkräften aus Marokko für deutsche Arbeitgeber.",
      },
    ],
  }),
  component: UnternehmenPage,
});

const truePrice = [
  {
    icon: AlertTriangle,
    title: "Produktionsausfälle",
    desc: "Unbesetzte Ausbildungsplätze und offene Stellen blockieren Kapazität, verzögern Aufträge und gefährden Liefertermine.",
  },
  {
    icon: Users,
    title: "Überlastete Teams",
    desc: "Stammbelegschaft kompensiert dauerhaft. Folge: Fluktuation, Krankenstand, sinkende Qualität.",
  },
  {
    icon: TrendingDown,
    title: "Wachstumsverlust",
    desc: "Ohne Nachwuchs und Fachkräfte kein Ausbau. Marktanteile gehen an Wettbewerber mit funktionierendem Recruiting.",
  },
  {
    icon: Wallet,
    title: "Steigende Rekrutierungskosten",
    desc: "Stellenanzeigen, Personalmarketing, externe Vermittler — ohne planbares Ergebnis.",
  },
];

const pipeline = [
  {
    icon: Search,
    title: "Sourcing in Marokko",
    desc: "Identifikation motivierter Auszubildender und Fachkräfte direkt im marokkanischen Kandidatenmarkt.",
  },
  {
    icon: ShieldCheck,
    title: "Screening",
    desc: "Mehrstufige Prüfung von Sprache, Motivation, Eignung und Dokumentenstand.",
  },
  {
    icon: Handshake,
    title: "Matching",
    desc: "Passgenaue Zuordnung zu Ihrem Betrieb, Ihrer Position und Ihrer Kultur.",
  },
  {
    icon: Briefcase,
    title: "Prozessbegleitung",
    desc: "Kommunikation, Unterlagen, Anreise und Onboarding strukturiert begleiten.",
  },
];

const advantages = [
  {
    icon: Globe2,
    title: "Zugang zu Kandidaten aus Marokko",
    desc: "Nicht auf den lokalen Markt limitiert. Strukturierte Gewinnung von Auszubildenden und Fachkräften aus Marokko.",
  },
  {
    icon: Target,
    title: "Geprüfte Profile statt Bewerbungsglück",
    desc: "Sprache, Motivation, Qualifikation und kulturelle Vorbereitung werden vorab realistisch eingeordnet.",
  },
  {
    icon: Layers,
    title: "Weniger Rekrutierungsaufwand",
    desc: "Vorauswahl, Profil-Screening und Kommunikation entlasten Ihr Team vor den ersten Gesprächen.",
  },
  {
    icon: ShieldCheck,
    title: "Begleiteter Prozess",
    desc: "Klare Schritte vom Bedarf über passende Profile bis zum Ausbildungs- oder Arbeitsbeginn.",
  },
];

function UnternehmenPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-20 overflow-hidden">
        <div
          className="glow-blob w-[600px] h-[600px] top-[-200px] left-[-150px]"
          style={{ background: "var(--blob-accent)" }}
        />
        <div className="mx-auto max-w-4xl px-5 text-center relative z-10">
          <span className="h-eyebrow mb-6">Für Unternehmen</span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
          >
            Auszubildende und Fachkräfte aus Marokko gewinnen —{" "}
            <span className="gradient-text">strukturiert und realistisch.</span>
          </motion.h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Wir unterstützen Unternehmen in Deutschland dabei, passende Auszubildende und Fachkräfte
            aus Marokko zu gewinnen — mit Vorauswahl, Profil-Screening, Kommunikationsunterstützung
            und klarer Prozessbegleitung.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/kontakt" className="btn-primary inline-flex items-center gap-2">
              Personal aus Marokko anfragen <ArrowRight size={16} />
            </Link>
            <Link to="/prozess" className="btn-secondary inline-flex items-center gap-2">
              Prozess ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* True price of unfilled */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="h-eyebrow mb-5">Der wahre Preis</span>
            <h2 className="h-display mt-5">
              Der wahre Preis <span className="gradient-text">unbesetzter Stellen</span>.
            </h2>
            <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-base sm:text-lg">
              Was Sie nicht in der Bilanz sehen — und trotzdem jeden Monat spüren.
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
              Wenn lokale Bewerbungen ausbleiben, braucht Ihr Unternehmen einen verlässlichen Zugang
              zu <span className="gradient-text">passenden Kandidaten aus Marokko</span>.
            </p>
          </div>
        </div>
      </section>

      {/* System positioning */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <span className="h-eyebrow mb-5">Positionierung</span>
          <h2 className="h-display mt-5">
            Kein reiner Vermittler.{" "}
            <span className="gradient-text">Ein strukturierter Recruiting-Prozess.</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-base sm:text-lg">
            Klassische Vermittlung bleibt oft reaktiv. Wir arbeiten fokussiert mit
            Kandidatengewinnung in Marokko, definierten Standards, klarer Kommunikation und
            nachvollziehbaren Meilensteinen.
          </p>
        </div>
      </section>

      {/* International advantage */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="h-eyebrow mb-5">Marokko-Fokus</span>
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
                <div className="icon-tile h-12 w-12 mb-5">
                  <a.icon size={22} />
                </div>
                <h3 className="font-semibold text-lg mb-2 tracking-tight">{a.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="h-eyebrow mb-5">Recruiting-Prozess</span>
            <h2 className="h-display mt-5">
              Vier Stufen. <span className="gradient-text">Ein klarer Prozess.</span>
            </h2>
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
                <div className="icon-tile h-12 w-12 mb-4">
                  <p.icon size={22} />
                </div>
                <div className="text-xs font-semibold text-primary tracking-widest mb-2">
                  0{i + 1}
                </div>
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
            <h2 className="h-display mt-5">
              Konkrete <span className="gradient-text">Geschäftsergebnisse</span>.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                t: "Gezieltere Vorauswahl",
                d: "Sie sprechen mit Kandidaten aus Marokko, deren Profil grundsätzlich zu Bedarf, Sprache und Einsatzbereich passt.",
              },
              {
                t: "Operative Stabilität",
                d: "Frühzeitiges Recruiting reduziert Engpässe und entlastet Stammteams.",
              },
              {
                t: "Reduzierter Aufwand",
                d: "Sourcing, Vorprüfung und Kommunikation werden strukturiert vorbereitet, bevor Ihr Team Zeit investiert.",
              },
            ].map((b, i) => (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass glass-hover-lift rounded-2xl p-7"
              >
                <div className="icon-tile h-12 w-12 mb-5">
                  <CheckCircle2 size={22} />
                </div>
                <h3 className="font-semibold text-lg mb-2 tracking-tight">{b.t}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding overflow-hidden relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-glow)" }}
        />
        <div className="mx-auto max-w-3xl text-center relative z-10">
          <div
            className="glass rounded-3xl p-6 sm:p-10 md:p-14"
            style={{ boxShadow: "var(--shadow-elevated), var(--shadow-glow)" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              Sprechen wir über Auszubildende und{" "}
              <span className="gradient-text">Fachkräfte aus Marokko</span>.
            </h2>
            <p className="text-muted-foreground mt-4 text-base sm:text-lg">
              Wir prüfen Ihren Bedarf und zeigen Ihnen den nächsten realistischen Schritt.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/kontakt" className="btn-primary inline-flex items-center gap-2">
                Beratung für Unternehmen <ArrowRight size={16} />
              </Link>
              <Link to="/prozess" className="btn-secondary inline-flex items-center gap-2">
                Prozess ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
