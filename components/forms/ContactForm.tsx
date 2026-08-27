"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import {
  submitContactForm,
  type ContactFormState,
} from "@/lib/server/contact-actions";
import type { ContactFieldErrors } from "@/lib/server/validate-contact";
import { Button } from "@/components/ui/Button";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

const initialState: ContactFormState = { status: "idle" };

const inputClasses =
  "w-full border border-border bg-surface px-4 py-3 text-base text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

export function ContactForm() {
  const t = useTranslations("contactForm");
  const [state, formAction] = useActionState(submitContactForm, initialState);
  // Render-to-submit timestamp for the spam time-floor check server-side.
  // A ref, not state: `Date.now()` differs between SSR and client hydration,
  // so computing it via useState (even in an effect) either trips a
  // hydration mismatch or an unnecessary extra render. This value is only
  // read by the browser's native form submission, never displayed — direct
  // DOM assignment via ref is the more correct tool here, not React state.
  const startedAtRef = useRef<HTMLInputElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startedAtRef.current) {
      startedAtRef.current.value = String(Date.now());
    }
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      trackEvent(ANALYTICS_EVENTS.contactSubmit);
    }
    if (state.status === "error") {
      // Focusable error summary (ui-ux-pro-max ux-guidelines: "Focusable
      // Error Summary", High severity) — a screen-reader/keyboard user
      // submitting with several invalid fields shouldn't have to
      // rediscover each one by tabbing through the whole form again.
      errorSummaryRef.current?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <p role="status" className="text-body-lg text-foreground/80">
        {t("successMessage")}
      </p>
    );
  }

  const fieldErrors = state.status === "error" ? state.fieldErrors : {};
  const fieldLabels: Record<keyof ContactFieldErrors, string> = {
    name: t("nameLabel"),
    email: t("emailLabel"),
    message: t("messageLabel"),
  };

  function fieldErrorMessage(
    field: keyof ContactFieldErrors,
    code: string | undefined,
  ) {
    if (!code) return "";
    if (field === "email" && code === "invalid")
      return t("errors.emailInvalid");
    if (field === "message" && code === "tooShort")
      return t("errors.messageTooShort");
    return t("errors.required");
  }

  const errorEntries = Object.entries(fieldErrors) as [
    keyof ContactFieldErrors,
    string,
  ][];

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      <HoneypotField />
      <input
        type="hidden"
        name="startedAt"
        ref={startedAtRef}
        defaultValue=""
      />

      {state.status === "serverError" && (
        <p role="alert" className="text-sm text-red-700">
          {t("serverError")}
        </p>
      )}

      {errorEntries.length > 0 && (
        <div
          ref={errorSummaryRef}
          role="alert"
          tabIndex={-1}
          aria-labelledby="contact-error-summary-title"
          className="border border-red-700 p-4 focus:outline-none"
        >
          <p
            id="contact-error-summary-title"
            className="text-sm font-medium text-red-700"
          >
            {t("errorSummaryTitle")}
          </p>
          <ul className="mt-2 flex flex-col gap-1">
            {errorEntries.map(([field, code]) => (
              <li key={field}>
                <a
                  href={`#${field}`}
                  className="text-sm text-red-700 underline"
                >
                  {fieldLabels[field]}: {fieldErrorMessage(field, code)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="name" className="text-sm text-muted">
          {t("nameLabel")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
          className={`mt-2 ${inputClasses}`}
        />
        {fieldErrors.name && (
          <p id="name-error" role="alert" className="mt-2 text-sm text-red-700">
            {fieldErrorMessage("name", fieldErrors.name)}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm text-muted">
          {t("emailLabel")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
          className={`mt-2 ${inputClasses}`}
        />
        {fieldErrors.email && (
          <p
            id="email-error"
            role="alert"
            className="mt-2 text-sm text-red-700"
          >
            {fieldErrorMessage("email", fieldErrors.email)}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="text-sm text-muted">
          {t("phoneLabel")}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          maxLength={30}
          className={`mt-2 ${inputClasses}`}
        />
      </div>

      <div>
        <label htmlFor="subject" className="text-sm text-muted">
          {t("subjectLabel")}
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          maxLength={150}
          className={`mt-2 ${inputClasses}`}
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm text-muted">
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={4000}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className={`mt-2 ${inputClasses}`}
        />
        {fieldErrors.message && (
          <p
            id="message-error"
            role="alert"
            className="mt-2 text-sm text-red-700"
          >
            {fieldErrorMessage("message", fieldErrors.message)}
          </p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("contactForm");

  return (
    <Button type="submit" disabled={pending} className="self-start">
      {pending ? t("sending") : t("send")}
    </Button>
  );
}
