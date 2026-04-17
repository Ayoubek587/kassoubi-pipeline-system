import { motion } from "framer-motion";
import { UserCheck, Languages, HeartHandshake, Plane } from "lucide-react";

const cards = [
  {
    icon: UserCheck,
    title: "Vorqualifizierte Kandidaten",
    desc: "Jeder Kandidat durchläuft ein mehrstufiges Assessment — fachlich, sprachlich und kulturell.",
    stat: "3-stufiges Assessment",
  },
  {
    icon: Languages,
    title: "Deutsch B1/B2 garantiert",
    desc: "Intensive Sprachkurse mit zertifizierten Lehrkräften. Prüfungserfolg ist vertraglich garantiert.",
    stat: "96% Prüfungserfolg",
  },
  {
    icon: HeartHandshake,
    title: "End-to-End Betreuung",
    desc: "Von der ersten Kontaktaufnahme bis zur erfolgreichen Probezeit — ein Ansprechpartner für alles.",
    stat: "12 Monate Begleitung",
  },
  {
    icon: Plane,
    title: "Visum + Integration",
    desc: "Wir übernehmen den kompletten Visa-Prozess und unterstützen bei Wohnung, Konto und Behördengängen.",
    stat: "98% Visumserfolg",
  },
];

const bigStats = [
  { value: "120+", label: "Erfolgreiche Vermittlungen" },
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
      <div className="glow-blob w-[500px] h-[500px] top-[10%] right-[-200px]" style={{ background: "oklch(0.7 0.15 195 / 12%)" }} />
      <div className="glow-blob w-[400px] h-[400px] bottom-[5%] left-[-150px]" style={{ background: "oklch(0.65 0.2 250 / 10%)" }} />
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="h-eyebrow mb-5">Authority</span>
          <h2 className="h-display mt-5">
            Warum <span className="gradient-text">Kassoubi?</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto text-lg">
            Wir sind kein gewöhnliches Vermittlungsbüro. Wir sind ein System für planbare Ergebnisse.
          </p>
        </motion.div>

        {/* Big stats bar */}
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
              <h3 className="font-semibold mb-2 text-base tracking-tight">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{card.desc}</p>
              <div className="text-xs font-semibold gradient-text tracking-wide">{card.stat}</div>
            </motion.div>
          ))}
        </div>

        {/* Partner logos strip */}
        <div className="mt-14">
          <div className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Vertrauen von Partnern in ganz Deutschland
          </div>
          <div className="glass rounded-2xl p-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {partners.map((p) => (
              <div
                key={p}
                className="text-sm md:text-base font-semibold tracking-tight opacity-70 hover:opacity-100 transition-opacity"
                style={{ color: "oklch(0.78 0.04 250)" }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Mini testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="glass rounded-2xl p-6 md:p-8 mt-10 max-w-3xl mx-auto text-center"
        >
          <p className="text-foreground italic leading-relaxed">
            „Kassoubi hat uns innerhalb von 3 Monaten 8 qualifizierte Azubis vermittelt. Alle mit B1-Zertifikat und sofort einsatzbereit."
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            — Thomas M., Geschäftsführer Pflegeeinrichtung München
          </div>
        </motion.div>
      </div>
    </section>
  );
}
