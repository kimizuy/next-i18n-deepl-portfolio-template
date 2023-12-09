import "server-only";

import * as deepl from "deepl-node";
import { i18nConfig, Locale } from "./i18n-config";
import { cache } from "react";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { micromark } from "micromark";

const translator = new deepl.Translator(process.env.DEEPL_API_KEY!);

type TranslateTextOptions = {
  text: string;
  targetLang: Locale;
  context?: string;
  shouldHandleHtml?: boolean;
};

export const translateText = cache(
  async ({
    text,
    targetLang,
    context,
    shouldHandleHtml,
  }: TranslateTextOptions) => {
    if (targetLang === i18nConfig.defaultLocale) return text;
    const translated = await translator.translateText(
      text,
      i18nConfig.defaultLocale,
      targetLang,
      // "context" is alpha feature. it may be deprecated in the future
      // ref: https://github.com/DeepLcom/deepl-node#text-translation-options
      {
        context: context ?? "My portfolio site",
        tagHandling: shouldHandleHtml ? "html" : undefined,
      }
    );
    return translated.text;
  }
);

type TranslateMarkdownSourceOptions = {
  source: string;
  lang: Locale;
  context?: string;
};

export const translateMarkdownSource = async ({
  source,
  lang,
  context,
}: TranslateMarkdownSourceOptions) => {
  let inFrontmatter = false;
  let inCodeBlock = false;

  async function processBatch(batch: string[]) {
    return Promise.all(
      batch.map(async (line) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return line;

        if (trimmedLine.startsWith("---")) {
          inFrontmatter = !inFrontmatter;
          return line;
        }

        if (trimmedLine.startsWith("```")) {
          inCodeBlock = !inCodeBlock;
          return line;
        }

        if (
          inFrontmatter ||
          inCodeBlock ||
          trimmedLine.startsWith("export") ||
          isReturnSymbol(trimmedLine)
        ) {
          return line;
        }

        const html = turnMarkdownIntoHtml(line);
        const translatedHtml = await translateText({
          text: html,
          targetLang: lang,
          context,
          shouldHandleHtml: true,
        });
        const translatedMarkdown = await turnHtmlIntoMarkdown(translatedHtml);

        return translatedMarkdown;
      })
    );
  }

  async function manageBatches(allLines: string[]) {
    let result: string[] = [];
    for (let i = 0; i < allLines.length; i += 50) {
      const batch = allLines.slice(i, i + 50);
      const translatedBatch = await processBatch(batch);
      result = result.concat(translatedBatch);
    }
    return result;
  }

  const lines = source.split("\n");
  const translatedLines = await manageBatches(lines);

  return translatedLines.join("\n");
};

function isReturnSymbol(char: string) {
  return char === "\u21A9";
}

const turnMarkdownIntoHtml = (markdown: string) => micromark(markdown);

const turnHtmlIntoMarkdown = async (html: string) => {
  const processed = await unified()
    .use(rehypeParse)
    .use(rehypeRemark)
    .use(remarkStringify, { resourceLink: true })
    .process(html);

  return processed.toString();
};
