import { sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";

export const apiKeys = pgTable("ipt_less4_api_keys", (d) => ({
  id: d.text("id").primaryKey(),
  name: d.varchar({ length: 256 }).notNull(),
  hashedKey: d.text("hashed_key").notNull(),
  last4: d.varchar("last4", { length: 4 }).notNull(),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  revoked: d.boolean("revoked").notNull().default(false),
  
}));
