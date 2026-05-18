type CalendlyWebhookEvent = "invitee.created" | "invitee.canceled";

type CalendlyWebhookBody = {
  event?: string;
  payload?: Record<string, unknown>;
};

type SupabaseLeadRow = Record<string, unknown>;

type CalendlyWebhookResult = {
  ok: true;
  event: string;
  processed: boolean;
  leadId?: string;
  reason?: string;
};

const webhookEvents: CalendlyWebhookEvent[] = ["invitee.created", "invitee.canceled"];
const signatureToleranceMs = 5 * 60 * 1000;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function lower(value: unknown) {
  return clean(value).toLowerCase();
}

function getMissingColumnName(errorBody: { message?: string; code?: string }) {
  const message = errorBody.message || "";
  const match =
    message.match(/'([^']+)' column/i) ||
    message.match(/column "([^"]+)"/i) ||
    message.match(/Could not find the '([^']+)' column/i);

  return errorBody.code === "PGRST204" && match?.[1] ? match[1] : "";
}

function compactPatchRecord(record: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(record).filter(([, value]) => value !== undefined));
}

function getSupabaseEnv() {
  const supabaseUrl = clean(process.env.NEXT_PUBLIC_SUPABASE_URL).replace(/\/$/, "");
  const supabaseSecretKey = clean(process.env.SUPABASE_SECRET_KEY);

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error("Supabase configuration is missing.");
  }

  return { supabaseUrl, supabaseSecretKey };
}

function getCalendlyApiToken() {
  return clean(process.env.CALENDLY_API_TOKEN);
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function safeEqual(a: string, b: string) {
  if (!a || !b || a.length !== b.length) return false;

  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return mismatch === 0;
}

function bytesToHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacSha256Hex(secret: string, value: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return bytesToHex(signature);
}

function parseCalendlySignature(headerValue: string) {
  const parts = Object.fromEntries(
    headerValue
      .split(",")
      .map((part) => part.trim().split("="))
      .filter(([key, value]) => key && value)
      .map(([key, value]) => [key, value]),
  );

  return {
    timestamp: clean(parts.t),
    signature: clean(parts.v1),
  };
}

async function verifyCalendlySignature(request: Request, rawBody: string) {
  const signingKey = clean(process.env.CALENDLY_WEBHOOK_SIGNING_KEY);
  const allowUnsigned = process.env.NODE_ENV !== "production" && !signingKey;

  if (allowUnsigned) return true;
  if (!signingKey) return false;

  const signatureHeader = clean(request.headers.get("Calendly-Webhook-Signature"));
  const { timestamp, signature } = parseCalendlySignature(signatureHeader);

  if (!timestamp || !signature) return false;

  const timestampNumber = Number(timestamp);
  const timestampMs =
    timestampNumber > 1_000_000_000_000 ? timestampNumber : timestampNumber * 1000;

  if (!Number.isFinite(timestampMs) || Math.abs(Date.now() - timestampMs) > signatureToleranceMs) {
    return false;
  }

  const expectedSignature = await hmacSha256Hex(signingKey, `${timestamp}.${rawBody}`);

  return safeEqual(signature, expectedSignature);
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
    let detail = response.statusText;
    try {
      const body = (await response.json()) as { message?: string; hint?: string };
      detail = body.message || body.hint || detail;
    } catch {
      // Keep status text.
    }

    throw new Error(detail || "Supabase request failed.");
  }

  return response;
}

async function fetchLeadById(id: string) {
  if (!id) return null;

  const response = await supabaseFetch(`leads?select=*&id=eq.${encodeURIComponent(id)}&limit=1`);
  const rows = (await response.json()) as SupabaseLeadRow[];

  return rows[0] || null;
}

async function fetchLeadByEmail(email: string) {
  if (!email) return null;

  const response = await supabaseFetch(
    `leads?select=*&email=eq.${encodeURIComponent(email)}&order=created_at.desc&limit=1`,
  );
  const rows = (await response.json()) as SupabaseLeadRow[];

  return rows[0] || null;
}

async function updateLeadRecord(id: string, patch: Record<string, unknown>) {
  const { supabaseUrl, supabaseSecretKey } = getSupabaseEnv();
  let payload = compactPatchRecord(patch);

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/leads?id=eq.${encodeURIComponent(id)}&select=*`,
      {
        method: "PATCH",
        headers: {
          apikey: supabaseSecretKey,
          Authorization: `Bearer ${supabaseSecretKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(payload),
      },
    );

    if (response.ok) {
      const rows = (await response.json()) as SupabaseLeadRow[];
      return rows[0] || null;
    }

    let errorBody: { message?: string; code?: string } = {};
    try {
      errorBody = (await response.json()) as { message?: string; code?: string };
    } catch {
      errorBody = {};
    }

    const missingColumn = getMissingColumnName(errorBody);
    if (missingColumn && Object.prototype.hasOwnProperty.call(payload, missingColumn)) {
      const nextPayload = { ...payload };
      delete nextPayload[missingColumn];
      payload = nextPayload;
      continue;
    }

    throw new Error(errorBody.message || response.statusText || "Lead update failed.");
  }

  return null;
}

async function insertBestEffort(table: string, record: Record<string, unknown>) {
  const { supabaseUrl, supabaseSecretKey } = getSupabaseEnv();
  let payload = compactPatchRecord(record);

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: supabaseSecretKey,
        Authorization: `Bearer ${supabaseSecretKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) return;

    let errorBody: { message?: string; code?: string } = {};
    try {
      errorBody = (await response.json()) as { message?: string; code?: string };
    } catch {
      errorBody = {};
    }

    const missingColumn = getMissingColumnName(errorBody);
    if (missingColumn && Object.prototype.hasOwnProperty.call(payload, missingColumn)) {
      const nextPayload = { ...payload };
      delete nextPayload[missingColumn];
      payload = nextPayload;
      continue;
    }

    return;
  }
}

async function fetchCalendlyResource(uri: string) {
  const token = getCalendlyApiToken();

  if (!token || !uri.startsWith("https://api.calendly.com/")) return {};

  const response = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) return {};

  const body = (await response.json()) as Record<string, unknown>;

  return asRecord(body.resource || body);
}

function getQuestionAnswerItems(payload: Record<string, unknown>) {
  const items = payload.questions_and_answers;

  return Array.isArray(items) ? items.map(asRecord) : [];
}

function getAnswerValue(item: Record<string, unknown>) {
  return clean(item.answer ?? item.value);
}

function extractLeadId(payload: Record<string, unknown>) {
  const tracking = asRecord(payload.tracking);
  const trackingLeadId = clean(
    tracking.lead_id || tracking.utm_content || tracking.utm_term || tracking.salesforce_uuid,
  );

  if (trackingLeadId) return trackingLeadId;

  const answers = getQuestionAnswerItems(payload);
  const explicitAnswer = answers.find((item) => {
    const question = lower(item.question);
    return question.includes("lead") || question.includes("crm");
  });
  const explicitValue = explicitAnswer ? getAnswerValue(explicitAnswer) : "";

  if (explicitValue) return explicitValue;

  const uuidLikeAnswer = answers
    .map(getAnswerValue)
    .find((answer) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(answer),
    );

  return uuidLikeAnswer || "";
}

async function getInviteeDetails(payload: Record<string, unknown>) {
  const inviteeUri = clean(payload.uri);
  const inviteeResource = await fetchCalendlyResource(inviteeUri);
  const merged = { ...inviteeResource, ...payload };

  return {
    payload: merged,
    name: clean(merged.name || [merged.first_name, merged.last_name].filter(Boolean).join(" ")),
    email: lower(merged.email),
    inviteeUri: clean(merged.uri || inviteeUri),
    eventUri: clean(merged.event),
    leadId: extractLeadId(merged),
  };
}

async function getScheduledEventDetails(eventUri: string) {
  const eventResource = await fetchCalendlyResource(eventUri);

  return {
    scheduledAt: clean(eventResource.start_time),
    eventName: clean(eventResource.name),
  };
}

async function findMatchingLead(leadId: string, inviteeEmail: string) {
  if (leadId) {
    const lead = await fetchLeadById(leadId);
    const leadEmail = lower(lead?.email);

    if (lead && (!leadEmail || !inviteeEmail || leadEmail === inviteeEmail)) {
      return lead;
    }
  }

  return fetchLeadByEmail(inviteeEmail);
}

function leadIdFromRow(lead: SupabaseLeadRow) {
  return clean(lead.id);
}

function descriptionTarget(name: string, email: string) {
  return [name, email].filter(Boolean).join(" / ") || "Calendly invitee";
}

async function handleInviteeCreated(payload: Record<string, unknown>) {
  const invitee = await getInviteeDetails(payload);
  const event = await getScheduledEventDetails(invitee.eventUri);
  const lead = await findMatchingLead(invitee.leadId, invitee.email);

  if (!lead) {
    return {
      ok: true,
      event: "invitee.created",
      processed: false,
      reason: "No matching lead found.",
    } satisfies CalendlyWebhookResult;
  }

  const leadId = leadIdFromRow(lead);
  const now = new Date().toISOString();

  await updateLeadRecord(leadId, {
    status: "booked",
    last_contacted_at: now,
    booked_at: now,
    calendly_event_uri: invitee.eventUri,
    calendly_invitee_uri: invitee.inviteeUri,
    calendly_scheduled_at: event.scheduledAt || null,
  });

  await insertBestEffort("lead_activity", {
    lead_id: leadId,
    activity_type: "calendly_call_booked",
    title: "Calendly call booked",
    description: `Calendly call booked for ${descriptionTarget(invitee.name, invitee.email)}.`,
    metadata: {
      calendly_event_uri: invitee.eventUri,
      calendly_invitee_uri: invitee.inviteeUri,
      calendly_scheduled_at: event.scheduledAt,
      calendly_event_name: event.eventName,
    },
  });

  await insertBestEffort("lead_tasks", {
    lead_id: leadId,
    title: "Prepare for booked call",
    status: "open",
    due_at: event.scheduledAt || null,
    metadata: {
      calendly_event_uri: invitee.eventUri,
      calendly_invitee_uri: invitee.inviteeUri,
    },
  });

  return {
    ok: true,
    event: "invitee.created",
    processed: true,
    leadId,
  } satisfies CalendlyWebhookResult;
}

async function handleInviteeCanceled(payload: Record<string, unknown>) {
  const invitee = await getInviteeDetails(payload);
  const lead = await findMatchingLead(invitee.leadId, invitee.email);

  if (!lead) {
    return {
      ok: true,
      event: "invitee.canceled",
      processed: false,
      reason: "No matching lead found.",
    } satisfies CalendlyWebhookResult;
  }

  const leadId = leadIdFromRow(lead);
  const now = new Date().toISOString();
  const currentStatus = clean(lead.status);

  await updateLeadRecord(leadId, {
    status: currentStatus === "booked" ? "qualified" : undefined,
    calendly_event_uri: invitee.eventUri,
    calendly_invitee_uri: invitee.inviteeUri,
    calendly_canceled_at: now,
  });

  await insertBestEffort("lead_activity", {
    lead_id: leadId,
    activity_type: "calendly_call_canceled",
    title: "Calendly call canceled",
    description: `Calendly call canceled for ${descriptionTarget(invitee.name, invitee.email)}.`,
    metadata: {
      calendly_event_uri: invitee.eventUri,
      calendly_invitee_uri: invitee.inviteeUri,
      rescheduled: payload.rescheduled === true,
    },
  });

  await insertBestEffort("lead_tasks", {
    lead_id: leadId,
    title: "Reschedule canceled call",
    status: "open",
    due_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    metadata: {
      calendly_event_uri: invitee.eventUri,
      calendly_invitee_uri: invitee.inviteeUri,
    },
  });

  return {
    ok: true,
    event: "invitee.canceled",
    processed: true,
    leadId,
  } satisfies CalendlyWebhookResult;
}

async function processCalendlyWebhook(body: CalendlyWebhookBody) {
  const event = clean(body.event);
  const payload = asRecord(body.payload);

  if (!webhookEvents.includes(event as CalendlyWebhookEvent)) {
    return {
      ok: true,
      event: event || "unknown",
      processed: false,
      reason: "Unhandled Calendly event.",
    } satisfies CalendlyWebhookResult;
  }

  if (event === "invitee.created") return handleInviteeCreated(payload);

  return handleInviteeCanceled(payload);
}

export async function handleCalendlyWebhookRequest(request: Request) {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed." }, 405);
  }

  const rawBody = await request.text();
  const verified = await verifyCalendlySignature(request, rawBody);

  if (!verified) {
    return jsonResponse({ ok: false, error: "Invalid Calendly webhook signature." }, 401);
  }

  let body: CalendlyWebhookBody = {};
  try {
    body = JSON.parse(rawBody) as CalendlyWebhookBody;
  } catch {
    return jsonResponse({ ok: false, error: "Invalid JSON payload." }, 400);
  }

  try {
    return jsonResponse(await processCalendlyWebhook(body));
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Calendly webhook processing failed.",
      },
      500,
    );
  }
}
