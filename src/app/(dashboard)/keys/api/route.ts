import type { NextRequest } from "next/server";
// Update the path below to the correct relative path if 'key.ts' is in 'src/server'
// Update the path below to the correct relative path if 'key.ts' is in 'src/server'
import { insertkey } from "~/server/db/key";
import { CreatedKeySchema, DeleteKeySchema } from "~/server/db/validation";
import { listKeys, revokeKey } from "~/server/db/key";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = CreatedKeySchema.parse(body);
    const created = await insertkey(name);
    return  Response.json(created, { status: 201 }); 
  } catch (e: any) {
    return Response.json(
        { error: e.message ?? "Invalid Request" },
        { status: 400 }
    );
  } 
}

export async function GET() {
  const rows = await listKeys();
  const items = rows.map((row) => ({
    id: row.id,
    name: row.name,
    masked: `sk_live_...${row.last4}`,
    createdAt: row.createdAt,
    revoked: row.revoked,
  }));
  return Response.json({ items });
}

export async function DELETE(req: NextRequest) {
    try {
        const keyId = new URL(req.url).searchParams.get("keyid");
        const { keyid: parseId } = DeleteKeySchema.parse({ keyId });
        const ok = await revokeKey(parseId);
        if (!ok) return Response.json({ error: "Not found" }, { status: 404 });
        return Response.json({ success: true });
      } catch (e: any) {
        return Response.json(
            { error: e.message ?? "Invalid Request" },
            { status: 400 },
        );
    }
}
