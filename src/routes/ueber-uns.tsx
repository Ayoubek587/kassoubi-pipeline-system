import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Target, ShieldCheck, Globe2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über uns — Recruiting-Infrastruktur für internationale Ausbildung | Kassoubi" },
      { name: "description", content: "Kassoubi ist kein Vermittler. Wir bauen Recruiting-Infrastruktur — eine internationale Pipeline qualifizierter Auszubildender für deutsche Unternehmen." },
      { property: "og:title", content: "Über uns — Kassoubi" },
      { property: "og:description", content: "Strukturiert, international, langfristig — eine neue Klasse von Ausbildungs-Recruiting." },
    ],
  }),
  component: UeberUnsPage,
});

const pillars = [
  { icon: Compass, title: "Story", desc: "Kassoubi ist aus einem konkreten Problem entstanden: tausende unbesetzte Ausbildungsplätze in Deutschland — und tausende motivierte Bewerber im Ausland. Beide Seiten brauchen Infrastruktur." },
  { icon: Target, title: "Mission", desc: "Wir machen Ausbildungsrekrutierung planbar. Für Unternehmen ein verlässliches System. Für Bewerber ein klarer Weg in ein neues Leben." },
  { icon: ShieldCheck, title: "Positionierung", desc: "Kein klassisches Vermittlungsbüro. Ein strukturiertes Recruiting-System mit definierten Standards, internationaler Pipeline und messbaren Ergebnissen." },
  { icon: Globe2, title: "Vorsprung", desc: "Wir denken international. Während andere im lokalen Markt suchen, betreiben wir eine skalierbare Pipeline jenseits Deutschlands." },
];

function UeberUnsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-20 overflow-hidden">
        <div className="glow-blob w-[600px] h-[600px] top-[-200px] right-[-150px]" style={{ background: "var(--blob-primary)" }} />
        <div className="mx-auto max-w-4xl px-5 text-center relative z-10">
          <span className="h-eyebrow mb-6">Über uns</span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
          >
            Wir bauen die <span className="gradient-text">Infrastruktur</span> für Ausbildungs&shy;rekrutierung.
          </motion.h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Strukturiert. International. Langfristig. Eine neue Klasse von Recruiting — für Unternehmen, die nicht warten wollen.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass glass-hover-lift rounded-2xl p-6 sm:p-8"
              >
                <div className="icon-tile h-12 w-12 mb-5"><p.icon size={22} /></div>
                <h3 className="text-xl font-semibold mb-3 tracking-tight">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />
        <div className="mx-auto max-w-3xl text-center relative z-10">
          <div className="glass rounded-3xl p-6 sm:p-10 md:p-14" style={{ boxShadow: "var(--shadow-elevated), var(--shadow-glow)" }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Sprechen wir über Ihre <span className="gradient-text">Pipeline</span>.
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
