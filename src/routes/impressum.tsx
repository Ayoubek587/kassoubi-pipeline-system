import { createFileRoute } from "@tanstack/react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum | Kassoubi Vermittlung" },
      {
        name: "description",
        content:
          "Impressum und Anbieterkennzeichnung von Kassoubi Vermittlung mit Unternehmens- und Steuerangaben.",
      },
    ],
  }),
  component: ImpressumPage,
});

function LegalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border/70 py-4 last:border-b-0">
      <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm sm:text-base text-foreground">{value}</dd>
    </div>
  );
}

const companyAddress = "AV AL QODS L IMCOPA LT2 N 11 ETAGE 3, AOUAMA, TANGER";

function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section className="relative overflow-hidden px-5 pb-10 pt-28 sm:pt-32">
        <div
          className="glow-blob h-[520px] w-[520px] right-[-160px] top-[-220px]"
          style={{ background: "var(--blob-primary)" }}
        />
        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="h-eyebrow mb-6">Rechtliches</span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">Impressum</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Anbieterkennzeichnung und Unternehmensangaben von Kassoubi Vermittlung. Diese Seite
            fasst die wesentlichen Kontaktdaten und Registrierungsangaben transparent zusammen.
          </p>
        </div>
      </section>

      <section className="section-padding pt-4">
        <div className="mx-auto max-w-3xl">
          <div className="glass rounded-2xl p-6 sm:p-8">
            <dl>
              <LegalRow label="Anbieter" value="Kassoubi Vermittlung" />
              <LegalRow label="Adresse" value={companyAddress} />
              <LegalRow label="Berufssteuer-ID" value="57137565" />
              <LegalRow label="Steuer-ID" value="66287721" />
              <LegalRow label="ICE" value="003704454000031" />
              <LegalRow label="Kontakt" value="Weitere Unternehmensangaben auf Anfrage." />
              <LegalRow label="Registerangaben" value="Weitere Register- und Unternehmensangaben auf Anfrage." />
            </dl>
          </div>

          <div className="mt-6 glass rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight">Verantwortlich für den Inhalt</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Kassoubi Vermittlung, {companyAddress}. Verantwortlich im Sinne der redaktionellen
              und geschäftlichen Inhalte ist das Unternehmen Kassoubi Vermittlung.
            </p>
          </div>

          <div className="mt-6 glass rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight">Hinweis zur Streitbeilegung</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Kassoubi Vermittlung ist bestrebt, geschäftliche Anliegen direkt und professionell zu
              klären. Weitere Angaben zu zuständigen Verfahren oder Behörden werden bei Bedarf auf
              Anfrage bereitgestellt.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
