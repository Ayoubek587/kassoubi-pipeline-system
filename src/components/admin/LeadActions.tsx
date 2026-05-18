import { useState, type MouseEvent, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Archive,
  BellPlus,
  CalendarPlus,
  CheckCircle2,
  Copy,
  Mail,
  MailCheck,
  MessageCircle,
  Phone,
  PhoneCall,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  archiveAdminLead,
  initiateCalendlyBooking,
  updateLeadAction,
  type AdminLead,
  type AdminLeadActionStatus,
} from "@/lib/admin";
import { getCalendlyBookingUrl } from "@/lib/calendly";
import { cn } from "@/lib/utils";

const actionLabels: Record<AdminLeadActionStatus, string> = {
  contacted: "Kontaktiert",
  called: "Angerufen",
  emailed: "E-Mail gesendet",
  whatsapp_sent: "WhatsApp gesendet",
  follow_up_needed: "Follow-up nötig",
};

function whatsappHref(phone: string) {
  const clean = phone.replace(/[\s()+-]/g, "").replace(/[^\d]/g, "");
  return clean ? `https://wa.me/${clean}` : "";
}

function copyValue(value: string, successMessage: string, emptyMessage: string) {
  if (!value) {
    toast.error(emptyMessage);
    return;
  }

  if (typeof navigator === "undefined" || !navigator.clipboard) {
    toast.error("Kopieren wird in diesem Browser nicht unterstützt.");
    return;
  }

  navigator.clipboard
    .writeText(value)
    .then(() => toast.success(successMessage))
    .catch(() => toast.error("Kopieren fehlgeschlagen."));
}

function stop(event: MouseEvent) {
  event.stopPropagation();
}

function ActionTooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function LeadActions({
  lead,
  compact = false,
  className,
  followUpDate,
  onUpdated,
  onArchived,
}: {
  lead: AdminLead;
  compact?: boolean;
  className?: string;
  followUpDate?: string;
  onUpdated?: (lead: AdminLead) => void;
  onArchived?: (lead: AdminLead) => void;
}) {
  const updateAction = useServerFn(updateLeadAction);
  const archiveLead = useServerFn(archiveAdminLead);
  const initiateBooking = useServerFn(initiateCalendlyBooking);
  const [pendingAction, setPendingAction] = useState<
    AdminLeadActionStatus | "archive" | "calendly" | ""
  >("");
  const hasEmail = Boolean(lead.email);
  const hasPhone = Boolean(lead.phone);
  const whatsappNumber = lead.whatsapp_number || lead.phone;
  const whatsApp = whatsappNumber ? whatsappHref(whatsappNumber) : "";
  const calendlyUrl = getCalendlyBookingUrl(lead);

  const markAction = (actionStatus: AdminLeadActionStatus) => {
    if (actionStatus === "follow_up_needed" && !followUpDate) {
      toast.error("Bitte zuerst ein Follow-up Datum auswählen.");
      return;
    }

    setPendingAction(actionStatus);
    updateAction({
      data: {
        id: lead.id,
        action_status: actionStatus,
        follow_up_date: actionStatus === "follow_up_needed" ? followUpDate : undefined,
      },
    })
      .then((updatedLead) => {
        onUpdated?.(updatedLead);
        toast.success(`${actionLabels[actionStatus]} wurde gespeichert.`);
      })
      .catch((error) => {
        toast.error(
          error instanceof Error ? error.message : "Aktion konnte nicht gespeichert werden.",
        );
      })
      .finally(() => {
        setPendingAction("");
      });
  };

  const archive = () => {
    setPendingAction("archive");
    archiveLead({ data: { id: lead.id } })
      .then((updatedLead) => {
        if (onArchived) {
          onArchived(updatedLead);
        } else {
          onUpdated?.(updatedLead);
        }
        toast.success("Lead wurde archiviert.");
      })
      .catch((error) => {
        toast.error(
          error instanceof Error ? error.message : "Lead konnte nicht archiviert werden.",
        );
      })
      .finally(() => {
        setPendingAction("");
      });
  };

  const bookCall = () => {
    if (!calendlyUrl) {
      toast.error("Calendly-Link ist noch nicht konfiguriert.");
      return;
    }

    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
    setPendingAction("calendly");
    initiateBooking({ data: { id: lead.id, calendly_link: calendlyUrl } })
      .then((updatedLead) => {
        onUpdated?.(updatedLead);
        toast.success("Calendly-Buchung wurde gestartet.");
      })
      .catch((error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Calendly-Aktion konnte nicht gespeichert werden.",
        );
      })
      .finally(() => {
        setPendingAction("");
      });
  };

  const emailCopyButton = (
    <Button
      type="button"
      variant="outline"
      size={compact ? "icon" : "sm"}
      className="rounded-lg bg-card/80"
      disabled={!hasEmail}
      onClick={(event) => {
        stop(event);
        copyValue(lead.email, "E-Mail kopiert.", "Keine E-Mail vorhanden.");
      }}
      aria-label="E-Mail kopieren"
    >
      <Copy className="h-4 w-4" />
      {!compact && "E-Mail kopieren"}
    </Button>
  );

  const phoneCopyButton = (
    <Button
      type="button"
      variant="outline"
      size={compact ? "icon" : "sm"}
      className="rounded-lg bg-card/80"
      disabled={!hasPhone}
      onClick={(event) => {
        stop(event);
        copyValue(lead.phone, "Telefonnummer kopiert.", "Keine Telefonnummer vorhanden.");
      }}
      aria-label="Telefon kopieren"
    >
      <Phone className="h-4 w-4" />
      {!compact && "Telefon kopieren"}
    </Button>
  );

  const emailButton = (
    <Button
      asChild
      variant="outline"
      size={compact ? "icon" : "sm"}
      className="rounded-lg bg-card/80"
      aria-label="E-Mail senden"
    >
      <a
        href={hasEmail ? `mailto:${lead.email}` : undefined}
        aria-disabled={!hasEmail}
        onClick={(event) => {
          stop(event);
          if (!hasEmail) {
            event.preventDefault();
            toast.error("Keine E-Mail vorhanden.");
          }
        }}
      >
        <Mail className="h-4 w-4" />
        {!compact && "E-Mail senden"}
      </a>
    </Button>
  );

  const whatsappButton = (
    <Button
      asChild
      variant="outline"
      size={compact ? "icon" : "sm"}
      className="rounded-lg bg-card/80"
      aria-label="WhatsApp öffnen"
    >
      <a
        href={whatsApp || undefined}
        target="_blank"
        rel="noreferrer"
        aria-disabled={!whatsApp}
        onClick={(event) => {
          stop(event);
          if (!whatsApp) {
            event.preventDefault();
            toast.error("Keine WhatsApp-Nummer vorhanden.");
          }
        }}
      >
        <MessageCircle className="h-4 w-4" />
        {!compact && "WhatsApp öffnen"}
      </a>
    </Button>
  );

  const archiveButton = (
    <Button
      type="button"
      variant="outline"
      size={compact ? "icon" : "sm"}
      className="rounded-lg bg-card/80 text-muted-foreground hover:text-destructive"
      disabled={Boolean(pendingAction)}
      onClick={(event) => {
        stop(event);
        archive();
      }}
      aria-label="Lead archivieren"
    >
      <Archive className="h-4 w-4" />
      {!compact && "Archivieren"}
    </Button>
  );

  const bookCallButton = (
    <Button
      type="button"
      variant="outline"
      size={compact ? "icon" : "sm"}
      className="rounded-lg bg-card/80"
      disabled={pendingAction === "calendly"}
      onClick={(event) => {
        stop(event);
        bookCall();
      }}
      aria-label="Book Call"
    >
      <CalendarPlus className="h-4 w-4" />
      {!compact && "Book Call"}
    </Button>
  );

  if (compact) {
    return (
      <TooltipProvider delayDuration={150}>
        <div className={cn("flex items-center gap-1.5", className)}>
          <ActionTooltip label="Book Call">{bookCallButton}</ActionTooltip>
          <ActionTooltip label="E-Mail kopieren">{emailCopyButton}</ActionTooltip>
          <ActionTooltip label="Telefon kopieren">{phoneCopyButton}</ActionTooltip>
          <ActionTooltip label="E-Mail senden">{emailButton}</ActionTooltip>
          <ActionTooltip label="WhatsApp öffnen">{whatsappButton}</ActionTooltip>
          <ActionTooltip label="Archivieren">{archiveButton}</ActionTooltip>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <div className={cn("grid gap-3", className)}>
      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          asChild
          variant="outline"
          className="justify-start rounded-lg bg-card/80"
          aria-label="Anrufen"
        >
          <a
            href={hasPhone ? `tel:${lead.phone.replace(/\s/g, "")}` : undefined}
            aria-disabled={!hasPhone}
            onClick={(event) => {
              stop(event);
              if (!hasPhone) {
                event.preventDefault();
                toast.error("Keine Telefonnummer vorhanden.");
              }
            }}
          >
            <Phone className="h-4 w-4" />
            Anrufen
          </a>
        </Button>
        {whatsappButton}
        {emailButton}
        {bookCallButton}
        {emailCopyButton}
        {phoneCopyButton}
      </div>

      <div className="grid gap-2">
        <Button
          type="button"
          variant="outline"
          className="justify-start rounded-lg bg-card/80"
          disabled={Boolean(pendingAction)}
          onClick={() => markAction("contacted")}
        >
          <CheckCircle2 className="h-4 w-4" />
          Als kontaktiert markieren
        </Button>
        <Button
          type="button"
          variant="outline"
          className="justify-start rounded-lg bg-card/80"
          disabled={Boolean(pendingAction)}
          onClick={() => markAction("called")}
        >
          <PhoneCall className="h-4 w-4" />
          Als angerufen markieren
        </Button>
        <Button
          type="button"
          variant="outline"
          className="justify-start rounded-lg bg-card/80"
          disabled={Boolean(pendingAction)}
          onClick={() => markAction("whatsapp_sent")}
        >
          <MessageCircle className="h-4 w-4" />
          Als WhatsApp gesendet markieren
        </Button>
        <Button
          type="button"
          variant="outline"
          className="justify-start rounded-lg bg-card/80"
          disabled={Boolean(pendingAction)}
          onClick={() => markAction("emailed")}
        >
          <MailCheck className="h-4 w-4" />
          Als E-Mail gesendet markieren
        </Button>
        <Button
          type="button"
          variant="outline"
          className="justify-start rounded-lg bg-card/80"
          disabled={Boolean(pendingAction)}
          onClick={() => markAction("follow_up_needed")}
        >
          <BellPlus className="h-4 w-4" />
          Follow-up planen
        </Button>
        {archiveButton}
      </div>
    </div>
  );
}
