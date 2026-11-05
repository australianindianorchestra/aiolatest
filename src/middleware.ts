import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * Global Next.js middleware.
 *
 * Responsibilities:
 *  1. Add HTTP security headers to every response (CSP, HSTS, X-Frame, etc.)
 *  2. Rate-limit API routes to protect against brute-force and DDoS
 */

// ── Rate-limit profiles (requests per window per IP) ─────────────────────────
const RATE_LIMITS: Record<string, { limit: number; windowMs: number }> = {
  // Auth endpoints — tight limits to block credential stuffing
  "/api/auth/login":    { limit: 10,  windowMs: 60_000 },       // 10/min
  "/api/auth/register": { limit: 5,   windowMs: 60_000 },       // 5/min
  // Payment endpoints — moderate
  "/api/checkout":      { limit: 20,  windowMs: 60_000 },       // 20/min
  "/api/razorpay":      { limit: 20,  windowMs: 60_000 },       // 20/min
  "/api/stripe":        { limit: 20,  windowMs: 60_000 },       // 20/min
  // Contact / waitlist / newsletter — prevent spam
  "/api/contact":       { limit: 5,   windowMs: 60_000 },       // 5/min
  "/api/newsletter":    { limit: 5,   windowMs: 60_000 },       // 5/min
  "/api/waitlist":      { limit: 5,   windowMs: 60_000 },       // 5/min
  // General API — generous default
  "/api/":              { limit: 120, windowMs: 60_000 },       // 120/min
};

function getRateLimitProfile(pathname: string) {
  // Match most-specific prefix first
  const keys = Object.keys(RATE_LIMITS).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    if (pathname.startsWith(key)) return RATE_LIMITS[key];
  }
  return null;
}

// ── Security headers ─────────────────────────────────────────────────────────
function addSecurityHeaders(response: NextResponse): NextResponse {
  const h = response.headers;

  // Prevent clickjacking
  h.set("X-Frame-Options", "DENY");

  // Prevent MIME-type sniffing
  h.set("X-Content-Type-Options", "nosniff");

  // Stop referrer leaking to third parties
  h.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Disable browser features not needed by this app
  h.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(self)"
  );

  // Force HTTPS in production (1 year, include subdomains)
  if (process.env.NODE_ENV === "production") {
    h.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }

  // Content Security Policy
  // Tightened: only allow known external origins for scripts/images/media
  const isDev = process.env.NODE_ENV === "development";
  const csp = [
    "default-src 'self'",
    // Scripts: self + Google Analytics + Razorpay + Stripe
    `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://checkout.razorpay.com https://cdn.razorpay.com https://js.stripe.com${isDev ? " 'unsafe-eval'" : ""}`,
    // Styles: self + Google Fonts + inline (Tailwind generates inline styles)
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    // Fonts: self + Google Fonts CDN
    "font-src 'self' https://fonts.gstatic.com",
    // Images: self + WordPress + known CDNs
    "img-src 'self' data: blob: http://localhost https://*.hostingersite.com https://*.wordpress.com https://*.gravatar.com https://i0.wp.com https://i1.wp.com https://i2.wp.com",
    // Media (video/audio): self
    "media-src 'self' https://www.soundhelix.com",
    // Frames: YouTube embeds only
    "frame-src 'self' https://www.youtube.com https://youtube.com  https://js.stripe.com https://hooks.stripe.com",
    // API calls: self + payment gateways + YouTube API + country/state/city data
    "connect-src 'self' https://www.googleapis.com https://ipapi.co https://www.googletagmanager.com https://www.google-analytics.com https://venkatvidyut.github.io https://lightsalmon-monkey-877750.hostingersite.com",

    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");

  h.set("Content-Security-Policy", csp);

  return response;
}

// ── Middleware handler ────────────────────────────────────────────────────────
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply rate limiting to API routes only
  if (pathname.startsWith("/api/")) {
    const profile = getRateLimitProfile(pathname);

    if (profile) {
      const ip = getClientIp(request);
      const key = `${ip}:${pathname}`;
      const result = checkRateLimit(key, profile);

      if (!result.allowed) {
        const response = NextResponse.json(
          { error: "Too many requests. Please slow down." },
          { status: 429 }
        );
        response.headers.set("Retry-After", String(Math.ceil((result.resetAt - Date.now()) / 1000)));
        response.headers.set("X-RateLimit-Limit", String(profile.limit));
        response.headers.set("X-RateLimit-Remaining", "0");
        response.headers.set("X-RateLimit-Reset", String(result.resetAt));
        return addSecurityHeaders(response);
      }

      const response = NextResponse.next();
      response.headers.set("X-RateLimit-Limit", String(profile.limit));
      response.headers.set("X-RateLimit-Remaining", String(result.remaining));
      response.headers.set("X-RateLimit-Reset", String(result.resetAt));
      return addSecurityHeaders(response);
    }
  }

  // Add security headers to all responses
  return addSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico, public files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:webp|png|jpg|jpeg|svg|ico|mp3|mp4|mpeg|pdf)).*)",
  ],
};
