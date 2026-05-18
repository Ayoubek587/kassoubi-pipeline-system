import { createFileRoute } from "@tanstack/react-router";

import { handleCalendlyWebhookRequest } from "@/lib/calendly-webhook";

export const Route = createFileRoute("/api/calendly/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => handleCalendlyWebhookRequest(request),
    },
  },
});
