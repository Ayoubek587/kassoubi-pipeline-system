export type ThemeId = "light" | "dark";

export interface ThemeDef {
  id: ThemeId;
  name: string;
  mode: "dark" | "light";
  vars: Record<string, string>;
}

const lightTokens = {
  "color-scheme": "light",
  "--background": "hsl(220 45% 98%)",
  "--foreground": "hsl(224 34% 14%)",
  "--card": "hsl(0 0% 100%)",
  "--card-foreground": "hsl(224 34% 14%)",
  "--popover": "hsl(0 0% 100%)",
  "--popover-foreground": "hsl(224 34% 14%)",
  "--primary": "hsl(222 76% 46%)",
  "--primary-foreground": "hsl(0 0% 100%)",
  "--secondary": "hsl(220 32% 94%)",
  "--secondary-foreground": "hsl(224 34% 20%)",
  "--muted": "hsl(220 28% 94%)",
  "--muted-foreground": "hsl(222 15% 42%)",
  "--accent": "hsl(204 78% 42%)",
  "--accent-foreground": "hsl(0 0% 100%)",
  "--destructive": "hsl(0 72% 48%)",
  "--destructive-foreground": "hsl(0 0% 100%)",
  "--border": "hsl(220 20% 86%)",
  "--input": "hsl(220 25% 92%)",
  "--ring": "hsl(222 76% 46%)",
  "--surface": "hsl(220 38% 96%)",
  "--surface-foreground": "hsl(224 34% 18%)",
  "--glow": "var(--primary)",
  "--glow-secondary": "var(--accent)",
  "--chart-1": "var(--primary)",
  "--chart-2": "var(--accent)",
  "--chart-3": "color-mix(in oklab, var(--primary) 70%, var(--accent))",
  "--chart-4": "color-mix(in oklab, var(--accent) 72%, var(--foreground))",
  "--chart-5": "color-mix(in oklab, var(--primary) 62%, var(--foreground))",
  "--sidebar": "var(--card)",
  "--sidebar-foreground": "var(--card-foreground)",
  "--sidebar-primary": "var(--primary)",
  "--sidebar-primary-foreground": "var(--primary-foreground)",
  "--sidebar-accent": "var(--secondary)",
  "--sidebar-accent-foreground": "var(--secondary-foreground)",
  "--sidebar-border": "var(--border)",
  "--sidebar-ring": "var(--ring)",
  "--overlay-soft": "color-mix(in oklab, var(--foreground) 3%, transparent)",
  "--overlay-medium": "color-mix(in oklab, var(--foreground) 7%, transparent)",
  "--overlay-strong": "color-mix(in oklab, var(--foreground) 13%, transparent)",
  "--border-subtle": "color-mix(in oklab, var(--border) 72%, transparent)",
  "--border-strong": "color-mix(in oklab, var(--border) 100%, var(--foreground) 8%)",
  "--text-on-glass": "var(--foreground)",
  "--gradient-primary": "linear-gradient(135deg, var(--primary), var(--accent))",
  "--gradient-hero":
    "linear-gradient(180deg, var(--background) 0%, color-mix(in oklab, var(--background) 86%, var(--primary) 14%) 100%)",
  "--gradient-card":
    "linear-gradient(135deg, color-mix(in oklab, var(--card) 88%, transparent), color-mix(in oklab, var(--surface) 78%, transparent))",
  "--gradient-glow":
    "radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 62%)",
  "--shadow-glow": "0 0 40px color-mix(in oklab, var(--primary) 16%, transparent)",
  "--shadow-card":
    "0 4px 20px color-mix(in oklab, var(--foreground) 8%, transparent), 0 0 0 1px color-mix(in oklab, var(--border) 55%, transparent)",
  "--shadow-card-hover":
    "0 12px 36px color-mix(in oklab, var(--foreground) 13%, transparent), 0 0 0 1px color-mix(in oklab, var(--border) 70%, transparent)",
  "--shadow-elevated": "0 20px 60px color-mix(in oklab, var(--foreground) 16%, transparent)",
  "--blob-primary": "color-mix(in oklab, var(--primary) 12%, transparent)",
  "--blob-accent": "color-mix(in oklab, var(--accent) 10%, transparent)",
  "--nav-bg": "rgba(255, 255, 255, 0.85)",
  "--nav-border": "rgba(15, 23, 42, 0.08)",
  "--nav-bg-mobile": "rgba(255, 255, 255, 0.98)",
  "--section-tint-a":
    "linear-gradient(180deg, var(--background) 0%, color-mix(in oklab, var(--background) 92%, var(--primary) 8%) 100%)",
  "--section-tint-b":
    "linear-gradient(180deg, color-mix(in oklab, var(--background) 94%, var(--primary) 6%) 0%, color-mix(in oklab, var(--background) 92%, var(--accent) 8%) 100%)",
  "--section-tint-c":
    "linear-gradient(180deg, color-mix(in oklab, var(--background) 92%, var(--accent) 8%) 0%, var(--background) 100%)",
};

const darkTokens = {
  "color-scheme": "dark",
  "--background": "hsl(224 48% 8%)",
  "--foreground": "hsl(216 34% 96%)",
  "--card": "hsl(224 40% 13%)",
  "--card-foreground": "hsl(216 34% 96%)",
  "--popover": "hsl(224 42% 11%)",
  "--popover-foreground": "hsl(216 34% 96%)",
  "--primary": "hsl(218 86% 64%)",
  "--primary-foreground": "hsl(224 48% 8%)",
  "--secondary": "hsl(224 32% 18%)",
  "--secondary-foreground": "hsl(216 30% 90%)",
  "--muted": "hsl(224 32% 17%)",
  "--muted-foreground": "hsl(218 18% 68%)",
  "--accent": "hsl(197 82% 60%)",
  "--accent-foreground": "hsl(224 48% 8%)",
  "--destructive": "hsl(0 72% 58%)",
  "--destructive-foreground": "hsl(0 0% 100%)",
  "--border": "hsl(224 25% 24%)",
  "--input": "hsl(224 28% 19%)",
  "--ring": "hsl(218 86% 64%)",
  "--surface": "hsl(224 38% 12%)",
  "--surface-foreground": "hsl(216 30% 92%)",
  "--glow": "var(--primary)",
  "--glow-secondary": "var(--accent)",
  "--chart-1": "var(--primary)",
  "--chart-2": "var(--accent)",
  "--chart-3": "color-mix(in oklab, var(--primary) 70%, var(--accent))",
  "--chart-4": "color-mix(in oklab, var(--accent) 72%, var(--foreground))",
  "--chart-5": "color-mix(in oklab, var(--primary) 62%, var(--foreground))",
  "--sidebar": "var(--card)",
  "--sidebar-foreground": "var(--card-foreground)",
  "--sidebar-primary": "var(--primary)",
  "--sidebar-primary-foreground": "var(--primary-foreground)",
  "--sidebar-accent": "var(--secondary)",
  "--sidebar-accent-foreground": "var(--secondary-foreground)",
  "--sidebar-border": "var(--border)",
  "--sidebar-ring": "var(--ring)",
  "--overlay-soft": "color-mix(in oklab, var(--foreground) 4%, transparent)",
  "--overlay-medium": "color-mix(in oklab, var(--foreground) 8%, transparent)",
  "--overlay-strong": "color-mix(in oklab, var(--foreground) 14%, transparent)",
  "--border-subtle": "color-mix(in oklab, var(--border) 58%, transparent)",
  "--border-strong": "color-mix(in oklab, var(--border) 100%, var(--foreground) 10%)",
  "--text-on-glass": "var(--foreground)",
  "--gradient-primary": "linear-gradient(135deg, var(--primary), var(--accent))",
  "--gradient-hero":
    "linear-gradient(180deg, var(--background) 0%, color-mix(in oklab, var(--background) 86%, var(--primary) 14%) 100%)",
  "--gradient-card":
    "linear-gradient(135deg, color-mix(in oklab, var(--card) 82%, transparent), color-mix(in oklab, var(--surface) 68%, transparent))",
  "--gradient-glow":
    "radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 62%)",
  "--shadow-glow": "0 0 40px color-mix(in oklab, var(--primary) 20%, transparent)",
  "--shadow-card":
    "0 4px 24px color-mix(in oklab, var(--foreground) 8%, transparent), 0 0 0 1px color-mix(in oklab, var(--border) 52%, transparent)",
  "--shadow-card-hover":
    "0 8px 40px color-mix(in oklab, var(--foreground) 11%, transparent), 0 0 0 1px color-mix(in oklab, var(--border) 72%, transparent)",
  "--shadow-elevated": "0 16px 64px color-mix(in oklab, var(--foreground) 10%, transparent)",
  "--blob-primary": "color-mix(in oklab, var(--primary) 14%, transparent)",
  "--blob-accent": "color-mix(in oklab, var(--accent) 10%, transparent)",
  "--nav-bg": "rgba(8, 13, 26, 0.85)",
  "--nav-border": "rgba(255, 255, 255, 0.10)",
  "--nav-bg-mobile": "rgba(8, 13, 26, 0.98)",
  "--section-tint-a":
    "linear-gradient(180deg, var(--background) 0%, color-mix(in oklab, var(--background) 90%, var(--primary) 10%) 100%)",
  "--section-tint-b":
    "linear-gradient(180deg, color-mix(in oklab, var(--background) 92%, var(--primary) 8%) 0%, color-mix(in oklab, var(--background) 90%, var(--accent) 10%) 100%)",
  "--section-tint-c":
    "linear-gradient(180deg, color-mix(in oklab, var(--background) 90%, var(--accent) 10%) 0%, var(--background) 100%)",
};

export const themes: ThemeDef[] = [
  { id: "light", name: "Light", mode: "light", vars: lightTokens },
  { id: "dark", name: "Dark", mode: "dark", vars: darkTokens },
];

export const DEFAULT_THEME: ThemeId = "light";
export const STORAGE_KEY = "kassoubi-theme";

export function applyTheme(id: ThemeId) {
  const theme = themes.find((t) => t.id === id) ?? themes[0];
  const root = document.documentElement;

  Object.entries(theme.vars).forEach(([key, value]) => {
    if (key === "color-scheme") {
      root.style.colorScheme = value;
    } else {
      root.style.setProperty(key, value);
    }
  });

  root.classList.toggle("dark", theme.mode === "dark");
  root.setAttribute("data-theme", theme.id);
  root.setAttribute("data-mode", theme.mode);
}

export function getSystemPreferredTheme(): ThemeId {
  if (typeof window === "undefined" || !window.matchMedia) return DEFAULT_THEME;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
