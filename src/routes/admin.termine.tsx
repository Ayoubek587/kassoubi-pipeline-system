import { createFileRoute, redirect } from "@tanstack/react-router";
import { CalendarClock, Clock3 } from "lucide-react";

import { AdminAuthLoading } from "@/components/admin/AdminAuthLoading";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminSession } from "@/lib/admin";

export const Route = createFileRoute("/admin/termine")({
  beforeLoad: async () => {
    const session = await getAdminSession({});
    if (!session.authenticated) throw redirect({ to: "/admin/login" });
  },
  head: () => ({
    meta: [{ title: "Termine | Kassoubi Admin" }],
  }),
  pendingComponent: AdminAuthLoading,
  component: AdminTermine,
});

function AdminTermine() {
  return (
    <AdminShell
      title="Termine"
      description="Leichte Terminübersicht für Calendly-gestützte CRM-Aktionen."
    >
      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card className="rounded-xl border-border/70 bg-card/95 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Upcoming Booked Calls</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Operativer Platzhalter für gestartete und später synchronisierte Buchungen.
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CalendarClock className="h-5 w-5" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-dashed border-border bg-background/70 p-8 text-center">
              <Clock3 className="mx-auto h-8 w-8 text-muted-foreground" />
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                Calendly-Automation noch nicht verbunden.
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Book-Call-Aktionen markieren Leads bereits im CRM. Eine echte Kalender- oder
                Webhook-Synchronisierung kann später ergänzt werden.
              </p>
              <Button variant="outline" className="mt-5 rounded-lg bg-card/80">
                Lightweight Integration aktiv
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border/70 bg-card/95 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Vorbereitet für</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {["Neue Buchungen", "Kandidaten-Calls", "Unternehmensgespräche"].map((item) => (
              <div key={item} className="rounded-xl border border-border/70 bg-background/70 p-4">
                <p className="text-sm font-semibold text-foreground">{item}</p>
                <p className="mt-1 text-sm text-muted-foreground">Wird später verbunden.</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
