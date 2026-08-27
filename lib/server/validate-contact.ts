const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFormFields = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContactFieldErrors = Partial<{
  name: "required";
  email: "required" | "invalid";
  message: "required" | "tooShort";
}>;

export function validateContactForm(
  fields: ContactFormFields,
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (!fields.name.trim()) errors.name = "required";

  const email = fields.email.trim();
  if (!email) errors.email = "required";
  else if (!EMAIL_RE.test(email)) errors.email = "invalid";

  const message = fields.message.trim();
  if (!message) errors.message = "required";
  else if (message.length < 10) errors.message = "tooShort";

  return errors;
}

/**
 * Strips CR/LF (prevents email-header injection if a raw-SMTP provider is
 * ever wired up via a "From"/"Subject" built from user input) and caps
 * length. Applied to every field before validation or storage.
 */
export function sanitizeField(value: string, maxLength: number): string {
  return value
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, maxLength);
}
