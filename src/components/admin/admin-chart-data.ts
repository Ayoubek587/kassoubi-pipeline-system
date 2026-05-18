import type { AdminLead } from "@/lib/admin";

export type TrendPoint = {
  key: string;
  label: string;
  total: number;
  new: number;
  bewerber: number;
  unternehmen: number;
  kontakt: number;
  active: number;
};

export function getLeadTrendData(leads: AdminLead[]): TrendPoint[] {
  const days = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));

    return {
      key: date.toISOString().slice(0, 10),
      label: new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit" }).format(date),
      total: 0,
      new: 0,
      bewerber: 0,
      unternehmen: 0,
      kontakt: 0,
      active: 0,
    };
  });
  const lookup = new Map(days.map((day) => [day.key, day]));

  leads.forEach((lead) => {
    const date = new Date(lead.created_at);
    if (Number.isNaN(date.getTime())) return;

    const day = lookup.get(date.toISOString().slice(0, 10));
    if (!day) return;

    day.total += 1;
    if (lead.status === "new") day.new += 1;
    if (lead.type === "bewerber") day.bewerber += 1;
    if (lead.type === "unternehmen") day.unternehmen += 1;
    if (lead.type === "kontakt") day.kontakt += 1;
    if (lead.status === "contacted" || lead.status === "qualified" || lead.status === "proposal") {
      day.active += 1;
    }
  });

  return days;
}
