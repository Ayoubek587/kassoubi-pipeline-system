import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  GraduationCap,
  ArrowRight,
  Globe2,
  Briefcase,
  CalendarCheck,
  HeartHandshake,
  Languages,
  Sparkles,
} from "lucide-react";

type Mode = "unternehmen" | "bewerber";

const content = {
  unternehmen: {
    icon: Building2,
    headline: "Internationale Fachkräfte strukturiert gewinnen",
    micro: "Individuelle Lösungen für Ihren Bedarf",
    points: [
      { icon: Globe2, title: "Zugriff auf geprüfte Talente aus dem Ausland", desc: "Vorqualifizierte Kandidaten mit passender Qualifikation und B1–B2 Sprachniveau." },
      { icon: Briefcase, title: "Reduzierter interner Aufwand", desc: "Wir übernehmen Auswahl, Vorbereitung, Visum und Onboarding-Koordination." },
      { icon: CalendarCheck, title: "Planbare Besetzung offener Stellen", desc: "Strukturierte Pipeline mit definierten Zeitfenstern statt Glückstreffer." },
      { icon: HeartHandshake, title: "Persönliche Betreuung", desc: "Ein fester Ansprechpartner für den gesamten Prozess." },
    ],
    cta: "Kontakt aufnehmen",
    ctaHref: "#kontakt",
  },
  bewerber: {
    icon: GraduationCap,
    headline: "Ihr Weg nach Deutschland — klar strukturiert",
    micro: "Für Bewerber ist unser Service kostenlos",
    points: [
      { icon: Languages, title: "Vorbereitung im Heimatland", desc: "Sprachkurs bis B1–B2 und fachliche Vorbereitung — bevor Sie einreisen." },
      { icon: HeartHandshake, title: "Unterstützung im gesamten Prozess", desc: "Von der Bewerbung über das Visum bis zur Integration in Deutschland." },
      { icon: Sparkles, title: "Kostenloser Service für Bewerber", desc: "Keine versteckten Kosten — komplett kostenfrei für Sie." },
      { icon: CalendarCheck, title: "Strukturierter Ablauf", desc: "Klare Schritte, klare Erwartungen, ein fester Ansprechpartner." },
    ],
    cta: "Kostenlos starten",
    ctaHref: "#kontakt",
  },
} as const;

export default function ROISection() {
  const [mode, setMode] = useState<Mode>("unternehmen");
  const data = content[mode];
  const HeroIcon = data.icon;

  return (
    <section id="unternehmen" className="section-padding overflow-hidden">
      <div className="noise-overlay" />
      <div
        className="glow-blob w-[500px] h-[500px] top-[-100px] right-[-150px]"
        style={{ background: "var(--blob-accent)" }}
      />
      <div className="mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="h-eyebrow mb-5">Ihr nächster Schritt</span>
          <h2 className="h-display mt-5">
            Ihr nächster Schritt <span className="gradient-text">mit Barakah</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto text-lg">
            So profitieren Unternehmen und Bewerber — wählen Sie Ihren Weg.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div
            className="relative inline-flex items-center rounded-full p-1 glass"
            role="tablist"
            aria-label="Zielgruppe wählen"
          >
            {(["unternehmen", "bewerber"] as Mode[]).map((m) => {
              const active = mode === m;
              return (
                <button
                  key={m}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMode(m)}
                  className="relative z-10 px-5 sm:px-7 py-2.5 text-sm font-semibold rounded-full transition-colors"
                  style={{ color: active ? "var(--primary-foreground)" : "var(--muted-foreground)" }}
                >
                  {active && (
                    <motion.span
                      layoutId="audience-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "var(--gradient-primary, var(--primary))" }}
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    />
                  )}
                  <span className="relative inline-flex items-center gap-2">
                    {m === "unternehmen" ? <Building2 size={14} /> : <GraduationCap size={14} />}
                    {m === "unternehmen" ? "Für Unternehmen" : "Für Bewerber"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass rounded-2xl p-6 md:p-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid md:grid-cols-2 gap-10 items-center"
            >
              <div>
                <div className="icon-tile h-14 w-14 mb-5">
                  <HeroIcon size={26} />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-snug mb-3">
                  {data.headline}
                </h3>
                <p className="text-muted-foreground text-base mb-6">{data.micro}</p>

                <a
                  href={data.ctaHref}
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  {data.cta} <ArrowRight size={16} />
                </a>
                <div className="mt-3 text-xs text-muted-foreground">
                  Antwort innerhalb von 48 Stunden
                </div>
              </div>

              <ul className="space-y-4">
                {data.points.map((p, i) => (
                  <motion.li
                    key={p.title}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
                    className="flex items-start gap-3 rounded-xl p-3"
                    style={{ background: "color-mix(in oklab, var(--foreground) 4%, transparent)" }}
                  >
                    <div className="icon-tile h-10 w-10 shrink-0">
                      <p.icon size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm md:text-base">{p.title}</div>
                      <div className="text-sm text-muted-foreground">{p.desc}</div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
