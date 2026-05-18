import { createFileRoute, redirect } from "@tanstack/react-router";

import { AdminLeadListView } from "@/components/admin/AdminLeadListView";
import { AdminAuthLoading } from "@/components/admin/AdminAuthLoading";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/admin";

export const Route = createFileRoute("/admin/unternehmen")({
  beforeLoad: async () => {
    const session = await getAdminSession({});
    if (!session.authenticated) throw redirect({ to: "/admin/login" });
  },
  head: () => ({
    meta: [{ title: "Unternehmen | Kassoubi Admin" }],
  }),
  pendingComponent: AdminAuthLoading,
  component: AdminUnternehmen,
});

function AdminUnternehmen() {
  return (
    <AdminShell
      title="Unternehmen"
      description="Gefilterte Ansicht für Unternehmens- und Recruiting-Anfragen."
    >
      <AdminLeadListView
        title="Unternehmen Leads"
        description="Alle Leads mit lead_type = unternehmen, bereit für Follow-up und Statuspflege."
        fixedLeadType="unternehmen"
        emptyTitle="Keine Unternehmensanfragen gefunden"
        emptyDescription="Neue Unternehmensanfragen erscheinen automatisch in dieser Ansicht."
      />
    </AdminShell>
  );
}
