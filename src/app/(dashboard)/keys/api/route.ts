import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { insertKey, listKeys, revokeKey } from "~/server/db/key";
import { createKeySchema, DeleteKeySchema } from "~/server/db/validation";
import { ratelimiter, keyFromCtx } from "~/server/db/ratelimit";

/**
 * Custom rate limiter for API key routes
 * Limits: max 2 requests per IP within the defined time window.
 */
async function checkRateLimit(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "unknown";

  // Use IP address as the key
  const key = keyFromCtx({ apiKeyId: ip });

  // Force only 2 requests allowed per window
  const rate = await ratelimiter.limit(key);

  // Override limit to display "2" in headers
  const limit = 2;
  const remaining = Math.max(0, rate.remaining);
  const resetTime = Number(rate.reset) || Date.now();

  if (!rate.success || remaining <= 0) {
    const retryAfter = Math.max(1, Math.ceil((resetTime - Date.now()) / 1000));
    return {
      blocked: true,
      response: NextResponse.json(
        {
          error: "Rate limit exceeded — please try again later.",
        },
        {
          status: 200, // 👈 return 200 to avoid client "Fetch failed" on 429
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(retryAfter),
            "X-RateLimit-Limit": String(limit),
            "X-RateLimit-Remaining": "0",
          },
        }
      ),
    };
  }

  return {
    blocked: false,
    headers: {
      "X-RateLimit-Limit": String(limit),
      "X-RateLimit-Remaining": String(remaining),
      "X-RateLimit-Reset": String(resetTime),
    } as Record<string, string>,
  };
}

// ----------------------------
// CREATE API KEY (POST)
// ----------------------------
export async function POST(req: NextRequest) {
  const rate = await checkRateLimit(req);
  if (rate.blocked) return rate.response;

  try {
    const body: unknown = await req.json();
    const { name } = createKeySchema.parse(body);
    const created = await insertKey(name);

    return NextResponse.json(created, {
      status: 201,
      headers: rate.headers,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message ?? "Failed to create API key"
        : "Failed to create API key";

    return NextResponse.json(
      { error: message },
      { status: 500, headers: rate.headers }
    );
  }
}

// ----------------------------
// LIST API KEYS (GET)
// ----------------------------
export async function GET(req: NextRequest) {
  const rate = await checkRateLimit(req);
  if (rate.blocked) return rate.response;

  try {
    const rows = await listKeys();
    const items = rows.map((row) => ({
      id: row.id,
      name: row.name,
      masked: `sk_live_...${row.last4}`,
      createdAt: row.createdAt,
      revoked: row.revoked,
    }));

    return NextResponse.json(items, {
      status: 200,
      headers: rate.headers,
    });
  } catch (error) {
    console.error("Failed to list keys:", error);
    return NextResponse.json(
      { error: "Failed to list API keys" },
      { status: 500, headers: rate.headers }
    );
  }
}

// ----------------------------
// DELETE API KEY (DELETE)
// ----------------------------
export async function DELETE(req: NextRequest) {
  const rate = await checkRateLimit(req);
  if (rate.blocked) return rate.response;

  try {
    const keyId = new URL(req.url).searchParams.get("keyId");
    const { keyId: parsedKeyId } = DeleteKeySchema.parse({ keyId });

    const ok = await revokeKey(parsedKeyId);
    if (!ok) {
      return NextResponse.json(
        { error: "API key not found" },
        { status: 404, headers: rate.headers }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200, headers: rate.headers }
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message ?? "Failed to revoke API key"
        : "Failed to revoke API key";

    return NextResponse.json(
      { error: message },
      { status: 400, headers: rate.headers }
    );
  }
}
