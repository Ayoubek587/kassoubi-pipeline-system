import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export function AdminThemeToggle() {
  const { mode, toggleMode } = useTheme();
  const Icon = mode === "dark" ? Sun : Moon;

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="rounded-lg border-border/80 bg-card/75 shadow-sm"
      onClick={toggleMode}
      aria-label={mode === "dark" ? "Light Mode aktivieren" : "Dark Mode aktivieren"}
      title={mode === "dark" ? "Light Mode" : "Dark Mode"}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
