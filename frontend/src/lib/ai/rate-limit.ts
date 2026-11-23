/**
 * Fixed-window rate limiter kept in memory (one Node.js process). It protects the
 * paid LLM API from abuse: each user gets `limit` generations per `windowMs`.
 */
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, { count: number; resetAt: number }>();
  return function consume(key: string, now = Date.now()) {
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, retryAfterMs: 0 };
    }
    if (entry.count >= limit) return { allowed: false, retryAfterMs: entry.resetAt - now };
    entry.count += 1;
    return { allowed: true, retryAfterMs: 0 };
  };
}
