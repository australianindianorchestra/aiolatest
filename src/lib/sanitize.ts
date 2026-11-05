/**
 * Input sanitisation helpers.
 *
 * All user-supplied strings should be passed through these helpers before
 * being used in API calls, email bodies, or stored in the database.
 */

/**
 * Strip control characters and trim whitespace.
 * Use on any string field that doesn't need HTML.
 */
export function sanitizeText(value: unknown, maxLength = 500): string {
  if (typeof value !== "string") return "";
  return value
    .trim()
    .replace(/[\x00-\x1F\x7F]/g, "") // strip control chars
    .slice(0, maxLength);
}

/**
 * Validate and normalise an email address.
 * Returns the lowercased email or null if invalid.
 */
export function sanitizeEmail(value: unknown): string | null {
  const s = sanitizeText(value, 254).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) ? s : null;
}

/**
 * Validate a URL string — only allow http/https schemes.
 * Returns the URL string if valid, or null.
 */
export function sanitizeUrl(value: unknown): string | null {
  const s = sanitizeText(value, 2048);
  try {
    const url = new URL(s);
    return url.protocol === "http:" || url.protocol === "https:" ? s : null;
  } catch {
    return null;
  }
}

/**
 * Validate a numeric ID from URL params or request body.
 * Returns the number or null if invalid.
 */
export function sanitizeId(value: unknown): number | null {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
}

/**
 * Sanitise a phone number — allow digits, spaces, +, (, ), -
 */
export function sanitizePhone(value: unknown): string | null {
  const s = sanitizeText(value, 20);
  return /^\+?[\d\s()\-]{7,20}$/.test(s) ? s : null;
}

/**
 * Escape HTML special characters to prevent XSS when content
 * is inserted into HTML strings (e.g. email templates).
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
