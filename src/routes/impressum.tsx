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
          "Impressum und Anbieterkennzeichnung von Kassoubi Vermittlung. Platzhalter bitte vor Veröffentlichung mit den korrekten Unternehmensdaten ersetzen.",
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
            Anbieterkennzeichnung gemäß den gesetzlichen Informationspflichten. Die folgenden
            Platzhalter müssen vor Veröffentlichung durch die korrekten Unternehmensdaten ersetzt
            werden.
          </p>
        </div>
      </section>

      <section className="section-padding pt-4">
        <div className="mx-auto max-w-3xl">
          <div className="glass rounded-2xl p-6 sm:p-8">
            <dl>
              <LegalRow label="Anbieter" value="[Name/Firma]" />
              <LegalRow label="Adresse" value="[Adresse]" />
              <LegalRow
                label="Vertretungsberechtigte Person"
                value="[Vertretungsberechtigte Person]"
              />
              <LegalRow label="E-Mail" value="[E-Mail]" />
              <LegalRow label="Telefon" value="[Telefon]" />
              <LegalRow label="Umsatzsteuer-ID" value="[Umsatzsteuer-ID, falls vorhanden]" />
              <LegalRow label="Registerangaben" value="[Registergericht / Registernummer, falls vorhanden]" />
            </dl>
          </div>

          <div className="mt-6 glass rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight">Verantwortlich für den Inhalt</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              [Name/Firma], [Adresse]. Bitte prüfen Sie diese Angaben rechtlich, bevor die Website
              öffentlich geschaltet wird.
            </p>
          </div>

          <div className="mt-6 glass rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight">Hinweis zur Streitbeilegung</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Angaben zur Verbraucherstreitbeilegung und zur Online-Streitbeilegung sind abhängig
              von der konkreten Unternehmensform und Tätigkeit. Bitte vor Veröffentlichung rechtlich
              finalisieren.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
