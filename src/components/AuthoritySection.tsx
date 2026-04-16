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

export default function AuthoritySection() {
  return (
    <section id="authority" className="section-padding relative">
      <div className="glow-blob w-[500px] h-[500px] top-[10%] right-[-200px]" style={{ background: "oklch(0.7 0.15 195 / 12%)" }} />
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Warum <span className="gradient-text">Kassoubi?</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Wir sind kein gewöhnliches Vermittlungsbüro. Wir sind ein System für planbare Ergebnisse.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 transition-shadow"
            >
              <div className="h-10 w-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "oklch(0.65 0.2 250 / 12%)" }}>
                <card.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{card.desc}</p>
              <div className="text-xs font-medium gradient-text">{card.stat}</div>
            </motion.div>
          ))}
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
