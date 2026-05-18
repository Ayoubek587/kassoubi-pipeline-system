import { createFileRoute, redirect } from "@tanstack/react-router";

import { AdminLeadListView } from "@/components/admin/AdminLeadListView";
import { AdminAuthLoading } from "@/components/admin/AdminAuthLoading";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/admin";

export const Route = createFileRoute("/admin/bewerber")({
  beforeLoad: async () => {
    const session = await getAdminSession({});
    if (!session.authenticated) throw redirect({ to: "/admin/login" });
  },
  head: () => ({
    meta: [{ title: "Bewerber | Kassoubi Admin" }],
  }),
  pendingComponent: AdminAuthLoading,
  component: AdminBewerber,
});

function AdminBewerber() {
  return (
    <AdminShell
      title="Bewerber"
      description="Gefilterte Ansicht für Kandidatenanfragen aus der Lead-Datenbank."
    >
      <AdminLeadListView
        title="Bewerber Leads"
        description="Alle Leads mit lead_type = bewerber, inklusive Status und interner Notizen."
        fixedLeadType="bewerber"
        emptyTitle="Keine Bewerber gefunden"
        emptyDescription="Neue Bewerberanfragen erscheinen automatisch in dieser Ansicht."
      />
    </AdminShell>
  );
}
