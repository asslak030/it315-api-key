import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { insertKey, listKeys, revokeKey } from "~/server/db/key";
import { createKeySchema, DeleteKeySchema } from "~/server/db/validation";

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body with explicit type inference
    const body = await req.json();
    const { name } = createKeySchema.parse(body);

    const created = await insertKey(name);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    // Safer error handling - check if error is instance of Error
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message ?? "Failed to create API key" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create API key" },
      { status: 500 }
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
  return NextResponse.json(items);
}

export async function DELETE(req: NextRequest) {
  try {
    const keyId = new URL(req.url).searchParams.get("keyId");

    if (!keyId) {
      return NextResponse.json(
        { error: "Missing keyId parameter" },
        { status: 400 }
      );
    }

    // Validate keyId with DeleteKeySchema
    const { keyId: parsedKeyId } = DeleteKeySchema.parse({ keyId });
    const ok = await revokeKey(parsedKeyId);

    if (!ok) {
      return NextResponse.json(
        { error: "API key not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message ?? "Failed to revoke API key" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to revoke API key" },
      { status: 400 }
    );
  }
}
