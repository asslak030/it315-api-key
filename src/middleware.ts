import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

const raw = process.env.ALLOWED_ORIGINS?.trim();
const allowedOrigins = raw ? new Set(raw.split(",").map((s) => s.trim())) : null;

const DEFAULT_METHODS = ["GET", "POST", "PUT", "OPTIONS"].join(",");
const DEFAULT_HEADERS = [
  "Content-Type",
  "x-Requested-with",
  "x-api-key",
  "Authorization",
].join(",");

function decideOrigin(origin?: string | null) {
  if (!origin || !allowedOrigins) return null;
  return allowedOrigins.has(origin) ? origin : null;
}

function withCors(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get("origin");
  const allowOrigin = decideOrigin(origin);

  // Deny disallowed origins
  if (allowedOrigins && origin && !allowOrigin) {
    return new NextResponse(JSON.stringify({ error: "Origin not allowed" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (allowOrigin) {
    res.headers.set("Access-Control-Allow-Origin", allowOrigin);
    res.headers.set("Vary", "Origin");
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set("Access-Control-Allow-Methods", DEFAULT_METHODS);
    res.headers.set("Access-Control-Allow-Headers", DEFAULT_HEADERS);
    res.headers.set("Access-Control-Max-Age", "600");
    res.headers.set(
      "Access-Control-Expose-Headers",
      ["Retry-After", "X-RateLimit-Limit", "X-RateLimit-Remaining"].join(",")
    );
  }

  return res;
}

// ✅ Single export (Clerk + CORS)
export default clerkMiddleware((auth, req) => {
  // Skip Clerk for preflight
  if (req.method === "OPTIONS") {
    const res = new NextResponse(null, { status: 204 });
    return withCors(req, res);
  }

  const res = NextResponse.next();
  return withCors(req, res);
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
