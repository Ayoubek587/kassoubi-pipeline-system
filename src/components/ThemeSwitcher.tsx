import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function ThemeSwitcher() {
  const { theme, setTheme, themes, mode, toggleMode } = useTheme();
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

  const buttonStyle = {
    background: "var(--overlay-soft)",
    border: "1px solid var(--border-strong)",
    color: "var(--color-foreground)",
    backdropFilter: "blur(10px)",
  } as const;

  return (
    <div className="flex items-center gap-2">
      {/* Light/Dark toggle */}
      <button
        type="button"
        onClick={toggleMode}
        aria-label={mode === "dark" ? "Light mode" : "Dark mode"}
        className="flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:scale-[1.05]"
        style={buttonStyle}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={mode}
            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="flex"
          >
            {mode === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* Theme dropdown */}
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Theme wechseln"
          className="flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm font-medium transition-all hover:scale-[1.03]"
          style={buttonStyle}
        >
          <span
            className="h-4 w-4 rounded-full"
            style={{
              background: active.swatch,
              boxShadow: "0 0 10px color-mix(in oklab, var(--glow) 30%, transparent)",
            }}
          />
          <Palette size={13} className="opacity-70" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-60 rounded-xl p-2 z-50"
              style={{
                background: "var(--color-popover)",
                color: "var(--color-popover-foreground)",
                border: "1px solid var(--border-strong)",
                backdropFilter: "blur(20px)",
                boxShadow: "var(--shadow-elevated)",
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
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors"
                    style={{ background: isActive ? "var(--overlay-medium)" : "transparent" }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "var(--overlay-soft)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    }}
                  >
                    <span
                      className="h-6 w-6 rounded-full flex-shrink-0"
                      style={{ background: t.swatch, boxShadow: "inset 0 0 0 1px var(--border-strong)" }}
                    />
                    <span className="flex-1 text-left">{t.name}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.mode}</span>
                    {isActive && <Check size={14} className="text-accent ml-1" />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
