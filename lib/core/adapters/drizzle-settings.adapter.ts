import { db } from "../../../db";
import { siteConfig } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { SettingsPort, type SiteSettings } from "../ports/settings.port";

const DEFAULT_SETTINGS: SiteSettings = {
  companyName: "NuPtechs",
  companyEmail: "nuptechs@nuptechs.com",
  companyPhone: "",
  tagline: "Tecnologia que transforma negócios",
  seoDescription: "NuPtechs — Consultoria e desenvolvimento de software",
  socialLinks: {},
  integrations: {
    resendConfigured: false,
    evolutionConfigured: false,
    pineconeConfigured: false,
    gaConfigured: false,
  },
};

export class DrizzleSettingsAdapter extends SettingsPort {

  async get<T = unknown>(key: string): Promise<T | null> {
    const [row] = await db.select().from(siteConfig).where(eq(siteConfig.key, key)).limit(1);
    return row ? (row.value as T) : null;
  }

  async set<T = unknown>(key: string, value: T): Promise<void> {
    const [existing] = await db.select().from(siteConfig).where(eq(siteConfig.key, key)).limit(1);
    if (existing) {
      await db.update(siteConfig).set({ value, updatedAt: new Date() }).where(eq(siteConfig.key, key));
    } else {
      await db.insert(siteConfig).values({ key, value });
    }
  }

  async getAll(): Promise<Record<string, unknown>> {
    const rows = await db.select().from(siteConfig);
    return Object.fromEntries(rows.map(r => [r.key, r.value]));
  }

  async getSiteSettings(): Promise<SiteSettings> {
    const stored = await this.get<Partial<SiteSettings>>("site_settings");
    return {
      ...DEFAULT_SETTINGS,
      ...stored,
      integrations: {
        resendConfigured: !!process.env.RESEND_API_KEY,
        evolutionConfigured: !!(process.env.EVOLUTION_API_URL && process.env.EVOLUTION_API_KEY),
        pineconeConfigured: !!process.env.PINECONE_API_KEY,
        gaConfigured: !!process.env.NEXT_PUBLIC_GA_ID,
      },
    };
  }

  async updateSiteSettings(settings: Partial<SiteSettings>): Promise<void> {
    const current = await this.get<Partial<SiteSettings>>("site_settings") ?? {};
    const merged = { ...current, ...settings };
    // Don't persist integration detection, it's env-driven
    delete (merged as any).integrations;
    await this.set("site_settings", merged);
  }
}
