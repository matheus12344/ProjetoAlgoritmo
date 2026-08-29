-- =============================================================================
-- program_interest — pre-registration list for "Estresse & Reatividade"
-- (/estresse-reatividade)
-- =============================================================================
--
-- PURPOSE
--   Stores *contact intent only* for people asking to be told when the first
--   cohort opens. This is a pre-registration list, NOT a clinical record and
--   NOT an enrollment record. A row here means "wants information". It does not
--   mean a place is reserved.
--
-- WHAT THIS TABLE MUST NEVER CONTAIN
--   No symptoms, diagnoses, medication, treatment history, crisis reports, or
--   clinical narrative. There is deliberately no free-text column other than
--   `name`, and no notes column. Adding one is not a schema tweak — health data
--   carries far stricter duties than contact data, and a notes field is how a
--   contact list quietly becomes one.
--
-- ACCESS MODEL
--   Row Level Security is enabled and **zero policies are created**. With RLS on
--   and no policies, `anon` and `authenticated` can read nothing, write nothing,
--   and see nothing — including through the auto-generated PostgREST API. Table
--   privileges are additionally revoked from those roles as defence in depth.
--
--   The only intended access path is server-side insertion with the service-role
--   key, which bypasses RLS. That key lives only in server environment variables
--   and never reaches the browser.
-- =============================================================================

create table if not exists public.program_interest (
  -- gen_random_uuid() is built into Postgres 13+; no extension required.
  id uuid primary key default gen_random_uuid(),

  -- Display name as typed. Length-capped so a malformed or abusive payload
  -- cannot bloat a row.
  name text not null,

  -- Contact email, stored as typed (case preserved for salutation).
  email text not null,

  -- Deduplication key, derived by the database rather than the application so
  -- the two can never drift: the app cannot store a "normalized" value that
  -- disagrees with the address beside it. lower() and btrim() are both
  -- IMMUTABLE, which a STORED generated column requires.
  --
  -- This is the conflict target for the upsert, so re-submitting the same
  -- address updates the existing row instead of creating a duplicate.
  email_normalized text generated always as (lower(btrim(email))) stored,

  -- Optional. NULL means "not provided" — the API never coerces this to an
  -- empty string, so "absent" stays distinguishable from "blank".
  whatsapp text,

  -- Constrained vocabulary, not free text. These are the canonical tokens the
  -- form submits; the Portuguese labels live in the page's content file.
  preferred_format text not null,

  -- When the consent box was ticked. Required: consent must be demonstrable,
  -- and "there is a row" is not by itself evidence of consent. On re-submission
  -- this advances, recording the most recent consent.
  consent_at timestamptz not null,

  created_at timestamptz not null default now(),

  -- Set by hand when André actually makes contact. Operational only — a
  -- timestamp, never a note. NULL means "not yet contacted".
  contacted_at timestamptz
    default null,

  -- --- Shape and length constraints ---------------------------------------
  -- These duplicate the API's validation on purpose. The API is the only
  -- intended writer today, but the database should still refuse nonsense.

  constraint program_interest_name_length
    check (char_length(btrim(name)) between 1 and 120),

  constraint program_interest_email_length
    -- 254 is the practical maximum length of an email address (RFC 5321).
    check (char_length(email) between 6 and 254),

  constraint program_interest_email_shape
    -- Deliberately loose: something@something.something with no whitespace.
    -- Strict RFC validation in a CHECK rejects valid addresses and is not worth
    -- the false negatives.
    check (email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),

  constraint program_interest_whatsapp_length
    check (whatsapp is null or char_length(btrim(whatsapp)) between 8 and 25),

  constraint program_interest_whatsapp_shape
    -- Digits and ordinary phone punctuation only. No letters, so this column
    -- cannot be repurposed as a free-text field.
    check (whatsapp is null or whatsapp ~ '^[0-9()+\-[:space:]]+$'),

  constraint program_interest_preferred_format
    check (preferred_format in ('online', 'presencial', 'tanto_faz'))
);

-- Unique index on the derived column: both the deduplication guarantee and the
-- arbiter index that ON CONFLICT (email_normalized) requires.
create unique index if not exists program_interest_email_normalized_key
  on public.program_interest (email_normalized);

-- Follow-up is worked oldest-first, by hand.
create index if not exists program_interest_created_at_idx
  on public.program_interest (created_at desc);

alter table public.program_interest enable row level security;

-- Supabase grants anon/authenticated broad privileges on new public-schema
-- tables by default. RLS already blocks them; revoking the grants too means a
-- future accidental policy cannot silently open the table up.
revoke all on table public.program_interest from anon;
revoke all on table public.program_interest from authenticated;

grant select, insert, update, delete on table public.program_interest to service_role;

comment on table public.program_interest is
  'Pre-registration contact intent for the Estresse & Reatividade program. Contact data only — never clinical data. A row means "wants information", not a reserved place. RLS enabled with no policies; server-side service-role insertion is the only intended access path.';

comment on column public.program_interest.email_normalized is
  'Database-derived lower(btrim(email)). Deduplication key and ON CONFLICT target.';

comment on column public.program_interest.whatsapp is
  'Optional phone contact. NULL when not provided; never an empty string.';

comment on column public.program_interest.preferred_format is
  'One of online | presencial | tanto_faz. Constrained vocabulary, not free text.';

comment on column public.program_interest.consent_at is
  'Timestamp of the explicit consent tick. Required. Advances on re-submission.';

comment on column public.program_interest.contacted_at is
  'Set manually when contact is made. Timestamp only — never a note.';

-- =============================================================================
-- Rate limiting
-- =============================================================================
--
-- Serverless instances are per-request and cold-started, so an in-process
-- counter would reset constantly and enforce nothing. The limiter therefore
-- lives in the database, where the count is shared and the increment is atomic.
--
-- PRIVACY: this table never stores an IP address. It stores an HMAC-SHA256
-- digest of one, keyed with a server-only secret. The key matters — the IPv4
-- space is small enough to enumerate exhaustively, so an *unkeyed* hash of an
-- IP is reversible in seconds and would still be personal data at rest.
-- Rows are short-lived and purged on use.
-- =============================================================================

create table if not exists public.program_interest_rate_limit (
  ip_digest text primary key,
  window_started_at timestamptz not null default now(),
  attempts integer not null default 1,

  constraint program_interest_rate_digest_shape
    -- Exactly one hex SHA-256 digest. Refuses anything that could be a raw
    -- address, so a coding mistake cannot turn this into IP storage.
    check (ip_digest ~ '^[0-9a-f]{64}$')
);

alter table public.program_interest_rate_limit enable row level security;

revoke all on table public.program_interest_rate_limit from anon;
revoke all on table public.program_interest_rate_limit from authenticated;

grant select, insert, update, delete
  on table public.program_interest_rate_limit to service_role;

comment on table public.program_interest_rate_limit is
  'Short-lived rate-limit counters for the pre-registration endpoint. Stores a keyed HMAC digest of the client IP, never the address itself. Purged opportunistically on each call.';

-- Atomic check-and-increment. One round trip, no read-then-write race.
-- Returns true when the caller may proceed, false when over the limit.
create or replace function public.program_interest_rate_check(
  p_digest text,
  p_max_attempts integer default 5,
  p_window_seconds integer default 3600
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_attempts integer;
begin
  -- Opportunistic purge keeps the table tiny and bounds retention without a
  -- scheduled job: expired digests are deleted by ordinary traffic.
  delete from public.program_interest_rate_limit
   where window_started_at < now() - make_interval(secs => p_window_seconds);

  insert into public.program_interest_rate_limit (ip_digest, window_started_at, attempts)
  values (p_digest, now(), 1)
  on conflict (ip_digest) do update
    set attempts = case
          when public.program_interest_rate_limit.window_started_at
               < now() - make_interval(secs => p_window_seconds)
          then 1
          else public.program_interest_rate_limit.attempts + 1
        end,
        window_started_at = case
          when public.program_interest_rate_limit.window_started_at
               < now() - make_interval(secs => p_window_seconds)
          then now()
          else public.program_interest_rate_limit.window_started_at
        end
  returning attempts into v_attempts;

  return v_attempts <= p_max_attempts;
end;
$$;

-- Only the server may call this. No anonymous or logged-in caller can probe it.
revoke all on function public.program_interest_rate_check(text, integer, integer) from public;
revoke all on function public.program_interest_rate_check(text, integer, integer) from anon;
revoke all on function public.program_interest_rate_check(text, integer, integer) from authenticated;
grant execute on function public.program_interest_rate_check(text, integer, integer) to service_role;
