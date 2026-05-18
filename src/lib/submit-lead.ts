import { createServerFn } from "@tanstack/react-start";

export type LeadType = "bewerber" | "unternehmen" | "kontakt";

export type SubmitLeadInput = {
  lead_type: LeadType;
  full_name: string;
  email: string;
  phone?: string;
  whatsapp_number?: string;
  german_level?: string;
  ausbildungsbereich?: string;
  company_name?: string;
  website?: string;
  country?: string;
  city?: string;
  source_route?: string;
  need_type?: "ausbildung" | "arbeit";
  privacy_consent?: boolean;
  message?: string;
  cv?: CvUploadInput;
};

export type CvUploadInput = {
  fileName: string;
  mimeType: string;
  size: number;
  base64: string;
};

type SubmitLeadResult = {
  success: true;
  message: string;
  leadId?: string;
  warning?: string;
};

export type PublicBookingLead = {
  id: string;
  full_name: string;
  name: string;
  email: string;
  company_name: string;
  website: string;
  source_route: string;
  raw: Record<string, string | number | boolean | null>;
};

const leadTypes: LeadType[] = ["bewerber", "unternehmen", "kontakt"];
const notificationEmail = "kontakt@kassoubi.de";
const cvBucketName = "bewerber-cvs";
const maxCvSizeBytes = 5 * 1024 * 1024;
const allowedCvMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const allowedCvExtensions = [".pdf", ".doc", ".docx"];

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getFileExtension(fileName: string) {
  const normalized = fileName.toLowerCase();
  return allowedCvExtensions.find((extension) => normalized.endsWith(extension)) || "";
}

function getMimeTypeForExtension(extension: string) {
  if (extension === ".doc") return "application/msword";
  if (extension === ".docx") {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  return "application/pdf";
}

function sanitizeFileName(fileName: string) {
  const extension = getFileExtension(fileName);
  const baseName = (extension ? fileName.slice(0, -extension.length) : fileName)
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);

  return `${baseName || "lebenslauf"}${extension || ".pdf"}`;
}

function validateCvUpload(input: unknown, leadType: LeadType): CvUploadInput | undefined {
  if (!input) return undefined;

  if (leadType !== "bewerber") {
    throw new Error("Lebensläufe können nur für Bewerber-Leads hochgeladen werden.");
  }

  if (typeof input !== "object") {
    throw new Error("Der Lebenslauf konnte nicht verarbeitet werden.");
  }

  const raw = input as Partial<CvUploadInput>;
  const fileName = clean(raw.fileName);
  const mimeType = clean(raw.mimeType);
  const base64 = clean(raw.base64);
  const size = typeof raw.size === "number" ? raw.size : 0;
  const extension = getFileExtension(fileName);

  if (!fileName || !extension) {
    throw new Error("Bitte laden Sie einen Lebenslauf als PDF, DOC oder DOCX hoch.");
  }

  if (mimeType && !allowedCvMimeTypes.includes(mimeType)) {
    throw new Error("Bitte laden Sie einen Lebenslauf als PDF, DOC oder DOCX hoch.");
  }

  if (!size || size > maxCvSizeBytes) {
    throw new Error("Der Lebenslauf darf maximal 5 MB groß sein.");
  }

  if (!base64) {
    throw new Error("Der Lebenslauf konnte nicht gelesen werden.");
  }

  return {
    fileName,
    mimeType: mimeType || getMimeTypeForExtension(extension),
    size,
    base64,
  };
}

function validateLead(input: unknown): SubmitLeadInput {
  if (!input || typeof input !== "object") {
    throw new Error("Bitte füllen Sie das Formular aus.");
  }

  const raw = input as Partial<SubmitLeadInput>;
  const leadType = raw.lead_type;
  const fullName = clean(raw.full_name);
  const email = clean(raw.email).toLowerCase();
  const phone = clean(raw.phone);
  const whatsappNumber = clean(raw.whatsapp_number);
  const germanLevel = clean(raw.german_level);
  const ausbildungsbereich = clean(raw.ausbildungsbereich);
  const companyName = clean(raw.company_name);
  const website = clean(raw.website);
  const country = clean(raw.country);
  const city = clean(raw.city);
  const sourceRoute = clean(raw.source_route);
  const needType = clean(raw.need_type);
  const message = clean(raw.message);

  if (!leadType || !leadTypes.includes(leadType)) {
    throw new Error("Bitte wählen Sie einen gültigen Kontaktbereich aus.");
  }

  if (!fullName) {
    throw new Error("Bitte geben Sie Ihren Namen ein.");
  }

  if (!email || !isEmail(email)) {
    throw new Error("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
  }

  if ((leadType === "bewerber" || leadType === "unternehmen") && raw.privacy_consent !== true) {
    throw new Error("Bitte bestätigen Sie die Datenschutzhinweise.");
  }

  if (leadType === "bewerber" && !phone && !whatsappNumber) {
    throw new Error("Bitte geben Sie Telefon oder WhatsApp an.");
  }

  if (leadType === "unternehmen" && !phone) {
    throw new Error("Bitte geben Sie eine Telefonnummer ein.");
  }

  if (leadType === "bewerber" && !country) {
    throw new Error("Bitte geben Sie Ihr Herkunftsland an.");
  }

  if (leadType === "bewerber" && !germanLevel) {
    throw new Error("Bitte wählen Sie ein Deutschlevel aus.");
  }

  if (leadType === "bewerber" && !ausbildungsbereich) {
    throw new Error("Bitte wählen Sie einen Ausbildungs- oder Arbeitsbereich aus.");
  }

  if (leadType === "unternehmen" && !companyName) {
    throw new Error("Bitte geben Sie den Unternehmensnamen ein.");
  }

  if (leadType === "unternehmen" && !city) {
    throw new Error("Bitte geben Sie Stadt oder Unternehmensstandort ein.");
  }

  if (leadType === "unternehmen" && !["ausbildung", "arbeit"].includes(needType)) {
    throw new Error("Bitte wählen Sie die Art der Zusammenarbeit aus.");
  }

  if (leadType === "kontakt" && !message) {
    throw new Error("Bitte geben Sie eine Nachricht ein.");
  }

  const cv = validateCvUpload(raw.cv, leadType);

  return {
    lead_type: leadType,
    full_name: fullName,
    email,
    phone: phone || undefined,
    whatsapp_number: whatsappNumber || (leadType === "bewerber" ? phone : undefined),
    german_level: germanLevel || undefined,
    ausbildungsbereich: ausbildungsbereich || undefined,
    company_name: companyName || undefined,
    website: website || undefined,
    country: country || undefined,
    city: city || undefined,
    source_route: sourceRoute || undefined,
    need_type: ["ausbildung", "arbeit"].includes(needType)
      ? (needType as "ausbildung" | "arbeit")
      : undefined,
    privacy_consent: raw.privacy_consent === true,
    message: message || undefined,
    cv,
  };
}

function getRequiredEnv() {
  const supabaseUrl = clean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const supabasePublishableKey = clean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  const supabaseSecretKey = clean(process.env.SUPABASE_SECRET_KEY);
  const resendApiKey = clean(process.env.RESEND_API_KEY);

  if (!supabaseUrl || !supabasePublishableKey || !supabaseSecretKey || !resendApiKey) {
    throw new Error(
      "Server-Konfiguration fehlt. Bitte Supabase- und Resend-Keys in .env.local setzen.",
    );
  }

  return {
    supabaseUrl: supabaseUrl.replace(/\/$/, ""),
    supabasePublishableKey,
    supabaseSecretKey,
    resendApiKey,
  };
}

function getSupabaseServerEnv() {
  const supabaseUrl = clean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const supabaseSecretKey = clean(process.env.SUPABASE_SECRET_KEY);

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error("Server-Konfiguration fehlt. Bitte Supabase-Keys in .env.local setzen.");
  }

  return {
    supabaseUrl: supabaseUrl.replace(/\/$/, ""),
    supabaseSecretKey,
  };
}

function compactRecord(record: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(record).filter(([, value]) => Boolean(value)));
}

function base64ToUint8Array(value: string) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function encodeStoragePath(path: string) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function normalizeCvStoragePath(value: string) {
  let path = clean(value).replace(/\\/g, "/");

  if (!path) return "";

  if (path.startsWith("storage://")) {
    path = path.replace(/^storage:\/\//, "");
  } else if (/^https?:\/\//i.test(path)) {
    try {
      const url = new URL(path);
      path = url.pathname;
    } catch {
      // Keep the original value and let the path cleanup below handle it.
    }
  }

  path = path.replace(/^\/+/, "");
  path = path.replace(/^storage\/v1\/object\//, "");
  path = path.replace(/^public\//, "");
  path = path.replace(/^sign\//, "");
  path = path.replace(/^object\//, "");
  path = path.replace(/^public\//, "");

  while (path === cvBucketName || path.startsWith(`${cvBucketName}/`)) {
    path = path.slice(cvBucketName.length).replace(/^\/+/, "");
  }

  path = path
    .split("/")
    .filter(Boolean)
    .map((segment) => {
      try {
        return decodeURIComponent(segment);
      } catch {
        return segment;
      }
    })
    .join("/");

  while (path === cvBucketName || path.startsWith(`${cvBucketName}/`)) {
    path = path.slice(cvBucketName.length).replace(/^\/+/, "");
  }

  return path;
}

async function uploadCvToStorage({
  cv,
  supabaseUrl,
  supabaseSecretKey,
}: {
  cv: CvUploadInput;
  supabaseUrl: string;
  supabaseSecretKey: string;
}) {
  const safeName = sanitizeFileName(cv.fileName);
  const today = new Date().toISOString().slice(0, 10);
  const path = `${today}/${crypto.randomUUID()}-${safeName}`;
  const bytes = base64ToUint8Array(cv.base64);
  const uploadResponse = await fetch(
    `${supabaseUrl}/storage/v1/object/${cvBucketName}/${encodeStoragePath(path)}`,
    {
      method: "POST",
      headers: {
        apikey: supabaseSecretKey,
        Authorization: `Bearer ${supabaseSecretKey}`,
        "Content-Type": cv.mimeType,
        "x-upsert": "false",
      },
      body: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
    },
  );

  if (!uploadResponse.ok) {
    throw new Error(
      "Der Lebenslauf konnte nicht hochgeladen werden. Bitte versuchen Sie es erneut.",
    );
  }

  let uploadedPath = path;
  try {
    const body = (await uploadResponse.json()) as {
      Key?: string;
      key?: string;
      path?: string;
      fullPath?: string;
    };
    uploadedPath = normalizeCvStoragePath(
      body.path || body.Key || body.key || body.fullPath || path,
    );
  } catch {
    uploadedPath = path;
  }

  return {
    filePath: normalizeCvStoragePath(uploadedPath),
  };
}

function emailSubject(lead: SubmitLeadInput) {
  if (lead.lead_type === "bewerber") return "Neue Profilprüfung von Kassoubi";
  if (lead.lead_type === "unternehmen") return "Neue Recruiting-Anfrage von Kassoubi";
  return "Neue Kontaktanfrage von Kassoubi";
}

function emailHtml(lead: SubmitLeadInput) {
  const rows = [
    ["Lead-Typ", lead.lead_type],
    ["Name", lead.full_name],
    ["E-Mail", lead.email],
    ["Telefon", lead.phone],
    ["WhatsApp", lead.whatsapp_number],
    ["Land", lead.country],
    ["Stadt / Standort", lead.city],
    ["Bedarf", lead.need_type],
    ["Deutschlevel", lead.german_level],
    ["Ausbildungs-/Arbeitsbereich", lead.ausbildungsbereich],
    ["Unternehmen", lead.company_name],
    ["Nachricht", lead.message],
    ["Lebenslauf", lead.cv?.fileName],
  ].filter(([, value]) => Boolean(value));

  const rowHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;">${label}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(String(value))}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#111827;">
      <h1 style="font-size:20px;">Neue Anfrage über kassoubi.de</h1>
      <table style="border-collapse:collapse;width:100%;max-width:680px;">${rowHtml}</table>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getMissingColumnName(errorBody: { message?: string; code?: string }) {
  const message = errorBody.message || "";
  const match =
    message.match(/'([^']+)' column/i) ||
    message.match(/column "([^"]+)"/i) ||
    message.match(/Could not find the '([^']+)' column/i);

  return errorBody.code === "PGRST204" && match?.[1] ? match[1] : "";
}

function normalizePublicBookingLead(row: Record<string, unknown>): PublicBookingLead {
  const fullName = clean(row.full_name || row.name);
  const raw = Object.fromEntries(
    Object.entries(row)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [
        key,
        value === null || ["string", "number", "boolean"].includes(typeof value)
          ? (value as string | number | boolean | null)
          : String(value),
      ]),
  );

  return {
    id: clean(row.id),
    full_name: fullName,
    name: fullName,
    email: clean(row.email || row.e_mail),
    company_name: clean(row.company_name),
    website: clean(row.website || row.company_website),
    source_route: clean(row.source_route || row.route || row.lead_origin),
    raw,
  };
}

export const getPublicLeadForBooking = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => {
    const raw = input && typeof input === "object" ? (input as { lead_id?: unknown }) : {};

    return {
      lead_id: clean(raw.lead_id).slice(0, 120),
    };
  })
  .handler(async ({ data }): Promise<PublicBookingLead | null> => {
    if (!data.lead_id) return null;

    const { supabaseUrl, supabaseSecretKey } = getSupabaseServerEnv();
    const response = await fetch(
      `${supabaseUrl}/rest/v1/leads?id=eq.${encodeURIComponent(data.lead_id)}&limit=1`,
      {
        method: "GET",
        headers: {
          apikey: supabaseSecretKey,
          Authorization: `Bearer ${supabaseSecretKey}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) return null;

    const rows = (await response.json()) as Record<string, unknown>[];
    const row = rows[0];

    return row ? normalizePublicBookingLead(row) : null;
  });

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: SubmitLeadInput) => validateLead(input))
  .handler(async ({ data }): Promise<SubmitLeadResult> => {
    const { supabaseUrl, supabaseSecretKey, resendApiKey } = getRequiredEnv();
    const cvMetadata = data.cv
      ? await uploadCvToStorage({ cv: data.cv, supabaseUrl, supabaseSecretKey })
      : null;

    const lead = compactRecord({
      lead_type: data.lead_type,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      whatsapp_number: data.whatsapp_number,
      german_level: data.german_level,
      ausbildungsbereich: data.ausbildungsbereich,
      company_name: data.company_name,
      website: data.website,
      country: data.country,
      city: data.city,
      lead_origin: "website",
      source_route: data.source_route,
      source_detail: data.need_type,
      message: data.message,
      status: "new",
      cv_file_path: cvMetadata?.filePath,
    });

    let leadPayload: Record<string, unknown> = { ...lead };
    let saved = false;
    let savedLeadId = "";

    for (let attempt = 0; attempt < 8; attempt += 1) {
      const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/leads?select=id`, {
        method: "POST",
        headers: {
          apikey: supabaseSecretKey,
          Authorization: `Bearer ${supabaseSecretKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(leadPayload),
      });

      if (supabaseResponse.ok) {
        try {
          const rows = (await supabaseResponse.json()) as Array<{ id?: string }>;
          savedLeadId = clean(rows[0]?.id);
        } catch {
          savedLeadId = "";
        }
        saved = true;
        break;
      }

      let errorBody: { message?: string; code?: string } = {};
      try {
        errorBody = (await supabaseResponse.json()) as { message?: string; code?: string };
      } catch {
        errorBody = {};
      }

      const missingColumn = getMissingColumnName(errorBody);
      if (missingColumn && Object.prototype.hasOwnProperty.call(leadPayload, missingColumn)) {
        const fallbackLead = { ...leadPayload };
        delete fallbackLead[missingColumn];
        leadPayload = fallbackLead;
        continue;
      }

      break;
    }

    if (!saved) {
      throw new Error(
        "Die Anfrage konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.",
      );
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Kassoubi Leads <onboarding@resend.dev>",
        to: [notificationEmail],
        reply_to: data.email,
        subject: emailSubject(data),
        html: emailHtml(data),
      }),
    });

    if (!resendResponse.ok) {
      return {
        success: true,
        message: "Vielen Dank. Ihre Anfrage wurde erfolgreich gesendet.",
        leadId: savedLeadId || undefined,
        warning:
          "Die Anfrage wurde gespeichert, aber die E-Mail-Benachrichtigung konnte nicht gesendet werden.",
      };
    }

    return {
      success: true,
      message: "Vielen Dank. Ihre Anfrage wurde erfolgreich gesendet.",
      leadId: savedLeadId || undefined,
    };
  });
