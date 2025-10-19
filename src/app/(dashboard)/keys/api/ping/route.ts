import type { NextRequest } from "next/server";
import { verifyKey } from "~/server/db/key";
import { ratelimiter } from "~/server/db/ratelimit";

interface GalleryResponse {
  uploads?: Upload[];
}

interface Upload {
  user: {
    id: string;
    name: string;
    profileImage: string;
  };
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  uploads: Upload[];
  lastActive: number | null;
  status: "offline" | "active";
}

export async function GET(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key") ?? "";
    const result = await verifyKey(apiKey);

    if (!result.valid) {
      return Response.json({ error: result.reason }, { status: 401 });
    }

    // ✅ Rate limit — only 2 allowed
    const rate = await ratelimiter.limit(apiKey);

    const headers = {
      "X-RateLimit-Limit": "2",
      "X-RateLimit-Remaining": String(Math.max(0, rate.remaining)),
    };

    // 🚫 If exceeded → friendly message, no fetch error
    if (!rate.success) {
      return Response.json(
        { error: "reached limit, try again!" },
        { status: 200, headers }
      );
    }

    // ✅ Fetch gallery
    const galleryRes = await fetch("https://ipt315-project.vercel.app/api/gallery");
    const galleryData = (await galleryRes.json()) as GalleryResponse;

    // ✅ Group uploads by user
    const usersMap = new Map<string, User>();
    for (const upload of galleryData.uploads ?? []) {
      if (!usersMap.has(upload.user.id)) {
        usersMap.set(upload.user.id, {
          id: upload.user.id,
          name: upload.user.name,
          avatar: upload.user.profileImage,
          uploads: [],
          lastActive: null,
          status: "offline",
        });
      }

      const user = usersMap.get(upload.user.id)!;
      user.uploads.push(upload);
      const createdAt = new Date(upload.createdAt).getTime();
      if (!user.lastActive || createdAt > user.lastActive) {
        user.lastActive = createdAt;
      }
    }

    // ✅ Set user status (active if uploaded within 10 min)
    const now = Date.now();
    for (const user of usersMap.values()) {
      if (user.lastActive && now - user.lastActive < 10 * 60 * 1000) {
        user.status = "active";
      }
    }

    const users = Array.from(usersMap.values());

    return Response.json(
      { ok: true, message: "Hello GET", keyId: result.keyId, users },
      { status: 200, headers }
    );
  } catch (err) {
    console.error("Internal server error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
