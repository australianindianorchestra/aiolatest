/**
 * Client-side auth session management.
 *
 * The session is stored in localStorage so it persists across page
 * refreshes without a server cookie setup. The JWT token is included
 * so server-authenticated requests can use it.
 */

export type AuthSession = {
  userId: number;      // WordPress numeric user ID
  username: string;
  role: "customer" | "administrator" | "user"; // normalised role
  displayName: string;
  email: string;
  token: string;       // WordPress JWT token
};

const SESSION_KEY = "aio-auth-session";

export function saveSession(session: AuthSession): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // ignore storage errors
  }
}

export function getStoredSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

/** Normalises a WP roles array to the single role used in the app. */
export function normaliseRole(
  roles: string[]
): "customer" | "administrator" | "user" {
  if (roles.includes("administrator")) return "administrator";
  if (roles.includes("customer")) return "customer";
  return "user";
}
