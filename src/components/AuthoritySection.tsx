import { motion } from "framer-motion";
import { Globe2, Languages, Handshake, HeartHandshake } from "lucide-react";

const cards = [
  {
    icon: Globe2,
    title: "Gezielte Auswahl im Ausland",
    desc: "Wir identifizieren geeignete Kandidaten bereits im Herkunftsland und prüfen Qualifikation, Motivation und kulturelle Passung.",
    stat: "Mehrstufiges Assessment",
  },
  {
    icon: Languages,
    title: "Sprachliche Vorbereitung",
    desc: "Systematische Vorbereitung bis B1–B2 für einen reibungslosen fachlichen und sozialen Einstieg in Deutschland.",
    stat: "B1–B2 zertifiziert",
  },
  {
    icon: Handshake,
    title: "Strukturiertes Matching",
    desc: "Passgenaue Zuordnung zwischen internationalen Kandidaten und deutschen Unternehmen basierend auf Anforderungen und Profil.",
    stat: "Branchenspezifisch",
  },
  {
    icon: HeartHandshake,
    title: "Integration & Begleitung",
    desc: "Unterstützung im gesamten Prozess — von Visum und Anreise bis zur erfolgreichen Eingliederung im Betrieb und im Alltag.",
    stat: "End-to-End Betreuung",
  },
];

const bigStats = [
  { value: "120+", label: "Internationale Vermittlungen" },
  { value: "96%", label: "Prüfungserfolg B1/B2" },
  { value: "48h", label: "Reaktionszeit" },
  { value: "98%", label: "Visumserfolg" },
];

const partners = [
  "Pflege München GmbH",
  "Hotel Kontinental",
  "Elektro Berlin AG",
  "Gastro Hamburg",
  "MedCare Frankfurt",
  "Bau Köln eG",
];

export default function AuthoritySection() {
  return (
    <section id="authority" className="section-padding overflow-hidden">
      <div className="noise-overlay" />
      <div className="glow-blob w-[500px] h-[500px] top-[10%] right-[-200px]" style={{ background: "var(--blob-accent)" }} />
      <div className="glow-blob w-[400px] h-[400px] bottom-[5%] left-[-150px]" style={{ background: "var(--blob-primary)" }} />
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="h-eyebrow mb-5">Warum Kassoubi</span>
          <h2 className="h-display mt-5">
            Warum internationale Rekrutierung mit <span className="gradient-text">Kassoubi funktioniert</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-lg">
            Wir sind kein klassisches Vermittlungsbüro. Wir betreiben eine strukturierte Fachkräfte-Pipeline aus dem Ausland nach Deutschland.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-6 md:p-8 mb-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {bigStats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text tracking-tight">{s.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass glass-hover-lift rounded-2xl p-6"
            >
              <div className="icon-tile h-11 w-11 mb-5">
                <card.icon size={20} />
              </div>
              <h3 className="font-semibold mb-2 text-base tracking-tight leading-snug">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{card.desc}</p>
              <div className="text-xs font-semibold gradient-text tracking-wide">{card.stat}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14">
          <div className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Vertrauen von Unternehmen in ganz Deutschland
          </div>
          <div className="glass rounded-2xl p-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {partners.map((p) => (
              <div
                key={p}
                className="text-sm md:text-base font-semibold tracking-tight text-foreground/65 hover:text-foreground transition-colors"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
