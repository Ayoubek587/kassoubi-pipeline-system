import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { buildCalendlyUrl, CALENDLY_EVENT_URL } from "@/lib/calendly";
import { getPublicLeadForBooking, type PublicBookingLead } from "@/lib/submit-lead";

type AnalyseTerminSearch = {
  lead_id?: string;
};

export const Route = createFileRoute("/analyse-termin")({
  validateSearch: (search: Record<string, unknown>): AnalyseTerminSearch => ({
    lead_id: typeof search.lead_id === "string" ? search.lead_id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Beratung für Personal aus Marokko buchen | Kassoubi" },
      {
        name: "description",
        content:
          "Buchen Sie Ihren kostenfreien Beratungstermin zu Auszubildenden und Fachkräften aus Marokko.",
      },
    ],
  }),
  component: AnalyseTerminPage,
});

function AnalyseTerminPage() {
  const { lead_id: leadId } = Route.useSearch();
  const loadLead = useServerFn(getPublicLeadForBooking);
  const [lead, setLead] = useState<PublicBookingLead | null>(null);
  const [loading, setLoading] = useState(Boolean(leadId));
  const [lookupFinished, setLookupFinished] = useState(!leadId);

  useEffect(() => {
    let active = true;

    if (!leadId) {
      setLead(null);
      setLoading(false);
      setLookupFinished(true);
      return () => {
        active = false;
      };
    }

    setLoading(true);
    setLookupFinished(false);
    loadLead({ data: { lead_id: leadId } })
      .then((result) => {
        if (active) setLead(result);
      })
      .catch(() => {
        if (active) setLead(null);
      })
      .finally(() => {
        if (active) {
          setLoading(false);
          setLookupFinished(true);
        }
      });

    return () => {
      active = false;
    };
  }, [leadId, loadLead]);

  const calendlyUrl = useMemo(() => (lead ? buildCalendlyUrl(lead) : CALENDLY_EVENT_URL), [lead]);
  const hasPrefill = Boolean(lead?.full_name || lead?.email);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-foreground dark:bg-[#080D1A]">
      <Navbar />

      <main>
        <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div
            className="glow-blob top-[-230px] left-[12%] h-[620px] w-[620px]"
            style={{ background: "var(--blob-primary)" }}
          />
          <div
            className="glow-blob right-[-180px] bottom-[-170px] h-[520px] w-[520px]"
            style={{ background: "var(--blob-accent)" }}
          />

          <div className="relative z-10 mx-auto grid max-w-6xl gap-7 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <span className="h-eyebrow">Analyse-Termin</span>
              <h1 className="mt-6 text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                Beratung für Personal aus Marokko buchen
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Wählen Sie einen passenden Termin. Ihre Angaben werden, wenn vorhanden, automatisch
                in Calendly vorausgefüllt.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:max-w-2xl">
                {[
                  { icon: Clock3, label: "30 Minuten" },
                  { icon: ShieldCheck, label: "Kostenfrei" },
                  { icon: CheckCircle2, label: "Unverbindlich" },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm font-semibold text-muted-foreground shadow-sm dark:border-white/10 dark:bg-white/[0.035]"
                    >
                      <Icon className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-white/[0.04] sm:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                  <CalendarClock className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Calendly Buchung</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Öffnet Calendly in einem neuen Tab. Dort wählen Sie direkt Ihren bevorzugten
                    Termin.
                  </p>
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.035]">
                {loading ? (
                  <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden="true" />
                    Kontaktdaten werden geladen...
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">
                      {hasPrefill
                        ? "Ihre Kontaktdaten sind vorbereitet."
                        : "Terminbuchung ohne gespeicherte Kontaktdaten."}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {hasPrefill
                        ? "Name und E-Mail werden an Calendly uebergeben, damit die Buchung schneller abgeschlossen ist."
                        : lookupFinished
                          ? "Sie können den Termin trotzdem direkt buchen. Falls nötig, tragen Sie Ihre Daten in Calendly ein."
                          : "Der Termin kann jederzeit gebucht werden."}
                    </p>
                  </div>
                )}
              </div>

              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-7 inline-flex w-full items-center justify-center gap-2 sm:w-auto"
              >
                Beratungstermin buchen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Wenn die Weiterleitung aus einem Formular kommt, nutzt Kassoubi die Lead-ID nur, um
                Name und E-Mail für die Terminbuchung vorzubereiten.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
