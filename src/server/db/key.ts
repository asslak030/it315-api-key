// src/server/key.ts
import { createHash, randomBytes, randomUUID } from "crypto";
import { db } from "../db";                // adjust path if your db file is named differently
import { apiKeys } from "../db/schema";    // your drizzle schema
import { desc, eq } from "drizzle-orm";

const KEY_PREFIX = process.env.KEY_PREFIX ?? "sk_live_";

// Generate a plain key (the one you give to users)
export function generatePlainKey(bytes = 24) {
  const raw = randomBytes(bytes).toString("base64url");
  const key = `${KEY_PREFIX}${raw}`;
  const last4 = key.slice(-4);
  return { key, last4 };
}

// Hash helper for storing keys securely
export function sha256(data: string) {
  return createHash("sha256").update(data).digest("hex");
}

// Insert a new API key into the database
export async function insertKey(name: string) {
  const { key, last4 } = generatePlainKey();
  const hashed = sha256(key);
  const id = randomUUID();

  await db.insert(apiKeys).values({ id, name, hashedKey: hashed, last4 });
  return { id, name, key, last4 } as const;
}

// List all non-revoked keys
export async function listKeys() {
  return db
    .select()
    .from(apiKeys)
    .where(eq(apiKeys.revoked, false))
    .orderBy(desc(apiKeys.createdAt));
}

// Revoke an API key by ID
export async function revokeKey(id: string) {
  const res = await db
    .update(apiKeys)
    .set({ revoked: true })
    .where(eq(apiKeys.id, id));
  return (res.rowCount ?? 0) > 0;
}

// Verify if a provided API key is valid
export async function verifyKey(apiKey: string) {
  if (!apiKey) {
    return { valid: false as const, reason: "missing" as const, keyId: null };
  }

  const hashed = sha256(apiKey);

  const rows = await db
    .select({ id: apiKeys.id, revoked: apiKeys.revoked })
    .from(apiKeys)
    .where(eq(apiKeys.hashedKey, hashed));

  const row = rows[0];

  if (!row) {
    return { valid: false as const, reason: "not_found" as const, keyId: null };
  }

  if (row.revoked) {
    return { valid: false as const, reason: "revoked" as const, keyId: row.id };
  }

  return { valid: true as const, reason: null, keyId: row.id };
}
