import { createFileRoute } from "@tanstack/react-router";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
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

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <SegmentationSection />
      <AuthoritySection />
      <PipelineSection />
      <ROISection />
      <TestimonialsSection />
      <MultiStepForm />
      <FinalCTA />
      <Footer />
    </div>
  );
}
