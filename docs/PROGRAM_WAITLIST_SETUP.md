# Pre-registration — setup

Technical setup for the two participation paths on `/estresse-reatividade`.

**Current state: WhatsApp is live and works. The form is in demo mode and stores
nothing.** No Supabase project is linked, the migration has not been applied, and
no environment variables are set. Everything in the "activation" sections below
describes work that has *not* been done.

Companion: [`PROGRAM_WAITLIST_LAUNCH_CHECKLIST.md`](./PROGRAM_WAITLIST_LAUNCH_CHECKLIST.md).

---

## The two paths

| Path | Depends on | Status |
|---|---|---|
| **WhatsApp** | nothing — a plain `wa.me` link | **Working.** No JS, no backend, no database. Survives any outage. |
| **Form** | Supabase + env vars | **Not rendered.** With no configuration the section becomes a WhatsApp hand-off instead. |

This split is deliberate. The page always has one genuinely working way to reach
André, regardless of the backend's state.

## The three states

`NEXT_PUBLIC_PROGRAM_WAITLIST_MODE` has three meaningful positions, not two:

| Value | What renders | Stores |
|---|---|---|
| unset / anything else | **No form.** A panel saying pre-registration is not open yet, with a WhatsApp button. | nothing |
| `demo` | The full form, with a prototype notice. Validates, never opens a network connection. | nothing |
| `live` | The full form, posting to `/api/program-interest`. | only if the server switch also says `live` |

The default is the important one. An unset variable must not produce a form that
accepts what someone types and silently discards it — on a page about stress,
consuming a distressed person's effort and returning nothing is worse than
having no form. So *absent configuration means "not open yet"*, never "pretend".
`demo` exists so the form can be styled and reviewed locally without a database;
it is opt-in precisely because it is the state that must never ship.

The copy around the form follows the same switch (`waitlistFormOpen` in
`program-data.ts`), so the section cannot promise a field that is not on screen.

## Files

| File | Role |
|---|---|
| `src/app/(program)/estresse-reatividade/program-data.ts` | All editable copy, the WhatsApp number and message, logistics |
| `src/app/(program)/estresse-reatividade/privacidade/` | PT-BR privacy notice (page + copy) |
| `src/app/(program)/estresse-reatividade/_components/InterestForm.tsx` | The form. Demo unless explicitly switched. |
| `src/app/api/program-interest/route.ts` | Server-side intake. Fails closed. |
| `src/lib/program-interest.ts` | Validation, normalization, IP digest, same-origin — pure and testable |
| `src/lib/program-interest.test.ts` | 41 unit tests (`npm test`) |
| `supabase/migrations/20260801000000_create_program_interest.sql` | Schema. **Never applied.** |
| `.env.example` | Variable names, no values |

## WhatsApp

Number and message live in one place — `program.whatsapp` in `program-data.ts`.
The link is derived once as `whatsappHref` and used in the hero, the interest
section, and the footer.

It is a plain `href`. No JavaScript, no click handler, no tracking parameters,
no analytics. Changing the number or the message means editing those two fields
and nothing else.

---

## Environment variables

Four, all server-side except the first.

| Variable | Side | Purpose |
|---|---|---|
| `NEXT_PUBLIC_PROGRAM_WAITLIST_MODE` | browser | Whether the form renders at all, and whether it calls the API. Three states — see above. Read at **build** time. |
| `PROGRAM_WAITLIST_MODE` | server | Lets the API store anything. |
| `SUPABASE_URL` | server | Project REST URL |
| `SUPABASE_SERVICE_ROLE_KEY` | server | **Bypasses RLS.** Never `NEXT_PUBLIC_`. |
| `PROGRAM_WAITLIST_RATE_SALT` | server | HMAC key for the rate limiter's IP digest |

Both mode variables must read exactly `live`. They are checked in different
places and neither can see the other: the browser switch cannot enable storage,
and the server switch cannot make the form submit. Unset or misspelled means
demo — the code tests for the literal string `live`, so a typo fails safe.

If any of the three server variables is missing while `PROGRAM_WAITLIST_MODE=live`,
the route treats the configuration as absent and stores nothing.

Generate the salt with `openssl rand -hex 32`. Changing it just resets in-flight
rate-limit windows, which is harmless.

---

## Activating the backend

Nothing here has been done.

1. **Choose or create a Supabase project.** A dedicated project keeps this
   contact list separate from unrelated data. Prefer region `sa-east-1` (São
   Paulo) — the audience is Brazilian.
2. **Apply the migration.** Review
   `supabase/migrations/20260801000000_create_program_interest.sql` in full
   first, then either `supabase db push` or paste it into the dashboard SQL
   editor. It creates two tables and one function and touches nothing existing.
3. **Set the five variables** in the host's server environment.
   `NEXT_PUBLIC_PROGRAM_WAITLIST_MODE` needs a **rebuild**, not just a restart.
4. **Verify** using the checks below before announcing the page.

## Schema

`program_interest` — contact intent only:

| Column | Notes |
|---|---|
| `id` | uuid |
| `name` | ≤ 120 chars |
| `email` | as typed, ≤ 254 chars |
| `email_normalized` | **generated** `lower(btrim(email))`, unique — the dedup key |
| `whatsapp` | optional, NULL when absent, digits/punctuation only |
| `preferred_format` | `online` \| `presencial` \| `tanto_faz` |
| `consent_at` | required; advances on re-submission |
| `created_at` | default `now()` |
| `contacted_at` | set by hand. **Timestamp only — never a note.** |

There is no notes column and no free-text field other than `name`. That is the
privacy boundary, enforced by the schema rather than by discipline.

`program_interest_rate_limit` — `ip_digest` (HMAC-SHA256 hex, CHECK-constrained
to 64 hex chars), `window_started_at`, `attempts`. Never stores an address.
Purged opportunistically on each call.

`program_interest_rate_check(digest, max, window)` — atomic check-and-increment,
`security definer`, executable only by `service_role`.

## Verifying — do not skip

1. **The anon key cannot read the table.** With the *publishable/anon* key:
   ```
   curl -s "$SUPABASE_URL/rest/v1/program_interest?select=*" \
     -H "apikey: $ANON_KEY" -H "Authorization: Bearer $ANON_KEY"
   ```
   Expect an empty array or a permission error. **Any subscriber data in that
   response means the table is publicly readable — stop.**
2. **No service key in the bundle:** `grep -r "SUPABASE_SERVICE_ROLE" .next/static/`
   must return nothing.
3. **Cross-origin POST returns 403.** A `curl` POST with no `Origin` header.
4. **Rate limit trips.** Six valid submissions from one address within an hour;
   the sixth returns 429.
5. **Duplicate updates rather than duplicates.** Submit the same email twice;
   the table must hold one row with an advanced `consent_at`.
6. **Demo means demo.** With the variables unset, submit with the network panel
   open — there must be no request to `/api/program-interest`.

---

## Manual follow-up

No automation, and none planned for v1. No email is sent — not a confirmation,
not a notification. Nobody hears anything until André writes to them.

1. Open the table in the Supabase dashboard, sorted by `created_at`.
2. Contact people individually, by email or WhatsApp.
3. Set `contacted_at` on that row.
4. Export via the dashboard's CSV export.
5. Delete a row on request, from the dashboard.

Consequence worth stating: **someone who submits the form gets no
acknowledgement beyond the on-screen confirmation.** The live receipt says only
that the contact details were received, and explicitly that it does not reserve
a place. Keep it that way until the promise becomes true.

## Retention

The published notice commits to **24 months after last contact, or on request,
whichever is sooner.** There is no automatic expiry — that commitment is
currently kept by hand. If it should be automatic, that is a scheduled job and a
v2 decision.

## Rollback

- **Set `PROGRAM_WAITLIST_MODE` to `demo`.** Storage stops immediately at the
  server, no rebuild needed. This is the fast path.
- Then set `NEXT_PUBLIC_PROGRAM_WAITLIST_MODE` to `demo` and rebuild, so the form
  stops posting and shows the demo notice again.
- **WhatsApp is unaffected by any of this** and keeps working.
- Reverting the migration destroys collected rows — export first.

## Tracking isolation

`/estresse-reatividade` and `/estresse-reatividade/privacidade` live in the
`(program)` route group, whose root layout carries no Google Analytics, no Google
Ads, and no tag manager. The pre-existing public pages live in `(tracked)`, whose
layout does.

The separation is structural — two layouts, not a runtime pathname check. Keep it
that way: moving this route into `(tracked)`, or adding tags to the `(program)`
layout, would start building ad profiles from people reading about stress.
