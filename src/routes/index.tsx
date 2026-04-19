import { createFileRoute } from "@tanstack/react-router";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import UrgencyStrip from "../components/UrgencyStrip";
import SegmentationSection from "../components/SegmentationSection";
import AuthoritySection from "../components/AuthoritySection";
import PipelineSection from "../components/PipelineSection";
import ROISection from "../components/ROISection";
import TestimonialsSection from "../components/TestimonialsSection";
import MultiStepForm from "../components/MultiStepForm";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Divider() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="section-divider" />
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      {/* Dark hero (hybrid accent) */}
      <HeroSection />
      <UrgencyStrip />

      {/* Light: corporate body sections */}
      <div className="section-tint-a">
        <SegmentationSection />
      </div>
      <Divider />
      <div className="section-tint-b">
        <AuthoritySection />
      </div>

      {/* Dark accent: emphasizes the structured process */}
      <div className="section-dark">
        <PipelineSection />
      </div>

      {/* Light: dual value */}
      <div className="section-tint-a">
        <ROISection />
      </div>
      <Divider />
      <div className="section-tint-b">
        <TestimonialsSection />
      </div>
      <Divider />
      <div className="section-tint-c">
        <MultiStepForm />
      </div>

      {/* Dark final CTA (hybrid accent) */}
      <FinalCTA />
      <Footer />
    </div>
  );
}
