import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Calendar, GraduationCap, Building2, Globe2, ShieldCheck, Clock, AlertTriangle, TrendingDown, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UrgencyStrip from "../components/UrgencyStrip";
import PipelineSection from "../components/PipelineSection";
import AuthoritySection from "../components/AuthoritySection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kassoubi – Immigration & Recruitment | Internationale Auszubildende für Deutschland" },
      { name: "description", content: "Wir vermitteln internationale Auszubildende an deutsche Unternehmen — sprachlich vorbereitet, kulturell integriert und langfristig einsetzbar." },
      { property: "og:title", content: "Kassoubi – Internationale Auszubildende für deutsche Unternehmen" },
      { property: "og:description", content: "Strukturierte Rekrutierung motivierter Azubis aus dem Ausland — sprachlich vorbereitet und langfristig einsetzbar." },
    ],
  }),
  component: Index,
});

const trustItems = [
  "+500 Kandidaten im Netzwerk",
  "+50 Partnerunternehmen",
  "B1–B2 sprachlich geprüft",
  "98% Vermittlungsquote",
];

const pillars = [
  { icon: Globe2, title: "Gezieltes internationales Sourcing", desc: "Direkter Zugang zu motivierten Auszubildenden in ausgewählten Herkunftsländern." },
  { icon: ShieldCheck, title: "Mehrstufiges Screening", desc: "Sprache, Motivation und kulturelle Eignung — strukturiert geprüft, bevor Sie investieren." },
  { icon: CheckCircle2, title: "Strukturierter Matching-Prozess", desc: "Passgenaue Zuordnung zu Ihrem Ausbildungsbetrieb — basierend auf Profil, Branche und Standort." },
  { icon: Clock, title: "Begleitete Integration", desc: "Vom Visum bis zum ersten Ausbildungstag — eine durchgängige Betreuung in Deutschland." },
];

const stats = [
  { v: "+500", l: "Kandidaten im Netzwerk" },
  { v: "+50", l: "Partnerunternehmen" },
  { v: "48h", l: "Rückmeldung" },
  { v: "98%", l: "Vermittlungsquote" },
];

const painPoints = [
  { icon: AlertTriangle, text: "Tausende Ausbildungsplätze bleiben jährlich unbesetzt." },
  { icon: TrendingDown, text: "Lokale Bewerber reichen quantitativ und qualitativ nicht mehr aus." },
  { icon: Users, text: "Unternehmen verlieren Wachstum, Planungssicherheit und operative Stabilität." },
];

function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-24 pb-12 px-4">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-hero)" }} />
      <div className="glow-blob w-[600px] h-[600px] top-[-150px] left-[-150px]" style={{ background: "var(--blob-primary)" }} />
      <div className="glow-blob w-[500px] h-[500px] bottom-[-100px] right-[-100px]" style={{ background: "var(--blob-accent)" }} />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="h-eyebrow mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Immigration & Recruitment für Ausbildung
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          Wir vermitteln{" "}
          <span className="gradient-text">internationale Auszubildende</span>
          <br className="hidden sm:block" />
          {" "}an deutsche Unternehmen
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-muted-foreground"
        >
          Strukturierte Rekrutierung motivierter Azubis aus dem Ausland — sprachlich vorbereitet, kulturell integriert und langfristig einsetzbar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/unternehmen" className="btn-primary flex items-center gap-2">
            <Building2 size={16} /> Für Unternehmen <ArrowRight size={16} />
          </Link>
          <Link to="/bewerber" className="btn-secondary flex items-center gap-2">
            <GraduationCap size={16} /> Für Bewerber
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {trustItems.map((t) => (
            <div key={t} className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CheckCircle2 size={13} className="text-accent" />
              <span>{t}</span>
            </div>
          ))}
        </motion.div>
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
            Der Ausbildungsmarkt in Deutschland steht <span className="gradient-text">unter Druck</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-lg">
            Wer heute auf klassische Kanäle setzt, verliert Zeit, Wachstum und Marktanteile.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {painPoints.map((p, i) => (
            <motion.div
              key={p.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6"
            >
              <div className="icon-tile h-11 w-11 mb-4" style={{ color: "var(--warning)", borderColor: "color-mix(in oklab, var(--warning) 25%, transparent)", background: "color-mix(in oklab, var(--warning) 10%, transparent)" }}>
                <p.icon size={20} />
              </div>
              <p className="text-foreground/85 leading-relaxed text-sm">{p.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8 text-center" style={{ boxShadow: "var(--shadow-elevated)" }}>
          <p className="text-base sm:text-lg md:text-xl font-semibold tracking-tight">
            Kassoubi löst dieses Problem durch eine{" "}
            <span className="gradient-text">strukturierte Pipeline internationaler Auszubildender</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="px-5 pb-4 -mt-4 relative z-10">
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

function ServicesSplit() {
  const cards = [
    {
      icon: Building2,
      title: "Für Unternehmen",
      desc: "Internationale Azubis strukturiert gewinnen — statt auf unzuverlässige Bewerbungen zu warten. Wir liefern geprüfte Kandidaten passgenau für Ihre Ausbildungsstellen.",
      cta: "Kontakt aufnehmen",
      to: "/unternehmen" as const,
      badge: "B2B",
    },
    {
      icon: GraduationCap,
      title: "Für Bewerber",
      desc: "Starte deine Ausbildung in Deutschland — mit klarer Begleitung von Anfang bis Ankunft. Komplett kostenfrei für Bewerber.",
      cta: "Jetzt bewerben",
      to: "/bewerber" as const,
      badge: "Kostenlos",
    },
  ];

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <span className="h-eyebrow mb-5">Zwei Wege</span>
          <h2 className="h-display mt-5">Wofür interessieren <span className="gradient-text">Sie sich?</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="glass glass-hover-lift rounded-2xl p-6 sm:p-8 md:p-10 group block"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="icon-tile h-14 w-14"><c.icon size={26} /></div>
                <span className="text-xs font-semibold tracking-wide gradient-text">{c.badge}</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3 tracking-tight">{c.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">{c.desc}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                {c.cta} <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <span className="h-eyebrow mb-5">Warum Kassoubi</span>
          <h2 className="h-display mt-5">Planbare Ergebnisse <span className="gradient-text">statt Zufall</span></h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-lg">
            Vier Säulen, die unsere Vermittlung zu einem belastbaren System machen — nicht zu einem Glücksspiel.
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

function ProcessPreview() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-3xl text-center">
        <span className="h-eyebrow mb-5">Der Weg</span>
        <h2 className="h-display mt-5">
          Vom Herkunftsland bis zum <span className="gradient-text">Vertragsabschluss</span>
        </h2>
        <p className="text-muted-foreground mt-5 text-lg">
          Ein klar definierter Prozess in vier Schritten — transparent, planbar und ohne Überraschungen.
        </p>
        <div className="mt-8">
          <Link to="/prozess" className="btn-secondary inline-flex items-center gap-2">
            Prozess im Detail <ArrowRight size={16} />
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
      <div className="mx-auto max-w-4xl relative z-10 text-center">
        <div className="glass rounded-3xl p-6 sm:p-10 md:p-16" style={{ boxShadow: "var(--shadow-elevated), var(--shadow-glow)" }}>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
            Finden Sie die passenden <span className="gradient-text">Auszubildenden</span> — ohne Zeitverlust
          </h2>
          <p className="text-muted-foreground mt-6 text-base sm:text-lg max-w-2xl mx-auto">
            Sprechen Sie mit uns. Wir melden uns innerhalb von 48 Stunden mit einem strukturierten nächsten Schritt.
          </p>
          <div className="mt-8 sm:mt-10 flex justify-center">
            <Link to="/kontakt" className="btn-primary flex items-center gap-2 text-base">
              <Calendar size={18} /> Termin buchen
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
      <UrgencyStrip />
      <StatsBar />
      <PainSection />
      <ServicesSplit />
      <AuthoritySection />
      <WhyUs />
      <PipelineSection />
      <ProcessPreview />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
