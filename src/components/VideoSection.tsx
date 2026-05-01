import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

type Props = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export default function VideoSection({
  eyebrow = "Video",
  title = "So funktioniert unsere Vermittlung",
  description = "In 2 Minuten erklären wir Ihnen unseren strukturierten Prozess.",
}: Props) {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10 sm:mb-12">
          <span className="h-eyebrow mb-5">{eyebrow}</span>
          <h2 className="h-display mt-5">{title}</h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-base sm:text-lg">
            {description}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl overflow-hidden"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          <div
            className="relative aspect-video flex items-center justify-center group cursor-pointer"
            style={{ background: "var(--gradient-card)" }}
          >
            <div className="absolute inset-0 opacity-50" style={{ background: "var(--gradient-glow)" }} />
            <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
              <div className="icon-tile w-20 h-20 rounded-full transition-transform group-hover:scale-110">
                <PlayCircle size={36} />
              </div>
              <div className="text-sm font-semibold tracking-tight">Video bald verfügbar</div>
              <div className="text-xs text-muted-foreground max-w-sm">
                Strukturierter Ablauf · Internationale Pipeline · Planbare Ergebnisse
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
