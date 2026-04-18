import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Palette } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const active = themes.find((t) => t.id === theme) ?? themes[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Theme wechseln"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:scale-[1.03]"
        style={{
          background: "oklch(1 0 0 / 4%)",
          border: "1px solid oklch(1 0 0 / 10%)",
          color: "var(--color-foreground)",
          backdropFilter: "blur(10px)",
        }}
      >
        <span
          className="h-4 w-4 rounded-full"
          style={{ background: active.swatch, boxShadow: "0 0 10px oklch(0.65 0.2 250 / 30%)" }}
        />
        <Palette size={14} className="opacity-70" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 rounded-xl p-2 z-50"
            style={{
              background: "oklch(0.16 0.035 260 / 95%)",
              border: "1px solid oklch(1 0 0 / 10%)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 16px 48px oklch(0 0 0 / 50%)",
            }}
          >
            <div className="px-2 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Theme
            </div>
            {themes.map((t) => {
              const isActive = t.id === theme;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTheme(t.id);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-white/5"
                >
                  <span
                    className="h-6 w-6 rounded-full flex-shrink-0"
                    style={{ background: t.swatch, boxShadow: "inset 0 0 0 1px oklch(1 0 0 / 15%)" }}
                  />
                  <span className="flex-1 text-left text-foreground">{t.name}</span>
                  {isActive && <Check size={14} className="text-accent" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
