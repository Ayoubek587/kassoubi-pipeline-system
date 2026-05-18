alter table public.leads
  add column if not exists cv_file_path text;

insert into storage.buckets (id, name, public)
values ('bewerber-cvs', 'bewerber-cvs', false)
on conflict (id) do update set public = false;
