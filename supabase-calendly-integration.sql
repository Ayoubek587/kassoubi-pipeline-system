-- Calendly CRM integration fields for Structure Digital Lead OS.
-- Safe to run more than once.

alter table public.leads
  add column if not exists booked_at timestamptz,
  add column if not exists calendly_event_uri text,
  add column if not exists calendly_invitee_uri text,
  add column if not exists calendly_scheduled_at timestamptz,
  add column if not exists calendly_canceled_at timestamptz;

create table if not exists public.lead_activity (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  activity_type text not null,
  title text not null,
  description text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.lead_tasks (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  title text not null,
  status text not null default 'open',
  due_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists leads_calendly_invitee_uri_idx
  on public.leads (calendly_invitee_uri);

create index if not exists leads_calendly_scheduled_at_idx
  on public.leads (calendly_scheduled_at);

create index if not exists lead_activity_lead_id_created_at_idx
  on public.lead_activity (lead_id, created_at desc);

create index if not exists lead_tasks_lead_id_status_due_at_idx
  on public.lead_tasks (lead_id, status, due_at);
