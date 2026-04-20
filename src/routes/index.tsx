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
      <HeroSection />
      <UrgencyStrip />

      <SegmentationSection />
      <Divider />
      <AuthoritySection />
      <Divider />
      <PipelineSection />
      <Divider />
      <ROISection />
      <Divider />
      <TestimonialsSection />
      <Divider />
      <MultiStepForm />

      <FinalCTA />
      <Footer />
    </div>
  );
}
