import { motion } from "framer-motion";
import { GraduationCap, Building2, ArrowRight } from "lucide-react";

const cards = [
  {
    icon: GraduationCap,
    title: "Für Azubis",
    desc: "Starte deine Karriere in Deutschland mit einer anerkannten Ausbildung. Wir begleiten dich von der Bewerbung bis zur Integration.",
    cta: "Ausbildung starten",
    href: "#bewerber",
  },
  {
    icon: Building2,
    title: "Für Unternehmen",
    desc: "Sichern Sie sich vorqualifizierte, deutschsprachige Fachkräfte für Ihre offenen Stellen — planbar und ohne Ausfallrisiko.",
    cta: "Fachkräfte sichern",
    href: "#kontakt",
  },
];

export default function SegmentationSection() {
  return (
    <section id="bewerber" className="section-padding relative">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Wofür interessieren <span className="gradient-text">Sie sich?</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.a
              key={card.title}
              href={card.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-8 group block cursor-pointer transition-shadow"
            >
              <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "oklch(0.65 0.2 250 / 12%)" }}>
                <card.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{card.desc}</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                {card.cta} <ArrowRight size={14} />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
