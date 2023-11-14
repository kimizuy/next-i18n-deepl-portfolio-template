import * as deepl from "deepl-node";
import { Locale } from "./types";
import { i18nConfig } from "./i18n-config";

const translator = new deepl.Translator(process.env.DEEPL_API_KEY!);

export async function translateWithDeepL(text: any, targetLang: Locale) {
  if (targetLang === i18nConfig.defaultLocale) return text;
  if (typeof text !== "string") return text;

  const translated = await translator.translateText(
    text,
    i18nConfig.defaultLocale,
    targetLang === "en" ? "en-US" : targetLang,
    { context: "Web Developer Portfolio Sites" } // "context" is alpha feature. ref: https://github.com/DeepLcom/deepl-node#text-translation-options
  );
  return translated.text;
}
