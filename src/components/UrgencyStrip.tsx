import { Clock, Zap, ShieldCheck } from "lucide-react";

const items = [
  { icon: Zap, text: "Nur begrenzte Plätze pro Monat" },
  { icon: Clock, text: "Schnelle Bearbeitung in 48h" },
  { icon: ShieldCheck, text: "Vertraglich garantierte Qualität" },
];

export default function UrgencyStrip() {
  return (
    <div
      className="w-full"
      style={{
        background:
          "linear-gradient(90deg, oklch(0.65 0.2 250 / 12%), oklch(0.7 0.15 195 / 10%), oklch(0.65 0.2 250 / 12%))",
        borderTop: "1px solid oklch(1 0 0 / 6%)",
        borderBottom: "1px solid oklch(1 0 0 / 6%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 py-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm">
        {items.map((item) => (
          <div key={item.text} className="flex items-center gap-2 text-foreground/85">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <item.icon size={14} className="text-accent" />
            <span className="font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
