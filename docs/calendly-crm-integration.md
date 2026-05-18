# Calendly CRM Integration

## Environment

Server-only:

- `CALENDLY_API_TOKEN`
- `CALENDLY_WEBHOOK_SIGNING_KEY`

Frontend-safe:

- `VITE_CALENDLY_EVENT_URL=https://calendly.com/omarobakkali/30min`

Never expose `CALENDLY_API_TOKEN` in frontend code.

## Webhook Endpoint

Configure Calendly to send webhooks to:

```text
https://YOUR_DOMAIN/api/calendly/webhook
```

Subscribe to:

- `invitee.created`
- `invitee.canceled`

Use the Calendly API with a personal access token that has webhook permissions. The high-level flow is:

1. Call Calendly `GET /users/me` to copy your user URI and organization URI.
2. Call `POST /webhook_subscriptions` with the endpoint URL, scope, organization/user URI, and events.
3. Store the webhook signing key in `CALENDLY_WEBHOOK_SIGNING_KEY`.

The webhook route verifies `Calendly-Webhook-Signature` when `CALENDLY_WEBHOOK_SIGNING_KEY` is set. In production, the signing key must be configured before the endpoint is used.

## Booking Tracking

The public analysis flow creates a Supabase lead and redirects to:

```text
/analyse-termin?lead_id={lead.id}
```

Calendly receives:

- `name={lead.full_name}`
- `email={lead.email}`
- `a1={lead.id}`
- `a2={lead.company_name}`
- `a3={lead.website}`

For best webhook matching, add a Calendly custom question that captures the first custom answer (`a1`) as the internal lead id.

## Testing

1. Run the SQL migration in Supabase.
2. Set `VITE_CALENDLY_EVENT_URL`, `CALENDLY_API_TOKEN`, and `CALENDLY_WEBHOOK_SIGNING_KEY`.
3. Create a Calendly webhook subscription for `invitee.created` and `invitee.canceled`.
4. Submit the analysis form and book a call from `/analyse-termin`.
5. Confirm the lead status changes to `booked`, activity is created, and a task named `Prepare for booked call` exists.
6. Cancel the Calendly booking and confirm an activity plus `Reschedule canceled call` task exists.

## Current Limitations

- No full calendar sync.
- No reschedule-specific workflow beyond Calendly's `invitee.canceled` plus `invitee.created` event pair.
- If the Calendly custom answer does not include the lead id, matching falls back to invitee email.
