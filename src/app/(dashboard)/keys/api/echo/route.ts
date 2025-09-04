import type { NextRequest } from "next/server";
import { db } from "~/server/db";
import { verifyKey } from "~/server/db/key";
import { apiKeys } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// Define expected request body shape
const EchoSchema = z.object({
  postBody: z.string(),
});

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key") ?? "";
  const result = await verifyKey(apiKey);

  if (!result.valid) {
    return Response.json({ error: result.reason }, { status: 401 });
  }

  // ✅ Safe parsing with Zod
  let body: z.infer<typeof EchoSchema>;
  try {
    const json: unknown = await req.json(); // <-- no `any`
    body = EchoSchema.parse(json);
  } catch {
    // removed `err` since we don’t use it
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const getName = await db
    .select({ id: apiKeys.id, name: apiKeys.name })
    .from(apiKeys)
    .where(eq(apiKeys.name, body.postBody));

  return Response.json(
    {
      ok: true,
      message: "Hello POST",
      received: getName,
      keyId: result.keyId,
    },
    { status: 200 },
  );
}
