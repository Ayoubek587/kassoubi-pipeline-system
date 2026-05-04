import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer
      className="bg-background"
      style={{ borderTop: "1px solid var(--nav-border, color-mix(in oklab, var(--foreground) 8%, transparent))" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div
          className="rounded-2xl border bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] dark:bg-[#0B1020] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
          style={{ borderColor: "var(--nav-border, color-mix(in oklab, var(--foreground) 8%, transparent))" }}
        >
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:items-start">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <Link
                to="/"
                className="flex h-11 w-[220px] items-center gap-3 overflow-hidden"
                aria-label="Kassoubi Vermittlung Startseite"
              >
                <span className="relative flex h-11 w-[68px] shrink-0 items-center overflow-hidden">
                  <img
                    src="/brand/kv-logo-light.png"
                    alt="Kassoubi Vermittlung"
                    width={373}
                    height={290}
                    className="absolute left-0 top-1/2 h-[34px] w-auto -translate-y-1/2 object-contain dark:hidden"
                  />
                  <img
                    src="/brand/kv-logo-dark.png"
                    alt="Kassoubi Vermittlung"
                    width={611}
                    height={408}
                    className="absolute left-0 top-1/2 hidden h-[34px] w-auto -translate-y-1/2 object-contain dark:block"
                  />
                </span>
                <span className="flex items-center gap-3">
                  <span
                    className="h-9 w-px bg-gradient-to-b from-transparent via-border/80 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="select-none leading-none">
                    <span className="block text-[14px] font-bold tracking-[0.22em] text-foreground">
                      KASSOUBI
                    </span>
                    <span className="mt-1.5 block text-[9px] font-semibold tracking-[0.4em] text-primary">
                      VERMITTLUNG
                    </span>
                  </span>
                </span>
              </Link>
              <div className="mt-3 max-w-[320px] space-y-2 text-sm leading-relaxed text-muted-foreground">
                <p>Internationale Ausbildungspipeline für Unternehmen.</p>
                <p className="text-xs leading-relaxed opacity-80">
                  Strukturierte Vorauswahl. Klare Prozesse. Planbare Besetzung.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h2 className="mb-3 text-sm font-semibold text-foreground">Navigation</h2>
              <nav className="flex flex-col items-center gap-2 md:items-start" aria-label="Footer Navigation">
                <Link to="/unternehmen" className="text-sm text-muted-foreground transition hover:text-foreground">Für Unternehmen</Link>
                <Link to="/bewerber" className="text-sm text-muted-foreground transition hover:text-foreground">Für Bewerber</Link>
                <Link to="/prozess" className="text-sm text-muted-foreground transition hover:text-foreground">Prozess</Link>
                <Link to="/ueber-uns" className="text-sm text-muted-foreground transition hover:text-foreground">Über uns</Link>
                <Link to="/kontakt" className="text-sm text-muted-foreground transition hover:text-foreground">Kontakt</Link>
              </nav>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h2 className="mb-3 text-sm font-semibold text-foreground">Rechtliches</h2>
              <nav className="flex flex-col items-center gap-2 md:items-start" aria-label="Footer Rechtliches">
                <Link to="/impressum" className="text-sm text-muted-foreground transition hover:text-foreground">Impressum</Link>
                <Link to="/datenschutz" className="text-sm text-muted-foreground transition hover:text-foreground">Datenschutz</Link>
              </nav>
              <span className="mt-1 rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground">
                B2B Ausbildung · International
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-center md:flex-row md:text-left">
            <p className="text-xs text-muted-foreground">© 2026 Kassoubi Vermittlung</p>
            <p className="text-xs text-muted-foreground">Premium Vermittlungssystem für Ausbildungsplätze</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
