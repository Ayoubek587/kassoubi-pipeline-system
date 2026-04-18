import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { applyTheme, DEFAULT_THEME, STORAGE_KEY, themes, type ThemeId } from "@/lib/themes";

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  themes: typeof themes;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);

  // Initial load (client only)
  useEffect(() => {
    try {
      const stored = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as ThemeId | null;
      const initial = stored && themes.some((t) => t.id === stored) ? stored : DEFAULT_THEME;
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

  return <ThemeContext.Provider value={{ theme, setTheme, themes }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
