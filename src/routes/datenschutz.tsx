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
          "Datenschutzerklärung von Kassoubi Vermittlung. Platzhalter bitte vor Veröffentlichung mit den korrekten Datenschutzangaben ersetzen.",
      },
    ],
  }),
  component: DatenschutzPage,
});

const sections = [
  {
    title: "1. Verantwortliche Stelle",
    body: "[Name/Firma], [Adresse], [E-Mail], [Telefon]. Verantwortliche Person: [Vertretungsberechtigte Person].",
  },
  {
    title: "2. Allgemeine Hinweise",
    body: "Diese Datenschutzerklärung informiert darüber, welche personenbezogenen Daten beim Besuch dieser Website und bei Kontaktaufnahme verarbeitet werden. Die Angaben sind vor Veröffentlichung rechtlich zu prüfen und mit den tatsächlichen Prozessen abzugleichen.",
  },
  {
    title: "3. Kontaktaufnahme",
    body: "Wenn Sie über E-Mail, Telefon, WhatsApp oder ein Formular Kontakt aufnehmen, verarbeiten wir die von Ihnen übermittelten Angaben zur Bearbeitung Ihrer Anfrage. Dazu können Name, Kontaktdaten, Unternehmensdaten, Bewerberdaten und Nachrichtentexte gehören.",
  },
  {
    title: "4. Bewerber- und Unternehmensdaten",
    body: "Im Rahmen der Vermittlung können Daten verarbeitet werden, die für Vorauswahl, Kommunikation, Dokumentenprüfung und Prozessbegleitung erforderlich sind. Die konkrete Datenverarbeitung ist abhängig vom finalen Vermittlungsprozess und muss vor Launch detailliert ergänzt werden.",
  },
  {
    title: "5. Rechtsgrundlagen",
    body: "Die Verarbeitung erfolgt je nach Zweck auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, Art. 6 Abs. 1 lit. f DSGVO oder einer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Bitte mit rechtlicher Beratung final prüfen.",
  },
  {
    title: "6. Speicherdauer",
    body: "Personenbezogene Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Konkrete Löschfristen sind vor Veröffentlichung zu ergänzen.",
  },
  {
    title: "7. Weitergabe von Daten",
    body: "Eine Weitergabe kann erfolgen, wenn sie für die Bearbeitung einer Anfrage, die Vermittlung, die Kommunikation mit Partnerunternehmen oder gesetzliche Pflichten erforderlich ist. Empfängergruppen und Dienstleister sind vor Launch konkret zu benennen.",
  },
  {
    title: "8. Ihre Rechte",
    body: "Sie haben nach Maßgabe der DSGVO Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Außerdem können Sie eine erteilte Einwilligung jederzeit widerrufen.",
  },
  {
    title: "9. Beschwerderecht",
    body: "Sie haben das Recht, sich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren. Die zuständige Behörde ist abhängig vom Sitz des Unternehmens und muss ergänzt werden.",
  },
  {
    title: "10. Externe Dienste",
    body: "Falls Dienste wie Terminbuchung, Analysewerkzeuge, Hosting-Provider, Formularanbieter oder Messenger-Dienste eingesetzt werden, müssen diese vor Veröffentlichung konkret benannt und datenschutzrechtlich bewertet werden.",
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
            Strukturierte Datenschutzvorlage für Kassoubi Vermittlung. Bitte vor Veröffentlichung
            mit den tatsächlichen Prozessen, Tools und Unternehmensdaten finalisieren.
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
