import { motion } from "framer-motion";
import { GraduationCap, Building2, ArrowRight } from "lucide-react";
import UrgencyBadge from "./UrgencyBadge";

const cards = [
  {
    icon: GraduationCap,
    title: "Ich suche eine Ausbildung in Deutschland",
    desc: "Starte deine Karriere mit einer anerkannten Ausbildung. Wir begleiten dich von der Bewerbung über das Visum bis zur Integration in Deutschland.",
    cta: "Jetzt Ausbildung sichern",
    href: "#kontakt",
    badge: "Nur 25 Plätze pro Monat",
  },
  {
    icon: Building2,
    title: "Ich suche qualifizierte Fachkräfte",
    desc: "Sichern Sie sich vorqualifizierte, deutschsprachige Fachkräfte für Ihre offenen Stellen — planbar, in 48h Reaktionszeit und ohne Ausfallrisiko.",
    cta: "Fachkräfte-Pipeline starten",
    href: "#kontakt",
    badge: "48h Reaktionszeit",
  },
];

export default function SegmentationSection() {
  return (
    <section id="bewerber" className="section-padding overflow-hidden">
      <div className="noise-overlay" />
      <div className="glow-blob w-[500px] h-[500px] top-[-100px] right-[-150px]" style={{ background: "oklch(0.65 0.2 250 / 10%)" }} />
      <div className="mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="h-eyebrow mb-5">Zwei Wege</span>
          <h2 className="h-display mt-5">
            Wofür interessieren <span className="gradient-text">Sie sich?</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto text-lg">
            Wählen Sie Ihren Weg — wir melden uns innerhalb von 48 Stunden.
          </p>
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
              className="glass glass-hover-lift rounded-2xl p-8 md:p-10 group block cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="icon-tile h-14 w-14">
                  <card.icon size={26} />
                </div>
                <UrgencyBadge text={card.badge} />
              </div>
              <h3 className="text-2xl font-semibold mb-3 tracking-tight leading-snug">{card.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">{card.desc}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                {card.cta} <ArrowRight size={14} />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
