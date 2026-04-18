import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Clock, BadgeEuro, AlertTriangle, ArrowRight } from "lucide-react";

function useAnimatedNumber(value: number, duration = 500) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const start = display;
    const delta = value - start;
    const startTime = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(start + delta * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return display;
}

export default function ROISection() {
  const [stellen, setStellen] = useState(3);
  const [monate, setMonate] = useState(6);
  const costPerMonth = 2500;
  const totalLoss = stellen * monate * costPerMonth;
  const animated = useAnimatedNumber(totalLoss);

  // Severity 0..1 for color transition red → green (inverted: more loss = redder)
  const maxLoss = 20 * 24 * costPerMonth;
  const severity = Math.min(1, totalLoss / (maxLoss * 0.4)); // saturates earlier
  // Hue: green ~150 → red ~25
  const hue = 150 - severity * 125;
  const numberColor = `oklch(0.72 0.18 ${hue})`;
  const glowColor = `oklch(0.65 0.22 ${hue} / 35%)`;

  return (
    <section id="unternehmen" className="section-padding overflow-hidden">
      <div className="noise-overlay" />
      <div className="glow-blob w-[500px] h-[500px] top-[-100px] right-[-150px]" style={{ background: "var(--blob-accent)" }} />
      <div className="mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="h-eyebrow mb-5">ROI</span>
          <h2 className="h-display mt-5">
            Was kostet Sie <span className="gradient-text">unbesetzte Stellen?</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto text-lg">
            Berechnen Sie den wirtschaftlichen Verlust — und warum sich eine Pipeline lohnt.
          </p>

          <div
            className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{
              background: "oklch(0.62 0.22 30 / 10%)",
              border: "1px solid oklch(0.62 0.22 30 / 28%)",
              color: "oklch(0.78 0.16 35)",
            }}
          >
            <AlertTriangle size={14} />
            Jede unbesetzte Stelle kostet bis zu 2.500 € pro Monat
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-6 md:p-10"
        >
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-3 block">
                  Unbesetzte Stellen: <span className="text-foreground font-semibold">{stellen}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={stellen}
                  onChange={(e) => setStellen(Number(e.target.value))}
                  className="w-full h-2 rounded-full"
                  style={{ accentColor: "oklch(0.65 0.2 250)" }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1</span><span>20</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-3 block">
                  Monate unbesetzt: <span className="text-foreground font-semibold">{monate}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={24}
                  value={monate}
                  onChange={(e) => setMonate(Number(e.target.value))}
                  className="w-full h-2 rounded-full"
                  style={{ accentColor: "oklch(0.65 0.2 250)" }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1</span><span>24</span>
                </div>
              </div>

              {/* Severity bar */}
              <div>
                <div className="text-xs text-muted-foreground mb-2">Risiko-Level</div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "oklch(1 0 0 / 6%)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    animate={{ width: `${Math.max(8, severity * 100)}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                      background: `linear-gradient(90deg, oklch(0.72 0.18 150), oklch(0.72 0.18 ${hue}))`,
                      boxShadow: `0 0 20px ${glowColor}`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Calculator size={16} /> Geschätzter Verlust
              </div>
              <motion.div
                key={Math.round(totalLoss / 5000)}
                initial={{ scale: 0.97 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
                className="text-4xl md:text-6xl font-bold tracking-tight mb-6 tabular-nums"
                style={{
                  color: numberColor,
                  textShadow: `0 0 40px ${glowColor}`,
                  transition: "color 0.5s ease, text-shadow 0.5s ease",
                }}
              >
                {animated.toLocaleString("de-DE")} €
              </motion.div>

              <div className="space-y-3">
                {[
                  { icon: TrendingUp, text: "Produktivitätsverlust pro Stelle" },
                  { icon: Clock, text: "Ø 6 Monate bis zur Besetzung" },
                  { icon: BadgeEuro, text: `${costPerMonth.toLocaleString("de-DE")} € Kosten/Monat/Stelle` },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <item.icon size={14} className="text-accent shrink-0" />
                    {item.text}
                  </div>
                ))}
              </div>

              <a href="#kontakt" className="btn-primary mt-8 inline-flex items-center justify-center gap-2">
                Pipeline starten <ArrowRight size={16} />
              </a>
              <div className="mt-3 text-xs text-center text-muted-foreground">
                Antwort innerhalb von 48 Stunden — limitierte Plätze pro Monat
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
