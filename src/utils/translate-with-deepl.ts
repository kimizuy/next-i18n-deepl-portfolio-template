import * as deepl from "deepl-node";
import { Locale } from "./type";
import { i18nConfig } from "./i18n-config";

const translator = new deepl.Translator(process.env.DEEPL_API_KEY!);

export async function translateWithDeepL(
  text: string,
  targetLang: Locale | undefined
) {
  if (!targetLang) return text;

  const translated = await translator.translateText(
    text,
    i18nConfig.defaultLocale,
    targetLang === "en" ? "en-US" : targetLang
  );
  return translated.text;
}
