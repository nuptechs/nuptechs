/**
 * SettingsPort — Abstraction for site configuration key-value store.
 */

export type SiteSettings = {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  tagline: string;
  seoDescription: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    youtube?: string;
  };
  integrations: {
    resendConfigured: boolean;
    evolutionConfigured: boolean;
    pineconeConfigured: boolean;
    gaConfigured: boolean;
  };
};

export abstract class SettingsPort {
  abstract get<T = unknown>(key: string): Promise<T | null>;
  abstract set<T = unknown>(key: string, value: T): Promise<void>;
  abstract getAll(): Promise<Record<string, unknown>>;
  abstract getSiteSettings(): Promise<SiteSettings>;
  abstract updateSiteSettings(settings: Partial<SiteSettings>): Promise<void>;
}
