import { createServerFn } from "@tanstack/react-start";
import {
  deleteCookie,
  getCookie,
  getRequestProtocol,
  setCookie,
} from "@tanstack/react-start/server";

export const leadTypes = ["bewerber", "unternehmen", "kontakt"] as const;
export const adminLeadFormTypes = ["bewerber", "unternehmen"] as const;
export const leadStatuses = [
  "new",
  "contacted",
  "qualified",
  "booked",
  "proposal",
  "closed",
  "lost",
  "archived",
] as const;
export const leadPriorities = ["low", "normal", "high", "urgent"] as const;
export const leadActionStatuses = [
  "contacted",
  "called",
  "emailed",
  "whatsapp_sent",
  "follow_up_needed",
] as const;
export const leadOrigins = [
  "website",
  "dashboard",
  "whatsapp",
  "phone",
  "email",
  "referral",
  "linkedin",
  "other",
] as const;

export type AdminLeadType = (typeof leadTypes)[number];
export type AdminLeadFormType = (typeof adminLeadFormTypes)[number];
export type AdminLeadStatus = (typeof leadStatuses)[number];
export type AdminLeadPriority = (typeof leadPriorities)[number];
export type AdminLeadActionStatus = (typeof leadActionStatuses)[number];
export type AdminLeadOrigin = (typeof leadOrigins)[number];

export type LeadFilters = {
  search?: string;
  leadType?: AdminLeadType | "all";
  status?: AdminLeadStatus | "all";
  priority?: AdminLeadPriority | "all";
  actionStatus?: AdminLeadActionStatus | "all";
  archived?: "active" | "archived" | "all";
  deleted?: "active" | "deleted" | "all";
  limit?: number;
};

export type AdminLead = {
  id: string;
  name: string;
  type: string;
  email: string;
  phone: string;
  whatsapp_number: string;
  german_level: string;
  ausbildungsbereich: string;
  company_name: string;
  status: AdminLeadStatus | string;
  priority: AdminLeadPriority | string;
  action_status: AdminLeadActionStatus | string;
  last_contacted_at: string;
  follow_up_date: string;
  archived: boolean;
  deleted_at: string;
  message: string;
  notes: string;
  cv_file_path: string;
  country: string;
  city: string;
  lead_origin: string;
  source_detail: string;
  assigned_to: string;
  calendly_link: string;
  calendly_event_uri: string;
  calendly_invitee_uri: string;
  calendly_scheduled_at: string;
  calendly_canceled_at: string;
  booked_at: string;
  website: string;
  source_route: string;
  created_by_admin: boolean;
  created_by: string;
  updated_at: string;
  updated_by: string;
  phone_missing: boolean;
  whatsapp_missing: boolean;
  email_missing: boolean;
  data_quality_notes: string;
  created_at: string;
  raw: Record<string, string | number | boolean | null>;
};

export type CreateAdminLeadInput = {
  lead_type: AdminLeadFormType;
  full_name: string;
  company_name?: string;
  email?: string;
  phone?: string;
  whatsapp_number?: string;
  country?: string;
  city?: string;
  lead_origin?: AdminLeadOrigin;
  source_detail?: string;
  status?: AdminLeadStatus;
  priority?: AdminLeadPriority;
  assigned_to?: string;
  follow_up_date?: string;
  notes?: string;
};

export type EditAdminLeadInput = CreateAdminLeadInput & {
  id: string;
  phone_missing?: boolean;
  whatsapp_missing?: boolean;
  email_missing?: boolean;
  data_quality_notes?: string;
};

export type DashboardData = {
  totals: {
    total: number;
    new: number;
    bewerber: number;
    unternehmen: number;
    contacted: number;
    qualified: number;
    booked: number;
    proposal: number;
    closed: number;
    lost: number;
    archived: number;
  };
  recentLeads: AdminLead[];
  chartLeads: AdminLead[];
};

export type SystemStatusData = {
  databaseSizeBytes: number;
  storageUsageBytes: number;
  operationalCounts: {
    totalLeads: number;
    leadsToday: number | null;
    averageLeadsPerDay: number | null;
  };
  storageFileCount: number;
  largestStorageFiles: SystemStorageFile[];
  rpcErrors: string[];
};

export type SystemStorageFile = {
  fileName: string;
  bucketName: string;
  sizeBytes: number;
  uploadedAt: string;
};

const legacyAdminCookieName = "kassoubi_admin";
const adminAccessCookieName = "kassoubi_admin_access";
const adminRefreshCookieName = "kassoubi_admin_refresh";
const fallbackAccessTokenMaxAge = 60 * 60;
const refreshTokenMaxAge = 60 * 60 * 24 * 30;
const cvBucketName = "bewerber-cvs";
const adminDeniedMessage = "Kein Zugriff auf diesen Adminbereich.";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getSupabaseEnv() {
  const supabaseUrl = clean(process.env.NEXT_PUBLIC_SUPABASE_URL).replace(/\/$/, "");
  const supabaseSecretKey = clean(process.env.SUPABASE_SECRET_KEY);

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error("Supabase-Konfiguration fehlt.");
  }

  return { supabaseUrl, supabaseSecretKey };
}

function getSupabasePublicEnv() {
  const supabaseUrl = clean(
    process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  ).replace(/\/$/, "");
  const supabaseAnonKey = clean(
    process.env.VITE_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase Auth-Konfiguration fehlt.");
  }

  return { supabaseUrl, supabaseAnonKey };
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
  path = path.replace(new RegExp(`^storage/v1/object/sign/${cvBucketName}/`), "");
  path = path.replace(new RegExp(`^storage/v1/object/public/${cvBucketName}/`), "");
  path = path.replace(new RegExp(`^object/sign/${cvBucketName}/`), "");
  path = path.replace(new RegExp(`^object/public/${cvBucketName}/`), "");
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

function toAbsoluteStorageUrl(signedUrl: string, supabaseUrl: string) {
  if (signedUrl.startsWith("http")) return signedUrl;

  if (signedUrl.startsWith("/storage/v1/")) {
    return `${supabaseUrl}${signedUrl}`;
  }

  if (signedUrl.startsWith("/object/")) {
    return `${supabaseUrl}/storage/v1${signedUrl}`;
  }

  return `${supabaseUrl}/storage/v1/${signedUrl.replace(/^\/+/, "")}`;
}

function getCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    maxAge,
    path: "/",
    sameSite: "lax" as const,
    secure: getRequestProtocol({ xForwardedProto: true }) === "https",
  };
}

function clearAdminAuthCookies() {
  deleteCookie(legacyAdminCookieName, { path: "/" });
  deleteCookie(adminAccessCookieName, { path: "/" });
  deleteCookie(adminRefreshCookieName, { path: "/" });
}

function setAdminAuthCookies(accessToken: string, refreshToken: string, expiresIn?: number) {
  setCookie(
    adminAccessCookieName,
    accessToken,
    getCookieOptions(Math.max(60, expiresIn || fallbackAccessTokenMaxAge)),
  );
  setCookie(adminRefreshCookieName, refreshToken, getCookieOptions(refreshTokenMaxAge));
  deleteCookie(legacyAdminCookieName, { path: "/" });
}

type SupabaseAuthUser = {
  id: string;
  email?: string;
};

type VerifiedAdminSession = {
  authenticated: boolean;
  user: SupabaseAuthUser | null;
};

async function fetchSupabaseUser(accessToken: string): Promise<SupabaseAuthUser | null> {
  const { supabaseUrl, supabaseAnonKey } = getSupabasePublicEnv();
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) return null;

  const user = (await response.json()) as { id?: unknown; email?: unknown };
  const id = clean(user.id);

  if (!id) return null;

  return {
    id,
    email: clean(user.email),
  };
}

async function fetchAdminProfileByColumn(
  column: "user_id" | "id" | "email",
  value: string,
  accessToken: string,
) {
  const { supabaseUrl, supabaseAnonKey } = getSupabasePublicEnv();
  const supabaseSecretKey = clean(process.env.SUPABASE_SECRET_KEY);
  const apiKey = supabaseSecretKey || supabaseAnonKey;
  const authKey = supabaseSecretKey || accessToken;
  const response = await fetch(
    `${supabaseUrl}/rest/v1/admin_profiles?select=role&${encodeURIComponent(
      column,
    )}=eq.${encodeURIComponent(value)}&role=eq.admin&limit=1`,
    {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${authKey}`,
      },
    },
  );

  if (!response.ok) return false;

  const rows = (await response.json()) as Array<{ role?: unknown }>;
  return rows.some((row) => clean(row.role) === "admin");
}

async function hasAdminProfile(user: SupabaseAuthUser, accessToken: string) {
  if (await fetchAdminProfileByColumn("user_id", user.id, accessToken)) return true;
  if (await fetchAdminProfileByColumn("id", user.id, accessToken)) return true;
  if (user.email && (await fetchAdminProfileByColumn("email", user.email, accessToken))) {
    return true;
  }

  return false;
}

async function verifyAdminAccessToken(accessToken: string): Promise<VerifiedAdminSession> {
  const user = await fetchSupabaseUser(accessToken);

  if (!user) {
    return { authenticated: false, user: null };
  }

  const allowed = await hasAdminProfile(user, accessToken);

  return {
    authenticated: allowed,
    user: allowed ? user : null,
  };
}

async function refreshSupabaseSession(refreshToken: string) {
  const { supabaseUrl, supabaseAnonKey } = getSupabasePublicEnv();
  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: {
      apikey: supabaseAnonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) return null;

  const session = (await response.json()) as {
    access_token?: unknown;
    refresh_token?: unknown;
    expires_in?: unknown;
  };
  const accessToken = clean(session.access_token);
  const nextRefreshToken = clean(session.refresh_token) || refreshToken;

  if (!accessToken || !nextRefreshToken) return null;

  return {
    accessToken,
    refreshToken: nextRefreshToken,
    expiresIn: Number(session.expires_in) || fallbackAccessTokenMaxAge,
  };
}

async function getVerifiedAdminSession(): Promise<VerifiedAdminSession> {
  const accessToken = clean(getCookie(adminAccessCookieName));

  if (accessToken) {
    const session = await verifyAdminAccessToken(accessToken);
    if (session.authenticated) return session;
  }

  const refreshToken = clean(getCookie(adminRefreshCookieName));

  if (!refreshToken) {
    clearAdminAuthCookies();
    return { authenticated: false, user: null };
  }

  const refreshed = await refreshSupabaseSession(refreshToken);

  if (!refreshed) {
    clearAdminAuthCookies();
    return { authenticated: false, user: null };
  }

  const session = await verifyAdminAccessToken(refreshed.accessToken);

  if (!session.authenticated) {
    clearAdminAuthCookies();
    return { authenticated: false, user: null };
  }

  setAdminAuthCookies(refreshed.accessToken, refreshed.refreshToken, refreshed.expiresIn);
  return session;
}

async function requireAdmin() {
  if (!(await getVerifiedAdminSession()).authenticated) {
    throw new Error("Nicht autorisiert. Bitte erneut anmelden.");
  }
}

function normalizeRecord(row: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(row).filter(([, value]) => {
      const type = typeof value;
      return value === null || type === "string" || type === "number" || type === "boolean";
    }),
  ) as Record<string, string | number | boolean | null>;
}

function asText(value: unknown) {
  if (value === null || value === undefined) return "";
  return String(value);
}

function asBoolean(value: unknown) {
  return value === true || value === "true";
}

function normalizeLead(row: Record<string, unknown>): AdminLead {
  return {
    id: asText(row.id),
    name: asText(row.full_name || row.name),
    type: asText(row.lead_type || row.type),
    email: asText(row.email),
    phone: asText(row.phone),
    whatsapp_number: asText(row.whatsapp_number),
    german_level: asText(row.german_level),
    ausbildungsbereich: asText(row.ausbildungsbereich),
    company_name: asText(row.company_name),
    status: asText(row.status || "new"),
    priority: asText(row.priority || "normal"),
    action_status: asText(row.action_status),
    last_contacted_at: asText(row.last_contacted_at),
    follow_up_date: asText(row.follow_up_date),
    archived: row.archived === true || row.archived === "true",
    deleted_at: asText(row.deleted_at),
    message: asText(row.message),
    notes: asText(row.notes || row.internal_notes),
    cv_file_path: asText(row.cv_file_path),
    country: asText(row.country),
    city: asText(row.city),
    lead_origin: asText(row.lead_origin),
    source_detail: asText(row.source_detail),
    assigned_to: asText(row.assigned_to),
    calendly_link: asText(row.calendly_link),
    calendly_event_uri: asText(row.calendly_event_uri),
    calendly_invitee_uri: asText(row.calendly_invitee_uri),
    calendly_scheduled_at: asText(row.calendly_scheduled_at),
    calendly_canceled_at: asText(row.calendly_canceled_at),
    booked_at: asText(row.booked_at),
    website: asText(row.website || row.company_website),
    source_route: asText(row.source_route || row.route),
    created_by_admin: asBoolean(row.created_by_admin),
    created_by: asText(row.created_by),
    updated_at: asText(row.updated_at),
    updated_by: asText(row.updated_by),
    phone_missing: asBoolean(row.phone_missing),
    whatsapp_missing: asBoolean(row.whatsapp_missing),
    email_missing: asBoolean(row.email_missing),
    data_quality_notes: asText(row.data_quality_notes),
    created_at: asText(row.created_at),
    raw: normalizeRecord(row),
  };
}

function isLeadType(value: unknown): value is AdminLeadType {
  return leadTypes.includes(value as AdminLeadType);
}

function isAdminLeadFormType(value: unknown): value is AdminLeadFormType {
  return adminLeadFormTypes.includes(value as AdminLeadFormType);
}

function isLeadStatus(value: unknown): value is AdminLeadStatus {
  return leadStatuses.includes(value as AdminLeadStatus);
}

function isLeadPriority(value: unknown): value is AdminLeadPriority {
  return leadPriorities.includes(value as AdminLeadPriority);
}

function isLeadActionStatus(value: unknown): value is AdminLeadActionStatus {
  return leadActionStatuses.includes(value as AdminLeadActionStatus);
}

function isLeadOrigin(value: unknown): value is AdminLeadOrigin {
  return leadOrigins.includes(value as AdminLeadOrigin);
}

function hasColumn(row: Record<string, unknown>, column: string) {
  return Object.prototype.hasOwnProperty.call(row, column);
}

function compactUnknownRecord(record: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(record).filter(
      ([, value]) => value !== "" && value !== null && value !== undefined,
    ),
  );
}

function compactPatchRecord(record: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(record).filter(([, value]) => value !== undefined));
}

function getMissingColumnName(errorBody: { message?: string; code?: string }) {
  const message = errorBody.message || "";
  const match =
    message.match(/'([^']+)' column/i) ||
    message.match(/column "([^"]+)"/i) ||
    message.match(/Could not find the '([^']+)' column/i);

  return errorBody.code === "PGRST204" && match?.[1] ? match[1] : "";
}

function normalizeLeadIds(input: unknown) {
  if (!Array.isArray(input)) {
    throw new Error("Bitte wählen Sie mindestens einen Lead aus.");
  }

  const ids = Array.from(new Set(input.map(clean).filter(Boolean)));

  if (ids.length === 0) {
    throw new Error("Bitte wählen Sie mindestens einen Lead aus.");
  }

  if (ids.length > 200) {
    throw new Error("Bitte maximal 200 Leads gleichzeitig bearbeiten.");
  }

  return ids;
}

function idInFilter(ids: string[]) {
  return `in.(${ids.map(encodeURIComponent).join(",")})`;
}

function applyLeadFilters(url: URL, filters: LeadFilters) {
  if (filters.leadType && filters.leadType !== "all" && isLeadType(filters.leadType)) {
    url.searchParams.set("lead_type", `eq.${filters.leadType}`);
  }

  if (filters.status && filters.status !== "all" && isLeadStatus(filters.status)) {
    url.searchParams.set("status", `eq.${filters.status}`);
  }

  if (filters.priority && filters.priority !== "all" && isLeadPriority(filters.priority)) {
    url.searchParams.set("priority", `eq.${filters.priority}`);
  }

  if (
    filters.actionStatus &&
    filters.actionStatus !== "all" &&
    isLeadActionStatus(filters.actionStatus)
  ) {
    url.searchParams.set("action_status", `eq.${filters.actionStatus}`);
  }

  const archivedMode = filters.archived || "active";
  if (archivedMode === "active") {
    url.searchParams.set("archived", "not.is.true");
  } else if (archivedMode === "archived") {
    url.searchParams.set("archived", "is.true");
  }

  const deletedMode = filters.deleted || "active";
  if (deletedMode === "active") {
    url.searchParams.set("deleted_at", "is.null");
  } else if (deletedMode === "deleted") {
    url.searchParams.set("deleted_at", "not.is.null");
  }

  const search = clean(filters.search)
    .replace(/[(),*]/g, " ")
    .slice(0, 80);
  if (search) {
    const pattern = `*${search}*`;
    url.searchParams.set(
      "or",
      `(full_name.ilike.${pattern},email.ilike.${pattern},company_name.ilike.${pattern},message.ilike.${pattern})`,
    );
  }
}

async function supabaseFetch(path: string, init?: RequestInit) {
  const { supabaseUrl, supabaseSecretKey } = getSupabaseEnv();
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: supabaseSecretKey,
      Authorization: `Bearer ${supabaseSecretKey}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    let detail = "";
    try {
      const body = (await response.json()) as { message?: string; hint?: string };
      detail = body.message || body.hint || "";
    } catch {
      detail = response.statusText;
    }

    throw new Error(detail || "Supabase-Anfrage fehlgeschlagen.");
  }

  return response;
}

async function supabaseStorageFetch(path: string, init?: RequestInit) {
  const { supabaseUrl, supabaseSecretKey } = getSupabaseEnv();
  const response = await fetch(`${supabaseUrl}/storage/v1/${path}`, {
    ...init,
    headers: {
      apikey: supabaseSecretKey,
      Authorization: `Bearer ${supabaseSecretKey}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    let detail = "";
    try {
      const body = (await response.json()) as { message?: string; error?: string };
      detail = body.message || body.error || "";
    } catch {
      detail = response.statusText;
    }

    throw new Error(detail || "Supabase Storage-Anfrage fehlgeschlagen.");
  }

  return response;
}

function normalizeByteCount(value: unknown) {
  const numberValue = typeof value === "string" ? Number(value) : value;
  return typeof numberValue === "number" && Number.isFinite(numberValue) && numberValue >= 0
    ? numberValue
    : 0;
}

function normalizeNumber(value: unknown) {
  const numberValue = typeof value === "string" ? Number(value) : value;
  return typeof numberValue === "number" && Number.isFinite(numberValue) ? numberValue : 0;
}

function normalizeNullableNumber(value: unknown) {
  const numberValue = typeof value === "string" ? Number(value) : value;
  return typeof numberValue === "number" && Number.isFinite(numberValue) ? numberValue : null;
}

function firstRpcRecord(value: unknown) {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && typeof candidate === "object" ? (candidate as Record<string, unknown>) : {};
}

function normalizeOperationalCounts(value: unknown) {
  const record = firstRpcRecord(value);

  return {
    totalLeads: normalizeNumber(
      record.total_leads ?? record.leads_total ?? record.lead_count ?? record.leads ?? record.total,
    ),
    leadsToday: normalizeNullableNumber(record.leads_today ?? record.new_leads_today),
    averageLeadsPerDay: normalizeNullableNumber(
      record.average_leads_per_day ?? record.avg_leads_per_day ?? record.leads_per_day,
    ),
  };
}

function normalizeStorageFile(value: unknown): SystemStorageFile {
  const record = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const metadata = record.metadata && typeof record.metadata === "object" ? record.metadata : {};

  return {
    fileName: asText(record.file_name ?? record.name ?? record.path ?? record.object_name),
    bucketName: asText(record.bucket_name ?? record.bucket_id ?? record.bucket),
    sizeBytes: normalizeByteCount(
      record.size_bytes ??
        record.size ??
        record.bytes ??
        (metadata as Record<string, unknown>).size ??
        (metadata as Record<string, unknown>).contentLength,
    ),
    uploadedAt: asText(
      record.uploaded_at ??
        record.created_at ??
        record.updated_at ??
        record.last_modified ??
        record.inserted_at,
    ),
  };
}

function normalizeStorageFiles(value: unknown) {
  return Array.isArray(value) ? value.map(normalizeStorageFile) : [];
}

async function callSupabaseRpc(functionName: string, args: Record<string, unknown> = {}) {
  const response = await supabaseFetch(`rpc/${functionName}`, {
    method: "POST",
    body: JSON.stringify(args),
  });

  return response.json() as Promise<unknown>;
}

async function settleRpc(functionName: string, args?: Record<string, unknown>) {
  try {
    return {
      value: await callSupabaseRpc(functionName, args),
      error: "",
    };
  } catch (error) {
    return {
      value: null,
      error:
        error instanceof Error ? error.message : `${functionName} konnte nicht geladen werden.`,
    };
  }
}

async function countLeadsCreatedToday() {
  const { supabaseUrl } = getSupabaseEnv();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const url = new URL(`${supabaseUrl}/rest/v1/leads`);
  url.searchParams.set("select", "created_at");
  url.searchParams.set("created_at", `gte.${today.toISOString()}`);
  url.searchParams.set("limit", "1");

  const response = await supabaseFetch(url.pathname.replace(/^\/rest\/v1\//, "") + url.search, {
    headers: {
      Prefer: "count=exact",
      Range: "0-0",
    },
  });
  const contentRange = response.headers.get("content-range") || "";
  const count = Number(contentRange.split("/")[1]);

  return Number.isFinite(count) ? count : 0;
}

async function fetchLeadRows(filters: LeadFilters = {}) {
  const { supabaseUrl } = getSupabaseEnv();
  const url = new URL(`${supabaseUrl}/rest/v1/leads`);
  url.searchParams.set("select", "*");
  url.searchParams.set("order", "created_at.desc");
  url.searchParams.set("limit", String(Math.min(Math.max(filters.limit || 100, 1), 500)));
  applyLeadFilters(url, filters);

  const response = await supabaseFetch(url.pathname.replace(/^\/rest\/v1\//, "") + url.search);
  const rows = (await response.json()) as Array<Record<string, unknown>>;

  return rows.map(normalizeLead);
}

async function countLeads(filters: LeadFilters = {}) {
  const { supabaseUrl } = getSupabaseEnv();
  const url = new URL(`${supabaseUrl}/rest/v1/leads`);
  url.searchParams.set("select", "*");
  url.searchParams.set("limit", "1");
  applyLeadFilters(url, filters);

  const response = await supabaseFetch(url.pathname.replace(/^\/rest\/v1\//, "") + url.search, {
    headers: {
      Prefer: "count=exact",
      Range: "0-0",
    },
  });
  const contentRange = response.headers.get("content-range") || "";
  const count = Number(contentRange.split("/")[1]);

  return Number.isFinite(count) ? count : 0;
}

function validateLeadFilters(input: LeadFilters): LeadFilters {
  return {
    search: clean(input.search),
    leadType: input.leadType === "all" || isLeadType(input.leadType) ? input.leadType : "all",
    status: input.status === "all" || isLeadStatus(input.status) ? input.status : "all",
    priority: input.priority === "all" || isLeadPriority(input.priority) ? input.priority : "all",
    actionStatus:
      input.actionStatus === "all" || isLeadActionStatus(input.actionStatus)
        ? input.actionStatus
        : "all",
    archived: ["active", "archived", "all"].includes(input.archived || "")
      ? input.archived
      : "active",
    deleted: ["active", "deleted", "all"].includes(input.deleted || "") ? input.deleted : "active",
    limit: typeof input.limit === "number" ? input.limit : 100,
  };
}

function validateCreateAdminLead(input: CreateAdminLeadInput): CreateAdminLeadInput {
  if (!input || typeof input !== "object") {
    throw new Error("Bitte füllen Sie das Formular aus.");
  }

  const leadType = clean(input.lead_type);
  const fullName = clean(input.full_name);
  const email = clean(input.email).toLowerCase();
  const phone = clean(input.phone);
  const whatsappNumber = clean(input.whatsapp_number);
  const status = clean(input.status || "new");
  const priority = clean(input.priority || "normal");
  const leadOrigin = clean(input.lead_origin || "dashboard");
  const followUpDate = clean(input.follow_up_date);

  if (!isAdminLeadFormType(leadType)) {
    throw new Error("Bitte wählen Sie einen gültigen Lead-Typ aus.");
  }

  if (!fullName) {
    throw new Error("Bitte geben Sie einen Namen oder Ansprechpartner ein.");
  }

  if (leadType === "unternehmen" && !clean(input.company_name)) {
    throw new Error("Bitte geben Sie den Unternehmensnamen ein.");
  }

  if (!email && !phone && !whatsappNumber) {
    throw new Error("Bitte geben Sie mindestens E-Mail, Telefon oder WhatsApp an.");
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
  }

  if (!isLeadStatus(status)) {
    throw new Error("Bitte wählen Sie einen gültigen Status aus.");
  }

  if (!isLeadPriority(priority)) {
    throw new Error("Bitte wählen Sie eine gültige Priorität aus.");
  }

  if (!isLeadOrigin(leadOrigin)) {
    throw new Error("Bitte wählen Sie eine gültige Lead-Quelle aus.");
  }

  return {
    lead_type: leadType,
    full_name: fullName,
    company_name: leadType === "unternehmen" ? clean(input.company_name) : "",
    email,
    phone,
    whatsapp_number: whatsappNumber,
    country: clean(input.country),
    city: clean(input.city),
    lead_origin: leadOrigin,
    source_detail: clean(input.source_detail),
    status,
    priority,
    assigned_to: clean(input.assigned_to),
    follow_up_date: followUpDate,
    notes: clean(input.notes),
  };
}

function validateEditAdminLead(input: EditAdminLeadInput): EditAdminLeadInput {
  if (!input || typeof input !== "object") {
    throw new Error("Bitte füllen Sie das Formular aus.");
  }

  const id = clean(input.id);
  const leadType = clean(input.lead_type);
  const fullName = clean(input.full_name);
  const email = clean(input.email).toLowerCase();
  const phone = clean(input.phone);
  const whatsappNumber = clean(input.whatsapp_number);
  const status = clean(input.status || "new");
  const priority = clean(input.priority || "normal");
  const leadOrigin = clean(input.lead_origin || "dashboard");
  const followUpDate = clean(input.follow_up_date);

  if (!id) {
    throw new Error("Lead-ID fehlt.");
  }

  if (!isAdminLeadFormType(leadType)) {
    throw new Error("Bitte wählen Sie einen gültigen Lead-Typ aus.");
  }

  if (!fullName) {
    throw new Error("Bitte geben Sie einen Namen oder Ansprechpartner ein.");
  }

  if (leadType === "unternehmen" && !clean(input.company_name)) {
    throw new Error("Bitte geben Sie den Unternehmensnamen ein.");
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
  }

  if (!isLeadStatus(status)) {
    throw new Error("Bitte wählen Sie einen gültigen Status aus.");
  }

  if (!isLeadPriority(priority)) {
    throw new Error("Bitte wählen Sie eine gültige Priorität aus.");
  }

  if (!isLeadOrigin(leadOrigin)) {
    throw new Error("Bitte wählen Sie eine gültige Lead-Quelle aus.");
  }

  return {
    id,
    lead_type: leadType,
    full_name: fullName,
    company_name: leadType === "unternehmen" ? clean(input.company_name) : "",
    email,
    phone,
    whatsapp_number: whatsappNumber,
    country: clean(input.country),
    city: clean(input.city),
    lead_origin: leadOrigin,
    source_detail: clean(input.source_detail),
    status,
    priority,
    assigned_to: clean(input.assigned_to),
    follow_up_date: followUpDate,
    notes: clean(input.notes),
    phone_missing: Boolean(input.phone_missing) && !phone,
    whatsapp_missing: Boolean(input.whatsapp_missing) && !whatsappNumber,
    email_missing: Boolean(input.email_missing) && !email,
    data_quality_notes: clean(input.data_quality_notes),
  };
}

async function insertAdminLeadRecord(record: Record<string, unknown>) {
  const { supabaseUrl, supabaseSecretKey } = getSupabaseEnv();
  let payload = { ...record };
  let lastError = "Lead konnte nicht gespeichert werden.";

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const response = await fetch(`${supabaseUrl}/rest/v1/leads?select=*`, {
      method: "POST",
      headers: {
        apikey: supabaseSecretKey,
        Authorization: `Bearer ${supabaseSecretKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errorBody: { message?: string; code?: string } = {};
      try {
        errorBody = (await response.json()) as { message?: string; code?: string };
      } catch {
        errorBody = {};
      }

      lastError = errorBody.message || response.statusText || lastError;
      const missingColumn = getMissingColumnName(errorBody);

      if (missingColumn && Object.prototype.hasOwnProperty.call(payload, missingColumn)) {
        const nextPayload = { ...payload };
        delete nextPayload[missingColumn];
        payload = nextPayload;
        continue;
      }

      throw new Error(lastError);
    }

    const rows = (await response.json()) as Array<Record<string, unknown>>;
    return normalizeLead(rows[0] || {});
  }

  throw new Error(lastError);
}

async function fetchLeadById(id: string) {
  const idFilter = encodeURIComponent(id);
  const response = await supabaseFetch(`leads?select=*&id=eq.${idFilter}&limit=1`);
  const rows = (await response.json()) as Array<Record<string, unknown>>;
  const lead = rows[0];

  if (!lead) {
    throw new Error("Lead wurde nicht gefunden.");
  }

  return lead;
}

async function updateAdminLeadRecord(id: string, record: Record<string, unknown>) {
  const { supabaseUrl, supabaseSecretKey } = getSupabaseEnv();
  const idFilter = encodeURIComponent(id);
  let payload = { ...record };
  let lastError = "Lead konnte nicht aktualisiert werden.";

  for (let attempt = 0; attempt < 14; attempt += 1) {
    const response = await fetch(`${supabaseUrl}/rest/v1/leads?id=eq.${idFilter}&select=*`, {
      method: "PATCH",
      headers: {
        apikey: supabaseSecretKey,
        Authorization: `Bearer ${supabaseSecretKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errorBody: { message?: string; code?: string } = {};
      try {
        errorBody = (await response.json()) as { message?: string; code?: string };
      } catch {
        errorBody = {};
      }

      lastError = errorBody.message || response.statusText || lastError;
      const missingColumn = getMissingColumnName(errorBody);

      if (missingColumn && Object.prototype.hasOwnProperty.call(payload, missingColumn)) {
        const nextPayload = { ...payload };
        delete nextPayload[missingColumn];
        payload = nextPayload;
        continue;
      }

      throw new Error(lastError);
    }

    const rows = (await response.json()) as Array<Record<string, unknown>>;
    return normalizeLead(rows[0] || {});
  }

  throw new Error(lastError);
}

async function createLeadActivityRecord(record: Record<string, unknown>) {
  const { supabaseUrl, supabaseSecretKey } = getSupabaseEnv();

  try {
    await fetch(`${supabaseUrl}/rest/v1/lead_activity`, {
      method: "POST",
      headers: {
        apikey: supabaseSecretKey,
        Authorization: `Bearer ${supabaseSecretKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(compactPatchRecord(record)),
    });
  } catch {
    // Activity logging is intentionally best-effort for the lightweight integration.
  }
}

export const getSupabaseAuthConfig = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseUrl, supabaseAnonKey } = getSupabasePublicEnv();

  return { supabaseUrl, supabaseAnonKey };
});

export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const session = await getVerifiedAdminSession();

  return {
    authenticated: session.authenticated,
    user: session.user,
  };
});

export const establishAdminSession = createServerFn({ method: "POST" })
  .inputValidator((input: { accessToken: string; refreshToken: string; expiresIn?: number }) => ({
    accessToken: clean(input.accessToken),
    refreshToken: clean(input.refreshToken),
    expiresIn: Number(input.expiresIn) || fallbackAccessTokenMaxAge,
  }))
  .handler(async ({ data }) => {
    if (!data.accessToken || !data.refreshToken) {
      clearAdminAuthCookies();
      throw new Error("Supabase-Sitzung fehlt.");
    }

    const session = await verifyAdminAccessToken(data.accessToken);

    if (!session.authenticated) {
      clearAdminAuthCookies();
      throw new Error(adminDeniedMessage);
    }

    setAdminAuthCookies(data.accessToken, data.refreshToken, data.expiresIn);

    return { success: true, user: session.user };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const accessToken = clean(getCookie(adminAccessCookieName));

  if (accessToken) {
    try {
      const { supabaseUrl, supabaseAnonKey } = getSupabasePublicEnv();
      await fetch(`${supabaseUrl}/auth/v1/logout`, {
        method: "POST",
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch {
      // Cookie cleanup below is the authoritative app logout.
    }
  }

  clearAdminAuthCookies();
  return { success: true };
});

export const listAdminLeads = createServerFn({ method: "GET" })
  .inputValidator((input: LeadFilters) => validateLeadFilters(input || {}))
  .handler(async ({ data }) => {
    await requireAdmin();
    return fetchLeadRows(data);
  });

export const getAdminLeadById = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => {
    const id = clean(input.id);

    if (!id) {
      throw new Error("Lead-ID fehlt.");
    }

    return { id };
  })
  .handler(async ({ data }) => {
    await requireAdmin();
    return normalizeLead(await fetchLeadById(data.id));
  });

export const getDashboardData = createServerFn({ method: "GET" }).handler(
  async (): Promise<DashboardData> => {
    await requireAdmin();

    const [
      total,
      newLeads,
      bewerber,
      unternehmen,
      contacted,
      qualified,
      booked,
      proposal,
      closed,
      lost,
      archived,
      recentLeads,
      chartLeads,
    ] = await Promise.all([
      countLeads(),
      countLeads({ status: "new" }),
      countLeads({ leadType: "bewerber" }),
      countLeads({ leadType: "unternehmen" }),
      countLeads({ status: "contacted" }),
      countLeads({ status: "qualified" }),
      countLeads({ status: "booked" }),
      countLeads({ status: "proposal" }),
      countLeads({ status: "closed" }),
      countLeads({ status: "lost" }),
      countLeads({ status: "archived" }),
      fetchLeadRows({ limit: 8 }),
      fetchLeadRows({ limit: 200 }),
    ]);

    return {
      totals: {
        total,
        new: newLeads,
        bewerber,
        unternehmen,
        contacted,
        qualified,
        booked,
        proposal,
        closed,
        lost,
        archived,
      },
      recentLeads,
      chartLeads,
    };
  },
);

export const getSystemStatusData = createServerFn({ method: "GET" }).handler(
  async (): Promise<SystemStatusData> => {
    await requireAdmin();

    const [
      databaseSizeResult,
      storageUsageResult,
      operationalCountsResult,
      storageFileCountResult,
      largestStorageFilesResult,
      leadsTodayResult,
    ] = await Promise.all([
      settleRpc("get_database_size_bytes"),
      settleRpc("get_storage_usage_bytes"),
      settleRpc("get_operational_counts"),
      settleRpc("get_storage_file_count"),
      settleRpc("get_largest_storage_files", { limit_count: 10 }),
      countLeadsCreatedToday()
        .then((value) => ({ value, error: "" }))
        .catch(() => ({ value: null, error: "" })),
    ]);
    const operationalCounts = normalizeOperationalCounts(operationalCountsResult.value);
    const rpcErrors = [
      databaseSizeResult.error,
      storageUsageResult.error,
      operationalCountsResult.error,
      storageFileCountResult.error,
      largestStorageFilesResult.error,
    ].filter(Boolean);

    return {
      databaseSizeBytes: normalizeByteCount(databaseSizeResult.value),
      storageUsageBytes: normalizeByteCount(storageUsageResult.value),
      operationalCounts: {
        ...operationalCounts,
        leadsToday: leadsTodayResult.value ?? operationalCounts.leadsToday,
      },
      storageFileCount: normalizeNumber(storageFileCountResult.value),
      largestStorageFiles: normalizeStorageFiles(largestStorageFilesResult.value),
      rpcErrors,
    };
  },
);

export const createAdminLead = createServerFn({ method: "POST" })
  .inputValidator((input: CreateAdminLeadInput) => validateCreateAdminLead(input))
  .handler(async ({ data }) => {
    await requireAdmin();

    const lead = compactUnknownRecord({
      lead_type: data.lead_type,
      full_name: data.full_name,
      company_name: data.lead_type === "unternehmen" ? data.company_name : undefined,
      email: data.email,
      phone: data.phone,
      whatsapp_number: data.whatsapp_number,
      country: data.country,
      city: data.city,
      lead_origin: data.lead_origin || "dashboard",
      source_detail: data.source_detail,
      status: data.status || "new",
      priority: data.priority || "normal",
      assigned_to: data.assigned_to,
      follow_up_date: data.follow_up_date,
      notes: data.notes,
      created_by_admin: true,
      created_by: "",
    });

    return insertAdminLeadRecord(lead);
  });

export const updateAdminLead = createServerFn({ method: "POST" })
  .inputValidator(
    (input: {
      id: string;
      status: AdminLeadStatus;
      notes: string;
      priority?: AdminLeadPriority;
      follow_up_date?: string;
    }) => {
      const id = clean(input.id);
      const status = input.status;
      const priority = clean(input.priority || "normal");
      const followUpDate = clean(input.follow_up_date);

      if (!id) {
        throw new Error("Lead-ID fehlt.");
      }

      if (!isLeadStatus(status)) {
        throw new Error("Ungültiger Status.");
      }

      if (priority && !isLeadPriority(priority)) {
        throw new Error("Ungültige Priorität.");
      }

      return {
        id,
        status,
        notes: clean(input.notes),
        priority,
        follow_up_date: followUpDate,
      };
    },
  )
  .handler(async ({ data }) => {
    await requireAdmin();

    const idFilter = encodeURIComponent(data.id);
    const existingResponse = await supabaseFetch(`leads?select=*&id=eq.${idFilter}&limit=1`);
    const existingRows = (await existingResponse.json()) as Array<Record<string, unknown>>;
    const existingLead = existingRows[0] || {};
    const notesColumn = hasColumn(existingLead, "internal_notes") ? "internal_notes" : "notes";
    const patch: Record<string, string | null> = {
      status: data.status,
      [notesColumn]: data.notes,
    };

    if (hasColumn(existingLead, "priority")) {
      patch.priority = data.priority;
    }

    if (hasColumn(existingLead, "follow_up_date")) {
      patch.follow_up_date = data.follow_up_date || null;
    }

    const response = await supabaseFetch(`leads?id=eq.${idFilter}&select=*`, {
      method: "PATCH",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify(patch),
    });
    const rows = (await response.json()) as Array<Record<string, unknown>>;

    return normalizeLead(rows[0] || existingLead);
  });

export const updateAdminLeadDetails = createServerFn({ method: "POST" })
  .inputValidator((input: EditAdminLeadInput) => validateEditAdminLead(input))
  .handler(async ({ data }) => {
    await requireAdmin();

    const patch = compactPatchRecord({
      lead_type: data.lead_type,
      full_name: data.full_name,
      company_name: data.lead_type === "unternehmen" ? data.company_name : null,
      email: data.email,
      phone: data.phone,
      whatsapp_number: data.whatsapp_number,
      country: data.country,
      city: data.city,
      lead_origin: data.lead_origin || "dashboard",
      source_detail: data.source_detail,
      status: data.status || "new",
      priority: data.priority || "normal",
      assigned_to: data.assigned_to,
      follow_up_date: data.follow_up_date || null,
      notes: data.notes,
      phone_missing: data.phone_missing,
      whatsapp_missing: data.whatsapp_missing,
      email_missing: data.email_missing,
      data_quality_notes: data.data_quality_notes,
    });

    return updateAdminLeadRecord(data.id, patch);
  });

export const initiateCalendlyBooking = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string; calendly_link: string }) => {
    const id = clean(input.id);
    const calendlyLink = clean(input.calendly_link);

    if (!id) {
      throw new Error("Lead-ID fehlt.");
    }

    if (!calendlyLink || !calendlyLink.startsWith("https://")) {
      throw new Error("Calendly-Link ist noch nicht konfiguriert.");
    }

    return { id, calendly_link: calendlyLink };
  })
  .handler(async ({ data }) => {
    await requireAdmin();

    const existingLead = await fetchLeadById(data.id);
    const updatedLead = await updateAdminLeadRecord(data.id, {
      calendly_link: data.calendly_link,
    });

    await createLeadActivityRecord({
      lead_id: data.id,
      activity_type: "calendly_booking_link_opened",
      title: "Calendly booking link opened",
      description: `Calendly booking link opened for ${asText(existingLead.full_name || existingLead.name) || "lead"}.`,
      metadata: {
        calendly_link: data.calendly_link,
        lead_email: asText(existingLead.email),
      },
    });

    return updatedLead;
  });

export const updateLeadAction = createServerFn({ method: "POST" })
  .inputValidator(
    (input: { id: string; action_status: AdminLeadActionStatus; follow_up_date?: string }) => {
      const id = clean(input.id);
      const actionStatus = clean(input.action_status);
      const followUpDate = clean(input.follow_up_date);

      if (!id) {
        throw new Error("Lead-ID fehlt.");
      }

      if (!isLeadActionStatus(actionStatus)) {
        throw new Error("Ungültige Aktion.");
      }

      return {
        id,
        action_status: actionStatus,
        follow_up_date: followUpDate,
      };
    },
  )
  .handler(async ({ data }) => {
    await requireAdmin();

    const idFilter = encodeURIComponent(data.id);
    const existingResponse = await supabaseFetch(`leads?select=*&id=eq.${idFilter}&limit=1`);
    const existingRows = (await existingResponse.json()) as Array<Record<string, unknown>>;
    const existingLead = existingRows[0] || {};

    if (!hasColumn(existingLead, "action_status")) {
      throw new Error(
        "Die Spalte action_status fehlt in Supabase. Bitte führen Sie das SQL aus und versuchen Sie es erneut.",
      );
    }

    const patch: Record<string, string | null> = {
      action_status: data.action_status,
    };

    if (hasColumn(existingLead, "last_contacted_at") && data.action_status !== "follow_up_needed") {
      patch.last_contacted_at = new Date().toISOString();
    }

    if (hasColumn(existingLead, "follow_up_date") && data.action_status === "follow_up_needed") {
      patch.follow_up_date = data.follow_up_date || null;
    }

    const response = await supabaseFetch(`leads?id=eq.${idFilter}&select=*`, {
      method: "PATCH",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify(patch),
    });
    const rows = (await response.json()) as Array<Record<string, unknown>>;

    return normalizeLead(rows[0] || existingLead);
  });

export const archiveAdminLead = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string }) => {
    const id = clean(input.id);

    if (!id) {
      throw new Error("Lead-ID fehlt.");
    }

    return { id };
  })
  .handler(async ({ data }) => {
    await requireAdmin();

    const idFilter = encodeURIComponent(data.id);
    const response = await supabaseFetch(`leads?id=eq.${idFilter}&select=*`, {
      method: "PATCH",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify({ archived: true }),
    });
    const rows = (await response.json()) as Array<Record<string, unknown>>;

    return normalizeLead(rows[0] || {});
  });

export const bulkUpdateAdminLeads = createServerFn({ method: "POST" })
  .inputValidator((input: { ids: string[]; action: "contacted" | "archive" | "trash" }) => {
    const ids = normalizeLeadIds(input.ids);
    const action = clean(input.action);

    if (!["contacted", "archive", "trash"].includes(action)) {
      throw new Error("Ungültige Sammelaktion.");
    }

    return {
      ids,
      action: action as "contacted" | "archive" | "trash",
    };
  })
  .handler(async ({ data }) => {
    await requireAdmin();

    const now = new Date().toISOString();
    const patch: Record<string, string | boolean> =
      data.action === "contacted"
        ? { action_status: "contacted", last_contacted_at: now }
        : data.action === "archive"
          ? { archived: true }
          : { deleted_at: now };

    const response = await supabaseFetch(`leads?id=${idInFilter(data.ids)}&select=*`, {
      method: "PATCH",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify(patch),
    });
    const rows = (await response.json()) as Array<Record<string, unknown>>;

    return {
      leads: rows.map(normalizeLead),
    };
  });

async function removeCvFiles(paths: string[]) {
  const normalizedPaths = Array.from(new Set(paths.map(normalizeCvStoragePath).filter(Boolean)));

  if (normalizedPaths.length === 0) return "";

  try {
    await supabaseStorageFetch(`object/${cvBucketName}`, {
      method: "DELETE",
      body: JSON.stringify({ prefixes: normalizedPaths }),
    });
    return "";
  } catch (error) {
    return error instanceof Error
      ? `Lebenslauf-Dateien konnten nicht vollständig gelöscht werden: ${error.message}`
      : "Lebenslauf-Dateien konnten nicht vollständig gelöscht werden.";
  }
}

export const permanentlyDeleteAdminLeads = createServerFn({ method: "POST" })
  .inputValidator((input: { ids: string[] }) => ({ ids: normalizeLeadIds(input.ids) }))
  .handler(async ({ data }) => {
    await requireAdmin();

    const idFilter = idInFilter(data.ids);
    const existingResponse = await supabaseFetch(
      `leads?select=*&id=${idFilter}&deleted_at=not.is.null`,
    );
    const existingRows = (await existingResponse.json()) as Array<Record<string, unknown>>;

    if (existingRows.length !== data.ids.length) {
      throw new Error("Endgültig löschen ist nur für Leads im Papierkorb möglich.");
    }

    const storageWarning = await removeCvFiles(existingRows.map((row) => asText(row.cv_file_path)));

    const deleteResponse = await supabaseFetch(`leads?id=${idFilter}`, {
      method: "DELETE",
      headers: {
        Prefer: "return=representation",
      },
    });
    const deletedRows = (await deleteResponse.json()) as Array<Record<string, unknown>>;

    return {
      deletedIds: deletedRows.map((row) => asText(row.id)).filter(Boolean),
      warning: storageWarning,
    };
  });

export const getLeadCvDownloadUrl = createServerFn({ method: "POST" })
  .inputValidator((input: { path: string }) => {
    const path = clean(input.path);
    const normalizedPath = normalizeCvStoragePath(path);

    if (!normalizedPath) {
      throw new Error("Kein Lebenslauf hochgeladen.");
    }

    if (normalizedPath.includes("..")) {
      throw new Error("Lebenslauf-Dateipfad ist ungültig.");
    }

    return { path: normalizedPath };
  })
  .handler(async ({ data }) => {
    await requireAdmin();

    const normalizedPath = normalizeCvStoragePath(data.path);
    console.log("CV signed path:", normalizedPath);

    const response = await supabaseStorageFetch(`object/sign/${cvBucketName}`, {
      method: "POST",
      body: JSON.stringify({ expiresIn: 60, paths: [normalizedPath] }),
    });
    const body = (await response.json()) as
      | Array<{ signedURL?: string; signedUrl?: string; error?: string }>
      | { signedURL?: string; signedUrl?: string; error?: string };
    const result = Array.isArray(body) ? body[0] : body;
    const signedUrl = result?.signedURL || result?.signedUrl;

    if (!signedUrl) {
      throw new Error(result?.error || "Der Lebenslauf-Link konnte nicht erstellt werden.");
    }

    const { supabaseUrl } = getSupabaseEnv();
    return {
      url: toAbsoluteStorageUrl(signedUrl, supabaseUrl),
    };
  });
