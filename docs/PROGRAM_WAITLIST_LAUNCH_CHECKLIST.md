# Pre-registration — launch checklist

What must be true before `/estresse-reatividade` collects real contact details.
Technical steps: [`PROGRAM_WAITLIST_SETUP.md`](./PROGRAM_WAITLIST_SETUP.md).

None of this is legal advice. The LGPD items need someone qualified to sign off.

---

## Done

- [x] **WhatsApp path working** — `5511961820112`, prefilled PT-BR message asking
      for information. Plain `wa.me` link: no JS, no backend, no tracking.
- [x] **CRP published** — 06/115147, in the facilitator block and the footer.
- [x] **Privacy notice written** — `/estresse-reatividade/privacidade`, PT-BR,
      covering data collected, purpose, access, retention, deletion channel,
      WhatsApp processing, and the pre-registration distinction.
- [x] **Pre-registration language** — the page states in three places that
      contact does not reserve a place. The words *vaga*, *inscrição confirmada*
      and *matrícula* appear only in sentences that deny them.
- [x] **Crisis signposting** — CVV 188 and emergency numbers beside the form,
      stated calmly, with an explicit "this is not an urgent channel".
- [x] **Contact channel published** — `contato@andrefiker.com.br`, also the
      deletion-request address in the notice.
- [x] **No clinical collection** — no notes field, no free text but `name`,
      enforced by the schema.
- [x] **Placeholders removed** — price, dates, capacity and venue now read
      "A definir" rather than developer shorthand.
- [x] **Analytics absent** — verified zero GA/Ads/GTM on both program routes,
      while the home page still tracks normally.
- [x] **Tests** — 41 unit tests covering validation, duplicate handling,
      honeypot, IP digest, and same-origin (`npm test`).

## Blocked on a decision

- [ ] **Supabase project** — no project exists yet. A **dedicated** one is
      required, not a table inside an existing project: the service-role key
      deployed to the host bypasses RLS on *every* table in whichever project it
      belongs to. Both current projects (`clinica-pipeline`,
      `concordia-clinica-facil`) hold real clinical rows, so putting this table
      in either would hand a public web endpoint a credential that also unlocks
      patient records. Creating a third is currently refused — the organisation
      is on the free plan, capped at two active projects.
      Until a dedicated project exists the form stays in demo.
- [ ] **Facilitator photo** — none is set. The section renders text-only, which
      looks intentional. Supply a file if a photo is wanted.
- [ ] **Retention confirmed** — the notice currently commits to 24 months after
      last contact, or on request. Change the notice if that is wrong.

## Verified 2026-08-02 (demo mode, local)

Everything provable without a Supabase project has been proved. The schema and
the rate limiter were exercised against a **real, disposable PostgreSQL 17
container** — the migration was applied verbatim, after creating the `anon`,
`authenticated` and `service_role` roles that Supabase provides. This is strong
evidence but **not** a substitute for repeating the checks against the real
instance, which is why nothing below is ticked in the live checklist.

| Check | Result |
|---|---|
| `npm test` | 41/41 pass |
| `npm run build` | passes; both program routes prerendered static |
| `/`, `/estresse-reatividade`, `/…/privacidade` | 200 |
| Service-role key / JWT literals in `.next/static/` | none |
| Analytics on program routes | 0; home keeps GA `G-…` + Ads `AW-…` |
| Public default (env unset) | **no form at all** — 0 `<form>`, 0 inputs, 0 honeypot; WhatsApp hand-off panel renders instead |
| `demo` submit | **zero network requests**; demo receipt shown; nothing stored |
| API fail-closed when unconfigured | 503, stores nothing |
| GET / cross-origin / no-Origin / `sec-fetch-site` | 405 / 403 / 403 / 403 |
| Wrong content-type / >4096 B / malformed JSON | 415 / 413 / 400 |
| `consent: "true"` (string, not boolean) | 400 — rejected |
| Honeypot | 200 `{ok:true}`, indistinguishable from success, stores nothing |
| Error responses | generic codes only; never echo submitted values |
| Server logs | no emails, names, phones, or IPs |
| Migration applied verbatim | clean |
| Duplicate email, different case | **1 row**, updated in place |
| `consent_at` on re-submission | advances past `created_at` |
| Absent WhatsApp | stays `NULL`, never `""` |
| CHECK constraints | reject bad email shape, bad format token, empty name, and letters in `whatsapp` (free-text smuggling) |
| Rate limiter | 5 through, **6th refused**; per-digest not global; window expiry resets to 1 |
| Rate-limit digest column | refuses a raw IP and any non-64-hex value |
| RLS | enabled on both tables, **0 policies** |
| `anon` / `authenticated` privileges | none; live `set role anon` → *permission denied* on both table and function |
| Export / mark-contacted / delete | all work via plain SQL |
| Responsive 390 / 430 / 768 / 1024 / 1440 | zero horizontal overflow, both pages |
| Keyboard | 5 tabs from *Nome* lands on submit; honeypot skipped; 3px focus ring |
| Test data | disposable; container destroyed |

Not verifiable locally: WhatsApp on a real handset (the link is a plain `wa.me`
`href` baked into static HTML, so it needs neither JS nor the backend), and
everything requiring the live Supabase instance.

## Before switching the form to live

- [ ] Supabase project created and migration applied
- [ ] RLS confirmed enabled, with **zero** policies
- [ ] **`anon` key confirmed unable to read the table** — the single most
      important check. Failing it exposes every subscriber.
- [ ] Production bundle confirmed free of `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Cross-origin POST returns 403
- [ ] Duplicate submission updates the existing row rather than adding a second
- [ ] Honeypot submission stores nothing
- [ ] Rate limit trips on the sixth attempt within an hour
- [ ] `PROGRAM_WAITLIST_RATE_SALT` set (limiter cannot run without it, and the
      endpoint fails closed rather than accepting unlimited writes)
- [ ] Test rows deleted
- [ ] Rollback to demo verified

## Still open — decisions, not code

- [ ] **Who works the inbox, and how fast.** A list nobody reads is worse than
      no list: it takes data and returns nothing.
- [ ] Agreed response time for deletion and export requests
- [ ] Price, start date, session length, group size, capacity, venue or platform,
      payment method, refund terms, absence policy, recording policy, group
      confidentiality agreement — **none of these block pre-registration.** They
      block *enrollment*. The page truthfully says they are being defined.

## Scope boundaries to hold

- [ ] **No clinical data.** No symptoms, diagnoses, medication, treatment
      history, or free-text box that invites them. A "tell us briefly what
      you're going through" field would turn a contact list into health data and
      change every duty attaching to it.
- [ ] **No email automation in v1.** No Resend, no SMTP, no autoresponder.
- [ ] **No payment or enrolment management.**
- [ ] **No analytics on these routes.**
- [ ] **No browser-to-Supabase access.** The browser talks only to the
      same-origin API route.

## Go / no-go

```
NEXT_PUBLIC_PROGRAM_WAITLIST_MODE=live   # requires a rebuild
PROGRAM_WAITLIST_MODE=live               # server-side
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
PROGRAM_WAITLIST_RATE_SALT=...
```

Then submit one real test entry, confirm the row, confirm a repeat submission
updates it, export it, and delete it.

## Rollback

Set `PROGRAM_WAITLIST_MODE` to `demo`. Storage stops at the server immediately,
without a rebuild. Then set the public variable to `demo` and rebuild.

**WhatsApp keeps working throughout.** That is the point of keeping it
independent of the database.
