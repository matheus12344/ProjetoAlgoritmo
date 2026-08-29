"use client";

import { type FormEvent, useState } from "react";
import { MessageCircle } from "lucide-react";
import styles from "../program.module.css";
import { program, whatsappHref, type InterestFormCopy } from "../program-data";

/**
 * Three states, decided by NEXT_PUBLIC_PROGRAM_WAITLIST_MODE, which is inlined
 * at build time.
 *
 *   "live"  — the form submits to the internal API route.
 *   "demo"  — the form renders and validates, but never opens a network
 *             connection; the submission stays in React state. Deliberately
 *             opt-in, so it can be worked on locally without a database.
 *   unset / anything else — no form at all. The section becomes a WhatsApp
 *             hand-off instead.
 *
 * The default matters. An unset variable must not produce a form that accepts
 * what someone types and quietly discards it — on a page about stress, wasting
 * a distressed person's effort and returning nothing is the worst of the three
 * outcomes. Absent configuration therefore means "not open yet", not "pretend".
 *
 * Going live still takes two independent switches: this one lets the form call
 * the route at all, and PROGRAM_WAITLIST_MODE (server-only) lets that route
 * store anything. Either one short of "live" and nothing is written.
 */
const mode = process.env.NEXT_PUBLIC_PROGRAM_WAITLIST_MODE;
const isLive = mode === "live";
const isDemo = mode === "demo";

type FormState = {
  name: string;
  email: string;
  whatsapp: string;
  format: string;
  permission: boolean;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  whatsapp: "",
  format: "",
  permission: false,
  website: "",
};

export function InterestForm({ copy }: { copy: InterestFormCopy }) {
  // Neither live nor demo: the pre-registration list is not open, so there is
  // nothing to fill in. Rendered before any hooks-dependent branching so this
  // path stays a plain, JS-free hand-off to the one channel that works.
  if (!isLive && !isDemo) {
    return (
      <div className={styles.formClosed}>
        <h3>{copy.closed.title}</h3>
        <p>{copy.closed.explanation}</p>
        <a
          className={`${styles.programButton} ${styles.whatsappButton} ${styles.fullButton}`}
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={program.whatsapp.ariaLabel}
        >
          {copy.closed.cta}
          <MessageCircle aria-hidden="true" />
        </a>
        <p className={styles.privacyNote}>
          {copy.closed.privacyNote}{" "}
          <a href={copy.privacyHref}>{copy.privacyLink}</a>
        </p>
      </div>
    );
  }

  return <InterestFormFields copy={copy} />;
}

function InterestFormFields({ copy }: { copy: InterestFormCopy }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (pending) {
      return;
    }

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.format ||
      !form.permission
    ) {
      setError(copy.validationError);
      return;
    }

    if (!isLive) {
      // Demo path, unchanged: nothing is sent and nothing is stored.
      setSubmitted(true);
      return;
    }

    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/program-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          whatsapp: form.whatsapp.trim(),
          preferredFormat: form.format,
          consent: form.permission,
          website: form.website,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean }
        | null;

      if (!response.ok || result?.ok !== true) {
        // One generic message for every failure. The reason lives in the
        // server's status code, and none of them are actionable by the person
        // filling in the form.
        setError(copy.submitError);
        return;
      }

      setSubmitted(true);
    } catch {
      setError(copy.submitError);
    } finally {
      setPending(false);
    }
  }

  if (submitted) {
    return (
      <div className={styles.formSuccess} role="status">
        <span className={styles.successMark} aria-hidden="true">
          ✓
        </span>
        <h3>{isLive ? copy.liveSuccessTitle : copy.successTitle}</h3>
        <p>{isLive ? copy.liveSuccessMessage : copy.successMessage}</p>
        <button
          type="button"
          className={styles.textButton}
          onClick={() => {
            setSubmitted(false);
            setForm(initialState);
          }}
        >
          {copy.reset}
        </button>
      </div>
    );
  }

  return (
    <form className={styles.interestForm} onSubmit={submit} noValidate>
      <p className={styles.prototypeNote}>
        {isLive ? copy.liveNote : copy.prototypeNote}
      </p>
      <div className={styles.field}>
        <label htmlFor="interest-name">
          {copy.fields.name} <span aria-hidden="true">*</span>
        </label>
        <input
          id="interest-name"
          name="name"
          autoComplete="name"
          maxLength={120}
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="interest-email">
          {copy.fields.email} <span aria-hidden="true">*</span>
        </label>
        <input
          id="interest-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="interest-whatsapp">
          {copy.fields.whatsapp} <small>{copy.fields.optional}</small>
        </label>
        <input
          id="interest-whatsapp"
          name="whatsapp"
          inputMode="tel"
          autoComplete="tel"
          maxLength={25}
          value={form.whatsapp}
          onChange={(event) => update("whatsapp", event.target.value)}
        />
      </div>
      <fieldset className={`${styles.field} ${styles.formatField}`}>
        <legend>
          {copy.fields.format} <span aria-hidden="true">*</span>
        </legend>
        <div className={styles.radioGroup}>
          {copy.formatOptions.map((option) => (
            <label key={option.value} className={styles.radioOption}>
              <input
                type="radio"
                name="format"
                value={option.value}
                checked={form.format === option.value}
                onChange={(event) => update("format", event.target.value)}
                required
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className={styles.checkboxOption}>
        <input
          type="checkbox"
          name="permission"
          checked={form.permission}
          onChange={(event) => update("permission", event.target.checked)}
          required
        />
        <span>
          {copy.permission} <strong>*</strong>
        </span>
      </label>
      {/*
        Honeypot: off-screen, out of the tab order, and hidden from assistive
        technology. A human never sees it, so anything in it marks the
        submission as automated.
      */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="interest-website">{copy.honeypotLabel}</label>
        <input
          id="interest-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>
      {error ? (
        <p className={styles.formError} role="alert">
          {error}
        </p>
      ) : null}
      <button
        className={`${styles.programButton} ${styles.fullButton}`}
        type="submit"
        disabled={pending}
      >
        {pending ? copy.submitting : copy.submit}
      </button>
      {/*
        Shown in both modes. Demo and live collect the same fields on screen, so
        the person deserves the same explanation before they start typing.
      */}
      <p className={styles.privacyNote}>
        {copy.privacyNote}{" "}
        <a href={copy.privacyHref}>{copy.privacyLink}</a>
      </p>
    </form>
  );
}
