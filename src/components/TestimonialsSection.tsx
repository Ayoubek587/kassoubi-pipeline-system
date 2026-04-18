import { motion } from "framer-motion";
import { Play, Quote, ArrowRight, MapPin, Award } from "lucide-react";

const stories = [
  {
    name: "Ahmed K.",
    age: 22,
    journey: "Tunesien",
    arrow: "Deutschland",
    city: "München",
    role: "Ausbildung Pflege",
    before: "Arbeitslos in Tunis, kein Deutsch, keine Perspektive",
    after: "B2-Zertifikat, Festvertrag in Top-Klinik München",
    outcome: "Festanstellung + Visum",
    quote: "Kassoubi hat mir eine echte Chance gegeben. Heute arbeite ich in einer der besten Kliniken Münchens.",
  },
  {
    name: "Fatima R.",
    age: 24,
    journey: "Marokko",
    arrow: "Deutschland",
    city: "Hamburg",
    role: "Ausbildung Hotelfach",
    before: "Keine Deutschkenntnisse, kein Plan für die Zukunft",
    after: "B2-Niveau, übernommen nach Ausbildung",
    outcome: "Ausbildungsvertrag + Wohnung",
    quote: "Die Sprachkurse waren intensiv aber fair. Das Team hat mich nie allein gelassen.",
  },
  {
    name: "Youssef M.",
    age: 21,
    journey: "Ägypten",
    arrow: "Deutschland",
    city: "Berlin",
    role: "Ausbildung Elektrotechnik",
    before: "Studium abgebrochen, finanziell unter Druck",
    after: "Top-Azubi im Betrieb, Perspektive Meister",
    outcome: "Visum + Festanstellung",
    quote: "Vom ersten Tag an fühlte ich mich willkommen. Kassoubi hat alles organisiert.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding overflow-hidden">
      <div className="noise-overlay" />
      <div className="glow-blob w-[450px] h-[450px] top-[10%] left-[-150px]" style={{ background: "var(--blob-primary)" }} />
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
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto text-lg">
            Vom Heimatland bis zum Festvertrag — so sieht der Weg aus.
          </p>
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

        {/* Story cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="glass glass-hover-lift rounded-2xl p-6 flex flex-col"
            >
              {/* Journey header */}
              <div className="flex items-center gap-2 text-xs font-semibold mb-4">
                <MapPin size={12} className="text-primary" />
                <span className="text-muted-foreground">{story.journey}</span>
                <ArrowRight size={12} className="text-primary" />
                <span className="gradient-text">{story.arrow}</span>
                <span className="text-muted-foreground">· {story.city}</span>
              </div>

              <Quote size={18} className="text-primary mb-3 opacity-60" />
              <p className="text-sm text-foreground italic leading-relaxed mb-5">"{story.quote}"</p>

              <div className="border-t border-border pt-4 mt-auto">
                <div className="font-semibold text-sm">{story.name}, {story.age}</div>
                <div className="text-xs text-muted-foreground mb-4">{story.role}</div>

                {/* Before / After */}
                <div className="space-y-3">
                  <div
                    className="rounded-lg px-3 py-2"
                    style={{ background: "oklch(0.62 0.22 30 / 8%)", border: "1px solid oklch(0.62 0.22 30 / 18%)" }}
                  >
                    <div className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{ color: "oklch(0.78 0.16 35)" }}>
                      Vorher
                    </div>
                    <div className="text-xs text-foreground/80">{story.before}</div>
                  </div>
                  <div
                    className="rounded-lg px-3 py-2"
                    style={{ background: "oklch(0.65 0.18 160 / 8%)", border: "1px solid oklch(0.65 0.18 160 / 22%)" }}
                  >
                    <div className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{ color: "oklch(0.78 0.16 160)" }}>
                      Nachher
                    </div>
                    <div className="text-xs text-foreground">{story.after}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold">
                  <Award size={12} className="text-accent" />
                  <span className="gradient-text">Ergebnis: {story.outcome}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
