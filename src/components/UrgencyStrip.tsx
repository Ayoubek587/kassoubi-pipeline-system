import { Clock, Zap, ShieldCheck } from "lucide-react";

const items = [
  { icon: Zap, text: "Internationale Azubis · planbar verfügbar" },
  { icon: Clock, text: "Rückmeldung innerhalb von 48 Stunden" },
  { icon: ShieldCheck, text: "Strukturierter Prozess · End-to-End begleitet" },
];

export default function UrgencyStrip() {
  return (
    <div
      className="w-full"
      style={{
        background:
          "linear-gradient(90deg, color-mix(in oklab, var(--glow) 12%, transparent), color-mix(in oklab, var(--glow-secondary) 10%, transparent), color-mix(in oklab, var(--glow) 12%, transparent))",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
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
