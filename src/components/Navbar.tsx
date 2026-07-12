import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import ThemeSwitcher from "./ThemeSwitcher";
import { MAIN_BOOKING_URL } from "@/lib/contact";

const links = [
  { label: "Startseite", to: "/" as const },
  { label: "Für Kandidaten", to: "/bewerber" as const },
  { label: "Für Unternehmen", to: "/unternehmen" as const },
  { label: "Prozess", to: "/prozess" as const },
  { label: "Über uns", to: "/ueber-uns" as const },
  { label: "Kontakt", to: "/kontakt" as const },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 border-b border-slate-900/10 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#080D1A]/85"
      style={{
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-4 sm:px-6 md:h-[72px]">
        <Link
          to="/"
          className="mr-3 flex h-11 w-[172px] shrink-0 items-center gap-2 overflow-hidden sm:w-[200px] md:mr-8 md:h-12 md:w-[230px] md:gap-3"
          aria-label="Kassoubi Vermittlung Startseite"
        >
          <span className="relative flex h-11 w-[56px] shrink-0 items-center overflow-hidden sm:w-[60px] md:h-12 md:w-[72px]">
            <img
              src="/brand/kv-logo-light-normalized.png"
              alt="Kassoubi Vermittlung"
              width={660}
              height={420}
              className="absolute left-0 top-1/2 h-[31px] w-auto -translate-y-1/2 object-contain dark:hidden md:h-[38px]"
            />
            <img
              src="/brand/kv-logo-dark-normalized.png"
              alt="Kassoubi Vermittlung"
              width={660}
              height={420}
              className="absolute left-0 top-1/2 hidden h-[31px] w-auto -translate-y-1/2 object-contain dark:block md:h-[38px]"
            />
          </span>
          <span
            className="hidden h-8 w-px bg-gradient-to-b from-transparent via-border/80 to-transparent sm:block md:h-9"
            aria-hidden="true"
          />
          <span className="hidden min-w-[126px] translate-y-px select-none leading-none sm:block">
            <span className="block text-[13px] font-bold tracking-[0.22em] text-foreground md:text-[14px]">
              KASSOUBI
            </span>
            <span className="mt-1.5 block text-[8px] font-semibold tracking-[0.4em] text-primary md:text-[9px]">
              VERMITTLUNG
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 xl:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "bg-primary/10 text-primary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="whitespace-nowrap rounded-full px-2 py-2 text-sm font-medium tracking-[0.01em] transition-colors hover:bg-primary/10 hover:text-primary xl:text-[15px]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <ThemeSwitcher />
          <a
            href={MAIN_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 min-w-max items-center justify-center whitespace-nowrap rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 xl:px-6"
          >
            Erstberatung buchen
          </a>
        </div>

        <div className="flex items-center gap-2.5 xl:hidden">
          <ThemeSwitcher />
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-background/40 text-foreground transition hover:bg-primary/10 hover:text-primary"
            aria-label="Menü öffnen"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden xl:hidden"
            style={{ background: "var(--nav-bg-mobile)", borderTop: "1px solid var(--border-subtle)" }}
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "bg-primary/10 text-primary" }}
                  inactiveProps={{ className: "text-muted-foreground" }}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={MAIN_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex min-h-12 min-w-max items-center justify-center whitespace-nowrap rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
              >
                Erstberatung buchen
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
