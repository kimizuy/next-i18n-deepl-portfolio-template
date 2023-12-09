import path from "path";
import { bundleMDX, getFilePath } from "./mdx-bundler";
import { readFileSync } from "fs";
import { getErrorMessage } from "./helpers";
import { cache } from "react";
import { Locale } from "./i18n-config";
import { translateMarkdownSource } from "./translate-with-deepl";

const DOCS_PATH = path.join(process.cwd(), "_docs");

export const getDoc = cache(async (page: "home" | "about", lang: Locale) => {
  try {
    const filePath = getFilePath(path.join(DOCS_PATH, page));
    const source = readFileSync(filePath, "utf-8");
    const cwd = path.join(DOCS_PATH, page);
    const imagesUrl = path.join("_docs", page);
    const translated = await translateMarkdownSource({ source, lang });
    const { code } = await bundleMDX({ source: translated, cwd, imagesUrl });
    return { code };
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(errorMessage);
    process.exit(1);
  }
});
