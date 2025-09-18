import { type NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { apiKeys } from "~/server/db/schema";
import { verifyKey } from "~/server/db/key";
import { eq } from "drizzle-orm";

// ---------- Types ----------
interface EchoRequest {
  postBody?: string;
  getAllUsers?: boolean;
}

interface Upload {
  uploaderName: string;
  user: {
    id: string;
    name: string;
    profileImage: string;
  };
  imageUrl: string;
  createdAt: string;
}

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  uploads: Upload[];
}

interface GalleryResponse {
  uploads?: Upload[];
}

interface ApiKeyResult {
  id: string;
  name: string;
}

interface AllUsersResponse {
  ok: boolean;
  message: string;
  keyId: string;
  users: UserProfile[];
  totalUsers: number;
  totalUploads: number;
}

// ---------- Helpers ----------
function normalizeImageUrl(url?: string | null): string {
  if (!url) return "/placeholder-image.png";
  const t = url.trim();
  if (/^data:/i.test(t)) return t;
  if (/^https?:\/\//i.test(t)) return t;
  const path = t.startsWith("/") ? t : "/" + t;
  return `https://ipt315-project.vercel.app${path}`;
}

// ---------- Handler ----------
export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key") ?? "";
    const result = await verifyKey(apiKey);

    if (!result.valid) {
      return NextResponse.json({ error: result.reason }, { status: 401 });
    }

    const body = (await req.json()) as EchoRequest;
    const searchName = body.postBody?.trim();
    const getAllUsers = body.getAllUsers || false;

    // ✅ Fetch all users and uploads
    if (getAllUsers) {
      try {
        const galleryRes = await fetch("https://ipt315-project.vercel.app/api/gallery");
        if (!galleryRes.ok) {
          throw new Error(`External API returned ${galleryRes.status}`);
        }

        const galleryData = (await galleryRes.json()) as GalleryResponse;
        const allUploads = galleryData.uploads ?? [];

        const userProfilesMap = new Map<string, UserProfile>();

        allUploads.forEach((upload: Upload) => {
          const userId = upload.user.id;

          if (!userProfilesMap.has(userId)) {
            userProfilesMap.set(userId, {
              id: userId,
              name: upload.user.name,
              avatar: normalizeImageUrl(upload.user.profileImage),
              uploads: [],
            });
          }

          userProfilesMap.get(userId)!.uploads.push({
            ...upload,
            imageUrl: normalizeImageUrl(upload.imageUrl), // ✅ normalize uploaded image
          });
        });

        const userProfiles = Array.from(userProfilesMap.values());

        return NextResponse.json(
          {
            ok: true,
            message: `Fetched all users and their images`,
            keyId: result.keyId,
            users: userProfiles,
            totalUsers: userProfiles.length,
            totalUploads: allUploads.length,
          } as AllUsersResponse,
          { status: 200 }
        );
      } catch (externalError) {
        console.error("External API error:", externalError);
        return NextResponse.json(
          { error: "Failed to fetch gallery data from external service" },
          { status: 502 }
        );
      }
    }

    // ✅ Single user lookup
    if (!searchName) {
      return NextResponse.json({ error: "Missing postBody" }, { status: 400 });
    }

    let getName: ApiKeyResult[] = [];
    try {
      getName = await db
        .select({ id: apiKeys.id, name: apiKeys.name })
        .from(apiKeys)
        .where(eq(apiKeys.name, searchName));
    } catch (dbError) {
      console.error("Database error:", dbError);
    }

    try {
      const galleryRes = await fetch("https://ipt315-project.vercel.app/api/gallery");
      if (!galleryRes.ok) {
        throw new Error(`External API returned ${galleryRes.status}`);
      }

      const galleryData = (await galleryRes.json()) as GalleryResponse;

      const userUploads = (galleryData.uploads ?? [])
        .filter((u: Upload) => u.uploaderName.toLowerCase() === searchName.toLowerCase())
        .map((u) => ({
          ...u,
          imageUrl: normalizeImageUrl(u.imageUrl), // ✅ normalize uploaded image
        }));

      const userProfile: UserProfile | null =
        userUploads.length > 0
          ? {
              id: userUploads[0]!.user.id,
              name: userUploads[0]!.user.name,
              avatar: normalizeImageUrl(userUploads[0]!.user.profileImage), // ✅ normalize avatar
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
        { status: 200 }
      );
    } catch (externalError) {
      console.error("External API error:", externalError);
      return NextResponse.json(
        { error: "Failed to fetch gallery data from external service" },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
