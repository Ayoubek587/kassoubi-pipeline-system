import { Link } from "@tanstack/react-router";

const STRUCTURE_DIGITAL_URL = "https://structure-digital.vercel.app/";

export default function Footer() {
  return (
    <footer
      className="bg-background"
      style={{
        borderTop:
          "1px solid var(--nav-border, color-mix(in oklab, var(--foreground) 8%, transparent))",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        <div
          className="rounded-2xl border bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] dark:bg-[#0B1020] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:p-6"
          style={{
            borderColor:
              "var(--nav-border, color-mix(in oklab, var(--foreground) 8%, transparent))",
          }}
        >
          <div className="grid gap-7 sm:gap-8 md:grid-cols-[1.4fr_1fr_1fr] md:items-start">
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
              <div className="mt-3 max-w-[320px] space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                <p>Auszubildende & Fachkräfte aus Marokko.</p>
                <p className="text-xs leading-relaxed opacity-80">
                  Vermittlung für Unternehmen in Deutschland. Vorauswahl. Screening. Begleitung.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h2 className="mb-3 text-sm font-semibold text-foreground">Navigation</h2>
              <nav
                className="flex flex-col items-center gap-1 md:items-start"
                aria-label="Footer Navigation"
              >
                <Link
                  to="/unternehmen"
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  Für Unternehmen
                </Link>
                <Link
                  to="/bewerber"
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  Für Kandidaten
                </Link>
                <Link
                  to="/prozess"
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  Prozess
                </Link>
                <Link
                  to="/ueber-uns"
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  Über uns
                </Link>
                <Link
                  to="/kontakt"
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  Kontakt
                </Link>
              </nav>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h2 className="mb-3 text-sm font-semibold text-foreground">Rechtliches</h2>
              <nav
                className="flex flex-col items-center gap-1 md:items-start"
                aria-label="Footer Rechtliches"
              >
                <Link
                  to="/impressum"
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  Impressum
                </Link>
                <Link
                  to="/datenschutz"
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  Datenschutz
                </Link>
              </nav>
              <span className="mt-1 rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground">
                B2B Recruiting · Marokko
              </span>
            </div>
          </div>

          <div className="mt-5 grid gap-2 border-t border-border/60 pt-5 text-center md:grid-cols-[1fr_auto] md:items-end md:text-left">
            <p className="text-xs text-muted-foreground">© 2026 Kassoubi Vermittlung</p>
            <p className="text-xs text-muted-foreground">
              Premium Vermittlung aus Marokko nach Deutschland
            </p>
            <a
              href={STRUCTURE_DIGITAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Structure Digital Website öffnen"
              className="group mx-auto mt-4 flex w-full max-w-[20rem] items-center justify-center gap-3 rounded-xl border border-border/40 bg-background/35 px-3 py-2.5 text-muted-foreground/75 outline-none transition duration-300 ease-out hover:-translate-y-0.5 hover:border-border/70 hover:bg-background/60 hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:col-span-2 md:mx-0 md:ml-auto md:w-auto md:justify-end"
            >
              <span
                className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/50 bg-background/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition duration-300 group-hover:border-primary/35 group-hover:bg-primary/[0.04]"
                aria-hidden="true"
              >
                <img
                  src="/brand/structure-icon-light.png"
                  alt=""
                  width={330}
                  height={300}
                  className="h-5 w-5 object-contain dark:hidden"
                />
                <img
                  src="/brand/structure-icon-dark.png"
                  alt=""
                  width={330}
                  height={300}
                  className="hidden h-5 w-5 object-contain dark:block"
                />
              </span>
              <span className="min-w-0 text-left leading-none">
                <span className="block text-[11px] font-semibold tracking-[0.01em] text-foreground/70 transition duration-300 group-hover:text-foreground/85">
                  Crafted by Structure Digital
                </span>
                <span className="mt-1.5 block text-[10px] font-medium leading-tight text-muted-foreground/75">
                  Premium Digital Systems for Modern Companies.
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
