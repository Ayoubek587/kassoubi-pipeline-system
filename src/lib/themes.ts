export type ThemeId = "midnight" | "purple" | "emerald" | "amber";

export interface ThemeDef {
  id: ThemeId;
  name: string;
  swatch: string; // gradient preview
  vars: Record<string, string>;
}

// Each theme overrides the color tokens defined in src/styles.css :root
export const themes: ThemeDef[] = [
  {
    id: "midnight",
    name: "Midnight Blue",
    swatch: "linear-gradient(135deg, oklch(0.65 0.2 250), oklch(0.7 0.15 195))",
    vars: {
      "--background": "oklch(0.13 0.035 260)",
      "--foreground": "oklch(0.95 0.01 250)",
      "--card": "oklch(0.18 0.035 258)",
      "--card-foreground": "oklch(0.95 0.01 250)",
      "--popover": "oklch(0.16 0.035 258)",
      "--popover-foreground": "oklch(0.95 0.01 250)",
      "--primary": "oklch(0.65 0.2 250)",
      "--primary-foreground": "oklch(0.98 0.005 250)",
      "--secondary": "oklch(0.22 0.03 258)",
      "--secondary-foreground": "oklch(0.88 0.02 250)",
      "--muted": "oklch(0.2 0.025 258)",
      "--muted-foreground": "oklch(0.6 0.03 255)",
      "--accent": "oklch(0.7 0.15 195)",
      "--accent-foreground": "oklch(0.12 0.03 260)",
      "--border": "oklch(0.25 0.03 258)",
      "--input": "oklch(0.22 0.03 258)",
      "--ring": "oklch(0.65 0.2 250)",
      "--surface": "oklch(0.16 0.03 258)",
      "--surface-foreground": "oklch(0.9 0.015 250)",
      "--glow": "oklch(0.65 0.2 250)",
      "--glow-secondary": "oklch(0.7 0.15 195)",
      "--gradient-primary": "linear-gradient(135deg, oklch(0.65 0.2 250), oklch(0.7 0.15 195))",
      "--gradient-hero": "linear-gradient(180deg, oklch(0.13 0.035 260), oklch(0.1 0.04 265))",
      "--gradient-card": "linear-gradient(135deg, oklch(0.18 0.035 258 / 80%), oklch(0.14 0.03 260 / 60%))",
      "--gradient-glow": "radial-gradient(ellipse at 50% 0%, oklch(0.65 0.2 250 / 15%), transparent 60%)",
      "--shadow-glow": "0 0 40px oklch(0.65 0.2 250 / 20%)",
    },
  },
  {
    id: "purple",
    name: "Royal Purple",
    swatch: "linear-gradient(135deg, oklch(0.6 0.24 305), oklch(0.65 0.2 340))",
    vars: {
      "--background": "oklch(0.13 0.04 295)",
      "--foreground": "oklch(0.95 0.015 305)",
      "--card": "oklch(0.18 0.04 298)",
      "--card-foreground": "oklch(0.95 0.015 305)",
      "--popover": "oklch(0.16 0.04 298)",
      "--popover-foreground": "oklch(0.95 0.015 305)",
      "--primary": "oklch(0.6 0.24 305)",
      "--primary-foreground": "oklch(0.98 0.005 305)",
      "--secondary": "oklch(0.22 0.035 300)",
      "--secondary-foreground": "oklch(0.88 0.025 305)",
      "--muted": "oklch(0.2 0.03 300)",
      "--muted-foreground": "oklch(0.62 0.04 305)",
      "--accent": "oklch(0.68 0.2 340)",
      "--accent-foreground": "oklch(0.12 0.04 300)",
      "--border": "oklch(0.27 0.04 300)",
      "--input": "oklch(0.22 0.035 300)",
      "--ring": "oklch(0.6 0.24 305)",
      "--surface": "oklch(0.16 0.035 300)",
      "--surface-foreground": "oklch(0.9 0.02 305)",
      "--glow": "oklch(0.6 0.24 305)",
      "--glow-secondary": "oklch(0.68 0.2 340)",
      "--gradient-primary": "linear-gradient(135deg, oklch(0.6 0.24 305), oklch(0.65 0.2 340))",
      "--gradient-hero": "linear-gradient(180deg, oklch(0.13 0.04 295), oklch(0.1 0.045 300))",
      "--gradient-card": "linear-gradient(135deg, oklch(0.18 0.04 298 / 80%), oklch(0.14 0.035 300 / 60%))",
      "--gradient-glow": "radial-gradient(ellipse at 50% 0%, oklch(0.6 0.24 305 / 18%), transparent 60%)",
      "--shadow-glow": "0 0 40px oklch(0.6 0.24 305 / 22%)",
    },
  },
  {
    id: "emerald",
    name: "Emerald Forest",
    swatch: "linear-gradient(135deg, oklch(0.62 0.18 160), oklch(0.7 0.14 185))",
    vars: {
      "--background": "oklch(0.13 0.03 175)",
      "--foreground": "oklch(0.95 0.015 170)",
      "--card": "oklch(0.18 0.03 175)",
      "--card-foreground": "oklch(0.95 0.015 170)",
      "--popover": "oklch(0.16 0.03 175)",
      "--popover-foreground": "oklch(0.95 0.015 170)",
      "--primary": "oklch(0.62 0.18 160)",
      "--primary-foreground": "oklch(0.1 0.03 170)",
      "--secondary": "oklch(0.22 0.03 175)",
      "--secondary-foreground": "oklch(0.88 0.02 170)",
      "--muted": "oklch(0.2 0.025 175)",
      "--muted-foreground": "oklch(0.6 0.03 175)",
      "--accent": "oklch(0.7 0.14 185)",
      "--accent-foreground": "oklch(0.1 0.03 175)",
      "--border": "oklch(0.25 0.03 175)",
      "--input": "oklch(0.22 0.03 175)",
      "--ring": "oklch(0.62 0.18 160)",
      "--surface": "oklch(0.16 0.03 175)",
      "--surface-foreground": "oklch(0.9 0.015 170)",
      "--glow": "oklch(0.62 0.18 160)",
      "--glow-secondary": "oklch(0.7 0.14 185)",
      "--gradient-primary": "linear-gradient(135deg, oklch(0.62 0.18 160), oklch(0.7 0.14 185))",
      "--gradient-hero": "linear-gradient(180deg, oklch(0.13 0.03 175), oklch(0.1 0.035 180))",
      "--gradient-card": "linear-gradient(135deg, oklch(0.18 0.03 175 / 80%), oklch(0.14 0.03 178 / 60%))",
      "--gradient-glow": "radial-gradient(ellipse at 50% 0%, oklch(0.62 0.18 160 / 16%), transparent 60%)",
      "--shadow-glow": "0 0 40px oklch(0.62 0.18 160 / 22%)",
    },
  },
  {
    id: "amber",
    name: "Sunset Amber",
    swatch: "linear-gradient(135deg, oklch(0.72 0.18 55), oklch(0.68 0.2 30))",
    vars: {
      "--background": "oklch(0.13 0.025 50)",
      "--foreground": "oklch(0.95 0.015 70)",
      "--card": "oklch(0.18 0.025 50)",
      "--card-foreground": "oklch(0.95 0.015 70)",
      "--popover": "oklch(0.16 0.025 50)",
      "--popover-foreground": "oklch(0.95 0.015 70)",
      "--primary": "oklch(0.72 0.18 55)",
      "--primary-foreground": "oklch(0.12 0.03 40)",
      "--secondary": "oklch(0.22 0.025 50)",
      "--secondary-foreground": "oklch(0.88 0.02 60)",
      "--muted": "oklch(0.2 0.02 50)",
      "--muted-foreground": "oklch(0.62 0.03 55)",
      "--accent": "oklch(0.68 0.2 30)",
      "--accent-foreground": "oklch(0.12 0.03 40)",
      "--border": "oklch(0.25 0.025 50)",
      "--input": "oklch(0.22 0.025 50)",
      "--ring": "oklch(0.72 0.18 55)",
      "--surface": "oklch(0.16 0.025 50)",
      "--surface-foreground": "oklch(0.9 0.02 60)",
      "--glow": "oklch(0.72 0.18 55)",
      "--glow-secondary": "oklch(0.68 0.2 30)",
      "--gradient-primary": "linear-gradient(135deg, oklch(0.72 0.18 55), oklch(0.68 0.2 30))",
      "--gradient-hero": "linear-gradient(180deg, oklch(0.13 0.025 50), oklch(0.1 0.03 45))",
      "--gradient-card": "linear-gradient(135deg, oklch(0.18 0.025 50 / 80%), oklch(0.14 0.025 48 / 60%))",
      "--gradient-glow": "radial-gradient(ellipse at 50% 0%, oklch(0.72 0.18 55 / 18%), transparent 60%)",
      "--shadow-glow": "0 0 40px oklch(0.72 0.18 55 / 24%)",
    },
  },
];

export const DEFAULT_THEME: ThemeId = "midnight";
export const STORAGE_KEY = "kassoubi-theme";

export function applyTheme(id: ThemeId) {
  const theme = themes.find((t) => t.id === id) ?? themes[0];
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.setAttribute("data-theme", theme.id);
}
