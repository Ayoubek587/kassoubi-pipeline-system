import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Calendar, GraduationCap, Building2, Globe2, ShieldCheck, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UrgencyStrip from "../components/UrgencyStrip";
import PipelineSection from "../components/PipelineSection";
import AuthoritySection from "../components/AuthoritySection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kassoubi – Immigration & Recruitment | Internationale Fachkräfte für Deutschland" },
      { name: "description", content: "Wir verbinden internationale Fachkräfte mit deutschen Unternehmen. Strukturierte Rekrutierung aus dem Ausland — schnell, planbar und zuverlässig." },
      { property: "og:title", content: "Kassoubi – Immigration & Recruitment" },
      { property: "og:description", content: "Wir verbinden internationale Fachkräfte mit deutschen Unternehmen." },
    ],
  }),
  component: Index,
});

const trustItems = [
  "+500 Kandidaten im Netzwerk",
  "+50 Partnerunternehmen",
  "B1–B2 geprüft",
  "Schnelle Vermittlung",
];

const pillars = [
  { icon: Globe2, title: "International Sourcing", desc: "Direkter Zugang zu qualifizierten Talenten im Ausland." },
  { icon: ShieldCheck, title: "Strukturierter Prozess", desc: "Eine geprüfte Pipeline statt zufälliger Treffer." },
  { icon: CheckCircle2, title: "Vorausgewählte Kandidaten", desc: "Sprachlich, fachlich und kulturell vorbereitet." },
  { icon: Clock, title: "Zeitersparnis", desc: "Wir übernehmen Auswahl, Vorbereitung und Koordination." },
];

const stats = [
  { v: "+500", l: "Kandidaten im Netzwerk" },
  { v: "+50", l: "Partnerunternehmen" },
  { v: "48h", l: "Reaktionszeit" },
  { v: "98%", l: "Visumserfolg" },
];

function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-hero)" }} />
      <div className="glow-blob w-[600px] h-[600px] top-[-150px] left-[-150px]" style={{ background: "var(--blob-primary)" }} />
      <div className="glow-blob w-[500px] h-[500px] bottom-[-100px] right-[-100px]" style={{ background: "var(--blob-accent)" }} />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="h-eyebrow mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Immigration & Recruitment
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          Wir verbinden{" "}
          <span className="gradient-text">internationale Fachkräfte</span>
          <br className="hidden sm:block" />
          {" "}mit deutschen Unternehmen
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-muted-foreground"
        >
          Effiziente Rekrutierung aus dem Ausland — strukturiert, schnell und zuverlässig.
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
      desc: "Internationale Fachkräfte strukturiert gewinnen — wir liefern geprüfte Talente passgenau für Ihren Bedarf.",
      cta: "Kontakt aufnehmen",
      to: "/unternehmen" as const,
      badge: "B2B",
    },
    {
      icon: GraduationCap,
      title: "Für Bewerber",
      desc: "Ihr Weg nach Deutschland — Ausbildung und Jobs mit voller Begleitung. Kostenlos für Bewerber.",
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
              className="glass glass-hover-lift rounded-2xl p-8 md:p-10 group block"
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
          <h2 className="h-display mt-5">Vier Säulen für <span className="gradient-text">planbare Ergebnisse</span></h2>
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

function ClosingCTA() {
  return (
    <section className="section-padding overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />
      <div className="glow-blob w-[700px] h-[700px] top-[-200px] left-[10%]" style={{ background: "var(--blob-primary)" }} />
      <div className="mx-auto max-w-4xl relative z-10 text-center">
        <div className="glass rounded-3xl p-10 md:p-16" style={{ boxShadow: "var(--shadow-elevated), var(--shadow-glow)" }}>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
            Finden Sie die richtigen <span className="gradient-text">Talente</span> — ohne Aufwand
          </h2>
          <p className="text-muted-foreground mt-6 text-lg max-w-2xl mx-auto">
            Sprechen Sie mit uns. Wir melden uns innerhalb von 48 Stunden mit einem strukturierten nächsten Schritt.
          </p>
          <div className="mt-10 flex justify-center">
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
      <ServicesSplit />
      <WhyUs />
      <AuthoritySection />
      <PipelineSection />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
