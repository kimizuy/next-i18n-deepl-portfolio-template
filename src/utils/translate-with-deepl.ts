import "server-only";

import * as deepl from "deepl-node";
import { Locale } from "./i18n-config";
import { i18nConfig } from "./i18n-config";
import { cache } from "react";

const translator = new deepl.Translator(process.env.DEEPL_API_KEY!);

export const translateText = cache(
  async (text: string, targetLang: Locale, context?: string) => {
    if (targetLang === i18nConfig.defaultLocale) return text;
    const translated = await translator.translateText(
      text,
      i18nConfig.defaultLocale,
      targetLang,
      // "context" is alpha feature. it may be deprecated in the future
      // ref: https://github.com/DeepLcom/deepl-node#text-translation-options
      { context: context ?? "Web Developer Portfolio Sites" }
    );
    return translated.text;
  }
);

export const translateSource = async (source: string, lang: Locale) => {
  const lines = source.split("\n");
  let inFrontmatter = false;
  let inCodeBlock = false;
  const translatedLines = await Promise.all(
    lines.map(async (line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return line; // Skip empty lines (including lines with only whitespace

      // Check for frontmatter start or end
      if (trimmedLine.startsWith("---")) {
        inFrontmatter = !inFrontmatter;
        return line;
      }

      // Check for code block start or end
      if (trimmedLine.startsWith("```")) {
        inCodeBlock = !inCodeBlock;
        return line;
      }

      // Skip translation for lines within code blocks or starting with `!` or `export`
      if (
        inFrontmatter ||
        inCodeBlock ||
        trimmedLine.startsWith("!") ||
        trimmedLine.startsWith("export") ||
        isReturnSymbol(trimmedLine)
      ) {
        return line;
      }

      // Translate the line here using your translation function
      const translatedLine = await translateText(line, lang); // Replace this with your actual translation logic
      return translatedLine;
    })
  );

  return translatedLines.join("\n");
};

function isReturnSymbol(char: string) {
  return char === "\u21A9";
}
