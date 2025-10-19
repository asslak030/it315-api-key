import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a single global instance — do NOT recreate per request
export const ratelimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, "10 s"), // 2 requests every 10 seconds
  analytics: true,
  prefix: "@upstash/ratelimit",
});

// Helper for unique key namespacing
export function keyFromCtx(ctx: { apiKeyId: string }) {
  return `key:${ctx.apiKeyId}`;
}
