-- Roles enum + table
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users can read their own roles"
  on public.user_roles for select to authenticated
  using (user_id = auth.uid());

create policy "Admins can read all roles"
  on public.user_roles for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Auto-promote first signup to admin
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
declare
  user_count int;
begin
  select count(*) into user_count from auth.users;
  if user_count = 1 then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  else
    insert into public.user_roles (user_id, role) values (new.id, 'user');
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Orders table
create type public.order_status as enum ('new', 'preparing', 'ready', 'completed', 'cancelled');

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  customer_address text,
  items jsonb not null,
  total_amount numeric(10,2) not null,
  notes text,
  status order_status not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

-- Anyone (even anonymous) can place an order
create policy "Anyone can create orders"
  on public.orders for insert to anon, authenticated
  with check (true);

-- Only admins can read / update / delete orders
create policy "Admins can read orders"
  on public.orders for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update orders"
  on public.orders for update to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete orders"
  on public.orders for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create index orders_created_at_idx on public.orders (created_at desc);
create index orders_status_idx on public.orders (status);
