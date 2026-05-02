import { Flame } from "lucide-react";

export default function UrgencyBadge({ text = "Nur noch wenige Plätze diesen Monat" }: { text?: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
      style={{
        background: "color-mix(in oklab, var(--accent) 12%, transparent)",
        border: "1px solid color-mix(in oklab, var(--accent) 28%, transparent)",
        color: "var(--accent)",
      }}
    >
      <Flame size={12} />
      {text}
    </div>
  );
}
