/**
 * In-memory store to track users whose sessions need to be invalidated
 * due to permission changes notified by NuPIdentify via webhook.
 *
 * Works for single-instance deploys (Railway). If multi-instance is ever
 * needed, replace the Map with a Redis/DB-backed store.
 */

interface InvalidationEntry {
  flaggedAtMs: number; // epoch ms when the flag was set
}

const store = new Map<string, InvalidationEntry>();

// Auto-clean entries older than 24h to prevent unbounded growth
const ENTRY_TTL_MS = 24 * 60 * 60 * 1000;

function cleanup() {
  const cutoff = Date.now() - ENTRY_TTL_MS;
  for (const [userId, entry] of store.entries()) {
    if (entry.flaggedAtMs < cutoff) store.delete(userId);
  }
}

/**
 * Mark a user's current session as stale.
 * Called by the webhook handler when NuPIdentify reports a permission change.
 */
export function flagUserSession(userId: string): void {
  store.set(userId, { flaggedAtMs: Date.now() });
  if (store.size % 100 === 0) cleanup(); // lazy cleanup
}

/**
 * Check if a user's session cookie is stale.
 * @param userId  The user's `sub` from the JWT
 * @param cookieIat  The `iat` claim from the session JWT (seconds since epoch)
 * @returns true if the session predates the flag → must re-login
 */
export function isSessionInvalidated(userId: string, cookieIat: number): boolean {
  const entry = store.get(userId);
  if (!entry) return false;

  const flaggedAtSec = Math.floor(entry.flaggedAtMs / 1000);

  // Cookie was issued before the permission change → stale
  if (cookieIat < flaggedAtSec) {
    store.delete(userId); // clear flag — will be refreshed on next login
    return true;
  }

  // Cookie is already fresh (user re-logged after the change) → clear flag
  store.delete(userId);
  return false;
}
