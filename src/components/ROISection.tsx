import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Clock, BadgeEuro } from "lucide-react";

export default function ROISection() {
  const [stellen, setStellen] = useState(3);
  const [monate, setMonate] = useState(6);
  const costPerMonth = 4500;
  const totalLoss = stellen * monate * costPerMonth;

  return (
    <section id="unternehmen" className="section-padding relative">
      <div className="mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Was kostet Sie <span className="gradient-text">unbesetzte Stellen?</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Berechnen Sie den wirtschaftlichen Verlust — und warum sich eine Pipeline lohnt.
          </p>
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
                  className="w-full accent-primary h-2 rounded-full"
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
            </div>

            <div className="flex flex-col justify-center">
              <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Calculator size={16} /> Geschätzter Verlust
              </div>
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                {totalLoss.toLocaleString("de-DE")} €
              </div>

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

              <a href="#kontakt" className="btn-primary mt-8 text-center">
                Jetzt Pipeline aufbauen
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
