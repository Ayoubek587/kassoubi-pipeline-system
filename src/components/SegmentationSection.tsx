import { motion } from "framer-motion";
import { GraduationCap, Building2, ArrowRight } from "lucide-react";
import UrgencyBadge from "./UrgencyBadge";

const cards = [
  {
    icon: Building2,
    title: "Internationale Fachkräfte für Ihr Unternehmen gewinnen",
    desc: "Wir identifizieren, qualifizieren und vermitteln Talente aus dem Ausland — passgenau für Ihren Bedarf und Ihre Branche.",
    cta: "Fachkräfte sichern",
    href: "/kontakt",
    badge: "48h Reaktionszeit",
  },
  {
    icon: GraduationCap,
    title: "Ausbildung in Deutschland starten — mit strukturiertem Prozess",
    desc: "Wir unterstützen Sie von der Vorbereitung im Heimatland bis zur erfolgreichen Integration in Deutschland.",
    cta: "Kostenlos bewerben",
    href: "/kontakt",
    badge: "Kostenlos für Bewerber",
  },
];

export default function SegmentationSection() {
  return (
    <section id="bewerber" className="section-padding overflow-hidden">
      <div className="noise-overlay" />
      <div className="glow-blob w-[500px] h-[500px] top-[-100px] right-[-150px]" style={{ background: "var(--blob-primary)" }} />
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
            Strukturierte Lösungen für Unternehmen und internationale Bewerber — wir melden uns innerhalb von 48 Stunden.
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
