import { z } from "zod";

export const CreatedKeySchema = z.object({ name: z.string().min(5).max(100) });
export const DeleteKeySchema = z.object({ keyid: z.string().uuid() });