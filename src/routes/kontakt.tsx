import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Calendar, ExternalLink } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MultiStepForm from "../components/MultiStepForm";

// Replace with real Calendly URL when available (e.g. https://calendly.com/your-handle/intro)
const CALENDLY_URL = "";
const WHATSAPP_URL = "https://wa.me/491234567890";
const EMAIL = "kontakt@kassoubi.de";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Kostenloses Erstgespräch vereinbaren | Kassoubi" },
      { name: "description", content: "Wir analysieren Ihren Bedarf und zeigen Ihnen den nächsten Schritt. Antwort innerhalb von 48 Stunden." },
      { property: "og:title", content: "Kontakt — Kostenloses Erstgespräch | Kassoubi" },
      { property: "og:description", content: "Termin buchen, Nachricht senden oder per WhatsApp schreiben. Antwort innerhalb von 48 Stunden." },
    ],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  const calendlyAvailable = CALENDLY_URL.startsWith("https://");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section className="relative pt-28 sm:pt-32 pb-8 sm:pb-12 overflow-hidden">
        <div className="glow-blob w-[600px] h-[600px] top-[-200px] left-[20%]" style={{ background: "var(--blob-primary)" }} />
        <div className="mx-auto max-w-4xl px-5 text-center relative z-10">
          <span className="h-eyebrow mb-6">Kontakt</span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-6 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            Analyse starten — <span className="gradient-text">in 48 Stunden zum nächsten Schritt</span>.
          </motion.h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Wir prüfen Ihren Bedarf, zeigen die passende Pipeline und liefern einen konkreten Plan. Kostenfrei. Verbindlich. Strukturiert.
          </p>
        </div>
      </section>

      <section className="px-5 pb-12">
        <div className="mx-auto max-w-6xl grid md:grid-cols-3 gap-4">
          <a
            href={calendlyAvailable ? CALENDLY_URL : "#kontakt"}
            target={calendlyAvailable ? "_blank" : undefined}
            rel={calendlyAvailable ? "noopener noreferrer" : undefined}
            className="glass glass-hover-lift rounded-2xl p-6 flex items-center gap-4"
          >
            <div className="icon-tile h-12 w-12"><Calendar size={22} /></div>
            <div>
              <div className="font-semibold tracking-tight">Termin buchen</div>
              <div className="text-sm text-muted-foreground">15-Min Erstgespräch</div>
            </div>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="glass glass-hover-lift rounded-2xl p-6 flex items-center gap-4">
            <div className="icon-tile h-12 w-12"><MessageCircle size={22} /></div>
            <div>
              <div className="font-semibold tracking-tight">WhatsApp</div>
              <div className="text-sm text-muted-foreground">Direkt schreiben</div>
            </div>
          </a>
          <a href={`mailto:${EMAIL}`} className="glass glass-hover-lift rounded-2xl p-6 flex items-center gap-4">
            <div className="icon-tile h-12 w-12"><Mail size={22} /></div>
            <div>
              <div className="font-semibold tracking-tight">E-Mail</div>
              <div className="text-sm text-muted-foreground">{EMAIL}</div>
            </div>
          </a>
        </div>
      </section>

      <section className="section-padding pt-4">
        <div className="mx-auto max-w-5xl">
          {calendlyAvailable ? (
            <div className="glass rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[16/8]">
              <iframe
                src={CALENDLY_URL}
                className="w-full h-full border-0"
                title="Termin buchen"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="glass rounded-3xl p-10 md:p-14 text-center" style={{ boxShadow: "var(--shadow-elevated)" }}>
              <div className="icon-tile h-14 w-14 mx-auto mb-5"><Calendar size={24} /></div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Termin direkt vereinbaren
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                Schreiben Sie uns über das Formular unten — wir senden Ihnen einen Buchungslink für ein 15-minütiges Erstgespräch.
              </p>
              <a href={`mailto:${EMAIL}`} className="btn-secondary inline-flex items-center gap-2">
                Per E-Mail anfragen <ExternalLink size={14} />
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="mx-auto max-w-3xl text-center mb-2">
          <span className="h-eyebrow mb-5">Formular</span>
          <h2 className="h-display mt-5">
            Starten Sie jetzt — <span className="gradient-text">wir melden uns innerhalb von 48 Stunden</span>
          </h2>
        </div>
      </section>

      <MultiStepForm />

      <Footer />
    </div>
  );
}
