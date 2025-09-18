// app/api/echo/route.ts
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { apiKeys } from "~/server/db/schema";
import { verifyKey } from "~/server/db/key";

// Define proper types
interface EchoRequest {
  postBody?: string;
}

interface GalleryResponse {
  uploads?: Upload[];
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

interface ApiKeyResult {
  id: string;
  name: string;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key") ?? "";
    const result = await verifyKey(apiKey);

    if (!result.valid) {
      return NextResponse.json({ error: result.reason }, { status: 401 });
    }

    const body = (await req.json()) as EchoRequest;
    const searchName = body.postBody?.trim();

    if (!searchName) {
      return NextResponse.json({ error: "Missing postBody" }, { status: 400 });
    }

    // Check db keys
    const getName: ApiKeyResult[] = await db
      .select({ id: apiKeys.id, name: apiKeys.name })
      .from(apiKeys)
      .where(eq(apiKeys.name, searchName));

    try {
      // Fetch gallery from external API
      const galleryRes = await fetch("https://ipt315-project.vercel.app/api/gallery");
      
      if (!galleryRes.ok) {
        throw new Error(`External API returned ${galleryRes.status}`);
      }
      
      const galleryData = (await galleryRes.json()) as GalleryResponse;

      // Filter uploads by uploaderName
      const userUploads = (galleryData.uploads ?? []).filter(
        (u: Upload) => u.uploaderName.toLowerCase() === searchName.toLowerCase()
      );

      // Build user profile (from first upload)
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}