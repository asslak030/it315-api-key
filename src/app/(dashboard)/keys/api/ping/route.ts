import type { NextRequest } from "next/server";
import { verifyKey } from "~/server/db/key";

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key") ?? "";
  const result = await verifyKey(apiKey);

  if (!result.valid) {
    return Response.json({ error: result.reason }, { status: 401 });
  }

  // ✅ fetch gallery from your public API
  const galleryRes = await fetch("https://ipt315-project.vercel.app/api/gallery");
  const galleryData = await galleryRes.json();

  // ✅ group uploads by user
  const usersMap = new Map<string, any>();
  for (const upload of galleryData.uploads || []) {
    if (!usersMap.has(upload.user.id)) {
      usersMap.set(upload.user.id, {
        id: upload.user.id,
        name: upload.user.name,
        avatar: upload.user.profileImage,
        uploads: [],
        lastActive: null,
        status: "offline", // default
      });
    }
    const user = usersMap.get(upload.user.id);
    user.uploads.push(upload);

    // track most recent upload time
    const createdAt = new Date(upload.createdAt).getTime();
    if (!user.lastActive || createdAt > user.lastActive) {
      user.lastActive = createdAt;
    }
  }

  // ✅ set status (active if last upload < 10 minutes ago)
  const now = Date.now();
  for (const user of usersMap.values()) {
    if (user.lastActive && now - user.lastActive < 10 * 60 * 1000) {
      user.status = "active";
    }
  }

  const users = Array.from(usersMap.values());

  return Response.json(
    {
      ok: true,
      message: "Hello GET",
      keyId: result.keyId,
      users, // ✅ return array of users with status
    },
    { status: 200 }
  );
}
