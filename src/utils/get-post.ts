import path from "path";
import { bundleMDX, getFilePath } from "./mdx-bundler";
import { readFileSync } from "fs";
import { getErrorMessage } from "./helpers";
import { cache } from "react";
import { isFrontmatter } from "./valibot";
import { translateSource, translateText } from "./translate-with-deepl";
import { Locale } from "./i18n-config";

const POSTS_PATH = path.join(process.cwd(), "_posts");

export const getPost = cache(async (slug: string, lang: Locale) => {
  try {
    const filePath = getFilePath(path.join(POSTS_PATH, slug));
    const source = readFileSync(filePath, "utf-8");
    const cwd = path.join(POSTS_PATH, slug);
    const imagesUrl = path.join("_posts", slug);
    const translated = await translateSource(
      source,
      lang,
      "My blog post on web technologies"
    );
    const { code, frontmatter } = await bundleMDX({
      source: translated,
      cwd,
      imagesUrl,
    });
    if (!isFrontmatter(frontmatter)) {
      throw new Error(`Invalid format in "${filePath}".`);
    }
    return {
      code,
      frontmatter: {
        ...frontmatter,
        title: await translateText(frontmatter.title, lang),
      },
      slug,
    };
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(errorMessage);
    process.exit(1);
  }
});
