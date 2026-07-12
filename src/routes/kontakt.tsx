import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Mail,
  MessageCircle,
  Send,
  UserRound,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MultiStepForm from "../components/MultiStepForm";
import { CONTACT_EMAIL, MAIN_BOOKING_URL } from "@/lib/contact";

const WHATSAPP_URL = "https://wa.me/491234567890";
type Audience = "unternehmen" | "bewerber";

const companyTrustBlocks = [
  {
    title: "Was Unternehmen erhalten",
    items: [
      "Vorauswahl passender Kandidaten",
      "Strukturierte Profilprüfung",
      "Unterstützung im Vermittlungsprozess",
      "Kommunikation & Begleitung",
    ],
  },
  {
    title: "Geeignet für",
    items: ["Ausbildung", "Pflege", "Gastronomie", "Handwerk", "Hotellerie", "Industrie"],
  },
];

const companyProcessSteps = [
  "Bedarf senden",
  "Profile prüfen",
  "Gespräche führen",
  "Vermittlung begleiten",
];

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Azubis & Fachkräfte aus Marokko | Kassoubi" },
      {
        name: "description",
        content:
          "Sie suchen Azubis oder Fachkräfte aus Marokko? Oder möchten sich aus Marokko für Ausbildung oder Arbeit in Deutschland bewerben? Kontaktieren Sie Kassoubi.",
      },
      { property: "og:title", content: "Kontakt — Kassoubi" },
      {
        property: "og:description",
        content: "Kontakt für Unternehmen in Deutschland und Kandidaten aus Marokko.",
      },
    ],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  const [activeAudience, setActiveAudience] = useState<Audience>("unternehmen");

  const scrollTo = useCallback((id: string) => {
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  const selectAudience = useCallback(
    (audience: Audience) => {
      setActiveAudience(audience);
      scrollTo("active-path");
    },
    [scrollTo],
  );

  const scrollToCompanyForm = useCallback(() => {
    setActiveAudience("unternehmen");
    scrollTo("unternehmen-form");
  }, [scrollTo]);

  const audienceCards = [
    {
      audience: "unternehmen" as const,
      title: "Für Unternehmen",
      text: "Sie suchen Azubis oder Fachkräfte aus Marokko und möchten Profile strukturiert vorauswählen lassen.",
      primaryCta: "Personal aus Marokko anfragen",
      secondaryCta: "Bedarf per Formular senden",
      microcopy: "Für Ausbildungsbetriebe und Arbeitgeber in Deutschland",
      Icon: Building2,
      SecondaryIcon: BriefcaseBusiness,
      primary: true,
    },
    {
      audience: "bewerber" as const,
      title: "Für Kandidaten",
      text: "Sie möchten sich für eine Ausbildung oder Stelle in Deutschland bewerben und Ihr Profil prüfen lassen.",
      primaryCta: "Profil einreichen",
      microcopy: "Für Bewerberinnen und Bewerber aus Marokko",
      Icon: UserRound,
      SecondaryIcon: GraduationCap,
      primary: false,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-foreground dark:bg-[#080D1A]">
      <Navbar />

      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32 sm:pb-14">
        <div
          className="glow-blob h-[600px] w-[600px] top-[-220px] left-[16%]"
          style={{ background: "var(--blob-primary)" }}
        />
        <div
          className="glow-blob h-[520px] w-[520px] top-[220px] right-[-180px]"
          style={{ background: "var(--blob-accent)" }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-4xl text-center">
            <span className="h-eyebrow mb-6">Kontakt</span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-6 text-3xl font-bold tracking-tight leading-[1.1] sm:text-5xl md:text-6xl"
            >
              Wir verbinden Unternehmen in Deutschland mit Azubis und Fachkräften aus Marokko.
            </motion.h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Unternehmen können ihren Personalbedarf anfragen. Kandidaten aus Marokko können ihr
              Profil für Ausbildung oder Arbeit in Deutschland einreichen.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {audienceCards.map((card, index) => {
              const selected = activeAudience === card.audience;
              return (
                <motion.article
                  key={card.audience}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.55 }}
                  className={`group flex min-h-[300px] flex-col rounded-2xl border bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,0.12)] dark:bg-white/[0.035] dark:shadow-[0_16px_45px_rgba(0,0,0,0.28)] sm:p-7 md:min-h-[370px] ${
                    selected
                      ? "border-primary/45 bg-primary/[0.055] ring-1 ring-primary/20 dark:border-primary/50 dark:bg-primary/[0.08]"
                      : "border-slate-200 dark:border-white/10"
                  } ${
                    card.primary
                      ? ""
                      : "border-accent/25 bg-accent/[0.035] dark:border-accent/25 dark:bg-accent/[0.045] md:scale-[0.985]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl border shadow-sm ${
                        card.primary
                          ? "border-primary/25 bg-primary/10 text-primary"
                          : "border-accent/20 bg-accent/10 text-accent"
                      }`}
                    >
                      <card.Icon size={25} aria-hidden="true" />
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-muted-foreground dark:border-white/10 dark:bg-white/[0.04]">
                      <card.SecondaryIcon size={19} aria-hidden="true" />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-1 flex-col sm:mt-8">
                    <p className="text-sm font-semibold text-primary">{card.microcopy}</p>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                      {card.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                      {card.text}
                    </p>

                    <div className="mt-auto pt-6 sm:pt-8">
                      <button
                        type="button"
                        onClick={() => selectAudience(card.audience)}
                        className={
                          card.primary
                            ? "btn-primary w-full gap-2 sm:w-auto"
                            : "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-6 text-sm font-semibold text-accent transition hover:border-accent/50 hover:bg-accent/15 dark:border-accent/35 dark:bg-accent/10 dark:text-accent dark:hover:border-accent/55 dark:hover:bg-accent/15 sm:w-auto"
                        }
                      >
                        <span>{card.primaryCta}</span>
                        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </button>
                      {card.secondaryCta && (
                        <button
                          type="button"
                          onClick={scrollToCompanyForm}
                          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10 sm:ml-3 sm:mt-0 sm:w-auto"
                        >
                          {card.secondaryCta}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="active-path" className="px-5 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          {activeAudience === "unternehmen" ? (
            <div>
              <div className="mb-6">
                <span className="h-eyebrow">Unternehmen</span>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                  Unternehmen — Personal aus Marokko anfragen
                </h2>
              </div>

              <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-2xl border border-primary/25 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-primary/35 dark:bg-white/[0.035]">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                    <Calendar size={24} aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">Erstberatung vereinbaren</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Buchen Sie eine unverbindliche Erstberatung. Wir prüfen Ihren Bedarf an
                    Auszubildenden oder Fachkräften aus Marokko und zeigen Ihnen den nächsten
                    realistischen Schritt.
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <CheckCircle2 size={16} className="text-primary" aria-hidden="true" />
                    15 Minuten · kostenlos · unverbindlich
                  </div>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={scrollToCompanyForm}
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      Personal aus Marokko anfragen
                    </button>
                    <a
                      href={MAIN_BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      Erstberatung buchen <Calendar size={16} aria-hidden="true" />
                    </a>
                  </div>

                  <div className="mt-8 grid gap-4">
                    {companyTrustBlocks.map((block) => (
                      <div
                        key={block.title}
                        className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.035]"
                      >
                        <h4 className="text-sm font-bold tracking-tight">{block.title}</h4>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {block.items.map((item) => (
                            <span
                              key={item}
                              className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/[0.055] px-3 py-1.5 text-xs font-semibold text-muted-foreground dark:border-primary/25 dark:bg-primary/[0.08]"
                            >
                              <CheckCircle2 size={13} className="text-primary" aria-hidden="true" />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.035]">
                      <h4 className="text-sm font-bold tracking-tight">Typischer Ablauf</h4>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {companyProcessSteps.map((step, index) => (
                          <div key={step} className="flex items-center gap-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                              {index + 1}
                            </span>
                            <span className="text-sm font-medium text-muted-foreground">
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id="unternehmen-form"
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-white/[0.035] sm:p-7"
                >
                  <div className="mb-6 flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Send size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">
                        Bedarf per Formular senden
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Für Unternehmen, die Azubis oder Fachkräfte aus Marokko suchen.
                      </p>
                    </div>
                  </div>
                  <MultiStepForm selectedType="unternehmen" />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <span className="h-eyebrow">Kandidaten</span>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                  Kandidaten — Profil aus Marokko einreichen
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  Reichen Sie Ihr Profil ein, wenn Sie sich für eine Ausbildung oder berufliche
                  Möglichkeit in Deutschland interessieren. Wir prüfen Ihre Angaben strukturiert und
                  melden uns bei passender Eignung.
                </p>
              </div>

              <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-white/[0.035] sm:p-8">
                <div className="mb-6 flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                    <GraduationCap size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">Profil einreichen</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      Reichen Sie Ihre Angaben aus Marokko ein. Sprache, Qualifikation, Unterlagen
                      und Anforderungen der Arbeitgeber werden realistisch geprüft.
                    </p>
                    <p className="mt-3 text-sm font-medium text-muted-foreground">
                      Kostenfreie Ersteinschätzung · keine Zusage oder Vermittlungsgarantie
                    </p>
                  </div>
                </div>
                <MultiStepForm selectedType="bewerber" />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-5 pb-14">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white/70 p-5 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.025]">
          <h2 className="text-sm font-bold tracking-tight">Sie haben eine kurze Frage?</h2>
          <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label="E-Mail an kontakt@kassoubi-vermittlung.de senden"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary/30 dark:border-white/10 dark:bg-white/[0.035]"
            >
              <Mail size={17} className="text-primary" aria-hidden="true" /> E-Mail
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary/30 dark:border-white/10 dark:bg-white/[0.035]"
            >
              <MessageCircle size={17} className="text-primary" aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
