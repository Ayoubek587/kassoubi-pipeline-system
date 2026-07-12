import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck2, ClipboardCheck, MailCheck, Video } from "lucide-react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const Route = createFileRoute("/termin-bestaetigt")({
  head: () => ({
    meta: [
      { title: "Termin erfolgreich gebucht | Kassoubi Vermittlung" },
      {
        name: "description",
        content: "Ihr Beratungstermin mit Kassoubi Vermittlung wurde erfolgreich gebucht.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: TerminBestaetigtPage,
});

const confirmationItems = [
  {
    icon: MailCheck,
    title: "Terminbestätigung prüfen",
    description: "Die vollständigen Termindetails und den Zugangslink erhalten Sie per E-Mail.",
  },
  {
    icon: Video,
    title: "Google Meet",
    description: "Das Beratungsgespräch findet online über Google Meet statt.",
  },
  {
    icon: ClipboardCheck,
    title: "Personalbedarf vorbereiten",
    description:
      "Wir prüfen Ihre Angaben vor dem Gespräch, damit wir gezielt auf Ihren Personalbedarf eingehen können.",
  },
];

function TerminBestaetigtPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-foreground dark:bg-[#080D1A]">
      <Navbar />

      <main>
        <section className="relative overflow-hidden px-5 pb-20 pt-28 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-40">
          <div
            className="glow-blob left-[-220px] top-[-260px] h-[620px] w-[620px]"
            style={{ background: "var(--blob-primary)" }}
          />
          <div
            className="glow-blob bottom-[-280px] right-[-240px] h-[600px] w-[600px]"
            style={{ background: "var(--blob-accent)" }}
          />

          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#0B1020] dark:shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <div className="h-1.5 bg-gradient-to-r from-primary via-blue-500 to-primary/60" />

              <div className="px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
                  <div>
                    <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-[0_10px_30px_rgba(37,99,235,0.12)] sm:h-20 sm:w-20">
                      <CalendarCheck2 className="h-8 w-8 sm:h-10 sm:w-10" aria-hidden="true" />
                    </div>

                    <span className="h-eyebrow">Termin erfolgreich gebucht</span>
                    <h1 className="mt-6 max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                      Vielen Dank für Ihre Terminbuchung.
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                      Ihr unverbindliches Erstgespräch mit Kassoubi Vermittlung wurde erfolgreich
                      vereinbart.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Link
                        to="/"
                        className="btn-primary inline-flex w-full items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0B1020] sm:w-auto"
                      >
                        Zurück zur Startseite
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <Link
                        to="/kontakt"
                        className="btn-secondary inline-flex w-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0B1020] sm:w-auto"
                      >
                        Kassoubi kontaktieren
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.035] sm:p-7">
                    <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                      So geht es jetzt weiter
                    </h2>

                    <ol className="mt-6 space-y-5">
                      {confirmationItems.map((item, index) => {
                        const Icon = item.icon;

                        return (
                          <li key={item.title} className="flex gap-4">
                            <div className="relative flex flex-col items-center">
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-white text-primary shadow-sm dark:bg-[#0B1020]">
                                <Icon className="h-5 w-5" aria-hidden="true" />
                              </span>
                              {index < confirmationItems.length - 1 && (
                                <span
                                  className="mt-2 h-full w-px bg-slate-200 dark:bg-white/10"
                                  aria-hidden="true"
                                />
                              )}
                            </div>
                            <div className="pb-2 pt-1.5">
                              <h3 className="font-semibold text-foreground">{item.title}</h3>
                              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ol>

                    <aside className="mt-7 rounded-xl border border-primary/15 bg-primary/[0.055] p-4 text-sm leading-relaxed text-foreground/80 sm:p-5">
                      <strong className="font-semibold text-foreground">
                        Keine E-Mail erhalten?
                      </strong>{" "}
                      Bitte prüfen Sie Ihren Spam-Ordner. Über die Calendly-Bestätigungsmail können
                      Sie den Termin bei Bedarf verschieben oder absagen.
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
