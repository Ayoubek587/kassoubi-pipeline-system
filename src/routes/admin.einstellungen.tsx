import { createFileRoute, redirect } from "@tanstack/react-router";
import { Settings } from "lucide-react";

import { AdminAuthLoading } from "@/components/admin/AdminAuthLoading";
import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/admin";

export const Route = createFileRoute("/admin/einstellungen")({
  beforeLoad: async () => {
    const session = await getAdminSession({});
    if (!session.authenticated) throw redirect({ to: "/admin/login" });
  },
  head: () => ({
    meta: [{ title: "Einstellungen | Kassoubi Admin" }],
  }),
  pendingComponent: AdminAuthLoading,
  component: AdminEinstellungen,
});

function AdminEinstellungen() {
  return (
    <AdminShell
      title="Einstellungen"
      description="Vorbereitete Systembereiche für Admin-Zugriff, Integrationen und Exporte."
    >
      <AdminPlaceholderPage
        icon={Settings}
        title="Admin Einstellungen"
        description="Diese Seite bündelt später alle administrativen Optionen. Für das MVP bleibt die Logik bewusst schlank."
        items={[
          {
            title: "Admin access",
            description: "Passwort- und Rollenverwaltung für den Adminbereich.",
          },
          {
            title: "Email notifications",
            description: "Benachrichtigungen für neue Leads und wichtige Statusänderungen.",
          },
          {
            title: "Calendly integration",
            description: "Verbindung zu Terminbuchungen und Gesprächsplanung.",
          },
          {
            title: "Data export",
            description: "CSV- oder CRM-Export für operative Auswertungen.",
          },
        ]}
      />
    </AdminShell>
  );
}
