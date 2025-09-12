import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { db } from "~/server/db";
import { apiKeys } from "~/server/db/schema";
import { verifyKey } from "~/server/db/key";

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key") ?? "";
  const result = await verifyKey(apiKey);

  if (!result.valid) {
    return Response.json({ error: result.reason }, { status: 401 });
  }

  const body = await req.json();
  const searchName = body.postBody?.trim();

  if (!searchName) {
    return Response.json({ error: "Missing postBody" }, { status: 400 });
  }

  // ✅ still check db keys
  const getName = await db
    .select({ id: apiKeys.id, name: apiKeys.name })
    .from(apiKeys)
    .where(eq(apiKeys.name, searchName));

  // ✅ fetch gallery from dummy site
  const galleryRes = await fetch("https://ipt315-project.vercel.app/api/gallery");
  const galleryData = await galleryRes.json();

  // ✅ filter uploads by uploaderName
  const userUploads = (galleryData.uploads || []).filter(
    (u: any) => u.uploaderName.toLowerCase() === searchName.toLowerCase()
  );

  // ✅ build user profile (from first upload)
  const userProfile =
    userUploads.length > 0
      ? {
          id: userUploads[0].user.id,
          name: userUploads[0].user.name,
          avatar: userUploads[0].user.profileImage,
          uploads: userUploads,
        }
      : null;

  return Response.json(
    {
      ok: true,
      message: `User lookup for "${searchName}"`,
      received: getName,
      keyId: result.keyId,
      user: userProfile,
    },
    { status: 200 }
  );
}
