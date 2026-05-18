import { createFileRoute } from "@tanstack/react-router";

import AnalysisPageTemplate from "@/components/AnalysisPageTemplate";

export const Route = createFileRoute("/analyse")({
  head: () => ({
    meta: [
      { title: "Personal aus Marokko anfragen | Kassoubi" },
      {
        name: "description",
        content:
          "Senden Sie Ihren Bedarf an Auszubildenden oder Fachkräften aus Marokko und buchen Sie danach direkt einen kostenfreien Analyse-Termin.",
      },
    ],
  }),
  component: AnalysisPageTemplate,
});
