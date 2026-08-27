"use server";

import {
  validateContactForm,
  sanitizeField,
  type ContactFieldErrors,
} from "./validate-contact";
import { sendContactEmail } from "./mail";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; fieldErrors: ContactFieldErrors }
  | { status: "serverError" };

const MAX_LENGTHS = {
  name: 100,
  email: 200,
  phone: 30,
  subject: 150,
  message: 4000,
} as const;

// Bots fill every field and submit near-instantly. A hidden honeypot field
// plus a render-to-submit time floor catches unsophisticated spam without
// a CAPTCHA or a shared rate-limit store (neither justified before the
// site is deployed publicly — SPEC.md Section 30).
const MIN_SUBMIT_MS = 2000;

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
    honeypot: String(formData.get("company") ?? ""),
    startedAt: Number(formData.get("startedAt") ?? "0"),
  };

  const elapsed = Date.now() - raw.startedAt;
  const isSpam =
    raw.honeypot.trim() !== "" ||
    (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < MIN_SUBMIT_MS);

  if (isSpam) {
    // Never reveal detection to the sender — a real success response with
    // nothing actually sent.
    return { status: "success" };
  }

  const fields = {
    name: sanitizeField(raw.name, MAX_LENGTHS.name),
    email: sanitizeField(raw.email, MAX_LENGTHS.email),
    phone: sanitizeField(raw.phone, MAX_LENGTHS.phone),
    subject: sanitizeField(raw.subject, MAX_LENGTHS.subject),
    message: sanitizeField(raw.message, MAX_LENGTHS.message),
  };

  const fieldErrors = validateContactForm(fields);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  try {
    await sendContactEmail(fields);
  } catch (error) {
    console.error("[contact-form] delivery failed:", error);
    return { status: "serverError" };
  }

  return { status: "success" };
}
