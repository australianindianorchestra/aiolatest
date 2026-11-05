/**
 * WordPress / WooCommerce authentication helpers.
 *
 * This module talks to the WordPress site via:
 *  - JWT Authentication for WP REST API (https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/)
 *    Plugin must be installed and WP configured with JWT_AUTH_SECRET_KEY in wp-config.php
 *  - WooCommerce REST API (consumer key + secret) for order/customer management
 *
 * If JWT is unavailable the helper falls back to WP Application Passwords.
 */

const WP_BASE = (process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "").replace(/\/$/, "");
const WP_API_SECRET = process.env.WP_API_SECRET_KEY;

export type WpUser = {
  id: number;
  username: string;
  name: string;
  email: string;
  roles: string[];
  token?: string; // JWT token if applicable
};

export type WpAuthResult =
  | { success: true; user: WpUser; token: string }
  | { success: false; error: string };

export type WpRegisterResult =
  | { success: true; user: WpUser }
  | { success: false; error: string };

// ---------------------------------------------------------------------------
// Login — validates credentials against WP JWT endpoint
// ---------------------------------------------------------------------------
export async function wpLogin(
  username: string,
  password: string
): Promise<WpAuthResult> {
  if (!WP_BASE) {
    return { success: false, error: "WordPress URL is not configured." };
  }

  try {
    const response = await fetch(`${WP_BASE}/wp-json/jwt-auth/v1/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok || !data?.token) {
      // JWT plugin returns { code, message, data } on failure
      const message =
        data?.message || data?.code || "Invalid username or password.";
      return { success: false, error: message };
    }

    // Fetch full user profile with the token
    const profileResponse = await fetch(`${WP_BASE}/wp-json/wp/v2/users/me`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    let roles: string[] = [];
    let userId = 0;
    let userEmail = data.user_email || "";
    let userName = data.user_display_name || username;

    if (profileResponse.ok) {
      const profile = await profileResponse.json();
      userId = profile.id || 0;
      roles = profile.roles || [];
      userName = profile.name || userName;
    }

    // Also try to get email from WC customer endpoint if we have a userId
    if (userId && !userEmail) {
      try {
        const wcResponse = await fetchWcCustomer(userId);
        if (wcResponse) userEmail = wcResponse.email || "";
      } catch {
        // ignore
      }
    }

    const user: WpUser = {
      id: userId,
      username: data.user_nicename || username,
      name: userName,
      email: userEmail,
      roles,
      token: data.token,
    };

    return { success: true, user, token: data.token };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Login failed. Please try again.",
    };
  }
}

// ---------------------------------------------------------------------------
// Register — creates a new WP user with customer role via WC Customers API
// ---------------------------------------------------------------------------
export async function wpRegister(
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<WpRegisterResult> {
  if (!WP_BASE) {
    return { success: false, error: "WordPress URL is not configured." };
  }

  const consumerKey = process.env.WC_CONSUMER_KEY || "";
  const consumerSecret = process.env.WC_CONSUMER_SECRET || "";

  if (!consumerKey || !consumerSecret) {
    return {
      success: false,
      error: "WooCommerce API credentials are not configured.",
    };
  }

  try {
    // WooCommerce Customers API — automatically creates a WP user with customer role
    const response = await fetch(`${WP_BASE}/wp-json/wc/v3/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64"),
      },
      body: JSON.stringify({
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        role: "customer",
      }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      const message =
        data?.message ||
        (data?.code === "registration-error-email-exists"
          ? "An account with this email already exists."
          : data?.code === "registration-error-username-exists"
          ? "This username is already taken."
          : "Registration failed. Please try again.");
      return { success: false, error: message };
    }

    const user: WpUser = {
      id: data.id,
      username: data.username || username,
      name: `${firstName} ${lastName}`.trim() || username,
      email: data.email || email,
      roles: ["customer"],
    };

    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Registration failed. Please try again.",
    };
  }
}

// ---------------------------------------------------------------------------
// Short-lived in-memory cache for token validation — avoids repeat round-trips
// within the same request burst (e.g. multiple API calls on the same page load).
// TTL is intentionally short (30s) so revoked tokens aren't served stale.
// ---------------------------------------------------------------------------
const tokenCache = new Map<string, { user: WpUser; expires: number }>();
const TOKEN_CACHE_TTL = 30_000; // 30 seconds

function getCachedUser(token: string): WpUser | null {
  const entry = tokenCache.get(token);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    tokenCache.delete(token);
    return null;
  }
  return entry.user;
}

function setCachedUser(token: string, user: WpUser): void {
  // Prevent unbounded growth — evict expired entries when cache is large
  if (tokenCache.size > 500) {
    const now = Date.now();
    for (const [k, v] of tokenCache) {
      if (v.expires < now) tokenCache.delete(k);
    }
  }
  tokenCache.set(token, { user, expires: Date.now() + TOKEN_CACHE_TTL });
}

// ---------------------------------------------------------------------------
// Validate an existing JWT token and return current user info
// ---------------------------------------------------------------------------
export async function wpValidateToken(token: string): Promise<WpUser | null> {
  if (!WP_BASE || !token) return null;

  // Return cached result if fresh
  const cached = getCachedUser(token);
  if (cached) return cached;

  try {
    // Validate token and fetch profile in parallel
    const [validateRes, profileRes] = await Promise.all([
      fetch(`${WP_BASE}/wp-json/jwt-auth/v1/token/validate`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }),
      fetch(`${WP_BASE}/wp-json/wp/v2/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }),
    ]);

    if (!validateRes.ok || !profileRes.ok) return null;

    const profile = await profileRes.json();
    const user: WpUser = {
      id: profile.id,
      username: profile.slug || "",
      name: profile.name || "",
      email: profile.email || "",
      roles: profile.roles || [],
      token,
    };

    setCachedUser(token, user);
    return user;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Fetch WooCommerce customer by ID (server-side only, uses consumer key)
// ---------------------------------------------------------------------------
export async function fetchWcCustomer(customerId: number) {
  if (!WP_BASE) return null;

  const consumerKey = process.env.WC_CONSUMER_KEY || "";
  const consumerSecret = process.env.WC_CONSUMER_SECRET || "";

  if (!consumerKey || !consumerSecret) return null;

  try {
    const response = await fetch(`${WP_BASE}/wp-json/wc/v3/customers/${customerId}`, {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64"),
      },
      cache: "no-store",
    });

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function cancelWcOrderForCustomer(
  orderId: string | number,
  userId: string | number
) {
  if (!WP_BASE) return null;

  try {
    const response = await aioFetch(`/wp-json/aio/v1/customer/${userId}/order/${orderId}/cancel`,
      {
      method: "POST",
      headers: {
            "Content-Type": "application/json",
            "X-WP-Secret-Token": process.env.WP_API_SECRET_KEY as string,
          },
      }
    );
    if (!response.ok) {
      const body = await response.text();
      console.error(`WC order cancel failed: ${response.status}`, body);
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error("WC order cancel threw:", err);
    return null;
  }
}


async function aioFetch(path: string, init: RequestInit = {}) {
  if (!WP_BASE || !WP_API_SECRET) {
    throw new Error("Missing WP_BASE or WP_API_SECRET env vars.");
  }

  return fetch(`${WP_BASE}${path}`, {
    ...init,
    headers: {
      "X-WP-Secret-Token": WP_API_SECRET,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
}

export async function fetchAioCustomerProfile(userId: string | number) {
  const res = await aioFetch(`/wp-json/aio/v1/customer/${userId}/profile`);
  if (res.status === 404) return null;
  if (!res.ok) {
    console.error(`aio profile fetch failed: ${res.status}`, await res.text());
    return null;
  }
  return res.json();
}

export async function fetchAioCustomerOrders(userId: string | number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/aio/v1/customer/${userId}/orders/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Secret-Token": process.env.WP_API_SECRET_KEY as string,
        },
        cache: "no-store",
      }
    );
  if (res.status === 404) return null;
  if (!res.ok) {
    console.error(`aio order fetch failed: ${res.status}`, await res.text());
    return null;
  }
  const data = await res.json();
  return data.order ?? data;
}

export async function fetchAioCustomerOrder(userId: string | number, orderId: string | number) {
  const res = await aioFetch(`/wp-json/aio/v1/customer/${userId}/order/${orderId}`,
    {
     method: "GET",
     headers: {
          "Content-Type": "application/json",
          "X-WP-Secret-Token": process.env.WP_API_SECRET_KEY as string,
        },
    }
  );
  if (res.status === 404) return null;
  if (!res.ok) {
    console.error(`aio order fetch failed: ${res.status}`, await res.text());
    return null;
  }
  const data = await res.json();
  return data.order ?? data;
}

export async function updateAioCustomerProfile(userId: string | number, payload: unknown) {
  const res = await aioFetch(`/wp-json/aio/v1/customer/${userId}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-WP-Secret-Token": process.env.WP_API_SECRET_KEY as string,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    console.error(`aio profile update failed: ${res.status}`, await res.text());
    return null;
  }
  return res.json();
}