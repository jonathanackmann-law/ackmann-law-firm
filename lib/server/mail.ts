import type { ContactFormFields } from "./validate-contact";

/**
 * Single swap point for the email delivery provider (SPEC.md Section 18:
 * "must remain replaceable"). No `CONTACT_FORM_PROVIDER_API_KEY` is
 * configured in this environment, so this falls back to a server-only log —
 * the form's validation/sanitization/spam pipeline is still fully
 * exercisable end to end. Replace the body of this function with a real
 * provider call (Resend, Postmark, SES, ...) before production; nothing
 * else in the contact flow needs to change.
 */
export async function sendContactEmail(
  fields: ContactFormFields,
): Promise<void> {
  if (!process.env.CONTACT_FORM_PROVIDER_API_KEY) {
    console.log(
      "[contact-form] no provider configured, logging submission instead:",
      fields,
    );
    return;
  }

  throw new Error("Email provider integration not implemented yet.");
}
