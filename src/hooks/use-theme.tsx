import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { applyTheme, DEFAULT_THEME, getSystemPreferredTheme, STORAGE_KEY, themes, type ThemeId } from "@/lib/themes";

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  toggleMode: () => void;
  themes: typeof themes;
  mode: "dark" | "light";
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);

  useEffect(() => {
    try {
      const stored = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as ThemeId | null;
      const initial = stored && themes.some((t) => t.id === stored) ? stored : getSystemPreferredTheme();
      setThemeState(initial);
      applyTheme(initial);
    } catch {
      applyTheme(DEFAULT_THEME);
    }
  }, []);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
    applyTheme(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // ignore
    }
  }, []);

  const mode = themes.find((t) => t.id === theme)?.mode ?? "dark";

  const toggleMode = useCallback(() => {
    // Toggle between current dark and a sensible light counterpart (or vice-versa)
    const currentTheme = themes.find((t) => t.id === theme);
    if (!currentTheme) return;
    if (currentTheme.mode === "dark") {
      // Prefer minimal-light if user is on minimal-dark, otherwise corporate light
      setTheme(currentTheme.id === "minimal-dark" ? "minimal-light" : "light");
    } else {
      setTheme(currentTheme.id === "minimal-light" ? "minimal-dark" : "midnight");
    }
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes, mode, toggleMode }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
