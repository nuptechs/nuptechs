import { asc, eq } from "drizzle-orm";
import { db } from "../db";
import { cardTemplates, cardTemplateMedia } from "../db/schema";

export type ActiveTemplateMedia = {
  id: number;
  fileName: string;
  mimeType: string;
};

export type ActiveTemplate = {
  id: number;
  name: string;
  caption: string;
  includeContact: boolean;
  media: ActiveTemplateMedia[];
};

// Returns the currently active card template (with its ordered media list)
// or null if none is configured. Callers should fall back to legacy hardcoded
// defaults when this is null so the public /comercial page never breaks.
export async function getActiveCardTemplate(): Promise<ActiveTemplate | null> {
  try {
    const [tpl] = await db
      .select()
      .from(cardTemplates)
      .where(eq(cardTemplates.isActive, true))
      .limit(1);
    if (!tpl) return null;

    const media = await db
      .select({
        id: cardTemplateMedia.id,
        fileName: cardTemplateMedia.fileName,
        mimeType: cardTemplateMedia.mimeType,
      })
      .from(cardTemplateMedia)
      .where(eq(cardTemplateMedia.templateId, tpl.id))
      .orderBy(asc(cardTemplateMedia.position), asc(cardTemplateMedia.id));

    return {
      id: tpl.id,
      name: tpl.name,
      caption: tpl.caption,
      includeContact: tpl.includeContact,
      media,
    };
  } catch {
    return null;
  }
}

// Deactivates all other templates and activates the given one atomically.
export async function activateTemplate(id: number): Promise<void> {
  await db.transaction(async (tx) => {
    await tx
      .update(cardTemplates)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(cardTemplates.isActive, true));
    await tx
      .update(cardTemplates)
      .set({ isActive: true, updatedAt: new Date() })
      .where(eq(cardTemplates.id, id));
  });
}
