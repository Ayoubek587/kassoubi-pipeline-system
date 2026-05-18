type CalendlyLead = {
  id?: string;
  full_name?: string;
  name?: string;
  email?: string;
  company_name?: string;
  website?: string;
  source_route?: string;
  calendly_link?: string;
  raw?: Record<string, unknown>;
};

export const CALENDLY_EVENT_URL =
  clean(import.meta.env.VITE_CALENDLY_EVENT_URL) || "https://calendly.com/omarobakkali/30min";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function firstValue(...values: unknown[]) {
  return values.find((value) => clean(value)) || "";
}

export function getCalendlyBookingUrl(lead: CalendlyLead) {
  const baseUrl = clean(lead.calendly_link) || CALENDLY_EVENT_URL;

  const url = new URL(baseUrl);
  const raw = lead.raw || {};
  const leadId = clean(firstValue(lead.id, raw.id, raw.lead_id));
  const name = clean(firstValue(lead.full_name, lead.name, raw.full_name, raw.name));
  const email = clean(firstValue(lead.email, raw.email, raw.e_mail));
  const companyName = clean(firstValue(lead.company_name, raw.company_name));
  const website = clean(firstValue(lead.website, raw.website, raw.company_website));

  if (name) url.searchParams.set("name", name);
  if (email) url.searchParams.set("email", email);
  if (leadId) url.searchParams.set("a1", leadId);
  if (companyName) url.searchParams.set("a2", companyName);
  if (website) url.searchParams.set("a3", website);

  return url.toString();
}

export const buildCalendlyUrl = getCalendlyBookingUrl;
