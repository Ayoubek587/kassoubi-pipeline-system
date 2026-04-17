import { Flame } from "lucide-react";

export default function UrgencyBadge({ text = "Nur noch wenige Plätze diesen Monat" }: { text?: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
      style={{
        background: "oklch(0.62 0.22 30 / 12%)",
        border: "1px solid oklch(0.62 0.22 30 / 30%)",
        color: "oklch(0.78 0.16 35)",
      }}
    >
      <Flame size={12} />
      {text}
    </div>
  );
}
