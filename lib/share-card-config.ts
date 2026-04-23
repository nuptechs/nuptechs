import { eq } from "drizzle-orm";
import { db } from "../db";
import { appConfig } from "../db/schema";

const CONFIG_KEY = "share_card_instance";
const ENV_DEFAULT = process.env.EVOLUTION_INSTANCE || "nuptechs-comercial";

// Resolve which Evolution instance is currently wired to /api/share-card.
// Priority: app_config[share_card_instance] -> EVOLUTION_INSTANCE env -> fallback.
export async function getActiveShareInstance(): Promise<string> {
  try {
    const [row] = await db
      .select({ value: appConfig.value })
      .from(appConfig)
      .where(eq(appConfig.key, CONFIG_KEY))
      .limit(1);
    if (row?.value) return row.value;
  } catch {
    // Table may not exist yet on fresh deploys — fall back to env.
  }
  return ENV_DEFAULT;
}

export async function setActiveShareInstance(
  instanceName: string,
  updatedBy: string | null
): Promise<void> {
  await db
    .insert(appConfig)
    .values({ key: CONFIG_KEY, value: instanceName, updatedBy })
    .onConflictDoUpdate({
      target: appConfig.key,
      set: { value: instanceName, updatedAt: new Date(), updatedBy },
    });
}

export const SHARE_CARD_CONFIG_KEY = CONFIG_KEY;
