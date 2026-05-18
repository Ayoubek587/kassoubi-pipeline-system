import { createFileRoute, redirect } from "@tanstack/react-router";

import { AdminLeadListView } from "@/components/admin/AdminLeadListView";
import { AdminAuthLoading } from "@/components/admin/AdminAuthLoading";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/admin";

export const Route = createFileRoute("/admin/nachrichten")({
  beforeLoad: async () => {
    const session = await getAdminSession({});
    if (!session.authenticated) throw redirect({ to: "/admin/login" });
  },
  head: () => ({
    meta: [{ title: "Nachrichten | Kassoubi Admin" }],
  }),
  pendingComponent: AdminAuthLoading,
  component: AdminNachrichten,
});

function AdminNachrichten() {
  return (
    <AdminShell
      title="Nachrichten"
      description="Kontakt- und Nachrichtenfokus für Leads mit Gesprächsbedarf."
    >
      <AdminLeadListView
        title="Nachrichten & Kontaktanfragen"
        description="Zeigt Kontakt-Leads sowie Leads mit ausgefüllter Nachricht."
        messagesOnly
        emptyTitle="Keine Nachrichten gefunden"
        emptyDescription="Kontaktanfragen und Leads mit Nachricht erscheinen hier automatisch."
      />
    </AdminShell>
  );
}
