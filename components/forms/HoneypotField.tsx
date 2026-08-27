/**
 * Spam trap (SPEC.md Section 30). Off-screen, not `display:none` — visible
 * enough for unsophisticated bots that fill every field, invisible to
 * sighted users, and skipped by keyboard/screen-reader navigation.
 */
export function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
    >
      <label htmlFor="company">Company</label>
      <input
        id="company"
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
