-- Private correlation between a Google Ads click and a short reference that can
-- safely appear in a WhatsApp message. This table deliberately stores no name,
-- phone number, message text, diagnosis, landing-page section, or other
-- clinical/contact content.

create table if not exists public.ad_click_references (
  reference_code text primary key,
  click_id_type text not null,
  click_id text not null,
  captured_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '90 days'),

  constraint ad_click_references_reference_format
    check (reference_code ~ '^AF-[23456789ABCDEFGHJKMNPQRSTVWXYZ]{4}-[23456789ABCDEFGHJKMNPQRSTVWXYZ]{4}$'),
  constraint ad_click_references_click_id_type
    check (click_id_type in ('gclid', 'gbraid', 'wbraid')),
  constraint ad_click_references_click_id_format
    check (
      char_length(click_id) between 10 and 512
      and click_id ~ '^[A-Za-z0-9._~-]+$'
    ),
  constraint ad_click_references_retention_window
    check (expires_at > captured_at and expires_at <= captured_at + interval '90 days'),
  constraint ad_click_references_click_unique
    unique (click_id_type, click_id)
);

create index if not exists ad_click_references_expires_at_idx
  on public.ad_click_references (expires_at);

alter table public.ad_click_references enable row level security;

-- The browser never talks to this table. Only the server-side service role may
-- insert, resolve, or purge a reference. There are intentionally zero policies.
revoke all on table public.ad_click_references from anon;
revoke all on table public.ad_click_references from authenticated;
grant select, insert, delete on table public.ad_click_references to service_role;

comment on table public.ad_click_references is
  'Google Ads click-to-lead correlation only. Contains a click identifier and a random short reference; never contact, message, or clinical data. Rows expire after 90 days. RLS enabled with no policies; server-side service-role access only.';

comment on column public.ad_click_references.reference_code is
  'Opaque human-readable code appended to the WhatsApp draft; it contains no encoded click or personal data.';

comment on column public.ad_click_references.click_id is
  'Case-sensitive Google Ads click identifier used only for an offline conversion import.';
