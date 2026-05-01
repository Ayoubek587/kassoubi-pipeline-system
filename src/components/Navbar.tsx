import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Startseite", to: "/" as const },
    { label: "Für Bewerber", to: "/bewerber" as const },
    { label: "Für Unternehmen", to: "/unternehmen" as const },
    { label: "Prozess", to: "/prozess" as const },
    { label: "Über uns", to: "/ueber-uns" as const },
    { label: "Kontakt", to: "/kontakt" as const },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: "var(--nav-bg)", borderBottom: "1px solid var(--border-subtle)" }}>
      <div className="mx-auto max-w-7xl flex items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <span className="text-primary-foreground font-bold text-sm">K</span>
          </div>
          <span className="font-semibold text-foreground text-lg tracking-tight">Kassoubi</span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="text-sm font-medium hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <ThemeSwitcher />
          <Link to="/kontakt" className="btn-primary text-sm !py-2 !px-5">Analyse starten</Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <ThemeSwitcher />
          <button onClick={() => setOpen(!open)} className="text-foreground" aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{ background: "var(--nav-bg-mobile)", borderTop: "1px solid var(--border-subtle)" }}
          >
            <div className="px-5 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "text-foreground" }}
                  inactiveProps={{ className: "text-muted-foreground" }}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium hover:text-foreground transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/kontakt" onClick={() => setOpen(false)} className="btn-primary text-sm text-center !py-2">Analyse starten</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
