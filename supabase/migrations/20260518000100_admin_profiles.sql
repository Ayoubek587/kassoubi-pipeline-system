create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'viewer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint admin_profiles_role_check check (role in ('admin', 'viewer'))
);

create index if not exists admin_profiles_role_idx on public.admin_profiles (role);
create index if not exists admin_profiles_email_idx on public.admin_profiles (email);

alter table public.admin_profiles enable row level security;

drop policy if exists "Admins can read own admin profile" on public.admin_profiles;
create policy "Admins can read own admin profile"
on public.admin_profiles
for select
to authenticated
using (auth.uid() = user_id);
