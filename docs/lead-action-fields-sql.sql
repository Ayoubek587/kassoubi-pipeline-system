alter table public.leads
  add column if not exists whatsapp_number text,
  add column if not exists last_contacted_at timestamptz,
  add column if not exists follow_up_date date,
  add column if not exists priority text not null default 'normal',
  add column if not exists action_status text,
  add column if not exists archived boolean not null default false,
  add column if not exists deleted_at timestamptz;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'leads_priority_check'
  ) then
    alter table public.leads
      add constraint leads_priority_check
      check (priority in ('low', 'normal', 'high', 'urgent'))
      not valid;
  end if;
end $$;

alter table public.leads
  drop constraint if exists leads_action_status_check;

alter table public.leads
  add constraint leads_action_status_check
  check (
    action_status is null
    or action_status in (
      'contacted',
      'called',
      'emailed',
      'whatsapp_sent',
      'follow_up_needed'
    )
  )
  not valid;
