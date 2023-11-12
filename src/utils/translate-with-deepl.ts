import * as deepl from "deepl-node";
import { Locale } from "./type";
import { i18nConfig } from "./i18n-config";

const translator = new deepl.Translator(process.env.DEEPL_API_KEY!);

export async function translateWithDeepL({
  texts,
  targetLang,
}: {
  texts: string;
  targetLang: Locale | undefined;
}): Promise<string> {
  if (!targetLang) {
    return texts;
  }
  const translated = await translator.translateText(
    texts,
    i18nConfig.defaultLocale,
    targetLang === "en" ? "en-US" : targetLang
  );
  return translated.text;
}
