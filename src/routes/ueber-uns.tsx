import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Target, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über uns — Verlässlicher Partner für internationale Ausbildung | Kassoubi" },
      { name: "description", content: "Kassoubi verbindet internationale Auszubildende mit deutschen Unternehmen — als systematischer Rekrutierungsprozess für Ausbildung." },
      { property: "og:title", content: "Über uns — Kassoubi Immigration & Recruitment" },
      { property: "og:description", content: "Verlässlicher Partner für internationale Ausbildung — strukturiert, transparent und langfristig orientiert." },
    ],
  }),
  component: UeberUnsPage,
});

const pillars = [
  { icon: Compass, title: "Unsere Story", desc: "Kassoubi wurde gegründet, um ein konkretes Problem zu lösen: unbesetzte Ausbildungsplätze in Deutschland — trotz tausender motivierter Bewerber im Ausland." },
  { icon: Target, title: "Unsere Mission", desc: "Wir verbinden internationale Auszubildende mit deutschen Unternehmen — strukturiert, transparent und langfristig orientiert." },
  { icon: ShieldCheck, title: "Unsere Positionierung", desc: "Kein klassisches Vermittlungsbüro. Sondern ein systematischer Rekrutierungsprozess für internationale Azubis — mit klaren Standards und Verantwortung." },
];

function UeberUnsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="glow-blob w-[600px] h-[600px] top-[-200px] right-[-150px]" style={{ background: "var(--blob-primary)" }} />
        <div className="mx-auto max-w-4xl px-5 text-center relative z-10">
          <span className="h-eyebrow mb-6">Über uns</span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Verlässlicher Partner für <span className="gradient-text">internationale Ausbildung</span>
          </motion.h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Wir bauen Brücken zwischen motivierten Auszubildenden im Ausland und deutschen Unternehmen — strukturiert, transparent und langfristig.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass glass-hover-lift rounded-2xl p-8"
              >
                <div className="icon-tile h-12 w-12 mb-5"><p.icon size={22} /></div>
                <h3 className="text-xl font-semibold mb-3 tracking-tight">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-3xl text-center">
          <div className="glass rounded-3xl p-10 md:p-14" style={{ boxShadow: "var(--shadow-elevated)" }}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Sprechen Sie mit uns</h2>
            <p className="text-muted-foreground mt-4">Wir freuen uns auf Ihren Kontakt — Antwort innerhalb von 48 Stunden.</p>
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
