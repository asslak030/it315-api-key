import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { apiKeys } from "~/server/db/schema";
import { verifyKey } from "~/server/db/key";
import { ratelimiter, keyFromCtx } from "~/server/db/ratelimit";

// ---- Interfaces ----
interface EchoRequest {
  postBody?: string;
}

interface Upload {
  uploaderName: string;
  user: { id: string; name: string; profileImage: string };
  imageUrl: string;
  createdAt: string;
}

interface GalleryResponse {
  uploads?: Upload[];
}

interface ApiKeyResult {
  id: string;
  name: string;
}

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  uploads: Upload[];
}

// ---- Main POST Handler ----
export async function POST(req: NextRequest) {
  try {
    // ✅ Support both headers: x-api-key or Authorization: Bearer
    const apiKey =
      req.headers.get("x-api-key") ??
      req.headers.get("authorization")?.replace("Bearer ", "") ??
      "";

    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 401 });
    }

    // ✅ Verify API key
    const result = await verifyKey(apiKey);
    if (!result.valid) {
      return NextResponse.json(
        { error: result.reason ?? "Invalid API key" },
        { status: 401 }
      );
    }

    // ✅ Apply rate limiting (only 2 requests allowed)
    const key = keyFromCtx({ apiKeyId: result.keyId });
    const rate = await ratelimiter.limit(key);

    const resHeaders = new Headers({
      "X-RateLimit-Limit": "2",
      "X-RateLimit-Remaining": rate.remaining.toString(),
      "X-RateLimit-Reset": rate.reset.toString(),
    });

    // 🚫 If the limit (2 requests) is reached
    if (!rate.success) {
      // Friendly message, status 200 (avoid fetch error)
      return NextResponse.json(
        { error: "reached limit, try again." },
        { status: 200, headers: resHeaders }
      );
    }

    // ✅ Parse JSON body
    const body = (await req.json()) as EchoRequest;
    const searchName = body.postBody?.trim();

    // ✅ Simple echo mode (Quantum Ping)
    if (!searchName) {
      return NextResponse.json(
        {
          ok: true,
          message: "Quantum Ping successful 🚀",
          received: body,
          keyId: result.keyId,
        },
        { status: 200, headers: resHeaders }
      );
    }

    // ✅ Otherwise perform DB and gallery lookup
    const getName: ApiKeyResult[] = await db
      .select({ id: apiKeys.id, name: apiKeys.name })
      .from(apiKeys)
      .where(eq(apiKeys.name, searchName));

    const galleryRes = await fetch("https://ipt315-project.vercel.app/api/gallery");
    if (!galleryRes.ok)
      throw new Error(`External API returned ${galleryRes.status}`);

    const galleryData = (await galleryRes.json()) as GalleryResponse;
    const userUploads = (galleryData.uploads ?? []).filter(
      (u) => u.uploaderName.toLowerCase() === searchName.toLowerCase()
    );

    const userProfile: UserProfile | null =
      userUploads.length > 0
        ? {
            id: userUploads[0]!.user.id,
            name: userUploads[0]!.user.name,
            avatar: userUploads[0]!.user.profileImage,
            uploads: userUploads,
          }
        : null;

    return NextResponse.json(
      {
        ok: true,
        message: `User lookup for "${searchName}"`,
        received: getName,
        keyId: result.keyId,
        user: userProfile,
      },
      { status: 200, headers: resHeaders }
    );
  } catch (err) {
    console.error("Internal server error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
