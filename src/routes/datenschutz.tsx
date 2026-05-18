import { createFileRoute } from "@tanstack/react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung | Kassoubi Vermittlung" },
      {
        name: "description",
        content:
          "Datenschutzerklärung von Kassoubi Vermittlung mit Informationen zur Verarbeitung personenbezogener Daten im Rahmen der Vermittlung von Kandidaten aus Marokko.",
      },
    ],
  }),
  component: DatenschutzPage,
});

const companyAddress = "AV AL QODS L IMCOPA LT2 N 11 ETAGE 3, AOUAMA, TANGER";

const sections = [
  {
    title: "1. Verantwortliche Stelle",
    body: `Verantwortlich für die Datenverarbeitung auf dieser Website und im Rahmen der Kontaktaufnahme ist Kassoubi Vermittlung, ${companyAddress}. Berufssteuer-ID: 57137565. Steuer-ID: 66287721. ICE: 003704454000031. Weitere Informationen erhalten Sie auf Anfrage.`,
  },
  {
    title: "2. Allgemeine Hinweise",
    body: "Diese Datenschutzerklärung informiert darüber, welche personenbezogenen Daten beim Besuch dieser Website, bei Kontaktaufnahme sowie im Rahmen von Recruiting-, Headhunting- und Kandidatenvermittlungsprozessen verarbeitet werden. Die Verarbeitung erfolgt ausschließlich zweckgebunden und nach Maßgabe der jeweils anwendbaren Datenschutzvorschriften.",
  },
  {
    title: "3. Kontaktaufnahme",
    body: "Wenn Sie über E-Mail, Telefon, WhatsApp oder ein Formular Kontakt aufnehmen, verarbeiten wir die von Ihnen übermittelten Angaben zur Bearbeitung Ihrer Anfrage. Dazu können Name, Kontaktdaten, Unternehmensdaten, Bewerberdaten und Nachrichtentexte gehören.",
  },
  {
    title: "4. Bewerber- und Unternehmensdaten",
    body: "Im Rahmen der Kandidatenvermittlung aus Marokko nach Deutschland können Daten verarbeitet werden, die für Vorauswahl, Kommunikation, Dokumentenprüfung, Matching, Terminabstimmung und Prozessbegleitung erforderlich sind. Dazu können insbesondere Profilangaben, Qualifikationen, Sprachlevel, gewünschte Einsatzbereiche, Unternehmensbedarfe und vermittlungsrelevante Kommunikationsinhalte gehören.",
  },
  {
    title: "5. Rechtsgrundlagen",
    body: "Die Verarbeitung erfolgt je nach Zweck auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, Art. 6 Abs. 1 lit. f DSGVO oder einer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Soweit gesetzliche Aufbewahrungs- oder Nachweispflichten bestehen, kann die Verarbeitung zusätzlich auf den jeweils einschlägigen gesetzlichen Vorgaben beruhen.",
  },
  {
    title: "6. Speicherdauer",
    body: "Personenbezogene Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Sobald der Verarbeitungszweck entfällt und keine gesetzlichen Pflichten entgegenstehen, werden die Daten gelöscht oder datenschutzkonform eingeschränkt.",
  },
  {
    title: "7. Weitergabe von Daten",
    body: "Eine Weitergabe kann erfolgen, wenn sie für die Bearbeitung einer Anfrage, die Kandidatenvermittlung, die Kommunikation mit Partnerunternehmen, die Prüfung von Profilen oder gesetzliche Pflichten erforderlich ist. Empfänger können insbesondere interessierte Arbeitgeber, Partnerunternehmen, technische Dienstleister oder zuständige Stellen sein, soweit dies für den jeweiligen Prozess notwendig ist.",
  },
  {
    title: "8. Ihre Rechte",
    body: "Sie haben nach Maßgabe der DSGVO Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Außerdem können Sie eine erteilte Einwilligung jederzeit widerrufen.",
  },
  {
    title: "9. Beschwerderecht",
    body: "Sie haben das Recht, sich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen Datenschutzrecht verstößt. Weitere Informationen zur zuständigen Stelle erhalten Sie auf Anfrage.",
  },
  {
    title: "10. Externe Dienste",
    body: "Für den Betrieb der Website und die Bearbeitung von Anfragen können technische Dienstleister, Hosting-Leistungen, Formularfunktionen, Kommunikationsdienste oder Terminabstimmungslösungen eingesetzt werden. Die Auswahl und Nutzung solcher Dienste erfolgt unter Berücksichtigung datenschutzrechtlicher Anforderungen. Weitere Informationen erhalten Sie auf Anfrage.",
  },
];

function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section className="relative overflow-hidden px-5 pb-10 pt-28 sm:pt-32">
        <div
          className="glow-blob h-[520px] w-[520px] left-[-160px] top-[-220px]"
          style={{ background: "var(--blob-primary)" }}
        />
        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="h-eyebrow mb-6">Rechtliches</span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
            Datenschutzerklärung
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Informationen zur Verarbeitung personenbezogener Daten durch Kassoubi Vermittlung im
            Rahmen dieser Website, der Kontaktaufnahme und der Kandidatenvermittlung aus Marokko.
          </p>
        </div>
      </section>

      <section className="section-padding pt-4">
        <div className="mx-auto max-w-3xl space-y-5">
          {sections.map((section) => (
            <article key={section.title} className="glass rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-semibold tracking-tight">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
