import { SourceLanguageCode, TargetLanguageCode } from "deepl-node";

export const i18nConfig = {
  locales: ["ja", "en-US", "fr"] satisfies TargetLanguageCode[],
  defaultLocale: "ja" satisfies SourceLanguageCode,
} as const;

export const languages: Record<(typeof i18nConfig)["locales"][number], string> =
  {
    ja: "Japanese",
    "en-US": "English",
    fr: "French",
  };

export type Locale = (typeof i18nConfig)["locales"][number];

export const isLocale = (value: string): value is Locale =>
  i18nConfig.locales.includes(value as Locale);

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe("isLocale returns true when the value is a locale", () => {
    it("returns true", () => {
      expect(isLocale("ja")).toBe(true);
    });
  });

  describe("isLocale returns false when the value is not a locale", () => {
    it("returns false", () => {
      expect(isLocale("foo")).toBe(false);
    });
  });
}
