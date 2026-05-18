import { AdminBrand } from "@/components/admin/AdminBrand";

export function AdminAuthLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--primary)_10%,transparent),transparent_30%),linear-gradient(180deg,var(--surface),var(--background))] px-4">
      <div className="grid justify-items-center gap-5 rounded-2xl border border-border/70 bg-card/90 px-8 py-7 text-center shadow-[0_20px_70px_color-mix(in_oklab,var(--foreground)_9%,transparent)]">
        <AdminBrand />
        <div>
          <p className="text-sm font-semibold text-foreground">Admin-Sitzung wird geprüft</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Einen Moment, der geschützte Bereich wird geladen.
          </p>
        </div>
      </div>
    </main>
  );
}
