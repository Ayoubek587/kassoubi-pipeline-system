import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MultiStepForm from "../components/MultiStepForm";

// Replace with real Calendly URL
const CALENDLY_URL = "https://calendly.com/your-handle/intro";
const WHATSAPP_URL = "https://wa.me/491234567890";
const EMAIL = "kontakt@kassoubi.de";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Kassoubi Immigration & Recruitment" },
      { name: "description", content: "Termin buchen, Nachricht senden oder per WhatsApp schreiben. Antwort innerhalb von 48 Stunden." },
      { property: "og:title", content: "Kontakt — Kassoubi Immigration & Recruitment" },
      { property: "og:description", content: "Termin buchen, Nachricht senden oder per WhatsApp schreiben. Antwort innerhalb von 48 Stunden." },
    ],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="glow-blob w-[600px] h-[600px] top-[-200px] left-[20%]" style={{ background: "var(--blob-primary)" }} />
        <div className="mx-auto max-w-4xl px-5 text-center relative z-10">
          <span className="h-eyebrow mb-6">Kontakt</span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Lassen Sie uns <span className="gradient-text">sprechen</span>
          </motion.h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Buchen Sie einen Termin, schreiben Sie uns per WhatsApp oder nutzen Sie das Formular. Antwort in 48 Stunden.
          </p>
        </div>
      </section>

      <section className="px-5 pb-12">
        <div className="mx-auto max-w-6xl grid md:grid-cols-3 gap-4">
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="glass glass-hover-lift rounded-2xl p-6 flex items-center gap-4">
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
          <div className="glass rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[16/8]">
            <iframe
              src={CALENDLY_URL}
              className="w-full h-full"
              title="Calendly"
              loading="lazy"
            />
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Calendly-Embed — wird beim Klick interaktiv geladen.
          </p>
        </div>
      </section>

      <MultiStepForm />

      <Footer />
    </div>
  );
}
