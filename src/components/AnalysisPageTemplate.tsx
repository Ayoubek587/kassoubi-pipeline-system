import { motion } from "framer-motion";
import { BarChart3, CalendarClock, CheckCircle2, ShieldCheck } from "lucide-react";

import MultiStepForm from "@/components/MultiStepForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AnalysisPageTemplate() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-foreground dark:bg-[#080D1A]">
      <Navbar />

      <main>
        <section className="relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-18">
          <div
            className="glow-blob top-[-220px] left-[12%] h-[620px] w-[620px]"
            style={{ background: "var(--blob-primary)" }}
          />
          <div
            className="glow-blob right-[-180px] bottom-[-160px] h-[520px] w-[520px]"
            style={{ background: "var(--blob-accent)" }}
          />

          <div className="relative z-10 mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="pt-4"
            >
              <span className="h-eyebrow">Beratung für Unternehmen</span>
              <h1 className="mt-6 text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                Personal aus Marokko anfragen
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Teilen Sie uns kurz mit, welche Auszubildenden oder Fachkräfte aus Marokko Sie
                suchen. Danach buchen Sie direkt einen passenden Termin für die kostenfreie Analyse.
              </p>

              <div className="mt-8 grid gap-3">
                {[
                  { icon: BarChart3, text: "Strukturierte Einschätzung Ihres Bedarfs" },
                  { icon: CalendarClock, text: "Direkte Terminbuchung nach Formularabschluss" },
                  { icon: ShieldCheck, text: "Fokus auf passende Profile aus Marokko" },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.text}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-medium text-muted-foreground shadow-sm dark:border-white/10 dark:bg-white/[0.035]"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {item.text}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_22px_70px_rgba(15,23,42,0.09)] dark:border-white/10 dark:bg-white/[0.04] sm:p-7"
            >
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Analyse vorbereiten</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Nach dem Absenden öffnet sich der Buchungsschritt mit vorausgefüllten
                    Kontaktdaten.
                  </p>
                </div>
              </div>

              <MultiStepForm selectedType="unternehmen" redirectToBooking sourceRoute="/analyse" />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
