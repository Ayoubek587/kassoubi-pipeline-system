import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Für Unternehmen", href: "#unternehmen" },
    { label: "Für Bewerber", href: "#bewerber" },
    { label: "System", href: "#system" },
    { label: "Über uns", href: "#authority" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ backdropFilter: "blur(16px)", background: "oklch(0.13 0.035 260 / 80%)", borderBottom: "1px solid oklch(1 0 0 / 6%)" }}>
      <div className="mx-auto max-w-7xl flex items-center justify-between px-5 py-4">
        <a href="#" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <span className="text-primary-foreground font-bold text-sm">K</span>
          </div>
          <span className="font-semibold text-foreground text-lg tracking-tight">Kassoubi</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          <ThemeSwitcher />
          <a href="#kontakt" className="btn-primary text-sm !py-2 !px-5">Kontakt</a>
        </div>

        <div className="md:hidden flex items-center gap-2">
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
            className="md:hidden overflow-hidden"
            style={{ background: "oklch(0.14 0.035 260 / 95%)", borderTop: "1px solid oklch(1 0 0 / 6%)" }}
          >
            <div className="px-5 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors">
                  {l.label}
                </a>
              ))}
              <a href="#kontakt" className="btn-primary text-sm text-center !py-2">Kontakt</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
