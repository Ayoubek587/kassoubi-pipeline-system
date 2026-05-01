import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Globe2,
  Wallet,
  GraduationCap,
  FileCheck,
  Search,
  Handshake,
  FileSignature,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bewerberImg from "../assets/bewerber-vision.jpg";

export const Route = createFileRoute("/bewerber")({
  head: () => ({
    meta: [
      { title: "Für Bewerber — Dein neues Leben in Deutschland mit sicherer Ausbildung | Kassoubi" },
      { name: "description", content: "Starte dein neues Leben in Deutschland — mit einer sicheren Ausbildung, klarem Plan und persönlicher Begleitung. Kostenlos für Bewerber." },
      { property: "og:title", content: "Für Bewerber — Neues Leben in Deutschland | Kassoubi" },
      { property: "og:description", content: "Sichere Ausbildung, faires Einkommen, Leben in Europa. Wir begleiten dich Schritt für Schritt." },
    ],
  }),
  component: BewerberPage,
});

const drivers = [
  { icon: GraduationCap, title: "Sichere Ausbildung", desc: "Anerkannte Ausbildung in einem geprüften deutschen Betrieb — mit klarer Perspektive." },
  { icon: Wallet, title: "Faires Einkommen", desc: "Eigenes Gehalt vom ersten Tag an. Finanzielle Unabhängigkeit, statt Warten." },
  { icon: ShieldCheck, title: "Sicherheit & Aufenthalt", desc: "Strukturierte Visumsbegleitung. Stabiler rechtlicher Rahmen für dich und deine Zukunft." },
  { icon: Globe2, title: "Leben in Europa", desc: "Eine neue Stadt, neue Möglichkeiten, eine langfristige Perspektive in Deutschland." },
];

const benefits = [
  { icon: Sparkles, title: "Komplett kostenlos", desc: "Unser Service ist für dich vollständig kostenfrei. Keine Gebühren. Keine Provisionen." },
  { icon: GraduationCap, title: "Geprüfte Ausbildungsplätze", desc: "Nur seriöse, geprüfte Partnerunternehmen — deine Zukunft ist keine Lotterie." },
  { icon: HeartHandshake, title: "Ein fester Ansprechpartner", desc: "Eine Person begleitet dich vom Heimatland bis zum ersten Ausbildungstag." },
];

const steps = [
  { icon: FileCheck, num: "01", title: "Bewerbung", desc: "Du sendest uns deine Unterlagen. Wir prüfen Profil, Motivation und Eignung." },
  { icon: Search, num: "02", title: "Vorbereitung", desc: "Sprachkurs (B1/B2), kulturelles und fachliches Briefing — bevor du einreist." },
  { icon: Handshake, num: "03", title: "Matching", desc: "Wir verbinden dich mit einem deutschen Ausbildungsbetrieb, der zu dir passt." },
  { icon: FileSignature, num: "04", title: "Vertrag & Anreise", desc: "Visum, Wohnung, Anreise. Strukturierte Begleitung bis zum ersten Tag." },
];

function BewerberPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-20 overflow-hidden">
        <div className="glow-blob w-[600px] h-[600px] top-[-200px] right-[-150px]" style={{ background: "var(--blob-primary)" }} />
        <div className="mx-auto max-w-4xl px-5 text-center relative z-10">
          <span className="h-eyebrow mb-6">Für Bewerber</span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
          >
            Starte dein neues Leben in Deutschland — <span className="gradient-text">mit einer sicheren Ausbildung.</span>
          </motion.h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Sprache, Visum, Ausbildungsplatz, Wohnung — wir begleiten dich Schritt für Schritt. Persönlich. Kostenlos. Strukturiert.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/kontakt" className="btn-primary inline-flex items-center gap-2">Jetzt bewerben <ArrowRight size={16} /></Link>
            <Link to="/prozess" className="btn-secondary inline-flex items-center gap-2">So läuft es ab</Link>
          </div>
        </div>
      </section>

      {/* Emotional vision with image */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-3xl overflow-hidden"
              style={{ boxShadow: "var(--shadow-elevated)" }}
            >
              <img
                src={bewerberImg}
                alt="Auszubildender in Deutschland"
                loading="lazy"
                width={1600}
                height={1200}
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </motion.div>

            <div>
              <span className="h-eyebrow mb-5">Deine Zukunft</span>
              <h2 className="h-display mt-5">
                Nicht nur eine Ausbildung. <span className="gradient-text">Ein neues Leben.</span>
              </h2>
              <p className="text-muted-foreground mt-5 text-base sm:text-lg leading-relaxed">
                Eine sichere Ausbildung, ein eigenes Einkommen, ein neues Zuhause in Europa — und eine langfristige Perspektive für dich und deine Familie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional drivers */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="h-eyebrow mb-5">Was du gewinnst</span>
            <h2 className="h-display mt-5">Vier Gründe für <span className="gradient-text">deinen Weg</span>.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {drivers.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass glass-hover-lift rounded-2xl p-6"
              >
                <div className="icon-tile h-12 w-12 mb-5"><d.icon size={22} /></div>
                <h3 className="font-semibold tracking-tight mb-2">{d.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="h-eyebrow mb-5">Unser Versprechen</span>
            <h2 className="h-display mt-5">Was wir <span className="gradient-text">für dich tun</span>.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass glass-hover-lift rounded-2xl p-7"
              >
                <div className="icon-tile h-12 w-12 mb-5"><b.icon size={22} /></div>
                <h3 className="font-semibold text-lg mb-2 tracking-tight">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="h-eyebrow mb-5">Dein Weg</span>
            <h2 className="h-display mt-5">In <span className="gradient-text">vier Schritten</span> nach Deutschland.</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6 relative">
            <div
              className="hidden md:block absolute top-[36px] left-[12.5%] right-[12.5%] h-[2px]"
              style={{
                background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--glow) 35%, transparent), color-mix(in oklab, var(--glow-secondary) 35%, transparent), transparent)",
              }}
            />
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="glass glass-hover-lift rounded-2xl p-6 text-center"
              >
                <div
                  className="icon-tile relative z-10 mx-auto h-[72px] w-[72px] -mt-12 mb-5"
                  style={{ background: "var(--gradient-primary)", borderColor: "color-mix(in oklab, var(--glow) 30%, transparent)" }}
                >
                  <s.icon size={26} className="text-primary-foreground" />
                </div>
                <div className="text-xs font-semibold tracking-widest text-primary mb-2">{s.num}</div>
                <h3 className="font-semibold mb-2 tracking-tight">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />
        <div className="mx-auto max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-6 sm:p-10 md:p-14 text-center"
            style={{ boxShadow: "var(--shadow-elevated), var(--shadow-glow)" }}
          >
            <div className="icon-tile h-12 w-12 mx-auto mb-6"><ShieldCheck size={22} /></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              Mach den ersten Schritt — <span className="gradient-text">deine Zukunft beginnt heute</span>.
            </h2>
            <p className="text-muted-foreground mt-6 text-base sm:text-lg leading-relaxed">
              Wir prüfen dein Profil und melden uns innerhalb von 48 Stunden mit dem nächsten Schritt.
            </p>
            <div className="mt-8">
              <Link to="/kontakt" className="btn-primary inline-flex items-center gap-2">Jetzt bewerben <ArrowRight size={16} /></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
