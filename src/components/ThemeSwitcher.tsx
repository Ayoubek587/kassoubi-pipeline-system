import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function ThemeSwitcher() {
  const { mode, toggleMode } = useTheme();

  const buttonStyle = {
    background: "var(--overlay-soft)",
    border: "1px solid var(--border-strong)",
    color: "var(--color-foreground)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  } as const;

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={mode === "dark" ? "Light mode" : "Dark mode"}
      className="flex h-11 w-11 items-center justify-center rounded-xl transition-all hover:scale-[1.05] xl:h-9 xl:w-9 xl:rounded-lg"
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
  );
}
