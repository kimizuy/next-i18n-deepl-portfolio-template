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
