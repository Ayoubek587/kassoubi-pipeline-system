import { motion } from "framer-motion";
import { Play, Quote } from "lucide-react";

const stories = [
  {
    name: "Ahmed K.",
    from: "Tunesien → München",
    role: "Ausbildung Pflege",
    before: "Arbeitslos, ohne Perspektive",
    after: "Festanstellung nach Ausbildung, B2-Niveau",
    quote: "Kassoubi hat mir eine echte Chance gegeben. Heute arbeite ich in einer der besten Kliniken Münchens.",
  },
  {
    name: "Fatima R.",
    from: "Marokko → Hamburg",
    role: "Ausbildung Hotelfach",
    before: "Keine Deutschkenntnisse",
    after: "B2-Zertifikat, übernommen nach Ausbildung",
    quote: "Die Sprachkurse waren intensiv aber fair. Das Team hat mich nie allein gelassen.",
  },
  {
    name: "Youssef M.",
    from: "Ägypten → Berlin",
    role: "Ausbildung Elektrotechnik",
    before: "Studium abgebrochen",
    after: "Top-Azubi im Betrieb, Perspektive Meister",
    quote: "Vom ersten Tag an fühlte ich mich willkommen. Kassoubi hat alles organisiert.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding overflow-hidden">
      <div className="noise-overlay" />
      <div className="glow-blob w-[450px] h-[450px] top-[10%] left-[-150px]" style={{ background: "oklch(0.65 0.2 250 / 8%)" }} />
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="h-eyebrow mb-5">Stories</span>
          <h2 className="h-display mt-5">
            Echte <span className="gradient-text">Erfolgsgeschichten</span>
          </h2>
        </motion.div>

        {/* Video placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-2xl aspect-video max-w-3xl mx-auto mb-14 flex items-center justify-center cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.18 0.04 250 / 90%), oklch(0.12 0.03 260 / 90%))" }} />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
              <Play size={24} className="text-primary-foreground ml-1" />
            </div>
            <span className="text-sm text-muted-foreground">Video-Testimonial ansehen</span>
          </div>
        </motion.div>

        {/* Success stories */}
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="glass glass-hover-lift rounded-2xl p-6"
            >
              <Quote size={20} className="text-primary mb-4 opacity-50" />
              <p className="text-sm text-foreground italic leading-relaxed mb-5">"{story.quote}"</p>
              <div className="border-t border-border pt-4">
                <div className="font-semibold text-sm">{story.name}</div>
                <div className="text-xs text-muted-foreground">{story.from} · {story.role}</div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Vorher</div>
                    <div className="text-xs text-muted-foreground">{story.before}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-accent mb-1">Nachher</div>
                    <div className="text-xs text-foreground">{story.after}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
