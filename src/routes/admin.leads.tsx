import { Outlet, createFileRoute, redirect, useLocation } from "@tanstack/react-router";

import { AdminLeadListView } from "@/components/admin/AdminLeadListView";
import { AdminAuthLoading } from "@/components/admin/AdminAuthLoading";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/admin";

export const Route = createFileRoute("/admin/leads")({
  beforeLoad: async () => {
    const session = await getAdminSession({});
    if (!session.authenticated) {
      throw redirect({ to: "/admin/login" });
    }
  },
  head: () => ({
    meta: [{ title: "Leads | Kassoubi Admin" }],
  }),
  pendingComponent: AdminAuthLoading,
  component: AdminLeads,
});

function AdminLeads() {
  const location = useLocation();

  if (location.pathname !== "/admin/leads") {
    return <Outlet />;
  }

  return (
    <AdminShell
      title="Leads"
      description="Durchsuchen, filtern und bearbeiten Sie alle Bewerber- und Unternehmensanfragen."
    >
      <AdminLeadListView />
    </AdminShell>
  );
}
