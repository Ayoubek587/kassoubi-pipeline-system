import { Badge } from "@/components/ui/badge";
import type { AdminLeadStatus } from "@/lib/admin";
import { cn } from "@/lib/utils";
import { statusLabels } from "./lead-status";

const statusClasses: Record<AdminLeadStatus, string> = {
  new: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-200",
  contacted:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200",
  qualified:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-200",
  booked:
    "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900/60 dark:bg-cyan-950/40 dark:text-cyan-200",
  proposal:
    "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-200",
  closed:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200",
  lost: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200",
  archived:
    "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-200",
};

export function LeadStatusBadge({ status }: { status: string }) {
  const typedStatus = status as AdminLeadStatus;
  const label = statusLabels[typedStatus] || status || "Neu";

  return (
    <Badge
      variant="outline"
      className={cn(
        "whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold",
        statusClasses[typedStatus],
      )}
    >
      {label}
    </Badge>
  );
}
