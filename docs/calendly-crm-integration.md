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

## Booking Confirmation Page

After a successful booking, Calendly must redirect the visitor to the public Kassoubi confirmation page:

```text
https://kassoubi-vermittlung.de/termin-bestaetigt
```

Configure this manually in the Calendly event type under the confirmation-page settings by selecting the option to redirect to an external site and entering the URL above. Do not add lead ids, invitee ids, email addresses, or other personal data to the redirect URL.

The browser confirmation page and the Calendly webhook have separate responsibilities:

- `/termin-bestaetigt` only confirms the completed scheduling flow to the visitor. It is public, contains no booking identifiers, and does not update CRM data.
- The backend `invitee.created` webhook remains the authoritative source for marking the matching lead as booked, storing appointment data, and creating CRM activity and follow-up tasks.

Loading or refreshing the browser confirmation page does not prove that a booking exists and must never be used as a substitute for the webhook.

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
