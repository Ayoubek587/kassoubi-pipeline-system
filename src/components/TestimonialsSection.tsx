import { motion } from "framer-motion";
import { Quote, ArrowRight, MapPin, Award, PlayCircle } from "lucide-react";

// Generic placeholder structure — fill with real stories when available.
const stories = [
  {
    initial: "A.",
    origin: "Herkunftsland",
    city: "München",
    role: "Ausbildung Pflege",
    before: "Ausbildungssuche im Ausland, keine Deutschkenntnisse, unklare Perspektive.",
    after: "B2-Zertifikat, Ausbildungsvertrag und Aufenthaltstitel in Deutschland.",
    outcome: "Vertrag + Aufenthalt",
    quote: "Strukturierter Prozess von Anfang bis Ende — ich wurde auf jedem Schritt begleitet.",
  },
  {
    initial: "F.",
    origin: "Herkunftsland",
    city: "Hamburg",
    role: "Ausbildung Hotelfach",
    before: "Keine Deutschkenntnisse, kein Plan für die berufliche Zukunft.",
    after: "B2-Niveau erreicht, Ausbildungsplatz und Wohnung in Deutschland.",
    outcome: "Ausbildung + Wohnung",
    quote: "Die Vorbereitung im Heimatland hat den Einstieg in Deutschland deutlich erleichtert.",
  },
  {
    initial: "Y.",
    origin: "Herkunftsland",
    city: "Berlin",
    role: "Ausbildung Elektrotechnik",
    before: "Studium abgebrochen, finanziell unter Druck, keine internationale Perspektive.",
    after: "Vertrag mit deutschem Betrieb, Visum und langfristige Karriereperspektive.",
    outcome: "Visum + Festanstellung",
    quote: "Vom ersten Kontakt bis zum Arbeitsantritt — ein klarer Prozess ohne Überraschungen.",
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
          className="text-center mb-14"
        >
          <span className="h-eyebrow mb-5">Stories</span>
          <h2 className="h-display mt-5">
            Vom Herkunftsland <span className="gradient-text">nach Deutschland</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-lg">
            Echte Wege internationaler Auszubildender — von der Vorbereitung im Heimatland bis zum Ausbildungsvertrag in Deutschland.
          </p>
        </motion.div>

        {/* Featured video placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl overflow-hidden mb-10 max-w-4xl mx-auto"
        >
          <div
            className="relative aspect-video flex items-center justify-center group cursor-pointer"
            style={{ background: "var(--gradient-card)" }}
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{ background: "var(--gradient-glow)" }}
            />
            <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
              <div className="icon-tile w-16 h-16 rounded-full transition-transform group-hover:scale-110">
                <PlayCircle size={32} />
              </div>
              <div className="text-sm font-semibold text-foreground">Video-Testimonial</div>
              <div className="text-xs text-muted-foreground max-w-sm">
                Erfahrungen aus dem Vermittlungsprozess werden hier kuratiert eingebunden.
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="glass glass-hover-lift rounded-2xl p-6 flex flex-col"
            >
              <div className="flex items-center gap-2 text-xs font-semibold mb-4 flex-wrap">
                <MapPin size={12} className="text-primary" />
                <span className="text-muted-foreground">{story.origin}</span>
                <ArrowRight size={12} className="text-primary" />
                <span className="gradient-text">Deutschland · {story.city}</span>
              </div>

              <Quote size={18} className="text-primary mb-3 opacity-60" />
              <p className="text-sm text-foreground italic leading-relaxed mb-5">"{story.quote}"</p>

              <div className="border-t border-border pt-4 mt-auto">
                <div className="font-semibold text-sm">Bewerber {story.initial}</div>
                <div className="text-xs text-muted-foreground mb-4">{story.role}</div>

                <div className="space-y-3">
                  <div
                    className="rounded-lg px-3 py-2"
                    style={{
                      background: "color-mix(in oklab, var(--accent) 8%, transparent)",
                      border: "1px solid color-mix(in oklab, var(--accent) 22%, transparent)",
                    }}
                  >
                    <div
                      className="text-[10px] uppercase tracking-wider font-semibold mb-1"
                      style={{ color: "var(--accent)" }}
                    >
                      Vorher
                    </div>
                    <div className="text-xs text-foreground/85">{story.before}</div>
                  </div>
                  <div
                    className="rounded-lg px-3 py-2"
                    style={{
                      background: "color-mix(in oklab, var(--primary) 8%, transparent)",
                      border: "1px solid color-mix(in oklab, var(--primary) 24%, transparent)",
                    }}
                  >
                    <div
                      className="text-[10px] uppercase tracking-wider font-semibold mb-1"
                      style={{ color: "var(--primary)" }}
                    >
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

        <p className="text-center text-xs text-muted-foreground mt-8">
          Beispielhafte Darstellung typischer Verläufe. Persönliche Daten anonymisiert.
        </p>
      </div>
    </section>
  );
}
