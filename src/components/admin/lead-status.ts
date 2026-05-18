import type { AdminLeadStatus } from "@/lib/admin";

export const statusLabels: Record<AdminLeadStatus, string> = {
  new: "Neu",
  contacted: "Kontaktiert",
  qualified: "Qualifiziert",
  booked: "Booked",
  proposal: "Angebot",
  closed: "Abgeschlossen",
  lost: "Verloren",
  archived: "Archiviert",
};
