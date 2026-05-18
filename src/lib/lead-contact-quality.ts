export type MissingContactField = "email" | "phone" | "whatsapp";

type ContactRecord = {
  email?: unknown;
  e_mail?: unknown;
  phone?: unknown;
  telefon?: unknown;
  whatsapp?: unknown;
  whatsapp_number?: unknown;
  raw?: Record<string, unknown>;
};

const missingContactLabels: Record<MissingContactField, string> = {
  email: "E-Mail",
  phone: "Telefon",
  whatsapp: "WhatsApp",
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function firstValue(...values: unknown[]) {
  return values.find((value) => clean(value)) || "";
}

export function getMissingContactFields(record: ContactRecord): MissingContactField[] {
  const raw = record.raw || {};
  const email = firstValue(record.email, record.e_mail, raw.email, raw.e_mail);
  const phone = firstValue(record.phone, record.telefon, raw.phone, raw.telefon);
  const whatsapp = firstValue(
    record.whatsapp,
    record.whatsapp_number,
    raw.whatsapp,
    raw.whatsapp_number,
  );
  const missing: MissingContactField[] = [];

  if (!clean(email)) missing.push("email");
  if (!clean(phone)) missing.push("phone");
  if (!clean(whatsapp)) missing.push("whatsapp");

  return missing;
}

export function getMissingContactMessage(fields: MissingContactField[]) {
  if (fields.length === 0) return "";

  const labels = fields.map((field) => missingContactLabels[field]);
  const formattedLabels =
    labels.length === 1
      ? labels[0]
      : `${labels.slice(0, -1).join(", ")} und ${labels[labels.length - 1]}`;

  return `Missing contact data: ${formattedLabels} fehlt. Bitte prüfen oder ergänzen.`;
}
